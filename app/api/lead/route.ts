import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, budget, timeline, source = 'AI Agent' } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    const bitrixResponse = await fetch(`${process.env.BITRIX24_WEBHOOK}/crm.lead.add.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          TITLE: `Заявка с сайта - ${name}`,
          NAME: name,
          PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
          EMAIL: email ? [{ VALUE: email, VALUE_TYPE: 'WORK' }] : undefined,
          COMMENTS: `Бюджет: ${budget || 'не указан'}\nСроки: ${timeline || 'не указаны'}\nИсточник: ${source}`,
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: source,
        },
        params: { REGISTER_SONET_EVENT: 'Y' }
      }),
    });

    const bitrixData = await bitrixResponse.json();
    
    if (bitrixData.error) {
      throw new Error(bitrixData.error_description);
    }

    return NextResponse.json({ 
      success: true, 
      leadId: bitrixData.result,
      message: 'Заявка успешно создана'
    });

  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка создания заявки' },
      { status: 500 }
    );
  }
}
