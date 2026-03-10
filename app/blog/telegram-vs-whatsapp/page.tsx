import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: "Telegram vs WhatsApp — ChatBot24 Studio",
  description: "Сравнение возможностей платформ для бизнес-ботов",
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
                Telegram vs WhatsApp
              </h1>
              <time className="text-sm text-white/50 block mb-8">20 января 2024</time>

              <div className="space-y-6 text-white/80">
                <p>
                  Выбор платформы для чат-бота — важное решение. Telegram и WhatsApp Business 
                  API — два основных варианта для российского рынка. Разберём их сильные стороны.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  Telegram: гибкость и возможности
                </h2>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Мощный Bot API с богатыми возможностями</li>
                  <li>Глубокая кастомизация кнопок и интерфейса</li>
                  <li>Встроенные платежи</li>
                  <li>Web App — полноценные мини-приложения внутри бота</li>
                  <li>Бесплатная рассылка без ограничений</li>
                  <li>Открытый код и активное сообщество разработчиков</li>
                </ul>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  WhatsApp: привычка аудитории
                </h2>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Более широкая аудитория в некоторых сегментах</li>
                  <li>Привычный интерфейс для пользователей</li>
                  <li>Официальный статус Business API</li>
                  <li>Интеграция с Meta Business Suite</li>
                </ul>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  Наш выбор
                </h2>
                <p>
                  Мы специализируемся на Telegram, потому что платформа даёт больше возможностей 
                  для создания качественного пользовательского опыта. Гибкость API позволяет 
                  реализовать сложные сценарии, которые в WhatsApp требуют значительных 
                  дополнительных затрат.
                </p>

                <p>
                  WhatsApp Business API подходит для базовых задач, но его ограничения 
                  (платные сообщения, ограниченная кастомизация, сложность подключения) 
                  делают Telegram предпочтительным выбором для большинства проектов.
                </p>

                <div className="mt-12 p-6 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl">
                  <p className="m-0 font-semibold text-[#F0F6FF]">
                    Не уверены, какая платформа подойдёт вашему бизнесу? Проконсультируем 
                    бесплатно после заполнения брифа.
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
