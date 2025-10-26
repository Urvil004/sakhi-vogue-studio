import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import experienceImg from "@/assets/20+ YEAR EXPERIENCE.jpg";
import time from "@/assets/photo-1501139083538-0139583c060f.jpeg";
import tailor from "@/assets/team-tailors-working-sewing-factory-examining-documents-workbench-73382740.webp"



const features = [
  {
    title: "20+ Years of Experience",
    description: "We have been creating beautiful custom outfits for over two decades. Thousands of happy customers trust us for their special occasions.",
    image: experienceImg
  },
  {
    title: "Always On Time",
    description: "Your outfit will be ready when you need it. We respect your time and keep our promises.",
    image: time
  },
  {
    title: "Skilled Tailors",
    description: "Our team has years of training and experience. We bring care and attention to every stitch we make.",
    image: tailor
  },

  {
    title: "We Make You Happy",
    description: "Your happiness is most important to us. We work closely with you to create the perfect fit and style you want.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
  },
];

const WhyChooseUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
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
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }
    if (touchStart - touchEnd < -75) {
      setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
    }
  };

  return (
    <section 
      className="py-20"
      style={{
        background: 'linear-gradient(to bottom, #FAF9F6 0%, #F5F5DC 100%)'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
         <h2 
  className="font-serif text-4xl md:text-5xl font-bold mb-4"
  style={{
    background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }}
>
  Why Choose Sakhi Designer Studio?
</h2>

          <p 
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#4A4A4A' }}
          >
            Experience the perfect blend of tradition, craftsmanship, and modern design excellence.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-8">
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
              {features.map((feature, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <FeatureCard feature={feature} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, index) => (
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
  );
};

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  return (
    <Card
      className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-scale-in rounded-2xl border-none min-h-[400px] flex flex-col"
      style={{ 
        animationDelay: `${index * 100}ms`,
        background: '#FFFFFF'
      }}
    >
      {/* Image Section - Top Half with Vignette */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Black Vignette Overlay - SAME as ServicesOverview */}
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: `
              radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)
            `
          }}
        />
        
        {/* Burgundy accent on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to bottom, rgba(139,38,53,0.3) 0%, transparent 100%)`
          }}
        />
      </div>

      {/* Text Section - Bottom Half on Burgundy Background */}
      <CardContent 
        className="flex-1 p-6 text-center flex flex-col justify-center"
        style={{
          background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)'
        }}
      >
       <h3 
  className="font-serif text-xl font-semibold mb-3"
  style={{ 
    background: 'linear-gradient(135deg, #D4A574 0%, #B8924E 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }}
>
  {feature.title}
</h3>

        <p 
          className="text-sm leading-relaxed"
          style={{ 
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          {feature.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default WhyChooseUs;
