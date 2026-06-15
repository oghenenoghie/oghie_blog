-- ============================================================
-- News Cache Table
-- Stores GNews articles fetched by the sync cron job.
-- Content is served from here — no external redirects needed.
-- ============================================================

create table if not exists news_cache (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,            -- internal URL: /news/[slug]
  title             text not null,
  description       text,
  content           text,                            -- GNews content snippet (~600 chars)
  image_url         text,
  source_name       text,
  source_url        text,
  original_url      text unique not null,            -- original article URL (dedup key)
  topic             text default 'digital-marketing',
  published_at      timestamptz,
  fetched_at        timestamptz default now(),
  view_count        integer default 0
);

-- Index for listing page queries (newest first per topic)
create index if not exists idx_news_cache_topic_published
  on news_cache (topic, published_at desc);

-- Index for slug lookup
create index if not exists idx_news_cache_slug
  on news_cache (slug);

-- RLS
alter table news_cache enable row level security;

-- Anyone can read published news
create policy "Public can read news" on news_cache
  for select using (true);

-- Only service role can insert/update (cron job uses service role key)
create policy "Service role can write news" on news_cache
  for all using (auth.role() = 'service_role');

-- ── Page view increment function ──────────────────────────
create or replace function increment_news_view(p_slug text)
returns void language plpgsql security definer as $$
begin
  update news_cache set view_count = view_count + 1 where slug = p_slug;
end;
$$;
