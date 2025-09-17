'use client';

import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function ContactSection() {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '(303) 304-9993',
      description: '24/7 Emergency Road Service Available',
      action: 'tel:+13033049993'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: settings.address,
      description: 'Conveniently located off I-76',
      action: settings.googleMapsUrl
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Mon-Fri: 9AM-9PM, Sat-Sun: 9AM-5PM',
      description: '24/7 Emergency Road Service',
      action: null
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'breakdown@goldenheavyduty.com',
      description: 'Get a quote or ask questions',
      action: 'mailto:breakdown@goldenheavyduty.com'
    }
  ];


  return (
    <section className="py-40 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-secondary mb-8">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-2xl text-muted max-w-4xl mx-auto leading-relaxed text-center px-4">
            Ready to get your truck back on the road? Contact us today for 
            professional heavy-duty repair services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-secondary mb-8">
                Contact <span className="gradient-text">Information</span>
              </h3>
              
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="card hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-secondary mb-2 text-lg">{info.title}</h4>
                      {info.action ? (
                        <a
                          href={info.action}
                          className="text-primary hover:text-primary-dark transition-colors font-semibold text-lg block mb-2"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-secondary font-semibold text-lg mb-2">{info.details}</p>
                      )}
                      <p className="text-muted text-sm">{info.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Map Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false, margin: "-100px" }}
              className="bg-gradient-to-br from-secondary via-gray-800 to-secondary rounded-2xl p-8 text-white relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4 flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-primary" />
                  Find Us
                </h4>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  Located conveniently off I-76 in Hudson, CO. Easy access for 
                  trucks and emergency towing services.
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center space-x-2 shadow-glow"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Get Directions</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card-premium relative overflow-hidden"
          >
            {/* Form Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-50" />
            <h3 className="text-2xl font-bold text-secondary mb-2">Request Service</h3>
            <p className="text-muted text-sm mb-6">
              Fill out the form below and we'll respond within 24 hours. 
              <span className="text-orange-600 font-medium"> For urgent repairs, use our chatbot for instant help!</span>
            </p>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-secondary mb-2">Thank You!</h4>
                <p className="text-muted">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="(970) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-secondary mb-2">
                    Service Needed
                  </label>
                  <input
                    type="text"
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="e.g., Engine repair, Transmission service, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    placeholder="Describe your truck's issue or service needs..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center space-x-2 shadow-glow"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </motion.button>

                <p className="text-sm text-muted text-center">
                  * Required fields.
                </p>
                
                {/* Chatbot CTA */}
                <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-orange-800 font-semibold text-sm mb-1">
                        Need faster service?
                      </h4>
                      <p className="text-orange-700 text-xs mb-2">
                        For urgent repairs or immediate assistance, use our chatbot for instant help and emergency dispatch.
                      </p>
                      <button
                        onClick={() => {
                          // Trigger chatbot open
                          const chatbotButton = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
                          if (chatbotButton) {
                            chatbotButton.click();
                          }
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-3 py-2 rounded-md transition-colors flex items-center space-x-1"
                      >
                        <span>🚨</span>
                        <span>Open Chatbot</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
