'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import GoogleReviews from './GoogleReviews';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Mike Rodriguez',
      company: 'Rodriguez Trucking',
      role: 'Fleet Owner',
      content: 'Golden Heavy Duty has been keeping our fleet running for over 5 years. Their emergency service saved us thousands in downtime costs. Professional, reliable, and always fair pricing.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Sarah Chen',
      company: 'Chen Logistics',
      role: 'Operations Manager',
      content: 'When our main truck broke down on I-76, Golden Heavy Duty had us back on the road in 4 hours. Their diagnostic skills are unmatched in the area.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Tom Wilson',
      company: 'Wilson Transport',
      role: 'Owner-Operator',
      content: 'I trust these guys with my livelihood. They\'ve never let me down, and their warranty gives me peace of mind. Best truck repair shop in Northern Colorado.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Lisa Martinez',
      company: 'Martinez Freight',
      role: 'Fleet Manager',
      content: 'Their fleet maintenance program has reduced our breakdowns by 60%. The reporting and cost management tools are excellent. Highly recommend!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'David Thompson',
      company: 'Thompson Hauling',
      role: 'Owner',
      content: 'Fast turnaround times and honest pricing. They explained everything clearly and had my transmission rebuilt in 2 days. Will definitely use them again.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Jennifer Adams',
      company: 'Adams Express',
      role: 'Operations Director',
      content: 'Professional service from start to finish. Their 24/7 emergency service is a lifesaver for our time-sensitive deliveries. Top-notch mechanics.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

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
    <section className="py-40 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, margin: "-100px" }}
            className="inline-block mb-6"
          >
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Customer Reviews
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-secondary mb-8">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted max-w-5xl mx-auto leading-relaxed text-center px-4">
            Don't just take our word for it. Here's what fleet owners and drivers 
            across Northern Colorado have to say about our service.
          </p>
        </motion.div>

        {/* Google Reviews */}
        <GoogleReviews 
          placeId="ChIJK3AtkqE_bIcRhNNvo_WtrJg" 
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
          maxReviews={12}
        />

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false, margin: "-100px" }}
          className="mt-20 bg-secondary rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-300">Trucks Serviced</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-300">Emergency Service</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-300">Customer Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
