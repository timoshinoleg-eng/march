import { NextRequest, NextResponse } from 'next/server';

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

    console.log('Lead API received:', { 
      name, phone, email, budget, 
      businessType, channels, dailyRequests, botTasks, hasExamples,
      hasBriefData: !!businessType 
    });
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
      .map((m: any) => `${m.role === 'user' ? 'Клиент' : 'AI'}: ${m.content}`)
      .join('\n\n');

    const comments = `📊 Оценка лида: ${category} (${score} баллов)
${briefInfo}
💰 Бюджет: ${budget || 'не указан'}
⏰ Сроки: ${timeline || 'не указаны'}
🔗 Источник: ${source}
🆔 Сессия: ${sessionId}

💬 История переписки:
${conversationHistory || 'Нет данных'}`;

    // Send to Bitrix24 if configured
    console.log('BITRIX24_WEBHOOK configured:', !!process.env.BITRIX24_WEBHOOK);
    
    if (process.env.BITRIX24_WEBHOOK) {
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
              SOURCE_DESCRIPTION: `${source} (${category})`,
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
          message: 'Заявка успешно создана'
        });
      } catch (bitrixError) {
        console.error('Bitrix24 fetch error:', bitrixError);
        return NextResponse.json({ 
          success: false, 
          error: 'Ошибка связи с Bitrix24',
          details: String(bitrixError)
        }, { status: 500 });
      }
    }

    // If no Bitrix24 configured, just log and return success
    console.log('Lead created (no Bitrix24):', { name, phone, category, score });
    
    return NextResponse.json({ 
      success: true, 
      category,
      score,
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
