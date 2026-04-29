import type { Metadata } from "next";
import RestoBotLanding from "./restobot-landing";

export const metadata: Metadata = {
  title: "RestoBot — меню и заказы в Telegram для кафе и ресторанов",
  description:
    "RestoBot помогает кафе и ресторанам быстро запустить меню и заказы в Telegram без сложного внедрения. Первый месяц бесплатно.",
  alternates: {
    canonical: "https://chatbot24.su/restobot",
  },
  openGraph: {
    title: "RestoBot — меню и заказы в Telegram для кафе и ресторанов",
    description:
      "Telegram-first канал заказов для кафе, ресторанов и доставки: меню, заказ, статусы и пилотный запуск без тяжёлого внедрения.",
    url: "https://chatbot24.su/restobot",
    type: "website",
  },
};

export default function RestoBotPage() {
  return <RestoBotLanding />;
}
