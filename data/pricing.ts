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
    description: "Только базовый бот, 1 канал",
    price: 19900,
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
    description: "3 канала, CRM, базовая аналитика",
    price: 39000,
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
    id: "ai-assist",
    name: "AI-Assist",
    description: "Всё из Base + AI (1000 запросов), оплата, админка",
    price: 129000,
    setupFee: 0,
    requestsPerDay: "До 1000 заявок/мес",
    features: [
      "AI-ассистент (YandexGPT) — 1000 запросов/мес",
      "Приём оплаты в боте",
      "Админ-панель для управления",
      "Неограниченные каналы",
      "Enterprise CRM",
      "152-ФЗ compliance",
      "Приоритетная поддержка",
    ],
    utmContent: "ai_assist",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "On-premise, SLA 99.9%, выделенный менеджер",
    price: 249000,
    setupFee: 0,
    requestsPerDay: "1000+ заявок/мес, безлимит AI",
    features: [
      "Всё из AI-Assist + on-premise размещение",
      "Полная защита по 152-ФЗ",
      "Серверы в РФ (Яндекс Облако)",
      "SLA 99.9% с компенсацией",
      "Выделенный менеджер",
      "Индивидуальная разработка",
      "Поддержка 24/7",
    ],
    utmContent: "enterprise",
  },
];
