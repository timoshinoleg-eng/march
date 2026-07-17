/**
 * Единый источник правды для тарифов и услуг.
 *
 * Все остальные места (data/pricing.ts, components/SchemaOrg.tsx,
 * data/knowledge-base.json, data/faq-chatbot24.json, app/api/agent/route.ts,
 * public/llms.txt, components/sections/Calculator.tsx) ДОЛЖНЫ брать данные отсюда.
 *
 * Лестница согласована с Авито-объявлением.
 * Меняйте цены ТОЛЬКО здесь — они автоматически разойдутся по сайту, чату, FAQ,
 * schema, llms.txt и калькулятору.
 *
 * При изменении:
 *   1. Отредактируйте значения ниже.
 *   2. Запустите `npm run typecheck` — TypeScript проверит все использования.
 *   3. Проверьте `data/sync-checks.md` на рассинхронизацию JSON-источников.
 */

export type Currency = 'RUB';

/** Валюта для отображения. */
export const CURRENCY: Currency = 'RUB';
export const CURRENCY_SYMBOL = '₽';

/** Минимальная стартовая цена — для hero/meta/og. */
export const MIN_PRICE = 19900;

/** Минимальная пилотная цена (только при наличии свободного места). */
export const PILOT_PRICE = 16900;

/** Текст условия для пилота. */
export const PILOT_CONDITION = 'при наличии свободного места';

/**
 * Идентификаторы тарифов. Стабильные строки — используются в UTM,
 * аналитике и API. Не меняйте без миграции.
 */
export const PLAN_IDS = {
  BASIC: 'basic',
  PILOT: 'pilot',
  SCENARIO: 'scenario',
  CRM: 'crm',
  LANDING: 'landing',
  CUSTOM: 'custom',
} as const;

export type PlanId = (typeof PLAN_IDS)[keyof typeof PLAN_IDS];

export interface PricingPlan {
  id: PlanId;
  /** Короткое имя для карточки. */
  name: string;
  /** Описание уровня в одну строку. */
  description: string;
  /** Цена в рублях (число, для расчётов). */
  price: number;
  /** Показывать «от» перед ценой. */
  showFrom: boolean;
  /** true для тарифа с особым условием (пилот по акции). */
  isPromo?: boolean;
  /** Текст особого условия, если есть (для пилота). */
  condition?: string;
  /** Срок запуска. */
  timeline: string;
  /** Что входит. */
  features: string[];
  /** Текст кнопки. */
  buttonText: string;
  /** UTM-метка content. */
  utmContent: string;
  /** Выделить как рекомендованный (для UI). */
  highlight?: boolean;
  /** Подсказка-мостик между тарифами. */
  bridgeText?: string;
}

/**
 * Главная тарифная лестница (5 уровней).
 * Источник: Авито-объявление + согласование с владельцем.
 */
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: PLAN_IDS.BASIC,
    name: 'Базовый бот',
    description: 'Telegram-бот для приёма заявок и контактов',
    price: MIN_PRICE,
    showFrom: false,
    timeline: 'Запуск за 3–5 дней',
    features: [
      'Telegram-бот',
      'Сбор заявок и контактов',
      'Уведомления о новых заявках',
      'До 30 обращений в день',
    ],
    buttonText: 'Начать с базового →',
    utmContent: 'basic',
  },
  {
    id: PLAN_IDS.PILOT,
    name: 'Пилот',
    description: 'Акция: базовый бот по сниженной цене',
    price: PILOT_PRICE,
    showFrom: false,
    isPromo: true,
    condition: PILOT_CONDITION,
    timeline: 'Запуск за 3–5 дней',
    features: [
      'Тот же функционал, что в «Базовый бот»',
      'Сниженная цена старта',
      'Только при наличии свободного места',
    ],
    buttonText: 'Узнать о наличии →',
    utmContent: 'pilot',
  },
  {
    id: PLAN_IDS.SCENARIO,
    name: 'Бот + сценарий',
    description: 'Google Таблицы, календарь или дополнительный сценарий',
    price: 24900,
    showFrom: true,
    timeline: 'Запуск за 5–7 дней',
    features: [
      'Всё из «Базовый бот»',
      'Интеграция с Google Таблицами или календарём',
      'Дополнительный сценарий диалога',
      'Запись в таблицу / календарь',
    ],
    buttonText: 'Выбрать сценарий →',
    utmContent: 'scenario',
    bridgeText:
      'Если нужна автоматическая запись или мини-CRM — смотрите следующий уровень.',
  },
  {
    id: PLAN_IDS.CRM,
    name: 'Бот + мини-CRM',
    description: 'Мини-CRM или автоматическая запись клиентов',
    price: 34900,
    showFrom: true,
    highlight: true,
    timeline: 'Запуск за 7–10 дней',
    features: [
      'Всё из «Бот + сценарий»',
      'Мини-CRM для учёта клиентов',
      'Автоматическая запись с выбором слота',
      'Напоминания клиентам',
      'История взаимодействий',
    ],
    buttonText: 'Выбрать мини-CRM →',
    utmContent: 'crm',
    bridgeText:
      'Если нужен сайт-лендинг в комплекте — смотрите следующий уровень.',
  },
  {
    id: PLAN_IDS.LANDING,
    name: 'Лендинг + бот + мини-CRM',
    description: 'Полный комплект: одностраничный сайт + бот + CRM',
    price: 49900,
    showFrom: true,
    timeline: 'Запуск за 10–14 дней',
    features: [
      'Лендинг под ваш бизнес',
      'Telegram-бот',
      'Мини-CRM',
      'Формы захвата на сайте и в боте',
      'Согласованный визуальный стиль',
    ],
    buttonText: 'Обсудить комплект →',
    utmContent: 'landing',
  },
];

