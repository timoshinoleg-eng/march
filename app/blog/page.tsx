import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BLOG_ARTICLES } from "@/data/blog-articles";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Полезные статьи об автоматизации заявок, чат-ботах и повышении конверсии",
  alternates: { canonical: "https://chatbot24.su/blog" },
  openGraph: {
    title: "Блог ChatBot24",
    description: "Полезные статьи об автоматизации заявок и чат-ботах",
    type: "website",
  },
};

// JSON-LD для списка статей — генерируется из единого реестра.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: BLOG_ARTICLES.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://chatbot24.su/blog/${a.slug}`,
    name: a.title,
  })),
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-bg-primary pt-24 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 sm:pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Блог об автоматизации{" "}
              <span className="bg-gradient-emerald bg-clip-text text-transparent">
                заявок
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400">
              Исследования, разборы кейсов и практика применения чат-ботов
              в малом и среднем бизнесе
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <Section className="!py-0 !pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {BLOG_ARTICLES.map((article, index) => (
            <Card
              key={article.slug}
              variant={index === 0 ? "gradient" : "default"}
              className="group flex flex-col h-full overflow-hidden"
            >
              {/* Featured Image */}
              <div className="relative w-full h-48 mb-4 -mx-6 -mt-6 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary-500/80 text-white text-xs font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                {article.title}
              </h2>

              <p className="text-gray-400 text-sm sm:text-base mb-6 flex-grow">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-primary-500/10">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <Button variant="ghost" size="sm" className="group/btn">
                    Читать
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-primary-500/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Хотите так же?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Получите бесплатную консультацию и узнайте, как автоматизация поможет вашему бизнесу
            </p>
            <Link href="/#final-cta">
              <Button size="lg">
                Оставить заявку
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
