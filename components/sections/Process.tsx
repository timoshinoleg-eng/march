"use client"

import { Search, Layout, Code, TestTube, Rocket, HeadphonesIcon } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Аудит и анализ",
    duration: "1-2 дня",
    desc: "Изучаем текущие процессы, анализируем поток заявок и точки оттока.",
  },
  {
    number: "02",
    icon: Layout,
    title: "Проектирование",
    duration: "2-3 дня",
    desc: "Создаём сценарии диалогов, интеграционную схему и архитектуру системы.",
  },
  {
    number: "03",
    icon: Code,
    title: "Разработка",
    duration: "3-5 дней",
    desc: "Программируем чат-бота, настраиваем интеграции и логику обработки.",
  },
  {
    number: "04",
    icon: TestTube,
    title: "Тестирование",
    duration: "2-3 дня",
    desc: "Проверяем все сценарии, отлавливаем edge cases, проводим нагрузочные тесты.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Запуск",
    duration: "1 день",
    desc: "Выгружаем в production, обучаем команду, передаём документацию.",
  },
  {
    number: "06",
    icon: HeadphonesIcon,
    title: "Поддержка",
    duration: "Постоянно",
    desc: "Мониторинг, доработки, оптимизация сценариев и масштабирование.",
  },
]

export default function Process() {
  return (
    <section className="section-landing">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Как мы работаем
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Чёткий процесс от начала до результата
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-6 bg-white/[0.03] border border-white/[0.1] rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:border-[#14b8a6]/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-[#14b8a6]" />
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-[#14b8a6]/20">{step.number}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                <span className="text-sm text-[#14b8a6] font-medium">{step.duration}</span>
              </div>
              
              <p className="text-sm text-white/60 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
