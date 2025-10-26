import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-primary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoIcon} alt="Sakhi Designer Studio" className="h-10 w-10" />
              <div>
                <h3 className="font-serif font-bold text-lg text-warm-white">Sakhi Designer Studio</h3>
                <p className="text-xs text-white/60">Since 2004</p>
              </div>
            </div>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              Crafting elegant custom tailoring for over 20 years in Ahmedabad.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-accent hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-accent hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-warm-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/70 hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6 text-warm-white">Contact Info</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-accent" />
                <span>Sakhi ladies tailor, VISHWAS CITY-2, 53, behind R.C. Technical Road, Vishwas City 2, Chanakyapuri, Ahmedabad, Gujarat 380061</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-accent" />
                <a href="tel:+919898970397" className="hover:text-primary transition-colors">
                  +91 98989 70397
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-accent" />
                <a href="mailto:sakhidesignerstudio53@gmail.com" className="hover:text-primary transition-colors">
                  sakhidesignerstudio53@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-semibold mb-6 text-warm-white">Business Hours</h4>
            <div className="flex items-start gap-3 text-sm text-white/70 mb-3">
              <Clock size={18} className="mt-1 flex-shrink-0 text-accent" />
              <div>
                <p className="font-semibold text-warm-white">Monday - Sunday</p>
                <p>9:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Sakhi Designer Studio. All rights reserved.</p>
          <p className="mt-2 font-serif text-white/80">Crafting Elegance Since 2004</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
