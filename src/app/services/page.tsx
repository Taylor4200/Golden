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
  DollarSign,
  Award
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
      pricing: 'Call for quote',
      warranty: '12-month warranty on all engine work'
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
      pricing: 'Call for quote',
      warranty: '18-month warranty on transmission rebuilds'
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
      pricing: 'Call for quote',
      warranty: '6-month warranty on brake components'
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
      pricing: 'Call for quote',
      warranty: '90-day warranty on diagnostic work'
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
      pricing: 'Call for emergency rates',
      warranty: 'Immediate response guarantee'
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
      pricing: 'Volume discounts available',
      warranty: 'Comprehensive service agreements'
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
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-secondary to-gray-900 text-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Heavy Duty <span className="text-primary">Truck Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From routine maintenance to major repairs, we provide comprehensive 
                heavy-duty truck services to keep your fleet running at peak performance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-20 bg-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Our <span className="text-primary">Services</span>
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                Professional heavy-duty truck repair services backed by years of experience 
                and a commitment to quality workmanship.
              </p>
            </motion.div>

            <div className="space-y-16">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-secondary">{service.title}</h3>
                        <p className="text-primary font-semibold">{service.pricing}</p>
                      </div>
                    </div>
                    <p className="text-muted leading-relaxed mb-6">{service.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-primary font-semibold">
                      <Award className="h-4 w-4" />
                      <span>{service.warranty}</span>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <img
                      src="/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg"
                      alt={service.title}
                      className="rounded-2xl shadow-2xl w-full"
                    />
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
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Additional <span className="text-primary">Services</span>
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                We also provide a wide range of additional services to keep your truck 
                in top condition.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="card text-center hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-sm font-medium text-secondary">{service}</p>
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
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Our Service <span className="text-primary">Process</span>
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                We follow a proven process to ensure quality service and customer satisfaction 
                every time.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card text-center group hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-4">{step.title}</h3>
                  <p className="text-muted leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
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
              viewport={{ once: true }}
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
                viewport={{ once: true }}
                className="text-center"
              >
                <Clock className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Fast Turnaround</h3>
                <p className="text-gray-300">
                  We understand downtime costs money. Our efficient processes and experienced 
                  team get you back on the road quickly.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <DollarSign className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Fair Pricing</h3>
                <p className="text-gray-300">
                  Transparent, competitive pricing with no hidden fees. We provide detailed 
                  quotes before starting any work.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Award className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Quality Warranty</h3>
                <p className="text-gray-300">
                  We stand behind our work with comprehensive warranties on all repairs 
                  and parts.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Ready to Get Your Truck Serviced?
              </h2>
              <p className="text-xl text-muted mb-8 max-w-3xl mx-auto">
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
