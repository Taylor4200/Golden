import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Golden Heavy Duty Truck Repair | Hudson, CO',
  description: 'View our facility, equipment, and completed heavy-duty truck repair projects. See why Golden Heavy Duty is the trusted choice for truck repair in Hudson, CO.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

