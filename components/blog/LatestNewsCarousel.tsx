"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft, ChevronRight, ArrowRight,
  Link2, Search, Cpu, TrendingUp, Megaphone,
  Zap, Globe, Film, Trophy, Newspaper,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { CachedArticle } from "@/lib/gnews";

const SERIF = "var(--font-display), 'Libre Baskerville', Georgia, serif";
const SANS  = "var(--font-sans), system-ui, sans-serif";
const BODY  = "var(--font-body), Georgia, 'Times New Roman', serif";

const TOPIC_LABELS: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  affiliate:           "Affiliate",
  seo:                 "SEO",
  technology:          "Technology",
  business:            "Business",
  breaking:            "Breaking",
  world:               "World",
  entertainment:       "Entertainment",
  sports:              "Sports",
};

// Each topic gets a multi-stop mesh gradient (several radial blobs over a dark base)
// so the placeholder looks like an editorial colour field, not a flat CSS box.
const TOPIC_MESH: Record<string, string> = {
  affiliate: `
    radial-gradient(ellipse at 18% 78%, rgba(93,202,165,0.80) 0%, transparent 52%),
    radial-gradient(ellipse at 82% 18%, rgba(29,158,117,0.90) 0%, transparent 52%),
    radial-gradient(ellipse at 58% 58%, rgba(15,110,86,0.65) 0%, transparent 62%),
    radial-gradient(ellipse at 40% 10%, rgba(159,225,203,0.40) 0%, transparent 40%),
    #04342C`,

  seo: `
    radial-gradient(ellipse at 28% 72%, rgba(133,183,235,0.75) 0%, transparent 52%),
    radial-gradient(ellipse at 78% 25%, rgba(55,138,221,0.90) 0%, transparent 52%),
    radial-gradient(ellipse at 52% 52%, rgba(24,95,165,0.70) 0%, transparent 62%),
    radial-gradient(ellipse at 15% 20%, rgba(181,212,244,0.40) 0%, transparent 38%),
    #042C53`,

  "digital-marketing": `
    radial-gradient(ellipse at 72% 32%, rgba(55,138,221,0.82) 0%, transparent 52%),
    radial-gradient(ellipse at 22% 72%, rgba(24,95,165,0.90) 0%, transparent 52%),
    radial-gradient(ellipse at 50% 88%, rgba(12,68,124,0.65) 0%, transparent 58%),
    radial-gradient(ellipse at 85% 75%, rgba(181,212,244,0.35) 0%, transparent 36%),
    #042C53`,

  technology: `
    radial-gradient(ellipse at 62% 38%, rgba(99,102,241,0.75) 0%, transparent 52%),
    radial-gradient(ellipse at 18% 82%, rgba(51,65,85,0.90) 0%, transparent 52%),
    radial-gradient(ellipse at 80% 78%, rgba(30,41,59,0.70) 0%, transparent 58%),
    radial-gradient(ellipse at 38% 12%, rgba(148,163,184,0.35) 0%, transparent 38%),
    #0F172A`,

  business: `
    radial-gradient(ellipse at 68% 28%, rgba(250,199,117,0.80) 0%, transparent 52%),
    radial-gradient(ellipse at 18% 72%, rgba(239,159,39,0.90) 0%, transparent 52%),
    radial-gradient(ellipse at 48% 88%, rgba(186,117,23,0.68) 0%, transparent 58%),
    radial-gradient(ellipse at 82% 78%, rgba(133,56,6,0.55) 0%, transparent 42%),
    #412402`,

  breaking: `
    radial-gradient(ellipse at 48% 28%, rgba(255,80,80,0.82) 0%, transparent 52%),
    radial-gradient(ellipse at 18% 78%, rgba(208,2,27,0.90) 0%, transparent 52%),
    radial-gradient(ellipse at 80% 62%, rgba(139,0,16,0.68) 0%, transparent 58%),
    radial-gradient(ellipse at 70% 12%, rgba(255,140,140,0.38) 0%, transparent 38%),
    #3D0008`,

  world: `
    radial-gradient(ellipse at 35% 65%, rgba(100,116,139,0.82) 0%, transparent 52%),
    radial-gradient(ellipse at 75% 28%, rgba(71,85,105,0.90) 0%, transparent 52%),
    radial-gradient(ellipse at 58% 85%, rgba(30,41,59,0.65) 0%, transparent 58%),
    radial-gradient(ellipse at 15% 18%, rgba(148,163,184,0.40) 0%, transparent 38%),
    #0F172A`,

  entertainment: `
    radial-gradient(ellipse at 30% 30%, rgba(167,139,250,0.80) 0%, transparent 52%),
    radial-gradient(ellipse at 75% 72%, rgba(99,102,241,0.90) 0%, transparent 52%),
    radial-gradient(ellipse at 55% 55%, rgba(67,56,202,0.68) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 15%, rgba(196,181,253,0.40) 0%, transparent 38%),
    #1e1b4b`,

  sports: `
    radial-gradient(ellipse at 22% 75%, rgba(93,202,165,0.75) 0%, transparent 52%),
    radial-gradient(ellipse at 78% 22%, rgba(15,110,86,0.90) 0%, transparent 52%),
    radial-gradient(ellipse at 55% 55%, rgba(4,52,44,0.72) 0%, transparent 62%),
    radial-gradient(ellipse at 65% 80%, rgba(159,225,203,0.38) 0%, transparent 38%),
    #04342C`,
};

