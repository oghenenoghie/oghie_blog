import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/marketing/HeroSection";
import NewsCard from "@/components/blog/NewsCard";
import PostCard, { type PostCardData } from "@/components/blog/PostCard";
import { getLatestPosts } from "@/sanity/lib/queries";
import { getAllCachedNews } from "@/lib/gnews";
import Link from "next/link";
import { ArrowRight, Mail, BookOpen, Rss } from "lucide-react";

export const revalidate = 1800;

function SectionHeader({ label, href, linkLabel = "View all" }: { label: string; href: string; linkLabel?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
        <div style={{ width: "3px", height: "18px", backgroundColor: "var(--color-gold-500)", borderRadius: "1px" }} />
        <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-navy-700)" }}>
          {label}
        </span>
      </div>
      <Link
        href={href}
        style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-signal-700)", textDecoration: "none" }}
        className="hover:underline"
      >
        {linkLabel} <ArrowRight size={13} />
      </Link>
    </div>
  );
}

export default async function HomePage() {
  const [posts, newsItems] = await Promise.allSettled([
    getLatestPosts(9),
    getAllCachedNews(6),
  ]);

  const latestPosts: PostCardData[] = posts.status === "fulfilled" ? posts.value : [];
  const latestNews = newsItems.status === "fulfilled" ? newsItems.value : [];

  const featuredPost = latestPosts[0] ?? null;
  const secondaryPosts = latestPosts.slice(1, 4);
  const gridPosts = latestPosts.slice(4);

  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ────────────────────────────────────────────── */}
        <HeroSection featured={featuredPost} secondary={secondaryPosts} />

        {/* ── Main content ────────────────────────────────────── */}
        <div style={{ backgroundColor: "var(--color-navy-50)", minHeight: "60vh" }}>
          <div className="container-blog" style={{ paddingTop: "2.5rem", paddingBottom: "3rem" }}>
            <div style={{ display: "grid", gap: "2.5rem" }} className="md:grid-cols-[1fr_300px]">

              {/* Left column */}
              <div>
                {gridPosts.length > 0 ? (
                  <section>
                    <SectionHeader label="Latest Articles" href="/blog" />
                    <div style={{ display: "grid", gap: "1.25rem" }} className="sm:grid-cols-2">
                      {gridPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                      ))}
                    </div>
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                      <Link
                        href="/blog"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "0.5rem",
                          padding: "0.625rem 1.5rem",
                          border: "1px solid var(--color-navy-200)",
                          borderRadius: "0.375rem",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "var(--color-navy-700)",
                          textDecoration: "none",
                        }}
                        className="hover:border-signal-700 hover:text-signal-700"
                      >
                        <BookOpen size={15} /> Load more articles
                      </Link>
                    </div>
                  </section>
                ) : (
                  <section>
                    <SectionHeader label="Latest Articles" href="/blog" />
                    <div style={{
                      padding: "3rem 2rem",
                      backgroundColor: "#fff",
                      border: "1px solid var(--color-navy-100)",
                      borderRadius: "0.75rem",
                      textAlign: "center",
                    }}>
                      <BookOpen size={32} style={{ color: "var(--color-navy-300)", margin: "0 auto 0.75rem" }} />
                      <p style={{ color: "var(--color-navy-500)", fontSize: "0.9375rem" }}>
                        No posts yet — create your first in{" "}
                        <Link href="/studio" style={{ color: "var(--color-signal-700)" }}>Sanity Studio</Link>.
                      </p>
                    </div>
                  </section>
                )}

                {/* Industry news below grid */}
                {latestNews.length > 0 && (
                  <section style={{ marginTop: "3rem" }}>
                    <SectionHeader label="Trending News" href="/news" linkLabel="All news" />
                    <div style={{ display: "grid", gap: "1rem" }} className="sm:grid-cols-2 lg:grid-cols-3">
                      {latestNews.slice(0, 6).map((article) => (
                        <NewsCard key={article.slug} article={article} />
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }} className="hidden md:flex">
                {/* Newsletter widget */}
                <div style={{
                  backgroundColor: "var(--color-navy-900)",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <Rss size={16} style={{ color: "var(--color-gold-500)" }} />
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold-500)" }}>
                      Free Newsletter
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.125rem", fontWeight: 900, color: "#fff", marginBottom: "0.625rem", lineHeight: 1.3 }}>
                    Affiliate Insider — Free Weekly
                  </h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-navy-400)", lineHeight: 1.65, marginBottom: "1rem" }}>
                    New programs, approval tips, and traffic strategies — every week, straight to your inbox.
                  </p>
                  <Link
                    href="/subscribe"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                      padding: "0.625rem 1rem",
                      borderRadius: "0.375rem",
                      backgroundColor: "var(--color-gold-500)",
                      color: "var(--color-navy-950)",
                      fontWeight: 700,
                      fontSize: "0.8125rem",
                      textDecoration: "none",
                    }}
                  >
                    <Mail size={14} /> Subscribe — It&apos;s Free
                  </Link>
                </div>

                {/* Compact news list */}
                {latestNews.length > 0 && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem", paddingBottom: "0.625rem", borderBottom: "2px solid var(--color-navy-900)" }}>
                      <div style={{ width: "3px", height: "16px", backgroundColor: "var(--color-signal-700)", borderRadius: "1px" }} />
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-navy-700)" }}>
                        Latest News
                      </span>
                    </div>
                    {latestNews.slice(0, 5).map((article) => (
                      <NewsCard key={article.slug} article={article} variant="compact" />
                    ))}
                    <Link
                      href="/news"
                      style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.75rem", fontSize: "0.8125rem", color: "var(--color-signal-700)", textDecoration: "none", fontWeight: 500 }}
                    >
                      All news <ArrowRight size={13} />
                    </Link>
                  </div>
                )}

                {/* Topics */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem", paddingBottom: "0.625rem", borderBottom: "2px solid var(--color-navy-900)" }}>
                    <div style={{ width: "3px", height: "16px", backgroundColor: "var(--color-gold-500)", borderRadius: "1px" }} />
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-navy-700)" }}>
                      Topics
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {["Getting Approved","Best Programs","Traffic","SEO","Tools & Reviews","Passive Income","Email Marketing","Content","Strategy"].map((topic) => (
                      <Link
                        key={topic}
                        href={`/blog/categories/${topic.toLowerCase().replace(/[&\s]+/g, "-")}`}
                        style={{
                          padding: "0.3rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          color: "var(--color-navy-700)",
                          backgroundColor: "var(--color-navy-100)",
                          textDecoration: "none",
                          border: "1px solid var(--color-navy-200)",
                          transition: "all 0.15s",
                        }}
                        className="hover:bg-signal-50 hover:border-signal-700 hover:text-signal-700"
                      >
                        {topic}
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* ── Newsletter strip ──────────────────────────────── */}
        <section style={{
          background: "linear-gradient(135deg, var(--color-navy-900) 0%, #1E3A5F 100%)",
          padding: "3.5rem 0",
          borderTop: "3px solid var(--color-gold-500)",
        }}>
          <div className="container-blog" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ maxWidth: "480px" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-gold-500)", marginBottom: "0.5rem" }}>
                Free Weekly Newsletter
              </p>
              <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.625rem", fontWeight: 900, color: "#fff", lineHeight: 1.25, marginBottom: "0.625rem" }}>
                Affiliate Programs Worth Joining — Every Week
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-navy-300)", lineHeight: 1.65 }}>
                New high-paying programs, approval strategies, and traffic tips delivered free. Built for people who want to earn through affiliate marketing.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link
                href="/subscribe"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--color-gold-500)",
                  color: "var(--color-navy-950)",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  textDecoration: "none",
                }}
              >
                <Mail size={16} /> Get free insights →
              </Link>
              <Link
                href="/blog"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "0.375rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                  textDecoration: "none",
                }}
              >
                Browse the blog
              </Link>
            </div>
          </div>
        </section>

        {/* ── Affiliate disclosure ──────────────────────────── */}
        <div className="container-blog" style={{ padding: "1.25rem 0" }}>
          <p className="disclosure">
            <strong>Affiliate Disclosure:</strong> Some links on this page may be affiliate links. If you click and purchase through them, we may earn a commission at no extra cost to you. We only recommend products we use or have thoroughly researched.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
