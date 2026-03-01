import type { Metadata } from "next";
import "./globals.css";
import YandexMetrika from "@/components/YandexMetrika";

export const metadata: Metadata = {
  metadataBase: new URL("https://chatbot24.su"),
  title: "ChatBot24 - Автоматизация входящих заявок",
  description:
    "Инженерное бюро автоматизации. Запускаем систему обработки обращений за 7–14 дней. MVP-бот от 49 000 ₽.",
  keywords: "чат-бот, автоматизация заявок, чатбот для бизнеса, бот для заявок, автоматизация продаж",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "ChatBot24 - Автоматизация входящих заявок",
    description: "Инженерное бюро автоматизации. Запускаем систему обработки обращений за 7–14 дней. MVP-бот от 49 000 ₽.",
    type: "website",
    locale: "ru_RU",
    siteName: "ChatBot24",
    url: "https://chatbot24.su",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "ChatBot24 - Автоматизация входящих заявок",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatBot24 - Автоматизация входящих заявок",
    description: "Инженерное бюро автоматизации. Запускаем систему обработки обращений за 7–14 дней.",
    images: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased bg-bg-primary text-white">
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
