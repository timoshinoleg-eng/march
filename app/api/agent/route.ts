import { NextRequest, NextResponse } from 'next/server';
import { generateOpenRouterResponse } from '@/lib/openrouter';

export const runtime = 'edge';

// Разрешённые origin для CORS
const ALLOWED_ORIGINS = [
  'https://www.chatbot24.su',
  'https://chatbot24.su',
  'http://localhost:3000',
];

// DeepSeek через OpenRouter - системный промпт
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
