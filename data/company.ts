/**
 * Единый профиль компании ChatBot24.
 *
 * Источник правды для: Hero, Footer, JSON-LD/SchemaOrg, FAQ, llms.txt,
 * системного промпта чат-бота и метаданных.
 *
 * ВАЖНО: здесь только проверяемые факты. Никаких inflated-claims про штат,
 * senior-разработчиков, 24/7 поддержки, SLA или «личного менеджера».
 *
 * Модель работы (согласовано с владельцем): компактная специализированная
 * команда + проверенные подрядчики под NDA для отдельных задач.
 * Бейдж «Инженерное бюро автоматизации» сохраняется.
 */

export interface CompanyProfile {
  name: string;
  /** Короткое позиционирование для hero-бейджа. */
  badge: string;
  /** Полное юридическое название (для документов и JSON-LD). */
  legalName: string;
  /** Год начала работы. Проверяемый факт. */
  foundingYear: number;
  website: string;
  email: string;
  phone: string;
  /** Город для региональной выдачи. */
  city: string;
  /** Короткое описание для meta/og/llms.txt (1-2 предложения). */
  description: string;
  /** Основная специализация. */
  specialization: string;
  /** Честная модель работы — коротко. */
  operatingModel: string;
}

export const COMPANY: CompanyProfile = {
  name: 'ChatBot24',
  badge: 'Инженерное бюро автоматизации',
  legalName: 'ChatBot24',
  foundingYear: 2025,
  website: 'https://chatbot24.su',
  email: 'info@chatbot24.su',
  phone: '+7 (993) 336-61-02',
  city: 'Москва',
  description:
    'Разрабатываем Telegram-ботов для приёма заявок, записи, Google Таблиц, мини-CRM и интеграций. Запуск за 7–14 дней.',
  specialization:
    'Telegram-боты для заявок, записи, учёта и интеграций с внешними сервисами',
  operatingModel:
    'Компактная специализированная команда. Для отдельных задач подключаем проверенных подрядчиков под NDA.',
};

/**
 * Поддерживаемые каналы. Telegram — основной, остальные — по запросу.
 * Не указываем «WhatsApp/Instagram как равноценные»: для них требуется
 * отдельная интеграция (см. CUSTOM_INTEGRATIONS в catalog.ts).
 */
export const PRIMARY_CHANNEL = 'Telegram';

export const SUPPORTED_CHANNELS = {
  primary: ['Telegram'],
  onRequest: ['WhatsApp Business API', 'ВКонтакте'],
} as const;

/**
 * Интеграции, которые мы выполняем. Источник для TechStack, knowledge-base,
 * системного промпта. Совпадает с CUSTOM_INTEGRATIONS в catalog.ts.
 */
export const INTEGRATIONS = [
  'Google Таблицы',
  'Google Календарь',
  'amoCRM',
  'Битрикс24',
  'МойСклад',
  'RetailCRM',
  '1С',
  'ЮKassa',
  'Robokassa',
] as const;

/**
 * Честное описание процесса поддержки — без «24/7» и «SLA 99.9%».
 * Используется в Advantages/WhyUs, FAQ, системном промпте.
 */
export const SUPPORT_MODEL = {
  summary:
    'Поддержка по согласованному регламенту: рабочие часы плюс аварийный канал в Telegram.',
  workingHours: 'Рабочие часы для обычных обращений',
  emergencyChannel: 'Аварийный канал в Telegram для срочных проблем',
  sla: null, // намеренно null: мы НЕ обещаем SLA 99.9%
} as const;

/**
 * Достоверные преимущества. Без «в штате», «senior 5+ лет», «фрилансерам».
 * Эти строки использует Advantages.tsx / WhyUs.tsx.
 */
export const ADVANTAGES = [
  {
    title: 'Личное ведение проекта',
    description:
      'Каждый проект ведёт ответственный инженер. Вы общаетесь напрямую с исполнителем, а не с менеджером по аккаунтам.',
  },
  {
    title: 'Фиксированная смета',
    description:
      'Цена фиксируется в договоре. Доработки в рамках первого месяца включены в стоимость.',
  },
  {
    title: 'Запуск за 7–14 дней',
    description:
      'Чёткие сроки по этапам. Базовые сценарии начинают принимать заявки уже через неделю.',
  },
  {
    title: 'Проверенные подрядчики под NDA',
    description:
      'Для отдельных задач (интеграции, дизайн, фронтенд) подключаем проверенных подрядчиков под NDA.',
  },
  {
    title: 'Прозрачная поддержка',
    description:
      'Поддержка по согласованному регламенту: рабочие часы плюс аварийный канал в Telegram.',
  },
  {
    title: 'Доработки включены',
    description:
      'Правки и небольшие доработки в рамках первого месяца — без дополнительных счетов.',
  },
] as const;

/**
 * Мета-данные для SEO. Все страницы берут отсюда базовые значения.
 */
export const SEO_DEFAULTS = {
  siteName: COMPANY.name,
  locale: 'ru_RU',
  title: 'Telegram-боты для заявок, записи и учёта — от 19 900 ₽ | ChatBot24',
  description:
    'Telegram-боты под ключ: приём заявок, запись, Google Таблицы, мини-CRM, интеграции с amoCRM, Битрикс24, 1С. Запуск за 7–14 дней.',
} as const;
