import Link from "next/link";
import Image from "next/image";
import { Clock, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { PostCardData } from "@/components/blog/PostCard";

interface Props {
  featured?: PostCardData | null;
  secondary?: PostCardData[];
  ticker?: string[];
}

const DEFAULT_TICKER = [
  "Amazon Associates raises commission rates on select categories",
  "New affiliate programs paying 40–60% recurring commissions in SaaS",
  "Google update: affiliate content with genuine reviews ranks higher",
  "ShareASale adds 200+ new merchant programs this quarter",
  "How to get approved for high-paying affiliate programs — new guide",
];

export default function HeroSection({
  featured,
  secondary = [],
  ticker = DEFAULT_TICKER,
}: Props) {
  return (
    <div>
      {/* ── Breaking ticker ──────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-signal-700)",
          borderBottom: "1px solid var(--color-signal-800)",
          overflow: "hidden",
          height: "36px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0 1rem",
            borderRight: "1px solid rgba(255,255,255,0.2)",
            height: "100%",
            backgroundColor: "var(--color-signal-800)",
          }}
        >
          <TrendingUp size={13} color="#fff" />
          <span style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", whiteSpace: "nowrap" }}>
            Trending
          </span>
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: "0",
              animation: "tickerScroll 45s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {[...ticker, ...ticker].map((item, i) => (
              <span key={i} style={{ fontSize: "0.8125rem", color: "#fff", padding: "0 2.5rem", opacity: 0.9 }}>
                {item}
                <span style={{ marginLeft: "2.5rem", opacity: 0.4 }}>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured area ─────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--color-navy-950)",
          borderBottom: "3px solid var(--color-gold-500)",
          padding: "1.5rem 0",
        }}
      >
        <div className="container-blog">
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div style={{ width: "3px", height: "18px", backgroundColor: "var(--color-gold-500)", borderRadius: "1px" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold-500)" }}>
                Top Stories
              </span>
            </div>
            <Link href="/blog" style={{ fontSize: "0.8rem", color: "var(--color-navy-400)", textDecoration: "none" }} className="hover:text-white">
              View all →
            </Link>
          </div>

          {/* Grid: featured (left) + secondary (right) */}
          {featured ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} className="md:grid-cols-[3fr_2fr]">

              {/* Featured story */}
              <Link href={`/blog/${featured.slug.current}`} className="group" style={{ textDecoration: "none", display: "block", backgroundColor: "var(--color-navy-950)", padding: "0 1.25rem 0 0" }} >
                {featured.mainImage?.asset?.url && (
                  <div style={{ position: "relative", height: "320px", overflow: "hidden", borderRadius: "0.375rem", marginBottom: "1.25rem" }}>
                    <Image
                      src={featured.mainImage.asset.url}
                      alt={featured.mainImage.alt ?? featured.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      priority
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,17,32,0.85) 0%, transparent 60%)" }} />
                    {featured.category && (
                      <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                        <span className="news-tag">{featured.category.title}</span>
                      </div>
                    )}
                  </div>
                )}
                <div>
                  {!featured.mainImage?.asset?.url && featured.category && (
                    <span className="news-tag" style={{ marginBottom: "0.75rem", display: "inline-block" }}>{featured.category.title}</span>
                  )}
                  <h2
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                      fontWeight: 900,
                      color: "#fff",
                      lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                      marginBottom: "0.75rem",
                    }}
                    className="group-hover:text-gold-400 transition-colors"
                  >
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p style={{ fontSize: "0.9375rem", color: "var(--color-navy-400)", lineHeight: 1.7, marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {featured.excerpt}
                    </p>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", fontSize: "0.8125rem", color: "var(--color-navy-500)" }}>
                    {featured.author && <span>{featured.author.name}</span>}
                    {featured.publishedAt && (
                      <><span>·</span><span>{formatDate(featured.publishedAt)}</span></>
                    )}
                    {featured.estimatedReadingTime && (
                      <><span>·</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Clock size={12} /> {featured.estimatedReadingTime} min read
                      </span></>
                    )}
                  </div>
                </div>
              </Link>

              {/* Secondary stories */}
              <div style={{ backgroundColor: "var(--color-navy-950)", padding: "0 0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0" }}>
                {secondary.slice(0, 3).map((post, i) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="group"
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      gap: "0.875rem",
                      padding: "1rem 0",
                      borderBottom: i < Math.min(secondary.length, 3) - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      alignItems: "flex-start",
                    }}
                  >
                    {post.mainImage?.asset?.url && (
                      <div style={{ position: "relative", width: "90px", height: "68px", flexShrink: 0, overflow: "hidden", borderRadius: "0.25rem" }}>
                        <Image
                          src={post.mainImage.asset.url}
                          alt={post.mainImage.alt ?? post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {post.category && (
                        <span className="news-tag" style={{ marginBottom: "0.375rem", display: "inline-block", fontSize: "0.6875rem" }}>{post.category.title}</span>
                      )}
                      <h3
                        style={{
                          fontFamily: "var(--font-display), Georgia, serif",
                          fontSize: "0.9375rem",
                          fontWeight: 700,
                          color: "#fff",
                          lineHeight: 1.35,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                        className="group-hover:text-gold-400 transition-colors"
                      >
                        {post.title}
                      </h3>
                      {post.publishedAt && (
                        <p style={{ fontSize: "0.75rem", color: "var(--color-navy-500)", marginTop: "0.375rem" }}>{formatDate(post.publishedAt)}</p>
                      )}
                    </div>
                  </Link>
                ))}

                {/* Placeholder if no secondary posts */}
                {secondary.length === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "0.5rem" }}>
                    {[1, 2, 3].map((i) => (
                      <div key={i} style={{ display: "flex", gap: "0.875rem", padding: "1rem 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                        <div className="skeleton" style={{ width: "90px", height: "68px", flexShrink: 0, borderRadius: "0.25rem" }} />
                        <div style={{ flex: 1 }}>
                          <div className="skeleton" style={{ height: "12px", width: "40%", borderRadius: "4px", marginBottom: "0.5rem" }} />
                          <div className="skeleton" style={{ height: "14px", width: "100%", borderRadius: "4px", marginBottom: "0.375rem" }} />
                          <div className="skeleton" style={{ height: "14px", width: "80%", borderRadius: "4px" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Skeleton when no posts yet */
            <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "1px", backgroundColor: "rgba(255,255,255,0.06)" }}>
              <div style={{ backgroundColor: "var(--color-navy-950)", paddingRight: "1.25rem" }}>
                <div className="skeleton" style={{ height: "320px", borderRadius: "0.375rem", marginBottom: "1.25rem" }} />
                <div className="skeleton" style={{ height: "28px", width: "85%", borderRadius: "4px", marginBottom: "0.75rem" }} />
                <div className="skeleton" style={{ height: "16px", width: "100%", borderRadius: "4px", marginBottom: "0.375rem" }} />
                <div className="skeleton" style={{ height: "16px", width: "70%", borderRadius: "4px" }} />
              </div>
              <div style={{ backgroundColor: "var(--color-navy-950)", paddingLeft: "1.25rem" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ display: "flex", gap: "0.875rem", padding: "1rem 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <div className="skeleton" style={{ width: "90px", height: "68px", flexShrink: 0, borderRadius: "0.25rem" }} />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton" style={{ height: "12px", width: "40%", borderRadius: "4px", marginBottom: "0.5rem" }} />
                      <div className="skeleton" style={{ height: "14px", width: "100%", borderRadius: "4px", marginBottom: "0.375rem" }} />
                      <div className="skeleton" style={{ height: "14px", width: "75%", borderRadius: "4px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
