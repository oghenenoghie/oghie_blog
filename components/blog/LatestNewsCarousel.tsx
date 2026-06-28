"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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

// Gradient shown when a card has no image or the image fails to load
const TOPIC_GRADIENTS: Record<string, string> = {
  "digital-marketing": "linear-gradient(135deg, #185FA5 0%, #0C447C 100%)",
  affiliate:           "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)",
  seo:                 "linear-gradient(135deg, #378ADD 0%, #185FA5 100%)",
  technology:          "linear-gradient(135deg, #334155 0%, #0F172A 100%)",
  business:            "linear-gradient(135deg, #EF9F27 0%, #BA7517 100%)",
  breaking:            "linear-gradient(135deg, #d0021b 0%, #8B0010 100%)",
  world:               "linear-gradient(135deg, #475569 0%, #1E293B 100%)",
  entertainment:       "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
  sports:              "linear-gradient(135deg, #0F6E56 0%, #04342C 100%)",
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

// Cards visible per page on desktop
const VISIBLE = 3;
const GAP = 20; // px (1.25rem)

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
    // scrollLeft for page p: p * VISIBLE cards, each (cardW + GAP)
    // cardW = (el.offsetWidth - (VISIBLE-1)*GAP) / VISIBLE
    // one page scroll = VISIBLE * (cardW + GAP) = el.offsetWidth + GAP
    el.scrollTo({ left: p * (el.offsetWidth + GAP), behavior: "smooth" });
    setPage(p);
  }, []);

  const prev = useCallback(() => scrollToPage(Math.max(0, page - 1)), [page, scrollToPage]);
  const next = useCallback(() => scrollToPage(Math.min(pageCount - 1, page + 1)), [page, pageCount, scrollToPage]);

  // Auto-advance every 6 s
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
      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem", gap: "0.75rem", flexWrap: "wrap" }}>
        <h2 style={{
          fontFamily: SERIF,
          fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
          fontWeight: 700,
          color: "#121212",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}>
          Latest News
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Nav arrows */}
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
            style={{
              display: "flex", alignItems: "center", gap: "0.25rem",
              fontFamily: SANS, fontSize: "0.75rem", fontWeight: 600,
              color: "#555", textDecoration: "none",
            }}
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
          /* scroll-snap lets touch users swipe naturally */
          scrollSnapType: "x mandatory",
        }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            style={{
              /* each card = 1/VISIBLE of the viewport minus gaps */
              flex: `0 0 calc((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})`,
              minWidth: "220px",
              scrollSnapAlign: "start",
            }}
          >
            <CarouselCard article={article} />
          </div>
        ))}
      </div>

      {/* ── Dot indicators ─────────────────────────────────── */}
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
                border: "none",
                padding: 0,
                cursor: "pointer",
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

function NavButton({
  onClick, disabled, label, children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        width: "2rem", height: "2rem",
        borderRadius: "50%",
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

// ── Individual card ─────────────────────────────────────────

function CarouselCard({ article }: { article: CachedArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group"
      style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none" }}
    >
      {/* Image — gradient placeholder always visible; photo layers on top */}
      <div style={{
        position: "relative",
        height: "160px",
        overflow: "hidden",
        marginBottom: "0.875rem",
        flexShrink: 0,
        background: TOPIC_GRADIENTS[article.topic] ?? "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
      }}>
        {/* Placeholder text centred on the gradient */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "0.25rem",
          opacity: article.image_url ? 0 : 1,
        }}>
          <span style={{
            fontFamily: SANS,
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}>
            {TOPIC_LABELS[article.topic] ?? article.topic}
          </span>
        </div>
        {/* Photo overlays the gradient when available */}
        {article.image_url && (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            unoptimized
          />
        )}
      </div>

      {/* Topic + age */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{
          fontFamily: SANS,
          fontSize: "0.625rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#185FA5",
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
          fontFamily: SERIF,
          fontSize: "1rem",
          fontWeight: 700,
          color: "#121212",
          lineHeight: 1.35,
          marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          transition: "color 0.15s",
        }}
        className="group-hover:text-gray-600"
      >
        {article.title}
      </h3>

      {/* Description */}
      {article.description && (
        <p style={{
          fontFamily: BODY,
          fontSize: "0.875rem",
          fontStyle: "italic",
          color: "#555",
          lineHeight: 1.6,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          marginBottom: "0.75rem",
          flex: 1,
        }}>
          {article.description}
        </p>
      )}

      {/* Footer */}
      <div style={{
        marginTop: "auto",
        borderTop: "1px solid #f0f0f0",
        paddingTop: "0.625rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
