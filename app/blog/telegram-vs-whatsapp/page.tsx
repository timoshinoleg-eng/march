import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import ArticleCTA from "@/components/blog/ArticleCTA";

export const metadata: Metadata = {
  title: "Telegram vs WhatsApp: где размещать чат-бота в 2024 | ChatBot24",
  description: "Сравнение платформ по охвату аудитории, стоимости, функционалу. Выбираем оптимальный канал для вашего бизнеса.",
  openGraph: {
    title: "Telegram vs WhatsApp: где размещать чат-бота в 2024",
    description: "Сравнение платформ по охвату аудитории, стоимости, функционалу.",
    type: "article",
    publishedTime: "2026-02-25T00:00:00Z",
    authors: ["ChatBot24"],
    tags: ["сравнение", "telegram", "whatsapp", "выбор платформы"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Telegram vs WhatsApp: где размещать чат-бота в 2024",
  "description": "Сравнение платформ по охвату аудитории, стоимости, функционалу. Выбираем оптимальный канал для вашего бизнеса.",
  "image": "https://chatbot24.su/og-image.jpg",
  "datePublished": "2026-02-25T00:00:00Z",
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
    "@id": "https://chatbot24.su/blog/telegram-vs-whatsapp"
  }
};

const allArticles = [
  {
    slug: "ai-automation-20-years",
    title: "Стоит ли входить в AI-автоматизацию в 20 лет?",
    excerpt: "Почему сейчас — идеальное время начать в AI-автоматизации. От первого проекта до агентства.",
    date: "2 апреля 2026",
  },
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
    date: "30 января 2026",
  },
  {
    slug: "sekundy-reshayut",
    title: "Почему секунды решают: скорость ответа и конверсия",
    excerpt: "Научные исследования и практика: как время ответа влияет на решение клиента.",
    date: "15 февраля 2026",
  },
  {
    slug: "telegram-vs-whatsapp",
    title: "Telegram vs WhatsApp: где размещать чат-бота в 2024",
    excerpt: "Сравнение платформ по охвату аудитории, стоимости, функционалу.",
    date: "25 февраля 2026",
  },
];

export default function ArticlePage() {
  const articleUrl = "https://chatbot24.su/blog/telegram-vs-whatsapp";
  const articleTitle = "Telegram vs WhatsApp: где размещать чат-бота в 2024";

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
              25 февраля 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              8 мин чтения
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              ChatBot24
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Telegram vs WhatsApp: где размещать{" "}
            <span className="bg-gradient-emerald bg-clip-text text-transparent">
              чат-бота в 2024
            </span>
          </h1>

          {/* Hero Image */}
          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6">
            <Image
              src="/images/articles/19d21b11-dbc2-86a4-8000-00008a0f6ec4_daviddd03411_modern_3D_isometric_illustration_of_business_pro_44dd700b-58ba-440b-9d1b-b94979d69ea6_0.png"
              alt="Telegram vs WhatsApp сравнение"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Сравнение
            </span>
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Платформы
            </span>
          </div>

          <ShareButtons url={articleUrl} title={articleTitle} />
        </header>

        <div className="prose prose-invert prose-emerald max-w-none">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Выбор между Telegram и WhatsApp для размещения чат-бота — один из 
            ключевых вопросов при планировании автоматизации. Разберём плюсы 
            и минусы каждой платформы на основе реальных данных.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Аудитория в России
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-[#0088cc]/10 border border-[#0088cc]/20">
              <h3 className="text-lg font-bold text-[#0088cc] mb-2">Telegram</h3>
              <p className="text-3xl font-bold text-white mb-1">68 млн</p>
              <p className="text-sm text-gray-400">пользователей в России</p>
            </div>
            <div className="p-4 rounded-lg bg-[#25d366]/10 border border-[#25d366]/20">
              <h3 className="text-lg font-bold text-[#25d366] mb-2">WhatsApp</h3>
              <p className="text-3xl font-bold text-white mb-1">52 млн</p>
              <p className="text-sm text-gray-400">пользователей в России</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Сравнение функционала
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-primary-500/20">
                  <th className="pb-3 text-white">Функция</th>
                  <th className="pb-3 text-center text-white">Telegram</th>
                  <th className="pb-3 text-center text-white">WhatsApp</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-primary-500/10">
                  <td className="py-3">Бесплатные сообщения</td>
                  <td className="py-3 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="py-3 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-primary-500/10">
                  <td className="py-3">Rich-кнопки</td>
                  <td className="py-3 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="py-3 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-primary-500/10">
                  <td className="py-3">Отправка файлов</td>
                  <td className="py-3 text-center">до 2 ГБ</td>
                  <td className="py-3 text-center">до 100 МБ</td>
                </tr>
                <tr className="border-b border-primary-500/10">
                  <td className="py-3">Inline-режим</td>
                  <td className="py-3 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                  <td className="py-3 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3">Стоимость API</td>
                  <td className="py-3 text-center text-green-400">Бесплатно</td>
                  <td className="py-3 text-center text-yellow-400">Платно</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Telegram: плюсы и минусы
          </h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h3 className="text-lg font-bold text-green-400 mb-3">Плюсы</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Полностью бесплатный API</li>
                <li>Расширенные возможности ботов (inline, deep linking)</li>
                <li>Лучшая защита от спама</li>
                <li>Открытая экосистема</li>
                <li>Поддержка сложных сценариев</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h3 className="text-lg font-bold text-red-400 mb-3">Минусы</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Не все клиенты пользуются Telegram</li>
                <li>Меньше привычка писать бизнесу</li>
                <li>Необходимость установки приложения</li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            WhatsApp: плюсы и минусы
          </h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h3 className="text-lg font-bold text-green-400 mb-3">Плюсы</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Привычный канал коммуникации</li>
                <li>Высокий уровень доверия</li>
                <li>Большее проникновение в возрасте 35+</li>
                <li>Широкое использование для личных целей</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
              <h3 className="text-lg font-bold text-red-400 mb-3">Минусы</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Платная Business API (от 0,5¢ за сессию)</li>
                <li>Жёсткие ограничения на шаблоны</li>
                <li>Сложнее процесс модерации</li>
                <li>Меньше возможностей для кастомизации</li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Рекомендации по выбору
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            <strong className="text-white">Выбирайте Telegram, если:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-1 mb-4">
            <li>Ваша аудитория технически подкована (IT, маркетинг, стартапы)</li>
            <li>Нужен сложный сценарий с кнопками и формами</li>
            <li>Важна бесплатная интеграция</li>
            <li>Работаете с B2B</li>
          </ul>
          <p className="text-gray-400 leading-relaxed mb-4">
            <strong className="text-white">Выбирайте WhatsApp, если:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-1 mb-6">
            <li>Целевая аудитория 35+ лет</li>
            <li>Работаете с розничными клиентами (B2C)</li>
            <li>Важен максимальный охват</li>
            <li>Бюджет позволяет оплатить API</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Оптимальное решение
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Лучшая стратегия — мультиканальность. Мы рекомендуем запускать 
            бота одновременно в обеих платформах, если бюджет позволяет. 
            Так вы охватите максимальную аудиторию и дадите клиенту выбор 
            удобного канала коммуникации.
          </p>
        </div>

        <footer className="mt-8 pt-8 border-t border-primary-500/10">
          <ShareButtons url={articleUrl} title={articleTitle} />
        </footer>

        <ArticleCTA />
        <RelatedArticles currentSlug="telegram-vs-whatsapp" articles={allArticles} />
      </article>

      <div className="h-20" />
    </main>
  );
}
