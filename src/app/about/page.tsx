'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Wrench, Users, Award, Clock, Shield, MapPin } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Wrench,
      title: 'Expert Craftsmanship',
      description:
        'Our certified mechanics have 5+ years of combined experience working on all major truck brands.',
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description:
        'We understand downtime costs money. Our efficient processes get you back on the road quickly.',
    },
    {
      icon: Shield,
      title: 'Quality Warranty',
      description:
        'We stand behind our work with comprehensive warranties on all repairs and parts.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description:
        'Your success is our success. We build lasting relationships with every customer.',
    },
  ];

  const founders = [
    {
      name: 'Brandon',
      role: 'Co-Founder',
      experience: '5+ years',
      specialties: ['Engine Rebuilds', 'Transmission Service', 'Fleet Management'],
    },
    {
      name: 'Tyler',
      role: 'Co-Founder',
      experience: '5+ years',
      specialties: ['Customer Relations', 'Service Coordination', 'Quality Control'],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28">
        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="w-full px-6 sm:px-12 lg:px-20">
            {/* Make both columns equal height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:min-h-[500px]">
              
              {/* Text column, vertically centered */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="flex items-center justify-center"
              >
                <div className="max-w-[700px] w-full pl-6 lg:pl-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-5 text-muted leading-relaxed">
                    <p>
                      Founded in <strong>2021</strong> by <strong>Brandon and Tyler</strong>, Golden Heavy Duty has built a
                      reputation for <strong>excellence</strong> in heavy-duty truck repair with a big
                      vision: to provide <strong>reliable, professional</strong> heavy-duty truck repair
                      services to the growing <strong>Northern Colorado</strong> region.
                    </p>
                    <p>
                      What began as a <strong>one-man operation</strong> has grown into a <strong>full-service
                      facility</strong> with a team of <strong>certified technicians</strong>, <strong>state-of-the-art
                      diagnostic equipment</strong>, and a reputation for excellence that extends
                      across <strong>Colorado and beyond</strong>.
                    </p>
                    <p>
                      Today, we&apos;re proud to serve <strong>fleets of all sizes</strong>, from
                      <strong>owner-operators</strong> to <strong>major transportation companies</strong>, with the same
                      <strong>dedication to quality and customer service</strong> that has defined us from
                      day one.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Image column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative flex items-center"
              >
                <img
                  src="/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg"
                  alt="Golden Heavy Duty shop facility"
                  className="rounded-2xl shadow-2xl w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-primary text-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold font-sans">5+</div>
                  <div className="text-sm font-medium">Years of Excellence</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-gray-50">
          <div className="w-full px-6 sm:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto text-center">
                These core principles guide everything we do and ensure you receive
                the best possible service every time.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center group hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-4">{value.title}</h3>
                  <p className="text-muted leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="py-20 bg-white">
          <div className="w-full px-6 sm:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Meet Our <span className="text-primary">Founders</span>
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto text-center">
                Brandon and Tyler founded Golden Heavy Duty with a vision to provide
                reliable, professional heavy-duty truck repair services to Northern Colorado.
              </p>
            </motion.div>

            <div className="flex flex-col items-center space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
                {founders.map((founder, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center"
                  >
                    <div className="w-24 h-24 rounded-full mx-auto mb-6 bg-primary/10 flex items-center justify-center">
                      <div className="text-3xl font-bold text-primary">
                        {founder.name.charAt(0)}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary mb-3">{founder.name}</h3>
                    <p className="text-primary font-semibold mb-3 text-lg">{founder.role}</p>
                    <p className="text-muted text-sm mb-6">{founder.experience} Experience</p>
                    <div className="space-y-2">
                      {founder.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Facility */}
        <section className="py-20 bg-gray-50">
          <div className="w-full px-6 sm:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="relative"
              >
                <img
                  src="/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg"
                  alt="State-of-the-art repair facility"
                  className="rounded-2xl shadow-2xl w-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white p-4 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm">Sq Ft Facility</div>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <div className="max-w-[700px]">
                  <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                    State-of-the-Art Facility
                  </h2>
                  <div className="space-y-4 text-muted leading-relaxed">
                    <p>
                      Our 10,000+ square foot facility in Hudson, CO is equipped with the latest
                      diagnostic tools and repair equipment to handle any heavy-duty truck service need.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span>Certified diagnostic equipment for all major truck brands</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Wrench className="h-5 w-5 text-primary" />
                        <span>Heavy-duty lifts capable of handling the largest trucks</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>Convenient location with easy access for towing services</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <span>Climate-controlled parts storage and inventory management</span>
                      </li>
                    </ul>
                    
                    {/* Google Maps Embed */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-secondary mb-4">Visit Our Facility</h3>
                      <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
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
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary text-white">
          <div className="w-full px-6 sm:px-12 lg:px-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Ready to Experience the Golden Heavy Duty Difference?
              </h2>
              <p className="text-xl text-gray-300 mb-8 text-center">
                Join hundreds of satisfied customers who trust us with their heavy-duty truck repair needs.
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
                  className="btn-outline flex items-center space-x-2 text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-secondary"
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
