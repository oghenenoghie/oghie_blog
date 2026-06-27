import PostCard, { type PostCardData } from "@/components/blog/PostCard";
import BlogCarousel from "@/components/blog/BlogCarousel";
import { getLatestPosts } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Blog | Oghie Blog — Affiliate Marketing Guides & Program Reviews",
  description: "Guides to finding affiliate programs, getting approved, driving traffic, and earning commissions.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Oghie Blog — Affiliate Marketing Guides & Program Reviews",
    description: "Guides to finding affiliate programs, getting approved, driving traffic, and earning commissions.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getLatestPosts(24).catch(() => []);
  const allPosts: PostCardData[] = posts;

  const carouselPosts = allPosts.slice(0, 6);
  const gridPosts = allPosts.slice(6);

  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* ── Section header ────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid #dfdfdf", padding: "2.5rem 0 2rem" }}>
        <div className="container-blog">
          <div className="nyt-rule-heavy" style={{ maxWidth: "48px", marginBottom: "0.625rem" }} />
          <h1 style={{
            fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            color: "#121212",
            lineHeight: 1.1,
            marginBottom: "0.75rem",
            letterSpacing: "-0.01em",
          }}>
            Affiliate Marketing
          </h1>
          <p style={{
            fontFamily: "var(--font-body), Georgia, serif",
            fontSize: "1.0625rem",
            color: "#6e6e6e",
            fontStyle: "italic",
            maxWidth: "52ch",
            lineHeight: 1.6,
          }}>
            Practical guides, honest reviews, and data-driven strategies to grow your online income.
          </p>
        </div>
      </div>

      {allPosts.length === 0 ? (
        <div style={{ padding: "6rem 0", textAlign: "center", color: "#888" }}>
          <p style={{
            fontFamily: "var(--font-body), Georgia, serif",
            fontSize: "1.125rem",
            fontStyle: "italic",
            marginBottom: "0.5rem",
          }}>
            No posts yet.
          </p>
          <p style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", fontSize: "0.9375rem" }}>
            Check back soon — new content is on the way.
          </p>
        </div>
      ) : (
        <>
          {/* ── Featured carousel ─────────────────────────── */}
          <div style={{ padding: "2.5rem 0 2rem" }}>
            <div className="container-blog">
              <BlogCarousel posts={carouselPosts} title="Latest Stories" />
            </div>
          </div>

          {/* ── Remaining posts grid ──────────────────────── */}
          {gridPosts.length > 0 && (
            <div style={{ padding: "0 0 5rem" }}>
              <div className="container-blog">
                <div style={{
                  borderTop: "3px solid #121212",
                  paddingTop: "1.25rem",
                  marginBottom: "1.5rem",
                }}>
                  <h2 style={{
                    fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    fontWeight: 700,
                    color: "#121212",
                    letterSpacing: "-0.01em",
                  }}>
                    More Stories
                  </h2>
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "0",
                }}>
                  {gridPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
