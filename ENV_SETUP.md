# Environment Variables Setup

## Для Vercel (Production)

Добавь переменную окружения в Vercel Dashboard:

1. Иди на https://vercel.com/dashboard
2. Выбери проект `march`
3. Settings → Environment Variables
4. Добавь:
   - Name: `OPENROUTER_API_KEY`
   - Value: `REDACTED_OPENROUTER_KEY`
   - Environment: Production (и Preview, если нужно)

5. Save → Redeploy

## Для локальной разработки

Файл `.env.local` уже создан с ключом.

## Проверка

После деплоя проверь, что AI отвечает в чате на сайте.

## Fallback

Если OpenRouter недоступен, чат покажет fallback сообщение:
"Извините, возникла техническая проблема..."
