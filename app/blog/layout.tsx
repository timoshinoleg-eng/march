import { Metadata } from "next";
import { BackButton } from "@/components/blog/BackButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://chatbot24.su"),
  openGraph: {
    siteName: "ChatBot24",
    locale: "ru_RU",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <BackButton />
      </div>
      {children}
    </div>
  );
}
