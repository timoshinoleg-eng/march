// Заглушка для GigaChat API

const isGigaChatConfigured = (): boolean => {
  return !!process.env.GIGACHAT_API_KEY;
};

export const gigachat = {
  isConfigured: isGigaChatConfigured,
  
  async createCompletion(messages: any[], options?: { max_tokens?: number }) {
    throw new Error('GigaChat not configured');
  }
};

// Для обратной совместимости
export async function checkGigaChatHealth() {
  return { status: 'ok', available: isGigaChatConfigured() };
}

export async function generateWithGigaChat(prompt: string) {
  throw new Error('GigaChat not configured');
}

export default gigachat;
