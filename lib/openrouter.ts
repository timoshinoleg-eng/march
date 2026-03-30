// OpenRouter Integration with DeepSeek for ChatBot24

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
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// DeepSeek модели через OpenRouter
const OPENROUTER_MODELS = {
  DEEPSEEK_CHAT: 'deepseek/deepseek-chat',  // DeepSeek V3
  DEEPSEEK_CODER: 'deepseek/deepseek-coder', // Для кода
  DEEPSEEK_REASONER: 'deepseek/deepseek-r1', // Reasoning
};

export async function generateOpenRouterResponse(
  messages: OpenRouterMessage[],
  options: {
    temperature?: number;
    maxTokens?: number;
    model?: 'deepseek-chat' | 'deepseek-coder' | 'deepseek-reasoner';
  } = {}
): Promise<string> {
  const {
    temperature = 0.6,
    maxTokens = 2000,
    model = 'deepseek-chat'
  } = options;

  // Выбираем модель
  const modelId = model === 'deepseek-coder' ? OPENROUTER_MODELS.DEEPSEEK_CODER :
                  model === 'deepseek-reasoner' ? OPENROUTER_MODELS.DEEPSEEK_REASONER :
                  OPENROUTER_MODELS.DEEPSEEK_CHAT;

  // Получаем API ключ
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not set');
  }

  const requestBody: OpenRouterRequest = {
    model: modelId,
    messages,
    temperature,
    max_tokens: maxTokens,
    stream: false,
  };

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://chatbot24.su', // Required by OpenRouter
      'X-Title': 'ChatBot24 AI Assistant', // Optional
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('OpenRouter API Error:', error);
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data: OpenRouterResponse = await response.json();
  
  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  
  throw new Error('No response from OpenRouter');
}

export default generateOpenRouterResponse;
