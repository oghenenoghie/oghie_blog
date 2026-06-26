import type { Metadata } from "next";
import { getAllCachedNews } from "@/lib/gnews";
import NewsCard from "@/components/blog/NewsCard";

export const revalidate = 3600; // re-fetch from Supabase every hour

export const metadata: Metadata = {
  title: "Affiliate Marketing News & Industry Updates",
  description:
    "The latest affiliate marketing news, digital marketing updates, and industry insights — curated daily for affiliate marketers.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "Affiliate Marketing News & Industry Updates | Oghie Blog",
    description:
      "The latest affiliate marketing news, digital marketing updates, and industry insights — curated daily for affiliate marketers.",
    url: "/news",
    type: "website",
  },
};

const TOPIC_FILTERS = [
  { value: "",              label: "All"           },
  { value: "breaking",     label: "Breaking"      },
  { value: "world",        label: "World"         },
  { value: "technology",   label: "Technology"    },
  { value: "business",     label: "Business"      },
  { value: "entertainment",label: "Entertainment" },
  { value: "sports",       label: "Sports"        },
];

interface Props {
  searchParams: Promise<{ topic?: string }>;
}

export default async function NewsPage({ searchParams }: Props) {
  const { topic = "" } = await searchParams;

  const articles = topic
    ? (await getAllCachedNews(48)).filter((a) => a.topic === topic)
    : await getAllCachedNews(48);

  const [featured, ...rest] = articles;

  return (
    <main style={{ backgroundColor: "var(--color-navy-50)", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <div style={{ backgroundColor: "var(--color-navy-900)", color: "#fff", paddingTop: "3.5rem", paddingBottom: "3rem" }}>
        <div className="container-blog">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span className="badge-trust">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Live News
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-navy-400)" }}>
              Updated hourly · Read on site
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "2.5rem", fontWeight: 900, color: "#fff", marginBottom: "0.75rem" }}>
            Trending News
          </h1>
          <p style={{ color: "var(--color-navy-300)", fontSize: "1.125rem", maxWidth: "52ch" }}>
            Today&apos;s top stories from around the world — curated from top sources and
            available to read right here, without leaving the site.
          </p>
        </div>
      </div>

      {/* ── Topic filter bar ── */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid var(--color-navy-100)", position: "sticky", top: 0, zIndex: 10 }}>
        <div className="container-blog" style={{ overflowX: "auto" }}>
          <div style={{ display: "flex", gap: "0.25rem", padding: "0.75rem 0", whiteSpace: "nowrap" }}>
            {TOPIC_FILTERS.map((f) => (
              <a
                key={f.value}
                href={f.value ? `/news?topic=${f.value}` : "/news"}
                style={{
                  padding: "0.375rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  transition: "all 0.15s",
                  backgroundColor: topic === f.value ? "var(--color-signal-700)" : "transparent",
                  color: topic === f.value ? "#fff" : "var(--color-navy-600)",
                  border: topic === f.value ? "none" : "1px solid var(--color-navy-200)",
                  textDecoration: "none",
                }}
              >
                {f.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-blog" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>

        {articles.length === 0 && (
          <div style={{ textAlign: "center", padding: "6rem 0", color: "var(--color-navy-500)" }}>
            <p style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>No articles yet for this topic.</p>
            <p style={{ fontSize: "0.875rem" }}>The sync cron runs every 3 hours — check back soon.</p>
          </div>
        )}

        {articles.length > 0 && (
          <>
            {/* ── Featured article ── */}
            {featured && (
              <div style={{ marginBottom: "2.5rem" }}>
                <NewsCard article={featured} variant="featured" />
              </div>
            )}

            {/* ── Grid ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {rest.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
