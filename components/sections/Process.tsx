import Section from "@/components/ui/Section";

const steps = [
  {
    number: "01",
    title: "Аудит и анализ",
    description:
      "Изучаем ваши текущие процессы, источники заявок, боли и задачи. Формируем техническое задание.",
    duration: "1–2 дня",
  },
  {
    number: "02",
    title: "Проектирование",
    description:
      "Разрабатываем сценарии диалогов, логику квалификации, интеграции с вашими системами.",
    duration: "2–3 дня",
  },
  {
    number: "03",
    title: "Разработка",
    description:
      "Создаем бота, настраиваем интеграции, подключаем каналы коммуникации. Тестируем внутри команды.",
    duration: "3–5 дней",
  },
  {
    number: "04",
    title: "Тестирование",
    description:
      "Проводим пилот на реальных заявках. Дорабатываем сценарии по результатам теста.",
    duration: "2–3 дня",
  },
  {
    number: "05",
    title: "Запуск",
    description:
      "Включаем бота на полную мощность. Обучаем вашу команду работе с системой.",
    duration: "1 день",
  },
  {
    number: "06",
    title: "Поддержка",
    description:
      "Контролируем работу системы, анализируем метрики, оптимизируем сценарии для роста конверсии.",
    duration: "Постоянно",
  },
];

export default function Process() {
  return (
    <Section id="process" className="bg-bg-secondary/30">
      <div className="text-center mb-16">
        <span className="text-primary-400 font-medium mb-4 block">
          Процесс
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Как мы
          <br />
          <span className="bg-gradient-emerald bg-clip-text text-transparent">
            работаем
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          От знакомства до запуска — 7–14 дней. Четкие этапы без бюрократии
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary-500/20 md:-translate-x-px" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-bg-primary md:-translate-x-2 z-10" />

                {/* Content */}
                <div
                  className={`pl-20 md:pl-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-2 mb-2 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <span className="text-4xl font-bold text-primary-500/20">
                      {step.number}
                    </span>
                    <span className="text-xs text-primary-400 font-medium px-2 py-1 rounded-full bg-primary-500/10">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>

                {/* Empty space for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
