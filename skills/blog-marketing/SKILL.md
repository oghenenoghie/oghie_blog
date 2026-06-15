---
name: blog-marketing
description: >
  Complete skill for building and operating a digital marketing blog with Sanity.io (CMS),
  Supabase (auth + database), Render (hosting + email automation), GNews API (news section),
  and Claude AI for auto-generating blog posts. Also covers social media auto-posting,
  newsletter automation, and SEO best practices. Use whenever Patrick asks to build, extend,
  or maintain oghie_blog or any feature in this stack.
---

# Digital Marketing Blog — Full Stack Skill

## Design System (LOCKED — do not change without Patrick's approval)

| Decision | Value |
|---|---|
| Display font | Playfair Display (400, 700, 900) — headings, hero, pull quotes |
| Body font | Inter — body copy, nav, buttons, UI |
| CSS vars | `--font-playfair` / `--font-inter` injected by next/font, mapped in @theme inline |
| Palette | **Navy Conversion** — see color tokens below |
| Primary | `#185FA5` (Signal Blue 700) — links, active, brand |
| CTA buttons | `#EF9F27` (Gold 500) — ALL affiliate CTAs, subscribe buttons |
| Headings | `#0F172A` (Navy 900) |
| Background | `#F8FAFC` (Navy 50) |
| Trust badges | `#1D9E75` (Teal 500) |
| Tailwind version | **v4** — config is CSS-first in `app/globals.css` using `@theme {}`, NOT `tailwind.config.ts` |

## GNews Architecture (IMPORTANT)

GNews articles are **never linked externally**. All content is:
1. Fetched by cron → stored in Supabase `news_cache` table with internal slugs
2. Listed at `/news` — topic-filtered, `?topic=` query param
3. Read at `/news/[slug]` — full in-site reader, no external redirects
4. Related articles shown at bottom of each article page

The GNews `content` field is a ~600 char snippet. We strip the `[+N chars]` trailer and display it as prose paragraphs. The original source URL is stored in Supabase but never exposed as a clickable link.

Sync cron: `POST /api/news/sync` with `x-cron-secret` header — runs every 3 hours on Render.

## Stack at a Glance

| Layer | Tool | Purpose |
|---|---|---|
| CMS | Sanity.io (v3) | Blog posts, categories, authors, media |
| Database / Auth | Supabase | Subscribers, analytics, `news_cache` table |
| Hosting | Render (Web Service) | Next.js app deployment + cron jobs |
| Email Automation | Render + Resend/SendGrid | Newsletter & drip campaigns |
| News Section | GNews API | Auto-fetched industry news cards |
| AI Content | Claude API (claude-sonnet-4-6) | Auto-generate blog posts |
| Social | Buffer / Make / Zapier | Auto-post to LinkedIn, X, Facebook |
| Framework | Next.js 14+ App Router | Frontend |
| Styling | Tailwind CSS + shadcn/ui | UI components |

---

## Project Structure

```
oghie_blog/
├── app/
│   ├── (blog)/
│   │   ├── layout.tsx              # Blog shell: nav, footer, sidebar
│   │   ├── page.tsx                # Blog index — Sanity posts list
│   │   ├── [slug]/page.tsx         # Individual post — Sanity + portable text
│   │   └── news/page.tsx           # GNews section
│   ├── (marketing)/
│   │   ├── page.tsx                # Landing / hero
│   │   └── subscribe/page.tsx      # Email capture → Supabase
│   ├── api/
│   │   ├── posts/generate/route.ts # Claude auto-generate post → Sanity draft
│   │   ├── news/route.ts           # GNews proxy (hides API key)
│   │   ├── newsletter/route.ts     # Supabase subscriber insert + Render email trigger
│   │   └── social/route.ts         # Post to social platforms
│   ├── studio/[[...tool]]/page.tsx # Embedded Sanity Studio
│   └── layout.tsx
├── sanity/
│   ├── schemaTypes/
│   │   ├── post.ts                 # Blog post schema
│   │   ├── category.ts
│   │   ├── author.ts
│   │   └── index.ts
│   ├── lib/
│   │   ├── client.ts               # Sanity client
│   │   ├── queries.ts              # GROQ queries
│   │   └── image.ts                # urlFor helper
│   └── sanity.config.ts
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser client
│   │   └── server.ts               # Server client (cookies)
│   ├── gnews.ts                    # GNews API wrapper
│   ├── claude.ts                   # Claude API content generator
│   ├── email.ts                    # Email sender (Resend)
│   └── social.ts                   # Social posting helpers
├── components/
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostGrid.tsx
│   │   ├── PortableText.tsx         # Renders Sanity rich text
│   │   └── NewsSection.tsx          # GNews cards
│   ├── marketing/
│   │   ├── HeroSection.tsx
│   │   ├── NewsletterForm.tsx       # Email capture
│   │   └── SocialProof.tsx
│   └── ui/                          # shadcn primitives
├── types/
│   ├── sanity.ts
│   ├── supabase.ts
│   └── gnews.ts
└── .env.local
```

