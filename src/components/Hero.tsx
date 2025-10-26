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
          <div className="inline-block mb-6 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-medium text-white">
              20+ Years of Experience | Expert Craftsmanship | Doorstep Services
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            Where Tradition Meets{" "}
            <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Contemporary Design
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl font-light leading-relaxed">
            Discover the art of custom tailoring at Sakhi Designer Studio. From traditional blouses to wedding lehengas, 
            we bring your fashion dreams to life with precision and elegance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/services">
              <Button size="lg" variant="gold" className="group w-full sm:w-auto shadow-lg hover:shadow-xl">
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-charcoal">
                View Gallery
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 text-sm">
            <div>
              <div className="text-3xl font-serif font-bold text-white">1000+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-white">20+</div>
              <div className="text-white/80">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-white">100%</div>
              <div className="text-white/80">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
