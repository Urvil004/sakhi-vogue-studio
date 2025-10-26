import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Instagram, Loader2, AlertCircle } from "lucide-react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import InstagramSection from "@/components/gallery/InstagramSection";
import galleryHeroBg from "@/assets/gallery-hero-bg.jpg";

const categories = ["All", "Blouses", "Wedding", "Gowns", "Embroidery", "Dresses"];

interface GalleryImage {
  id: string;
  src?: string;
  image_url: string;
  title: string;
  category: string;
  description?: string | null;
  tags?: string[];
  uploaded_at?: string;
  alt: string;
  featured?: boolean;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching gallery images...');
      
      const { data, error: fetchError } = await supabase
        .from('gallery_images')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching images:', fetchError);
        throw new Error('Unable to load gallery images. Please try again later.');
      }

      console.log(`Fetched ${data?.length || 0} images from database`);

      if (!data || data.length === 0) {
        console.log('No images found in database');
        setImages([]);
        setCategoryCounts({ All: 0 });
        setLoading(false);
        return;
      }

      // Try to generate signed URLs for private storage
      let processedImages: GalleryImage[] = [];
      
      try {
        processedImages = await Promise.all(
          data.map(async (img) => {
            let imageUrl = img.image_url;
            
            if (imageUrl.includes('supabase.co/storage')) {
              try {
                const urlParts = imageUrl.split('/object/');
                if (urlParts.length > 1) {
                  const pathParts = urlParts[1].split('/');
                  const cleanPath = pathParts.filter(p => p !== 'public' && p !== 'sign').slice(1).join('/');
                  
                  const { data: signedData, error: signError } = await supabase.storage
                    .from('gallery')
                    .createSignedUrl(cleanPath, 60 * 60 * 24);
                  
                  if (signedData?.signedUrl && !signError) {
                    imageUrl = signedData.signedUrl;
                    console.log('Generated signed URL for image:', img.title);
                  }
                }
              } catch (urlError) {
                console.warn('Could not generate signed URL for:', img.title, urlError);
              }
            }
            
            return {
              id: img.id,
              src: imageUrl,
              image_url: imageUrl,
              title: img.title,
              category: img.category,
              description: img.description,
              tags: img.tags,
              uploaded_at: img.uploaded_at,
              alt: img.title,
              featured: img.featured || false
            };
          })
        );
      } catch (urlError) {
        console.error('Error processing image URLs:', urlError);
        processedImages = data.map(img => ({
          id: img.id,
          src: img.image_url,
          image_url: img.image_url,
          title: img.title,
          category: img.category,
          description: img.description,
          tags: img.tags,
          uploaded_at: img.uploaded_at,
          alt: img.title,
          featured: img.featured || false
        }));
      }

      setImages(processedImages);

      // Calculate category counts
      const counts: Record<string, number> = { All: processedImages.length };
      processedImages.forEach(img => {
        counts[img.category] = (counts[img.category] || 0) + 1;
      });
      setCategoryCounts(counts);
      
      console.log('Gallery loaded successfully with', processedImages.length, 'images');
    } catch (error) {
      console.error('Error in fetchImages:', error);
      setError(error instanceof Error ? error.message : 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Background */}
        <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${galleryHeroBg})`,
              backgroundAttachment: 'fixed',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/70 to-charcoal/50" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">Our Gallery</h1>
              <p className="text-lg text-white/90 mb-6">
                Explore our collection of beautiful custom-tailored creations
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-white/80">
                <Instagram className="h-4 w-4 text-accent" />
                <span>For our complete portfolio, follow us on Instagram @sakhidesignerstudio53</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter - FIXED STICKY */}
        <section className="sticky top-0 z-50 py-4 border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/90 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all whitespace-nowrap rounded-full px-6 py-2.5 font-medium ${
                    selectedCategory === category 
                      ? "bg-primary text-white shadow-md" 
                      : "border-2 border-primary/30 text-primary hover:bg-primary hover:text-white"
                  }`}
                  aria-label={`Filter by ${category}`}
                  aria-pressed={selectedCategory === category}
                >
                  {category} ({categoryCounts[category] || 0})
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading gallery...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 max-w-md mx-auto text-center">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <h3 className="text-xl font-semibold">Unable to Load Gallery</h3>
                <p className="text-muted-foreground">{error}</p>
                <Button onClick={fetchImages} variant="outline">
                  Try Again
                </Button>
                <div className="mt-4">
                  <a 
                    href="https://instagram.com/sakhidesignerstudio53"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <Instagram className="h-4 w-4" />
                    View our work on Instagram
                  </a>
                </div>
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 max-w-md mx-auto text-center">
                <h3 className="text-xl font-semibold">Gallery Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're currently setting up our gallery. Check back soon or follow us on Instagram for daily updates!
                </p>
                <a 
                  href="https://instagram.com/sakhidesignerstudio53"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Instagram className="h-4 w-4" />
                  @sakhidesignerstudio53
                </a>
              </div>
            ) : (
              <GalleryGrid images={images} selectedCategory={selectedCategory} />
            )}
          </div>
        </section>

        {/* Instagram Section */}
        <InstagramSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Gallery;