---

## Environment Variables

```bash
# .env.local — NEVER commit

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                   # write token for Claude auto-post

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # server-side only, never expose

# GNews
GNEWS_API_KEY=                      # from gnews.io

# Claude
ANTHROPIC_API_KEY=                  # for auto-post generation

# Email (Resend recommended)
RESEND_API_KEY=
EMAIL_FROM=hello@yourdomain.com

# Social (Buffer API or Zapier webhook)
BUFFER_ACCESS_TOKEN=
BUFFER_PROFILE_IDS=id1,id2,id3     # LinkedIn, X, Facebook

# App
NEXT_PUBLIC_SITE_URL=https://yourblog.com
CRON_SECRET=                        # random string for securing cron routes
```

---

## Sanity.io — CMS Setup

### 1. Install & Init

```bash
npm create next-app@latest oghie_blog
cd oghie_blog
npm install next-sanity @sanity/image-url @portabletext/react
npx sanity@latest init --env
```

### 2. Blog Post Schema (`sanity/schemaTypes/post.ts`)

See `/references/sanity-schema.ts` for the complete schema.

**Key fields:**
- `title`, `slug`, `excerpt`, `body` (portable text)
- `mainImage` (with alt text)
- `category` → ref to Category
- `author` → ref to Author
- `publishedAt`, `status` (`draft` | `published`)
- `seoTitle`, `seoDescription`, `tags` (for SEO + social)
- `aiGenerated` (boolean flag — marks Claude-authored drafts)
- `socialPosted` (boolean — prevents duplicate social posts)

### 3. GROQ Queries (`sanity/lib/queries.ts`)

```ts
// All published posts (newest first)
export const postsQuery = groq`
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, publishedAt,
    "category": category->{ title, slug },
    "author": author->{ name, image }
  }
`;

// Single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, body, mainImage, publishedAt, seoTitle, seoDescription, tags,
    "category": category->{ title, slug },
    "author": author->{ name, image, bio }
  }
`;

// Posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && status == "published" && category->slug.current == $category]
  | order(publishedAt desc)[0...$limit] { ... }
`;
```

---

## Supabase — Database & Auth

### Tables

```sql
-- Subscribers table
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  subscribed_at timestamptz default now(),
  confirmed boolean default false,
  confirmation_token uuid default gen_random_uuid(),
  unsubscribed_at timestamptz,
  tags text[] default '{}'
);

-- Post analytics (page views)
create table post_views (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  viewed_at timestamptz default now(),
  referrer text,
  country text
);

-- Enable RLS
alter table subscribers enable row level security;
alter table post_views enable row level security;

-- Allow anonymous inserts for subscribe form
create policy "Anyone can subscribe" on subscribers
  for insert with check (true);

-- Allow anonymous inserts for page view tracking
create policy "Anyone can track views" on post_views
  for insert with check (true);
```

### Supabase Client (`lib/supabase/server.ts`)

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

---

## GNews API — News Section

### API Wrapper (`lib/gnews.ts`)

```ts
const GNEWS_BASE = "https://gnews.io/api/v4";

export interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: { name: string; url: string };
}

export async function fetchNewsArticles(
  topic: string = "digital marketing",
  count: number = 6
): Promise<GNewsArticle[]> {
  const params = new URLSearchParams({
    q: topic,
    lang: "en",
    country: "us",
    max: String(count),
    apikey: process.env.GNEWS_API_KEY!,
  });

  const res = await fetch(`${GNEWS_BASE}/search?${params}`, {
    next: { revalidate: 3600 }, // cache 1 hour
  });

  if (!res.ok) throw new Error(`GNews error: ${res.status}`);
  const data = await res.json();
  return data.articles ?? [];
}

// Fetch by topic category (gnews built-in topics)
export async function fetchTopicNews(
  topic: "business" | "technology" | "world" | "entertainment",
  count = 4
): Promise<GNewsArticle[]> {
  const params = new URLSearchParams({
    topic,
    lang: "en",
    max: String(count),
    apikey: process.env.GNEWS_API_KEY!,
  });
  const res = await fetch(`${GNEWS_BASE}/top-headlines?${params}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GNews error: ${res.status}`);
  const data = await res.json();
  return data.articles ?? [];
}
```

### News API Route (`app/api/news/route.ts`)

