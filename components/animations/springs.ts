/**
 * Apple-style spring presets for framer-motion.
 *
 * Источник: emilkowalski/skills apple-design (Designing Fluid Interfaces,
 * WWDC 2018). Параметры damping/response — напрямую из Apple-таблицы,
 * переведённые в API framer-motion (damping/stiffness/mass).
 *
 * Правило (раздел 4 скилла):
 *   - критически демпфированный спринг (no overshoot) по умолчанию;
 *   - bounce (~0.8 damping) — только для momentum-жестов (flick, swipe).
 *   - response — это НЕ duration; это время достижения цели.
 *
 * «duration» у спринга возникает из параметров, его не задают явно.
 */

import type { Transition } from "framer-motion";

/**
 * Критически демпфированный спринг — нет overshoot.
 * Базовый случай для UI: модалки, панели, fade/scale materialize.
 *
 * Apple: damping 1.0, response 0.3–0.4. Берём 0.35 как середину.
 * Перевод в framer-motion: при mass=1, damping ratio ζ и response T:
 *   stiffness = (2π / T)^2
 *   damping   = 2ζ·√stiffness
 */
export const springSnug: Transition = {
  type: "spring",
  stiffness: 550,
  damping: 38,
  mass: 1,
};

/**
 * Drawer / sheet — лёгкий overshoot допустим (есть инерция жеста).
 * Apple: damping 0.8, response 0.3.
 */
export const springSheet: Transition = {
  type: "spring",
  stiffness: 700,
  damping: 30,
  mass: 1,
};

/**
 * Перемещение / reposition (PiP-style). Плавный, без отскока.
 * Apple: damping 1.0, response 0.4.
 */
export const springMove: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 1,
};

/**
 * Варианты для materialize-эффекта (раздел 12 скилла):
 * поверхность «прибывает» как реальный материал — scale + opacity.
 * transform-origin ставится на триггер через className/inline style.
 */
export const materializeVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

/**
 * Симметричный скрим (dim overlay): enter и exit идут с одинаковой
 * кривой, чтобы путь туда и обратно совпадал (раздел 7 скилла).
 */
export const scrimVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Базовые cubic-bezier для редких случаев, когда нужна tween
 * (НЕ для gesture-driven — там только спринги, раздел 3 скилла).
 * ease-out 0.2→0 — близко к критически демпфированному спрингу на вид.
 */
export const easeOutFast = [0.2, 0, 0, 1] as const;