const FALLBACK_MESH = `
  radial-gradient(ellipse at 30% 70%, rgba(71,85,105,0.85) 0%, transparent 52%),
  radial-gradient(ellipse at 75% 25%, rgba(30,41,59,0.90) 0%, transparent 52%),
  #0F172A`;

// Topic → Lucide icon component
type IconComponent = React.FC<LucideProps>;
const TOPIC_ICONS: Record<string, IconComponent> = {
  affiliate:           Link2,
  seo:                 Search,
  technology:          Cpu,
  business:            TrendingUp,
  "digital-marketing": Megaphone,
  breaking:            Zap,
  world:               Globe,
  entertainment:       Film,
  sports:              Trophy,
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

const VISIBLE = 3;
const GAP = 20;

interface Props {
  articles: CachedArticle[];
}

export default function LatestNewsCarousel({ articles }: Props) {
  const [page, setPage] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const total = articles.length;
  const pageCount = Math.ceil(total / VISIBLE);

  const scrollToPage = useCallback((p: number) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollTo({ left: p * (el.offsetWidth + GAP), behavior: "smooth" });
    setPage(p);
  }, []);

  const prev = useCallback(() => scrollToPage(Math.max(0, page - 1)), [page, scrollToPage]);
  const next = useCallback(() => scrollToPage(Math.min(pageCount - 1, page + 1)), [page, pageCount, scrollToPage]);

  useEffect(() => {
    if (pageCount <= 1) return;
    const t = setInterval(() => {
      setPage((p) => {
        const nextPage = p >= pageCount - 1 ? 0 : p + 1;
        const el = viewportRef.current;
        if (el) el.scrollTo({ left: nextPage * (el.offsetWidth + GAP), behavior: "smooth" });
        return nextPage;
      });
    }, 6000);
    return () => clearInterval(t);
  }, [pageCount]);

  if (!total) return null;

  return (
    <section style={{ borderTop: "3px solid #121212", paddingTop: "1.25rem", paddingBottom: "3rem" }}>
      {/* Shared SVG filter — defines fractal noise once for all placeholder thumbnails */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          <filter id="carousel-grain" x="0%" y="0%" width="100%" height="100%"
            colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4"
              stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
            <feBlend in="SourceGraphic" in2="grey" mode="overlay" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem", gap: "0.75rem", flexWrap: "wrap" }}>
        <h2 style={{
          fontFamily: SERIF,
          fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
          fontWeight: 700, color: "#121212",
          lineHeight: 1.1, letterSpacing: "-0.01em",
        }}>
          Latest News
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {pageCount > 1 && (
            <>
              <NavButton onClick={prev} disabled={page === 0} label="Previous page">
                <ChevronLeft size={15} />
              </NavButton>
              <NavButton onClick={next} disabled={page >= pageCount - 1} label="Next page">
                <ChevronRight size={15} />
              </NavButton>
            </>
          )}
          <Link
            href="/news"
            style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: SANS, fontSize: "0.75rem", fontWeight: 600, color: "#555", textDecoration: "none" }}
            className="hover:text-black"
          >
            All news <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      <p style={{ fontFamily: BODY, fontSize: "0.9375rem", fontStyle: "italic", color: "#6e6e6e", marginBottom: "0.75rem" }}>
        The latest from across the affiliate marketing industry.
      </p>
      <div style={{ height: "1px", backgroundColor: "#dfdfdf", marginBottom: "1.5rem" }} />

      {/* ── Track ──────────────────────────────────────────── */}
      <div
        ref={viewportRef}
        className="hide-scrollbar"
        style={{
          display: "flex",
          gap: `${GAP}px`,
          overflowX: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            style={{
              flex: `0 0 calc((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})`,
              minWidth: "220px",
              scrollSnapAlign: "start",
            }}
          >
            <CarouselCard article={article} />
          </div>
        ))}
      </div>

      {/* ── Dots ───────────────────────────────────────────── */}
      {pageCount > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.375rem", marginTop: "1.25rem" }}>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              aria-label={`Go to page ${i + 1}`}
              style={{
                width: i === page ? "1.5rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "9999px",
                backgroundColor: i === page ? "#121212" : "#dfdfdf",
                border: "none", padding: 0, cursor: "pointer",
                transition: "width 0.25s ease, background-color 0.25s ease",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ── Nav button ──────────────────────────────────────────────

function NavButton({ onClick, disabled, label, children }: {
  onClick: () => void; disabled: boolean; label: string; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick} disabled={disabled} aria-label={label}
      style={{
        width: "2rem", height: "2rem", borderRadius: "50%",
        border: `1.5px solid ${disabled ? "#f0f0f0" : "#dfdfdf"}`,
        backgroundColor: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        color: disabled ? "#dfdfdf" : "#333",
        transition: "border-color 0.15s, color 0.15s",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

// ── Placeholder thumbnail ────────────────────────────────────

function ImagePlaceholder({ topic }: { topic: string }) {
  const Icon = TOPIC_ICONS[topic] ?? Newspaper;
  const mesh = TOPIC_MESH[topic] ?? FALLBACK_MESH;

  return (
    <div style={{ position: "absolute", inset: 0, background: mesh }}>
      {/* Grain overlay — references the shared SVG filter */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: 0.08,
          mixBlendMode: "overlay",
        }}
      />
      {/* Radial vignette — pulls focus to centre */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 40%, transparent 25%, rgba(0,0,0,0.45) 100%)",
      }} />
      {/* Light specular highlight — top-left corner */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.12) 0%, transparent 55%)",
      }} />
      {/* Topic icon — centred, ghosted */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={52} strokeWidth={0.9} color="rgba(255,255,255,0.18)" />
      </div>
      {/* Topic label — bottom left */}
      <span style={{
        position: "absolute", bottom: "0.625rem", left: "0.75rem",
        fontFamily: SANS,
        fontSize: "0.5625rem",
        fontWeight: 700,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.55)",
      }}>
        {TOPIC_LABELS[topic] ?? topic}
      </span>
    </div>
  );
}

