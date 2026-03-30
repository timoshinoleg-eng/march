# Environment Variables Setup

## Для Vercel (Production)

Добавь переменную окружения в Vercel Dashboard:

1. Иди на https://vercel.com/dashboard
2. Выбери проект `march`
3. Settings → Environment Variables
4. Добавь:
   - Name: `OPENROUTER_API_KEY`
   - Value: `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`
   - Environment: Production (и Preview, если нужно)

5. Save → Redeploy

## Для локальной разработки

Файл `.env.local` уже создан с ключом.

## Проверка

После деплоя проверь, что AI отвечает в чате на сайте.

## Fallback

Если OpenRouter недоступен, чат покажет fallback сообщение:
"Извините, возникла техническая проблема..."
