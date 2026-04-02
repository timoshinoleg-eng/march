import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { Shield, FileCheck, Clock, Users, HeadphonesIcon } from "lucide-react";

const advantages = [
  {
    icon: Shield,
    title: "Гарантия результата",
    description:
      "Прописываем KPI в договоре: количество обработанных заявок, время ответа, конверсия. Не достигли — дорабатываем за свой счет.",
  },
  {
    icon: FileCheck,
    title: "Фиксированная смета",
    description:
      "Цена не меняется после подписания договора. Все доработки и правки в рамках первого месяца — бесплатно.",
  },
  {
    icon: Clock,
    title: "Запуск за 7–14 дней",
    description:
      "Четкие сроки по каждому этапу. Не затягиваем проекты месяцами. Уже через неделю система принимает первые заявки.",
  },
  {
    icon: Users,
    title: "Команда инженеров",
    description:
      "Работают senior-разработчики с опытом 5+ лет. Не передаем проекты фрилансерам — вся команда в штате.",
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка 24/7",
    description:
      "Техническая поддержка работает круглосуточно. Любые сбои устраняем в течение 2 часов. Личный менеджер на связи.",
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
