/**
 * ChatBot24 Studio — API Handler for Form Submissions
 * Vercel Serverless Function
 * 
 * Environment variables required:
 * - TELEGRAM_BOT_TOKEN: Bot token from @BotFather
 * - TELEGRAM_CHAT_ID: Chat ID where notifications will be sent
 */

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only accept POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed. Use POST.'
        });
    }

    try {
        // Parse JSON body
        let body;
        if (typeof req.body === 'string') {
            body = JSON.parse(req.body);
        } else {
            body = req.body;
        }

        const { telegram, message, name, source = 'website', utm = {} } = body;

        // Validation
        const errors = {};

        // Telegram validation
        if (!telegram || typeof telegram !== 'string') {
            errors.telegram = 'Telegram обязателен';
        } else {
            const trimmedTelegram = telegram.trim();
            if (!trimmedTelegram) {
                errors.telegram = 'Telegram обязателен';
            } else {
                const username = trimmedTelegram.replace(/^@/, '');
                if (username.length < 5) {
                    errors.telegram = 'Минимум 5 символов';
                } else if (username.length > 32) {
                    errors.telegram = 'Максимум 32 символа';
                } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
                    errors.telegram = 'Только буквы, цифры и подчёркивания';
                }
            }
        }

        // Message validation
        if (!message || typeof message !== 'string') {
            errors.message = 'Сообщение обязательно';
        } else {
            const trimmedMessage = message.trim();
            if (!trimmedMessage) {
                errors.message = 'Сообщение обязательно';
            } else if (trimmedMessage.length < 10) {
                errors.message = 'Минимум 10 символов';
            }
        }

        // Return validation errors
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        // Get environment variables
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.error('Missing environment variables: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        // Normalize telegram
        const normalizedTelegram = telegram.trim().startsWith('@') 
            ? telegram.trim() 
            : '@' + telegram.trim();

        // Build message text
        const date = new Date().toLocaleString('ru-RU', {
            timeZone: 'Europe/Moscow',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        // UTM params string
        const utmString = Object.keys(utm).length > 0 
            ? Object.entries(utm).map(([k, v]) => `${k}=${v}`).join(', ')
            : '—';

        const text = `🔔 <b>Новая заявка с chatbot24.su</b> (fallback форма)

👤 <b>Telegram:</b> ${normalizedTelegram}
📝 <b>Имя:</b> ${name ? name.trim() : '—'}
💬 <b>Сообщение:</b>
${message.trim()}

📊 <b>Источник:</b> ${source}
🏷 <b>UTM:</b> ${utmString}
📅 <b>Дата:</b> ${date}`;

        // Send to Telegram
        const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            })
        });

        const telegramData = await telegramResponse.json();

        if (!telegramResponse.ok || !telegramData.ok) {
            console.error('Telegram API error:', telegramData);
            return res.status(500).json({
                success: false,
                message: 'Failed to send notification'
            });
        }

        // Track event to analytics (optional)
        try {
            // Here you can add GA4 or Yandex Metrica tracking
            // trackEvent('form_submit', { source, utm_source: utm.source });
        } catch (e) {
            console.error('Analytics error:', e);
        }

        // Success response
        return res.status(200).json({
            success: true,
            message: 'Заявка отправлена'
        });

    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
