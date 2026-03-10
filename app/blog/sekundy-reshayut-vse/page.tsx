import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: "Секунды решают всё — ChatBot24 Studio",
  description: "Почему скорость ответа критична для продаж и как бот помогает",
}

export default function BlogPost() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="container-landing">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-[#22C55E] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад в блог
            </Link>

            <article className="prose prose-invert prose-lg max-w-none">
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                Секунды решают всё
              </h1>
              <time className="text-sm text-white/50 block mb-8">1 февраля 2024</time>

              <div className="space-y-6 text-white/80">
                <p>
                  Исследование Harvard Business Review показало: если ответить на заявку 
                  в течение 5 минут, вероятность сделки выше в 100 раз, чем через 30 минут. 
                  Через час — шанс превращения лида в клиента падает на 60%.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  Почему так происходит?
                </h2>
                <p>
                  Клиент в момент обращения максимально вовлечён. Он уже сравнил варианты, 
                  принял решение, готов к действию. Каждая минута ожидания — это время для 
                  сомнений, отвлечений, перехода к конкуренту.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  Чат-бот решает проблему
                </h2>
                <p>
                  Бот отвечает мгновенно. Даже если это простое «Здравствуйте! Мы получили 
                  ваше сообщение, менеджер ответит через 10 минут» — клиент понимает, что 
                  обращение принято и будет обработано.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  Автоматизация не заменяет человека
                </h2>
                <p>
                  Главная ошибка — думать, что бот должен закрывать сделку. Его задача — 
                  удержать клиента, собрать информацию, передать менеджеру подготовленный 
                  диалог. Человек закрывает сделку, но уже с преимуществом мгновенного 
                  первого контакта.
                </p>

                <div className="mt-12 p-6 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl">
                  <p className="m-0 font-semibold text-[#F0F6FF]">
                    Настройте мгновенный ответ клиентам 24/7. Заполните бриф — рассчитаем 
                    решение для вашего бизнеса.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
