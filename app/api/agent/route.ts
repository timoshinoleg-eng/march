import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Разрешённые origin для CORS
const ALLOWED_ORIGINS = [
  'https://www.chatbot24.su',
  'https://chatbot24.su',
  'https://march-rho.vercel.app',
  'http://localhost:3000',
];

const YANDEX_API_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';
const FOLDER_ID = 'b1ggect9adumeeb8ahik';

const SYSTEM_PROMPT = `Ты — AI-ассистент "Алексей" от компании ChatBot24. Ты квалифицируешь лидов для автоматизации обработки заявок.

ТВОИ ЗАДАЧИ:
1. Приветствуй дружелюбно, представься как Алексей
2. Узнай: сферу бизнеса, основную задачу, примерный бюджет, сроки
3. Предложи решение из наших пакетов: MVP (49 000₽), Sales (129 000₽), AI (240 000₽)
4. Собери контактные данные (имя, телефон)
5. Передай заявку в Битрик24

ПРАВИЛА ОБЩЕНИЯ:
- Отвечай кратко (2-3 предложения)
- Тон: профессиональный, но дружелюбный
- Не используй сложные технические термины
- Когда собираешь контакты, обязательно упомяни "менеджер свяжется"

ПАКЕТЫ УСЛУГ:
- MVP (49 000₽): до 10 сценариев, интеграция CRM, запуск за 2-3 дня
- Sales (129 000₽): до 30 сценариев, воронки продаж, аналитика
- AI (240 000₽): нейросети, RAG, сложные интеграции, безлимит сценариев`;

// Кэш токена (глобальный для edge runtime)
declare global {
  var gigachatToken: { token: string; expiresAt: number } | undefined;
}

async function getYandexToken(): Promise<string> {
  if (global.gigachatToken && global.gigachatToken.expiresAt > Date.now()) {
    return global.gigachatToken.token;
  }

  const response = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'RqUID': crypto.randomUUID(),
      'Authorization': `Basic ${process.env.GIGACHAT_API_KEY}`,
    },
    body: new URLSearchParams({
      scope: process.env.GIGACHAT_SCOPE || 'GIGACHAT_API_PERS',
    }),
  });

  if (!response.ok) {
    throw new Error(`Auth failed: ${await response.text()}`);
  }

  const data = await response.json();
  global.gigachatToken = {
    token: data.access_token,
    expiresAt: data.expires_at - 5 * 60 * 1000,
  };

  return data.access_token;
}

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

    // Проверяем наличие API ключа
    if (!process.env.YANDEX_API_KEY) {
      console.error('YANDEX_API_KEY not configured');
      return setCorsHeaders(
        Response.json({ error: 'AI service not configured' }, { status: 503 }),
        origin
      );
    }

    // Конвертируем сообщения в формат Yandex
    const yandexMessages = messages.map((m: any) => ({
      role: m.role === 'system' ? 'system' : m.role === 'assistant' ? 'assistant' : 'user',
      text: m.content,
    }));

    const response = await fetch(YANDEX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
        'x-folder-id': FOLDER_ID,
      },
      body: JSON.stringify({
        modelUri: `gpt://${FOLDER_ID}/yandexgpt/latest`,
        completionOptions: {
          stream: false,
          temperature: 0.7,
          maxTokens: 1000,
        },
        messages: [
          { role: 'system', text: SYSTEM_PROMPT },
          ...yandexMessages,
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Yandex API error:', error);
      return setCorsHeaders(
        Response.json({ error: 'AI service error', details: error }, { status: 500 }),
        origin
      );
    }

    const data = await response.json();
    const aiResponse = data.result?.alternatives?.[0]?.message?.text || '';

    return setCorsHeaders(
      Response.json({ 
        response: aiResponse,
        provider: 'yandex',
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
