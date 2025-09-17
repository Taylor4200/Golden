'use client';

import { motion } from 'framer-motion';
import { 
  Wrench, 
  Cog, 
  Shield, 
  Truck, 
  Settings, 
  AlertTriangle, 
  Users,
  ArrowRight,
  Phone,
  DollarSign
} from 'lucide-react';
import { useFeaturedServices } from '@/hooks/useServices';

export default function Services() {
  const { featuredServices, isLoading } = useFeaturedServices();

  // Fallback services if loading or no data
  const fallbackServices = [
    {
      icon: Wrench,
      title: 'Engine Repair',
      description: 'Complete engine diagnostics, rebuilds, and maintenance for all heavy-duty truck engines.',
      features: ['Engine Diagnostics', 'Rebuilds & Overhauls', 'Preventive Maintenance', 'Performance Tuning'],
      priceRange: 'Call for quote'
    },
    {
      icon: Cog,
      title: 'Transmission Service',
      description: 'Expert transmission repair, rebuilds, and maintenance to keep your truck shifting smoothly.',
      features: ['Transmission Rebuilds', 'Clutch Service', 'Fluid Changes', 'Diagnostic Testing'],
      priceRange: 'Call for quote'
    },
    {
      icon: Shield,
      title: 'Brake Systems',
      description: 'Comprehensive brake system service, repair, and maintenance for maximum safety.',
      features: ['Brake Pad Replacement', 'Rotor Service', 'Air Brake Systems', 'ABS Diagnostics'],
      priceRange: 'Call for quote'
    },
    {
      icon: Settings,
      title: 'Diagnostics',
      description: 'State-of-the-art diagnostic equipment to quickly identify and resolve issues.',
      features: ['Computer Diagnostics', 'Engine Scanning', 'Electrical Testing', 'Performance Analysis'],
      priceRange: 'Call for quote'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Service',
      description: '24/7 emergency roadside assistance and towing for when you need help most.',
      features: ['Roadside Assistance', 'Emergency Towing', '24/7 Availability', 'Rapid Response'],
      priceRange: 'Call for quote'
    },
    {
      icon: Users,
      title: 'Fleet Maintenance',
      description: 'Comprehensive fleet maintenance programs to keep your entire operation running.',
      features: ['Scheduled Maintenance', 'Fleet Inspections', 'Cost Management', 'Reporting'],
      priceRange: 'Call for quote'
    }
  ];

  const services = isLoading || featuredServices.length === 0 ? fallbackServices : featuredServices;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-40 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Our Services
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-secondary mb-8">
            Professional <span className="gradient-text">Heavy-Duty</span> Services
          </h2>
          <p className="text-xl md:text-2xl text-muted max-w-5xl mx-auto leading-relaxed text-center px-4">
            From routine maintenance to major repairs, we provide comprehensive 
            heavy-duty truck services to keep your fleet running at peak performance.
          </p>
        </motion.div>

        {/* Enhanced Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon || Wrench;
            return (
              <motion.div
                key={service.id || index}
                variants={itemVariants}
                className="card-premium group hover:shadow-2xl transition-all duration-500 p-8 relative overflow-hidden"
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating Icon Background */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
                {/* Enhanced Icon */}
                <div className="mb-6 relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300"
                  >
                    <IconComponent className="h-10 w-10 text-primary" />
                  </motion.div>
                </div>

                {/* Enhanced Content */}
                <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors duration-300">
                    {service.name || service.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-base text-left">
                    {service.shortDescription || service.description}
                  </p>

                  {/* Enhanced Service Details */}
                  {service.priceRange && (
                    <div className="flex items-center justify-center text-sm text-gray-600 py-3 border-t border-gray-100 bg-gray-50/50 rounded-lg px-3 -mx-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-semibold text-gray-800">{service.priceRange}</span>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Features */}
                  <ul className="space-y-3 text-left">
                    {(service.features || []).slice(0, 4).map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="flex items-center space-x-3 text-sm text-muted group-hover:text-gray-700 transition-colors"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary-dark rounded-full flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                    {service.features && service.features.length > 4 && (
                      <li className="text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full inline-block text-left">
                        +{service.features.length - 4} more features
                      </li>
                    )}
                  </ul>

                  {/* Enhanced CTA */}
                  <div className="pt-6">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="/contact"
                      className="inline-flex items-center space-x-2 text-primary font-semibold hover:text-primary-dark transition-all duration-300 group/link bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-lg"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <div className="relative bg-gradient-to-br from-secondary via-gray-800 to-secondary rounded-3xl p-8 md:p-16 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative z-10">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false, margin: "-100px" }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Need Service? <span className="gradient-text">We're Here to Help</span>
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false, margin: "-100px" }}
                className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed text-center px-4"
              >
                Don't let downtime cost you money. Get professional heavy-duty truck repair 
                services when you need them most.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+13033049993"
                  className="btn-primary flex items-center space-x-3 text-lg px-10 py-5 shadow-glow-lg"
                >
                  <Phone className="h-6 w-6" />
                  <span>Call Now</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/contact"
                  className="btn-outline flex items-center space-x-3 text-lg px-10 py-5 border-white text-white hover:bg-white hover:text-secondary shadow-glow"
                >
                  <span>Get Free Quote</span>
                  <ArrowRight className="h-6 w-6" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
