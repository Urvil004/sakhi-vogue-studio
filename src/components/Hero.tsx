import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-sewing-aesthetic.jpg";


const Hero = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Rich Burgundy Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Luxury sewing craftsmanship with elegant fabrics"
          className="w-full h-full object-cover"
        />
        {/* NEW: Deep Burgundy/Wine gradient for feminine luxury appeal */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(135deg, rgba(139, 38, 53, 0.85) 0%, rgba(107, 31, 46, 0.9) 100%)' 
          }} 
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          {/* Badge with updated styling */}
          <div 
            className="inline-block mb-6 px-5 py-2 rounded-full border"
            style={{
              background: 'rgba(255, 215, 186, 0.25)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(255, 255, 255, 0.3)'
            }}
          >
            <span className="text-xs sm:text-sm font-semibold text-white">
              20+ Years of Experience | Expert Craftsmanship | Doorstep Services
            </span>
          </div>
          
          {/* Main Heading with improved readability */}
          <h1 
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-tight text-white tracking-tight" 
            style={{ 
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)', 
              letterSpacing: '-0.02em' 
            }}
          >
           Blouse, Lehenga, Gowns {" "}
            <span 
              className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"
            >
            -Sab Kuch Yahan
          </span>
          </h1>
          
          {/* Description with enhanced contrast */}
          <p 
            className="text-base md:text-lg text-white mb-8 max-w-xl font-normal leading-relaxed" 
            style={{ 
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              color: 'rgba(255, 255, 255, 0.95)'
            }}
          >
           Sakhi Designer Studio makes custom outfits for weddings and special occasions. We design bridal lehengas, blouses, and party wear that fit you perfectly. Your vision becomes reality with precision and personal attention.
          </p>

          {/* Buttons with gold accent and white outline */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/services">
              <Button 
                size="lg" 
                className="group w-full sm:w-auto font-semibold transition-all duration-300 hover:scale-105" 
                style={{ 
                  background: '#D4A574',
                  color: '#2C2C2C',
                  boxShadow: '0 4px 16px rgba(212, 165, 116, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#B8924E';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 165, 116, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#D4A574';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(212, 165, 116, 0.4)';
                }}
              >
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button 
                size="lg" 
                className="w-full sm:w-auto font-semibold transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: '2px solid #FFFFFF',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.color = '#8B2635';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                View Gallery
              </Button>
            </Link>
          </div>

          {/* Stats section with enhanced visibility */}
          <div className="mt-12 flex flex-wrap gap-8 sm:gap-12">
            <div 
              className="px-4 py-3 rounded-lg" 
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="text-4xl font-serif font-bold text-white mb-1">1000+</div>
              <div className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Happy Customers
              </div>
            </div>
            <div 
              className="px-4 py-3 rounded-lg" 
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="text-4xl font-serif font-bold text-white mb-1">20+</div>
              <div className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Years Experience
              </div>
            </div>
            <div 
              className="px-4 py-3 rounded-lg" 
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="text-4xl font-serif font-bold text-white mb-1">100%</div>
              <div className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
