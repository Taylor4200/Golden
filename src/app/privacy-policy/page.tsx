import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export const metadata = {
  title: 'Privacy Policy | Golden Heavy Duty Truck Repair',
  description: 'Privacy Policy for Golden Heavy Duty Truck Repair. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  const { settings } = useSiteSettings();
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-gray-900 text-white">
          <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Privacy <span className="text-primary">Policy</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
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
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Information We Collect</h2>
                  <p className="text-muted leading-relaxed mb-4">
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                    <li>Request a quote or service</li>
                    <li>Contact us via phone, email, or our website</li>
                    <li>Schedule an appointment</li>
                    <li>Create an account with us</li>
                  </ul>
                  <p className="text-muted leading-relaxed mt-4">
                    This information may include your name, email address, phone number, vehicle information, 
                    and service history.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">How We Use Your Information</h2>
                  <p className="text-muted leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices, updates, and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Communicate with you about services and promotions</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Information Sharing</h2>
                  <p className="text-muted leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    without your consent, except as described in this policy. We may share your information 
                    in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-muted space-y-2 ml-4 mt-4">
                    <li>With service providers who assist us in operating our business</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In connection with a business transfer or acquisition</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Data Security</h2>
                  <p className="text-muted leading-relaxed">
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. However, no method of 
                    transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Cookies and Tracking</h2>
                  <p className="text-muted leading-relaxed">
                    Our website may use cookies and similar tracking technologies to enhance your experience. 
                    You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Your Rights</h2>
                  <p className="text-muted leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Contact Us</h2>
                  <p className="text-muted leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg mt-4">
                    <p className="text-muted">
                      <strong>Golden Heavy Duty Truck Repair</strong><br />
                      {settings.address}<br />
                      Phone: {settings.contactPhone}<br />
                      Email: {settings.contactEmail}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Changes to This Policy</h2>
                  <p className="text-muted leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes 
                    by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
