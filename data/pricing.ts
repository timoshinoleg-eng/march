export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  setupFee: number;
  features: string[];
  timeline: string;
  showFrom?: boolean;
  buttonText?: string;
  utmContent?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "lite",
    name: "Lite",
    description: "Для теста идеи или малого бизнеса (< 50 заявок/мес)",
    price: 19900,
    setupFee: 0,
    timeline: "Запуск за 3–5 дней",
    features: [
      "Чат-бот в Telegram или WhatsApp",
      "Сбор заявок и контактов",
      "Уведомления на email",
    ],
    buttonText: "Начать с этого →",
    utmContent: "lite",
  },
  {
    id: "base",
    name: "Base",
    description: "Салоны, курсы, доставка — где нужна запись и CRM",
    price: 39000,
    setupFee: 0,
    timeline: "Запуск за 5–7 дней",
    features: [
      "Все каналы сразу (Telegram + WhatsApp + сайт)",
      "Автоматическая запись в календарь/CRM",
      "Отсеивает нерелевантных клиентов",
    ],
    buttonText: "Выбрать Base →",
    utmContent: "base",
  },
  {
    id: "ai-assist",
    name: "AI-Assist",
    description: "Когда много вопросов, нужно сэкономить время админа",
    price: 129000,
    setupFee: 0,
    timeline: "Запуск за 7–10 дней",
    features: [
      "AI отвечает на типовые вопросы (1000 диалогов/мес включено)",
      "Приём оплаты в боте (ЮKassa)",
      "Панель управления для менеджера",
      "Экономия 2 часа/день работы админа",
    ],
    buttonText: "Добавить AI →",
    utmContent: "ai_assist",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Клиники, банки, крупный ритейл — где важна безопасность",
    price: 249000,
    setupFee: 0,
    showFrom: true,
    timeline: "Срок от 2 недель",
    features: [
      "Серверы в вашей инфраструктуре",
      "Защита данных по закону (152-ФЗ)",
      "Гарантия SLA 99.9% + выделенный менеджер",
      "Индивидуальный проект под ТЗ",
    ],
    buttonText: "Обсудить проект →",
    utmContent: "enterprise",
  },
];

export const bridgeText = "Не уверены, нужен ли AI? Большинству бизнесов достаточно Base — AI актуален при 100+ вопросах в день.";
