/**
 * Guardrails
 * Simple content filtering
 */

export interface GuardrailsResult {
  allowed: boolean;
  message?: string;
}

const BLOCKED_PATTERNS = [
  /password|пароль/i,
  /credit.?card|кредитная.?карта/i,
  /passport|паспорт/i,
  /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/, // Credit card numbers
  /hack|взлом|hacking/i,
  /virus|вирус/i,
  /ddos/i,
];

const BLOCKED_MESSAGE = "Извините, я не могу обсуждать эту тему. Давайте поговорим об автоматизации заявок?";

export function checkGuardrails(text: string): GuardrailsResult {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return { allowed: false, message: BLOCKED_MESSAGE };
    }
  }
  return { allowed: true };
}
