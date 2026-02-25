# Vercel Deployment Instructions

## Шаг 1: Настройка переменных окружения

В панели Vercel зайди в:
**Project Settings → Environment Variables**

Добавь две переменные:
- `TELEGRAM_BOT_TOKEN` = твой токен от @BotFather
- `TELEGRAM_CHAT_ID` = твой chat_id

## Шаг 2: Деплой

```bash
# Установи Vercel CLI если ещё не установлен
npm i -g vercel

# Зайди в папку проекта
cd chatbot24-landing

# Задеплой
vercel --prod
```

Или просто push на GitHub — Vercel автоматически задеплоит.

## Шаг 3: Проверка

1. Открой сайт
2. Заполни форму
3. Проверь что заявка пришла в Telegram

## Структура проекта

```
chatbot24-landing/
├── api/
│   └── send-form.js      # Серверная функция (токены в process.env)
├── js/
│   └── main.js           # Клиентский код (отправляет на /api/send-form)
├── index.html
└── ...
```

Теперь токен нигде не светится в коде — только в переменных окружения Vercel!
