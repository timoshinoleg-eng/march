import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ChatBot24 — Инженерное бюро автоматизации заявок",
  description: "Автоматизация входящих заявок от 49 000 ₽. Запуск за 7-14 дней. Чат-боты, CRM, интеграции.",
  keywords: ["автоматизация заявок", "чат-бот", "CRM", "Telegram бот", "обработка заявок"],
  openGraph: {
    title: "ChatBot24 — Инженерное бюро автоматизации",
    description: "Автоматизация входящих заявок от 49 000 ₽",
    url: "https://chatbot24.su",
    type: "website",
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
        {/* Yandex.Metrika */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(12345678, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#021c1b] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
