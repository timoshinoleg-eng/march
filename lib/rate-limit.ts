import { NextRequest } from 'next/server';

/**
 * Простой in-memory rate limiter для edge runtime.
 *
 * Назначение: защитить /api/agent, /api/lead, /api/chat/* от спама и
 * неконтролируемых расходов на OpenRouter/Telegram.
 *
 * Ограничения in-memory:
 *   - Не разделяется между инстансами (edge functions могут скейлиться).
 *   - Сбрасывается при холодном старте.
 *   - Для production с высоким трафиком лучше использовать Upstash Redis
 *     или Vercel KV. Здесь — минимально достаточный вариант для
 *     низкого/среднего трафика и бюджета $0.10/день.
 *
 * Принцип: скользящее окно, key = IP + route.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

// Map<string, Bucket>. Размер ограничен, чтобы не раздувать память.
const MAX_TRACKED_IPS = 10_000;
const buckets = new Map<string, Bucket>();

export interface RateLimitOptions {
  /** Имя правила (для логов). */
  route: string;
  /** Максимум запросов в окне. */
  limit: number;
  /** Размер окна в миллисекундах. */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Сколько осталось до сброса окна (мс). */
  retryAfterMs: number;
  /** Сколько запросов осталось в окне. */
  remaining: number;
}

/**
 * Извлекает IP-адрес клиента из запроса.
 * Учитывает x-forwarded-for (Vercel) и x-real-ip.
 */
export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  return req.headers.get('x-real-ip') || 'unknown';
}

/**
 * Проверяет лимит запросов. Вызывать в начале route handler.
 * Возвращает { allowed, retryAfterMs, remaining }.
 */
export function checkRateLimit(
  key: string,
  opts: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  const fullKey = `${opts.route}:${key}`;
  const bucket = buckets.get(fullKey);

  // Окно истекло или бакета нет — создаём новый.
  if (!bucket || bucket.resetAt <= now) {
    const newBucket: Bucket = { count: 1, resetAt: now + opts.windowMs };
    // Профилактика переполнения: если Map слишком большой, чистим устаревшие.
    if (buckets.size >= MAX_TRACKED_IPS) {
      pruneExpired(now);
    }
    buckets.set(fullKey, newBucket);
    return {
      allowed: true,
      retryAfterMs: opts.windowMs,
      remaining: opts.limit - 1,
    };
  }

  // Окно активно — инкремент.
  bucket.count += 1;
  if (bucket.count > opts.limit) {
    return {
      allowed: false,
      retryAfterMs: bucket.resetAt - now,
      remaining: 0,
    };
  }

  return {
    allowed: true,
    retryAfterMs: bucket.resetAt - now,
    remaining: Math.max(0, opts.limit - bucket.count),
  };
}

/** Удаляет истекшие бакеты. */
function pruneExpired(now: number): void {
  for (const [k, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(k);
  }
}

// Готовые пресеты лимитов.
export const RATE_LIMITS = {
  // AI-чат: дорого, ограничиваем жёстко.
  agent: { route: 'agent', limit: 10, windowMs: 60_000 }, // 10 в минуту на IP
  // Заявки: средняя жёсткость.
  lead: { route: 'lead', limit: 5, windowMs: 60_000 }, // 5 в минуту на IP
  // Чат-логирование: менее строго.
  chatMessage: { route: 'chat_message', limit: 30, windowMs: 60_000 }, // 30 в минуту
  chatBrief: { route: 'chat_brief', limit: 5, windowMs: 60_000 },
  chatSession: { route: 'chat_session', limit: 10, windowMs: 60_000 },
} as const;

/**
 * Конструирует HTTP 429-ответ с заголовком Retry-After.
 */
export function tooManyRequestsResponse(retryAfterMs: number): Response {
  const retryAfterSec = Math.ceil(retryAfterMs / 1000);
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Слишком много запросов. Попробуйте позже.',
      retryAfter: retryAfterSec,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfterSec),
      },
    }
  );
}

/**
 * Honeypot-проверка: если в теле запроса есть заполненное honeypot-поле,
 * считаем его ботом. Поле скрыто от пользователей CSS-классом.
 *
 * Использование:
 *   const body = await req.json();
 *   if (hasHoneypot(body)) return fakeOkResponse();
 *
 * Важно: НЕ возвращаем 4xx/5xx — бот поймёт, что пойман, и будет менять тактику.
 * Возвращаем 200 + формальный success, чтобы бот думал, что прошёл.
 */
export function hasHoneypot(body: Record<string, unknown>): boolean {
  // Имя поля должно быть привлекательным для бота: company, website, url.
  const honeypotFields = ['website', 'url', 'company_website', '_company_url'];
  for (const f of honeypotFields) {
    const v = body[f];
    if (typeof v === 'string' && v.trim().length > 0) {
      return true;
    }
  }
  return false;
}

/** Фейковый успешный ответ для ботов (honeypot). */
export function fakeOkResponse(): Response {
  return new Response(
    JSON.stringify({ success: true, message: 'Заявка принята' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
