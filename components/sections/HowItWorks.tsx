"use client"

import { MessageCircle, Bot, ClipboardCheck, Database } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Клиент пишет",
    desc: "Любой канал: Telegram, WhatsApp, Instagram, сайт, email. Все обращения собираются в единую систему.",
  },
  {
    number: "02",
    icon: Bot,
    title: "Бот отвечает мгновенно",
    desc: "AI-ассистент приветствует клиента, отвечает на вопросы и направляет по нужному сценарию.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Квалификация лида",
    desc: "Собираем ключевую информацию: бюджет, сроки, потребности. Определяем готовность к покупке.",
  },
  {
    number: "04",
    icon: Database,
    title: "Запись в CRM",
    desc: "Готовая заявка с контекстом поступает в CRM. Менеджер видит всю историю диалога.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="section-landing">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Как работает система автоматизации
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            От первого сообщения до записи в CRM — полностью автоматизированный процесс
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#14b8a6]/50 to-transparent" />
              )}
              
              <div className="p-6 bg-white/[0.03] border border-white/[0.1] rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:border-[#14b8a6]/30 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-[#14b8a6]" />
                  </div>
                  <span className="text-4xl font-extrabold text-[#14b8a6]/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
