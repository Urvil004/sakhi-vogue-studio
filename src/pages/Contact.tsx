import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm ${formData.name}. I'm interested in ${formData.service || "your services"}`;
    const url = `https://wa.me/919898970397?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden">
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
                Get In Touch
              </h1>
              <p 
                className="text-lg"
                style={{ 
                  color: 'rgba(255,255,255,0.95)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                }}
              >
                Ready to bring your fashion vision to life? Contact us today!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section 
          className="py-16"
          style={{
            background: 'linear-gradient(to bottom, #FAF9F6 0%, #F5F5DC 100%)'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <h2 
                  className="font-serif text-2xl font-bold mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" style={{ color: '#2C2C2C' }}>Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your name"
                      className="mt-1"
                      style={{ borderColor: 'rgba(139, 38, 53, 0.3)' }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" style={{ color: '#2C2C2C' }}>Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-1"
                      style={{ borderColor: 'rgba(139, 38, 53, 0.3)' }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" style={{ color: '#2C2C2C' }}>Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="mt-1"
                      style={{ borderColor: 'rgba(139, 38, 53, 0.3)' }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" style={{ color: '#2C2C2C' }}>Service Interested In</Label>
                    <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                      <SelectTrigger className="mt-1" style={{ borderColor: 'rgba(139, 38, 53, 0.3)' }}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blouse">Blouse Stitching</SelectItem>
                        <SelectItem value="wedding">Wedding & Bridal Wear</SelectItem>
                        <SelectItem value="gowns">Party Gowns</SelectItem>
                        <SelectItem value="designer">Designer Dresses</SelectItem>
                        <SelectItem value="embroidery">Machine Embroidery</SelectItem>
                        <SelectItem value="alterations">Alterations & Fitting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" style={{ color: '#2C2C2C' }}>Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements..."
                      rows={4}
                      className="mt-1"
                      style={{ borderColor: 'rgba(139, 38, 53, 0.3)' }}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      className="flex-1 gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                        color: '#FFFFFF'
                      }}
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                    <Button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex-1 gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #D4A574 0%, #B8924E 100%)',
                        color: '#2C2C2C'
                      }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 
                    className="font-serif text-2xl font-bold mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <Card style={{ borderColor: 'rgba(139, 38, 53, 0.2)' }}>
                      <CardContent className="p-4 flex items-start gap-4">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ background: 'rgba(139, 38, 53, 0.1)' }}
                        >
                          <MapPin className="h-5 w-5" style={{ color: '#8B2635' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1" style={{ color: '#2C2C2C' }}>Address</h3>
                          <p className="text-sm" style={{ color: '#4A4A4A' }}>
                            Sakhi ladies tailor, VISHWAS CITY-2, 53, behind R.C. Technical Road, Vishwas City 2, Chanakyapuri, Ahmedabad, Gujarat 380061
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card style={{ borderColor: 'rgba(139, 38, 53, 0.2)' }}>
                      <CardContent className="p-4 flex items-start gap-4">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ background: 'rgba(139, 38, 53, 0.1)' }}
                        >
                          <Phone className="h-5 w-5" style={{ color: '#8B2635' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1" style={{ color: '#2C2C2C' }}>Phone</h3>
                          <a
                            href="tel:+919898970397"
                            className="text-sm hover:underline"
                            style={{ color: '#8B2635' }}
                          >
                            +91 98989 70397
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    <Card style={{ borderColor: 'rgba(139, 38, 53, 0.2)' }}>
                      <CardContent className="p-4 flex items-start gap-4">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ background: 'rgba(139, 38, 53, 0.1)' }}
                        >
                          <Mail className="h-5 w-5" style={{ color: '#8B2635' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1" style={{ color: '#2C2C2C' }}>Email</h3>
                          <a
                            href="mailto:sakhidesignerstudio53@gmail.com"
                            className="text-sm hover:underline break-all"
                            style={{ color: '#8B2635' }}
                          >
                            sakhidesignerstudio53@gmail.com
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    <Card style={{ borderColor: 'rgba(139, 38, 53, 0.2)' }}>
                      <CardContent className="p-4 flex items-start gap-4">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ background: 'rgba(139, 38, 53, 0.1)' }}
                        >
                          <Clock className="h-5 w-5" style={{ color: '#8B2635' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1" style={{ color: '#2C2C2C' }}>Business Hours</h3>
                          <p className="text-sm" style={{ color: '#4A4A4A' }}>
                            Monday - Sunday: 9:00 AM - 10:00 PM
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Service Areas */}
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: '#2C2C2C' }}>
                    Doorstep Service Available In:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Ghatlodia", "Satellite", "Naranpura", "Gurukul", "Nearby Areas"].map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 rounded-full text-xs font-medium"
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

                {/* Map */}
                <div className="rounded-xl overflow-hidden h-64" style={{ border: '2px solid rgba(139, 38, 53, 0.2)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3226.0278681981426!2d72.53214207463076!3d23.07868231423329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83458aba5f4d%3A0x81f51084ed41f76a!2sSakhi%20Ladies%20Tailor!5e1!3m2!1sen!2sus!4v1760902052199!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sakhi Designer Studio Location"
                  />
                </div>
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

export default Contact;
