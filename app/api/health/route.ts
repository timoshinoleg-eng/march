import { NextRequest } from 'next/server';

export const runtime = 'edge';

const DEFAULT_ALLOWED_ORIGINS = [
  'https://www.chatbot24.su',
  'https://chatbot24.su',
  'http://localhost:3000',
];

const FOLDER_ID = 'b1ggect9adumeeb8ahik';

function getAllowedOrigins() {
  const raw = process.env.CORS_ALLOWED_ORIGINS;
  if (!raw) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  const envOrigins = raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return envOrigins.length > 0 ? envOrigins : DEFAULT_ALLOWED_ORIGINS;
}

// CORS headers helper
function setCorsHeaders(response: Response, origin: string | null) {
  const allowedOrigins = getAllowedOrigins();
  const allowedOrigin =
    origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Max-Age', '86400');
  
  return response;
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return setCorsHeaders(new Response(null, { status: 204 }), origin);
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  environment: string;
  config: {
      yandexConfigured: boolean;
      openRouterConfigured: boolean;
      telegramConfigured: boolean;
      folderId: string;
      allowedOrigins: string[];
  };
  services: {
    yandex: {
      status: string;
      latencyMs?: number;
      error?: string;
    };
    openRouter: {
      status: string;
      model?: string;
      error?: string;
    };
    telegram: {
      status: string;
      chatId?: string;
    };
  };
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const allowedOrigins = getAllowedOrigins();
  
  const health: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'unknown',
    
    config: {
      yandexConfigured: !!process.env.YANDEX_API_KEY,
      openRouterConfigured: !!process.env.OPENROUTER_API_KEY,
      telegramConfigured: !!process.env.TELEGRAM_BOT_TOKEN && !!process.env.TELEGRAM_CHAT_ID,
      folderId: FOLDER_ID,
      allowedOrigins,
    },
    
    services: {
      yandex: {
        status: process.env.YANDEX_API_KEY ? 'configured' : 'not_configured',
      },
      openRouter: {
        status: process.env.OPENROUTER_API_KEY ? 'configured' : 'not_configured',
        model: 'deepseek/deepseek-chat',
      },
      telegram: {
        status: process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID ? 'configured' : 'not_configured',
        chatId: process.env.TELEGRAM_CHAT_ID
          ? process.env.TELEGRAM_CHAT_ID.replace(/\s+/g, '')
          : undefined,
      },
    },
  };

  // Проверяем Yandex API если настроен
  if (process.env.YANDEX_API_KEY) {
    const startTime = Date.now();
    try {
      const testResponse = await fetch(
        'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
        {
          method: 'POST',
          headers: {
            'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
            'Content-Type': 'application/json',
            'x-folder-id': FOLDER_ID,
          },
          body: JSON.stringify({
            modelUri: `gpt://${FOLDER_ID}/yandexgpt/latest`,
            completionOptions: {
              stream: false,
              temperature: 0.7,
              maxTokens: 10,
            },
            messages: [{ role: 'user', text: 'hi' }],
          }),
        }
      );

      const latencyMs = Date.now() - startTime;
      
      if (testResponse.ok) {
        health.services.yandex = {
          status: 'connected',
          latencyMs,
        };
      } else {
        health.services.yandex = {
          status: 'error',
          error: `HTTP ${testResponse.status}`,
          latencyMs,
        };
        health.status = 'degraded';
      }
    } catch (e) {
      health.services.yandex = {
        status: 'error',
        error: e instanceof Error ? e.message : 'Network error',
      };
      health.status = 'degraded';
    }
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  
  return setCorsHeaders(
    Response.json(health, { status: statusCode }),
    origin
  );
}
