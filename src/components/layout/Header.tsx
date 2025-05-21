import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import Container from "../ui/Container";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll to top and #home on reload
    window.scrollTo(0, 0);
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Amenities", href: "#amenities" },
    { name: "Location", href: "#location" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToGallery = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      const y =
        gallerySection.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 top-0 left-0 right-0
        ${isScrolled ? "bg-cream-50 shadow-md py-3" : "bg-transparent py-5"}
      `}
    >
      <Container>
        {mobileMenuOpen ? (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-64 max-w-full z-50 bg-white shadow-2xl rounded-l-3xl rounded-bl-3xl flex flex-col overflow-x-hidden"
              style={{ paddingBottom: "2.5rem" }}
            >
              <div className="flex items-center justify-between pt-7 pb-3 border-b border-brown-100 relative px-6">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <Logo variant="default" showText={false} />
                </div>
                <span className="flex-1 text-base font-display font-semibold text-brown-900 text-center tracking-wide">
                  A Carpinteira
                </span>
                <button
                  className="text-brown-800 text-2xl focus:outline-none z-10 ml-4"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>
              <nav className="flex-1 flex flex-col px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between text-base text-brown-900 font-display py-2 px-2 rounded-lg hover:bg-brown-50 transition-colors"
                    onClick={
                      link.name === "Gallery"
                        ? scrollToGallery
                        : () => setMobileMenuOpen(false)
                    }
                  >
                    <span>{link.name}</span>
                    <span className="text-brown-300 text-lg">→</span>
                  </a>
                ))}
              </nav>
              <div className="px-4 pb-6">
                <a
                  href="#contact"
                  className="block w-full mb-3 px-0 py-2 rounded-full bg-brown-800 text-cream-50 font-semibold text-base text-center shadow hover:bg-brown-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Now
                </a>
                <div className="flex justify-between items-center gap-1">
                  <a
                    href="tel:+351123456789"
                    className="flex-1 flex flex-col items-center py-1 rounded-lg bg-brown-50 text-brown-800 hover:bg-brown-100 transition-colors text-xs"
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.28a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.05.35 2.15.59 3.28.72A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Call
                  </a>
                  <a
                    href="mailto:info@acarpinteira.pt"
                    className="flex-1 flex flex-col items-center py-1 rounded-lg bg-brown-50 text-brown-800 hover:bg-brown-100 transition-colors text-xs"
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Email
                  </a>
                  <a
                    href="https://instagram.com/acarpinteiralakehouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col items-center py-1 rounded-lg bg-brown-50 text-brown-800 hover:bg-brown-100 transition-colors text-xs"
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="flex justify-between items-center">
            <Logo variant={isScrolled ? "default" : "light"} />
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium hover:text-green-700 transition-colors ${
                    isScrolled ? "text-brown-800" : "text-cream-50"
                  }`}
                  onClick={
                    link.name === "Gallery" ? scrollToGallery : undefined
                  }
                >
                  {link.name}
                </a>
              ))}
              <Button
                variant="primary"
                size="small"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    const y =
                      contactSection.getBoundingClientRect().top +
                      window.scrollY -
                      60;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Book Now
              </Button>
            </nav>
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-brown-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span style={{ fontSize: 24 }}>&#9776;</span>
            </button>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
