import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-sewing-aesthetic.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Sophisticated Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Luxury sewing craftsmanship with elegant fabrics"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(212, 165, 154, 0.85), rgba(156, 175, 136, 0.75))' }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-block mb-6 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-xs sm:text-sm font-medium text-white">
              20+ Years of Experience | Expert Craftsmanship | Doorstep Services
            </span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold mb-6 leading-tight text-white tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)', letterSpacing: '-0.02em' }}>
            Where Tradition Meets{" "}
            <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Contemporary Design
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-white/95 mb-8 max-w-xl font-normal leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            Discover the art of custom tailoring at Sakhi Designer Studio. From traditional blouses to wedding lehengas, 
            we bring your fashion dreams to life with precision and elegance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/services">
              <Button size="lg" variant="gold" className="group w-full sm:w-auto font-semibold" style={{ boxShadow: '0 4px 12px rgba(184,134,11,0.3)' }}>
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-charcoal font-semibold transition-all duration-300">
                View Gallery
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 sm:gap-12">
            <div>
              <div className="text-4xl font-serif font-bold text-white mb-1">1000+</div>
              <div className="text-sm text-white/80 font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-white mb-1">20+</div>
              <div className="text-sm text-white/80 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/80 font-medium">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
