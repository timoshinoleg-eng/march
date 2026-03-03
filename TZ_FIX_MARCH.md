# ТЗ: Исправление MARCH (chatbot24.su) + Синхронизация с Widget

## 1. Общая информация

**Проекты:**
- `march` → https://march-rho.vercel.app (preview) → https://chatbot24.su (prod)
- `chatbot24-widget` → https://chatbot24-widget.vercel.app (работает отдельно)

**Цель:** 
1. Исправить API в `march` (FileReader ошибка)
2. Синхронизировать `chatbot24.su` с актуальным кодом
3. Убедиться что чат и калькулятор работают

---

## 2. Текущие проблемы

### 2.1 MARCH Preview (march-rho.vercel.app)
- ❌ AI чат падает с "Ошибка соединения" (FileReader is not defined)
- ✅ Калькулятор есть
- ⚠️ Hero секция пустая

### 2.2 MARCH Prod (chatbot24.su)  
- ❌ Нет AI чата вообще
- ❌ Нет калькулятора
- ❌ Hero секция пустая

### 2.3 Widget App (chatbot24-widget.vercel.app)
- ✅ Работает отдельно, НЕ ТРОГАТЬ

---

## 3. Приоритеты

### P0 — Критично (сделать первым)
1. Исправить `app/api/agent/route.ts` — миграция OpenRouter → GigaChat
2. Убрать `@ai-sdk/openai` из зависимостей
3. Проверить что `chatbot24.su` деплоится из `march` репозитория

### P1 — Важно
4. Проверить наличие калькулятора в `march`
5. Проверить Hero секцию

### P2 — Опционально
6. Проверить что Widget App не сломается при изменениях

---

## 4. Детальные задачи

### Задача 1: Исправить API (app/api/agent/route.ts)

**Текущий код использует:**
- OpenRouter API
- Edge runtime
- Прямой fetch

**Нужно:**
- Заменить на GigaChat API
- Сохранить edge runtime
- Сохранить streaming
- Добавить OAuth для GigaChat

### Задача 2: Обновить package.json

**Удалить:**
```json
"@ai-sdk/openai": "^3.0.37"
```

### Задача 3: Переменные окружения

**Добавить в Vercel:**
```
GIGACHAT_API_KEY=<base64_encoded>
GIGACHAT_SCOPE=GIGACHAT_API_PERS
```

**Удалить:**
```
OPENROUTER_API_KEY
```

### Задача 4: Проверить деплой

Убедиться что `chatbot24.su` → GitHub `march` репозиторий.
Если нет — настроить.

---

## 5. Проверка после фикса

### 5.1 Локально
```bash
cd /root/.openclaw/workspace/march
npm install
npm run build  # Должно собраться без ошибок
npm run dev
```

### 5.2 Тест API
```bash
curl -X POST http://localhost:3000/api/agent \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Привет"}]}'
```

### 5.3 Продакшен
- [ ] https://chatbot24.su — чат работает
- [ ] https://chatbot24.su — калькулятор есть
- [ ] https://march-rho.vercel.app — тоже работает
- [ ] https://chatbot24-widget.vercel.app — не сломан

---

## 6. Важно

- **Widget App (`chatbot24-widget`) — НЕ ТРОГАТЬ**, он работает отдельно
- **Сохранить** все компоненты чата (ChatWidget.tsx, ChatWidgetProvider.tsx)
- **Сохранить** системный промпт Алексея
- **Проверить** что калькулятор (ROICalculator) есть в page.tsx
