# ChatBot24 Studio — Telegram Bot + Landing

Полноценное решение для квалификации лидов: Telegram-бот с интерактивным Hero-виджетом на сайте.

## 📁 Структура проекта

```
chatbot24-landing/
├── index.html              # Главная страница с Hero-виджетом
├── styles.css              # Основные стили
├── script.js               # JavaScript лендинга
├── css/
│   └── hero-widget.css     # Стили Hero-виджета
├── js/
│   └── hero-widget.js      # Hero-виджет (A/B тесты)
├── api/
│   ├── submit.js           # Обработка форм (Vercel)
│   ├── track.js            # Аналитика (Vercel)
│   └── webhook.js          # Telegram webhook (Vercel)
├── bot/
│   ├── main.py             # Telegram бот (aiogram 3.x)
│   ├── requirements.txt    # Зависимости Python
│   └── .env.example        # Пример переменных окружения
└── README.md               # Документация
```

## 🚀 Быстрый старт

### 1. Настройка Telegram Бота

```bash
cd bot

# Создать виртуальное окружение
python -m venv venv

# Активировать
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Установить зависимости
pip install -r requirements.txt

# Настроить переменные окружения
cp .env.example .env
# Отредактировать .env файл

# Запустить бота
python main.py
```

### 2. Переменные окружения (.env)

```bash
# Telegram Bot (обязательно)
TELEGRAM_BOT_TOKEN=7703636299:AAEK6SlB3CtP2Qvw1iPq0U3YrNXdzU4F9vI
TELEGRAM_ADMIN_ID=-3771638944

# Supabase (только анонимная статистика)
SUPABASE_URL=https://gihizzpuzcuctitvwavz.supabase.co
SUPABASE_KEY=sb_publishable_N4YOSxjrIZZguH3jHDxWtQ_3KklLju1

# Analytics (опционально)
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
YM_COUNTER_ID=XXXXXXXX
```

### 3. Деплой на Vercel

```bash
# Установить Vercel CLI
npm i -g vercel

# Логин
vercel login

# Деплой
vercel --token $VERCEL_TOKEN

# Или через git
git add -A
git commit -m "Initial commit"
git push origin main
```

## 🤖 Функционал Telegram Бота

### Главное меню
- 📊 **Рассчитать проект** — 4-шаговая квалификация лида
- 🎮 **Демо-режим** — интерактивное демо (3 ниши)
- 💼 **Кейсы и цифры** — портфолио
- ❓ **Вопрос менеджеру** — поддержка

### Скоринг лидов
| Критерий | Баллы |
|----------|-------|
| Срок «До 30 дней» | +40 |
| Срок «1–3 месяца» | +20 |
| Масштаб «500+» | +20 |
| Масштаб «100–500» | +10 |
| Контакт получен | +20 |

**Категории:**
- 🔥 **Lead_Hot** (80-100 баллов) — мгновенное уведомление
- ⚡ **Lead_Warm** (50-79 баллов) — в воронку nurturing
- ❄️ **Lead_Cold** (0-49 баллов) — отложенный прогрев

### Демо-режим
Три интерактивных сценария:
1. **Недвижимость** — подбор квартиры
2. **Онлайн-школа** — выбор курса
3. **Услуги/Клиника** — запись на приём

## 🌐 Hero-виджет на сайте

### A/B тестирование
Автоматическое распределение пользователей на варианты:

- **Вариант A**: "Какая задача сейчас приоритетна?"
- **Вариант B**: "Сколько заявок обрабатываете вручную?"
- **Вариант C**: "Хотите рассчитать экономию от бота?"

### Триггеры
- ⏱️ **15 секунд бездействия** — всплывающее приглашение
- 📝 **Переход в Telegram** — с UTM-метками и контекстом
- 📊 **Аналитика** — события в GA4 и Yandex Metrica

## 📊 Аналитика

### Отслеживаемые события
```javascript
// Hero-виджет
gtag('event', 'hero_interaction_start', { variant: 'A' });
gtag('event', 'hero_to_telegram_click', { utm_source: 'hero_site' });
gtag('event', 'hero_widget_step1_complete', { selection: 'sales' });

// Telegram Bot (через Supabase)
// - bot_start
// - calc_started
// - contact_received
// - demo_completed
// - brief_sent
```

### Метрики
| Метрика | Целевое значение |
|---------|-----------------|
| Конверсия в контакт | >40% |
| Конверсия в бриф | >60% |
| Конверсия демо | >70% |
| Hero CTR | >25% |
| Hot Lead % | >20% |

## 🔒 Безопасность

### ⚠️ ВАЖНО: НЕ хранить ПДн в Supabase!
- ✅ **Supabase**: только анонимная статистика (тип задачи, масштаб, скоринг)
- ✅ **Telegram**: персональные данные только в уведомлениях группе -3771638944
- ✅ **CRM**: полные данные лида

### Спам-фильтр
- >2 ссылок в сообщении → автоответ
- Стоп-слова → молчаливая блокировка
- 2 непонятых сообщения → эскалация менеджеру

## 📝 Полезные команды

```bash
# Просмотр логов бота
pm2 logs chatbot24

# Перезапуск бота
pm2 restart chatbot24

# Обновление на Vercel
vercel --prod
```

## 🔗 Ссылки

- **Сайт**: https://www.chatbot24.su
- **Бот**: https://t.me/ChatBot24su_bot
- **Бриф**: https://www.chatbot24.su/brief
- **Кейсы**: https://www.chatbot24.su/cases

## 📞 Поддержка

Группа менеджеров: `-3771638944`
