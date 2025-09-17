import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Golden Heavy Duty Truck Repair | Expert Tips & Maintenance Guides',
  description: 'Expert insights, maintenance tips, and troubleshooting guides for semi truck owners. Learn from Golden Heavy Duty\'s experienced technicians in Hudson, CO.',
  keywords: 'semi truck blog, heavy duty truck maintenance, truck repair tips, diesel engine maintenance, air brake safety, truck diagnostics',
  openGraph: {
    title: 'Blog - Golden Heavy Duty Truck Repair',
    description: 'Expert insights, maintenance tips, and troubleshooting guides for semi truck owners.',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
