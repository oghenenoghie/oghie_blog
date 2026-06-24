// ============================================================
// GNews API — fetch + sync to Supabase news_cache
// Content is stored on-site; readers never leave oghie_blog.
// ============================================================

const GNEWS_BASE = "https://gnews.io/api/v4";

export interface GNewsArticle {
  title: string;
  description: string;
  content: string;      // snippet, ~600 chars on free tier
  url: string;          // original source URL (stored but not linked to user)
  image: string | null;
  publishedAt: string;
  source: { name: string; url: string };
}

export interface CachedArticle {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  source_name: string | null;
  topic: string;
  published_at: string | null;
  fetched_at: string;
  view_count: number;
}

// ── Fetch from GNews ──────────────────────────────────────

export async function fetchFromGNews(
  query: string,
  count = 10
): Promise<GNewsArticle[]> {
  const params = new URLSearchParams({
    q: query,
    lang: "en",
    country: "us",
    max: String(count),
    apikey: process.env.GNEWS_API_KEY!,
  });

  const res = await fetch(`${GNEWS_BASE}/search?${params}`, {
    next: { revalidate: 0 }, // always fresh when called from sync route
  });

  if (!res.ok) {
    console.error(`GNews search error ${res.status}`);
    return [];
  }

  const data = await res.json();
  return data.articles ?? [];
}

type GNewsTopic = "breaking-news" | "world" | "nation" | "business" | "technology" | "entertainment" | "sports" | "science" | "health";

export async function fetchTopicFromGNews(
  topic: GNewsTopic,
  count = 6
): Promise<GNewsArticle[]> {
  const params = new URLSearchParams({
    topic,
    lang: "en",
    max: String(count),
    apikey: process.env.GNEWS_API_KEY!,
  });

  const res = await fetch(`${GNEWS_BASE}/top-headlines?${params}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`GNews topic error ${res.status}: ${body}`);
    throw new Error(`GNews ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.articles ?? [];
}

// ── Sync to Supabase ──────────────────────────────────────

/** Strip GNews truncation markers like "... [6102 chars]" or "[+600 chars]" */
function stripGNewsMarker(text: string | null): string | null {
  if (!text) return text;
  return text
    .replace(/\.{2,3}\s*\[\+?\d+\s+chars?\]/gi, "")
    .replace(/\s*\[\+?\d+\s+chars?\]/gi, "")
    .trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90)
    .replace(/-$/, "");
}

function makeUniqueSlug(base: string, existing: Set<string>): string {
  let slug = base;
  let i = 1;
  while (existing.has(slug)) {
    slug = `${base}-${i}`;
    i++;
  }
  return slug;
}

export async function syncArticlesToSupabase(
  articles: GNewsArticle[],
  topic: string
): Promise<number> {
  const { createServiceClient } = await import("./supabase/server");
  const supabase = createServiceClient();

  // Fetch slugs already in DB to ensure uniqueness
  const { data: existing } = await supabase
    .from("news_cache")
    .select("slug, original_url");

  const existingSlugs = new Set<string>((existing ?? []).map((r: { slug: string }) => r.slug));
  const existingUrls = new Set(
    (existing ?? []).map((r: { original_url: string }) => r.original_url)
  );

  const rows = articles
    .filter((a) => !existingUrls.has(a.url))
    .map((a) => {
      const baseSlug = slugify(a.title);
      const slug = makeUniqueSlug(baseSlug, existingSlugs);
      existingSlugs.add(slug);

      return {
        slug,
        title: a.title,
        description: stripGNewsMarker(a.description),
        content: stripGNewsMarker(a.content),
        image_url: a.image,
        source_name: a.source.name,
        source_url: a.source.url,
        original_url: a.url,
        topic,
        published_at: a.publishedAt,
      };
    });

  if (rows.length === 0) return 0;

  const { error } = await supabase.from("news_cache").insert(rows);
  if (error) {
    console.error("Supabase insert error:", error.message);
    return 0;
  }

  return rows.length;
}

// ── Read from Supabase cache (used by pages) ──────────────

export async function getCachedNews(
  topic: string,
  limit = 12
): Promise<CachedArticle[]> {
  const { createStaticClient } = await import("./supabase/server");
  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("news_cache")
    .select(
      "id, slug, title, description, content, image_url, source_name, topic, published_at, fetched_at, view_count"
    )
    .eq("topic", topic)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Supabase select error:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getAllCachedNews(limit = 24): Promise<CachedArticle[]> {
  const { createStaticClient } = await import("./supabase/server");
  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("news_cache")
    .select(
      "id, slug, title, description, content, image_url, source_name, topic, published_at, fetched_at, view_count"
    )
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data ?? [];
}

export async function getCachedArticleBySlug(
  slug: string
): Promise<CachedArticle | null> {
  const { createStaticClient } = await import("./supabase/server");
  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("news_cache")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}
