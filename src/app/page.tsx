import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Golden Heavy Duty Truck Repair | Hudson, CO | 24/7 Emergency Road Service',
  description: 'Professional heavy-duty truck repair in Hudson, CO. 24/7 emergency service, fast turnaround, experienced mechanics. Serving Fort Collins, Greeley & surrounding areas.',
  openGraph: {
    title: 'Golden Heavy Duty Truck Repair | Hudson, CO',
    description: 'Professional heavy-duty truck repair in Hudson, CO. 24/7 emergency service, fast turnaround, experienced mechanics.',
    images: [
      {
        url: '/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Golden Heavy Duty Truck Repair Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golden Heavy Duty Truck Repair | Hudson, CO',
    description: 'Professional heavy-duty truck repair in Hudson, CO. 24/7 emergency service, fast turnaround, experienced mechanics.',
    images: ['/Logo.png'],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
