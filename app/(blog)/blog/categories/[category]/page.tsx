import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostsByCategory, getAllCategories } from "@/sanity/lib/queries";
import PostCard, { type PostCardData } from "@/components/blog/PostCard";
import { Badge } from "@/components/ui/badge";

export const revalidate = 1800;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat: { slug: { current: string } }) => ({
    category: cat.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${label} | Oghie Blog`,
    description: `Digital marketing articles about ${label} — strategies, guides, and expert insights.`,
    alternates: { canonical: `/blog/categories/${category}` },
    openGraph: {
      title: `${label} — Oghie Blog`,
      description: `Digital marketing articles about ${label} — strategies, guides, and expert insights.`,
      url: `/blog/categories/${category}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const [posts, categories] = await Promise.allSettled([
    getPostsByCategory(category, 24),
    getAllCategories(),
  ]);

  const allPosts: PostCardData[] = posts.status === "fulfilled" ? posts.value : [];
  const allCategories = categories.status === "fulfilled" ? categories.value : [];

  // Find current category label
  const currentCat = allCategories.find(
    (c: { slug: { current: string } }) => c.slug.current === category
  );
  if (!currentCat && allPosts.length === 0) notFound();

  const label = currentCat?.title ?? category.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <>
      {/* Header */}
      <div style={{ backgroundColor: "var(--color-navy-900)", paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div className="container-blog">
          <Link
            href="/blog"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "var(--color-navy-400)", textDecoration: "none", marginBottom: "1.25rem" }}
            className="hover:text-white"
          >
            <ArrowLeft size={14} /> All Articles
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div style={{ width: "3px", height: "24px", backgroundColor: "var(--color-gold-500)", borderRadius: "1px" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold-500)" }}>
              Category
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>
            {label}
          </h1>
          <p style={{ color: "var(--color-navy-400)", fontSize: "0.9375rem" }}>
            {allPosts.length} article{allPosts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Category filter pills */}
      {allCategories.length > 0 && (
        <div style={{ backgroundColor: "#fff", borderBottom: "1px solid var(--color-navy-100)", padding: "0.875rem 0" }}>
          <div className="container-blog" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/blog" style={{ textDecoration: "none" }}>
              <Badge variant="outline">All</Badge>
            </Link>
            {allCategories.map((cat: { _id: string; title: string; slug: { current: string } }) => (
              <Link key={cat._id} href={`/blog/categories/${cat.slug.current}`} style={{ textDecoration: "none" }}>
                <Badge variant={cat.slug.current === category ? "navy" : "outline"}>
                  {cat.title}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Posts */}
      <div style={{ padding: "3rem 0", backgroundColor: "var(--color-navy-50)", minHeight: "50vh" }}>
        <div className="container-blog">
          {allPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem 0", color: "var(--color-navy-400)" }}>
              <p style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>No posts in this category yet.</p>
              <Link href="/blog" style={{ color: "var(--color-signal-700)", fontSize: "0.9375rem" }}>
                Browse all articles →
              </Link>
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
