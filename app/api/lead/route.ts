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
      messages = []
    } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    // Build conversation history for Bitrix24
    const conversationHistory = messages
      .map((m: any) => `${m.role === 'user' ? 'Клиент' : 'AI'}: ${m.content}`)
      .join('\n\n');

    const comments = `📊 Оценка лида: ${category} (${score} баллов)

💰 Бюджет: ${budget || 'не указан'}
⏰ Сроки: ${timeline || 'не указаны'}
🔗 Источник: ${source}
🆔 Сессия: ${sessionId}

💬 История переписки:
${conversationHistory || 'Нет данных'}`;

    // Send to Bitrix24 if configured
    if (process.env.BITRIX24_WEBHOOK) {
      const bitrixResponse = await fetch(`${process.env.BITRIX24_WEBHOOK}/crm.lead.add.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            TITLE: `[${category}] Заявка с чата - ${name}`,
            NAME: name,
            PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
            EMAIL: email ? [{ VALUE: email, VALUE_TYPE: 'WORK' }] : undefined,
            COMMENTS: comments,
            SOURCE_ID: 'WEB',
            SOURCE_DESCRIPTION: `${source} (${category})`,
            // Custom fields for lead scoring
            UF_CRM_LEAD_SCORE: score,
            UF_CRM_LEAD_CATEGORY: category,
          },
          params: { REGISTER_SONET_EVENT: 'Y' }
        }),
      });

      const bitrixData = await bitrixResponse.json();
      
      if (bitrixData.error) {
        console.error('Bitrix24 error:', bitrixData.error);
        // Don't throw - we still want to return success to the user
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
                PRIORITY: '2', // High priority
                DEADLINE: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
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
