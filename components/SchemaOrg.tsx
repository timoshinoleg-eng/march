'use client';

import Script from 'next/script';
import { PRICING_PLANS, CUSTOM_INTEGRATIONS } from '@/data/catalog';
import { COMPANY } from '@/data/company';

/**
 * JSON-LD structured data.
 *
 * Генерируется из единого источника правды (data/catalog.ts, data/company.ts).
 * Убраны неподтверждённые факты и несуществующие функции:
 *   - SearchAction на /blog?q= (поиска по блогу нет)
 *   - placeholder-телефон +7-XXX-XXX-XX-XX
 *   - OG-image, который возвращает 404
 *   - фиктивные цены, отличные от catalog.ts
 */
export default function SchemaOrg() {
  const offers = PRICING_PLANS.map((plan) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: plan.name,
      description: plan.description,
    },
    price: String(plan.price),
    priceCurrency: 'RUB',
  }));

  const customIntegrationServices = CUSTOM_INTEGRATIONS.map((integration) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: integration.name,
      description: integration.description,
    },
    // Для custom-интеграций цена не публикуется — only after brief.
    priceCurrency: 'RUB',
    eligibilityType: 'Custom quote required',
  }));

  const schemaOrgJSON = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${COMPANY.website}/#organization`,
        name: COMPANY.name,
        url: COMPANY.website,
        foundingDate: String(COMPANY.foundingYear),
        logo: {
          '@type': 'ImageObject',
          url: `${COMPANY.website}/favicon.png`,
          width: 512,
          height: 512,
        },
        sameAs: ['https://t.me/ChatBot24su_bot'],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: COMPANY.phone,
          email: COMPANY.email,
          contactType: 'sales',
          areaServed: 'RU',
          availableLanguage: ['Russian'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${COMPANY.website}/#website`,
        url: COMPANY.website,
        name: `${COMPANY.name} — ${COMPANY.specialization}`,
        description: COMPANY.description,
        publisher: { '@id': `${COMPANY.website}/#organization` },
        // SearchAction убран: поиска по сайту нет.
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${COMPANY.website}/#localbusiness`,
        name: COMPANY.name,
        url: COMPANY.website,
        telephone: COMPANY.phone,
        email: COMPANY.email,
        priceRange: '₽₽',
        areaServed: 'RU',
        address: {
          '@type': 'PostalAddress',
          addressLocality: COMPANY.city,
          addressCountry: 'RU',
        },
        serviceType: [
          'Разработка Telegram-ботов',
          'Автоматизация приёма заявок',
          'Интеграции с CRM и внешними сервисами',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Услуги автоматизации',
          itemListElement: [...offers, ...customIntegrationServices],
        },
      },
    ],
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSON) }}
    />
  );
}
