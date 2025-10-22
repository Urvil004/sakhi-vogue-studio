import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Instagram, Loader2 } from "lucide-react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import InstagramSection from "@/components/gallery/InstagramSection";

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
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;

      const dbImages = (data || []).map(img => ({
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

      setImages(dbImages);

      // Calculate category counts
      const counts: Record<string, number> = { All: dbImages.length };
      dbImages.forEach(img => {
        counts[img.category] = (counts[img.category] || 0) + 1;
      });
      setCategoryCounts(counts);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Explore our collection of beautiful custom-tailored creations
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Instagram className="h-4 w-4 text-primary" />
                <span>For our complete portfolio, follow us on Instagram @sakhidesignerstudio53</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all whitespace-nowrap"
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
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
