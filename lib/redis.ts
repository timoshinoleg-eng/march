// Заглушка для Redis (используется только если настроен UPSTASH_REDIS_REST_URL)
import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export { redis };

// Fallback функции для работы без Redis
export async function getFromCache(key: string) {
  if (!redis) return null;
  try {
    return await redis.get(key);
  } catch {
    return null;
  }
}

export async function setToCache(key: string, value: any, ttl?: number) {
  if (!redis) return;
  try {
    if (ttl) {
      await redis.set(key, value, { ex: ttl });
    } else {
      await redis.set(key, value);
    }
  } catch {
    // Игнорируем ошибки Redis
  }
}
