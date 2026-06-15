import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getLatestPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PortableText from "@/components/blog/PortableText";
import PostCard, { type PostCardData } from "@/components/blog/PostCard";
import NewsletterForm from "@/components/marketing/NewsletterForm";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Clock, ArrowLeft, Calendar } from "lucide-react";

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
    <article>
      {/* Hero */}
      <div style={{ backgroundColor: "var(--color-navy-900)", padding: "2.5rem 0 0" }}>
        <div className="container-blog" style={{ maxWidth: "820px" }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "1.5rem" }}>
            <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "var(--color-navy-400)", textDecoration: "none" }} className="hover:text-white">
              <ArrowLeft size={14} /> Blog
            </Link>
          </nav>

          {post.category && (
            <Link href={`/blog/categories/${post.category.slug?.current ?? "#"}`} style={{ textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
              <Badge variant="gold">{post.category.title}</Badge>
            </Link>
          )}

          <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "clamp(1.875rem, 5vw, 2.75rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p style={{ fontSize: "1.0625rem", color: "var(--color-navy-300)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {post.excerpt}
            </p>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", color: "var(--color-navy-400)", fontSize: "0.875rem", flexWrap: "wrap", paddingBottom: "2rem" }}>
            {post.author && (
              <span style={{ color: "var(--color-navy-200)", fontWeight: 500 }}>{post.author.name}</span>
            )}
            {post.publishedAt && (
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Calendar size={13} aria-hidden="true" /> {formatDate(post.publishedAt)}
              </span>
            )}
            {post.estimatedReadingTime && (
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Clock size={13} aria-hidden="true" /> {post.estimatedReadingTime} min read
              </span>
            )}
          </div>
        </div>

        {/* Hero image */}
        {post.mainImage && (
          <div className="container-blog" style={{ maxWidth: "900px", paddingBottom: 0 }}>
            <div style={{ position: "relative", height: "clamp(220px, 40vw, 480px)", borderRadius: "0.875rem 0.875rem 0 0", overflow: "hidden" }}>
              <Image
                src={urlFor(post.mainImage).width(900).height(480).url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "3.5rem 0" }}>
        <div className="container-blog" style={{ maxWidth: "820px" }}>

          {/* AI disclosure */}
          {post.aiGenerated && (
            <div style={{ padding: "0.75rem 1rem", backgroundColor: "rgba(239,159,39,0.08)", borderLeft: "3px solid var(--color-gold-500)", borderRadius: "0 0.5rem 0.5rem 0", marginBottom: "2rem", fontSize: "0.8125rem", color: "var(--color-navy-600)" }}>
              ✦ This article was drafted with AI assistance and reviewed by our editorial team.
            </div>
          )}

          {/* Body */}
          <div className="news-article-body">
            {post.body && <PortableText value={post.body} />}
          </div>

          {/* Affiliate disclosure */}
          <div style={{ marginTop: "3rem" }}>
            <p className="disclosure">
              <strong>Affiliate Disclosure:</strong> This post may contain affiliate links. If you click and purchase, we may earn a commission at no extra cost to you. We only recommend products we believe in.
            </p>
          </div>

          {/* Inline newsletter CTA */}
          <div style={{ marginTop: "3.5rem", backgroundColor: "var(--color-navy-900)", borderRadius: "1rem", padding: "2.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.5rem", fontWeight: 900, color: "#fff", marginBottom: "0.625rem" }}>
              Liked this article?
            </h3>
            <p style={{ color: "var(--color-navy-300)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
              Get similar insights every week — free in your inbox.
            </p>
            <NewsletterForm compact />
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div style={{ borderTop: "1px solid var(--color-navy-100)", padding: "4rem 0" }}>
          <div className="container-blog">
            <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "1.625rem", fontWeight: 900, color: "var(--color-navy-900)", marginBottom: "2rem" }}>
              More to Read
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {related.map((p) => <PostCard key={p._id} post={p} />)}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
