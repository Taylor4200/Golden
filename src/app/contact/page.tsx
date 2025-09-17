'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, MessageCircle } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import Link from 'next/link';


export default function Contact() {
  const { settings } = useSiteSettings();
  
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      details: settings.contactPhone,
      action: `tel:${settings.contactPhone.replace(/\D/g, '')}`,
      highlight: '24/7 Emergency Road Service'
    },
    {
      icon: MessageCircle,
      title: 'Text Us',
      description: 'Quick questions and updates',
      details: settings.contactPhone,
      action: `sms:${settings.contactPhone.replace(/\D/g, '')}`,
      highlight: 'Fast Response'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Detailed inquiries and quotes',
      details: settings.contactEmail,
      action: `mailto:${settings.contactEmail}`,
      highlight: '24 Hour Response'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come to our facility',
      details: settings.address,
      action: `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`,
      highlight: 'Easy Access'
    }
  ];

  const serviceAreas = [
    'Hudson, CO',
    'Fort Collins, CO',
    'Greeley, CO',
    'Loveland, CO',
    'Windsor, CO',
    'Johnstown, CO',
    'Milliken, CO',
    'Platteville, CO',
    'Gilcrest, CO',
    'LaSalle, CO'
  ];


  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-secondary to-gray-900 text-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
                Ready to get your truck back on the road? We're here to help with 
                professional heavy-duty repair services.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Get In Touch
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center group hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <method.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">{method.title}</h3>
                  <p className="text-muted mb-4">{method.description}</p>
                  <a
                    href={method.action}
                    className="text-primary font-semibold hover:text-primary-dark transition-colors block mb-2"
                  >
                    {method.details}
                  </a>
                  <p className="text-sm text-primary font-medium">{method.highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                  Business <span className="text-primary">Hours</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <span className="font-semibold text-secondary">Monday - Friday</span>
                    <span className="text-muted">9:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <span className="font-semibold text-secondary">Saturday</span>
                    <span className="text-muted">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <span className="font-semibold text-secondary">Sunday</span>
                    <span className="text-muted">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 mt-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-primary">24/7 Emergency Road Service</span>
                    </div>
                    <p className="text-sm text-muted">
                      Available for emergency repairs and towing services around the clock.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="bg-secondary rounded-2xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-6">Mobile Service Areas</h3>
                <p className="text-gray-300 mb-6">
                  We provide mobile service within a 100-mile radius of Denver in all directions. 
                  Emergency towing and roadside assistance available throughout the region.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {serviceAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-gray-300">{area}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-3">
                    Plus 150+ more locations within 100 miles of Denver
                  </p>
                  <Link 
                    href="/service-areas"
                    className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>View All Service Areas</span>
                  </Link>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-300">
                    Don't see your area? <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className="text-primary hover:text-primary-dark transition-colors">Call us</a> to discuss service options.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactSection />

        {/* Emergency Contact */}
        <section className="py-20 bg-red-600 text-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Emergency Service Available 24/7
              </h2>
              <p className="text-xl text-red-100 mb-8 text-center">
                Truck broke down? Need emergency repair or towing? We're here to help 
                when you need us most.
              </p>
              <a
                href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <Phone className="h-6 w-6" />
                <span>Call Emergency Line</span>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
