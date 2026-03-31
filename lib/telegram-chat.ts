// Расширенная отправка в Telegram для чатов и брифов

interface TelegramConfig {
  botToken: string;
  chatId: string;
}

function getTelegramConfig(): TelegramConfig | null {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram config not found");
    return null;
  }

  return { botToken, chatId };
}

// Отправка сообщения чата в Telegram
export async function sendChatToTelegram(data: {
  sessionId: string;
  role: string;
  content: string;
}): Promise<boolean> {
  const config = getTelegramConfig();
  if (!config) return false;

  try {
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;
    
    // Обрезаем длинные сообщения
    const truncatedContent = data.content.length > 500 
      ? data.content.substring(0, 500) + "..." 
      : data.content;

    const message = `💬 <b>Новое сообщение в чате</b>

🆔 Сессия: <code>${data.sessionId.slice(-8)}</code>
👤 Роль: ${data.role === 'user' ? 'Клиент' : 'Бот'}

📝 Сообщение:
<blockquote>${truncatedContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</blockquote>`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    return true;
  } catch (error) {
    console.error("Telegram chat send error:", error);
    return false;
  }
}

// Отправка брифа в Telegram
export async function sendBriefToTelegram(data: {
  sessionId: string;
  businessType?: string;
  channels?: string[];
  dailyRequests?: string;
  botTasks?: string[];
  hasExamples?: string;
  budget?: string;
  score?: number;
  category?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}): Promise<boolean> {
  const config = getTelegramConfig();
  if (!config) return false;

  try {
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

    const emoji = data.category === 'HOT' ? '🔥' : data.category === 'WARM' ? '⚡' : '❄️';
    
    let message = `${emoji} <b>Новый бриф заполнен!</b>

`;

    // Контакты
    if (data.contactName || data.contactPhone) {
      message += `👤 <b>Контакты:</b>\n`;
      if (data.contactName) message += `   Имя: ${data.contactName}\n`;
      if (data.contactPhone) message += `   Телефон: ${data.contactPhone}\n`;
      if (data.contactEmail) message += `   Email: ${data.contactEmail}\n`;
      message += `\n`;
    }

    // Данные брифа
    message += `📋 <b>Данные брифа:</b>\n`;
    if (data.businessType) message += `   Сфера: ${data.businessType}\n`;
    if (data.channels?.length) message += `   Каналы: ${data.channels.join(", ")}\n`;
    if (data.dailyRequests) message += `   Заявок/день: ${data.dailyRequests}\n`;
    if (data.botTasks?.length) message += `   Задачи: ${data.botTasks.join(", ")}\n`;
    if (data.hasExamples) message += `   Примеры: ${data.hasExamples}\n`;
    if (data.budget) message += `   Бюджет: ${data.budget}\n`;
    
    message += `\n`;
    
    // Оценка
    message += `📊 <b>Оценка:</b> ${data.category} (${data.score || 0} баллов)\n`;
    message += `🆔 Сессия: <code>${data.sessionId.slice(-8)}</code>`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    return true;
  } catch (error) {
    console.error("Telegram brief send error:", error);
    return false;
  }
}

// Отправка заявки (гайд, консультация, обратный звонок)
export async function sendLeadToTelegram(data: {
  type: 'guide' | 'consultation' | 'callback';
  name?: string;
  email?: string;
  telegram?: string;
  phone?: string;
  message?: string;
}): Promise<boolean> {
  const config = getTelegramConfig();
  if (!config) return false;

  try {
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

    const typeLabels: Record<string, string> = {
      guide: '📚 Заявка на гайд',
      consultation: '💬 Консультация',
      callback: '📞 Обратный звонок',
    };

    let message = `<b>${typeLabels[data.type] || 'Новая заявка'}</b>\n\n`;

    if (data.name) message += `<b>Имя:</b> ${data.name}\n`;
    if (data.email) message += `<b>Email:</b> ${data.email}\n`;
    if (data.telegram) message += `<b>Telegram:</b> @${data.telegram.replace('@', '')}\n`;
    if (data.phone) message += `<b>Телефон:</b> ${data.phone}\n`;
    if (data.message) message += `<b>Сообщение:</b> ${data.message}\n`;

    message += `\n<i>${new Date().toLocaleString('ru-RU')}</i>`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    return true;
  } catch (error) {
    console.error("Telegram lead send error:", error);
    return false;
  }
}

// Отправка полной истории чата (для завершения сессии)
export async function sendChatSummaryToTelegram(data: {
  sessionId: string;
  messages: Array<{ role: string; content: string }>;
  hasContacts: boolean;
  contactName?: string;
  contactPhone?: string;
}): Promise<boolean> {
  const config = getTelegramConfig();
  if (!config) return false;

  try {
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

    const status = data.hasContacts ? '✅ С контактами' : '⚠️ Анонимный';
    
    let message = `📋 <b>Итог чата</b> ${status}

`;
    
    if (data.contactName) message += `👤 ${data.contactName}\n`;
    if (data.contactPhone) message += `📞 ${data.contactPhone}\n`;
    
    message += `\n💬 Переписка (${data.messages.length} сообщений):\n`;
    
    // Берём последние 10 сообщений
    const recentMessages = data.messages.slice(-10);
    recentMessages.forEach((msg, i) => {
      const prefix = msg.role === 'user' ? '👤' : '🤖';
      const truncated = msg.content.length > 100 
        ? msg.content.substring(0, 100) + "..." 
        : msg.content;
      message += `${prefix} ${truncated}\n`;
    });

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    return true;
  } catch (error) {
    console.error("Telegram summary send error:", error);
    return false;
  }
}
