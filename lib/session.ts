import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

/**
 * Защита сессий чат-виджета.
 *
 * Проблема P0.10:
 *   - sessionId = `session_${Date.now()}` — предсказуем.
 *   - GET /api/chat/session?id=xxx возвращал историю (с ПДн) любому.
 *
 * Решение (stateless, без миграции БД):
 *   1. sessionId генерируется как UUIDv4 на клиенте (Web Crypto).
 *   2. При создании сессии сервер выпускает HttpOnly-cookie
 *      cb24_owner = HMAC(secret, sessionId).
 *   3. При запросе истории сервер проверяет, что cookie содержит
 *      корректный HMAC для запрашиваемого sessionId.
 *
 * Секрет берётся из SESSION_SECRET env var. Если не задан —
 * инициализация завершается ошибкой (fail-closed).
 */

const COOKIE_NAME = 'cb24_owner';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 дней

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      'SESSION_SECRET must be set (>= 32 chars). Generate with: openssl rand -hex 32'
    );
  }
  return secret;
}

/**
 * Вычисляет HMAC-SHA256(secret, sessionId) как hex.
 * Использует Web Crypto API — работает в edge и node runtime.
 */
async function hmac(sessionId: string): Promise<string> {
  const secret = getSecret();
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(sessionId));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Проверяет, действительно ли клиент владеет данной сессией. */
export async function verifySessionOwnership(
  sessionId: string,
  req?: NextRequest
): Promise<boolean> {
  try {
    const expected = await hmac(sessionId);
    // NextRequest (route handler): читаем заголовок Cookie напрямую.
    if (req) {
      const cookieHeader = req.headers.get('cookie') || '';
      const match = cookieHeader.match(
        new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`)
      );
      const token = match ? decodeURIComponent(match[1]) : '';
      return !!token && constantTimeEquals(token, expected);
    }
    // Server Component / Next cookies() API.
    const store = await cookies();
    const token = store.get(COOKIE_NAME)?.value || '';
    return !!token && constantTimeEquals(token, expected);
  } catch {
    // Секрет не задан или другая ошибка — fail-closed.
    return false;
  }
}

/** Подписывает sessionId и выставляет HttpOnly-cookie в ответ. */
export async function issueOwnerCookie(
  sessionId: string,
  existingSetCookie?: string[]
): Promise<{ 'Set-Cookie': string }> {
  const token = await hmac(sessionId);
  const cookie = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
  ].join('; ');
  return { 'Set-Cookie': cookie };
}

/** Примитив сравнения строк за константное время (защита от timing-атак). */
function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
