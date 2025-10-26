import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const InstagramSection = () => {
  // Correct paths based on your folder structure
  const instagramImages = [
    "/gallery/images/design1.jpg",
    "/gallery/images/design2.jpg",
    "/gallery/images/design3.jpg",
    "/gallery/images/design4.jpg",
    "/gallery/images/design5.jpg",
    "/gallery/images/design6.jpg",
    "/gallery/images/design7.jpg",
    "/gallery/images/design8.jpg",
  ];

  return (
    <section className="bg-gradient-to-b from-background via-secondary/20 to-secondary/40 py-20 mt-16 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover 1000+ More Designs
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Follow our Instagram for daily inspiration, behind-the-scenes glimpses, 
            trending designs, and our complete portfolio of custom creations
          </p>
          
          {/* CTA Button */}
         <Button 
  size="lg" 
  className="gap-3 shadow-2xl transition-all duration-300 text-lg px-10 py-6" 
  asChild
  style={{
    background: 'linear-gradient(135deg, #D4A574 0%, #B8924E 100%)',
    color: '#2C2C2C',
    border: 'none'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #B8924E 0%, #9A7A3E 100%)';
    e.currentTarget.style.transform = 'scale(1.05)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, #D4A574 0%, #B8924E 100%)';
    e.currentTarget.style.transform = 'scale(1)';
  }}
>
  <a
    href="https://www.instagram.com/sakhidesignerstudio53/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Instagram className="h-6 w-6" />
    Follow @sakhidesignerstudio53
  </a>
</Button>

        </div>

        {/* Instagram Feed Grid */}
        <div className="max-w-6xl mx-auto">
          <div id="instagram-feed-container" className="mt-12">
            {/* Grid with actual images */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {instagramImages.map((image, index) => (
                <a
                  key={index}
                  href="https://www.instagram.com/sakhidesignerstudio53/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <img
                    src={image}
                    alt={`Design ${index + 1} - Sakhi Designer Studio`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram className="w-12 h-12 text-white" />
                  </div>
                  
                  {/* Bottom Text */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3 text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    View on Instagram
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Secondary CTA */}
          <div className="text-center mt-10 p-6 bg-primary/5 rounded-xl">
            <p className="text-foreground text-lg leading-relaxed">
              <strong>New designs posted daily</strong> | 
              📍 Based in Ahmedabad | 
              ✨ Custom stitching since 2004
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
