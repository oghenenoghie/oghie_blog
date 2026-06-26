import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { PostCardData } from "@/components/blog/PostCard";

interface Props {
  featured?: PostCardData | null;
  secondary?: PostCardData[];
}

const SERIF = "var(--font-display), 'Libre Baskerville', Georgia, serif";
const SANS  = "var(--font-sans), system-ui, sans-serif";

export default function HeroSection({ featured, secondary = [] }: Props) {
  return (
    <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #dfdfdf" }}>
      <div className="container-blog" style={{ paddingTop: "1.5rem", paddingBottom: "2rem" }}>

        {/* ── Section header ──────────────────────────────────── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "3px solid #121212",
          paddingTop: "0.625rem",
          marginBottom: "1.5rem",
        }}>
          <span style={{
            fontFamily: SANS,
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#121212",
          }}>
            Top Stories
          </span>
          <Link href="/blog" style={{
            fontFamily: SANS,
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#555",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
            className="hover:text-black"
          >
            All articles →
          </Link>
        </div>

        {/* ── Main grid ───────────────────────────────────────── */}
        <div
          style={{ display: "grid", gap: "0" }}
          className="md:grid-cols-[3fr_1px_2fr]"
        >

          {/* ── Left: Featured post ─────────────────────────── */}
          {featured ? (
            <Link
              href={`/blog/${featured.slug.current}`}
              className="group"
              style={{
                textDecoration: "none",
                display: "block",
                paddingRight: "2rem",
              }}
            >
              {/* Category label */}
              {featured.category && (
                <span style={{
                  fontFamily: SANS,
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-signal-700)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}>
                  {featured.category.title}
                </span>
              )}

              {/* Headline */}
              <h2 style={{
                fontFamily: SERIF,
                fontSize: "clamp(1.625rem, 3vw, 2.375rem)",
                fontWeight: 700,
                color: "#121212",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                marginBottom: "0.875rem",
                transition: "color 0.15s",
              }}
                className="group-hover:text-gray-600"
              >
                {featured.title}
              </h2>

              {/* Excerpt */}
              {featured.excerpt && (
                <p style={{
                  fontFamily: "var(--font-body), Georgia, serif",
                  fontSize: "1.0625rem",
                  fontStyle: "italic",
                  color: "#555",
                  lineHeight: 1.7,
                  marginBottom: "1rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {featured.excerpt}
                </p>
              )}

              {/* Byline */}
              <div style={{
                fontFamily: SANS,
                fontSize: "0.75rem",
                color: "#888",
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                marginBottom: "1.25rem",
              }}>
                {featured.author?.name && (
                  <span style={{ fontWeight: 600, color: "#555" }}>
                    {featured.author.name}
                  </span>
                )}
                {featured.publishedAt && (
                  <>
                    {featured.author?.name && <span style={{ color: "#dfdfdf" }}>·</span>}
                    <span>{formatDate(featured.publishedAt)}</span>
                  </>
                )}
                {featured.estimatedReadingTime && (
                  <>
                    <span style={{ color: "#dfdfdf" }}>·</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                      <Clock size={11} /> {featured.estimatedReadingTime} min
                    </span>
                  </>
                )}
              </div>

              {/* Featured image */}
              {featured.mainImage?.asset?.url && (
                <div style={{
                  position: "relative",
                  height: "clamp(200px, 28vw, 320px)",
                  overflow: "hidden",
                }}>
                  <Image
                    src={featured.mainImage.asset.url}
                    alt={featured.mainImage.alt ?? featured.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}
            </Link>
          ) : (
            /* Skeleton */
            <div style={{ paddingRight: "2rem" }}>
              <div className="skeleton" style={{ height: "14px", width: "80px", borderRadius: "3px", marginBottom: "0.75rem" }} />
              <div className="skeleton" style={{ height: "36px", width: "90%", borderRadius: "3px", marginBottom: "0.5rem" }} />
              <div className="skeleton" style={{ height: "36px", width: "70%", borderRadius: "3px", marginBottom: "1rem" }} />
              <div className="skeleton" style={{ height: "16px", width: "100%", borderRadius: "3px", marginBottom: "0.375rem" }} />
              <div className="skeleton" style={{ height: "16px", width: "85%", borderRadius: "3px", marginBottom: "1.25rem" }} />
              <div className="skeleton" style={{ height: "280px", borderRadius: "2px" }} />
            </div>
          )}

          {/* ── Vertical divider ───────────────────────────── */}
          <div
            style={{ backgroundColor: "#dfdfdf", width: "1px" }}
            className="hidden md:block"
          />

          {/* ── Right: Secondary stories ─────────────────────── */}
          <div style={{ paddingLeft: "2rem" }}>
            {secondary.length > 0 ? secondary.slice(0, 4).map((post, i) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group"
                style={{
                  textDecoration: "none",
                  display: "block",
                  padding: i === 0 ? "0 0 1.25rem" : "1.25rem 0",
                  borderBottom: i < Math.min(secondary.length, 4) - 1 ? "1px solid #dfdfdf" : "none",
                }}
              >
                {/* Category */}
                {post.category && (
                  <span style={{
                    fontFamily: SANS,
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-signal-700)",
                    display: "block",
                    marginBottom: "0.375rem",
                  }}>
                    {post.category.title}
                  </span>
                )}

                {/* Title */}
                <h3 style={{
                  fontFamily: SERIF,
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#121212",
                  lineHeight: 1.3,
                  marginBottom: "0.375rem",
                  transition: "color 0.15s",
                }}
                  className="group-hover:text-gray-600"
                >
                  {post.title}
                </h3>

                {/* Meta */}
                <div style={{
                  fontFamily: SANS,
                  fontSize: "0.6875rem",
                  color: "#888",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}>
                  {post.author?.name && <span>{post.author.name}</span>}
                  {post.publishedAt && (
                    <>
                      {post.author?.name && <span style={{ color: "#dfdfdf" }}>·</span>}
                      <span>{formatDate(post.publishedAt)}</span>
                    </>
                  )}
                  {post.estimatedReadingTime && (
                    <>
                      <span style={{ color: "#dfdfdf" }}>·</span>
                      <span>{post.estimatedReadingTime} min</span>
                    </>
                  )}
                </div>
              </Link>
            )) : (
              /* Skeleton */
              [0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    padding: i === 0 ? "0 0 1.25rem" : "1.25rem 0",
                    borderBottom: i < 3 ? "1px solid #dfdfdf" : "none",
                  }}
                >
                  <div className="skeleton" style={{ height: "10px", width: "60px", borderRadius: "3px", marginBottom: "0.5rem" }} />
                  <div className="skeleton" style={{ height: "16px", width: "100%", borderRadius: "3px", marginBottom: "0.375rem" }} />
                  <div className="skeleton" style={{ height: "16px", width: "75%", borderRadius: "3px", marginBottom: "0.5rem" }} />
                  <div className="skeleton" style={{ height: "10px", width: "120px", borderRadius: "3px" }} />
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
