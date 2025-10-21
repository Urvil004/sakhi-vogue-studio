import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Award, Users, Heart, Clock } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Quality Craftsmanship",
    description: "Every stitch reflects our commitment to excellence and attention to detail.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We respect your time and ensure your outfits are ready when promised.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our skilled artisans bring decades of combined experience to every project.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction and happiness are at the heart of everything we do.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
              <p className="text-lg text-muted-foreground">
                Two decades of tradition, craftsmanship, and dedication to elegance
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
                <div className="bg-secondary/30 rounded-2xl p-8 mb-8">
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    Established in 2004, <strong className="text-foreground">Sakhi Designer Studio</strong> has 
                    been serving Ahmedabad's women with quality custom tailoring for over 20 years. What started 
                    as a small tailoring shop in Ghatlodia has grown into a trusted name for bespoke fashion solutions.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    Our journey began with a simple vision: to provide women with perfectly fitted, beautifully 
                    crafted garments that celebrate their unique style. Over the years, we've had the privilege 
                    of creating thousands of custom pieces, from everyday wear to wedding lehengas and designer gowns.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Today, we continue to blend traditional craftsmanship with contemporary design, offering a 
                    complete range of tailoring services. Our experienced team of artisans takes pride in every 
                    stitch, ensuring that each garment we create meets the highest standards of quality and elegance.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                    <div className="text-4xl font-bold text-primary mb-2">20+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                    <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our work and define our commitment to you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="text-center animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">We Serve You Better</h2>
              <p className="text-muted-foreground mb-8">
                Doorstep services available across Ahmedabad
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Ghatlodia", "Satellite", "Naranpura", "Gurukul", "Nearby Areas"].map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 bg-secondary rounded-full text-sm font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
