'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, Clock, MapPin } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { settings, isLoading } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];


  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      {/* Top bar with emergency contact */}
      <div className="bg-secondary text-white py-2">
        <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors font-medium">
                  {settings.contactPhone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">{settings.address}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5" />
              <span className="font-medium">24/7 Emergency Road Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white border-b border-border">
        <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo.png"
                alt="Golden Heavy Duty Repair"
                width={300}
                height={120}
                className="h-20 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Services Link */}
              <Link
                href="/services"
                className="text-secondary hover:text-primary transition-colors font-semibold text-lg px-6 py-3"
              >
                Services
              </Link>

              {/* Other Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-secondary hover:text-primary transition-colors font-semibold text-lg px-6 py-3"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}
                className="btn-primary flex items-center space-x-3 text-lg px-8 py-4"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-secondary" />
              ) : (
                <Menu className="h-6 w-6 text-secondary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="px-6 py-6 space-y-4">
              {/* Services Section */}
              <div>
                <div className="text-secondary font-semibold text-lg py-2">Services</div>
                <div className="pl-4 space-y-2">
                  {servicesDropdown.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block text-secondary hover:text-primary transition-colors font-medium py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Other Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-secondary hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <a
                href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}
                className="btn-primary flex items-center justify-center space-x-2 w-full mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
