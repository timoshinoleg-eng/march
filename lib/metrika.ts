'use client';

// Утилита для отправки целей в Yandex Metrica
declare global {
  interface Window {
    ym?: (id: number, type: string, goal: string, params?: Record<string, any>) => void;
  }
}

export function trackGoal(goalName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(107072365, 'reachGoal', goalName, params);
    console.log(`[YM] Goal reached: ${goalName}`, params);
  }
}

// Готовые функции для частых событий
export const trackFormSubmit = (formName: string) => trackGoal('form_submit', { form: formName });
export const trackMessengerClick = (messenger: string) => trackGoal('messenger_click', { messenger });
export const trackCTAClick = (ctaName: string) => trackGoal('cta_click', { cta: ctaName });
export const trackPhoneClick = () => trackGoal('phone_click');
export const trackEmailClick = () => trackGoal('email_click');
