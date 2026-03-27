import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, TrendingUp, CheckCircle } from "lucide-react";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import ArticleCTA from "@/components/blog/ArticleCTA";

export const metadata: Metadata = {
  title: "Как мы подняли конверсию на 40% с помощью чат-бота | ChatBot24",
  description: "Реальный кейс: автоматизация первичной обработки заявок в онлайн-школе и рост продаж без увеличения рекламного бюджета.",
  openGraph: {
    title: "Как мы подняли конверсию на 40% с помощью чат-бота",
    description: "Реальный кейс: автоматизация первичной обработки заявок в онлайн-школе.",
    type: "article",
    publishedTime: "2026-01-30T00:00:00Z",
    authors: ["ChatBot24"],
    tags: ["кейс", "конверсия", "онлайн-школа", "автоматизация"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Как мы подняли конверсию на 40% с помощью чат-бота",
  "description": "Реальный кейс: автоматизация первичной обработки заявок в онлайн-школе и рост продаж без увеличения рекламного бюджета.",
  "image": "https://chatbot24.su/og-image.jpg",
  "datePublished": "2026-01-30T00:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "ChatBot24",
    "url": "https://chatbot24.su"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ChatBot24",
    "logo": {
      "@type": "ImageObject",
      "url": "https://chatbot24.su/favicon.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://chatbot24.su/blog/konversiya-40"
  }
};

const allArticles = [
  {
    slug: "5-oshibok",
    title: "5 ошибок при выборе чат-бота, которые стоят вам клиентов",
    excerpt: "Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент.",
    date: "15 января 2024",
  },
  {
    slug: "konversiya-40",
    title: "Как мы подняли конверсию на 40% с помощью чат-бота",
    excerpt: "Реальный кейс: автоматизация первичной обработки заявок в онлайн-школе.",
    date: "30 января 2026",
  },
  {
    slug: "sekundy-reshayut",
    title: "Почему секунды решают: скорость ответа и конверсия",
    excerpt: "Научные исследования и практика: как время ответа влияет на решение клиента.",
    date: "5 января 2024",
  },
  {
    slug: "telegram-vs-whatsapp",
    title: "Telegram vs WhatsApp: где размещать чат-бота в 2024",
    excerpt: "Сравнение платформ по охвату аудитории, стоимости, функционалу.",
    date: "28 декабря 2023",
  },
];

export default function ArticlePage() {
  const articleUrl = "https://chatbot24.su/blog/konversiya-40";
  const articleTitle = "Как мы подняли конверсию на 40% с помощью чат-бота";

  return (
    <main className="min-h-screen bg-bg-primary pt-24 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к статьям
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              30 января 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              7 мин чтения
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              ChatBot24
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Как мы подняли конверсию на{" "}
            <span className="bg-gradient-emerald bg-clip-text text-transparent">
              40%
            </span>{" "}
            с помощью чат-бота
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Кейсы
            </span>
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Конверсия
            </span>
          </div>

          <ShareButtons url={articleUrl} title={articleTitle} />
        </header>

        <div className="prose prose-invert prose-emerald max-w-none">
          <div className="p-6 rounded-xl bg-bg-secondary/50 border border-primary-500/20 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary-400" />
              <h3 className="text-xl font-bold text-white">Результаты проекта</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" />
                <span>Конверсия выросла с 12% до 16.8% (+40%)</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" />
                <span>Время ответа сократилось с 45 минут до мгновенного</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" />
                <span>Нагрузка на менеджеров снизилась на 60%</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" />
                <span>Окупаемость за 2 месяца</span>
              </li>
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            О клиенте
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Онлайн-школа программирования со средним чеком 85 000 ₽. Ежедневно 
            поступало 30-50 заявок из разных каналов: сайт, Instagram, VK. 
            Основная проблема — заявки обрабатывались вручную с задержкой до нескольких часов.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Проблемы до внедрения
          </h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
            <li>Менеджеры не успевали обрабатывать все заявки вовремя</li>
            <li>23% заявок терялись при передаче между сменами</li>
            <li>Нет единой базы клиентов — данные были разбросаны по Excel и CRM</li>
            <li>Квалификация лидов происходила только на созвоне</li>
            <li>Ночные заявки ждали ответа до следующего дня</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Решение
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Мы разработали чат-бота для Telegram и Instagram Direct, который:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
            <li>Мгновенно отвечает на заявки 24/7</li>
            <li>Задаёт уточняющие вопросы об опыте и целях</li>
            <li>Проводит первичную квалификацию (бюджет, сроки, уровень)</li>
            <li>Записывает на бесплатную консультацию в календарь</li>
            <li>Передаёт горячие лида менеджеру с полной информацией</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Сценарий работы
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Бот приветствует клиента, уточняет его текущий уровень знаний 
            (новичок / есть опыт / профессионал), спрашивает цели обучения 
            и желаемые сроки. Для новичков предлагает бесплатный вебинар, 
            для опытных — созвон с ментором.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            После квалификации бот предлагает выбрать удобное время для 
            консультации и автоматически создаёт событие в Google Calendar 
            менеджера с пометкой о сегменте клиента.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Интеграция
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Бот интегрирован с amoCRM: все диалоги, теги и заметки 
            автоматически попадают в карточку клиента. Менеджеры видят 
            полную историю общения до звонка.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Выводы
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Автоматизация первичной обработки позволила команде сосредоточиться 
            на качественных лидах и продажах, а не на рутинной переписке. 
            Клиент доволен результатом и планирует расширение бота на другие 
            направления школы.
          </p>
        </div>

        <footer className="mt-8 pt-8 border-t border-primary-500/10">
          <ShareButtons url={articleUrl} title={articleTitle} />
        </footer>

        <ArticleCTA />
        <RelatedArticles currentSlug="konversiya-40" articles={allArticles} />
      </article>

      <div className="h-20" />
    </main>
  );
}
