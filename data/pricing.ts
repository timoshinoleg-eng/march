export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  setupFee: number;
  features: string[];
  popular?: boolean;
  highlight?: boolean;
  requestsPerDay?: string;
  utmContent?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "lite",
    name: "Lite",
    description: "Для старта и небольших проектов",
    price: 15000,
    setupFee: 0,
    requestsPerDay: "До 50 заявок/мес",
    features: [
      "Базовый чат-бот",
      "1 мессенджер (Telegram/WhatsApp)",
      "Простая CRM",
      "Email-уведомления",
      "Базовая аналитика",
      "Настройка за 3-5 дней",
    ],
    utmContent: "lite",
  },
  {
    id: "base",
    name: "Base",
    description: "Оптимально для растущего бизнеса",
    price: 29000,
    setupFee: 0,
    requestsPerDay: "До 200 заявок/мес",
    highlight: true,
    features: [
      "Умный чат-бот с NLP",
      "До 3 мессенджеров",
      "Полноценная CRM",
      "Автоквалификация лидов",
      "Интеграция с Bitrix24/AmoCRM",
      "Расширенная аналитика",
      "Приоритетная поддержка",
    ],
    utmContent: "base",
  },
  {
    id: "ai",
    name: "AI",
    description: "Современные AI-возможности",
    price: 39000,
    setupFee: 0,
    requestsPerDay: "До 500 заявок/мес",
    features: [
      "AI-ассистент (YandexGPT)",
      "Неограниченные каналы",
      "Enterprise CRM",
      "Предиктивная аналитика",
      "Интеграция с любыми системами",
      "Кастомная логика",
      "152-ФЗ compliance",
    ],
    utmContent: "ai",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Для медицины и крупного бизнеса",
    price: 69000,
    setupFee: 0,
    requestsPerDay: "1000+ заявок/мес",
    features: [
      "Всё из AI + on-premise размещение",
      "Полная защита по 152-ФЗ",
      "Серверы в РФ (Яндекс Облако)",
      "SLA 99.9%",
      "Выделенный менеджер",
      "Индивидуальная разработка",
      "Приоритетная поддержка 24/7",
    ],
    utmContent: "enterprise",
  },
];
