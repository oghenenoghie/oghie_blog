import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/marketing/HeroSection";
import NewsCard from "@/components/blog/NewsCard";
import Image from "next/image";
import Link from "next/link";
import { getLatestPosts } from "@/sanity/lib/queries";
import { getCategoriesWithPosts } from "@/sanity/lib/queries";
import { getAllCachedNews } from "@/lib/gnews";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Mail, Rss } from "lucide-react";
import type { PostCardData } from "@/components/blog/PostCard";

export const revalidate = 1800;

// Fallback taglines for categories that have no description in Sanity
const FALLBACK_TAGLINES: Record<string, string> = {
  "getting-approved": "Proven strategies and scripts to win acceptance from top affiliate programs.",
  "programs": "The highest-paying affiliate programs worth promoting right now.",
  "traffic": "Proven methods to drive targeted, high-converting visitors to your affiliate content.",
  "seo": "Search engine tactics built specifically for affiliate content that converts.",
  "tools": "Software, platforms, and tools that make affiliate marketing faster and more profitable.",
  "passive-income": "Building automated income streams that generate revenue while you sleep.",
};

interface CategoryWithPosts {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  color?: string;
  posts: PostCardData[];
}

const SERIF = "var(--font-display), 'Libre Baskerville', Georgia, serif";
const BODY  = "var(--font-body), Georgia, 'Times New Roman', serif";
const SANS  = "var(--font-sans), system-ui, sans-serif";

