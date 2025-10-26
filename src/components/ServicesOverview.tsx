import { Scissors, Sparkles, Shirt, Crown, Palette, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Shirt,
    title: "Blouse Stitching",
    description: "Traditional & designer patterns crafted with precision for perfect fit and style.",
  },
  {
    icon: Crown,
    title: "Wedding & Bridal Wear",
    description: "Exquisite lehengas and bridal outfits that make your special day unforgettable.",
  },
  {
    icon: Sparkles,
    title: "Party Gowns",
    description: "Stunning evening wear and party gowns designed to make you shine.",
  },
  {
    icon: Palette,
    title: "Designer Dresses",
    description: "Kurtis, Anarkalis, and Indo-Western fusion wear for the modern woman.",
  },
  {
    icon: Scissors,
    title: "Machine Embroidery",
    description: "Intricate embroidery work that adds elegance and charm to any outfit.",
  },
  {
    icon: Settings,
    title: "Custom Alterations",
    description: "Expert fitting and alterations to ensure your garments fit perfectly.",
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
                className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-border bg-card animate-scale-in rounded-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="mb-5 inline-flex p-4 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 group-hover:from-primary/25 group-hover:to-secondary/25 transition-all duration-300">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
            className="inline-flex items-center text-accent font-semibold hover:text-gold-dark transition-colors text-lg"
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
