/**
 * @deprecated Используйте data/catalog.ts.
 *
 * Этот файл оставлен только для обратной совместимости и реэкспортирует
 * данные из единого источника правды. Не добавляйте сюда новые поля.
 *
 * Migration path:
 *   import { pricingPlans } from "@/data/pricing"
 *   → import { PRICING_PLANS } from "@/data/catalog"
 *
 * Лестница цен изменилась: теперь 5 уровней вместо 4 (см. catalog.ts).
 * Старые ID (lite/base/ai-assist/enterprise) НЕ совпадают с новыми.
 */
export { PRICING_PLANS as pricingPlans } from './catalog';
export type { PricingPlan } from './catalog';

// bridgeText удалён: теперь это поле plan.bridgeText в catalog.ts.
// Оставляем заглушку для обратной совместимости, если кто-то импортирует.
export const bridgeText =
  'Если нужна автоматическая запись или мини-CRM — смотрите следующий уровень тарифов.';
