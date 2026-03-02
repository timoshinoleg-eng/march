import Link from "next/link";
import Card from "@/components/ui/Card";
import { ArrowRight, Calendar } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

interface RelatedArticlesProps {
  currentSlug: string;
  articles: Article[];
}

export default function RelatedArticles({ currentSlug, articles }: RelatedArticlesProps) {
  const related = articles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-16 pt-8 border-t border-primary-500/10">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
        Похожие статьи
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {related.map((article) => (
          <Card key={article.slug} className="group flex flex-col">
            <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
              {article.title}
            </h4>
            <p className="text-gray-400 text-sm mb-4 flex-grow">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {article.date}
              </span>
              <Link
                href={`/blog/${article.slug}`}
                className="text-primary-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Читать
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
