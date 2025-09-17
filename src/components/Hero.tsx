'use client';

import { motion } from 'framer-motion';
import { Phone, Wrench, Clock, Shield, ArrowRight } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function Hero() {
  const { settings } = useSiteSettings();
  
  const features = [
    { icon: Clock, text: '24/7 Emergency Road Service' },
    { icon: Wrench, text: 'Expert Mechanics' },
    { icon: Shield, text: 'Quality Warranty' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        {/* Main Background Image */}
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat parallax-bg"
          style={{
            backgroundImage: "url('/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg')"
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-hero z-10" />
        
        {/* Animated Particles/Stars */}
        <div className="absolute inset-0 z-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full opacity-60 floating"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Enhanced Main Headline */}
          <div className="space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
            >
              Golden Heavy Duty
              <span className="block gradient-text text-glow">Repair</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-200 max-w-5xl mx-auto leading-relaxed text-center px-4"
            >
              Professional heavy-duty truck & trailer repair in Hudson, CO. Certified mechanics, fast turnaround, 
              and 24/7 mobile emergency service to keep your fleet rolling.
            </motion.p>
          </div>

          {/* Enhanced Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 py-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-3 glass-effect rounded-full px-6 py-3 hover:shadow-glow transition-all duration-300"
              >
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-white font-medium text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}
              className="btn-primary flex items-center space-x-3 text-lg px-10 py-5 shadow-glow-lg pulse-glow"
            >
              <Phone className="h-6 w-6" />
              <span>Call {settings.contactPhone}</span>
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

          {/* Enhanced Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="pt-12 border-t border-white/20"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-gray-300 text-sm mb-6 text-center"
            >
              Trusted by fleets across Northern Colorado
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap justify-center items-center gap-8 opacity-70"
            >
              {['Peterbilt', 'Freightliner', 'Kenworth', 'Volvo', 'Mack'].map((brand, index) => (
                <motion.div 
                  key={brand}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                  className="text-white font-semibold text-lg hover:text-primary transition-colors duration-300"
                >
                  {brand}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
