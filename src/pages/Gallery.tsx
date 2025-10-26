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
      
      const { data, error: fetchError } = await supabase
        .from('gallery_images')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (fetchError) {
        throw new Error('Unable to load gallery images. Please try again later.');
      }

      if (!data || data.length === 0) {
        setImages([]);
        setCategoryCounts({ All: 0 });
        setLoading(false);
        return;
      }

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
                  
                  const { data: signedData } = await supabase.storage
                    .from('gallery')
                    .createSignedUrl(cleanPath, 60 * 60 * 24);
                  
                  if (signedData?.signedUrl) {
                    imageUrl = signedData.signedUrl;
                  }
                }
              } catch (urlError) {
                console.warn('Could not generate signed URL');
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

      const counts: Record<string, number> = { All: processedImages.length };
      processedImages.forEach(img => {
        counts[img.category] = (counts[img.category] || 0) + 1;
      });
      setCategoryCounts(counts);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Burgundy Overlay (Same as Home) */}
        <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${galleryHeroBg})`,
              backgroundAttachment: 'fixed',
            }}
          />
          {/* Burgundy overlay - SAME AS HOME */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(139, 38, 53, 0.85) 0%, rgba(107, 31, 46, 0.9) 100%)' 
            }} 
          />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 
                className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
              >
                Our Gallery
              </h1>
              <p 
                className="text-lg mb-6"
                style={{ 
                  color: 'rgba(255,255,255,0.95)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                }}
              >
                Explore our collection of beautiful custom-tailored creations
              </p>
              <div 
                className="flex items-center justify-center gap-2 text-sm"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                <Instagram className="h-4 w-4" style={{ color: '#D4A574' }} />
                <span>For our complete portfolio, follow us on Instagram @sakhidesignerstudio53</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter - NO BLUR, Solid White */}
        <section 
          className="sticky top-20 z-40 py-4 border-b shadow-md"
          style={{
            background: '#FFFFFF',
            borderColor: 'rgba(212, 165, 154, 0.2)'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all whitespace-nowrap rounded-full px-6 py-2.5 font-medium"
                  style={{
                    background: selectedCategory === category 
                      ? 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)'
                      : 'transparent',
                    color: selectedCategory === category ? '#FFFFFF' : '#8B2635',
                    border: selectedCategory === category 
                      ? 'none' 
                      : '2px solid rgba(139, 38, 53, 0.4)',
                    boxShadow: selectedCategory === category 
                      ? '0 4px 12px rgba(139, 38, 53, 0.3)' 
                      : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.background = 'rgba(139, 38, 53, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                  aria-pressed={selectedCategory === category}
                >
                  {category} ({categoryCounts[category] || 0})
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid - Cream Background */}
        <section 
          className="py-16"
          style={{
            background: 'linear-gradient(to bottom, #FAF9F6 0%, #F5F5DC 100%)'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#8B2635' }} />
                <p style={{ color: '#4A4A4A' }}>Loading gallery...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 max-w-md mx-auto text-center">
                <AlertCircle className="h-12 w-12" style={{ color: '#8B2635' }} />
                <h3 
                  className="text-xl font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Unable to Load Gallery
                </h3>
                <p style={{ color: '#4A4A4A' }}>{error}</p>
                <Button 
                  onClick={fetchImages}
                  style={{
                    background: '#D4A574',
                    color: '#2C2C2C'
                  }}
                >
                  Try Again
                </Button>
                <div className="mt-4">
                  <a 
                    href="https://instagram.com/sakhidesignerstudio53"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:underline"
                    style={{ color: '#8B2635' }}
                  >
                    <Instagram className="h-4 w-4" />
                    View our work on Instagram
                  </a>
                </div>
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 max-w-md mx-auto text-center">
                <h3 
                  className="text-xl font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Gallery Coming Soon
                </h3>
                <p style={{ color: '#4A4A4A' }}>
                  We're currently setting up our gallery. Check back soon or follow us on Instagram for daily updates!
                </p>
                <a 
                  href="https://instagram.com/sakhidesignerstudio53"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:underline"
                  style={{ color: '#8B2635' }}
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
