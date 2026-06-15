# Oghie Blog — Setup Guide

## Prerequisites
- Node.js 20+
- A Sanity account at sanity.io
- A Supabase project
- A Resend account (email)
- A GNews API key (gnews.io)
- An Anthropic API key (claude.ai)
- (Optional) Buffer account for social posting

---

## 1. Install dependencies

```bash
npm install
```

---

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in every value in `.env.local`. Key ones:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Already set: `wbphzmlj` |
| `SANITY_API_WRITE_TOKEN` | sanity.io → Project → API → Tokens → Add token (Editor) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API (keep secret!) |
| `GNEWS_API_KEY` | gnews.io dashboard |
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `RESEND_API_KEY` | resend.com dashboard |
| `CRON_SECRET` | Run: `openssl rand -hex 32` |

---

## 3. Set up Supabase tables

Run the SQL migrations in your Supabase SQL editor (Dashboard → SQL Editor):

1. `supabase/migrations/001_news_cache.sql` — news cache + view counter
2. `supabase/migrations/002_subscribers.sql` — newsletter subscribers

Or use the Supabase CLI:

```bash
npx supabase db push
```

---

## 4. Deploy Sanity schema

```bash
npx sanity@latest schema deploy --project wbphzmlj
```

Or push via the Sanity CLI:

```bash
npx sanity deploy
```

This will also deploy the Studio to `https://wbphzmlj.sanity.studio`.

---

## 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

The Sanity Studio is at [http://localhost:3000/studio](http://localhost:3000/studio)

---

## 6. Seed initial news articles

With `GNEWS_API_KEY` set, trigger the first sync:

```bash
curl -X GET http://localhost:3000/api/news/sync
```

(In production, send the `x-cron-secret` header.)

---

## 7. Generate your first AI blog post

```bash
curl -X POST http://localhost:3000/api/posts/generate \
  -H "Content-Type: application/json" \
  -H "x-cron-secret: YOUR_CRON_SECRET" \
  -d '{"topic": "Affiliate marketing strategies for beginners in 2025", "category": "affiliate"}'
```

---

## 8. Deploy to production (Render)

The `render.yaml` at the project root defines everything declaratively.

**Option A — Blueprint (recommended):**
1. Push your repo to GitHub
2. In Render Dashboard → New → Blueprint
3. Connect your GitHub repo — Render reads `render.yaml` automatically
4. Set `sync: false` env vars (all API keys) in the Render Dashboard
5. Deploy

**Option B — Manual:**
1. New → Web Service → connect repo
2. Build Command: `npm install --legacy-peer-deps && npm run build`
3. Start Command: `npm run start`
4. Add all env vars from `.env.local`
5. Add two Cron Jobs manually:
   - News sync: `curl -X POST $NEXT_PUBLIC_SITE_URL/api/news/sync -H "x-cron-secret: $CRON_SECRET"` — schedule `0 */3 * * *`
   - Post generation: `curl -X POST $NEXT_PUBLIC_SITE_URL/api/posts/generate -H "Content-Type: application/json" -H "x-cron-secret: $CRON_SECRET" -d '{"topic":"...","category":"..."}'` — schedule `0 8 * * 1`

---

## 9. Add Resend domain (for email)

1. Go to resend.com → Domains → Add domain
2. Add DNS records your hosting provider shows
3. Update `EMAIL_FROM` in `.env.local` to match your verified domain

---

## 10. Buffer social posting (optional)

1. Go to buffer.com → Developers → Create application
2. Get your access token
3. Set `BUFFER_ACCESS_TOKEN` in `.env.local`
4. Call `/api/posts/generate` — it will auto-post newly published AI posts

---

## Stack Summary

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| CMS | Sanity.io (project: wbphzmlj) |
| Database | Supabase (PostgreSQL) |
| Hosting | Render |
| Email | Resend |
| News | GNews API (cached in Supabase) |
| AI Posts | Anthropic Claude |
| Social | Buffer |
| Design | Tailwind CSS v4 + shadcn/ui |
| Fonts | Playfair Display + Inter |
| Colors | Navy Conversion Palette |
