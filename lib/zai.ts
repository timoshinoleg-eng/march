/**
 * Z.AI / OpenRouter API Client
 * OpenAI-compatible API for GLM-4.7-Flash and other models
 * FIXED: Added proper error handling, timeouts, retries, and headers
 */

// Конфигурация API endpoints
const ZAI_API_URL = 'https://api.z.ai/api/paas/v4/chat/completions';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Конфигурация таймаутов и ретраев
const CONFIG = {
  timeout: 25000,        // 25 секунд на запрос к API
  maxRetries: 2,         // Максимум 2 повторные попытки
  retryDelays: [1000, 3000], // Задержки между ретраями (экспоненциальная)
};

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
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

interface APIError {
  status: number;
  code: string;
  message: string;
  action?: string;
}

class ZAIClient {
  private apiKey: string;
  private model: string;
  private apiUrl: string;
  private siteUrl: string;
  private appName: string;

  constructor(
    apiKey: string = '',
    model: string = 'glm-4.7-flash',
    siteUrl: string = 'https://chatbot24-widget.vercel.app',
    appName: string = 'Chatbot24 Widget'
  ) {
    this.apiKey = apiKey;
    this.model = model;
    this.siteUrl = siteUrl;
    this.appName = appName;
    
    // Определяем URL API в зависимости от ключа
    if (this.apiKey.startsWith('sk-or-v1-')) {
      this.apiUrl = OPENROUTER_API_URL;
    } else {
      this.apiUrl = ZAI_API_URL;
    }
  }

  /**
   * Проверка конфигурации клиента
   */
  isConfigured(): boolean {
    if (!this.apiKey) {
      console.error('[ZAI Client] API ключ не настроен');
      return false;
    }
    
    // Проверка формата ключа OpenRouter
    if (this.apiKey.startsWith('sk-or-v1-') && this.apiKey.length < 20) {
      console.error('[ZAI Client] OPENROUTER_API_KEY имеет неверный формат');
      return false;
    }
    
    return true;
  }

  /**
   * Получение диагностической информации
   */
  getDiagnostics(): Record<string, unknown> {
    return {
      hasKey: !!this.apiKey,
      keyPrefix: this.apiKey ? `${this.apiKey.slice(0, 10)}...` : 'none',
      keyFormat: this.apiKey.startsWith('sk-or-v1-') ? 'openrouter' : 'zai',
      model: this.model,
      apiUrl: this.apiUrl,
      siteUrl: this.siteUrl,
    };
  }

  /**
   * Выполнение запроса с таймаутом
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Обработка ошибок API
   */
  private async handleAPIError(response: Response): Promise<APIError> {
    const status = response.status;
    let errorBody: Record<string, unknown> = {};
    
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { error: { message: response.statusText } };
    }

    const errorMap: Record<number, { message: string; code: string; action?: string }> = {
      401: {
        message: 'Ошибка аутентификации — проверьте API ключ',
        code: 'AUTH_FAILED',
        action: 'Проверьте ключ в Vercel Dashboard и личном кабинете провайдера',
      },
      429: {
        message: 'Превышен лимит запросов',
        code: 'RATE_LIMIT',
        action: 'Подождите немного и попробуйте снова',
      },
      502: {
        message: 'API временно недоступен (Gateway Error)',
        code: 'GATEWAY_ERROR',
        action: 'Попробуйте повторить запрос позже',
      },
      503: {
        message: 'Модель временно недоступна',
        code: 'MODEL_UNAVAILABLE',
        action: 'Попробуйте повторить запрос позже',
      },
      504: {
        message: 'Таймаут запроса к API',
        code: 'TIMEOUT',
        action: 'Попробуйте снова или уменьшите max_tokens',
      },
    };

    const errorInfo = errorMap[status] || {
      message: `Неизвестная ошибка API: ${status}`,
      code: 'UNKNOWN_ERROR',
    };

    return {
      status,
      code: errorInfo.code,
      message: (errorBody.error?.message as string) || errorInfo.message,
      action: errorInfo.action,
    };
  }

  /**
   * Запрос с retry-логикой
   */
  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    attempt: number = 0
  ): Promise<Response> {
    try {
      const response = await this.fetchWithTimeout(url, options, CONFIG.timeout);

      // Ретраим только определённые статусы
      if (!response.ok) {
        const shouldRetry = [429, 502, 503, 504].includes(response.status);
        
        if (shouldRetry && attempt < CONFIG.maxRetries) {
          const delay = CONFIG.retryDelays[attempt] || 5000;
          console.warn(`[ZAI Client] Ретрай ${attempt + 1}/${CONFIG.maxRetries} через ${delay}ms (статус: ${response.status})`);
          await new Promise((r) => setTimeout(r, delay));
          return this.fetchWithRetry(url, options, attempt + 1);
        }
      }

      return response;
    } catch (error) {
      // AbortError или сетевая ошибка — пробуем ещё раз
      if (attempt < CONFIG.maxRetries) {
        const delay = CONFIG.retryDelays[attempt] || 5000;
        console.warn(`[ZAI Client] Ретрай ${attempt + 1}/${CONFIG.maxRetries} после ошибки сети через ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
        return this.fetchWithRetry(url, options, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Создание чат-комплишена
   */
  async createCompletion(
    messages: ChatMessage[],
    options: {
      temperature?: number;
      max_tokens?: number;
      stream?: boolean;
    } = {}
  ): Promise<ChatCompletionResponse> {
    // Формируем заголовки
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    };

    // Добавляем заголовки OpenRouter если используем OpenRouter
    if (this.apiUrl === OPENROUTER_API_URL) {
      headers['HTTP-Referer'] = this.siteUrl;
      headers['X-Title'] = this.appName;
    }

    const requestBody = {
      model: this.model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 1000,
      stream: options.stream ?? false,
      // Оптимизации OpenRouter
      ...(this.apiUrl === OPENROUTER_API_URL && {
        transforms: ['middle-out'],
        route: 'fallback',
      }),
    };

    console.log('[ZAI Client] Отправка запроса:', {
      url: this.apiUrl,
      model: this.model,
      messagesCount: messages.length,
    });

    const response = await this.fetchWithRetry(this.apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await this.handleAPIError(response);
      console.error('[ZAI Client] Ошибка API:', error);
      throw new Error(`${error.code}: ${error.message}${error.action ? ` (${error.action})` : ''}`);
    }

    const data = await response.json();
    
    console.log('[ZAI Client] Успешный ответ:', {
      model: data.model,
      tokens: data.usage?.total_tokens,
    });

    return data;
  }
}

// Определяем API ключ из переменных окружения
const apiKey = process.env.ZAI_API_KEY || process.env.OPENROUTER_API_KEY || '';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chatbot24-widget.vercel.app';

// Singleton instance
export const zai = new ZAIClient(apiKey, 'glm-4.7-flash', siteUrl);

// Экспорт класса для создания кастомных инстансов
export { ZAIClient };
export type { ChatMessage, ChatCompletionResponse, APIError };
