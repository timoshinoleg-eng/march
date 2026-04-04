import Image from "next/image";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cases = [
  {
    company: "Сеть клиник в Москве",
    industry: "Медицина",
    image: "/cases/hero/case_medical_clinic.jpg",
    result: "−85%",
    resultLabel: "пропущенных звонков",
    description:
      "Telegram-бот для записи на приём с интеграцией в МИС. 70% записей проходит через бот, операторы освободились для сложных задач.",
    metrics: [
      { label: "Время записи", value: "4 мин → 45 сек" },
      { label: "Конверсия в визит", value: "+45%" },
      { label: "ROI", value: "280% за 6 мес" },
    ],
  },
  {
    company: "Онлайн-школа иностранных языков",
    industry: "Образование",
    image: "/cases/hero/case_language_school.jpg",
    result: "+120%",
    resultLabel: "рост лидов",
    description:
      "Чат-бот с квизом для определения уровня языка и интеграцией в amoCRM. Квалификация лидов до передачи менеджеру.",
    metrics: [
      { label: "Конверсия в пробный", value: "+35%" },
      { label: "Доходимость", value: "+60%" },
      { label: "Рутина менеджеров", value: "−70%" },
    ],
  },
  {
    company: "Интернет-магазин электроники",
    industry: "E-commerce",
    image: "/cases/hero/case_ecommerce_electronics.jpg",
    result: "80%",
    resultLabel: "автоматизация",
    description:
      "AI-чат-бот с интеграцией в 1С и WhatsApp Business API. Круглосуточная поддержка, ответ за 2-10 секунд.",
    metrics: [
      { label: "Время ответа", value: "2-10 сек 24/7" },
      { label: "CSAT", value: "4.7/5" },
      { label: "Экономия", value: "450K ₽/мес" },
    ],
  },
  {
    company: "Поставщик промышленного оборудования",
    industry: "B2B",
    image: "/cases/hero/case_b2b_equipment.jpg",
    result: "−60%",
    resultLabel: "время обработки",
    description:
      "Telegram-бот с интеграцией в Битрикс24. Структурированный сбор данных, единая CRM-система, нулевые потери заявок.",
    metrics: [
      { label: "Ошибки в заявках", value: "−90%" },
      { label: "Потерянные заявки", value: "0" },
      { label: "ROI", value: "340% за год" },
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
          <Card key={index} variant="gradient" className="h-full overflow-hidden">
            {/* Hero Image */}
            <div className="relative w-full h-48 mb-6 -mx-6 -mt-6 overflow-hidden">
              <Image
                src={caseItem.image}
                alt={caseItem.company}
                fill
                className="object-cover z-0"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent z-10" />
              <div className="absolute top-4 left-4 z-20">
                <span className="text-xs text-white font-medium uppercase tracking-wider bg-primary-500/80 px-3 py-1 rounded-full">
                  {caseItem.industry}
                </span>
              </div>
              <div className="absolute top-4 right-4 text-right z-20">
                <div className="text-2xl font-bold text-white drop-shadow-lg">
                  {caseItem.result}
                </div>
                <div className="text-xs text-white/80 drop-shadow">{caseItem.resultLabel}</div>
              </div>
            </div>

            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                {caseItem.company}
              </h3>
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

      <div className="mt-12 text-center">
        <Link href="/cases">
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Все кейсы
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </Section>
  );
}
