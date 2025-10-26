import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Sparkles, Shirt, Crown, Palette, Settings } from "lucide-react";
import servicesHeroBg from "@/assets/services-hero-bg.jpg";
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
    description: "Traditional & Designer Patterns",
    details: "Expert craftsmanship in creating perfectly fitted blouses with traditional and contemporary designs. We specialize in custom patterns, intricate details, and precise measurements to ensure the perfect fit for every body type.",
    backgroundImage: serviceBlouseImg,
  },
  {
    icon: Crown,
    title: "Wedding Lehenga & Bridal Wear",
    description: "Make Your Special Day Unforgettable",
    details: "Exquisite bridal lehengas, wedding outfits, and trousseau designed with meticulous attention to detail. From traditional to contemporary bridal wear, we bring your dream wedding outfit to life.",
    backgroundImage: serviceWeddingImg,
  },
  {
    icon: Sparkles,
    title: "Party Gowns & Evening Wear",
    description: "Shine at Every Occasion",
    details: "Stunning party gowns and evening wear designed to make you the center of attention. Whether it's a cocktail party, reception, or formal event, we create outfits that reflect your unique style.",
    backgroundImage: serviceGownImg,
  },
  {
    icon: Palette,
    title: "Designer Dresses",
    description: "Kurtis, Anarkalis, Indo-Western",
    details: "Contemporary designer wear including kurtis, anarkalis, and Indo-Western fusion outfits. Perfect for the modern woman who values both tradition and style. Custom designs available.",
    backgroundImage: serviceDesignerImg,
  },
  {
    icon: Scissors,
    title: "Machine Embroidery Work",
    description: "Intricate & Elegant Embellishments",
    details: "Professional machine embroidery services to add elegance and charm to any outfit. From traditional motifs to modern patterns, we offer a wide range of embroidery styles and designs.",
    backgroundImage: serviceEmbroideryImg,
  },
  {
    icon: Settings,
    title: "Custom Alterations & Fitting",
    description: "Perfect Fit Guaranteed",
    details: "Expert alterations and fitting services to ensure your garments fit perfectly. Whether it's adjusting the length, taking in the waist, or restyling an old favorite, we handle all types of alterations with precision.",
    backgroundImage: serviceAlterationImg,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Burgundy Overlay (Same as Home) */}
        <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${servicesHeroBg})`,
              backgroundAttachment: 'fixed',
            }}
          />
          {/* Burgundy overlay - SAME AS HOME HERO */}
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
                Our Services
              </h1>
              <p 
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ 
                  color: 'rgba(255,255,255,0.95)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                }}
              >
                Comprehensive tailoring solutions for all your fashion needs. 
                From traditional to contemporary, we bring your vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid - Black Vignette Cards */}
        <section 
          className="py-20"
          style={{
            background: 'linear-gradient(to bottom, #FAF9F6 0%, #F5F5DC 100%)'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-border bg-card animate-scale-in rounded-xl min-h-[400px]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ 
                      backgroundImage: service.backgroundImage ? `url(${service.backgroundImage})` : 'none',
                    }}
                  />
                  
                  {/* Black Vignette Overlay - SAME AS HOME */}
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
                  
                  {/* Content */}
                  <CardContent className="relative z-10 p-8 h-full flex flex-col justify-end">
                    {/* Gold Gradient Title */}
                    <h3 
                      className="font-serif text-2xl font-semibold mb-3"
                      style={{ 
                        background: 'linear-gradient(135deg, #D4A574 0%, #B8924E 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {service.title}
                    </h3>
                    
                    {/* White Description */}
                    <p 
                      className="text-sm font-medium mb-2"
                      style={{ 
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                      }}
                    >
                      {service.description}
                    </p>
                    
                    {/* White Details */}
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ 
                        textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                        color: 'rgba(255,255,255,0.85)'
                      }}
                    >
                      {service.details}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pricing Note - Burgundy Theme */}
            <div 
              className="max-w-3xl mx-auto text-center p-8 rounded-2xl border-2"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 38, 53, 0.1) 0%, rgba(107, 31, 46, 0.05) 100%)',
                borderColor: 'rgba(139, 38, 53, 0.3)'
              }}
            >
              <h3 
                className="text-2xl font-serif font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Custom Pricing
              </h3>
              <p className="leading-relaxed" style={{ color: '#4A4A4A' }}>
                Our pricing is customized based on design intricacy, fabric type, embroidery work, 
                and embellishments. Contact us for accurate quotes tailored to your requirements. 
                We believe in transparent pricing and work closely with you to ensure the best value 
                for your investment.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
