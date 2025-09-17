'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings } = useSiteSettings();

  const services = [
    'Engine Repair',
    'Transmission Service',
    'Brake Systems',
    'Diagnostics',
    'Emergency Service',
    'Fleet Maintenance',
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <footer className="bg-secondary text-white mt-20">
      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/Logo.png"
                alt="Golden Heavy Duty Repair"
                width={200}
                height={80}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {settings.siteDescription}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    href="/services" 
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
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
              <Link href="/privacy" className="text-gray-300 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
