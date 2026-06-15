import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCachedArticleBySlug, getAllCachedNews } from "@/lib/gnews";

// ── Static params for ISR ─────────────────────────────────
export async function generateStaticParams() {
  const articles = await getAllCachedNews(100);
  return articles.map((a) => ({ slug: a.slug }));
}

// ── Metadata ──────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getCachedArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description ?? undefined,
    openGraph: {
      title: article.title,
      description: article.description ?? undefined,
      images: article.image_url ? [{ url: article.image_url }] : [],
      type: "article",
      publishedTime: article.published_at ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
    },
  };
}

// ── Helpers ───────────────────────────────────────────────
const TOPIC_LABELS: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  affiliate:           "Affiliate Marketing",
  seo:                 "SEO",
  technology:          "Technology",
  business:            "Business",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(text: string): number {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

// Strip the "[chars left]" GNews trailer from content
function cleanContent(raw: string | null): string {
  if (!raw) return "";
  return raw
    // Strip GNews truncation markers: "... [6102 chars]" or "[+6102 chars]"
    .replace(/\.{2,3}\s*\[\+?\d+\s+chars?\]/gi, "")
    .replace(/\s*\[\+?\d+\s+chars?\]/gi, "")
    .trim();
}

// ── Page ──────────────────────────────────────────────────
export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getCachedArticleBySlug(slug);
  if (!article) notFound();

  const content = cleanContent(article.content);
  const minutes = readingTime(
    (article.description ?? "") + " " + content
  );

  // Related articles — same topic, different slug
  const related = (await getAllCachedNews(30))
    .filter((a) => a.topic === article.topic && a.slug !== slug)
    .slice(0, 4);

  return (
    <main style={{ backgroundColor: "var(--color-navy-50)", minHeight: "100vh" }}>

      {/* ── Breadcrumb ── */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid var(--color-navy-100)" }}>
        <div className="container-blog" style={{ padding: "0.875rem 1rem" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--color-navy-500)" }}>
            <Link href="/" style={{ color: "var(--color-navy-500)", textDecoration: "none" }}>Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/news" style={{ color: "var(--color-navy-500)", textDecoration: "none" }}>News</Link>
            <span aria-hidden="true">›</span>
            <Link
              href={`/news?topic=${article.topic}`}
              style={{ color: "var(--color-signal-700)", textDecoration: "none", fontWeight: 500 }}
            >
              {TOPIC_LABELS[article.topic] ?? article.topic}
            </Link>
          </nav>
        </div>
      </div>

      {/* ── Article wrapper ── */}
      <article style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div className="container-blog">
          <div style={{ maxWidth: "72ch", margin: "0 auto" }}>

            {/* ── Category + meta ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <span className="news-tag" style={{ fontSize: "0.8125rem" }}>
                {TOPIC_LABELS[article.topic] ?? article.topic}
              </span>
              <span style={{ fontSize: "0.8125rem", color: "var(--color-navy-500)" }}>
                {formatDate(article.published_at)}
              </span>
              <span style={{ fontSize: "0.8125rem", color: "var(--color-navy-400)" }}>·</span>
              <span style={{ fontSize: "0.8125rem", color: "var(--color-navy-500)" }}>
                {minutes} min read
              </span>
            </div>

            {/* ── Title ── */}
            <h1
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 900,
                color: "var(--color-navy-900)",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              {article.title}
            </h1>

            {/* ── Source attribution ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 1rem",
                backgroundColor: "var(--color-signal-50)",
                borderRadius: "0.5rem",
                marginBottom: "2rem",
                border: "1px solid var(--color-signal-100)",
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--color-signal-700)" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span style={{ fontSize: "0.875rem", color: "var(--color-navy-700)" }}>
                Originally reported by{" "}
                <strong style={{ color: "var(--color-signal-700)" }}>
                  {article.source_name}
                </strong>
                {" "}· curated for Oghie Blog readers
              </span>
            </div>

            {/* ── Hero image ── */}
            {article.image_url && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  marginBottom: "2.5rem",
                  boxShadow: "var(--shadow-card-hover)",
                }}
              >
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
            )}

            {/* ── Description (lead) ── */}
            {article.description && (
              <p
                style={{
                  fontSize: "1.25rem",
                  lineHeight: 1.7,
                  color: "var(--color-navy-700)",
                  fontWeight: 500,
                  borderLeft: "3px solid var(--color-gold-500)",
                  paddingLeft: "1.25rem",
                  marginBottom: "2rem",
                }}
              >
                {article.description}
              </p>
            )}

            {/* ── Main content ── */}
            {content ? (
              <div className="news-article-body">
                {content.split("\n\n").filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--color-navy-500)", fontSize: "1rem", fontStyle: "italic" }}>
                Full article content not available in this preview.
              </p>
            )}

            {/* ── Affiliate CTA ── */}
            <div
              style={{
                marginTop: "3rem",
                padding: "2rem",
                backgroundColor: "var(--color-navy-900)",
                borderRadius: "0.75rem",
                textAlign: "center",
              }}
            >
              <p style={{ color: "var(--color-navy-300)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                Found this useful?
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  color: "#fff",
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  marginBottom: "1.25rem",
                }}
              >
                Get weekly digital marketing insights in your inbox
              </h3>
              <Link href="/subscribe" className="btn-cta" style={{ display: "inline-flex" }}>
                Subscribe free →
              </Link>
            </div>

            {/* ── Tags ── */}
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {[TOPIC_LABELS[article.topic] ?? article.topic, "Affiliate Marketing", "News"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.25rem 0.875rem",
                    borderRadius: "9999px",
                    border: "1px solid var(--color-navy-200)",
                    fontSize: "0.8125rem",
                    color: "var(--color-navy-600)",
                  }}
                >
                  #{tag.toLowerCase().replace(/\s+/g, "-")}
                </span>
              ))}
            </div>

          </div>
        </div>
      </article>

      {/* ── Related articles ── */}
      {related.length > 0 && (
        <section style={{ backgroundColor: "#fff", borderTop: "1px solid var(--color-navy-100)", paddingTop: "3rem", paddingBottom: "4rem" }}>
          <div className="container-blog">
            <h2
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--color-navy-900)",
                marginBottom: "1.5rem",
              }}
            >
              More in {TOPIC_LABELS[article.topic] ?? article.topic}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.slug}`}
                  className="post-card group"
                  style={{ display: "block", textDecoration: "none" }}
                >
                  {rel.image_url && (
                    <div style={{ position: "relative", height: "10rem", overflow: "hidden" }}>
                      <Image
                        src={rel.image_url}
                        alt={rel.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div style={{ padding: "1rem" }}>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-navy-400)", marginBottom: "0.375rem" }}>
                      {rel.source_name}
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--color-navy-900)",
                        lineHeight: 1.35,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                      className="group-hover:text-signal-700 transition-colors"
                    >
                      {rel.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/news" className="btn-ghost">
                View all news →
              </Link>
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
