'use client'

import Script from 'next/script'

export function SchemaOrg() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://chatbot24.su/#organization',
    name: 'ChatBot24',
    alternateName: 'ЧатБот24',
    url: 'https://chatbot24.su/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://chatbot24.su/images/logo_header.png',
      width: 512,
      height: 512,
    },
    image: 'https://chatbot24.su/images/og_image.png',
    description: 'Разработка умных чат-ботов для бизнеса. Автоматизация входящих заявок, ответы клиентам 24/7. Интеграция с CRM, WhatsApp, Telegram, VK.',
    slogan: 'Автоматизируем общение с клиентами',
    foundingDate: '2020',
    email: 'info@chatbot24.su',
    telephone: '+7 (993) 336-61-02',
    sameAs: [
      'https://t.me/chatbot24su',
      'https://vk.com/chatbot24su',
      'https://github.com/chatbot24',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Россия',
    },
    knowsAbout: [
      'Чат-боты',
      'Автоматизация бизнеса',
      'AI-ассистенты',
      'WhatsApp API',
      'Telegram боты',
      'Интеграция CRM',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Услуги ChatBot24',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Разработка чат-ботов для WhatsApp',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Разработка Telegram-ботов',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Разработка ботов для ВКонтакте',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Интеграция чат-ботов с CRM',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI-чатботы с машинным обучением',
          },
        },
      ],
    },
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://chatbot24.su/#localbusiness',
    name: 'ChatBot24',
    image: 'https://chatbot24.su/images/og_image.png',
    url: 'https://chatbot24.su/',
    telephone: '+7 (993) 336-61-02',
    email: 'info@chatbot24.su',
    priceRange: '₽₽',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
      addressLocality: 'Москва',
      addressRegion: 'Московская область',
      streetAddress: 'ул. Примерная, д. 1, офис 100',
      postalCode: '123456',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '55.7558',
      longitude: '37.6173',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
    },
    paymentAccepted: ['Наличные', 'Банковская карта', 'Безналичный расчёт'],
    currenciesAccepted: 'RUB',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://chatbot24.su/#website',
    url: 'https://chatbot24.su/',
    name: 'ChatBot24',
    publisher: {
      '@id': 'https://chatbot24.su/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://chatbot24.su/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Сколько стоит разработка чат-бота?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Стоимость разработки чат-бота зависит от сложности функционала. Базовый бот для ответов на частые вопросы — от 15 000 ₽. Бот с интеграцией CRM, оплатой и сложной логикой — от 35 000 ₽. Оставьте заявку для расчёта точной стоимости под ваши задачи.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какие мессенджеры поддерживаются?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Мы разрабатываем чат-ботов для всех популярных мессенджеров: WhatsApp (через официальный API), Telegram (боты и Mini Apps), ВКонтакте (сообщения сообществ), а также для сайтов через виджеты онлайн-консультантов.',
        },
      },
      {
        '@type': 'Question',
        name: 'Сколько времени занимает разработка?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Простой чат-бот готов за 3-5 рабочих дней. Бот средней сложности с интеграциями — 1-2 недели. Сложные решения с AI, машинным обучением и кастомной логикой — от 3 недель. Точные сроки обсуждаем после анализа ТЗ.',
        },
      },
      {
        '@type': 'Question',
        name: 'Можно ли интегрировать бота с CRM?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, мы интегрируем чат-ботов с любыми CRM-системами: amoCRM, Битрикс24, МойСклад, Salesforce, HubSpot и другими. Бот может автоматически создавать сделки, добавлять контакты, обновлять статусы и передавать данные в вашу систему.',
        },
      },
      {
        '@type': 'Question',
        name: 'Нужна ли техническая поддержка после запуска?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'После запуска мы предоставляем гарантийную поддержку 30 дней. Далее доступны пакеты технической поддержки: базовый (обновления и мониторинг) — от 3 000 ₽/мес, расширенный (доработки и приоритетная поддержка) — от 7 000 ₽/мес.',
        },
      },
      {
        '@type': 'Question',
        name: 'Чат-бот заменит живых операторов?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Чат-бот берёт на себя рутинные задачи: ответы на частые вопросы, сбор контактов, квалификация лидов. Сложные вопросы и нестандартные ситуации бот передаёт живому оператору. Это экономит время сотрудников и ускоряет обработку заявок в 3-5 раз.',
        },
      },
      {
        '@type': 'Question',
        name: 'Какие гарантии вы предоставляете?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Мы работаем по договору с фиксированной стоимостью и сроками. Предоставляем 30-дневную гарантию на исправление ошибок. Оплата поэтапная: 50% предоплата, 50% после приёмки. Все права на разработанный бот переходят заказчику.',
        },
      },
    ],
  }

  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
