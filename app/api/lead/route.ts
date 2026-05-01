import { NextRequest, NextResponse } from 'next/server';
import {
  sendBriefToTelegram,
  sendChatSummaryToTelegram,
  sendLeadToTelegram,
} from '@/lib/telegram-chat';
import { initDatabase, saveBrief } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
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
    } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    await initDatabase();

    console.log("Lead API received FULL:", JSON.stringify({ name, phone, email, budget, businessType, channels, dailyRequests, botTasks, hasExamples, score, category }, null, 2));
    console.log("Lead API received:", { 
      name, phone, email, budget, 
      businessType, channels, dailyRequests, botTasks, hasExamples,
      hasBriefData: !!businessType 
    });
    console.log("businessType value:", businessType, "hasBriefData:", !!businessType);

    // Отправляем в Telegram независимо от Bitrix.
    const telegramLeadSent = await sendLeadToTelegram({
      type: businessType ? 'consultation' : 'callback',
      name,
      email,
      phone,
    });

    let telegramBriefSent = false;
    let summarySent = false;
    let briefSaved = false;

    if (businessType && sessionId) {
      try {
        await saveBrief(sessionId, {
          businessType,
          channels: channels || [],
          dailyRequests: dailyRequests || '',
          botTasks: botTasks || [],
          hasExamples: hasExamples || '',
          budget: budget || '',
          score: score || 0,
          category: category || 'WARM',
        });
        briefSaved = true;
      } catch (briefSaveError) {
        console.error('Brief DB save error in lead route:', briefSaveError);
      }

      try {
        telegramBriefSent = await sendBriefToTelegram({
          sessionId,
          businessType,
          channels,
          dailyRequests,
          botTasks,
          hasExamples,
          budget,
          score,
          category,
          contactName: name,
          contactPhone: phone,
          contactEmail: email,
        });
      } catch (telegramBriefError) {
        console.error('Telegram brief relay error in lead route:', telegramBriefError);
      }
    }

    if (sessionId && Array.isArray(messages) && messages.length > 0) {
      try {
        summarySent = await sendChatSummaryToTelegram({
          sessionId,
          messages,
          hasContacts: true,
          contactName: name,
          contactPhone: phone,
        });
      } catch (summaryError) {
        console.error('Telegram summary relay error in lead route:', summaryError);
      }
    }

    // Формируем comments
    let comments = "Оценка: " + category + " (" + score + " баллов)\n";
    if (businessType) comments += "Сфера: " + businessType + "\n";
    if (channels && channels.length) comments += "Каналы: " + channels.join(", ") + "\n";
    if (dailyRequests) comments += "Заявок/день: " + dailyRequests + "\n";
    if (botTasks && botTasks.length) comments += "Задачи: " + botTasks.join(", ") + "\n";
    if (hasExamples) comments += "Примеры: " + hasExamples + "\n";
    comments += "Бюджет: " + (budget || "не указан");

    // Send to Bitrix24 if configured
    const bitrixConfigured = !!process.env.BITRIX24_WEBHOOK;
    console.log('BITRIX24_WEBHOOK configured:', bitrixConfigured);
    
    if (bitrixConfigured) {
      try {
        const bitrixUrl = `${process.env.BITRIX24_WEBHOOK}/crm.lead.add.json`;
        console.log('Sending to Bitrix24:', { name, phone, category });
        
        const bitrixResponse = await fetch(bitrixUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: {
              TITLE: `[${category}] ${businessType ? 'Бриф' : 'Чат'} - ${name}`,
              NAME: name,
              PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
              EMAIL: email ? [{ VALUE: email, VALUE_TYPE: 'WORK' }] : undefined,
              COMMENTS: comments,
              SOURCE_ID: 'WEB',
              SOURCE_DESCRIPTION: businessType ? `Brief: ${businessType} | Budget: ${budget || "no"} | Score: ${score}` : `${source} (${category})`,
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
        console.log('Bitrix24 response:', bitrixData);
        
        if (bitrixData.error) {
          console.error('Bitrix24 error:', bitrixData.error);
          return NextResponse.json({ 
            success: false, 
            error: 'Ошибка Bitrix24: ' + bitrixData.error_description,
            details: bitrixData.error
          }, { status: 500 });
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
          leadId: bitrixData.result,
          category,
          score,
          telegramLeadSent,
          telegramBriefSent,
          summarySent,
          briefSaved,
          bitrixConfigured,
          bitrixSent: true,
          message: 'Заявка успешно создана'
        });
      } catch (bitrixError) {
        console.error('Bitrix24 fetch error:', bitrixError);
        return NextResponse.json({ 
          success: false, 
          error: 'Ошибка связи с Bitrix24',
          details: String(bitrixError),
          telegramLeadSent,
          telegramBriefSent,
          summarySent,
          briefSaved,
          bitrixConfigured,
          bitrixSent: false,
        }, { status: 500 });
      }
    }

    // If no Bitrix24 configured, just log and return success
    console.log('Lead created (no Bitrix24):', { name, phone, category, score });
    
    return NextResponse.json({ 
      success: true, 
      category,
      score,
      telegramLeadSent,
      telegramBriefSent,
      summarySent,
      briefSaved,
      bitrixConfigured,
      bitrixSent: false,
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
