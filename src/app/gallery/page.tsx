'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Wrench, Settings, Shield, Users } from 'lucide-react';


export default function Gallery() {
  const galleryCategories = [
    {
      title: 'Our Facility',
      description: 'State-of-the-art repair facility with modern equipment',
      icon: Settings,
      images: [
        {
          src: '/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg',
          alt: 'Main repair bay with heavy-duty lifts',
          caption: 'Main repair bay with heavy-duty lifts'
        },
        {
          src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Truck transmission service',
          caption: 'Transmission service and repair'
        },
        {
          src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Brake system inspection',
          caption: 'Brake system inspection and repair'
        },
        {
          src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          alt: 'Truck diagnostic equipment',
          caption: 'Advanced diagnostic equipment'
        }
      ]
    },
    {
      title: 'Repair Work',
      description: 'Before and after photos of our repair projects',
      icon: Wrench,
      images: [
        {
          src: '/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg',
          alt: 'Engine rebuild in progress',
          caption: 'Engine rebuild in progress'
        },
        {
          src: '/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg',
          alt: 'Transmission service',
          caption: 'Transmission service'
        },
        {
          src: '/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg',
          alt: 'Brake system repair',
          caption: 'Brake system repair'
        },
        {
          src: '/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg',
          alt: 'Electrical system diagnostics',
          caption: 'Electrical diagnostics'
        }
      ]
    },
    {
      title: 'Our Work',
      description: 'Professional truck repair and maintenance services',
      icon: Users,
      images: [
        {
          src: '/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg',
          alt: 'Team working on truck repair',
          caption: 'Professional repair work in progress'
        }
      ]
    },
    {
      title: 'Equipment & Tools',
      description: 'Professional-grade tools and diagnostic equipment',
      icon: Shield,
      images: [
        {
          src: '/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg',
          alt: 'Heavy-duty diagnostic computer',
          caption: 'Advanced diagnostic computer'
        },
        {
          src: '/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg',
          alt: 'Professional tool collection',
          caption: 'Professional tool collection'
        },
        {
          src: '/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg',
          alt: 'Heavy-duty lift system',
          caption: 'Heavy-duty lift system'
        },
        {
          src: '/bill-griepenstroh-Q9X_p5dDq_8-unsplash.jpg',
          alt: 'Specialized repair equipment',
          caption: 'Specialized repair equipment'
        }
      ]
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
                Our <span className="text-primary">Gallery</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Take a look inside our facility, meet our team, and see the quality 
                work we do for our customers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Categories */}
        {galleryCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <category.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                    {category.title}
                  </h2>
                </div>
                <p className="text-xl text-muted max-w-3xl mx-auto">
                  {category.description}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.images.map((image, imageIndex) => (
                  <motion.div
                    key={imageIndex}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: imageIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Before & After Section */}
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
                Before & <span className="text-primary">After</span>
              </h2>
              <p className="text-xl text-muted max-w-3xl mx-auto">
                See the transformation of trucks we've repaired. Quality workmanship 
                that gets results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  before: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  after: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  title: 'Engine Rebuild',
                  description: 'Complete engine overhaul and restoration'
                },
                {
                  before: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  after: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  title: 'Transmission Service',
                  description: 'Transmission rebuild and performance upgrade'
                },
                {
                  before: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  after: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  title: 'Brake System',
                  description: 'Complete brake system overhaul'
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <img
                        src={project.before}
                        alt={`Before: ${project.title}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-xs text-muted text-center mt-2">Before</p>
                    </div>
                    <div>
                      <img
                        src={project.after}
                        alt={`After: ${project.title}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-xs text-muted text-center mt-2">After</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-2">{project.title}</h3>
                  <p className="text-muted text-sm">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to See What We Can Do for Your Truck?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Contact us today to schedule service or get a quote. 
                Let us show you the Golden Heavy Duty difference.
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
