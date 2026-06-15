import Link from "next/link";
import Image from "next/image";
import type { CachedArticle } from "@/lib/gnews";

const TOPIC_LABELS: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  affiliate:           "Affiliate",
  seo:                 "SEO",
  technology:          "Technology",
  business:            "Business",
};

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface Props {
  article: CachedArticle;
  variant?: "default" | "featured" | "compact";
}

export default function NewsCard({ article, variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <Link
        href={`/news/${article.slug}`}
        className="flex gap-3 group py-3 border-b border-navy-100 last:border-0"
      >
        {article.image_url && (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-navy-400 mb-1">
            {article.source_name} · {timeAgo(article.published_at)}
          </p>
          <h3 className="text-sm font-medium text-navy-900 line-clamp-2 group-hover:text-signal-700 transition-colors leading-snug">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/news/${article.slug}`}
        className="post-card group block"
        style={{ gridColumn: "span 2" }}
      >
        {article.image_url && (
          <div className="relative h-72 w-full overflow-hidden">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="news-tag mb-3 inline-block">
                {TOPIC_LABELS[article.topic] ?? article.topic}
              </span>
              <h2 className="text-2xl font-display font-bold text-white leading-tight line-clamp-2">
                {article.title}
              </h2>
              <p className="text-navy-300 text-sm mt-2">
                {article.source_name} · {timeAgo(article.published_at)}
              </p>
            </div>
          </div>
        )}
        {!article.image_url && (
          <div className="p-6">
            <span className="news-tag mb-3 inline-block">
              {TOPIC_LABELS[article.topic] ?? article.topic}
            </span>
            <h2 className="text-2xl font-display font-bold text-navy-900 line-clamp-3">
              {article.title}
            </h2>
            <p className="text-navy-500 text-sm mt-2">
              {article.source_name} · {timeAgo(article.published_at)}
            </p>
          </div>
        )}
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/news/${article.slug}`} className="post-card group block">
      {article.image_url && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="news-tag">{TOPIC_LABELS[article.topic] ?? article.topic}</span>
          <span className="text-xs text-navy-400">{timeAgo(article.published_at)}</span>
        </div>
        <h3 className="font-display font-bold text-navy-900 text-lg leading-snug line-clamp-2 mb-2 group-hover:text-signal-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-navy-600 text-sm leading-relaxed line-clamp-3 mb-3">
          {article.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-navy-100">
          <span className="text-xs font-medium text-navy-500">{article.source_name}</span>
          <span className="text-xs text-signal-700 font-medium group-hover:underline">
            Read on site →
          </span>
        </div>
      </div>
    </Link>
  );
}
