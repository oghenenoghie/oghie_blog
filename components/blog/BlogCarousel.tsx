"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { PostCardData } from "./PostCard";

const SERIF = "var(--font-display), 'Libre Baskerville', Georgia, serif";
const BODY  = "var(--font-body), Georgia, 'Times New Roman', serif";
const SANS  = "var(--font-sans), system-ui, sans-serif";

interface Props {
  posts: PostCardData[];
  title?: string;
}

export default function BlogCarousel({ posts, title = "Latest Stories" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(posts.length > 1);

  const syncState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const scrollable = el.scrollWidth - el.clientWidth;
    setProgress(scrollable > 0 ? el.scrollLeft / scrollable : 0);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < scrollable - 8);

    // Find closest card to current scroll position
    const cards = Array.from(el.children) as HTMLElement[];
    let closestIdx = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - el.scrollLeft);
      if (dist < minDist) { minDist = dist; closestIdx = i; }
    });
    setActiveIndex(closestIdx);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncState, { passive: true });
    const id = requestAnimationFrame(syncState);
    return () => {
      el.removeEventListener("scroll", syncState);
      cancelAnimationFrame(id);
    };
  }, [syncState]);

  function scrollToCard(idx: number) {
    const el = trackRef.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const card = cards[Math.max(0, Math.min(idx, cards.length - 1))];
    if (card) el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  }

  function handlePrev() {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
  }

  function handleNext() {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
  }

  if (!posts.length) return null;

  return (
    <section aria-label={title}>
      {/* Section header */}
      <div style={{
        borderTop: "3px solid #121212",
        paddingTop: "1.25rem",
        marginBottom: "1.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}>
        <h2 style={{
          fontFamily: SERIF,
          fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
          fontWeight: 700,
          color: "#121212",
          letterSpacing: "-0.01em",
        }}>
          {title}
        </h2>

        {posts.length > 1 && (
          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
            <button
              onClick={handlePrev}
              disabled={!canPrev}
              aria-label="Previous stories"
              style={{
                width: 36, height: 36, borderRadius: "50%",
                border: `1px solid ${canPrev ? "#888" : "#e0e0e0"}`,
                background: "#fff",
                cursor: canPrev ? "pointer" : "not-allowed",
                opacity: canPrev ? 1 : 0.35,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "opacity 0.2s, border-color 0.2s",
                flexShrink: 0,
              }}
            >
              <ChevronLeft size={16} color="#121212" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canNext}
              aria-label="Next stories"
              style={{
                width: 36, height: 36, borderRadius: "50%",
                border: `1px solid ${canNext ? "#888" : "#e0e0e0"}`,
                background: "#fff",
                cursor: canNext ? "pointer" : "not-allowed",
                opacity: canNext ? 1 : 0.35,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "opacity 0.2s, border-color 0.2s",
                flexShrink: 0,
              }}
            >
              <ChevronRight size={16} color="#121212" />
            </button>
          </div>
        )}
      </div>

      {/* Scrollable card track */}
      <div
        ref={trackRef}
        className="blog-carousel-track"
        style={{
          display: "flex",
          gap: "1.5rem",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "0.25rem",
        }}
      >
        {posts.map((post) => (
          <article
            key={post._id}
            className="blog-carousel-card"
            style={{ scrollSnapAlign: "start", flexShrink: 0 }}
          >
            <Link
              href={`/blog/${post.slug.current}`}
              className="group"
              style={{ textDecoration: "none", display: "block" }}
            >
              {/* Image */}
              <div style={{
                position: "relative",
                height: "210px",
                marginBottom: "1rem",
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
              }}>
                {post.mainImage?.asset?.url ? (
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt ?? post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  />
                ) : (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, #ebebeb 0%, #d8d8d8 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      fontFamily: SANS, fontSize: "0.6875rem", color: "#aaa",
                      letterSpacing: "0.12em", textTransform: "uppercase",
                    }}>
                      No image
                    </span>
                  </div>
                )}
              </div>

              {/* Category label */}
              {post.category && (
                <p style={{
                  fontFamily: SANS, fontSize: "0.625rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  color: "#d0021b", marginBottom: "0.5rem",
                }}>
                  {post.category.title}
                </p>
              )}

              {/* Title */}
              <h3
                className="group-hover:text-gray-600 transition-colors"
                style={{
                  fontFamily: SERIF, fontSize: "1.0625rem", fontWeight: 700,
                  color: "#121212", lineHeight: 1.25, letterSpacing: "-0.01em",
                  marginBottom: "0.5rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p style={{
                  fontFamily: BODY, fontSize: "0.9rem", color: "#555",
                  lineHeight: 1.6, fontStyle: "italic",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  marginBottom: "0.875rem",
                }}>
                  {post.excerpt}
                </p>
              )}

              {/* Byline */}
              <div style={{
                display: "flex", alignItems: "center", gap: "0.375rem",
                fontFamily: SANS, fontSize: "0.75rem", color: "#888",
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
            </Link>
          </article>
        ))}
      </div>

      {/* Dot indicators (≤ 6 posts) or progress bar */}
      {posts.length > 1 && (
        <div style={{ marginTop: "1.75rem" }}>
          {posts.length <= 6 ? (
            <div style={{
              display: "flex", justifyContent: "center",
              alignItems: "center", gap: "0.375rem",
            }}>
              {posts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to story ${i + 1}`}
                  style={{
                    height: "3px", borderRadius: "9999px",
                    border: "none", cursor: "pointer", padding: 0,
                    width: activeIndex === i ? "1.5rem" : "0.4375rem",
                    backgroundColor: activeIndex === i ? "#121212" : "#dfdfdf",
                    transition: "width 0.3s ease, background-color 0.3s ease",
                  }}
                />
              ))}
            </div>
          ) : (
            <div style={{
              height: "2px", backgroundColor: "#dfdfdf",
              borderRadius: "9999px", overflow: "hidden",
            }}>
              <div style={{
                height: "100%", backgroundColor: "#121212",
                borderRadius: "9999px",
                width: `${Math.max(8, progress * 100)}%`,
                transition: "width 0.15s ease",
              }} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
