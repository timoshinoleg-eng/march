import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ChatWidgetProvider from "@/components/ChatWidgetProvider";
import YandexMetrika from "@/components/YandexMetrika";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://chatbot24.su"),
  title: {
    default: "Чат-боты для бизнеса в Telegram и WhatsApp | ChatBot24",
    template: "%s | ChatBot24",
  },
  description:
    "Разработка чат-ботов для бизнеса под ключ. Автоматизация заявок в Telegram, WhatsApp. Запуск за 7–14 дней. От 19 900 ₽.",
  keywords: [
    "чат-бот",
    "автоматизация заявок",
    "чатбот для бизнеса",
    "бот для заявок",
    "автоматизация продаж",
    "чат-бот telegram",
    "разработка чат-ботов"
  ],
  authors: [{ name: "ChatBot24" }],
  creator: "ChatBot24",
  publisher: "ChatBot24",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://chatbot24.su",
    types: {
      'application/rss+xml': '/turbo.xml',
    },
  },
  openGraph: {
    title: "Чат-боты для бизнеса в Telegram и WhatsApp | ChatBot24",
    description: "Разработка чат-ботов для бизнеса под ключ. Автоматизация заявок. Запуск за 7–14 дней. От 19 900 ₽.",
    type: "website",
    locale: "ru_RU",
    siteName: "ChatBot24",
    url: "https://chatbot24.su",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Чат-боты для бизнеса в Telegram и WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Чат-боты для бизнеса | ChatBot24",
    description: "Разработка чат-ботов для бизнеса под ключ. Запуск за 7–14 дней.",
    images: ["/og-image.jpg"],
  },
  verification: {
    yandex: "106988133",
  },
  other: {
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-bg-primary text-text-primary">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
        <ChatWidgetProvider />
        <YandexMetrika />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ChatBot24",
              alternateName: "ЧатБот24",
              url: "https://chatbot24.su",
              logo: "https://chatbot24.su/logo_header.png",
              description: "Разработка умных чат-ботов для бизнеса. Автоматизация входящих заявок, ответы клиентам 24/7. Интеграция с CRM, WhatsApp, Telegram, VK.",
              slogan: "Автоматизируем общение с клиентами",
              foundingDate: "2020",
              email: "info@chatbot24.su",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+7-993-336-61-02",
                contactType: "sales",
                availableLanguage: ["Russian"],
              },
              sameAs: [
                "https://vk.com/club237277911",
                "https://t.me/chatbot24su",
              ],
            }),
          }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ChatBot24",
              url: "https://chatbot24.su",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://chatbot24.su/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Сколько стоит разработка чат-бота?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Стоимость разработки чат-бота варьируется от 0₽ (конструкторы) до 2 000 000₽+ (корпоративные решения). Средний проект для малого бизнеса — 50 000–300 000₽."
                  }
                },
                {
                  "@type": "Question",
                  name: "Какие мессенджеры поддерживаются?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Мы разрабатываем чат-ботов для Telegram, WhatsApp, VK, Viber и веб-чатов. Также возможна мультиканальная интеграция."
                  }
                },
                {
                  "@type": "Question",
                  name: "Сколько времени занимает разработка?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Простой чат-бот запускается за 1–2 недели, проект средней сложности — за 2–4 недели, сложное корпоративное решение — за 4–8 недель."
                  }
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
