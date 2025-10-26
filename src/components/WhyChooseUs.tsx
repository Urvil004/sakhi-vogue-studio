import { Award, Clock, Users, Heart } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "20+ Years Expertise",
    description: "Two decades of mastering the art of custom tailoring with thousands of satisfied customers.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We value your time and ensure your outfits are ready when you need them.",
  },
  {
    icon: Users,
    title: "Expert Artisans",
    description: "Our skilled team brings years of experience and passion to every stitch.",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description: "Your happiness is our priority. We work closely with you to achieve the perfect fit and style.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">Why Choose Sakhi Designer Studio?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience the perfect blend of tradition, craftsmanship, and modern design excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-5 rounded-full bg-gradient-to-br from-primary to-secondary mb-5 shadow-md">
                  <Icon className="h-9 w-9 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
