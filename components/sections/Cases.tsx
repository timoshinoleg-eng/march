import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { TrendingUp, TrendingDown, Clock, Users, CheckCircle } from "lucide-react";

const cases = [
  {
    company: "Онлайн-школа программирования",
    industry: "Образование",
    icon: TrendingUp,
    iconColor: "text-primary-400",
    iconBg: "bg-primary-500/10",
    result: "+42%",
    resultLabel: "рост конверсии",
    description:
      "Внедрили чат-бота для первичной обработки заявок. Бот квалифицирует студентов по уровню знаний и интересам, записывает на пробные уроки.",
    metrics: [
      { label: "Время ответа", value: "2 мин → мгновенно" },
      { label: "Квалификация", value: "Автоматическая 24/7" },
      { label: "Нагрузка на менеджеров", value: "Снижена на 35%" },
    ],
  },
  {
    company: "Компания по B2B-услугам",
    industry: "Консалтинг",
    icon: TrendingDown,
    iconColor: "text-primary-400",
    iconBg: "bg-primary-500/10",
    result: "−40%",
    resultLabel: "снижение нагрузки",
    description:
      "Автоматизировали обработку входящих обращений. Система собирает данные о проекте, формирует КП и назначает встречу с менеджером.",
    metrics: [
      { label: "Потерянных заявок", value: "С 25% до 3%" },
      { label: "Скорость обработки", value: "В 4 раза быстрее" },
      { label: "Качество лидов", value: "Рост на 60%" },
    ],
  },
];

export default function Cases() {
  return (
    <Section id="cases">
      <div className="text-center mb-16">
        <span className="text-primary-400 font-medium mb-4 block">
          Кейсы
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Результаты
          <br />
          <span className="bg-gradient-emerald bg-clip-text text-transparent">
            внедрения
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Реальные цифры наших клиентов после запуска системы автоматизации
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {cases.map((caseItem, index) => (
          <Card key={index} variant="gradient" className="h-full">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">
                  {caseItem.industry}
                </span>
                <h3 className="text-xl font-semibold text-white mt-1">
                  {caseItem.company}
                </h3>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${caseItem.iconColor}`}>
                  {caseItem.result}
                </div>
                <div className="text-sm text-gray-400">{caseItem.resultLabel}</div>
              </div>
            </div>

            <p className="text-gray-400 mb-6">{caseItem.description}</p>

            <div className="space-y-3">
              {caseItem.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-bg-primary/50"
                >
                  <span className="text-gray-400 text-sm">{metric.label}</span>
                  <span className="text-white font-medium">{metric.value}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
