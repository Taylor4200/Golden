'use client';

import { useSiteSettings } from '@/hooks/useSiteSettings';

export default function FAQSchema() {
  const { settings } = useSiteSettings();

  const faqData = [
    {
      question: "What hours are you open?",
      answer: `We're open Monday-Friday 9AM-9PM, Saturday-Sunday 9AM-5PM. We provide 24/7 emergency roadside assistance.`
    },
    {
      question: "Do you service all makes and models?",
      answer: "Yes! We service all heavy-duty truck makes including Freightliner, Kenworth, Peterbilt, Volvo, Mack, International, and more. Our experienced mechanics work on all major brands."
    },
    {
      question: "Do you do DOT inspections?",
      answer: "Absolutely! We provide comprehensive DOT inspections to ensure your truck meets all federal safety regulations. We're certified to perform all required inspections."
    },
    {
      question: "Where are you located?",
      answer: `We're located at ${settings.address}. We serve Hudson, Fort Collins, Greeley, and surrounding Colorado areas.`
    },
    {
      question: "Do you offer fleet services?",
      answer: "Yes! We provide customized maintenance programs for fleets of all sizes. Contact us for fleet pricing and scheduled maintenance packages."
    },
    {
      question: "What's your emergency response time?",
      answer: `For emergency roadside service, we typically respond within 30-60 minutes in the Hudson area. Call us at ${settings.contactPhone} for immediate assistance.`
    },
    {
      question: "What services do you offer?",
      answer: "We offer comprehensive heavy-duty truck repair services including engine repair, transmission service, brake systems, electrical diagnostics, suspension work, DOT inspections, and 24/7 emergency roadside assistance."
    },
    {
      question: "Do you offer warranties on repairs?",
      answer: "Yes, we stand behind our work with comprehensive warranties on all repairs. We use quality parts and our experienced mechanics ensure reliable service."
    },
    {
      question: "How much do your services cost?",
      answer: "Our pricing is competitive and varies based on the specific repair needed. We provide free estimates and transparent pricing. Contact us for a detailed quote."
    },
    {
      question: "Do you work on fleet vehicles?",
      answer: "Absolutely! We specialize in fleet maintenance and repair services. We offer scheduled maintenance programs, emergency service, and volume discounts for fleet customers."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema)
      }}
    />
  );
}
