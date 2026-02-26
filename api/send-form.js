// Vercel Serverless Function для отправки заявок в Telegram
// Файл: api/send-form.js

export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Получаем данные из тела запроса
  const { name, phone, telegram, businessType, timestamp, url, utm_source, utm_medium, utm_campaign } = req.body;

  // Проверяем обязательные поля
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  // Получаем токен и chat_id из переменных окружения Vercel
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram credentials not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Формируем сообщение
  const message = `📬 Новая заявка с сайта ChatBot24!

👤 Имя: ${name}
📞 Телефон: ${phone}
✈️ Telegram: ${telegram || '—'}
🏢 Тип бизнеса: ${businessType || '—'}
⏰ Время: ${timestamp || new Date().toLocaleString('ru-RU')}
🔗 Страница: ${url || '—'}
📊 UTM: ${utm_source || '—'} ${utm_medium || ''} ${utm_campaign || ''}`;

  try {
    // Отправляем в Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      return res.status(500).json({ error: 'Failed to send message' });
    }

    // Успешно отправлено
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
