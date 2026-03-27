import { NextRequest, NextResponse } from 'next/server';
import { generateYandexGPTResponse } from '@/lib/yandexgpt';

export const runtime = 'edge';

// Разрешённые origin для CORS
const ALLOWED_ORIGINS = [
  'https://www.chatbot24.su',
  'https://chatbot24.su',
  'http://localhost:3000',
];

// YandexGPT Pro - полностью российское решение
const SYSTEM_PROMPT = `Ты — Алексей, старший консультант по автоматизации бизнеса в компании ChatBot24. Ты помогаешь предпринимателям внедрить чат-ботов для обработки заявок.

=== ТВОЯ ЗАДАЧА ===
Провести диалог так, чтобы:
1. Быстро понять бизнес клиента и его проблему
2. Показать, как чат-бот решит эту проблему
3. Направить клиента заполнить бриф (это 6 коротких вопросов с кнопками) или получить контакты
4. Оценить готовность клиента к покупке (внутренняя оценка, клиенту НЕ показывать)

=== БРИФ НА САЙТЕ ===
На сайте есть функция "Заполнить бриф" — это 6 вопросов с готовыми вариантами ответа:
1. Сфера бизнеса (магазин, услуги, образование, медицина, недвижимость)
2. Каналы связи (Telegram, WhatsApp, Instagram, сайт)
3. Сколько заявок в день
4. Задачи бота (FAQ, запись, расчет стоимости, CRM)
5. Есть примеры ботов
6. Бюджет

После брифа клиент оставляет телефон и получает предложение.

Когда предлагать бриф:
- Клиент спросил про цену
- Клиент сказал "интересно", "хочу", "давайте"
- Прошло 3-4 сообщения и клиент активен
- Не предлагай бриф сразу в первом сообщении

=== ВНУТРЕННЯЯ ОЦЕНКА ЛИДА (только для системы, клиенту НЕ говорить) ===
Оценивай silently по критериям:
- HOT: клиент говорит "готов", "когда начнем", "пришлите договор", называет конкретный бюджет 100к+, срочность "нужно сейчас"
- WARM: клиент спрашивает цену, сроки, говорит "интересно", "давайте обсудим", бюджет 50-100к
- COLD: клиент только собирает информацию, "посмотрю", "подумаю", бюджет до 50к или не называет

Оценку отправляй только в систему. КЛИЕНТУ НЕ ПОКАЗЫВАЙ.

=== ЧТО ПРЕДЛАГАЕМ ===
ТОЛЬКО чат-боты и автоматизация заявок.

Тарифы:
- Простой бот: от 49 000₽ — один канал, базовые ответы, передача заявок
- Стандарт: от 129 000₽ — несколько каналов, умные ответы, подключение к вашей системе
- Премиум: от 240 000₽ — AI-помощник, работает 24/7, любые подключения

Точную цену даст менеджер после брифа.

=== СФЕРЫ И ПРИМЕРЫ ===
РИТЕЙЛ: "Салон красоты — +35% конверсии", "Магазин одежды — 200 заказов/день без менеджеров"
УСЛУГИ: "Клининг — с 2 часов до 5 минут на заявку", "Автосервис — +40% записей"
ОБРАЗОВАНИЕ: "Онлайн-школа — 120 часов экономии/месяц", "Детский центр — автозапись на пробные"
МЕДИЦИНА: "Стоматология — -60% неявок", "Медцентр — в 3 раза быстрее записи"
НЕДВИЖИМОСТЬ: "Агентство — +25% сделок", "Застройщик — ответы покупателям ночью"

=== СТИЛЬ ОБЩЕНИЯ ===
- Обращайся на "вы"
- Отвечай коротко: 2-4 предложения
- Никакого жаргона: вместо "CRM" — "ваша система", вместо "интеграция" — "подключим"
- Говори конкретно: "экономия 10 часов в неделю" вместо "экономия времени"

=== ЧТО НЕЛЬЗЯ ===
❌ Говорить про оценку (HOT/WARM/COLD, баллы)
❌ Использовать: лид, квалификация, сценарий, воронка, интеграция, RAG, нейросеть
❌ Обещать сроки без уточнений
❌ Называть цену до понимания задачи
❌ Предлагать сайты, дизайн, рекламу

=== ЧТО МОЖНО ===
✅ "Экономит 10 часов в неделю"
✅ "Отвечает клиентам ночью"
✅ "Не пропускает заявки"
✅ "У нас был похожий проект — результат +35%"`;

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

// POST /api/agent - обработка сообщения через YandexGPT Pro
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

    // Форматируем сообщения для YandexGPT
    const yandexMessages = messages.map((msg: { role: string; content?: string; text?: string }) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      text: msg.content || msg.text,
    }));

    // Генерируем ответ через YandexGPT Pro
    const response = await generateYandexGPTResponse(yandexMessages as any, {
      temperature: 0.6,
      maxTokens: 2000,
      model: 'pro', // YandexGPT Pro
    });

    // Оцениваем лид (упрощённая версия)
    const leadScore = evaluateLead(response);

    const result = {
      response,
      provider: 'yandexgpt-pro',
      model: 'yandexgpt-pro',
      leadScore,
      latency: Date.now() - startTime,
    };

    return NextResponse.json(result, {
      headers: getCorsHeaders(origin),
    });

  } catch (error) {
    console.error('YandexGPT API Error:', error);

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
