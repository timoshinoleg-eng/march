import { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://chatbot24.su"),
  openGraph: {
    siteName: "ChatBot24",
    locale: "ru_RU",
  },
};

/**
 * Layout всех страниц блога.
 *
 * G1 (аудит): ранее здесь не было Header/Footer — пользователь, зашедший
 * на статью из поиска, не мог вернуться на главную в один клик.
 * Теперь шапка и футер есть на всех страницам блога.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
