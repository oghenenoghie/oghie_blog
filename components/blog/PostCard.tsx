import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export interface PostCardData {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: { asset: { url: string }; alt?: string };
  publishedAt?: string;
  category?: { title: string; slug: { current: string }; color?: string };
  author?: { name: string };
  estimatedReadingTime?: number;
}

interface Props {
  post: PostCardData;
  featured?: boolean;
  variant?: "default" | "compact" | "horizontal";
}

export default function PostCard({ post, featured = false, variant = "default" }: Props) {
  const href = `/blog/${post.slug.current}`;

  /* ── Featured (large editorial card) ───────────────── */
  if (featured) {
    return (
      <Link
        href={href}
        className="group block"
        style={{
          gridColumn: "span 2",
          textDecoration: "none",
          borderTop: "3px solid #121212",
          paddingTop: "1.5rem",
          paddingBottom: "2rem",
          display: "grid",
          gridTemplateColumns: post.mainImage?.asset?.url ? "1fr 1fr" : "1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        <div>
          {post.category && (
            <p style={{
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "0.625rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#d0021b",
              marginBottom: "0.75rem",
            }}>
              {post.category.title}
            </p>
          )}
          <h2 style={{
            fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(1.5rem, 3vw, 2.125rem)",
            fontWeight: 700,
            color: "#121212",
            lineHeight: 1.1,
            marginBottom: "0.875rem",
            letterSpacing: "-0.01em",
            transition: "color 0.15s",
          }}
            className="group-hover:text-gray-700"
          >
            {post.title}
          </h2>
          {post.excerpt && (
            <p style={{
              fontFamily: "var(--font-body), Georgia, serif",
              fontSize: "1rem",
              color: "#555",
              lineHeight: 1.7,
              marginBottom: "1rem",
              fontStyle: "italic",
            }}>
              {post.excerpt}
            </p>
          )}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "0.75rem",
            color: "#6e6e6e",
          }}>
            {post.author && <span>{post.author.name}</span>}
            {post.publishedAt && (
              <>
                {post.author && <span style={{ color: "#dfdfdf" }}>·</span>}
                <span>{formatDate(post.publishedAt)}</span>
              </>
            )}
            {post.estimatedReadingTime && (
              <>
                <span style={{ color: "#dfdfdf" }}>·</span>
                <span>{post.estimatedReadingTime} min read</span>
              </>
            )}
          </div>
        </div>
        {post.mainImage?.asset?.url && (
          <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt ?? post.title}
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-500"
              priority
            />
          </div>
        )}
      </Link>
    );
  }

  /* ── Compact (sidebar list item) ───────────────────── */
  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group"
        style={{
          display: "flex",
          gap: "0.875rem",
          padding: "1rem 0",
          borderTop: "1px solid #dfdfdf",
          textDecoration: "none",
          alignItems: "flex-start",
        }}
      >
        {post.mainImage?.asset?.url && (
          <div style={{ position: "relative", width: "72px", height: "54px", flexShrink: 0, overflow: "hidden" }}>
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
            <span style={{
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "0.625rem",
              fontWeight: 700,
              color: "#d0021b",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "block",
              marginBottom: "0.25rem",
            }}>
              {post.category.title}
            </span>
          )}
          <h4 style={{
            fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
            fontSize: "0.9375rem",
            fontWeight: 700,
            color: "#121212",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
            className="group-hover:text-gray-600 transition-colors"
          >
            {post.title}
          </h4>
          {post.publishedAt && (
            <p style={{
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "0.6875rem",
              color: "#888",
              marginTop: "0.25rem",
            }}>
              {formatDate(post.publishedAt)}
            </p>
          )}
        </div>
      </Link>
    );
  }

  /* ── Horizontal (wide list card) ───────────────────── */
  if (variant === "horizontal") {
    return (
      <Link
        href={href}
        className="group"
        style={{
          display: "flex",
          gap: "1.25rem",
          textDecoration: "none",
          padding: "1.5rem 0",
          borderTop: "1px solid #dfdfdf",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            {post.category && (
              <span style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "0.625rem",
                fontWeight: 700,
                color: "#d0021b",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>
                {post.category.title}
              </span>
            )}
            {post.estimatedReadingTime && (
              <span style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "0.6875rem",
                color: "#888",
              }}>
                {post.estimatedReadingTime} min
              </span>
            )}
          </div>
          <h3 style={{
            fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "#121212",
            lineHeight: 1.25,
            marginBottom: "0.5rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            letterSpacing: "-0.01em",
          }}
            className="group-hover:text-gray-600 transition-colors"
          >
            {post.title}
          </h3>
          {post.excerpt && (
            <p style={{
              fontFamily: "var(--font-body), Georgia, serif",
              fontSize: "0.875rem",
              color: "#555",
              lineHeight: 1.65,
              fontStyle: "italic",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {post.excerpt}
            </p>
          )}
        </div>
        {post.mainImage?.asset?.url && (
          <div style={{ position: "relative", width: "140px", height: "96px", flexShrink: 0, overflow: "hidden" }}>
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt ?? post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </Link>
    );
  }

  /* ── Default (standard article card) ───────────────── */
  return (
    <Link
      href={href}
      className="group block post-card"
      style={{ textDecoration: "none", padding: "1.5rem 0" }}
    >
      {post.mainImage?.asset?.url && (
        <div style={{ position: "relative", height: "200px", overflow: "hidden", marginBottom: "1rem" }}>
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-500"
          />
        </div>
      )}
      <div>
        {post.category && (
          <p style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "0.625rem",
            fontWeight: 700,
            color: "#d0021b",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
          }}>
            {post.category.title}
          </p>
        )}
        <h3 style={{
          fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "#121212",
          lineHeight: 1.25,
          marginBottom: "0.625rem",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          letterSpacing: "-0.01em",
        }}
          className="group-hover:text-gray-600 transition-colors"
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p style={{
            fontFamily: "var(--font-body), Georgia, serif",
            fontSize: "0.9375rem",
            color: "#555",
            lineHeight: 1.65,
            fontStyle: "italic",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: "1rem",
          }}>
            {post.excerpt}
          </p>
        )}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.375rem",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          fontSize: "0.75rem",
          color: "#888",
        }}>
          <span>{post.author?.name ?? "Oghie Blog"}</span>
          {post.publishedAt && (
            <>
              <span style={{ color: "#dfdfdf" }}>·</span>
              <span>{formatDate(post.publishedAt)}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
