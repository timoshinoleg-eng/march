import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SchemaOrg } from '@/components/seo/SchemaOrg'
import { YandexMetrika } from '@/components/analytics/YandexMetrika'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'ChatBot24 — Автоматизация заявок и продаж через AI-чатботы | WhatsApp, Telegram, VK',
  description: 'ChatBot24 — разработка умных чат-ботов для бизнеса. Автоматизация входящих заявок, ответы на вопросы клиентов 24/7, интеграция с CRM. Подключение WhatsApp, Telegram, VK.',
  keywords: 'чат-бот, chatbot, автоматизация заявок, бот для бизнеса, WhatsApp бот, Telegram бот, VK бот, AI чат-бот',
  authors: [{ name: 'ChatBot24' }],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://chatbot24.su/',
    title: 'ChatBot24 — Автоматизация заявок и продаж через AI-чатботы',
    description: 'Разработка умных чат-ботов для бизнеса. Автоматизация входящих заявок, ответы клиентам 24/7. Подключение WhatsApp, Telegram, VK.',
    images: [
      {
        url: 'https://chatbot24.su/images/og_image.png',
        width: 1200,
        height: 630,
        alt: 'ChatBot24 — AI-чатботы для бизнеса',
      },
    ],
    locale: 'ru_RU',
    siteName: 'ChatBot24',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatBot24 — Автоматизация заявок и продаж через AI-чатботы',
    description: 'Разработка умных чат-ботов для бизнеса. Автоматизация входящих заявок, ответы клиентам 24/7.',
    images: ['https://chatbot24.su/images/og_image.png'],
  },
  alternates: {
    canonical: 'https://chatbot24.su/',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    shortcut: '/favicon/favicon.ico',
  },
  themeColor: '#2563EB',
  other: {
    'msapplication-TileColor': '#2563EB',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
        <SchemaOrg />
        <YandexMetrika />
      </body>
    </html>
  )
}
