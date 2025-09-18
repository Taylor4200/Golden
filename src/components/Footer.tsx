'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, Mail, Instagram } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useServices } from '@/hooks/useServices';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings } = useSiteSettings();
  const { services, isLoading } = useServices();

  // Fallback services if loading or no data
  const fallbackServices = [
    'DOT Inspections',
    'PM Services',
    'Turbo Charger',
    'Tires',
    'Brakes',
    'Cooling System Repairs',
    'After Treatment Repairs',
    'Regen',
    'Suspension / Air Bags / Shocks',
    'Wheel Seals',
    'Electrical',
    'Cooling / Heating',
    'Trailer Repair',
    'Mobile Service'
  ];

  // Use all services from database, or fallback if loading
  const displayServices = isLoading || services.length === 0 ? fallbackServices : services.map(service => service.name);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Service Areas', href: '/service-areas' },
  ];

  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/Logo.png"
                alt="Golden Heavy Duty Repair"
                width={300}
                height={120}
                className="h-45 w-auto"
              />
            </Link>
            <div className="flex items-start space-x-3">
              <a 
                href="https://www.instagram.com/goldenheavyduty/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary transition-colors flex-shrink-0 mt-1"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <p className="text-gray-300 text-sm leading-relaxed">
                Professional heavy-duty truck repair services in Hudson, CO
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {displayServices.map((service) => (
                <Link 
                  key={service}
                  href="/services" 
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    {settings.address.split(',').map((line, index) => (
                      <span key={index}>
                        {line.trim()}
                        {index < settings.address.split(',').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {settings.contactPhone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href={`mailto:${settings.contactEmail}`}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {settings.contactEmail}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    {settings.businessHours.split(',').map((line, index) => (
                      <span key={index}>
                        {line.trim()}
                        {index < settings.businessHours.split(',').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © {currentYear} Golden Heavy Duty. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-300 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-300 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
