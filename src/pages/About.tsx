import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Award, Users, Heart, Clock } from "lucide-react";
import aboutWorkspaceImg from "@/assets/about-workspace.jpg";

const values = [
  {
    icon: Award,
    title: "Quality Work",
    description: "Every stitch shows our care for making perfect clothes. We pay attention to small details.",
  },
  {
    icon: Clock,
    title: "On Time",
    description: "We respect your time. Your outfit will be ready when we promise.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our tailors have many years of experience. They know how to create beautiful outfits.",
  },
  {
    icon: Heart,
    title: "You Come First",
    description: "Making you happy is our main goal. We listen to what you want and make it happen.",
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
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">About Us</h1>
              <p className="text-lg text-muted-foreground">
                Twenty years of tradition, hard work, and beautiful designs
              </p>
            </div>
          </div>
        </section>

        {/* Story Section - Two Column Layout */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                {/* Left Column - Text (60%) */}
                <div className="lg:col-span-3">
                  <h2 className="font-serif text-3xl font-bold mb-6">Our Story</h2>
                  
                  <div className="prose prose-lg max-w-none">
                    {/* Drop Cap S */}
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      <span className="float-left font-serif text-7xl leading-none text-primary mr-3 mt-2">S</span>
                      akhi Designer Studio started in 2004. We are a small tailoring shop in Ghatlodia, Ahmedabad. For over 20 years, we have been making beautiful clothes for women in our city.
                    </p>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      We began with a simple idea: to give women perfectly fitted clothes that look beautiful and make them feel special. Over the years, we have made thousands of outfits – from everyday wear to wedding lehengas and party gowns.
                    </p>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      Today, we mix old traditional methods with new modern designs. Our experienced team of tailors is proud of every piece we create. We make sure each outfit meets high standards of quality and beauty.
                    </p>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      We offer complete tailoring services for all your needs. From simple alterations to custom bridal wear, we do it all with care and skill.
                    </p>
                  </div>
                </div>
                
                {/* Right Column - Image (40%) */}
                <div className="lg:col-span-2">
                  <div className="sticky top-24">
                    <img 
                      src={aboutWorkspaceImg} 
                      alt="Vintage sewing machine in elegant tailoring workspace" 
                      className="w-full h-auto rounded-xl shadow-xl object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <div className="text-4xl font-serif font-bold text-primary mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <div className="text-4xl font-serif font-bold text-primary mb-2">10,000+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                  <div className="text-4xl font-serif font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold mb-4">What We Believe In</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These values guide our work every day
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
                    <h3 className="text-xl font-serif font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
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
              <h2 className="font-serif text-3xl font-bold mb-4">We Come to Your Door</h2>
              <p className="text-muted-foreground mb-8">
                We provide home visit services across Ahmedabad
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
