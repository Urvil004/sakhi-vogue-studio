import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logoIcon from "@/assets/logo-icon.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b shadow-md"
      style={{
        background: '#FFFFFF',
        borderColor: 'rgba(212, 165, 154, 0.2)'
      }}
    >
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-1 transition-transform hover:scale-105">
            <img 
              src={logoIcon} 
              alt="Sakhi Designer Studio" 
              className="h-16 w-24 sm:h-20 sm:w-28 md:h-20 md:w-32 object-contain mix-blend-multiply -mr-2" 
            />
            <div className="flex flex-col">
<span 
  className="text-lg sm:text-xl md:text-2xl font-bold font-serif"
  style={{
    color: '#8B2635'
  }}
>
  Sakhi Designer Studio
</span>
              <span className="text-[10px] sm:text-xs md:text-sm" style={{ color: '#4A4A4A' }}>
                Crafting Elegance Since 2004
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all hover:after:w-full"
                style={{ 
                  color: '#2C2C2C',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#8B2635';
                  e.currentTarget.querySelector('::after')!.style.backgroundColor = '#8B2635';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#2C2C2C';
                }}
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all hover:after:w-full flex items-center gap-1"
                style={{ color: '#2C2C2C' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8B2635'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2C2C2C'}
              >
                <Shield size={16} />
                Admin
              </Link>
            )}
            
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: '#2C2C2C' }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t animate-fade-in" style={{ borderColor: 'rgba(212, 165, 154, 0.2)' }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block py-3 text-sm font-medium transition-colors"
                style={{ color: '#2C2C2C' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8B2635'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2C2C2C'}
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 py-3 text-sm font-medium transition-colors"
                style={{ color: '#2C2C2C' }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => e.currentTarget.style.color = '#8B2635'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2C2C2C'}
              >
                <Shield size={16} />
                Admin
              </Link>
            )}
           
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
