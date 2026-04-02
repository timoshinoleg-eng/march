import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Блог | ChatBot24",
  description: "Полезные статьи об автоматизации заявок, чат-ботах и повышении конверсии",
  openGraph: {
    title: "Блог ChatBot24",
    description: "Полезные статьи об автоматизации заявок и чат-ботах",
    type: "website",
  },
};

// JSON-LD для списка статей
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://chatbot24.su/blog/ai-automation-20-years",
      "name": "Стоит ли входить в AI-автоматизацию в 20 лет?"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://chatbot24.su/blog/senior-leaders-ai-struggles",
      "name": "Где топ-менеджеры спотыкаются при внедрении ИИ — и как это исправить"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "url": "https://chatbot24.su/blog/ai-wont-fix-this",
      "name": "ИИ не спасёт бизнес без этих 4 компетенций команды"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "url": "https://chatbot24.su/blog/pwc-ai-roi-56-percent",
      "name": "PwC: 56% инвестиций в ИИ сгорело. Как не попасть в эту статистику"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "url": "https://chatbot24.su/blog/5-oshibok",
      "name": "5 ошибок при выборе чат-бота, которые стоят вам клиентов"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "url": "https://chatbot24.su/blog/konversiya-40",
      "name": "Как мы подняли конверсию на 40% с помощью чат-бота"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "url": "https://chatbot24.su/blog/sekundy-reshayut",
      "name": "Почему секунды решают: скорость ответа и конверсия"
    },
    {
      "@type": "ListItem",
      "position": 8,
      "url": "https://chatbot24.su/blog/telegram-vs-whatsapp",
      "name": "Telegram vs WhatsApp: где размещать чат-бота в 2024"
    }
  ]
};

const articles = [
  {
    slug: "ai-automation-20-years",
    title: "Стоит ли входить в AI-автоматизацию в 20 лет?",
    excerpt: "Почему сейчас — идеальное время начать в AI-автоматизации. От первого проекта до агентства: реальный путь для 20-летних.",
    date: "2 апреля 2026",
    readTime: "7 мин",
    category: "Карьера",
  },
  {
    slug: "senior-leaders-ai-struggles",
    title: "Где топ-менеджеры спотыкаются при внедрении ИИ — и как это исправить",
    excerpt: "Исследование Harvard Business Review: 93% барьеров внедрения ИИ — это люди, не технология. Три типичных вызова и четыре практики успешных лидеров.",
    date: "30 марта 2026",
    readTime: "8 мин",
    category: "Исследования",
  },
  {
    slug: "ai-wont-fix-this",
    title: "ИИ не спасёт бизнес без этих 4 компетенций команды",
    excerpt: "MIT Sloan Management Review: чем «умнее» технология, тем более развитые человеческие компетенции ей нужны. Цифровая ловкость — ключ к успеху.",
    date: "30 марта 2026",
    readTime: "7 мин",
    category: "Исследования",
  },
  {
    slug: "pwc-ai-roi-56-percent",
    title: "PwC: 56% инвестиций в ИИ сгорело. Как не попасть в эту статистику",
    excerpt: "Исследование PwC: почему большинство компаний теряет деньги на ИИ и как попасть в 12% успешных. Реальные кейсы, калькулятор ROI.",
    date: "25 марта 2026",
    readTime: "9 мин",
    category: "Исследования",
  },

  {
    slug: "5-oshibok",
    title: "5 ошибок при выборе чат-бота, которые стоят вам клиентов",
    excerpt: "Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент для автоматизации заявок.",
    date: "15 января 2026",
    readTime: "5 мин",
    category: "Выбор решения",
  },
  {
    slug: "konversiya-40",
    title: "Как мы подняли конверсию на 40% с помощью чат-бота",
    excerpt: "Реальный кейс: автоматизация первичной обработки заявок в онлайн-школе и рост продаж без увеличения рекламного бюджета.",
    date: "30 января 2026",
    readTime: "7 мин",
    category: "Кейсы",
  },
  {
    slug: "sekundy-reshayut",
    title: "Почему секунды решают: скорость ответа и конверсия",
    excerpt: "Научные исследования и практика: как время ответа влияет на решение клиента о покупке. Каждая секунда дорога.",
    date: "15 февраля 2026",
    readTime: "6 мин",
    category: "Исследования",
  },
  {
    slug: "telegram-vs-whatsapp",
    title: "Telegram vs WhatsApp: где размещать чат-бота в 2024",
    excerpt: "Сравнение платформ по охвату аудитории, стоимости, функционалу. Выбираем оптимальный канал для вашего бизнеса.",
    date: "25 февраля 2026",
    readTime: "8 мин",
    category: "Сравнение",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-bg-primary pt-24 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 sm:pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Блог об{" "}
              <span className="bg-gradient-emerald bg-clip-text text-transparent">
                автоматизации
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400">
              Полезные материалы о чат-ботах, автоматизации заявок и повышении конверсии
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <Section className="!py-0 !pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {articles.map((article, index) => (
            <Card
              key={article.slug}
              variant={index === 0 ? "gradient" : "default"}
              className="group flex flex-col h-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-medium">
                  {article.category}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                {article.title}
              </h2>

              <p className="text-gray-400 text-sm sm:text-base mb-6 flex-grow">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-primary-500/10">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <Button variant="ghost" size="sm" className="group/btn">
                    Читать
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-primary-500/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Хотите так же?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Получите бесплатную консультацию и узнайте, как автоматизация поможет вашему бизнесу
            </p>
            <Link href="/#final-cta">
              <Button size="lg">
                Оставить заявку
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
