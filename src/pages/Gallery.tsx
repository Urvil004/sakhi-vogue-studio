import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import InstagramSection from "@/components/gallery/InstagramSection";
import { galleryImages, getCategoryCounts } from "@/data/galleryImages";

const categories = ["All", "Blouses", "Wedding Wear", "Gowns", "Embroidery", "Dresses"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categoryCounts = getCategoryCounts();

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
            <GalleryGrid images={galleryImages} selectedCategory={selectedCategory} />

            {/* Developer Note */}
            
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
