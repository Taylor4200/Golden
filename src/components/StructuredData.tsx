export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Golden Heavy Duty",
    "description": "Professional heavy-duty truck repair services in Hudson, CO. 24/7 emergency service, fast turnaround, experienced mechanics.",
    "url": "https://goldenheavyduty.com",
    "logo": "https://goldenheavyduty.com/logo.png",
    "image": "https://goldenheavyduty.com/hero-image.jpg",
    "telephone": "+13033049993",
    "email": "breakdown@goldenheavyduty.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "806 Cedar St",
      "addressLocality": "Hudson",
      "addressRegion": "CO",
      "postalCode": "80642",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.0736",
      "longitude": "-104.6372"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "16:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Check"],
    "currenciesAccepted": "USD",
    "areaServed": [
      {
        "@type": "City",
        "name": "Hudson",
        "containedInPlace": {
          "@type": "State",
          "name": "Colorado"
        }
      },
      {
        "@type": "City",
        "name": "Fort Collins",
        "containedInPlace": {
          "@type": "State",
          "name": "Colorado"
        }
      },
      {
        "@type": "City",
        "name": "Greeley",
        "containedInPlace": {
          "@type": "State",
          "name": "Colorado"
        }
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "40.0736",
        "longitude": "-104.6372"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Heavy Duty Truck Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Engine Repair",
            "description": "Complete engine diagnostics, rebuilds, and maintenance for all heavy-duty truck engines."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transmission Service",
            "description": "Expert transmission repair, rebuilds, and maintenance to keep your truck shifting smoothly."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brake Systems",
            "description": "Comprehensive brake system service, repair, and maintenance for maximum safety."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Diagnostics",
            "description": "State-of-the-art diagnostic equipment to quickly identify and resolve issues."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Service",
            "description": "24/7 emergency roadside assistance for when you need help most."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fleet Maintenance",
            "description": "Comprehensive fleet maintenance programs to keep your entire operation running."
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Mike Rodriguez"
        },
        "reviewBody": "Golden Heavy Duty has been keeping our fleet running for over 5 years. Their emergency service saved us thousands in downtime costs. Professional, reliable, and always fair pricing."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Chen"
        },
        "reviewBody": "When our main truck broke down on I-76, Golden Heavy Duty had us back on the road in 4 hours. Their diagnostic skills are unmatched in the area."
      }
    ],
    "sameAs": [
      "https://www.facebook.com/goldenheavyduty",
      "https://www.twitter.com/goldenheavyduty",
      "https://www.instagram.com/goldenheavyduty"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://goldenheavyduty.com/#business",
    "name": "Golden Heavy Duty",
    "description": "Heavy-duty truck repair and maintenance services in Hudson, Colorado",
    "url": "https://goldenheavyduty.com",
    "telephone": "+13033049993",
    "email": "breakdown@goldenheavyduty.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "806 Cedar St",
      "addressLocality": "Hudson",
      "addressRegion": "CO",
      "postalCode": "80642",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.0736",
      "longitude": "-104.6372"
    },
    "openingHours": [
      "Mo-Fr 07:00-18:00",
      "Sa 08:00-16:00"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Check"],
    "currenciesAccepted": "USD"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
    </>
  );
}