```ts
import { NextResponse } from "next/server";
import { fetchNewsArticles } from "@/lib/gnews";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic") ?? "digital marketing";
  const articles = await fetchNewsArticles(topic, 6);
  return NextResponse.json(articles);
}
```

### NewsSection Component

```tsx
// components/blog/NewsSection.tsx
import Image from "next/image";
import { fetchNewsArticles } from "@/lib/gnews";

export default async function NewsSection() {
  const articles = await fetchNewsArticles("digital marketing", 6);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Latest in Digital Marketing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {article.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    unoptimized // GNews images are external
                  />
                </div>
              )}
              <div className="p-4">
                <p className="text-xs text-slate-500 mb-1">{article.source.name}</p>
                <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {article.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Claude AI — Auto-Generate Blog Posts

### Generator (`lib/claude.ts`)

```ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface GeneratedPost {
  title: string;
  excerpt: string;
  body: string;           // Markdown → convert to Portable Text
  seoTitle: string;
  seoDescription: string;
  tags: string[];
}

export async function generateBlogPost(
  topic: string,
  tone: "educational" | "conversational" | "expert" = "educational",
  wordCount = 800
): Promise<GeneratedPost> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `You are a digital marketing expert writing for a professional blog.

Write a complete blog post about: "${topic}"

Requirements:
- Tone: ${tone}
- Approximate length: ${wordCount} words
- Include actionable insights and real examples
- Optimized for SEO without keyword stuffing
- Suitable for digital marketing professionals

Return ONLY valid JSON in this exact shape:
{
  "title": "Compelling post title",
  "excerpt": "2-3 sentence summary for previews (max 160 chars)",
  "body": "Full post content in Markdown format",
  "seoTitle": "SEO-optimized title (max 60 chars)",
  "seoDescription": "Meta description (max 155 chars)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return JSON.parse(text) as GeneratedPost;
}
```

### Auto-Generate API Route (`app/api/posts/generate/route.ts`)

```ts
import { NextResponse } from "next/server";
import { generateBlogPost } from "@/lib/claude";
import { createClient } from "@sanity/client";
import { markdownToPortableText } from "@/lib/markdown-to-portable-text";

// Protect with a secret header
function isAuthorized(req: Request) {
  return req.headers.get("x-cron-secret") === process.env.CRON_SECRET;
}

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { topic, tone, wordCount, categoryId, authorId } = await req.json();

  const post = await generateBlogPost(topic, tone, wordCount);

  // Create draft in Sanity
  const doc = await sanityClient.create({
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: slugify(post.title) },
    excerpt: post.excerpt,
    body: markdownToPortableText(post.body),
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    tags: post.tags,
    status: "draft",              // Always draft — human reviews before publish
    aiGenerated: true,
    publishedAt: new Date().toISOString(),
    ...(categoryId && { category: { _type: "reference", _ref: categoryId } }),
    ...(authorId && { author: { _type: "reference", _ref: authorId } }),
  });

  return NextResponse.json({ success: true, documentId: doc._id });
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 96);
}
```

### Scheduled Auto-Generation on Render

Use a Render Cron Job (free tier available) pointing to:
```
POST https://yourblog.com/api/posts/generate
Header: x-cron-secret: YOUR_CRON_SECRET
Body: {"topic": "SEO trends 2026", "tone": "educational"}
```

Schedule: `0 8 * * 1` (every Monday 8am) — adjust per content calendar.

---

## Email Automation — Newsletter

### Subscribe Route (`app/api/newsletter/route.ts`)

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  const { email, name } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const supabase = createClient();

  const { data, error } = await supabase
    .from("subscribers")
    .upsert({ email, name }, { onConflict: "email", ignoreDuplicates: true })
    .select("confirmation_token")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await sendConfirmationEmail(email, name, data.confirmation_token);

  return NextResponse.json({ success: true });
}
```

### Email Sender (`lib/email.ts`)

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(
  email: string,
  name: string | null,
  token: string
) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/confirm?token=${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Confirm your subscription",
    html: `
      <h2>Hey ${name ?? "there"} 👋</h2>
      <p>Click below to confirm your subscription:</p>
      <a href="${confirmUrl}" style="padding:12px 24px;background:#1d4ed8;color:#fff;border-radius:6px;text-decoration:none">
        Confirm Subscription
      </a>
    `,
  });
}

export async function sendNewPostNewsletter(
  subscribers: { email: string; name: string | null }[],
  post: { title: string; excerpt: string; slug: string }
) {
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;

  // Batch in groups of 50 (Resend free limit)
  const chunks = chunkArray(subscribers, 50);
  for (const chunk of chunks) {
    await resend.batch.send(
      chunk.map(({ email, name }) => ({
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: `New post: ${post.title}`,
        html: `
          <h2>${post.title}</h2>
          <p>${post.excerpt}</p>
          <a href="${postUrl}">Read the full post →</a>
        `,
      }))
    );
  }
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}
```

