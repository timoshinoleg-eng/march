import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const GIGACHAT_AUTH_URL = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
const GIGACHAT_API_URL = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';

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

async function getGigaChatToken(): Promise<string> {
  // Проверяем кэш
  if (global.gigachatToken && global.gigachatToken.expiresAt > Date.now()) {
    return global.gigachatToken.token;
  }

  // Получаем новый токен
  const response = await fetch(GIGACHAT_AUTH_URL, {
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
    throw new Error(`GigaChat auth failed: ${await response.text()}`);
  }

  const data = await response.json();
  
  // Кэшируем с запасом 5 минут
  global.gigachatToken = {
    token: data.access_token,
    expiresAt: data.expires_at - 5 * 60 * 1000,
  };

  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Messages required' }, { status: 400 });
    }

    // Получаем токен
    const token = await getGigaChatToken();

    // Запрос к GigaChat
    const response = await fetch(GIGACHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: 'GigaChat-Pro',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: any) => ({
            role: m.role === 'system' ? 'system' : m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          }))
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      }),
    });

    if (!response.ok) {
      // Если 401 — пробуем обновить токен и повторить
      if (response.status === 401) {
        global.gigachatToken = undefined;
        return POST(req); // Один retry
      }
      
      const error = await response.text();
      console.error('GigaChat error:', error);
      return Response.json(
        { error: 'AI service error' },
        { status: 500 }
      );
    }

    // Streaming
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  controller.close();
                  return;
                }
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                } catch {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Agent error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
