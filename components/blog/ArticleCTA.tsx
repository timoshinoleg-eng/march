import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function ArticleCTA() {
  return (
    <section className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-primary-500/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="p-3 rounded-xl bg-primary-500/10">
          <MessageCircle className="w-8 h-8 text-primary-400" />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Хотите так же?
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Получите бесплатную консультацию и узнайте, как чат-бот поможет вашему бизнесу
          </p>
        </div>
        <Link href="/#final-cta" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto">
            Оставить заявку
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
