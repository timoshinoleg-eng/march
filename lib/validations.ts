import { z } from "zod";

// Схема валидации для формы лидов
export const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя слишком длинное"),
  company: z
    .string()
    .min(2, "Название компании должно содержать минимум 2 символа")
    .max(200, "Название компании слишком длинное"),
  phone: z
    .string()
    .regex(
      /^\+7/,
      "Телефон должен начинаться с +7"
    )
    .min(11, "Введите корректный номер телефона")
    .max(16, "Некорректный формат телефона"),
  email: z
    .string()
    .email("Введите корректный email адрес")
    .max(100, "Email слишком длинный")
    .optional(),
  dailyLeads: z
    .enum(["до 10", "10-30", "30-100", "100+"])
    .optional(),
  crmType: z
    .enum(["bitrix24", "amocrm", "other", "none"])
    .optional(),
  // UTM-метки
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),
  utmTerm: z.string().max(100).optional(),
});

// Тип для данных формы
export type LeadFormData = z.infer<typeof leadSchema>;

// Схема для расчета ROI
export const roiCalculatorSchema = z.object({
  employees: z.number().min(1).max(100),
  avgSalary: z.number().min(30000).max(500000),
  transactions: z.number().min(1).max(10000),
});

export type ROICalculatorData = z.infer<typeof roiCalculatorSchema>;
