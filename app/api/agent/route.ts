import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Разрешённые origin для CORS
const ALLOWED_ORIGINS = [
  'https://www.chatbot24.su',
  'https://chatbot24.su',
  'https://march-rho.vercel.app',
  'http://localhost:3000',
];

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Модели через OpenRouter
const PRIMARY_MODEL = 'deepseek/deepseek-chat-v3.2';      // Основная модель
const FALLBACK_MODEL = 'qwen/qwen3-235b-a22b-2507';       // Запасная модель

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

=== СТРУКТУРА ДИАЛОГА ===
1. ПРИВЕТСТВИЕ: "Привет! Я Алексей из ChatBot24. Расскажите, чем занимаетесь?"

2. УТОЧНЕНИЕ (1-2 вопроса): сколько заявок, какие каналы, что отнимает время

3. ПОКАЗ ПОЛЬЗЫ: "Понял! У нас был похожий проект для [сфера]. Они [результат]. Для вас можно [решение]."

4. ПРЕДЛОЖЕНИЕ БРИФА: 
   "Стоимость зависит от деталей. Можно заполнить короткий бриф (2 минуты) — подготовим точное предложение. Или обсудить по телефону?"
   [Кнопки в чате: Заполнить бриф / Перезвоните]

5. ЕСЛИ КЛИЕНТ НЕ ХОЧЕТ БРИФ: собирай телефон для звонка менеджера

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
✅ "У нас был похожий проект — результат +35%"
✅ "Заполните бриф — подготовим предложение"

=== ФИНАЛ ===
Цель: за 3-5 сообщений понять задачу, показать пользу, направить на бриф или получить телефон.`;

// CORS headers helper
function setCorsHeaders(response: Response, origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Max-Age', '86400');
  
  return response;
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return setCorsHeaders(new Response(null, { status: 204 }), origin);
}

async function callOpenRouter(
  messages: any[], 
  apiKey: string, 
  model: string,
  isFallback: boolean = false
): Promise<{ content: string; model: string; provider: string }> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://chatbot24.su',
      'X-Title': 'ChatBot24 AI Assistant',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m: any) => ({
          role: m.role === 'system' ? 'system' : m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`OpenRouter API error (${model}):`, error);
    throw new Error(`OpenRouter API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  const usedModel = data.model || model;
  
  return {
    content,
    model: usedModel,
    provider: isFallback ? 'openrouter-fallback' : 'openrouter',
  };
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return setCorsHeaders(
        Response.json({ error: 'Messages required' }, { status: 400 }),
        origin
      );
    }

    // Проверяем наличие API ключа OpenRouter
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    
    if (!openRouterKey) {
      console.error('OPENROUTER_API_KEY not configured');
      return setCorsHeaders(
        Response.json({ error: 'AI service not configured' }, { status: 503 }),
        origin
      );
    }

    let result;
    let usedProvider = 'openrouter';
    let usedModel = PRIMARY_MODEL;

    try {
      // Пробуем основную модель (DeepSeek)
      result = await callOpenRouter(messages, openRouterKey, PRIMARY_MODEL, false);
      usedModel = result.model;
    } catch (primaryError) {
      console.warn('Primary model failed, trying fallback:', primaryError);
      
      try {
        // Fallback на Qwen
        result = await callOpenRouter(messages, openRouterKey, FALLBACK_MODEL, true);
        usedProvider = 'openrouter-fallback';
        usedModel = result.model;
      } catch (fallbackError) {
        console.error('Fallback model also failed:', fallbackError);
        return setCorsHeaders(
          Response.json({ error: 'AI service unavailable' }, { status: 503 }),
          origin
        );
      }
    }

    return setCorsHeaders(
      Response.json({ 
        response: result.content,
        provider: usedProvider,
        model: usedModel,
        timestamp: new Date().toISOString(),
      }),
      origin
    );

  } catch (error) {
    console.error('Agent error:', error);
    return setCorsHeaders(
      Response.json(
        { error: 'Internal server error', details: String(error) },
        { status: 500 }
      ),
      origin
    );
  }
}