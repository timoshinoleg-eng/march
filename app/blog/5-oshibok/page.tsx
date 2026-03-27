import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import ArticleCTA from "@/components/blog/ArticleCTA";

export const metadata: Metadata = {
  title: "5 ошибок при выборе чат-бота, которые стоят вам клиентов | ChatBot24",
  description: "Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент для автоматизации заявок.",
  openGraph: {
    title: "5 ошибок при выборе чат-бота, которые стоят вам клиентов",
    description: "Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент.",
    type: "article",
    publishedTime: "2026-01-15T00:00:00Z",
    authors: ["ChatBot24"],
    tags: ["чат-бот", "ошибки", "выбор решения", "автоматизация"],
  },
};

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "5 ошибок при выборе чат-бота, которые стоят вам клиентов",
  "description": "Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент для автоматизации заявок.",
  "image": "https://chatbot24.su/og-image.jpg",
  "datePublished": "2026-01-15T00:00:00Z",
  "dateModified": "2026-01-15T00:00:00Z",
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
    "@id": "https://chatbot24.su/blog/5-oshibok"
  }
};

const allArticles = [
  {
    slug: "5-oshibok",
    title: "5 ошибок при выборе чат-бота, которые стоят вам клиентов",
    excerpt: "Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент.",
    date: "15 января 2026",
  },
  {
    slug: "konversiya-40",
    title: "Как мы подняли конверсию на 40% с помощью чат-бота",
    excerpt: "Реальный кейс: автоматизация первичной обработки заявок в онлайн-школе.",
    date: "10 января 2024",
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
  const articleUrl = "https://chatbot24.su/blog/5-oshibok";
  const articleTitle = "5 ошибок при выборе чат-бота, которые стоят вам клиентов";

  return (
    <main className="min-h-screen bg-bg-primary pt-24 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
              15 января 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              5 мин чтения
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              ChatBot24
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            5 ошибок при выборе чат-бота, которые{" "}
            <span className="bg-gradient-emerald bg-clip-text text-transparent">
              стоят вам клиентов
            </span>
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Выбор решения
            </span>
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Чат-боты
            </span>
          </div>

          <ShareButtons url={articleUrl} title={articleTitle} />
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-emerald max-w-none">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            При выборе чат-бота для бизнеса многие совершают одни и те же ошибки. 
            В этой статье разберём 5 главных ловушек, которые могут обернуться 
            потерей клиентов и денег.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            1. Выбор шаблонного решения без кастомизации
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Готовые шаблоны кажутся привлекательными: дёшево, быстро, не нужно 
            ничего придумывать. Но в реальности шаблонный бот редко понимает 
            специфику вашего бизнеса.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Клиенты чувствуют, что общаются с роботом, который не понимает их 
            потребностей. В результате — разочарование и отток потенциальных покупателей.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            2. Игнорирование интеграции с CRM
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Чат-бот, который не связан с вашей CRM-системой, — это просто 
            красивая игрушка. Данные о клиентах теряются, заявки не попадают 
            к менеджерам, а история общения не сохраняется.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            3. Отсутствие передачи на оператора
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Даже самый умный бот не справится со всеми ситуациями. Критическая 
            ошибка — не предусмотреть механизм передачи сложных вопросов человеку. 
            Клиент застревает в бесконечном диалоге с ботом и уходит к конкурентам.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            4. Сложный сценарий слишком рано
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Многие пытаются сразу создать «умного» бота с десятками веток сценария. 
            В результате проект затягивается на месяцы, а бот так и не запускается.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Правильный подход — начать с простого MVP и постепенно усложнять 
            на основе реальных данных.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            5. Отсутствие аналитики
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Без аналитики вы не узнаете, где бот теряет клиентов. Нужно отслеживать:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
            <li>Конверсию на каждом этапе воронки</li>
            <li>Точки, где пользователи бросают диалог</li>
            <li>Самые частые вопросы, которые бот не понимает</li>
            <li>Время ответа и удовлетворённость клиентов</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Как избежать этих ошибок?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Мы в ChatBot24 работаем по принципу: сначала — понять бизнес, 
            потом — создать решение. Каждый бот разрабатывается под конкретные 
            задачи с интеграцией в вашу инфраструктуру.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Начните с бесплатной консультации — мы проанализируем ваши процессы 
            и предложим оптимальное решение без лишних затрат.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-primary-500/10">
          <ShareButtons url={articleUrl} title={articleTitle} />
        </footer>

        {/* CTA */}
        <ArticleCTA />

        {/* Related Articles */}
        <RelatedArticles currentSlug="5-oshibok" articles={allArticles} />
      </article>

      {/* Spacer for footer */}
      <div className="h-20" />
    </main>
  );
}
