/**
 * Sentiment Analysis
 * Simple rule-based sentiment detection
 */

export interface SentimentResult {
  label: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  score: number;
}

const POSITIVE_WORDS = [
  "хорошо", "отлично", "супер", "круто", "спасибо", "благодарю",
  "понравилось", "доволен", "рад", "интересно", "хочу", "готов",
  "да", "конечно", "обязательно", "великолепно", "прекрасно",
  "love", "good", "great", "awesome", "thanks", "yes"
];

const NEGATIVE_WORDS = [
  "плохо", "ужасно", "отвратительно", "жалко", "жаль", "проблема",
  "ошибка", "не работает", "сломано", "плохой", "ненавижу",
  "злой", "разочарован", "плохо", "нет", "не хочу", "не буду",
  "bad", "terrible", "awful", "hate", "error", "problem", "no"
];

export function analyzeSentiment(text: string): SentimentResult {
  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;

  for (const word of POSITIVE_WORDS) {
    if (lowerText.includes(word)) positiveCount++;
  }

  for (const word of NEGATIVE_WORDS) {
    if (lowerText.includes(word)) negativeCount++;
  }

  if (positiveCount > negativeCount) {
    return { label: "POSITIVE", score: 0.6 + (positiveCount * 0.1) };
  } else if (negativeCount > positiveCount) {
    return { label: "NEGATIVE", score: 0.6 + (negativeCount * 0.1) };
  }

  return { label: "NEUTRAL", score: 0.5 };
}
