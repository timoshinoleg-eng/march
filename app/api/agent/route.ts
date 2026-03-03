import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

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

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Messages required' }, { status: 400 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://www.chatbot24.su',
        'X-Title': 'ChatBot24 AI Widget',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenRouter error:', error);
      return Response.json(
        { error: 'AI service error' },
        { status: 500 }
      );
    }

    // Stream the response
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
