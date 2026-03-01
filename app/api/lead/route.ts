import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations";
import { sendToTelegram } from "@/lib/telegram";

// Rate limiting store (в продакшене лучше использовать Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Ограничение: 5 запросов в минуту
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута в мс

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

// Функция проверки rate limit
function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // Новое окно или первый запрос
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return {
      allowed: true,
      remaining: RATE_LIMIT - 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
  }

  if (record.count >= RATE_LIMIT) {
    // Лимит исчерпан
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  // Увеличиваем счетчик
  record.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT - record.count,
    resetTime: record.resetTime,
  };
}

// Получение IP адреса из запроса
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

// Получение UTM-меток из заголовков или тела запроса
function getUTMParams(request: NextRequest, body: Record<string, unknown>) {
  // Сначала проверяем тело запроса
  const fromBody = {
    utmSource: body.utmSource as string | undefined,
    utmMedium: body.utmMedium as string | undefined,
    utmCampaign: body.utmCampaign as string | undefined,
    utmContent: body.utmContent as string | undefined,
    utmTerm: body.utmTerm as string | undefined,
  };

  // Если есть в теле - используем их
  if (fromBody.utmSource || fromBody.utmMedium) {
    return fromBody;
  }

  // Иначе пытаемся получить из заголовков
  return {
    utmSource: request.headers.get("x-utm-source") || undefined,
    utmMedium: request.headers.get("x-utm-medium") || undefined,
    utmCampaign: request.headers.get("x-utm-campaign") || undefined,
    utmContent: request.headers.get("x-utm-content") || undefined,
    utmTerm: request.headers.get("x-utm-term") || undefined,
  };
}

export async function POST(request: NextRequest) {
  try {
    // Получаем IP и проверяем rate limit
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Слишком много запросов. Попробуйте позже.",
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(RATE_LIMIT),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(rateLimitResult.resetTime / 1000)),
          },
        }
      );
    }

    const body = await request.json();

    // Получаем UTM-метки из заголовков или тела
    const utmParams = getUTMParams(request, body);

    // Объединяем данные формы с UTM
    const dataWithUTM = {
      ...body,
      ...utmParams,
    };

    // Валидация данных
    const result = leadSchema.safeParse(dataWithUTM);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Некорректные данные",
          details: result.error.errors,
        },
        { status: 400 }
      );
    }

    // Добавляем IP в данные для логирования
    const dataWithIP = {
      ...result.data,
      ip: clientIP,
    };

    // Отправка в Telegram
    const telegramResult = await sendToTelegram(dataWithIP);

    if (!telegramResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Ошибка отправки сообщения",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Заявка успешно отправлена",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": String(RATE_LIMIT),
          "X-RateLimit-Remaining": String(rateLimitResult.remaining),
          "X-RateLimit-Reset": String(Math.ceil(rateLimitResult.resetTime / 1000)),
        },
      }
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Lead API endpoint. Use POST to submit leads.",
      rateLimit: {
        limit: RATE_LIMIT,
        window: "1 minute",
      },
    },
    { status: 200 }
  );
}