/**
 * Сложные интеграции — оцениваются отдельно.
 * Не входят в фиксированную лестницу.
 */
export interface CustomIntegration {
  id: string;
  name: string;
  description: string;
  /** Оценка отдельно (true) — цена только после брифа. */
  customQuote: true;
}

export const CUSTOM_INTEGRATIONS: CustomIntegration[] = [
  {
    id: 'ai',
    name: 'AI-ассистент',
    description:
      'AI-обработка типовых вопросов на базе доступной модели. Стоимость зависит от объёма диалогов и модели.',
    customQuote: true,
  },
  {
    id: 'amocrm',
    name: 'amoCRM',
    description: 'Двусторонняя интеграция с amoCRM: сделки, контакты, этапы воронки.',
    customQuote: true,
  },
  {
    id: 'bitrix24',
    name: 'Битрикс24',
    description: 'Интеграция с Битрикс24: лиды, сделки, задачи, комментарии.',
    customQuote: true,
  },
  {
    id: 'whatsapp-business',
    name: 'WhatsApp Business API',
    description:
      'Подключение официального WhatsApp Business API. Требует верификации Meta и оплачивается отдельно.',
    customQuote: true,
  },
  {
    id: 'payments',
    name: 'Приём оплаты',
    description:
      'Онлайн-оплата в боте через ЮKassa, Robokassa или эквайринг банка. Подключение и фискализация.',
    customQuote: true,
  },
  {
    id: 'custom',
    name: 'Нестандартная интеграция',
    description:
      'Интеграции с 1С, МойСклад, RetailCRM, внешними API, кастомные сценарии. Оценка по ТЗ.',
    customQuote: true,
  },
];

/**
 * Форматирование цены для UI: «19 900 ₽», «от 24 900 ₽».
 */
export function formatPrice(
  price: number,
  opts: { showFrom?: boolean; withSymbol?: boolean } = {}
): string {
  const { showFrom = false, withSymbol = true } = opts;
  // Разделитель разрядов — узкий неразрывный пробел (UTF-8 \u202F) для корректного отображения в RU.
  const formatted = price.toLocaleString('ru-RU').replace(/\s/g, '\u202F');
  const symbol = withSymbol ? ` ${CURRENCY_SYMBOL}` : '';
  return `${showFrom ? 'от ' : ''}${formatted}${symbol}`;
}

/**
 * Главная «стартовая» цена для hero: «от 19 900 ₽».
 * Используется в hero, meta description, og:description, llms.txt.
 */
export const HERO_PRICE_TEXT = formatPrice(MIN_PRICE, { showFrom: true });

/**
 * Версия каталога. Полезно для отладки синхронизации JSON-источников:
 * при правках цен увеличивайте минорную версию.
 */
export const CATALOG_VERSION = '1.0.0';
