import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Award, Users, Heart, Clock } from "lucide-react";
import aboutWorkspaceImg from "@/assets/about-workspace.jpg";
import heroBg from "@/assets/hero-bg.jpg";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % values.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentSlide((prev) => (prev + 1) % values.length);
    }
    if (touchStart - touchEnd < -75) {
      setCurrentSlide((prev) => (prev - 1 + values.length) % values.length);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${heroBg})`,
              backgroundAttachment: 'fixed',
            }}
          />
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
                About Us
              </h1>
              <p 
                className="text-lg"
                style={{ 
                  color: 'rgba(255,255,255,0.95)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                }}
              >
                Twenty years of tradition, hard work, and beautiful designs
              </p>
            </div>
          </div>
        </section>

        {/* Story Section - SMALLER IMAGE ON MOBILE */}
        <section 
          className="py-16"
          style={{
            background: 'linear-gradient(to bottom, #FAF9F6 0%, #F5F5DC 100%)'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                <div className="lg:col-span-3">
                  <h2 
                    className="font-serif text-3xl font-bold mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Our Story
                  </h2>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed mb-6" style={{ color: '#4A4A4A' }}>
                      <span 
                        className="float-left font-serif text-7xl leading-none mr-3 mt-2"
                        style={{ color: '#D4A574' }}
                      >
                        S
                      </span>
                      akhi Designer Studio started in 2004. We are a small tailoring shop in Ghatlodia, Ahmedabad. For over 20 years, we have been making beautiful clothes for women in our city.
                    </p>
                    
                    <p className="text-lg leading-relaxed mb-6" style={{ color: '#4A4A4A' }}>
                      We began with a simple idea: to give women perfectly fitted clothes that look beautiful and make them feel special. Over the years, we have made thousands of outfits – from everyday wear to wedding lehengas and party gowns.
                    </p>
                    
                    <p className="text-lg leading-relaxed mb-6" style={{ color: '#4A4A4A' }}>
                      Today, we mix old traditional methods with new modern designs. Our experienced team of tailors is proud of every piece we create. We make sure each outfit meets high standards of quality and beauty.
                    </p>
                    
                    <p className="text-lg leading-relaxed" style={{ color: '#4A4A4A' }}>
                      We offer complete tailoring services for all your needs. From simple alterations to custom bridal wear, we do it all with care and skill.
                    </p>
                  </div>
                </div>
                
                {/* SMALLER IMAGE ON MOBILE */}
                <div className="lg:col-span-2">
                  <div className="lg:sticky lg:top-24">
                    <img 
                      src={aboutWorkspaceImg} 
                      alt="Vintage sewing machine in elegant tailoring workspace" 
                      className="w-full max-w-xs sm:max-w-sm lg:max-w-full mx-auto h-auto rounded-xl shadow-xl object-cover"
                      style={{ border: '2px solid rgba(139, 38, 53, 0.2)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div 
                  className="text-center p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 38, 53, 0.1) 0%, rgba(212, 165, 116, 0.1) 100%)',
                    border: '2px solid rgba(139, 38, 53, 0.2)'
                  }}
                >
                  <div className="text-4xl font-serif font-bold mb-2" style={{ color: '#8B2635' }}>20+</div>
                  <div className="text-sm" style={{ color: '#4A4A4A' }}>Years Experience</div>
                </div>
                <div 
                  className="text-center p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 38, 53, 0.1) 0%, rgba(212, 165, 116, 0.1) 100%)',
                    border: '2px solid rgba(139, 38, 53, 0.2)'
                  }}
                >
                  <div className="text-4xl font-serif font-bold mb-2" style={{ color: '#8B2635' }}>10,000+</div>
                  <div className="text-sm" style={{ color: '#4A4A4A' }}>Happy Customers</div>
                </div>
                <div 
                  className="text-center p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 38, 53, 0.1) 0%, rgba(212, 165, 116, 0.1) 100%)',
                    border: '2px solid rgba(139, 38, 53, 0.2)'
                  }}
                >
                  <div className="text-4xl font-serif font-bold mb-2" style={{ color: '#8B2635' }}>100%</div>
                  <div className="text-sm" style={{ color: '#4A4A4A' }}>Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - SWIPEABLE ON MOBILE */}
        <section 
          className="py-16"
          style={{
            background: 'linear-gradient(to bottom, #FFFFFF 0%, #FAF9F6 100%)'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 
                className="font-serif text-3xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                What We Believe In
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#4A4A4A' }}>
                These values guide our work every day
              </p>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 rounded-2xl border-2 animate-scale-in"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      background: 'linear-gradient(135deg, rgba(139, 38, 53, 0.1) 0%, rgba(107, 31, 46, 0.05) 100%)',
                      borderColor: 'rgba(139, 38, 53, 0.3)'
                    }}
                  >
                    <div 
                      className="inline-flex p-4 rounded-full mb-4"
                      style={{
                        background: 'linear-gradient(135deg, #D4A574 0%, #B8924E 100%)',
                        boxShadow: '0 4px 12px rgba(139, 38, 53, 0.2)'
                      }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 
                      className="text-xl font-serif font-semibold mb-2"
                      style={{
                        background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile Carousel */}
            <div className="lg:hidden mb-8">
              <div 
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <div key={index} className="w-full flex-shrink-0 px-2">
                        <div
                          className="text-center p-6 rounded-2xl border-2"
                          style={{ 
                            background: 'linear-gradient(135deg, rgba(139, 38, 53, 0.1) 0%, rgba(107, 31, 46, 0.05) 100%)',
                            borderColor: 'rgba(139, 38, 53, 0.3)'
                          }}
                        >
                          <div 
                            className="inline-flex p-4 rounded-full mb-4"
                            style={{
                              background: 'linear-gradient(135deg, #D4A574 0%, #B8924E 100%)',
                              boxShadow: '0 4px 12px rgba(139, 38, 53, 0.2)'
                            }}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <h3 
                            className="text-xl font-serif font-semibold mb-2"
                            style={{
                              background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            {value.title}
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>
                            {value.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {values.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="transition-all duration-300"
                    style={{
                      width: currentSlide === index ? '32px' : '12px',
                      height: '12px',
                      borderRadius: '6px',
                      background: currentSlide === index 
                        ? 'linear-gradient(135deg, #8B2635, #6B1F2E)' 
                        : 'rgba(139, 38, 53, 0.3)',
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section 
          className="py-16"
          style={{
            background: 'linear-gradient(to bottom, #FAF9F6 0%, #F5F5DC 100%)'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 
                className="font-serif text-3xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                We Come to Your Door
              </h2>
              <p className="mb-8" style={{ color: '#4A4A4A' }}>
                We provide home visit services across Ahmedabad
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Ghatlodia", "Satellite", "Naranpura", "Gurukul", "Nearby Areas"].map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: 'rgba(139, 38, 53, 0.1)',
                      color: '#8B2635',
                      border: '1px solid rgba(139, 38, 53, 0.3)'
                    }}
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
