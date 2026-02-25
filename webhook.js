/**
 * ChatBot24 Studio — Telegram Webhook Handler
 * Vercel Serverless Function
 * 
 * Handles incoming updates from Telegram Bot API
 * when using webhook mode instead of polling
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

module.exports = async function handler(req, res) {
    // Only accept POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const update = req.body;
        
        // Log the update for debugging
        console.log('Webhook received:', JSON.stringify(update, null, 2));

        // Here you would process the update
        // For aiogram-based bot, you typically run the bot in polling mode
        // Webhook mode would require a different architecture
        
        // Acknowledge receipt
        return res.status(200).json({ ok: true });

    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
