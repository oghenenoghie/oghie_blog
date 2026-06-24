import { sanityClient } from "./client";

// Shared projection for post lists
const POST_CARD_PROJECTION = `{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  estimatedReadingTime,
  aiGenerated,
  mainImage { asset->{ url }, alt },
  category->{ title, slug, color },
  author->{ name }
}`;

export async function getLatestPosts(limit = 10) {
  return sanityClient.fetch(
    `*[_type=="post" && defined(publishedAt)] | order(publishedAt desc) [0...$limit] ${POST_CARD_PROJECTION}`,
    { limit: limit - 1 },
    { next: { revalidate: 1800 } }
  );
}

export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type=="post" && slug.current==$slug][0] {
      _id, title, slug, excerpt, publishedAt, estimatedReadingTime, aiGenerated, socialPosted,
      mainImage { asset->{ url }, alt },
      category->{ title, slug },
      author->{ name, bio },
      body,
      seoTitle, seoDescription, tags
    }`,
    { slug },
    { next: { revalidate: 3600 } }
  );
}

export async function getAllCategories() {
  return sanityClient.fetch(
    `*[_type=="category"] | order(title asc) { _id, title, slug, color, description }`,
    {},
    { next: { revalidate: 86400 } }
  );
}

export async function getPostsByCategory(categorySlug: string, limit = 12) {
  return sanityClient.fetch(
    `*[_type=="post" && category->slug.current==$slug && defined(publishedAt)] | order(publishedAt desc) [0...$limit] ${POST_CARD_PROJECTION}`,
    { slug: categorySlug, limit: limit - 1 },
    { next: { revalidate: 1800 } }
  );
}

export async function getCategoriesWithPosts(postsPerCategory = 4) {
  return sanityClient.fetch(
    `*[_type=="category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color,
      "posts": *[_type=="post" && references(^._id) && defined(publishedAt)] | order(publishedAt desc) [0...$limit] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        estimatedReadingTime,
        mainImage { asset->{ url }, alt },
        author->{ name }
      }
    } [count(posts) > 0]`,
    { limit: postsPerCategory - 1 },
    { next: { revalidate: 1800 } }
  );
}

export async function getUnpostedAiPosts(limit = 5) {
  return sanityClient.fetch(
    `*[_type=="post" && aiGenerated==true && socialPosted!=true && defined(publishedAt)] | order(publishedAt desc) [0...$limit] { _id, title, slug, excerpt }`,
    { limit: limit - 1 }
  );
}
