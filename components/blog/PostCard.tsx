import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";

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

  /* ── Featured (full-width overlay card) ─────────────── */
  if (featured) {
    return (
      <Link href={href} className="post-card group block" style={{ gridColumn: "span 2" }}>
        {post.mainImage?.asset?.url && (
          <div style={{ position: "relative", height: "22rem", overflow: "hidden" }}>
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt ?? post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem" }}>
              {post.category && (
                <Badge variant="gold" style={{ marginBottom: "0.875rem" }}>{post.category.title}</Badge>
              )}
              <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.75rem", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                {post.title}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--color-navy-300)", fontSize: "0.875rem" }}>
                {post.author && <span>{post.author.name}</span>}
                {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                {post.estimatedReadingTime && (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Clock size={13} aria-hidden="true" /> {post.estimatedReadingTime} min
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </Link>
    );
  }

  /* ── Compact (horizontal thumbnail + title, for sidebar) ── */
  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group"
        style={{
          display: "flex",
          gap: "0.75rem",
          padding: "0.75rem 0",
          borderBottom: "1px solid var(--color-navy-100)",
          textDecoration: "none",
          alignItems: "flex-start",
        }}
      >
        {post.mainImage?.asset?.url && (
          <div style={{ position: "relative", width: "64px", height: "52px", flexShrink: 0, overflow: "hidden", borderRadius: "0.25rem" }}>
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
            <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-signal-700)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {post.category.title}
            </span>
          )}
          <h4
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "var(--color-navy-900)",
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            className="group-hover:text-signal-700 transition-colors"
          >
            {post.title}
          </h4>
          {post.publishedAt && (
            <p style={{ fontSize: "0.6875rem", color: "var(--color-navy-400)", marginTop: "0.25rem" }}>
              {formatDate(post.publishedAt)}
            </p>
          )}
        </div>
      </Link>
    );
  }

  /* ── Horizontal (wide card with image left, text right) ── */
  if (variant === "horizontal") {
    return (
      <Link href={href} className="group" style={{ display: "flex", gap: "1rem", textDecoration: "none", padding: "1.25rem 0", borderBottom: "1px solid var(--color-navy-100)" }}>
        {post.mainImage?.asset?.url && (
          <div style={{ position: "relative", width: "140px", height: "96px", flexShrink: 0, overflow: "hidden", borderRadius: "0.375rem" }}>
            <Image
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt ?? post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            {post.category && <Badge variant="default">{post.category.title}</Badge>}
            {post.estimatedReadingTime && (
              <span style={{ fontSize: "0.75rem", color: "var(--color-navy-400)", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                <Clock size={11} /> {post.estimatedReadingTime} min
              </span>
            )}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "1.0625rem",
              fontWeight: 700,
              color: "var(--color-navy-900)",
              lineHeight: 1.3,
              marginBottom: "0.375rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            className="group-hover:text-signal-700 transition-colors"
          >
            {post.title}
          </h3>
          {post.excerpt && (
            <p style={{ fontSize: "0.8125rem", color: "var(--color-navy-500)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    );
  }

  /* ── Default (vertical card) ─────────────────────────── */
  return (
    <Link href={href} className="post-card group block" style={{ textDecoration: "none" }}>
      {post.mainImage?.asset?.url && (
        <div style={{ position: "relative", height: "12rem", overflow: "hidden" }}>
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
          {post.category && <Badge variant="default">{post.category.title}</Badge>}
          {post.estimatedReadingTime && (
            <span style={{ fontSize: "0.75rem", color: "var(--color-navy-400)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Clock size={12} aria-hidden="true" /> {post.estimatedReadingTime} min
            </span>
          )}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "1.0625rem",
            fontWeight: 700,
            color: "var(--color-navy-900)",
            lineHeight: 1.35,
            marginBottom: "0.5rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
          className="group-hover:text-signal-700 transition-colors"
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p style={{ fontSize: "0.875rem", color: "var(--color-navy-600)", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "1rem" }}>
            {post.excerpt}
          </p>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.875rem", borderTop: "1px solid var(--color-navy-100)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--color-navy-500)" }}>
            {post.author?.name ?? "Oghie Blog"}
          </span>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-signal-700)", fontWeight: 500 }}>
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}
