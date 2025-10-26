import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        {/* Hero Section with Parallax Background */}
        <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${servicesHeroBg})`,
              backgroundAttachment: 'fixed',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/70 to-charcoal/50" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in text-white">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
              <p className="text-lg text-white/90">
                Comprehensive tailoring solutions for all your fashion needs. 
                From traditional to contemporary, we bring your vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in min-h-[400px] rounded-2xl border-none"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundImage: `url(${service.backgroundImage})`,
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-transparent" />
                    
                    <CardHeader className="relative z-10">
                      <div className="mb-4 inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 w-fit">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-serif text-white">{service.title}</CardTitle>
                      <CardDescription className="text-sm font-medium text-white/90">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-sm text-white/80 leading-relaxed">{service.details}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pricing Note */}
            <div className="max-w-3xl mx-auto text-center p-8 bg-secondary/50 rounded-2xl border border-border/50">
              <h3 className="text-xl font-serif font-semibold mb-3">Custom Pricing</h3>
              <p className="text-muted-foreground leading-relaxed">
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
