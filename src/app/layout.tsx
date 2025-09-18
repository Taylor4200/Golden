import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Chatbot from "@/components/Chatbot";
import FAQSchema from "@/components/FAQSchema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Golden Heavy Duty Truck Repair | Hudson, CO | 24/7 Emergency Road Service",
  description: "Professional heavy-duty truck repair in Hudson, CO. 24/7 emergency service, fast turnaround, experienced mechanics. Serving Fort Collins, Greeley & surrounding areas.",
  keywords: "heavy-duty truck & trailer repair Hudson CO, truck repair near me, trailer repair Fort Collins, emergency truck service, fleet maintenance",
  authors: [{ name: "Golden Heavy Duty" }],
  creator: "Golden Heavy Duty",
  publisher: "Golden Heavy Duty",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://goldenheavyduty.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Golden Heavy Duty Truck Repair | Hudson, CO",
    description: "Professional heavy-duty truck repair in Hudson, CO. 24/7 emergency service, fast turnaround, experienced mechanics. Serving Fort Collins, Greeley & surrounding areas.",
    url: "https://goldenheavyduty.com",
    siteName: "Golden Heavy Duty",
    locale: "en_US",
    type: "website",
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
    creator: '@goldenheavyduty',
    site: '@goldenheavyduty',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <FAQSchema />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} font-sans antialiased`}
      >
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
