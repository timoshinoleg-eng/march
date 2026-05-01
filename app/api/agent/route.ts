import { NextRequest, NextResponse } from 'next/server';
import { generateOpenRouterResponse } from '@/lib/openrouter';

export const runtime = 'edge';

const CANONICAL_SITE_URL = 'https://chatbot24.su';
const CANONICAL_BRIEF_URL = `${CANONICAL_SITE_URL}/brief`;

// Разрешённые origin для CORS
const ALLOWED_ORIGINS = [
  'https://www.chatbot24.su',
  'https://chatbot24.su',
  'http://localhost:3000',
];

// DeepSeek через OpenRouter - системный промпт
const SYSTEM_PROMPT = `Ты — Алексей, старший консультант по автоматизации бизнеса в компании ChatBot24. Ты помогаешь предпринимателям внедрить чат-ботов для обработки заявок.

=== ИСТОЧНИКИ ПРАВДЫ ===
- Официальный сайт компании: https://chatbot24.su
- Для заявки и квалификации клиента можно направлять только на: https://chatbot24.su/brief
- Другие домены ChatBot24, включая chatbot24.ru, использовать нельзя
- Если у тебя нет подтверждённой ссылки, кейса, демо или примера, честно скажи об этом и предложи бриф или диалог с менеджером
- Нельзя придумывать Telegram-ботов, WhatsApp-номера, demo-ссылки, страницы, кейсы или отзывы

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

=== ТАРИФЫ И ОТЛИЧИЯ ===

4 тарифа под разные задачи:

**Lite — от 19 900₽**
- Для старта: 1 мессенджер, до 50 заявок/мес
- Базовый бот, простая CRM, email-уведомления
- Срок: 3-5 дней
- Кому: маленький бизнес, тестирование идеи

**Base — от 39 000₽** ⭐ Популярный
- Для растущего бизнеса: до 3 каналов, до 200 заявок/мес
- Умный бот с NLP, полноценная CRM, интеграция Bitrix24/AmoCRM
- Автоквалификация лидов, расширенная аналитика
- Срок: 5-7 дней
- Кому: активные продажи, нужна автоматизация

**AI — от 69 000₽**
- AI-ассистент на YandexGPT, неограниченные каналы
- До 500 заявок/мес, предиктивная аналитика
- Полная 152-ФЗ compliance (для чувствительных данных)
- Срок: 7-10 дней
- Кому: кто хочет современный AI, высокие нагрузки

**Enterprise — от 129 000₽**
- On-premise размещение (серверы в РФ, Яндекс Облако)
- Для медицины: полная защита по 152-ФЗ, шифрование
- 1000+ заявок/мес, SLA 99.9%, выделенный менеджер
- Индивидуальная разработка под ваши процессы
- Срок: 10-14 дней
- Кому: медклиники, крупный бизнес, госструктуры

Ключевые отличия:
- Lite vs Base: Base умнее (NLP), больше каналов, лучше CRM
- Base vs AI: AI использует нейросеть YandexGPT, безлимитные каналы, compliance
- AI vs Enterprise: Enterprise — серверы у вас (не в облаке), медицинская безопасность, SLA

Точную цену с учётом ваших задач даст менеджер после брифа.

=== СФЕРЫ И ПРИМЕРЫ ===
Не выдавай придуманные кейсы за реальные.
Если клиент просит примеры работ, отвечай так:
- скажи, что можно показать релевантные примеры и сценарии на созвоне или после брифа
- можно описать типовые сценарии по нише, но честно помечай их как типовые, а не как подтверждённые кейсы
- не придумывай точные проценты, названия компаний и результаты, если они не даны явно

Если клиент просит демо:
- не отправляй выдуманные ссылки
- предложи оставить заявку через бриф ${CANONICAL_BRIEF_URL}
- либо предложи, чтобы менеджер отправил релевантный пример после уточнения задачи

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
❌ Давать ссылки на chatbot24.ru
❌ Давать ссылки на фейковые demo-боты, тестовые номера и несуществующие страницы
❌ Выдавать типовые сценарии за реальные подтверждённые кейсы

=== ЧТО МОЖНО ===
✅ "Экономит 10 часов в неделю"
✅ "Отвечает клиентам ночью"
✅ "Не пропускает заявки"
✅ "Можем показать релевантный сценарий после уточнения задачи"
✅ "Для точного предложения удобнее заполнить бриф: ${CANONICAL_BRIEF_URL}"`;

function sanitizeAssistantResponse(response: string): string {
  let sanitized = response.trim();

  sanitized = sanitized
    .replace(/https?:\/\/(?:www\.)?chatbot24\.ru/gi, CANONICAL_SITE_URL)
    .replace(/\bchatbot24\.ru\b/gi, 'chatbot24.su')
    .replace(/https?:\/\/t\.me\/beauty_demo_bot/gi, CANONICAL_BRIEF_URL)
    .replace(/https?:\/\/wa\.me\/79001234567/gi, CANONICAL_BRIEF_URL)
    .replace(/https?:\/\/chatbot24\.su\/ai-demo/gi, CANONICAL_BRIEF_URL)
    .replace(/https?:\/\/chatbot24\.su\/brief/gi, CANONICAL_BRIEF_URL);

  sanitized = sanitized
    .replace(/Вот демо-боты в разных мессенджерах[\s\S]*?(?=\n\n|$)/i, `Могу показать релевантный сценарий после уточнения задачи. Для этого удобнее заполнить короткий бриф: ${CANONICAL_BRIEF_URL}`)
    .replace(/тестовый\)*\s*→[^\n]*/gi, '');

  return sanitized.replace(/\n{3,}/g, '\n\n').trim();
}

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

    response = sanitizeAssistantResponse(response);

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
