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
    "Разработка чат-ботов для бизнеса под ключ. Автоматизация заявок в Telegram, WhatsApp. Запуск за 7–14 дней. MVP от 49 000 ₽.",
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
    description: "Разработка чат-ботов для бизнеса под ключ. Автоматизация заявок. Запуск за 7–14 дней. MVP от 49 000 ₽.",
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
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ChatBot24",
              url: "https://chatbot24.su",
              logo: "https://chatbot24.su/favicon/favicon-32x32.png",
              description: "Разработка чат-ботов для бизнеса. Автоматизация заявок в Telegram и WhatsApp.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+7-999-999-9999",
                contactType: "sales",
                availableLanguage: ["Russian"],
              },
              sameAs: [
                "https://t.me/junior_middle_it",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
