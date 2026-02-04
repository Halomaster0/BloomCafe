import { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Order', href: '#order' },
    { label: 'Reserve', href: '#reserve' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled
          ? 'bg-[#F7F6F2]/95 backdrop-blur-md py-4 shadow-sm'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <img
              src="images/logo.jpg"
              alt="The Bloom Coffee"
              className="w-10 h-10 rounded-full object-cover border border-[#D4A72C]/30"
            />
            <span className={`bloom-heading text-lg lg:text-2xl transition-colors duration-300 ${isScrolled ? 'text-[#111C16]' : 'text-[#F7F6F2]'
              } group-hover:text-[#D4A72C]`}>
              The Bloom Coffee
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`bloom-body text-sm transition-colors duration-300 ${isScrolled ? 'text-[#111C16]' : 'text-[#F7F6F2]'
                  } hover:text-[#D4A72C] relative group`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] ${isScrolled ? 'bg-[#111C16]' : 'bg-[#F7F6F2]'
                  } transition-all duration-300 group-hover:w-full`} />
              </a>
            ))}
            <a
              href="https://www.instagram.com/the.bloom.coffee/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${isScrolled ? 'text-[#111C16]' : 'text-[#F7F6F2]'} hover:text-[#D4A72C]`}
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${isScrolled || isMobileMenuOpen ? 'text-[#111C16]' : 'text-[#F7F6F2]'
              }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] bg-[#F7F6F2] transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="bloom-heading text-3xl text-[#111C16] hover:text-[#013A1E] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
