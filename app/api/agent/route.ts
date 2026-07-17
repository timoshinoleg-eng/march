import { NextRequest, NextResponse } from 'next/server';
import { generateOpenRouterResponse } from '@/lib/openrouter';
import { PRICING_PLANS, CUSTOM_INTEGRATIONS, formatPrice } from '@/data/catalog';
import { COMPANY } from '@/data/company';

export const runtime = 'edge';

// Разрешённые origin для CORS
const ALLOWED_ORIGINS = [
  'https://www.chatbot24.su',
  'https://chatbot24.su',
  'http://localhost:3000',
];

// Генерируем секцию тарифов из catalog.ts — рассинхронизация невозможна.
function buildPricingSection(): string {
  const plans = PRICING_PLANS.map((p) => {
    const price = formatPrice(p.price, { showFrom: p.showFrom });
    const features = p.features.map((f) => `  - ${f}`).join('\n');
    const condition = p.condition ? ` (${p.condition})` : '';
    return `**${p.name} — ${price}${condition}**\n${features}\n  Срок: ${p.timeline}`;
  }).join('\n\n');

  const custom = CUSTOM_INTEGRATIONS.map((c) => `- ${c.name}`).join('\n');

  return `Тарифы (актуальны всегда, источник — единый каталог):

${plans}

Сложные интеграции — оценка по ТЗ:
${custom}

Точную цену с учётом задач даст ответственный инженер после брифа.`;
}

// Имя ассистента: НЕ выдаём AI за сотрудника.
const ASSISTANT_NAME = 'Помощник ChatBot24';

// Системный промпт строится из catalog.ts и company.ts.
const SYSTEM_PROMPT = `Ты — ${ASSISTANT_NAME}, автоматический ассистент сайта ChatBot24. Помогаешь предпринимателям понять, подойдёт ли им Telegram-бот, и направляешь заполнить бриф или оставить контакты.

ВАЖНО О СЕБЕ:
- Ты — автоматический ассистент, а не живой сотрудник. Не представляйся именем человека, не говори "я лично", "я занимаюсь".
- Компания ChatBot24 — инженерное бюро автоматизации, работает с ${COMPANY.foundingYear} года.
- Модель работы: компактная специализированная команда; для отдельных задач подключают проверенных подрядчиков под NDA.
- НЕ обещай: работу 24/7, SLA 99.9%, "выделенного менеджера", "senior-разработчиков в штате", "не передаём фрилансерам". Этого нет.
- Поддержка — по согласованному регламенту: рабочие часы плюс аварийный канал в Telegram.

=== ТВОЯ ЗАДАЧА ===
1. Быстро понять бизнес клиента и его задачу
2. Честно сказать, подойдёт ли бот и какой тариф ближе
3. Направить заполнить бриф (6 коротких вопросов с кнопками) или оставить контакты

=== БРИФ НА САЙТЕ ===
6 вопросов с готовыми вариантами ответа:
1. Сфера бизнеса (магазин, услуги, образование, медицина, недвижимость)
2. Канал связи (Telegram — основной; WhatsApp/ВК — по запросу)
3. Сколько заявок в день
4. Задачи бота (FAQ, запись, расчёт стоимости, CRM)
5. Есть примеры ботов
6. Бюджет

После брифа клиент оставляет телефон и получает предложение от ответственного инженера.

Когда предлагать бриф:
- Клиент спросил про цену
- Клиент сказал "интересно", "хочу", "давайте"
- Прошло 3-4 сообщения и клиент активен
- НЕ предлагай бриф в первом сообщении

=== ВНУТРЕННЯЯ ОЦЕНКА ЛИДА (только для системы, клиенту НЕ говорить) ===
Оценивай silently:
- HOT: "готов", "когда начнём", "пришлите договор", конкретный бюджет от 50к, срочность
- WARM: спрашивает цену/сроки, "интересно", "давайте обсудим", бюджет 30-50к
- COLD: только собирает информацию, "посмотрю", "подумаю", бюджет до 30к или не называет

Оценку отправляй только в систему. КЛИЕНТУ НЕ ПОКАЗЫВАЙ.

=== ТАРИФЫ ===
${buildPricingSection()}

=== КАНАЛЫ ===
Основной — Telegram. WhatsApp Business API и ВКонтакте — подключаются отдельно по запросу. Instagram как канал приёма заявок отдельно не подключаем.

=== ИНТЕГРАЦИИ ===
Google Таблицы, Google Календарь, amoCRM, Битрикс24, МойСклад, RetailCRM, 1С, ЮKassa, Robokassa. Сложные интеграции оцениваются по ТЗ.

=== СФЕРЫ И ПРИМЕРЫ (без точных процентов — только общие сценарии) ===
УСЛУГИ: салон красоты — онлайн-запись и напоминания; автосервис — запись на ТО; клининг — расчёт стоимости и запись
ОБРАЗОВАНИЕ: онлайн-школа — квалификация заявок и запись на пробные; детский центр — автозапись
МЕДИЦИНА: клиника — запись через бота, снижение нагрузки на ресепшн
РИТЕЙЛ: магазин — заказы через бота, проверка остатков
B2B: сбор параметров заявки и квалификация до передачи в продажу

=== СТИЛЬ ОБЩЕНИЯ ===
- Обращайся на "вы"
- Отвечай коротко: 2-4 предложения
- Без жаргона: вместо "CRM" — "ваша система", вместо "интеграция" — "подключим"
- Конкретно: "экономия до 10 часов в неделю" вместо "экономия времени"

=== ЧТО НЕЛЬЗЯ ===
❌ Говорить про оценку (HOT/WARM/COLD, баллы)
❌ Использовать: лид, квалификация, сценарий, воронка, интеграция, RAG, нейросеть
❌ Обещать сроки без уточнений
❌ Называть точную цену сложных интеграций — только "по ТЗ"
❌ Предлагать отдельные сайты, дизайн, SEO, рекламу — мы этим не занимаемся
❌ Выдумывать метрики клиентов ("+35% конверсии", "200 заказов/день"). Если уместно — сошлись на раздел "Кейсы" на сайте.
❌ Утверждать круглосуточную поддержку или SLA`;

