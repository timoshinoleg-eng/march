"use client"

import { GraduationCap, Briefcase, TrendingUp, Clock, ArrowRight } from "lucide-react"

const cases = [
  {
    icon: GraduationCap,
    category: "Образование",
    title: "Онлайн-школа программирования",
    result: "+42% конверсии",
    metrics: [
      { label: "Время ответа", value: "2 мин → мгновенно", icon: Clock },
      { label: "Квалификация", value: "Автоматическая 24/7", icon: TrendingUp },
    ],
    quote: "После внедрения чат-бота конверсия из заявки в оплату выросла на 42%. Теперь ночные заявки не теряются.",
  },
  {
    icon: Briefcase,
    category: "Консалтинг",
    title: "B2B-услуги",
    result: "−40% нагрузки",
    metrics: [
      { label: "Потерянных заявок", value: "25% → 3%", icon: TrendingUp },
      { label: "Скорость обработки", value: "в 4 раза быстрее", icon: Clock },
    ],
    quote: "Автоматизация квалификации освободила 40% времени менеджеров. Теперь они закрывают сделки вместо рутины.",
  },
]

export default function Cases() {
  return (
    <section id="cases" className="section-landing bg-[#042f2e]/30">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Результаты внедрения
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Реальные цифры наших клиентов
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cases.map((item) => (
            <div
              key={item.title}
              className="p-8 bg-white/[0.03] border border-white/[0.1] rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:border-[#14b8a6]/30"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-[#14b8a6]" />
                  </div>
                  <div>
                    <span className="text-sm text-[#14b8a6] font-medium">{item.category}</span>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#14b8a6]/10 border border-[#14b8a6]/20 rounded-full">
                  <span className="text-sm font-semibold text-[#14b8a6]">{item.result}</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="p-4 bg-white/[0.03] rounded-xl">
                    <div className="flex items-center gap-2 text-white/50 mb-1">
                      <metric.icon className="w-4 h-4" />
                      <span className="text-xs">{metric.label}</span>
                    </div>
                    <div className="text-sm font-semibold text-white">{metric.value}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-white/70 italic border-l-2 border-[#14b8a6]/30 pl-4">
                "{item.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
