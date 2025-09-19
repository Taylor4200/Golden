import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heavy Duty Truck Services | Golden Heavy Duty | Hudson, CO',
  description: 'Comprehensive heavy-duty truck repair services including engine repair, transmission service, brake systems, diagnostics, and 24/7 emergency service in Hudson, CO.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

