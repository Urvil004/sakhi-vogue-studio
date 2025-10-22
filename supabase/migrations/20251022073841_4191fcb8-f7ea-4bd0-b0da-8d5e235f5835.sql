-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policy: Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS policy: Only admins can insert roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Blouses', 'Dresses', 'Embroidery', 'Gowns', 'Wedding')),
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  featured BOOLEAN DEFAULT false
);

-- Enable RLS on gallery_images
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- RLS policies for gallery_images
-- Anyone can view gallery images (public gallery)
CREATE POLICY "Anyone can view gallery images"
ON public.gallery_images
FOR SELECT
TO public
USING (true);

-- Only admins can insert images
CREATE POLICY "Admins can insert images"
ON public.gallery_images
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update images
CREATE POLICY "Admins can update images"
ON public.gallery_images
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete images
CREATE POLICY "Admins can delete images"
ON public.gallery_images
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
-- Anyone can view images in gallery bucket
CREATE POLICY "Anyone can view gallery images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'gallery');

-- Only admins can upload images
CREATE POLICY "Admins can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'gallery' AND
  public.has_role(auth.uid(), 'admin')
);

-- Only admins can update images
CREATE POLICY "Admins can update storage images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'gallery' AND
  public.has_role(auth.uid(), 'admin')
);

-- Only admins can delete images
CREATE POLICY "Admins can delete storage images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'gallery' AND
  public.has_role(auth.uid(), 'admin')
);

-- Create index for better query performance
CREATE INDEX idx_gallery_images_category ON public.gallery_images(category);
CREATE INDEX idx_gallery_images_uploaded_at ON public.gallery_images(uploaded_at DESC);
CREATE INDEX idx_gallery_images_tags ON public.gallery_images USING GIN(tags);