function CategorySection({ category }: { category: CategoryWithPosts }) {
  const { title, slug, description, posts } = category;
  const tagline = description || FALLBACK_TAGLINES[slug.current] || "";
  const href = `/blog/categories/${slug.current}`;

  if (!posts.length) return null;

  const [lead, ...supporting] = posts;

  return (
    <section style={{ paddingBottom: "3rem" }}>
      {/* Section header */}
      <div style={{ borderTop: "3px solid #121212", paddingTop: "1.25rem", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            href={href}
            style={{ textDecoration: "none" }}
          >
            <h2 style={{
              fontFamily: SERIF,
              fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
              fontWeight: 700,
              color: "#121212",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}>
              {title}
            </h2>
          </Link>
          <Link
            href={href}
            style={{
              display: "flex", alignItems: "center", gap: "0.25rem",
              fontFamily: SANS,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#555",
              textDecoration: "none",
              whiteSpace: "nowrap",
              letterSpacing: "0.02em",
            }}
            className="hover:text-black"
          >
            See all <ArrowRight size={12} />
          </Link>
        </div>

        {tagline && (
          <p style={{
            fontFamily: BODY,
            fontSize: "0.9375rem",
            fontStyle: "italic",
            color: "#6e6e6e",
            lineHeight: 1.55,
            marginTop: "0.375rem",
            maxWidth: "72ch",
          }}>
            {tagline}
          </p>
        )}
      </div>

      <div style={{ height: "1px", backgroundColor: "#dfdfdf", marginBottom: "1.5rem" }} />

      {/* Articles: lead (left) + supporting stack (right) */}
      <div style={{ display: "grid", gap: "2rem" }} className="md:grid-cols-[3fr_2fr]">

        {/* Lead article */}
        <Link
          href={`/blog/${lead.slug.current}`}
          className="group"
          style={{ textDecoration: "none", display: "block" }}
        >
          {lead.mainImage?.asset?.url && (
            <div style={{ position: "relative", height: "220px", overflow: "hidden", marginBottom: "1rem" }}>
              <Image
                src={lead.mainImage.asset.url}
                alt={lead.mainImage.alt ?? lead.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          )}
          <h3 style={{
            fontFamily: SERIF,
            fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
            fontWeight: 700,
            color: "#121212",
            lineHeight: 1.2,
            marginBottom: "0.625rem",
            letterSpacing: "-0.01em",
            transition: "color 0.15s",
          }}
            className="group-hover:text-gray-600"
          >
            {lead.title}
          </h3>
          {lead.excerpt && (
            <p style={{
              fontFamily: BODY,
              fontSize: "0.9375rem",
              fontStyle: "italic",
              color: "#555",
              lineHeight: 1.65,
              marginBottom: "0.75rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {lead.excerpt}
            </p>
          )}
          <div style={{
            fontFamily: SANS,
            fontSize: "0.75rem",
            color: "#888",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
          }}>
            {lead.author?.name && <span>{lead.author.name}</span>}
            {lead.publishedAt && (
              <>
                {lead.author?.name && <span style={{ color: "#dfdfdf" }}>·</span>}
                <span>{formatDate(lead.publishedAt)}</span>
              </>
            )}
            {lead.estimatedReadingTime && (
              <>
                <span style={{ color: "#dfdfdf" }}>·</span>
                <span>{lead.estimatedReadingTime} min read</span>
              </>
            )}
          </div>
        </Link>

        {/* Supporting articles */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {supporting.slice(0, 3).map((post, i) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group"
              style={{
                display: "flex",
                gap: "0.875rem",
                textDecoration: "none",
                padding: i === 0 ? "0 0 1rem" : "1rem 0",
                borderBottom: i < Math.min(supporting.length, 3) - 1 ? "1px solid #dfdfdf" : "none",
                alignItems: "flex-start",
              }}
            >
              {post.mainImage?.asset?.url && (
                <div style={{ position: "relative", width: "80px", height: "60px", flexShrink: 0, overflow: "hidden" }}>
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.mainImage.alt ?? post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{
                  fontFamily: SERIF,
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "#121212",
                  lineHeight: 1.3,
                  marginBottom: "0.375rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  transition: "color 0.15s",
                }}
                  className="group-hover:text-gray-600"
                >
                  {post.title}
                </h4>
                <div style={{ fontFamily: SANS, fontSize: "0.6875rem", color: "#888", display: "flex", gap: "0.3rem", alignItems: "center" }}>
                  {post.author?.name && <span>{post.author.name}</span>}
                  {post.publishedAt && (
                    <>
                      {post.author?.name && <span style={{ color: "#dfdfdf" }}>·</span>}
                      <span>{formatDate(post.publishedAt)}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [posts, newsItems, categoriesWithPosts] = await Promise.allSettled([
    getLatestPosts(4),
    getAllCachedNews(6),
    getCategoriesWithPosts(4),
  ]);

  const latestPosts: PostCardData[] = posts.status === "fulfilled" ? posts.value : [];
  const latestNews = newsItems.status === "fulfilled" ? newsItems.value : [];
  const categories: CategoryWithPosts[] = categoriesWithPosts.status === "fulfilled" ? categoriesWithPosts.value : [];

  const featuredPost = latestPosts[0] ?? null;
  const secondaryPosts = latestPosts.slice(1, 4);

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: "#ffffff" }}>
        {/* ── Hero ────────────────────────────────────────────── */}
        <HeroSection featured={featuredPost} secondary={secondaryPosts} />

        {/* ── Category sections + sidebar ─────────────────────── */}
        <div className="container-blog" style={{ paddingTop: "3rem", paddingBottom: "2rem" }}>
          <div style={{ display: "grid", gap: "3rem" }} className="md:grid-cols-[1fr_300px]">

            {/* Left column: category sections */}
            <div>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <CategorySection key={cat._id} category={cat} />
                ))
              ) : (
                /* Fallback: show all-articles prompt */
                <div style={{ padding: "4rem 0", color: "#888", textAlign: "center" }}>
                  <p style={{ fontFamily: BODY, fontSize: "1.125rem", fontStyle: "italic", marginBottom: "0.5rem" }}>
                    No posts yet — create your first in{" "}
                    <Link href="/studio" style={{ color: "#326891" }}>Sanity Studio</Link>.
                  </p>
                </div>
              )}

              {/* Trending news below category sections */}
              {latestNews.length > 0 && (
                <section style={{ borderTop: "3px solid #121212", paddingTop: "1.25rem", paddingBottom: "3rem" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <h2 style={{ fontFamily: SERIF, fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)", fontWeight: 700, color: "#121212", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                      Trending News
                    </h2>
                    <Link href="/news" style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: SANS, fontSize: "0.75rem", fontWeight: 600, color: "#555", textDecoration: "none" }} className="hover:text-black">
                      All news <ArrowRight size={12} />
                    </Link>
                  </div>
                  <p style={{ fontFamily: BODY, fontSize: "0.9375rem", fontStyle: "italic", color: "#6e6e6e", marginBottom: "0.75rem" }}>
                    The latest from across the affiliate marketing industry.
                  </p>
                  <div style={{ height: "1px", backgroundColor: "#dfdfdf", marginBottom: "1.5rem" }} />
                  <div style={{ display: "grid", gap: "1rem" }} className="sm:grid-cols-2 lg:grid-cols-3">
                    {latestNews.slice(0, 6).map((article) => (
                      <NewsCard key={article.slug} article={article} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }} className="hidden md:flex">

              {/* Newsletter widget */}
              <div style={{ borderTop: "3px solid #121212", paddingTop: "1.25rem" }}>
                <p style={{ fontFamily: SANS, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", marginBottom: "0.75rem" }}>
                  Free Newsletter
                </p>
                <h3 style={{ fontFamily: SERIF, fontSize: "1.25rem", fontWeight: 700, color: "#121212", marginBottom: "0.5rem", lineHeight: 1.2 }}>
                  Affiliate Insider
                </h3>
                <p style={{ fontFamily: BODY, fontSize: "0.875rem", fontStyle: "italic", color: "#555", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                  New programs, approval tips, and traffic strategies — every week, straight to your inbox.
                </p>
                <Link
                  href="/subscribe"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                    padding: "0.625rem 1rem",
                    backgroundColor: "#121212",
                    color: "#ffffff",
                    fontFamily: SANS,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  <Mail size={13} /> Subscribe — Free
                </Link>
              </div>

              {/* Latest news compact */}
              {latestNews.length > 0 && (
                <div>
                  <div style={{ borderTop: "3px solid #121212", paddingTop: "1.25rem", marginBottom: "0.875rem" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                      <h3 style={{ fontFamily: SERIF, fontSize: "1.125rem", fontWeight: 700, color: "#121212" }}>
                        Latest News
                      </h3>
                      <Link href="/news" style={{ fontFamily: SANS, fontSize: "0.6875rem", color: "#555", textDecoration: "none" }} className="hover:text-black">
                        All →
                      </Link>
                    </div>
                  </div>
                  {latestNews.slice(0, 5).map((article) => (
                    <NewsCard key={article.slug} article={article} variant="compact" />
                  ))}
                </div>
              )}

              {/* Topics cloud */}
              <div>
                <div style={{ borderTop: "3px solid #121212", paddingTop: "1.25rem", marginBottom: "1rem" }}>
                  <h3 style={{ fontFamily: SERIF, fontSize: "1.125rem", fontWeight: 700, color: "#121212" }}>
                    Topics
                  </h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                  {[
                    { label: "Getting Approved",   href: "/blog/categories/getting-approved" },
                    { label: "Best Programs",      href: "/blog/categories/programs" },
                    { label: "Traffic Strategies", href: "/blog/categories/traffic" },
                    { label: "SEO",                href: "/blog/categories/seo" },
                    { label: "Tools & Reviews",    href: "/blog/categories/tools" },
                    { label: "Passive Income",     href: "/blog/categories/passive-income" },
                  ].map((topic) => (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      style={{
                        fontFamily: SANS,
                        fontSize: "0.875rem",
                        color: "#333",
                        textDecoration: "none",
                        padding: "0.625rem 0",
                        borderBottom: "1px solid #f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      className="hover:text-black"
                    >
                      {topic.label}
                      <span style={{ color: "#dfdfdf" }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>

        {/* ── Newsletter strip ──────────────────────────────── */}
        <section style={{
          backgroundColor: "#111111",
          borderTop: "3px solid #ffffff",
          padding: "3.5rem 0",
        }}>
          <div className="container-blog" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <div style={{ maxWidth: "480px" }}>
              <p style={{ fontFamily: SANS, fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" }}>
                Free Weekly Newsletter
              </p>
              <h2 style={{ fontFamily: SERIF, fontSize: "1.75rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>
                Affiliate Programs Worth Joining — Every Week
              </h2>
              <p style={{ fontFamily: BODY, fontSize: "1rem", fontStyle: "italic", color: "#888", lineHeight: 1.65 }}>
                New high-paying programs, approval strategies, and traffic tips delivered free.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link
                href="/subscribe"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.875rem 2rem",
                  backgroundColor: "#ffffff",
                  color: "#111111",
                  fontFamily: SANS,
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <Mail size={15} /> Get free insights
              </Link>
              <Link
                href="/blog"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.875rem 2rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  fontFamily: SANS,
                  fontWeight: 500,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                }}
              >
                <Rss size={15} /> Browse the blog
              </Link>
            </div>
          </div>
        </section>

        {/* ── Affiliate disclosure ──────────────────────────── */}
        <div className="container-blog" style={{ padding: "1.25rem 0" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.8125rem", color: "#888", lineHeight: 1.6 }}>
            <strong style={{ color: "#555" }}>Affiliate Disclosure:</strong>{" "}
            Some links on this page may be affiliate links. If you click and purchase through them, we may earn a commission at no extra cost to you. We only recommend products we use or have thoroughly researched.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
