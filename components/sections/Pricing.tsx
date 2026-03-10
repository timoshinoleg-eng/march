"use client"

import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "MVP-бот",
    price: "49 000",
    description: "Для небольших компаний с 10-30 обращениями в день",
    features: [
      "Базовый чат-бот",
      "Приём и маршрутизация заявок",
      "Интеграция с 1 мессенджером",
      "Email уведомления",
      "Базовая аналитика",
    ],
    popular: false,
  },
  {
    name: "Sales-Система",
    price: "129 000",
    description: "Для растущего бизнеса с 30-100 обращениями в день",
    features: [
      "Умный чат-бот с NLP",
      "Мультиканальность (3+ канала)",
      "Полноценная CRM",
      "Автоматическое квалифицирование",
      "API интеграции",
      "Расширенная аналитика",
    ],
    popular: true,
  },
  {
    name: "AI-Автоматизация",
    price: "240 000",
    description: "Для крупных компаний с 50+ обращениями в день",
    features: [
      "AI-ассистент с GPT",
      "Неограниченные каналы",
      "Enterprise CRM",
      "Предиктивная аналитика",
      "Персональный менеджер",
      "SLA и приоритетная поддержка",
    ],
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section-landing bg-[#042f2e]/30">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Выберите подходящий уровень автоматизации
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Все тарифы включают запуск, обучение и 30 дней поддержки
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? "bg-[#14b8a6]/10 border-2 border-[#14b8a6] scale-105 lg:scale-110"
                  : "bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.06]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#14b8a6] text-white text-sm font-semibold rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Рекомендуем
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-white/60 ml-1">₽</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-[#14b8a6]" : "text-white/40"}`} />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://t.me/ChatBot24su_bot?start=landing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-[#14b8a6] hover:bg-[#2dd4bf] text-white"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  Выбрать
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
