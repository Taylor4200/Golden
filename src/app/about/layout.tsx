import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Golden Heavy Duty Truck Repair | Hudson, CO',
  description: 'Learn about Golden Heavy Duty\'s experienced team, state-of-the-art facility, and commitment to quality heavy-duty truck repair in Hudson, CO.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
