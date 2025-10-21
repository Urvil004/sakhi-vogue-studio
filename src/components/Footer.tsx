import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-secondary/30 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoIcon} alt="Sakhi Designer Studio" className="h-10 w-10" />
              <div>
                <h3 className="font-bold text-lg">Sakhi Designer Studio</h3>
                <p className="text-xs text-muted-foreground">Since 2004</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Crafting elegant custom tailoring for over 20 years in Ahmedabad.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-primary" />
                <span>Sakhi ladies tailor, VISHWAS CITY-2, 53, behind R.C. Technical Road, Vishwas City 2, Chanakyapuri, Ahmedabad, Gujarat 380061</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0 text-primary" />
                <a href="tel:+919898970397" className="hover:text-primary transition-colors">
                  +91 98989 70397
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0 text-primary" />
                <a href="mailto:sakhidesignerstudio53@gmail.com" className="hover:text-primary transition-colors">
                  sakhidesignerstudio53@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-semibold mb-4">Business Hours</h4>
            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
              <Clock size={16} className="mt-1 flex-shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground">Monday - Sunday</p>
                <p>9:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sakhi Designer Studio. All rights reserved.</p>
          <p className="mt-1">Crafting Elegance Since 2004</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
