"use client"

import { FileCheck, Lock, Clock, Users } from "lucide-react"

const advantages = [
  {
    icon: FileCheck,
    title: "Гарантия результата",
    desc: "KPI в договоре. Если не достигаем показателей — дорабатываем за свой счёт.",
  },
  {
    icon: Lock,
    title: "Фиксированная смета",
    desc: "Цена не меняется после старта. Никаких скрытых платежей и дополнительных счетов.",
  },
  {
    icon: Clock,
    title: "Запуск за 7-14 дней",
    desc: "Чёткие сроки на каждом этапе. Не затягиваем проекты на месяцы.",
  },
  {
    icon: Users,
    title: "Команда инженеров",
    desc: "5+ лет опыта в автоматизации. Не фрилансеры, а штатные разработчики.",
  },
]

export default function Advantages() {
  return (
    <section className="section-landing bg-[#042f2e]/30">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Почему с нами{" "}
            <span className="bg-gradient-to-r from-[#14b8a6] to-[#2dd4bf] bg-clip-text text-transparent">
              безопасно работать
            </span>
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Прозрачные условия и чёткие гарантии
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="p-6 bg-white/[0.03] border border-white/[0.1] rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:border-[#14b8a6]/30 text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-[#14b8a6]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
