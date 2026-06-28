// ============================================================
// Unsplash API — fetch a relevant photo URL for a given topic.
// Used during news sync as a fallback when GNews provides no image.
// Requires UNSPLASH_ACCESS_KEY in env (free at unsplash.com/developers).
// ============================================================

const UNSPLASH_BASE = "https://api.unsplash.com";

// Maps internal topic slugs → natural-language search queries
const TOPIC_QUERIES: Record<string, string> = {
  "breaking":          "breaking news journalism",
  "world":             "world globe international news",
  "technology":        "technology innovation digital",
  "business":          "business finance office",
  "entertainment":     "entertainment media cinema",
  "sports":            "sports athletic competition",
  "affiliate":         "affiliate marketing online business",
  "seo":               "search engine optimization analytics",
  "digital-marketing": "digital marketing social media",
};

interface UnsplashPhoto {
  urls: { raw: string };
}

/**
 * Returns a landscape Unsplash image URL sized at 800 px wide for the given
 * topic slug.  Returns null if the key is missing or the request fails.
 */
export async function getUnsplashImageForTopic(topic: string): Promise<string | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return null;

  const query = TOPIC_QUERIES[topic] ?? topic;

  try {
    const res = await fetch(
      `${UNSPLASH_BASE}/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`,
      {
        headers: { Authorization: `Client-ID ${key}` },
        // always fresh during sync — never cached at Next.js level
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(`Unsplash ${res.status} for topic "${topic}"`);
      return null;
    }

    const photo: UnsplashPhoto = await res.json();
    // Append Imgix params to the raw URL for a consistent 800×500 crop
    return `${photo.urls.raw}&w=800&h=500&q=80&fm=jpg&fit=crop&crop=entropy`;
  } catch (err) {
    console.error("Unsplash fetch error:", err);
    return null;
  }
}
