import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  return (
    <footer 
      className="border-t"
      style={{
        background: 'linear-gradient(135deg, #8B2635 0%, #6B1F2E 100%)',
        borderColor: 'rgba(255,255,255,0.1)'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoIcon} alt="Sakhi Designer Studio" className="h-14 w-auto object-contain" />
              <div>
                <h3 className="font-serif font-bold text-lg text-white">Sakhi Designer Studio</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>Since 2004</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Crafting elegant custom tailoring for over 20 years in Ahmedabad.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4A574';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4A574';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
                aria-label="Facebook"
              >
                <Facebook size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="transition-colors" style={{ color: 'rgba(255,255,255,0.8)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D4A574'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors" style={{ color: 'rgba(255,255,255,0.8)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D4A574'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="transition-colors" style={{ color: 'rgba(255,255,255,0.8)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D4A574'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors" style={{ color: 'rgba(255,255,255,0.8)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D4A574'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors" style={{ color: 'rgba(255,255,255,0.8)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#D4A574'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6 text-white text-base">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: '#D4A574' }} />
                <span className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Sakhi ladies tailor, VISHWAS CITY-2, 53, behind R.C. Technical Road, Vishwas City 2, Chanakyapuri, Ahmedabad, Gujarat 380061
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0" style={{ color: '#D4A574' }} />
                <a href="tel:+919898970397" className="transition-colors" style={{ color: 'rgba(255,255,255,0.85)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}>
                  +91 98989 70397
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" style={{ color: '#D4A574' }} />
                <a href="mailto:sakhidesignerstudio53@gmail.com" className="transition-colors break-all" style={{ color: 'rgba(255,255,255,0.85)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}>
                  sakhidesignerstudio53@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Business Hours</h4>
            <div className="flex items-start gap-3 text-sm">
              <Clock size={18} className="mt-1 flex-shrink-0" style={{ color: '#D4A574' }} />
              <div>
                <p className="font-semibold text-white">Monday - Sunday</p>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>9:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            &copy; {new Date().getFullYear()} Sakhi Designer Studio. All rights reserved.
          </p>
          <p className="mt-2 font-serif" style={{ color: 'rgba(255,255,255,0.9)' }}>
        Sakhi Designer Studio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
