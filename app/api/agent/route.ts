import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

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

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Messages required' }, { status: 400 });
    }

    // Convert OpenAI format to Yandex format
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
      return Response.json(
        { error: 'AI service error', details: error },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse = data.result?.alternatives?.[0]?.message?.text || '';

    return Response.json({ response: aiResponse });

  } catch (error) {
    console.error('Agent error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
