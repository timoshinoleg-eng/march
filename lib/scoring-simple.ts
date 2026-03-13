/**
 * Lead Scoring System
 * Rule-based lead qualification
 */

export interface LeadData {
  budget?: string;
  timeline?: string;
}

export interface LeadScore {
  score: number;
  status: "HOT" | "WARM" | "COLD";
  category: string;
}

// Budget scoring
const BUDGET_SCORES: Record<string, number> = {
  "до 50 000₽": 20,
  "50 000₽ - 100 000₽": 40,
  "100 000₽ - 250 000₽": 60,
  "250 000₽+": 90,
};

// Timeline scoring
const TIMELINE_SCORES: Record<string, number> = {
  "Срочно": 30,
  "1 неделя": 25,
  "1 месяц": 20,
  "Не определено": 5,
};

export function calculateLeadScore(data: LeadData): number {
  let score = 0;

  // Budget score
  if (data.budget && BUDGET_SCORES[data.budget]) {
    score += BUDGET_SCORES[data.budget];
  }

  // Timeline score
  if (data.timeline && TIMELINE_SCORES[data.timeline]) {
    score += TIMELINE_SCORES[data.timeline];
  }

  // Base score for form completion
  score += 10;

  return Math.min(score, 100);
}

export function getLeadCategory(score: number): string {
  if (score >= 70) return "HOT";
  if (score >= 40) return "WARM";
  return "COLD";
}

export function getLeadPriority(score: number): "HIGH" | "MEDIUM" | "LOW" {
  if (score >= 70) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

export function getRecommendedAction(score: number): string {
  if (score >= 70) {
    return "Связаться в течение 2 часов";
  } else if (score >= 40) {
    return "Связаться в течение рабочего дня";
  } else {
    return "Добавить в базу для nurturing";
  }
}
