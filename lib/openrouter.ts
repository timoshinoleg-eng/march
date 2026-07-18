// OpenRouter Integration for ChatBot24.
//
// P0-план моделей (бюджет ≤ $0.10/день):
//   Primary:   deepseek/deepseek-v4-flash   (~$0.0000001/$0.0000002 /M tokens)
//   Free tier: qwen/qwen3-coder:free        (резерв, но rate-limited у OpenRouter)
//
// Используется /api/agent для свободных вопросов. Бриф — детерминированный,
// без AI. AI timeout 8 сек → fallback в typed-ответ (см. route.ts).

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Доступные модели. Меняется только здесь.
 *
 * Используйте env OPENROUTER_MODEL, чтобы переопределить primary без деплоя.
 */
const DEFAULT_PRIMARY_MODEL = 'deepseek/deepseek-v4-flash';
const FALLBACK_FREE_MODEL = 'qwen/qwen3-coder:free';

function resolvePrimaryModel(): string {
  return process.env.OPENROUTER_MODEL || DEFAULT_PRIMARY_MODEL;
}

export interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  /** AI timeout в мс. По умолчанию 8000 (P0.11). */
  timeoutMs?: number;
  /** Если true — fallback на free-модель при ошибке primary. */
  allowFreeFallback?: boolean;
}

/**
 * Генерирует ответ через OpenRouter.
 *
 * P0.11:
 *   - Таймаут через AbortSignal.timeout (8 сек по умолчанию).
 *   - При таймауте/ошибке primary — опционально fallback на free-модель.
 *   - При отсутствии ключа — бросает (вызывающий код показывает fallback-UI).
 */
export async function generateOpenRouterResponse(
  messages: OpenRouterMessage[],
  options: GenerateOptions = {}
): Promise<string> {
  const {
    temperature = 0.6,
    maxTokens = 2000,
    timeoutMs = 8000,
    allowFreeFallback = true,
  } = options;

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not set');
  }

  const primaryModel = resolvePrimaryModel();

  try {
    return await callOpenRouter({
      apiKey,
      model: primaryModel,
      messages,
      temperature,
      maxTokens,
      timeoutMs,
    });
  } catch (primaryError) {
    console.error('OpenRouter primary model error:', primaryError);

    if (!allowFreeFallback) throw primaryError;

    // Fallback на free-модель (если primary упёрся в rate-limit или таймаут).
    try {
      return await callOpenRouter({
        apiKey,
        model: FALLBACK_FREE_MODEL,
        messages,
        temperature,
        maxTokens,
        timeoutMs,
      });
    } catch (fallbackError) {
      console.error('OpenRouter fallback model error:', fallbackError);
      throw fallbackError;
    }
  }
}

async function callOpenRouter(args: {
  apiKey: string;
  model: string;
  messages: OpenRouterMessage[];
  temperature: number;
  maxTokens: number;
  timeoutMs: number;
}): Promise<string> {
  const { apiKey, model, messages, temperature, maxTokens, timeoutMs } = args;

  const requestBody: OpenRouterRequest = {
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    stream: false,
  };

  // P0.11: жёсткий timeout. AbortSignal.timeout доступен в edge runtime.
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://chatbot24.su',
      'X-Title': 'ChatBot24 AI Assistant',
    },
    body: JSON.stringify(requestBody),
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    const error = await response.text().catch(() => '');
    console.error(`OpenRouter API error (${model}): ${response.status}`, error.slice(0, 300));
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data: OpenRouterResponse = await response.json();

  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }

  throw new Error('No response from OpenRouter');
}

export default generateOpenRouterResponse;
