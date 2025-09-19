import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Golden Heavy Duty Truck Repair | Hudson, CO',
  description: 'Contact Golden Heavy Duty for heavy-duty truck repair services. Located at 806 Cedar St, Hudson, CO. Call (970) 123-4567 for 24/7 emergency service.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

