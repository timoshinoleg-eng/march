import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import YandexMetrika from "@/components/YandexMetrika";

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
    icon: "/favicon.svg",
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className="font-sans antialiased bg-bg-primary text-white min-h-screen"
        suppressHydrationWarning
      >
        {children}
        <Suspense fallback={null}>
          <YandexMetrika />
        </Suspense>
      </body>
    </html>
  );
}
