import PostCard, { type PostCardData } from "@/components/blog/PostCard";
import { getLatestPosts, getAllCategories } from "@/sanity/lib/queries";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Blog | Oghie Blog — Affiliate Marketing Guides & Program Reviews",
  description: "Guides to finding affiliate programs, getting approved, driving traffic, and earning commissions.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.allSettled([
    getLatestPosts(24),
    getAllCategories(),
  ]);

  const allPosts: PostCardData[] = posts.status === "fulfilled" ? posts.value : [];
  const allCategories = categories.status === "fulfilled" ? categories.value : [];

  return (
    <>
      {/* Header */}
      <div style={{ backgroundColor: "var(--color-navy-900)", paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
        <div className="container-blog" style={{ textAlign: "center" }}>
          <Badge variant="gold" style={{ marginBottom: "1rem" }}>The Blog</Badge>
          <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "1rem" }}>
            Affiliate Marketing Guides
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "var(--color-navy-300)", maxWidth: "50ch", margin: "0 auto" }}>
            Practical guides, honest reviews, and data-driven strategies to grow your online income.
          </p>
        </div>
      </div>

      {/* Category filter */}
      {allCategories.length > 0 && (
        <div style={{ backgroundColor: "#fff", borderBottom: "1px solid var(--color-navy-100)", padding: "0.875rem 0" }}>
          <div className="container-blog" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/blog" style={{ textDecoration: "none" }}>
              <Badge variant="navy">All</Badge>
            </Link>
            {allCategories.map((cat: { _id: string; title: string; slug: { current: string } }) => (
              <Link key={cat._id} href={`/blog/categories/${cat.slug.current}`} style={{ textDecoration: "none" }}>
                <Badge variant="outline">{cat.title}</Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Posts grid */}
      <div style={{ padding: "3.5rem 0" }}>
        <div className="container-blog">
          {allPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem 0", color: "var(--color-navy-400)" }}>
              <p style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>No posts yet.</p>
              <p style={{ fontSize: "0.9375rem" }}>Check back soon — new content is on the way.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {allPosts.map((post, i) => (
                <PostCard key={post._id} post={post} featured={i === 0 && allPosts.length >= 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
