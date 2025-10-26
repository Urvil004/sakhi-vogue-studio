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
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From traditional to contemporary, we offer a complete range of tailoring services 
            designed to meet your unique style needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-border bg-card animate-scale-in rounded-xl min-h-[300px]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url(${service.backgroundImage})`,
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/80 to-charcoal/40 group-hover:from-charcoal/90 group-hover:via-charcoal/70 transition-all duration-300" />
                
                {/* Content */}
                <CardContent className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <div className="mb-5 inline-flex p-4 rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 w-fit">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center text-accent font-semibold hover:text-gold-dark transition-colors text-lg group"
          >
            View All Services & Pricing
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
