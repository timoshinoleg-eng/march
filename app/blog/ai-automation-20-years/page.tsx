import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import ArticleCTA from "@/components/blog/ArticleCTA";
import CalculatorCTA from "@/components/blog/CalculatorCTA";
import { InlineCalculatorCTA } from "@/components/blog/InlineCalculatorCTA";
import { ConversionFooter } from "@/components/blog/ConversionFooter";
import { MobileStickyCTA } from "@/components/blog/MobileStickyCTA";
import { ExitIntentModal } from "@/components/blog/ExitIntentModal";

export const metadata: Metadata = {
  title: "Стоит ли входить в AI-автоматизацию в 20 лет? | ChatBot24",
  description: "Почему сейчас — идеальное время начать в AI-автоматизации. От первого проекта до агентства: реальный путь для 20-летних.",
  openGraph: {
    title: "Стоит ли входить в AI-автоматизацию в 20 лет?",
    description: "Почему сейчас — идеальное время начать в AI-автоматизации. От первого проекта до агентства.",
    type: "article",
    publishedTime: "2026-04-02T00:00:00Z",
    authors: ["ChatBot24"],
    tags: ["AI-автоматизация", "стартап", "карьера", "n8n", "No-code"],
  },
};

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Стоит ли входить в AI-автоматизацию в 20 лет?",
  "description": "Почему сейчас — идеальное время начать в AI-автоматизации. От первого проекта до агентства: реальный путь для 20-летних.",
  "image": "https://chatbot24.su/images/articles/19d21b11-dc82-8332-8000-00001deae4c0_daviddd03411_ultra_realistic_photo_of_a_modern_developer_desk_e00c5fa9-2cdb-40c0-87f3-0a1df3e0157f_2.png",
  "datePublished": "2026-04-02T00:00:00Z",
  "dateModified": "2026-04-02T00:00:00Z",
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
    "@id": "https://chatbot24.su/blog/ai-automation-20-years"
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
    slug: "telegram-vs-whatsapp",
    title: "Telegram vs WhatsApp: где размещать чат-бота в 2024",
    excerpt: "Сравнение платформ по охвату аудитории, стоимости, функционалу.",
    date: "25 февраля 2026",
  },
];

