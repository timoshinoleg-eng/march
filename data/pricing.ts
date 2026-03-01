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
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "mvp-bot",
    name: "MVP-бот",
    description: "Для старта автоматизации обработки заявок",
    price: 49000,
    setupFee: 0,
    requestsPerDay: "10–30 обращений/день",
    features: [
      "Базовый чат-бот",
      "Прием и маршрутизация заявок",
      "Интеграция с 1 мессенджером",
      "Простая CRM",
      "Email уведомления",
      "Базовая аналитика",
    ],
  },
  {
    id: "sales-system",
    name: "Sales-Система",
    description: "Оптимально для активных продаж",
    price: 129000,
    setupFee: 0,
    requestsPerDay: "30–100 обращений/день",
    highlight: true,
    features: [
      "Умный чат-бот с NLP",
      "Мультиканальность (3+ канала)",
      "Полноценная CRM",
      "Автоматическое квалифицирование лидов",
      "Интеграция с телефонией",
      "Расширенная аналитика",
      "Приоритетная поддержка",
    ],
  },
  {
    id: "ai-automation",
    name: "AI-Автоматизация",
    description: "Полная автоматизация с искусственным интеллектом",
    price: 240000,
    setupFee: 0,
    requestsPerDay: "50+ обращений/день",
    features: [
      "AI-ассистент с GPT",
      "Неограниченные каналы связи",
      "Enterprise CRM",
      "Предиктивная аналитика",
      "Интеграция с любыми системами",
      "Кастомная логика обработки",
      "Выделенный менеджер",
      "SLA 99.9%",
    ],
  },
];
