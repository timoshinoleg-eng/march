'use client';

import Script from 'next/script';

export default function SchemaOrg() {
  const schemaOrgJSON = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://chatbot24.su/#organization",
        name: "ChatBot24",
        url: "https://chatbot24.su",
        logo: {
          "@type": "ImageObject",
          url: "https://chatbot24.su/favicon.png",
          width: 512,
          height: 512
        },
        sameAs: [
          "https://t.me/ChatBot24su_bot"
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+7-XXX-XXX-XX-XX",
          contactType: "sales",
          areaServed: "RU",
          availableLanguage: ["Russian"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://chatbot24.su/#website",
        url: "https://chatbot24.su",
        name: "ChatBot24 — чат-боты и автоматизация заявок",
        description: "Инженерное бюро автоматизации. Запускаем систему обработки обращений за 7–14 дней.",
        publisher: {
          "@id": "https://chatbot24.su/#organization"
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://chatbot24.su/blog?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://chatbot24.su/#localbusiness",
        name: "ChatBot24",
        image: "https://chatbot24.su/og-image.jpg",
        url: "https://chatbot24.su",
        telephone: "+7-XXX-XXX-XX-XX",
        priceRange: "₽₽",
        areaServed: "Россия",
        serviceType: ["Разработка чат-ботов", "Автоматизация заявок", "Внедрение AI-ассистентов"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Услуги автоматизации",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Lite чат-бот",
                description: "Базовый чат-бот для старта"
              },
              price: "19900",
              priceCurrency: "RUB"
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Base чат-бот",
                description: "Оптимально для растущего бизнеса"
              },
              price: "39000",
              priceCurrency: "RUB"
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI чат-бот",
                description: "AI-ассистент с YandexGPT"
              },
              price: "69000",
              priceCurrency: "RUB"
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Enterprise чат-бот",
                description: "Для медицины и крупного бизнеса"
              },
              price: "129000",
              priceCurrency: "RUB"
            }
          ]
        }
      }
    ]
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSON) }}
    />
  );
}
