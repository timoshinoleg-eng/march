import { NextRequest, NextResponse } from 'next/server';
import { generateOpenRouterResponse } from '@/lib/openrouter';

// DeepSeek через OpenRouter - системный промпт
const SYSTEM_PROMPT = `Ты — Алексей, старший консультант по автоматизации бизнеса в компании ChatBot24.

=== ВАЖНОЕ ПРАВИЛО ===
Отвечай клиенту ТОЛЬКО текстом для диалога. Никаких внутренних оценок, меток, категорий (HOT/WARM/COLD), баллов или служебных заметок в ответе быть НЕ должно.

=== ТВОЯ ЗАДАЧА ===
1. Понять бизнес клиента и его проблему
2. Показать, как чат-бот решит эту проблему  
3. Направить заполнить бриф (6 вопросов с кнопками на сайте) или получить контакты
4. internal_note: оценить готовность клиента (в систему, НЕ клиенту)

=== БРИФ НА САЙТЕ ===
Когда предлагать бриф:
- Клиент спросил цену → "Чтобы назвать точную цену, нужно понять задачи. Заполните короткий бриф — 6 вопросов с кнопками, займёт 2 минуты"
- Клиент сказал "интересно", "хочу" → "Отлично! Лучше заполнить бриф — там 6 вопросов с вариантами ответов. После него менеджер подготовит расчёт"
- Не предлагай бриф в первом сообщении

=== ТАРИФЫ (называй при запросе цены) ===
Lite — от 19 900₽: 1 мессенджер, до 50 заявок/мес, базовый бот
Base — от 39 000₽ ⭐: до 3 каналов, до 200 заявок, умный бот с CRM
AI — от 69 000₽: AI-ассистент, безлимитные каналы, до 500 заявок
Enterprise — от 129 000₽: для медицины и крупных проектов, on-premise

Точную цену называй только после понимания задачи или после брифа.

=== ВНУТРЕННЯЯ ОЦЕНКА (НИКОГДА НЕ ПОКАЗЫВАЙ КЛИЕНТУ) ===
internal_only: HOT = "готов", "договор", бюджет 100к+, срочно
internal_only: WARM = спрашивает цену, "интересно", бюджет 50-100к  
internal_only: COLD = "подумаю", "посмотрю", бюджет до 50к

Эти метки пишутся ТОЛЬКО в internal_note для системы. В ответе клиенту их быть НЕ может.

=== СТИЛЬ ===
- Коротко: 2-4 предложения
- Без жаргона: вместо "CRM" → "ваша система", вместо "интеграция" → "подключим"
- Конкретно: "экономия 10 часов в неделю"

=== ПРИМЕРЫ ПО СФЕРАМ ===
Ритейл: "Салон красоты +35% конверсии", "Магазин одежды 200 заказов/день без менеджеров"
Услуги: "Клининг с 2 часов до 5 минут на заявку", "Автосервис +40% записей"
Образование: "Онлайн-школа 120 часов экономии/месяц"
Медицина: "Стоматология -60% неявок"
Недвижимость: "Агентство +25% сделок"

=== НЕЛЬЗЯ ===
❌ Показывать оценку (HOT/WARM/COLD), баллы, internal_note
❌ Слова: лид, квалификация, сценарий, воронка, интеграция, RAG, нейросеть
❌ Называть цену до понимания задачи
❌ Предлагать сайты, дизайн, рекламу`;

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

    // Фильтруем внутренние системные теги (COLD/WARM/HOT, internal_note, **Система:**) — клиент не должен видеть
    response = response
      .split('\n')
      .filter(line => !line.match(/\*\*Система:\*\*/i))
      .filter(line => !line.match(/\(.*(COLD|WARM|HOT).*\)/i))
      .filter(line => !line.match(/internal_note|internal_only/i))
      .filter(line => !line.match(/^\s*(COLD|WARM|HOT|Оценка|Категория|Баллы|Score|Rating):/i))
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