---

## Social Media Auto-Posting

### Social Route (`app/api/social/route.ts`)

```ts
import { NextResponse } from "next/server";
import { postToBuffer } from "@/lib/social";

export async function POST(req: Request) {
  if (req.headers.get("x-cron-secret") !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, excerpt, slug, tags } = await req.json();
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;

  const caption = `${title}\n\n${excerpt}\n\n${tags.map((t: string) => `#${t}`).join(" ")}\n\n${postUrl}`;

  await postToBuffer(caption);
  return NextResponse.json({ success: true });
}
```

### Buffer Helper (`lib/social.ts`)

```ts
const BUFFER_API = "https://api.bufferapp.com/1";
const profileIds = process.env.BUFFER_PROFILE_IDS!.split(",");

export async function postToBuffer(text: string, imageUrl?: string) {
  const body: Record<string, unknown> = {
    profile_ids: profileIds,
    text,
    access_token: process.env.BUFFER_ACCESS_TOKEN,
    scheduled_at: getNextSlot(), // schedule for optimal time
  };
  if (imageUrl) body.media = { photo: imageUrl };

  const res = await fetch(`${BUFFER_API}/updates/create.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Buffer error: ${res.status}`);
  return res.json();
}

function getNextSlot(): string {
  // Post at 9am, 12pm, or 6pm UTC — pick the next upcoming one
  const now = new Date();
  const slots = [9, 12, 18];
  const hour = now.getUTCHours();
  const nextHour = slots.find((h) => h > hour) ?? slots[0];
  const next = new Date(now);
  if (nextHour <= hour) next.setUTCDate(next.getUTCDate() + 1);
  next.setUTCHours(nextHour, 0, 0, 0);
  return next.toISOString();
}
```

### Sanity Webhook → Auto-Post on Publish

In Sanity Studio → API → Webhooks:
```
URL: https://yourblog.com/api/social
Trigger on: Create, Update
Filter: _type == "post" && status == "published" && !socialPosted
Projection: { "title": title, "excerpt": excerpt, "slug": slug.current, "tags": tags }
HTTP Method: POST
Secret: YOUR_CRON_SECRET (sent as x-cron-secret header)
```

After posting, update `socialPosted: true` in Sanity to prevent duplicates.

---

## Render Deployment

### render.yaml

```yaml
services:
  - type: web
    name: oghie-blog
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: NEXT_PUBLIC_SANITY_PROJECT_ID
        sync: false
      - key: NEXT_PUBLIC_SUPABASE_URL
        sync: false
      # ... all other env vars

  - type: cron
    name: auto-generate-post
    env: node
    buildCommand: echo "ready"
    schedule: "0 8 * * 1"        # Every Monday 8am
    startCommand: >
      curl -X POST https://oghie-blog.onrender.com/api/posts/generate
      -H "x-cron-secret: $CRON_SECRET"
      -H "Content-Type: application/json"
      -d '{"topic":"digital marketing trends","tone":"educational"}'
    envVars:
      - key: CRON_SECRET
        sync: false
```

---

## SEO Best Practices

### generateMetadata per post

```ts
// app/(blog)/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription,
      images: [{ url: urlFor(post.mainImage).width(1200).height(630).url() }],
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
    },
  };
}
```

### Sitemap (`app/sitemap.ts`)

```ts
import { getPosts } from "@/sanity/lib/queries";

export default async function sitemap() {
  const posts = await getPosts();
  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug.current}`,
      lastModified: new Date(p.publishedAt),
    })),
  ];
}
```

---

## Development Checklist

```
□ npx sanity@latest init --env
□ Create Supabase project → run SQL migrations
□ Get GNews API key from gnews.io (free: 100 req/day)
□ Set up Resend account → verify domain
□ Create Buffer account → connect LinkedIn, X, Facebook
□ Set ANTHROPIC_API_KEY for Claude auto-generate
□ Deploy to Render → set all env vars
□ Add Sanity webhook for social auto-post
□ Configure Render cron for weekly AI posts
□ Verify sitemap at /sitemap.xml
□ Add Google Analytics / Plausible script
```

---

## Reference Files in This Skill

- `/references/sanity-schema.ts` — Complete Sanity post/author/category schemas
- `/references/supabase-types.ts` — Generated TypeScript types for Supabase tables
- `/references/portable-text.tsx` — Portable text renderer for blog body
- `/references/newsletter-flow.md` — Full double opt-in email flow
- `/references/gnews-topics.md` — All supported GNews topic categories
