import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { MessageCircle, Bot, ListChecks, Database, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Клиент пишет",
    description:
      "Пользователь отправляет сообщение в любой канал: Telegram, WhatsApp, Instagram, на сайт или по email",
  },
  {
    icon: Bot,
    number: "02",
    title: "Бот отвечает мгновенно",
    description:
      "Система приветствует клиента, задает уточняющие вопросы и собирает первичную информацию",
  },
  {
    icon: ListChecks,
    number: "03",
    title: "Квалификация лида",
    description:
      "Автоматическая оценка: бюджет, сроки, готовность к покупке. Фильтрация нецелевых обращений",
  },
  {
    icon: Database,
    number: "04",
    title: "Запись в CRM",
    description:
      "Данные автоматически попадают в вашу CRM, назначается ответственный менеджер, ставятся задачи",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <div className="text-center mb-16">
        <span className="text-primary-400 font-medium mb-4 block">
          Как это работает
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Как работает
          <br />
          <span className="bg-gradient-emerald bg-clip-text text-transparent">
            система автоматизации
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          От первого сообщения до записи в CRM — полностью автоматизированный
          процесс без участия человека
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <Card variant="gradient" className="h-full relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary-500/10">
                  <step.icon className="w-6 h-6 text-primary-400" />
                </div>
                <span className="text-4xl font-bold text-primary-500/20">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </Card>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                <ArrowRight className="w-6 h-6 text-primary-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
