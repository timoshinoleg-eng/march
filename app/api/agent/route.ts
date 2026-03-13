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