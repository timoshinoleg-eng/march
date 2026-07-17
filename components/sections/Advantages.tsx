import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { UserCheck, FileCheck, Clock, Users, LifeBuoy, Sparkles } from "lucide-react";

const advantages = [
  {
    icon: UserCheck,
    title: "Личное ведение проекта",
    description:
      "Каждый проект ведёт ответственный инженер. Вы общаетесь напрямую с исполнителем, а не с менеджером по аккаунтам.",
  },
  {
    icon: FileCheck,
    title: "Фиксированная смета",
    description:
      "Цена фиксируется в договоре. Доработки и правки в рамках первого месяца включены в стоимость.",
  },
  {
    icon: Clock,
    title: "Запуск за 7–14 дней",
    description:
      "Чёткие сроки по этапам. Базовые сценарии начинают принимать заявки уже через неделю.",
  },
  {
    icon: Users,
    title: "Проверенные подрядчики под NDA",
    description:
      "Для отдельных задач — интеграций, дизайна, фронтенда — подключаем проверенных подрядчиков под NDA.",
  },
  {
    icon: LifeBuoy,
    title: "Прозрачная поддержка",
    description:
      "Поддержка по согласованному регламенту: рабочие часы плюс аварийный канал в Telegram для срочных проблем.",
  },
  {
    icon: Sparkles,
    title: "Доработки включены",
    description:
      "Правки и небольшие доработки в рамках первого месяца — без дополнительных счетов.",
  },
];

export default function WhyUs() {
  return (
    <Section id="why-us">
      <div className="text-center mb-16">
        <span className="text-primary-400 font-medium mb-4 block">
          Преимущества
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Почему с нами
          <br />
          <span className="bg-gradient-emerald bg-clip-text text-transparent">
            безопасно работать
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Инженерный подход, четкие договоренности и полная прозрачность на всех
          этапах сотрудничества
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advantages.map((advantage, index) => (
          <Card
            key={index}
            variant={index === 0 ? "gradient" : "default"}
            className="group h-full"
          >
            <div className="p-3 rounded-xl bg-primary-500/10 w-fit mb-4 group-hover:bg-primary-500/20 transition-colors">
              <advantage.icon className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {advantage.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {advantage.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
