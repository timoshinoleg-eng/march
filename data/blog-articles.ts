/**
 * Единый реестр статей блога.
 *
 * Ранее each статья содержала собственный захардкоженный массив `allArticles`
 * с одинаковым контентом — это приводило к рассинхронизации (например,
 * «2024» в titlepersisted в 5 файлах одновременно).
 *
 * Теперь все статьи блога импортируют BLOG_ARTICLES отсюда.
 * При добавлении/удалении/переименовании статьи — меняйте только этот файл.
 */

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  /** Дата в человекочитаемом русском формате. */
  date: string;
  /** ISO дата для schema/turbo.xml. */
  dateIso: string;
  /** Время чтения. */
  readTime: string;
  /** Категория для badge (eyebrow). */
  category: string;
  /** Путь к картинке в /public. */
  image: string;
}

/**
 * Список статей. Порядок = порядок отображения в RelatedArticles и на /blog.
 * Свежие — первыми.
 */
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'ai-automation-20-years',
    title: 'Стоит ли входить в AI-автоматизацию в 20 лет?',
    excerpt:
      'Когда старт в автоматизации оправдан: реалистичные сценарии, частые ошибки и что реально окупается.',
    date: '2 апреля 2026',
    dateIso: '2026-04-02T00:00:00Z',
    readTime: '7 мин',
    category: 'Карьера',
    image:
      '/images/articles/19d21b11-dc82-8332-8000-00001deae4c0_daviddd03411_ultra_realistic_photo_of_a_modern_developer_desk_e00c5fa9-2cdb-40c0-87f3-0a1df3e0157f_2.png',
  },
  {
    slug: 'senior-leaders-ai-struggles',
    title: 'Где топ-менеджеры спотыкаются при внедрении ИИ — и как это исправить',
    excerpt:
      'Исследование Harvard Business Review: 93% барьеров внедрения ИИ — это люди, не технология. Три типичных вызова и четыре практики успешных лидеров.',
    date: '30 марта 2026',
    dateIso: '2026-03-30T00:00:00Z',
    readTime: '8 мин',
    category: 'Исследования',
    image:
      '/images/articles/19d21b10-fae2-8347-8000-00000c8baccc_daviddd03411_isometric_3D_illustration_of_chatbot_development_4c8e5938-d82c-4950-acb6-f36f43f2ac5a_1.png',
  },
  {
    slug: 'ai-wont-fix-this',
    title: 'ИИ не спасёт бизнес без этих 4 компетенций команды',
    excerpt:
      'MIT Sloan Management Review: чем «умнее» технология, тем более развитые человеческие компетенции ей нужны. Цифровая ловкость — ключ к успеху.',
    date: '30 марта 2026',
    dateIso: '2026-03-30T00:00:00Z',
    readTime: '7 мин',
    category: 'Исследования',
    image:
      '/images/articles/19d21b11-dbc2-86a4-8000-00008a0f6ec4_daviddd03411_modern_3D_isometric_illustration_of_business_pro_44dd700b-58ba-440b-9d1b-b94979d69ea6_0.png',
  },
  {
    slug: 'pwc-ai-roi-56-percent',
    title: 'PwC: 56% инвестиций в ИИ сгорело. Как не попасть в эту статистику',
    excerpt:
      'Исследование PwC: почему большинство компаний теряет деньги на ИИ и как попасть в 12% успешных. Реальные кейсы, калькулятор ROI.',
    date: '25 марта 2026',
    dateIso: '2026-03-25T00:00:00Z',
    readTime: '9 мин',
    category: 'Исследования',
    image:
      '/images/articles/19d21b12-b8f2-8cf3-8000-000076530046_daviddd03411_ultra_realistic_photo_of_a_modern_clean_workspac_171bffc5-2cd3-4b13-a658-f5eb31811a97_2.png',
  },
  {
    slug: '5-oshibok',
    title: '5 ошибок при выборе чат-бота, которые стоят вам клиентов',
    excerpt:
      'Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент для автоматизации заявок.',
    date: '15 января 2026',
    dateIso: '2026-01-15T00:00:00Z',
    readTime: '5 мин',
    category: 'Выбор решения',
    image:
      '/images/articles/19d21b12-2b12-8fcb-8000-000060a82555_daviddd03411_modern_3D_isometric_illustration_of_business_pro_44dd700b-58ba-440b-9d1b-b94979d69ea6_1.png',
  },
  {
    slug: 'konversiya-40',
    title: 'Как мы подняли конверсию на 40% с помощью чат-бота',
    excerpt:
      'Реальный кейс: автоматизация первичной обработки заявок в онлайн-школе и рост продаж без увеличения рекламного бюджета.',
    date: '30 января 2026',
    dateIso: '2026-01-30T00:00:00Z',
    readTime: '7 мин',
    category: 'Кейсы',
    image:
      '/images/articles/19d21b10-fc42-8b4a-8000-0000e7501ee1_daviddd03411_isometric_3D_illustration_of_chatbot_development_4c8e5938-d82c-4950-acb6-f36f43f2ac5a_3.png',
  },
  {
    slug: 'sekundy-reshayut',
    title: 'Почему секунды решают: скорость ответа и конверсия',
    excerpt:
      'Научные исследования и практика: как время ответа влияет на решение клиента о покупке. Каждая секунда дорога.',
    date: '15 февраля 2026',
    dateIso: '2026-02-15T00:00:00Z',
    readTime: '6 мин',
    category: 'Исследования',
    image:
      '/images/articles/19d21b10-fae2-8347-8000-00000c8baccc_daviddd03411_isometric_3D_illustration_of_chatbot_development_4c8e5938-d82c-4950-acb6-f36f43f2ac5a_1.png',
  },
  {
    slug: 'telegram-vs-whatsapp',
    title: 'Telegram vs WhatsApp: где размещать чат-бота в 2026',
    excerpt:
      'Сравнение платформ по охвату аудитории, стоимости подключения, ограничениям API и scenarios использования.',
    date: '25 февраля 2026',
    dateIso: '2026-02-25T00:00:00Z',
    readTime: '8 мин',
    category: 'Сравнение',
    image:
      '/images/articles/19d21b11-dbc2-86a4-8000-00008a0f6ec4_daviddd03411_modern_3D_isometric_illustration_of_business_pro_44dd700b-58ba-440b-9d1b-b94979d69ea6_0.png',
  },
];

/**
 * Получить статью по slug.
 */
export function getArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

/**
 * Получить похожие статьи (исключая текущую). По умолчанию — 4 свежих.
 */
export function getRelatedArticles(
  currentSlug: string,
  limit = 4
): BlogArticle[] {
  return BLOG_ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, limit);
}
