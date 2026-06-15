import type { MetadataRoute } from "next";
import { getLatestPosts, getAllCategories } from "@/sanity/lib/queries";
import { getAllCachedNews } from "@/lib/gnews";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oghieblog.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/news`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/subscribe`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/disclosure`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Fetch dynamic data in parallel, fail gracefully
  const [posts, categories, news] = await Promise.allSettled([
    getLatestPosts(200),
    getAllCategories(),
    getAllCachedNews(100),
  ]);

  const blogPosts: MetadataRoute.Sitemap =
    posts.status === "fulfilled"
      ? posts.value.map(
          (post: { slug: { current: string }; publishedAt?: string }) => ({
            url: `${BASE_URL}/blog/${post.slug.current}`,
            lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          })
        )
      : [];

  const categoryPages: MetadataRoute.Sitemap =
    categories.status === "fulfilled"
      ? categories.value.map((cat: { slug: { current: string } }) => ({
          url: `${BASE_URL}/blog/categories/${cat.slug.current}`,
          lastModified: now,
          changeFrequency: "daily" as const,
          priority: 0.7,
        }))
      : [];

  const newsPages: MetadataRoute.Sitemap =
    news.status === "fulfilled"
      ? news.value.map((article: { slug: string; publishedAt?: string }) => ({
          url: `${BASE_URL}/news/${article.slug}`,
          lastModified: article.publishedAt
            ? new Date(article.publishedAt)
            : now,
          changeFrequency: "weekly" as const,
          priority: 0.65,
        }))
      : [];

  return [...staticPages, ...blogPosts, ...categoryPages, ...newsPages];
}
