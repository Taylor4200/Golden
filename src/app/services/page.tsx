'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Cog, 
  Shield, 
  Settings, 
  AlertTriangle, 
  Users,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';


export default function Services() {
  const services = [
    {
      icon: Wrench,
      title: 'Engine Repair & Rebuilds',
      description: 'Complete engine diagnostics, rebuilds, and maintenance for all heavy-duty truck engines including Cummins, Detroit, and Caterpillar.',
      features: [
        'Engine Diagnostics & Testing',
        'Complete Engine Rebuilds',
        'Cylinder Head Service',
        'Turbocharger Repair',
        'Fuel System Service',
        'Cooling System Repair',
        'Preventive Maintenance Programs'
      ],
      pricing: 'Call for quote'
    },
    {
      icon: Cog,
      title: 'Transmission Service',
      description: 'Expert transmission repair, rebuilds, and maintenance to keep your truck shifting smoothly and efficiently.',
      features: [
        'Transmission Diagnostics',
        'Complete Transmission Rebuilds',
        'Clutch Service & Replacement',
        'Torque Converter Repair',
        'Fluid Changes & Flushes',
        'Shift Solenoid Service',
        'Manual & Automatic Transmissions'
      ],
      pricing: 'Call for quote'
    },
    {
      icon: Shield,
      title: 'Brake Systems',
      description: 'Comprehensive brake system service, repair, and maintenance for maximum safety and performance.',
      features: [
        'Air Brake System Service',
        'Hydraulic Brake Repair',
        'Brake Pad & Shoe Replacement',
        'Rotor & Drum Service',
        'ABS System Diagnostics',
        'Brake Line Repair',
        'Emergency Brake Service'
      ],
      pricing: 'Call for quote'
    },
    {
      icon: Settings,
      title: 'Diagnostics & Electrical',
      description: 'State-of-the-art diagnostic equipment to quickly identify and resolve electrical and computer issues.',
      features: [
        'Computer Diagnostics',
        'Engine Scanning',
        'Electrical System Testing',
        'Wiring Harness Repair',
        'Sensor Replacement',
        'ECM/PCM Programming',
        'Performance Analysis'
      ],
      pricing: 'Call for quote'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Service',
      description: '24/7 emergency roadside assistance and towing for when you need help most.',
      features: [
        '24/7 Roadside Assistance',
        'Emergency Towing Service',
        'On-Site Repairs',
        'Jump Start Service',
        'Tire Changes',
        'Fuel Delivery',
        'Lockout Service'
      ],
      pricing: 'Call for emergency rates'
    },
    {
      icon: Users,
      title: 'Fleet Maintenance',
      description: 'Comprehensive fleet maintenance programs to keep your entire operation running smoothly.',
      features: [
        'Scheduled Maintenance Programs',
        'Fleet Inspections',
        'Cost Management & Reporting',
        'Preventive Maintenance',
        'Parts Inventory Management',
        'Service History Tracking',
        'Custom Maintenance Plans'
      ],
      pricing: 'Volume discounts available'
    }
  ];

  const additionalServices = [
    'Suspension & Steering Repair',
    'Exhaust System Service',
    'Air Conditioning Repair',
    'Hydraulic System Service',
    'PTO (Power Take-Off) Service',
    'Driveline & Differential Service',
    'Body & Frame Repair',
    'Paint & Refinishing'
  ];

  const process = [
    {
      step: '01',
      title: 'Initial Contact',
      description: 'Call us or fill out our online form. We\'ll gather information about your truck and the issue.'
    },
    {
      step: '02',
      title: 'Diagnosis',
      description: 'Our certified technicians will diagnose the problem using state-of-the-art equipment.'
    },
    {
      step: '03',
      title: 'Quote & Approval',
      description: 'We\'ll provide a detailed quote and get your approval before starting any work.'
    },
    {
      step: '04',
      title: 'Repair & Service',
      description: 'Our experienced team will complete the repair using quality parts and proven techniques.'
    },
    {
      step: '05',
      title: 'Quality Check',
      description: 'Every repair undergoes a thorough quality inspection before being returned to you.'
    },
    {
      step: '06',
      title: 'Delivery',
      description: 'Your truck is returned to you with a warranty and detailed service documentation.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>

        {/* Main Services */}
        <section className="py-20 bg-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20 px-4"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6">
                Our <span className="text-primary">Services</span>
              </h2>
              <p className="text-lg md:text-xl text-muted leading-relaxed text-center">
                Professional heavy-duty truck repair services backed by years of experience 
                and a commitment to quality workmanship.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 px-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card group hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary"
                >
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary">{service.title}</h3>
                        <p className="text-primary font-semibold text-sm">{service.pricing}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted leading-relaxed mb-8">{service.description}</p>
                    
                    <div className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Additional <span className="text-primary">Services</span>
              </h2>
              <p className="text-xl text-muted text-center">
                We also provide a wide range of additional services to keep your truck 
                in top condition.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-lg hover:border-primary/20 border border-gray-200 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-secondary leading-relaxed">{service}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-20 bg-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Our Service <span className="text-primary">Process</span>
              </h2>
              <p className="text-xl text-muted text-center">
                We follow a proven process to ensure quality service and customer satisfaction 
                every time.
              </p>
            </motion.div>

            <div className="relative">
              {/* Connection line for desktop */}
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                {process.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="card text-center group hover:shadow-xl transition-all duration-300 relative"
                  >
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-4">{step.title}</h3>
                    <p className="text-muted leading-relaxed">{step.description}</p>
                    
                    {/* Arrow connector for mobile */}
                    {index < process.length - 1 && (
                      <div className="lg:hidden flex justify-center mt-6">
                        <div className="w-0.5 h-8 bg-primary/30"></div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-secondary text-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="text-primary">Golden Heavy Duty?</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Fast Turnaround</h3>
                <p className="text-gray-300 leading-relaxed">
                  We understand downtime costs money. Our efficient processes and experienced 
                  team get you back on the road quickly.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: false, margin: "-100px" }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                  <DollarSign className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Fair Pricing</h3>
                <p className="text-gray-300 leading-relaxed">
                  Transparent, competitive pricing with no hidden fees. We provide detailed 
                  quotes before starting any work.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false, margin: "-100px" }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/30 transition-colors">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Quality Workmanship</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our experienced technicians use quality parts and proven techniques 
                  to ensure reliable repairs.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Ready to Get Your Truck Serviced?
              </h2>
              <p className="text-xl text-muted mb-8 text-center">
                Contact us today for professional heavy-duty truck repair services. 
                We're here to help keep your fleet running smoothly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+13033049993"
                  className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Call Now</span>
                </a>
                <a
                  href="/contact"
                  className="btn-outline flex items-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Get Quote</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
