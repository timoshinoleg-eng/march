import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToTelegram } from '@/lib/telegram-chat';
import {
  checkRateLimit,
  getClientIp,
  hasHoneypot,
  fakeOkResponse,
  RATE_LIMITS,
} from '@/lib/rate-limit';

interface ChatMessage {
  role: string;
  content: string;
}

interface LeadPayload {
  name?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  budget?: string;
  timeline?: string;
  score?: number;
  category?: string;
  sessionId?: string;
  source?: string;
  messages?: ChatMessage[];
  businessType?: string;
  channels?: string[];
  dailyRequests?: string;
  botTasks?: string[];
  hasExamples?: string;
  product?: string;
  restaurantName?: string;
  restaurantFormat?: string;
  orderMode?: string;
  menuStatus?: string;
  city?: string;
  // P0.9: согласие на обработку ПДн.
  consent?: boolean;
  consentVersion?: string;
  consentSource?: string;
}

// P0.9: актуальная версия документа согласия.
// При изменении текста /privacy или /personal-data-consent —
// увеличьте версию, чтобы старые отправки (с прежней версией)
// не считались согласованными с новым текстом.
const CURRENT_CONSENT_VERSION = '2026-07';

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as LeadPayload;

    // P0.11: honeypot. Если бот заполнил скрытое поле — отдаём фейковый успех.
    if (hasHoneypot(payload as unknown as Record<string, unknown>)) {
      return fakeOkResponse();
    }

    // P0.11: rate limit по IP — защита от спама заявок и дублей в Telegram.
    const ip = getClientIp(req);
    const rl = checkRateLimit(ip, RATE_LIMITS.lead);
    if (!rl.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Слишком много заявок. Попробуйте через минуту.',
          retryAfter: Math.ceil(rl.retryAfterMs / 1000),
        },
        {
          status: 429,
          headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) },
        }
      );
    }

    const {
      name,
      phone,
      email,
      budget,
      timeline,
      score,
      category,
      sessionId,
      source = 'AI Chat Widget',
      messages = [],
      // Brief data
      businessType,
      channels,
      dailyRequests,
      botTasks,
      hasExamples,
      product,
      restaurantName,
      restaurantFormat,
      orderMode,
      menuStatus,
      city,
      telegram,
      consent,
      consentVersion,
      consentSource,
    } = payload;

    const isRestoBotLead = product === 'restobot' || source === 'RestoBot Landing';

    // P0.9: без явного согласия — отказ (152-ФЗ).
    if (!consent || consent !== true) {
      return NextResponse.json(
        {
          success: false,
          error: 'Требуется согласие на обработку персональных данных',
        },
        { status: 400 }
      );
    }

    if (!name || (!phone && !email && !telegram)) {
      return NextResponse.json(
        { success: false, error: 'Имя и контакт обязательны' },
        { status: 400 }
      );
    }

    // P0.7: логируем только метаданные, без PII (name/phone/email).
    console.log("Lead API received:", {
      source,
      product,
      category,
      score,
      hasName: !!name,
      hasPhone: !!phone,
      hasEmail: !!email,
      hasTelegram: !!telegram,
      hasBriefData: !!businessType,
      isRestoBotLead,
    });

    // Отправляем в Telegram
    const restobotMessage = isRestoBotLead ? [
      restaurantName ? `Заведение: ${restaurantName}` : null,
      restaurantFormat ? `Формат: ${restaurantFormat}` : null,
      orderMode ? `Сценарий заказов: ${orderMode}` : null,
      menuStatus ? `Меню: ${menuStatus}` : null,
      city ? `Город: ${city}` : null,
      telegram ? `Telegram: @${telegram.replace('@', '')}` : null,
    ].filter(Boolean).join('\n') : undefined;

    const telegramSent = await sendLeadToTelegram({
      type: isRestoBotLead ? 'restobot' : businessType ? 'consultation' : 'callback',
      name,
      email,
      phone,
      telegram,
      message: restobotMessage,
    });

    if (!telegramSent) {
      return NextResponse.json(
        { success: false, telegramSent: false, error: 'Не удалось отправить заявку в Telegram' },
        { status: 502 }
      );
    }
    const briefInfo = businessType ? `
📋 ДАННЫЕ БРИФА:
Сфера: ${businessType || 'не указана'}
Каналы: ${channels?.join(', ') || 'не указаны'}
Заявок в день: ${dailyRequests || 'не указано'}
Задачи бота: ${botTasks?.join(', ') || 'не указаны'}
Примеры: ${hasExamples || 'не указано'}
` : '';

    // Build conversation history for Bitrix24
    const conversationHistory = messages
      .map((m) => `${m.role === 'user' ? 'Клиент' : 'AI'}: ${m.content}`)
      .join('\n\n');

    // Формируем comments
    let comments = isRestoBotLead ? "Продукт: RestoBot\n" : "";
    comments += "Оценка: " + category + " (" + score + " баллов)\n";
    if (restaurantName) comments += "Заведение: " + restaurantName + "\n";
    if (restaurantFormat) comments += "Формат заведения: " + restaurantFormat + "\n";
    if (orderMode) comments += "Сценарий заказов: " + orderMode + "\n";
    if (menuStatus) comments += "Меню: " + menuStatus + "\n";
    if (city) comments += "Город: " + city + "\n";
    if (telegram) comments += "Telegram: @" + telegram.replace('@', '') + "\n";
    if (businessType) comments += "Сфера: " + businessType + "\n";
    if (channels && channels.length) comments += "Каналы: " + channels.join(", ") + "\n";
    if (dailyRequests) comments += "Заявок/день: " + dailyRequests + "\n";
    if (botTasks && botTasks.length) comments += "Задачи: " + botTasks.join(", ") + "\n";
    if (hasExamples) comments += "Примеры: " + hasExamples + "\n";
    comments += "Бюджет: " + (budget || "не указан");

    // Send to Bitrix24 if configured
    console.log('BITRIX24_WEBHOOK configured:', !!process.env.BITRIX24_WEBHOOK);
    
    const bitrixEnabled = process.env.ENABLE_BITRIX24 === 'true' && !!process.env.BITRIX24_WEBHOOK;

    if (bitrixEnabled) {
      try {
        const bitrixUrl = `${process.env.BITRIX24_WEBHOOK}/crm.lead.add.json`;
        console.log('Sending lead to Bitrix24:', { category, source, product, isRestoBotLead });
        
        const bitrixResponse = await fetch(bitrixUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              TITLE: isRestoBotLead
                ? `[RESTOBOT] Пилот - ${restaurantName || name}`
                : `[${category}] ${businessType ? 'Бриф' : 'Чат'} - ${name}`,
              NAME: name,
              PHONE: phone ? [{ VALUE: phone, VALUE_TYPE: 'WORK' }] : undefined,
              EMAIL: email ? [{ VALUE: email, VALUE_TYPE: 'WORK' }] : undefined,
              COMMENTS: comments,
              SOURCE_ID: 'WEB',
              SOURCE_DESCRIPTION: isRestoBotLead
                ? `RestoBot pilot | ${restaurantFormat || "format: no"} | ${orderMode || "orders: no"}`
                : businessType ? `Brief: ${businessType} | Budget: ${budget || "no"} | Score: ${score}` : `${source} (${category})`,
              // Пользовательские поля брифа
              UF_CRM_BUSINESS_TYPE: businessType || undefined,
              UF_CRM_CHANNELS: channels || undefined,
              UF_CRM_DAILY_REQUESTS: dailyRequests || undefined,
              UF_CRM_BOT_TASKS: botTasks || undefined,
              UF_CRM_HAS_EXAMPLES: hasExamples || undefined,
              UF_CRM_BUDGET: budget || undefined,
              UF_CRM_LEAD_SCORE: score || undefined,
              UF_CRM_LEAD_CATEGORY: category || undefined,
            },
            params: { REGISTER_SONET_EVENT: 'Y' }
          }),
        });

        const bitrixData = await bitrixResponse.json();
        console.log('Bitrix24 response:', {
          ok: !bitrixData.error,
          result: bitrixData.result,
          error: bitrixData.error,
        });
        
        if (bitrixData.error) {
          console.error('Bitrix24 error:', bitrixData.error);
          return NextResponse.json({
            success: true,
            bitrixSent: false,
            bitrixError: bitrixData.error,
            telegramSent,
            category,
            score,
            message: 'Заявка принята и отправлена в Telegram'
          });
        }

        // Create task for HOT leads
        if (category === 'HOT' && process.env.BITRIX24_MANAGER_ID) {
          try {
            await fetch(`${process.env.BITRIX24_WEBHOOK}/tasks.task.add.json`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                fields: {
                  TITLE: `🔥 Срочная обработка лида: ${name}`,
                  DESCRIPTION: `HOT лид с оценкой ${score} баллов\n\nТелефон: ${phone}\n\n${comments}`,
                  RESPONSIBLE_ID: process.env.BITRIX24_MANAGER_ID,
                  PRIORITY: '2',
                  DEADLINE: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                },
              }),
            });
          } catch (taskError) {
            console.error('Task creation error:', taskError);
          }
        }

        return NextResponse.json({
          success: true,
          bitrixSent: true,
          telegramSent,
          leadId: bitrixData.result,
          category,
          score,
          consentVersion: consentVersion || CURRENT_CONSENT_VERSION,
          message: 'Заявка успешно создана'
        });
      } catch (bitrixError) {
        console.error('Bitrix24 fetch error:', bitrixError);
        return NextResponse.json({
          success: true,
          bitrixSent: false,
          bitrixError: String(bitrixError),
          telegramSent,
          category,
          score,
          message: 'Заявка принята и отправлена в Telegram'
        });
      }
    }

    // If no Bitrix24 configured, just log and return success.
    // P0.9: логируем consent-аудит (без PII).
    console.log('Lead accepted without Bitrix24:', {
      category,
      score,
      source,
      product,
      consentVersion: consentVersion || CURRENT_CONSENT_VERSION,
      consentSource: consentSource || source,
      consentTimestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      bitrixSent: false,
      telegramSent,
      category,
      score,
      consentVersion: consentVersion || CURRENT_CONSENT_VERSION,
      message: 'Заявка принята'
    });

  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка создания заявки' },
      { status: 500 }
    );
  }
}
