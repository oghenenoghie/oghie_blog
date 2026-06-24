import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getLatestPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PortableText from "@/components/blog/PortableText";
import PostCard, { type PostCardData } from "@/components/blog/PostCard";
import NewsletterForm from "@/components/marketing/NewsletterForm";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Oghie Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getLatestPosts(50);
  return posts.map((p: PostCardData) => ({ slug: p.slug.current }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug),
    getLatestPosts(4),
  ]);

  if (!post) notFound();

  const related = (relatedPosts as PostCardData[]).filter((p) => p.slug.current !== slug).slice(0, 3);

  return (
    <article style={{ backgroundColor: "#ffffff" }}>

      {/* ── Article header ─────────────────────────────────── */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Back nav */}
        <nav style={{ padding: "1.25rem 0", borderBottom: "1px solid #dfdfdf" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#555",
              textDecoration: "none",
              fontFamily: "var(--font-sans), system-ui, sans-serif",
            }}
            className="hover:text-black"
          >
            <ArrowLeft size={13} /> All Articles
          </Link>
        </nav>

        {/* Section label */}
        <div style={{ paddingTop: "2rem", maxWidth: "720px" }}>
          {post.category && (
            <div style={{ marginBottom: "1.25rem" }}>
              <div className="nyt-rule-heavy" style={{ maxWidth: "48px" }} />
              <Link
                href={`/blog/categories/${post.category.slug?.current ?? "#"}`}
                className="nyt-section-label"
                style={{ textDecoration: "none" }}
              >
                {post.category.title}
              </Link>
            </div>
          )}

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 700,
            color: "#121212",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            letterSpacing: "-0.01em",
          }}>
            {post.title}
          </h1>

          {/* Deck */}
          {post.excerpt && (
            <p className="nyt-deck" style={{ marginBottom: "1.75rem", maxWidth: "640px" }}>
              {post.excerpt}
            </p>
          )}

          {/* Byline */}
          <div style={{ borderTop: "1px solid #dfdfdf", paddingTop: "0.875rem", marginBottom: "2rem" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "0.8125rem",
              color: "#333",
              flexWrap: "wrap",
            }}>
              {post.author && (
                <span>
                  <span style={{ color: "#888", marginRight: "0.375rem" }}>By</span>
                  <span style={{ fontWeight: 700 }}>{post.author.name}</span>
                </span>
              )}
              {post.publishedAt && (
                <>
                  <span style={{ color: "#dfdfdf" }}>|</span>
                  <span style={{ color: "#6e6e6e" }}>{formatDate(post.publishedAt)}</span>
                </>
              )}
              {post.estimatedReadingTime && (
                <>
                  <span style={{ color: "#dfdfdf" }}>|</span>
                  <span style={{ color: "#6e6e6e" }}>{post.estimatedReadingTime} min read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero image ──────────────────────────────────────── */}
      {post.mainImage && (
        <div style={{ maxWidth: "900px", margin: "0 auto 2.5rem", padding: "0 1.5rem" }}>
          <figure style={{ margin: 0 }}>
            <div style={{ position: "relative", height: "clamp(220px, 42vw, 500px)", overflow: "hidden" }}>
              <Image
                src={urlFor(post.mainImage).width(900).height(500).url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            {post.mainImage.alt && (
              <figcaption style={{
                fontFamily: "var(--font-sans), system-ui, sans-serif",
                fontSize: "0.8125rem",
                color: "#6e6e6e",
                fontStyle: "italic",
                marginTop: "0.625rem",
                lineHeight: 1.5,
              }}>
                {post.mainImage.alt}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      {/* ── Article body ────────────────────────────────────── */}
      <div style={{ padding: "0 1.5rem 4rem" }}>

        {/* AI disclosure */}
        {post.aiGenerated && (
          <div style={{
            maxWidth: "680px",
            margin: "0 auto 2rem",
            padding: "0.75rem 1rem",
            backgroundColor: "#fafafa",
            borderLeft: "3px solid #dfdfdf",
            fontSize: "0.8125rem",
            color: "#6e6e6e",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            lineHeight: 1.6,
          }}>
            ✦ This article was drafted with AI assistance and reviewed by our editorial team.
          </div>
        )}

        {/* Body */}
        <div className="news-article-body">
          {post.body && <PortableText value={post.body} />}
        </div>

        {/* Affiliate disclosure */}
        <div style={{ maxWidth: "680px", margin: "3rem auto 0", borderTop: "1px solid #dfdfdf", paddingTop: "1.5rem" }}>
          <p style={{
            fontSize: "0.8125rem",
            color: "#6e6e6e",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            lineHeight: 1.65,
          }}>
            <strong style={{ color: "#333" }}>Affiliate Disclosure:</strong>{" "}
            This post may contain affiliate links. If you click and purchase, we may earn a commission at no extra cost to you. We only recommend products we believe in.
          </p>
        </div>

        {/* Newsletter CTA */}
        <div style={{
          maxWidth: "680px",
          margin: "3.5rem auto 0",
          borderTop: "3px solid #121212",
          paddingTop: "2rem",
        }}>
          <p style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "0.625rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#888",
            marginBottom: "0.75rem",
          }}>
            Newsletter
          </p>
          <h3 style={{
            fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#121212",
            marginBottom: "0.625rem",
            lineHeight: 1.2,
          }}>
            Liked this article?
          </h3>
          <p style={{
            fontFamily: "var(--font-body), Georgia, serif",
            color: "#555",
            fontSize: "1rem",
            marginBottom: "1.5rem",
            lineHeight: 1.6,
          }}>
            Get similar insights every week — free in your inbox.
          </p>
          <NewsletterForm compact />
        </div>
      </div>

      {/* ── Related posts ───────────────────────────────────── */}
      {related.length > 0 && (
        <div style={{ borderTop: "3px solid #121212", padding: "3rem 1.5rem 4rem" }}>
          <div className="container-blog">
            <p style={{
              fontFamily: "var(--font-sans), system-ui, sans-serif",
              fontSize: "0.625rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#888",
              marginBottom: "0.5rem",
            }}>
              More to read
            </p>
            <h2 style={{
              fontFamily: "var(--font-display), 'Libre Baskerville', Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#121212",
              marginBottom: "2rem",
              lineHeight: 1.2,
            }}>
              Related Articles
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0" }}>
              {related.map((p) => <PostCard key={p._id} post={p} />)}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
