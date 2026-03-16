"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LeadFormData } from "@/lib/validations";
import { Send, CheckCircle } from "lucide-react";

interface LeadFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function LeadForm({ onSuccess, className = "" }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", company: "" });
        onSuccess?.();
      } else {
        if (data.details) {
          const fieldErrors: Record<string, string> = {};
          data.details.forEach((err: { path: string[]; message: string }) => {
            fieldErrors[err.path[0]] = err.message;
          });
          setErrors(fieldErrors);
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={className}>
      {isSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
          suppressHydrationWarning
        >
            <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary-400" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">
              Заявка отправлена!
            </h4>
            <p className="text-gray-400">
              Мы свяжемся с вами в ближайшее время
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
            suppressHydrationWarning
          >
            <Input
              label="Ваше имя *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Иван Иванов"
              error={errors.name}
              required
            />
            <Input
              label="Телефон *"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (999) 999-99-99"
              error={errors.phone}
              required
            />
            <Input
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="info@company.ru"
              error={errors.email}
              required
            />
            <Input
              label="Компания"
              name="company"
              value={formData.company || ""}
              onChange={handleChange}
              placeholder="ООО Компания"
              error={errors.company}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              <Send className="w-4 h-4 mr-2" />
              Отправить заявку
            </Button>
          </motion.form>
      )}
    </div>
  );
}
