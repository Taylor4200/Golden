import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export const metadata = {
  title: 'Terms of Service | Golden Heavy Duty Truck Repair',
  description: 'Terms of Service for Golden Heavy Duty Truck Repair. Read our terms and conditions for using our services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-gray-900 text-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Terms of <span className="text-primary">Service</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
                Please read these terms and conditions carefully before using our services.
              </p>
              <p className="text-sm text-gray-400 mt-4">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16">
            <div className="prose prose-lg max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Agreement to Terms</h2>
                  <p className="text-muted leading-relaxed">
                    By accessing and using the services of Golden Heavy Duty Truck Repair, you accept and 
                    agree to be bound by the terms and provision of this agreement. If you do not agree to 
                    abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Services Provided</h2>
                  <p className="text-muted leading-relaxed mb-4">
                    Golden Heavy Duty Truck Repair provides the following services:
                  </p>
                  <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                    <li>Heavy-duty truck and trailer repair</li>
                    <li>Engine repair and rebuilds</li>
                    <li>Transmission service</li>
                    <li>Brake system service</li>
                    <li>Diagnostics and electrical work</li>
                    <li>Emergency roadside assistance</li>
                    <li>Fleet maintenance programs</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Service Area</h2>
                  <p className="text-muted leading-relaxed">
                    Our services are available within a 100-mile radius of Denver, Colorado. Emergency 
                    services may be available in extended areas at additional rates. Service availability 
                    is subject to weather conditions and other factors beyond our control.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Pricing and Payment</h2>
                  <p className="text-muted leading-relaxed mb-4">
                    All services are provided at our current rates, which may vary based on:
                  </p>
                  <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                    <li>Type and complexity of repair</li>
                    <li>Parts and materials required</li>
                    <li>Labor time involved</li>
                    <li>Emergency service surcharges</li>
                    <li>Travel distance for mobile service</li>
                  </ul>
                  <p className="text-muted leading-relaxed mt-4">
                    Payment is due upon completion of service unless other arrangements have been made 
                    in advance. We accept cash, check, and major credit cards.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Warranties and Guarantees</h2>
                  <p className="text-muted leading-relaxed">
                    We stand behind our work and provide warranties on parts and labor as specified in 
                    our service agreements. Warranty terms vary by service type and will be clearly 
                    communicated before work begins. Our warranty does not cover damage caused by 
                    misuse, neglect, or normal wear and tear.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Customer Responsibilities</h2>
                  <p className="text-muted leading-relaxed mb-4">
                    As our customer, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                    <li>Provide accurate information about your vehicle and service needs</li>
                    <li>Allow reasonable access to your vehicle for service</li>
                    <li>Pay for services as agreed upon</li>
                    <li>Follow any maintenance recommendations provided</li>
                    <li>Report any issues with completed work promptly</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Limitation of Liability</h2>
                  <p className="text-muted leading-relaxed">
                    Golden Heavy Duty Truck Repair's liability is limited to the cost of the services 
                    provided. We are not liable for any indirect, incidental, or consequential damages 
                    arising from our services. This limitation applies to the fullest extent permitted by law.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Emergency Services</h2>
                  <p className="text-muted leading-relaxed">
                    Emergency services are available 24/7 but may be subject to additional charges. 
                    Response times may vary based on location, weather conditions, and current service 
                    demand. We will provide estimated arrival times when possible.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Cancellation Policy</h2>
                  <p className="text-muted leading-relaxed">
                    Appointments may be cancelled or rescheduled with at least 24 hours notice. 
                    Cancellations with less than 24 hours notice may be subject to a cancellation fee. 
                    Emergency service cancellations are handled on a case-by-case basis.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Dispute Resolution</h2>
                  <p className="text-muted leading-relaxed">
                    Any disputes arising from our services will be resolved through good faith negotiation. 
                    If a resolution cannot be reached, disputes will be subject to binding arbitration 
                    in accordance with Colorado state law.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Contact Information</h2>
                  <p className="text-muted leading-relaxed">
                    For questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg mt-4">
                    <p className="text-muted">
                      <strong>Golden Heavy Duty Truck Repair</strong><br />
                      806 Cedar St, Hudson, CO 80642<br />
                      Phone: (303) 304-9993<br />
                      Email: breakdown@goldenheavyduty.com
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Changes to Terms</h2>
                  <p className="text-muted leading-relaxed">
                    We reserve the right to modify these terms at any time. Changes will be effective 
                    immediately upon posting. Continued use of our services after changes constitutes 
                    acceptance of the new terms.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
