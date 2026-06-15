# GNews API — Supported Topics & Usage

## Base URL
```
https://gnews.io/api/v4
```

## Free Tier Limits
- 100 requests / day
- 10 articles per request
- 1 month archive

## Endpoints

### Search (keyword-based)
```
GET /search?q=digital+marketing&lang=en&country=us&max=6&apikey=KEY
```

### Top Headlines by Topic
```
GET /top-headlines?topic=TOPIC&lang=en&max=6&apikey=KEY
```

## Supported Topics (for top-headlines)
| Topic | Description |
|---|---|
| `breaking-news` | Breaking news |
| `world` | International news |
| `nation` | Country-specific |
| `business` | Business & finance |
| `technology` | Tech & startups |
| `entertainment` | Entertainment |
| `sports` | Sports |
| `science` | Science |
| `health` | Health & wellness |

## Recommended Setup for Digital Marketing Blog

Use a mix:
- Hero news section: `q=digital+marketing` → 6 results
- Sidebar: `topic=technology` → 4 results
- Footer ticker: `topic=business` → 8 results

## Caching Strategy

```ts
// Cache 1 hour in Next.js fetch
fetch(url, { next: { revalidate: 3600 } })

// Or use ISR on the news page
export const revalidate = 3600; // in page.tsx
```

## Error Handling

```ts
async function fetchWithFallback(url: string, fallback: GNewsArticle[]) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return fallback;
    const data = await res.json();
    return data.articles ?? fallback;
  } catch {
    return fallback; // never break the page due to news API failure
  }
}
```

## GNews API Rate Limit Management

Since free tier is 100 req/day, with 1-hour caching and ~3 sections:
- 3 sections × 24 hours = 72 requests/day ✅ (under limit)
- To be safe, use ISR revalidate of 7200 (2 hours) in production
