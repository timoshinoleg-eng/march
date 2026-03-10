"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит внедрение чат-бота?",
    answer: "Стоимость зависит от сложности проекта. Базовый MVP-бот — от 49 000 ₽, полноценная Sales-система — от 129 000 ₽, AI-автоматизация — от 240 000 ₽. Точную смету даём после бесплатной консультации.",
  },
  {
    question: "Какие сроки запуска?",
    answer: "Стандартный проект запускается за 7-14 дней. Срок включает аудит, проектирование, разработку и тестирование. Сложные интеграции могут добавить 3-5 дней.",
  },
  {
    question: "Какие каналы вы интегрируете?",
    answer: "Работаем с Telegram, WhatsApp, Instagram, ВКонтакте, сайтами (виджеты), email. Можем интегрировать несколько каналов в единую систему обработки.",
  },
  {
    question: "Нужна ли подписка после запуска?",
    answer: "Нет, система работает на вашей инфраструктуре. Вы платите только за хостинг (обычно 1-3 тыс. ₽/мес) и API сервисы по мере использования. Мы предлагаем поддержку по договору, но это опционально.",
  },
  {
    question: "Как происходит передача на менеджера?",
    answer: "Бот собирает всю необходимую информацию и передаёт её в CRM или Telegram менеджеру. Менеджер видит контекст диалога и может сразу начинать работу с клиентом.",
  },
  {
    question: "Можно ли дорабатывать бота после запуска?",
    answer: "Да, конечно. Мы оставляем документацию и можем обучить вашу команду работе с системой. Доработки оплачиваются отдельно по оценке трудозатрат.",
  },
  {
    question: "Какая гарантия на работу?",
    answer: "Мы фиксируем KPI в договоре (например, время ответа < 30 сек, точность квалификации > 90%). Если не достигаем — дорабатываем бесплатно до достижения показателей.",
  },
  {
    question: "Работаете ли вы по договору?",
    answer: "Да, работаем официально по договору подряда. Предоставляем все закрывающие документы для бухгалтерии.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-landing bg-[#042f2e]/30">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Ответы на частые вопросы
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Если не нашли ответ — напишите нам в Telegram
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white/[0.03] border rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? "border-[#14b8a6]/30" : "border-white/[0.1]"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <span className={`font-semibold pr-4 transition-colors ${
                  openIndex === index ? "text-[#14b8a6]" : "text-white"
                }`}>
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-[#14b8a6]">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </span>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-white/70 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
