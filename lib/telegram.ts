import { LeadFormData } from "./validations";

// Расширенный тип с UTM и дополнительными полями
interface ExtendedLeadData extends LeadFormData {
  ip?: string;
}

interface TelegramConfig {
  botToken: string;
  chatId: string;
}

interface TelegramResult {
  success: boolean;
  error?: string;
}

// Получение конфигурации из переменных окружения
function getTelegramConfig(): TelegramConfig | null {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram config not found in environment variables");
    return null;
  }

  return { botToken, chatId };
}

// Форматирование типа CRM для читаемого вида
function formatCRMType(crmType: string | undefined): string {
  const crmMap: Record<string, string> = {
    bitrix24: "Битрикс24",
    amocrm: "amoCRM",
    other: "Другая CRM",
    none: "Нет CRM",
  };
  return crmType ? crmMap[crmType] || crmType : "Не указано";
}

// Форматирование сообщения
function formatMessage(data: ExtendedLeadData): string {
  const timestamp = new Date().toLocaleString("ru-RU");

  let message = `🔔 <b>Новая заявка с сайта</b>\n\n`;
  message += `📅 <i>${timestamp}</i>\n\n`;

  // Основные данные
  message += `👤 <b>Имя:</b> ${data.name}\n`;
  message += `🏢 <b>Компания:</b> ${data.company}\n`;
  message += `📞 <b>Телефон:</b> ${data.phone}\n`;

  // Email (опционально)
  if (data.email) {
    message += `📧 <b>Email:</b> ${data.email}\n`;
  }

  // Количество заявок в день (опционально)
  if (data.dailyLeads) {
    message += `📊 <b>Заявок в день:</b> ${data.dailyLeads}\n`;
  }

  // Тип CRM (опционально)
  if (data.crmType) {
    message += `🗄 <b>CRM:</b> ${formatCRMType(data.crmType)}\n`;
  }

  // IP адрес (если есть)
  if (data.ip) {
    message += `\n🌐 <b>IP:</b> <code>${data.ip}</code>\n`;
  }

  // UTM-метки (если есть хотя бы одна)
  const hasUTM = data.utmSource || data.utmMedium || data.utmCampaign || data.utmContent || data.utmTerm;
  
  if (hasUTM) {
    message += `\n📈 <b>UTM-метки:</b>\n`;
    
    if (data.utmSource) {
      message += `  • Source: ${data.utmSource}\n`;
    }
    if (data.utmMedium) {
      message += `  • Medium: ${data.utmMedium}\n`;
    }
    if (data.utmCampaign) {
      message += `  • Campaign: ${data.utmCampaign}\n`;
    }
    if (data.utmContent) {
      message += `  • Content: ${data.utmContent}\n`;
    }
    if (data.utmTerm) {
      message += `  • Term: ${data.utmTerm}\n`;
    }
  }

  return message;
}

// Отправка сообщения в Telegram
export async function sendToTelegram(data: ExtendedLeadData): Promise<TelegramResult> {
  const config = getTelegramConfig();

  // Если конфигурации нет, логируем и возвращаем success (для dev окружения)
  if (!config) {
    console.log("Telegram message (mock):", formatMessage(data));
    return { success: true };
  }

  try {
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: formatMessage(data),
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || "Telegram API error");
    }

    return { success: true };
  } catch (error) {
    console.error("Telegram send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
