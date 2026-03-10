"use client"

import { Clock, MessageSquareOff, Filter, EyeOff } from "lucide-react"

const problems = [
  {
    icon: Clock,
    stat: "60%",
    title: "заявок вне рабочего времени",
    desc: "Менеджеры не отвечают 24/7. Клиенты уходят к конкурентам, пока вы спите.",
  },
  {
    icon: MessageSquareOff,
    stat: "30%",
    title: "заявок теряется",
    desc: "Заявки теряются в мессенджерах. Нет системы учёта и контроля обработки.",
  },
  {
    icon: Filter,
    stat: "40%",
    title: "времени на нецелевых",
    desc: "Нет квалификации. Менеджеры тратят время на нецелевых клиентов.",
  },
  {
    icon: EyeOff,
    stat: "0",
    title: "прозрачности",
    desc: "Нет аналитики. Не понятно, сколько заявок обработано и с каким результатом.",
  },
]

export default function Problems() {
  return (
    <section id="problems" className="section-landing bg-[#042f2e]/30">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Почему бизнес теряет до{" "}
            <span className="bg-gradient-to-r from-[#14b8a6] to-[#2dd4bf] bg-clip-text text-transparent">
              30% заявок
            </span>
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Без автоматизации каждый этап обработки заявок — это точка оттока
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group p-8 bg-white/[0.03] border border-white/[0.1] rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:border-[#14b8a6]/30"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center">
                    <problem.icon className="w-7 h-7 text-[#14b8a6]" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#14b8a6] mb-2">
                    {problem.stat}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {problem.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
