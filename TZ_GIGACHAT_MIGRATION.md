# Техническое задание: Исправление ошибок проекта MARCH (ChatBot24)

## 1. Общая информация

**Проект:** march (fintech-emerald) — основной сайт ChatBot24  
**Репозиторий:** https://github.com/timoshinoleg-eng/march  
**Vercel:** https://vercel.com/olegs-projects-bfc4e11a/march  
**Сайт:** https://chatbot24.su  
**Цель:** Исправить ошибку `FileReader is not defined` и перевести AI с OpenRouter на GigaChat  
**Исполнитель:** Kimi Code (kimi-coding/k2p5)

---

## 2. Текущие проблемы

### 2.1 Критическая ошибка
```
ReferenceError: FileReader is not defined
    at <unknown> (.next/server/chunks/[root-of-the-server]__08f4214d._.js:1:5497)
```

**Локация:** `app/api/agent/route.ts`  
**Причина:** Вероятно, `@ai-sdk/openai` v3.0.37 или `ai` v6.0.105 тянут браузерный `FileReader` в Edge Runtime.

### 2.2 Текущая реализация
- Используется прямой fetch к OpenRouter API
- Edge Runtime (`export const runtime = 'edge'`)
- Модель: `anthropic/claude-3.5-sonnet`
- Streaming ответы через ReadableStream

### 2.3 Целевая реализация
- Заменить OpenRouter на GigaChat API
- Убрать `@ai-sdk/openai` (возможно, причина ошибки)
- Сохранить Edge Runtime
- Сохранить streaming

---

## 3. Структура проекта

```
/root/.openclaw/workspace/march/
├── app/
│   ├── api/
│   │   └── agent/
│   │       └── route.ts          # ← ИСПРАВИТЬ (текущий файл)
│   ├── page.tsx                  # Главная страница
│   └── layout.tsx
├── components/                   # React компоненты
├── data/
├── lib/
├── public/
├── next.config.js
└── package.json
```

---

## 4. Требования к реализации

### 4.1 Файл: `app/api/agent/route.ts`

**Сохранить:**
- Edge Runtime (`export const runtime = 'edge'`)
- SYSTEM_PROMPT (полностью)
- Логику streaming (ReadableStream)
- Обработку ошибок
- Формат ответа (text/plain stream)

**Заменить:**
- URL OpenRouter → GigaChat (`https://gigachat.devices.sberbank.ru/api/v1/chat/completions`)
- Авторизацию (Bearer token → OAuth 2.0)
- Модель (`anthropic/claude-3.5-sonnet` → `GigaChat-Pro`)

**Добавить:**
- Получение OAuth токена GigaChat
- Кэширование токена (30 минут)
- Обновление токена при 401

### 4.2 GigaChat OAuth

```
POST https://ngw.devices.sberbank.ru:9443/api/v2/oauth
Headers:
  Content-Type: application/x-www-form-urlencoded
  RqUID: <uuid4>
  Authorization: Basic <GIGACHAT_API_KEY>
Body: scope=GIGACHAT_API_PERS

Response:
{
  "access_token": "eyJhbG...",
  "expires_at": 1679471442000
}
```

### 4.3 Chat Completions

```
POST https://gigachat.devices.sberbank.ru/api/v1/chat/completions
Headers:
  Authorization: Bearer <token>
Body:
{
  "model": "GigaChat-Pro",
  "messages": [
    { "role": "system", "content": SYSTEM_PROMPT },
    ...messages
  ],
  "temperature": 0.7,
  "max_tokens": 1000,
  "stream": true
}
```

### 4.4 Переменные окружения

```bash
# Добавить в .env.local
GIGACHAT_API_KEY=<base64(ClientID:ClientSecret)>
GIGACHAT_SCOPE=GIGACHAT_API_PERS  # или GIGACHAT_API_B2B / GIGACHAT_API_CORP

# Удалить (больше не нужны)
# OPENROUTER_API_KEY
```

---

## 5. Код: app/api/agent/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const SYSTEM_PROMPT = `Ты — AI-ассистент "Алексей" от компании ChatBot24...`; // ← оставить как есть

// Конфигурация GigaChat
const GIGACHAT_AUTH_URL = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
const GIGACHAT_API_URL = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';

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
      return NextResponse.json(
        { error: 'AI service error' },
        { status: 500 }
      );
    }

    // Streaming (как было)
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 6. package.json

**Удалить зависимости:**
```json
// Убрать:
"@ai-sdk/openai": "^3.0.37",
```

**Оставить:**
```json
{
  "dependencies": {
    "ai": "^6.0.105",
    // ... остальное без изменений
  }
}
```

---

## 7. Тестирование

### 7.1 Локально
```bash
cd /root/.openclaw/workspace/march

# Установить зависимости
npm install

# Запустить
npm run dev

# Тест API
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Привет!"}]}'
```

### 7.2 Сборка
```bash
npm run build
# Должно собраться без ошибок FileReader
```

### 7.3 Деплой
```bash
# Push в GitHub → автодеплой на Vercel
```

---

## 8. Критерии приёмки

- [ ] Ошибка `FileReader is not defined` устранена
- [ ] `npm run build` выполняется без ошибок
- [ ] API `/api/agent` работает с GigaChat
- [ ] Streaming ответы работают
- [ ] Сохранён SYSTEM_PROMPT
- [ ] Сохранён Edge Runtime
- [ ] Токен кэшируется (не запрашивается на каждый запрос)
- [ ] Обработка 401 (refresh token) работает

---

## 9. Важно

- **Не менять:** компоненты, страницы, стили
- **Не трогать:** `@ai-sdk/openai` в других файлах (если есть)
- **Проверить:** что нет других файлов с `openrouter` в импортах