export default function ArticlePage() {
  const articleUrl = "https://chatbot24.su/blog/ai-automation-20-years";
  const articleTitle = "Стоит ли входить в AI-автоматизацию в 20 лет?";

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
              2 апреля 2026
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
            Стоит ли входить в{" "}
            <span className="bg-gradient-emerald bg-clip-text text-transparent">
              AI-автоматизацию
            </span>{" "}
            в 20 лет?
          </h1>

          {/* Hero Image */}
          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6">
            <Image
              src="/images/articles/19d21b11-dc82-8332-8000-00001deae4c0_daviddd03411_ultra_realistic_photo_of_a_modern_developer_desk_e00c5fa9-2cdb-40c0-87f3-0a1df3e0157f_2.png"
              alt="AI-автоматизация для молодых предпринимателей"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              AI-автоматизация
            </span>
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Карьера
            </span>
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              No-code
            </span>
          </div>

          <ShareButtons url={articleUrl} title={articleTitle} />
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-emerald max-w-none">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            B2B-аутрич растёт взрывными темпами. Малый бизнес тонет в ручных задачах, 
            но не знает, как автоматизировать. И в этом — главная возможность для тех, 
            кому сейчас 20 лет.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Парадокс, который старше интернета
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Каждые 10–15 лет появляется технология, которая обнуляет правила игры. 
            Не улучшает — а именно обнуляет. В 1995 году это был веб. В 2007 — iPhone. 
            В 2020 — облачная инфраструктура.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Сейчас это AI-автоматизация. И вот что интересно: в каждую такую волну 
            входят в основном люди без опыта. Потому что опыт в предыдущей парадигме — 
            это не актив, а обуза. Ты слишком много знаешь о том, как делать "правильно". 
            А новички просто делают.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Почему B2B-аутрич — идеальная точка входа
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Малый бизнес тонет в ручных задачах. Владелец салона красоты тратит 3 часа 
            в день на ответы в WhatsApp. Директор логистической фирмы копирует данные 
            из одной таблицы в другую. Менеджер вручную ищет контакты и пишет однотипные письма.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Эти люди готовы платить за решение проблемы, но не знают, что решение существует. 
            AI-автоматизация сейчас — как электричество в 1890-х. Технология есть, но 99% 
            потенциальных клиентов ещё не осознали, как она изменит их жизнь.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Преимущество 20 лет
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            В 20 лет у тебя нет ипотеки, детей в школе, репутации, которую нужно беречь. 
            У тебя есть энергия на 12-часовые дни, время пережить 3–4 неудачных проекта 
            и отсутствие страха "а вдруг не получится".
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Но главное — временной горизонт. Если в 20 ты войдёшь в индустрию, которая будет 
            расти следующие 10 лет, к 30 ты будешь на 10 лет опережать тех, кто вошёл в 30. 
            Это не арифметика — это геометрия.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Что значит "войти в AI-автоматизацию"
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Это не значит "стать data scientist". Это значит научиться:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
            <li><strong>Находить боль</strong> — замечать, где бизнес тратит человеко-часы на рутину</li>
            <li><strong>Собирать MVP</strong> — за 2–3 дня сделать работающий прототип на n8n + OpenAI</li>
            <li><strong>Продавать результат</strong> — не "у меня есть нейросеть", а "вы перестанете тратить 3 часа в день"</li>
            <li><strong>Масштабировать</strong> — делать решение, которое работает для 10 клиентов так же, как для одного</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Реальные кейсы, которые работают сейчас
          </h2>
          
          <div className="bg-dark-300/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Агентство недвижимости</h3>
            <p className="text-gray-400">
              Автоматический скрининг объявлений, персонализированные письма клиентам, 
              напоминания о просмотрах. Раньше — 2 сотрудника. Теперь — скрипт и один менеджер.
            </p>
          </div>

          <div className="bg-dark-300/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">E-commerce на маркетплейсах</h3>
            <p className="text-gray-400">
              Анализ отзывов конкурентов, генерация карточек товаров, ответы на вопросы покупателей. 
              Экономия — 20 часов в неделю.
            </p>
          </div>

          <div className="bg-dark-300/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Клининговая компания</h3>
            <p className="text-gray-400">
              Распределение заказов по бригадам, автоматические уведомления клиентам, 
              сбор обратной связи. Владелец перестал отвечать на телефон в 23:00.
            </p>
          </div>

          <CalculatorCTA />

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Главная ловушка
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Думать, что нужно "выучить всё" перед стартом. Читать курсы по ML, 
            проходить туториалы по Python, ждать, когда "будет достаточно знаний".
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Правильный путь: найти одну компанию с очевидной ручной задачей → предложить 
            сделать автоматизацию бесплатно → сделать за 3–5 дней на коленке → получить кейс 
            и отзыв → повторить 5 раз → получить портфолио и референсы.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Сначала доказательство, что ты можешь решить проблему. Потом — мастерство решения.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Почему сейчас — идеальный момент
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Рынок AI-автоматизации в фазе "disruption from below". Технология достаточно 
            хороша, чтобы решать реальные задачи, но ещё недостаточно зрела, чтобы крупные 
            компании организовали вокруг неё отделы.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Это окно возможностей для индивидуалов. Через 3–5 лет здесь будут играть 
            консалтинговые гиганты с миллионными бюджетами. Сейчас — поле для тех, 
            кто готов быстро учиться и быстро делать.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Что делать завтра
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Не жди идеального момента. Он был год назад. Следующий лучший момент — сегодня.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
            <li>Открой n8n.io и пройди базовый туториал (2 часа)</li>
            <li>Напиши 10 компаниям из своего города с предложением бесплатно автоматизировать одну задачу</li>
            <li>Сделай первый проект, даже если он кривой</li>
            <li>Запиши, что получилось и что не получилось</li>
            <li>Повтори</li>
          </ul>
          <p className="text-gray-400 leading-relaxed">
            Через 6 месяцев ты будешь знать больше, чем 90% "экспертов" с сертификатами.
            Через год — иметь доход, который многие зарабатывают за 5 лет в офисе.
            Через 5 лет — выбирать, чем заниматься, а не искать работу.
          </p>

          <InlineCalculatorCTA utmContent="middle" />

          <div className="bg-gradient-to-r from-primary-500/10 to-emerald-500/10 rounded-lg p-6 mt-8 border border-primary-500/20">
            <p className="text-white font-medium mb-2">Главный ресурс в 20 лет</p>
            <p className="text-gray-400">
              Не деньги, не связи, не знания. Время. И самый умный способ его инвестировать —
              войти в растущую индустрию на самом раннем этапе.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-primary-500/10">
          <ShareButtons url={articleUrl} title={articleTitle} />
        </footer>

        {/* Conversion Footer */}
        <ConversionFooter utmCampaign="ai_automation_20_years" />

        {/* CTA */}
        <ArticleCTA />

        {/* Related Articles */}
        <RelatedArticles currentSlug="ai-automation-20-years" articles={allArticles} />
      </article>

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA utmCampaign="ai_automation_20_years" />

      {/* Exit Intent Modal */}
      <ExitIntentModal utmCampaign="ai_automation_20_years" />

      {/* Spacer for footer */}
      <div className="h-20" />
    </main>
  );
}
