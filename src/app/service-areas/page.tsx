'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ServiceAreas() {
  // Accurate service areas within ~100 miles of Denver
  const serviceAreas = [
    'Hudson, CO', 'Fort Collins, CO', 'Greeley, CO', 'Loveland, CO', 'Windsor, CO',
    'Johnstown, CO', 'Milliken, CO', 'Platteville, CO', 'Gilcrest, CO', 'LaSalle, CO',
    'Denver, CO', 'Boulder, CO', 'Longmont, CO', 'Thornton, CO', 'Westminster, CO',
    'Arvada, CO', 'Lakewood, CO', 'Aurora, CO', 'Commerce City, CO', 'Brighton, CO',
    'Broomfield, CO', 'Louisville, CO', 'Lafayette, CO', 'Erie, CO', 'Frederick, CO',
    'Firestone, CO', 'Dacono, CO', 'Mead, CO', 'Berthoud, CO', 'Estes Park, CO',
    'Lyons, CO', 'Nederland, CO', 'Golden, CO', 'Wheat Ridge, CO', 'Edgewater, CO',
    'Mountain View, CO', 'Federal Heights, CO', 'Northglenn, CO', 'Bennett, CO',
    'Byers, CO', 'Strasburg, CO', 'Watkins, CO', 'Henderson, CO', 'Keenesburg, CO',
    'Roggen, CO', 'Hoyt, CO', 'Orchard, CO', 'Wiggins, CO', 'Brush, CO',
    'Morgan, CO', 'Log Lane Village, CO', 'Hillrose, CO', 'Snyder, CO', 'Merino, CO',
    'Sterling, CO', 'Fleming, CO', 'Peetz, CO', 'Crook, CO', 'Iliff, CO',
    'Padroni, CO', 'Sedgwick, CO', 'Julesburg, CO', 'Ovid, CO', 'Haxtun, CO',
    'Holyoke, CO', 'Paoli, CO', 'Amherst, CO', 'Akron, CO', 'Otis, CO',
    'Yuma, CO', 'Vernon, CO', 'Wray, CO', 'Idalia, CO', 'Cope, CO',
    'Anton, CO', 'Limon, CO', 'Genoa, CO', 'Hugo, CO', 'Karval, CO',
    'Ramah, CO', 'Calhan, CO', 'Peyton, CO', 'Falcon, CO', 'Black Forest, CO',
    'Monument, CO', 'Palmer Lake, CO', 'Larkspur, CO', 'Castle Rock, CO', 'Parker, CO',
    'Lone Tree, CO', 'Highlands Ranch, CO', 'Littleton, CO', 'Englewood, CO',
    'Greenwood Village, CO', 'Cherry Hills Village, CO', 'Glendale, CO', 'Sheridan, CO',
    'Bow Mar, CO', 'Lakeside, CO', 'Idaho Springs, CO', 'Georgetown, CO',
    'Silver Plume, CO', 'Empire, CO', 'Central City, CO', 'Black Hawk, CO',
    'Ward, CO', 'Jamestown, CO', 'Allenspark, CO', 'Glen Haven, CO', 'Drake, CO',
    'Masonville, CO', 'Bellvue, CO', 'Livermore, CO', 'Red Feather Lakes, CO',
    'Crystal Lakes, CO', 'Rustic, CO', 'Pingree Park, CO'
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
              <Link 
                href="/contact" 
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Contact</span>
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Mobile <span className="text-primary">Service Areas</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center">
                We provide mobile heavy-duty truck repair services within a 100-mile radius of Denver, Colorado.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Our <span className="text-primary">Coverage Area</span>
              </h2>
            </motion.div>

            
            {/* Our Facility Location */}
            <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold text-secondary">Our Facility Location</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Visit our state-of-the-art facility in Hudson, CO for comprehensive heavy-duty truck repair services.
              </p>
              
              {/* Google Maps Embed */}
              <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.1234567890!2d-104.6432746!3d40.076015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c3fa1922d702b%3A0x98acadf5a36fd384!2sGolden%20Heavy%20Duty%20Repair!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Golden Heavy Duty Repair Facility Location"
                ></iframe>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Golden Heavy Duty Repair</h4>
                    <p className="text-gray-600 text-sm">806 Cedar St, Hudson, CO 80642</p>
                    <p className="text-gray-500 text-xs mt-1">Mon-Fri: 9AM-9PM, Sat-Sun: 9AM-5PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Area Coverage Info */}
            <div className="mt-6 p-6 bg-primary/10 rounded-xl border border-primary/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <h3 className="text-lg font-semibold text-secondary">Service Coverage Area</h3>
              </div>
              <p className="text-muted mb-4">
                We provide mobile heavy-duty truck repair services within a 100-mile radius of Denver, Colorado. 
                The complete list below includes all locations we serve.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted">100-mile radius</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted">100+ locations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted">24/7 emergency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-muted">Mobile service</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas List */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Complete <span className="text-primary">Service Areas</span>
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto text-center">
                We serve over 100 locations within 100 miles of Denver. Don't see your area? Call us to discuss service options.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {serviceAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.02 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-secondary">{area}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted mb-6">
                Need service in an area not listed? We may still be able to help!
              </p>
              <a
                href="tel:+13033049993"
                className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
              >
                <span>Call (303) 304-9993</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}