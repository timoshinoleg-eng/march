import { Metadata } from "next";

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
  return <>{children}</>;
}
