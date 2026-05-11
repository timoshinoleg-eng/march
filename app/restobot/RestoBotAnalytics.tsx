"use client";

import { useEffect } from "react";

import { trackGoal } from "@/lib/metrika";

const observedGoals = [
  { id: "offer", goal: "restobot_scroll_offer" },
  { id: "restobot-request", goal: "restobot_request_view" },
  { id: "restobot-faq", goal: "restobot_faq_view" },
];

export default function RestoBotAnalytics() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const goal = entry.target.getAttribute("data-analytics-goal");
          if (!goal) return;

          trackGoal(goal);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 },
    );

    observedGoals.forEach(({ id, goal }) => {
      const element = document.getElementById(id);
      if (!element) return;

      element.setAttribute("data-analytics-goal", goal);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
