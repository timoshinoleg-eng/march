import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { Clock, MessageSquare, Filter, BarChart3 } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Менеджеры не отвечают 24/7",
    description:
      "Клиенты пишут в нерабочее время и не получают ответа. 60% заявок приходят после 18:00 и на выходных.",
    stat: "60%",
    statLabel: "заявок вне рабочего времени",
  },
  {
    icon: MessageSquare,
    title: "Заявки теряются в мессенджерах",
    description:
      "Сообщения разбросаны по Telegram, WhatsApp, Instagram. Нет единой системы учета и контроля.",
    stat: "30%",
    statLabel: "заявок теряется",
  },
  {
    icon: Filter,
    title: "Нет квалификации — много 'пустых' заявок",
    description:
      "Менеджеры тратят время на нецелевых клиентов. Нет автоматической фильтрации по бюджету и задачам.",
    stat: "40%",
    statLabel: "времени на нецелевых",
  },
  {
    icon: BarChart3,
    title: "Нет прозрачной аналитики",
    description:
      "Не понятно, сколько заявок обработано, какие каналы эффективны, где теряются клиенты.",
    stat: "0",
    statLabel: "прозрачности в цифрах",
  },
];

export default function Problems() {
  return (
    <Section id="problems" className="bg-bg-secondary/30">
      <div className="text-center mb-16">
        <span className="text-primary-400 font-medium mb-4 block">
          Проблемы
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Почему бизнес теряет
          <br />
          <span className="bg-gradient-emerald bg-clip-text text-transparent">
            до 30% заявок
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Без автоматизации каждый этап обработки заявок — это точка оттока
          потенциальных клиентов
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {problems.map((problem, index) => (
          <Card key={index} className="group hover:border-primary-500/30">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                <problem.icon className="w-6 h-6 text-primary-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-400">
                  {problem.stat}
                </div>
                <div className="text-xs text-gray-500">{problem.statLabel}</div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {problem.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {problem.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
