import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
});

// Get IP from headers
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return '127.0.0.1';
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(req);
    const { success: rateOk } = await ratelimit.limit(ip);
    if (!rateOk) {
      return NextResponse.json(
        { success: false, error: 'Слишком много заявок. Попробуйте позже.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, phone, email, budget, timeline, source = 'AI Chat', message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\+\-\(\)]{10,20}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Некорректный формат телефона' },
        { status: 400 }
      );
    }

    const bitrixWebhook = process.env.BITRIX24_WEBHOOK;
    if (!bitrixWebhook) {
      console.error('BITRIX24_WEBHOOK not configured');
      return NextResponse.json(
        { success: false, error: 'Сервис временно недоступен' },
        { status: 500 }
      );
    }

    // Send to Bitrix24
    const bitrixResponse = await fetch(`${bitrixWebhook}/crm.lead.add.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          TITLE: `Заявка с сайта - ${name}`,
          NAME: name,
          PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
          EMAIL: email ? [{ VALUE: email, VALUE_TYPE: 'WORK' }] : undefined,
          COMMENTS: `Бюджет: ${budget || 'не указан'}\nСроки: ${timeline || 'не указаны'}\nИсточник: ${source}${message ? '\nСообщение: ' + message : ''}`,
          SOURCE_ID: 'WEB',
          SOURCE_DESCRIPTION: source,
        },
        params: { REGISTER_SONET_EVENT: 'Y' }
      }),
    });

    const bitrixData = await bitrixResponse.json();

    if (bitrixData.error) {
      console.error('Bitrix24 error:', bitrixData.error);
      throw new Error(bitrixData.error_description || 'Bitrix24 API error');
    }

    return NextResponse.json({ 
      success: true, 
      leadId: bitrixData.result,
      message: 'Заявка успешно создана'
    });

  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка при создании заявки' },
      { status: 500 }
    );
  }
}
