// YandexGPT Pro Integration for ChatBot24

interface YandexGPTMessage {
  role: 'system' | 'user' | 'assistant';
  text: string;
}

interface YandexGPTRequest {
  modelUri: string;
  completionOptions: {
    stream: boolean;
    temperature: number;
    maxTokens: number;
  };
  messages: YandexGPTMessage[];
}

interface YandexGPTResponse {
  result: {
    alternatives: Array<{
      message: {
        role: string;
        text: string;
      };
      status: string;
    }>;
    usage: {
      inputTextTokens: string;
      completionTokens: string;
      totalTokens: string;
    };
    modelVersion: string;
  };
}

const YANDEXGPT_MODELS = {
  PRO: 'gpt://b1g447hnv7s5o74n4qcr/yandexgpt/latest',
  LITE: 'gpt://b1g447hnv7s5o74n4qcr/yandexgpt-lite/latest',
  RC: 'gpt://b1g447hnv7s5o74n4qcr/yandexgpt/rc',
};

export async function generateYandexGPTResponse(
  messages: YandexGPTMessage[],
  options: {
    temperature?: number;
    maxTokens?: number;
    model?: 'pro' | 'lite' | 'rc';
  } = {}
): Promise<string> {
  const {
    temperature = 0.6,
    maxTokens = 2000,
    model = 'pro'
  } = options;

  const modelUri = model === 'pro' ? YANDEXGPT_MODELS.PRO :
                   model === 'rc' ? YANDEXGPT_MODELS.RC :
                   YANDEXGPT_MODELS.LITE;

  // Сначала пробуем получить из переменной окружения
  let iamToken = process.env.YANDEX_IAM_TOKEN;
  
  if (!iamToken) {
    throw new Error('YANDEX_IAM_TOKEN not set');
  }

  const requestBody: YandexGPTRequest = {
    modelUri,
    completionOptions: {
      stream: false,
      temperature,
      maxTokens,
    },
    messages: [
      {
        role: 'system',
        text: `Ты - профессиональный консультант компании ChatBot24. Ты помогаешь клиентам с вопросами о чат-ботах, автоматизации бизнеса и интеграции с мессенджерами. Отвечай кратко, по делу и дружелюбно. Если не знаешь ответ - честно скажи об этом и предложи связаться с менеджером.`
      },
      ...messages
    ],
  };

  const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${iamToken}`,
      'x-folder-id': 'b1g447hnv7s5o74n4qcr',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('YandexGPT API Error:', error);
    throw new Error(`YandexGPT API error: ${response.status}`);
  }

  const data: YandexGPTResponse = await response.json();
  
  if (data.result?.alternatives?.[0]?.message?.text) {
    return data.result.alternatives[0].message.text;
  }
  
  throw new Error('No response from YandexGPT');
}

export default generateYandexGPTResponse;
