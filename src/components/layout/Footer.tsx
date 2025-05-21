import React from "react";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Logo from "../ui/Logo";
import Container from "../ui/Container";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown-900 text-cream-50 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <Logo variant="light" />
            <p className="mt-4 text-brown-100 max-w-xs">
              A rustic country house in Tomar, where Portuguese tradition meets
              modern comfort.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://instagram.com/acarpinteiralakehouse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-50 hover:text-cream-300 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:info@acarpinteira.pt"
                className="text-cream-50 hover:text-cream-300 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display text-cream-50 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Main Street, 123, Tomar, Portugal</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>+351 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>info@acarpinteira.pt</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display text-cream-50 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="hover:text-cream-300 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-cream-300 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-cream-300 transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#amenities"
                  className="hover:text-cream-300 transition-colors"
                >
                  Amenities
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="hover:text-cream-300 transition-colors"
                >
                  Location
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-cream-300 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brown-700 pt-8 text-center text-brown-300 text-sm">
          <p>
            &copy; {new Date().getFullYear()} A Carpinteira. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
