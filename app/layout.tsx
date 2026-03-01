import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import YandexMetrika from "@/components/YandexMetrika";
import Header from "@/components/Header";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#021c1b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://chatbot24.su"),
  title: {
    default: "ChatBot24 - Автоматизация входящих заявок",
    template: "%s | ChatBot24",
  },
  description:
    "Инженерное бюро автоматизации. Запускаем систему обработки обращений за 7–14 дней. MVP-бот от 49 000 ₽.",
  keywords: ["чат-бот", "автоматизация заявок", "чатбот для бизнеса", "бот для заявок", "автоматизация продаж"],
  authors: [{ name: "ChatBot24" }],
  creator: "ChatBot24",
  publisher: "ChatBot24",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "ChatBot24 - Автоматизация входящих заявок",
    description: "Инженерное бюро автоматизации. Запускаем систему обработки обращений за 7–14 дней. MVP-бот от 49 000 ₽.",
    type: "website",
    locale: "ru_RU",
    siteName: "ChatBot24",
    url: "https://chatbot24.su",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ChatBot24 - Автоматизация входящих заявок",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatBot24 - Автоматизация входящих заявок",
    description: "Инженерное бюро автоматизации. Запускаем систему обработки обращений за 7–14 дней.",
    images: ["/og-image.jpg"],
  },
  verification: {
    yandex: "106988133",
  },
  other: {
    "format-detection": "telephone=no",
  },
};

// Critical CSS inline для LCP
const criticalCSS = `
  :root {
    --color-bg-primary: #021c1b;
    --color-primary-500: #14b8a6;
    --color-primary-400: #2dd4bf;
  }
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }
  body {
    margin: 0;
    background-color: var(--color-bg-primary);
    color: white;
    font-family: system-ui, -apple-system, sans-serif;
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
      </head>
      <body 
        className="font-sans antialiased bg-bg-primary text-white min-h-screen"
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Suspense fallback={null}>
          <YandexMetrika />
        </Suspense>
      </body>
    </html>
  );
}