// ── Individual card ─────────────────────────────────────────

function CarouselCard({ article }: { article: CachedArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group"
      style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none" }}
    >
      {/* Thumbnail */}
      <div style={{
        position: "relative", height: "168px",
        overflow: "hidden", marginBottom: "0.875rem", flexShrink: 0,
      }}>
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            unoptimized
          />
        ) : (
          <ImagePlaceholder topic={article.topic} />
        )}
        {/* Subtle hover-darkening scrim */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundColor: "rgba(0,0,0,0)",
          transition: "background-color 0.3s",
        }}
          className="group-hover:bg-black/10"
        />
      </div>

      {/* Topic + age */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{
          fontFamily: SANS, fontSize: "0.625rem", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", color: "#185FA5",
        }}>
          {TOPIC_LABELS[article.topic] ?? article.topic}
        </span>
        <span style={{ fontFamily: SANS, fontSize: "0.6875rem", color: "#888" }}>
          {timeAgo(article.published_at)}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: SERIF, fontSize: "1rem", fontWeight: 700,
          color: "#121212", lineHeight: 1.35, marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
          display: "-webkit-box", WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical", overflow: "hidden",
          transition: "color 0.15s",
        }}
        className="group-hover:text-gray-600"
      >
        {article.title}
      </h3>

      {/* Description */}
      {article.description && (
        <p style={{
          fontFamily: BODY, fontSize: "0.875rem", fontStyle: "italic",
          color: "#555", lineHeight: 1.6,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
          marginBottom: "0.75rem", flex: 1,
        }}>
          {article.description}
        </p>
      )}

      {/* Footer */}
      <div style={{
        marginTop: "auto", borderTop: "1px solid #f0f0f0",
        paddingTop: "0.625rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: SANS, fontSize: "0.6875rem", fontWeight: 600, color: "#888" }}>
          {article.source_name}
        </span>
        <span
          style={{ fontFamily: SANS, fontSize: "0.6875rem", color: "#185FA5", fontWeight: 500 }}
          className="group-hover:underline"
        >
          Read →
        </span>
      </div>
    </Link>
  );
}
