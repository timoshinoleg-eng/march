import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Timer, AlertTriangle } from "lucide-react";
import Image from "next/image";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import ArticleCTA from "@/components/blog/ArticleCTA";

export const metadata: Metadata = {
  title: "Почему секунды решают: скорость ответа и конверсия | ChatBot24",
  description: "Научные исследования и практика: как время ответа влияет на решение клиента о покупке. Каждая секунда дорога.",
  openGraph: {
    title: "Почему секунды решают: скорость ответа и конверсия",
    description: "Научные исследования и практика: как время ответа влияет на решение клиента.",
    type: "article",
    publishedTime: "2026-02-15T00:00:00Z",
    authors: ["ChatBot24"],
    tags: ["исследования", "скорость ответа", "конверсия", "клиентский опыт"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Почему секунды решают: скорость ответа и конверсия",
  "description": "Научные исследования и практика: как время ответа влияет на решение клиента о покупке. Каждая секунда дорога.",
  "image": "https://chatbot24.su/og-image.jpg",
  "datePublished": "2026-02-15T00:00:00Z",
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
    "@id": "https://chatbot24.su/blog/sekundy-reshayut"
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
  const articleUrl = "https://chatbot24.su/blog/sekundy-reshayut";
  const articleTitle = "Почему секунды решают: скорость ответа и конверсия";

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
              15 февраля 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              6 мин чтения
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              ChatBot24
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Почему{" "}
            <span className="bg-gradient-emerald bg-clip-text text-transparent">
              секунды решают
            </span>
            : скорость ответа и конверсия
          </h1>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
            <Image
              src="/images/articles/19d21b10-fae2-8347-8000-00000c8baccc_daviddd03411_isometric_3D_illustration_of_chatbot_development_4c8e5938-d82c-4950-acb6-f36f43f2ac5a_1.png"
              alt="Чат-бот и автоматизация ответов"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Исследования
            </span>
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Статистика
            </span>
          </div>

          <ShareButtons url={articleUrl} title={articleTitle} />
        </header>

        <div className="prose prose-invert prose-emerald max-w-none">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            В эпоху мгновенных сообщений клиенты не готовы ждать. 
            Но насколько критична каждая секунда? Давайте разберёмся 
            на основе научных исследований и реальных данных.
          </p>

          <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-1 shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Ключевая статистика</h3>
                <p className="text-gray-300">
                  Конверсия снижается на <strong className="text-red-400">391%</strong>, 
                  если ответ занимает более 1 минуты вместо мгновенного.
                </p>
              </div>
            </div>
          </div>

          
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
            <Image
              src="/images/articles/19d21b11-dc82-8332-8000-00001deae4c0_daviddd03411_ultra_realistic_photo_of_a_modern_developer_desk_e00c5fa9-2cdb-40c0-87f3-0a1df3e0157f_2.png"
              alt="Рабочее место разработчика и исследования"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Что говорят исследования
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Исследование MIT (Massachusetts Institute of Technology) показало:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
            <li>Вероятность квалификации лида падает на 80% через 5 минут</li>
            <li>Через 30 минут шанс на контакт снижается в 21 раз</li>
            <li>Через 1 час — практически нулевая вероятность конверсии</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Психология мгновенного ответа
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Когда клиент оставляет заявку, он находится в состоянии повышенного 
            интереса — так называемый «момент истины». Эмоциональный настрой 
            максимально позитивный, готовность к покупке на пике.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Каждая минута ожидания — это:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
            <li>Остывание интереса</li>
            <li>Переключение на конкурентов</li>
            <li>Сомнения в надёжности компании</li>
            <li>Потеря эмоционального контакта</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Скорость ответа по каналам
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-primary-500/20">
                  <th className="pb-3 text-white">Время ответа</th>
                  <th className="pb-3 text-white">Конверсия</th>
                  <th className="pb-3 text-white">Изменение</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-primary-500/10">
                  <td className="py-3 flex items-center gap-2">
                    <Timer className="w-4 h-4 text-primary-400" />
                    Мгновенно
                  </td>
                  <td className="py-3">38%</td>
                  <td className="py-3 text-primary-400">Базовый</td>
                </tr>
                <tr className="border-b border-primary-500/10">
                  <td className="py-3">До 1 минуты</td>
                  <td className="py-3">24%</td>
                  <td className="py-3 text-yellow-400">−37%</td>
                </tr>
                <tr className="border-b border-primary-500/10">
                  <td className="py-3">1–5 минут</td>
                  <td className="py-3">12%</td>
                  <td className="py-3 text-orange-400">−68%</td>
                </tr>
                <tr>
                  <td className="py-3">Более 30 минут</td>
                  <td className="py-3">3%</td>
                  <td className="py-3 text-red-400">−92%</td>
                </tr>
              </tbody>
            </table>
          </div>

          
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
            <Image
              src="/images/articles/19d21b11-dbc2-86a4-8000-00008a0f6ec4_daviddd03411_modern_3D_isometric_illustration_of_business_pro_44dd700b-58ba-440b-9d1b-b94979d69ea6_0.png"
              alt="Автоматизация бизнес-процессов"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Как чат-бот решает проблему
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Чат-бот отвечает мгновенно, 24/7, без выходных и праздников. 
            Он не заменяет человека полностью, но решает критически важную 
            задачу — удержание клиента в первые секунды.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Бот может:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
            <li>Приветствовать клиента мгновенно</li>
            <li>Собирать базовую информацию</li>
            <li>Отвечать на частые вопросы</li>
            <li>Записывать на встречу</li>
            <li>Передавать сложные вопросы менеджеру</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Вывод
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Скорость ответа — не просто метрика сервиса, а прямой фактор 
            влияния на выручку. Инвестиции в автоматизацию первичного контакта 
            окупаются за счёт удержания клиентов, которые иначе ушли бы к конкурентам.
          </p>
        </div>

        <footer className="mt-8 pt-8 border-t border-primary-500/10">
          <ShareButtons url={articleUrl} title={articleTitle} />
        </footer>

        <ArticleCTA />
        <RelatedArticles currentSlug="sekundy-reshayut" articles={allArticles} />
      </article>

      <div className="h-20" />
    </main>
  );
}