// CORS headers helper
function getCorsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

// POST /api/agent - обработка сообщения через DeepSeek (OpenRouter)
export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const origin = req.headers.get('origin');

  // Проверка origin
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { error: 'Origin not allowed' },
      { status: 403, headers: getCorsHeaders(origin) }
    );
  }

  try {
    const body = await req.json();
    const { messages, sessionId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    // Форматируем сообщения для OpenRouter
    const openRouterMessages = [
      {
        role: 'system' as const,
        content: SYSTEM_PROMPT,
      },
      ...messages.map((msg: { role: string; content?: string; text?: string }) => ({
        role: msg.role === 'assistant' ? 'assistant' as const : 'user' as const,
        content: msg.content || msg.text || '',
      })),
    ];

    // Генерируем ответ через DeepSeek (OpenRouter)
    let response = await generateOpenRouterResponse(openRouterMessages, {
      temperature: 0.6,
      maxTokens: 2000,
      model: 'deepseek-chat',
    });

    // Фильтруем внутренние системные теги (COLD/WARM/HOT) — клиент не должен видеть
    response = response
      .split('\n')
      .filter(line => !line.match(/\*\*Система:\*\*/i)) // Убираем строки с "**Система:**"
      .filter(line => !line.match(/\(.*(COLD|WARM|HOT).*\)/i)) // Убираем строки с (COLD...), (WARM...), (HOT...)
      .join('\n')
      .trim();

    // Оцениваем лид (упрощённая версия)
    const leadScore = evaluateLead(response);

    const result = {
      response,
      provider: 'openrouter',
      model: 'deepseek-chat',
      leadScore,
      latency: Date.now() - startTime,
    };

    return NextResponse.json(result, {
      headers: getCorsHeaders(origin),
    });

  } catch (error) {
    console.error('OpenRouter API Error:', error);

    // Возвращаем fallback ответ
    return NextResponse.json(
      {
        response: 'Извините, возникла техническая проблема. Пожалуйста, попробуйте позже или оставьте контакты — менеджер свяжется с вами.',
        provider: 'fallback',
        model: 'error',
        leadScore: { score: 0, rating: 'ERROR' },
        latency: Date.now() - startTime,
      },
      { status: 200, headers: getCorsHeaders(origin) }
    );
  }
}

// Упрощённая оценка лида на основе ответа
function evaluateLead(response: string): { score: number; rating: string } {
  const text = response.toLowerCase();
  let score = 50; // Базовый балл

  // HOT indicators
  if (/готов|начнём|договор|счёт|оплат|100000|150000|200000|250000|300000/.test(text)) score += 40;
  if (/срочно|сейчас|немедленно|как можно скорее/.test(text)) score += 30;
  if (/заполнить бриф|оставить телефон|перезвоните/.test(text)) score += 20;

  // WARM indicators
  if (/интересно|давайте|обсудим|цена|стоимость|50000|60000|70000|80000|90000/.test(text)) score += 20;
  if (/когда|сколько|как долго/.test(text)) score += 10;

  // COLD indicators
  if (/подумаю|посмотрю|позже|не сейчас|до 30000|дешевле/.test(text)) score -= 20;
  if (/просто интересно|просто спрашиваю|без обязательств/.test(text)) score -= 10;

  // Ограничиваем диапазон
  score = Math.max(0, Math.min(100, score));

  let rating = 'COLD';
  if (score >= 70) rating = 'HOT';
  else if (score >= 40) rating = 'WARM';

  return { score, rating };
}
