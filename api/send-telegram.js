// Vercel Serverless Function - Send Telegram notification
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || '-3771638944';

  if (!botToken) {
    return res.status(500).json({ error: 'Bot token not configured' });
  }

  const text = `
<b>📝 Новый бриф с сайта</b>

<b>Имя:</b> ${name}
<b>Телефон:</b> ${phone}
${email ? `<b>Email:</b> ${email}\n` : ''}
${message ? `<b>Сообщение:</b> ${message}\n` : ''}

<i>Отправлено с chatbot24.su</i>
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ error: 'Failed to send message', details: data });
    }

    return res.status(200).json({ success: true, message: 'Sent to Telegram' });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}