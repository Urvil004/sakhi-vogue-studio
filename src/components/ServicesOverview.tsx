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
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            View All Services & Pricing
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
