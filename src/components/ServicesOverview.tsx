import { useState, useEffect } from "react";
import { Scissors, Sparkles, Shirt, Crown, Palette, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import serviceBlouseImg from "@/assets/service-blouse.jpg";
import serviceWeddingImg from "@/assets/service-wedding.jpg";
import serviceGownImg from "@/assets/service-gown.jpg";
import serviceDesignerImg from "@/assets/service-designer.jpg";
import serviceEmbroideryImg from "@/assets/service-embroidery.jpg";
import serviceAlterationImg from "@/assets/service-alteration.jpg";

const services = [
  {
    icon: Shirt,
    title: "Blouse Stitching",
    description: "Traditional & designer patterns crafted with precision for perfect fit and style.",
    backgroundImage: serviceBlouseImg,
  },
  {
    icon: Crown,
    title: "Wedding & Bridal Wear",
    description: "Exquisite lehengas and bridal outfits that make your special day unforgettable.",
    backgroundImage: serviceWeddingImg,
  },
  {
    icon: Sparkles,
    title: "Party Gowns",
    description: "Stunning evening wear and party gowns designed to make you shine.",
    backgroundImage: serviceGownImg,
  },
  {
    icon: Palette,
    title: "Designer Dresses",
    description: "Kurtis, Anarkalis, and Indo-Western fusion wear for the modern woman.",
    backgroundImage: serviceDesignerImg,
  },
  {
    icon: Scissors,
    title: "Machine Embroidery",
    description: "Intricate embroidery work that adds elegance and charm to any outfit.",
    backgroundImage: serviceEmbroideryImg,
  },
  {
    icon: Settings,
    title: "Custom Alterations",
    description: "Expert fitting and alterations to ensure your garments fit perfectly.",
    backgroundImage: serviceAlterationImg,
  },
];

const ServicesOverview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-play: Change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }

    if (touchStart - touchEnd < -75) {
      setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Our Services
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#4A4A4A' }}
          >
            From traditional to contemporary, we offer a complete range of tailoring services 
            designed to meet your unique style needs.
          </p>  
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Mobile Carousel (visible only on mobile) */}
        <div className="md:hidden mb-8">
          <div 
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <ServiceCard service={service} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="transition-all duration-300"
                style={{
                  width: currentSlide === index ? '32px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  background: currentSlide === index 
                    ? 'linear-gradient(135deg, #8B2635, #6B1F2E)' 
                    : 'rgba(139, 38, 53, 0.3)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center font-semibold transition-colors text-lg group"
            style={{ color: '#D4A574' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#B8924E'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#D4A574'}
          >
            View All Services & Pricing
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ServiceCard component - Same layout for both mobile and desktop
// ServiceCard component - Text absolutely positioned at bottom
const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  return (
    <Card
      className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 bg-card animate-scale-in rounded-xl min-h-[300px]"
      style={{ 
        animationDelay: `${index * 100}ms`,
        borderColor: 'rgba(212, 165, 116, 0.2)'
      }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ 
          backgroundImage: service.backgroundImage ? `url(${service.backgroundImage})` : 'none',
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%),
            linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 100%)
          `
        }}
      />
      
      {/* Burgundy accent on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to top, rgba(139,38,53,0.3) 0%, transparent 100%)`
        }}
      />
      
      {/* Content - ABSOLUTE positioning to lock at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8">
        <h3 
          className="font-serif text-xl sm:text-2xl font-semibold mb-3"
          style={{ 
            background: 'linear-gradient(135deg, #D4A574 0%, #B8924E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none'
          }}
        >
          {service.title}
        </h3>

        <p 
          className="text-sm sm:text-base text-white leading-relaxed"
          style={{ 
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            color: 'rgba(255,255,255,0.95)'
          }}
        >
          {service.description}
        </p>
      </div>
    </Card>
  );
};

export default ServicesOverview;
