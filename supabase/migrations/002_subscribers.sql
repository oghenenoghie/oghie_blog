-- Subscribers table for newsletter double opt-in
create table if not exists public.subscribers (
  id                uuid primary key default gen_random_uuid(),
  email             text unique not null,
  name              text,
  status            text not null default 'pending',   -- pending | active | unsubscribed
  confirmation_token text,
  confirmed_at      timestamptz,
  unsubscribed_at   timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- RLS: service role can do everything; no public access
alter table public.subscribers enable row level security;

create policy "service_role_full" on public.subscribers
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subscribers_updated_at on public.subscribers;
create trigger subscribers_updated_at
  before update on public.subscribers
  for each row execute procedure public.handle_updated_at();

-- Post views tracking
create table if not exists public.post_views (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null,
  viewed_at  timestamptz not null default now(),
  ip_hash    text,
  user_agent text
);

create index if not exists post_views_slug_idx on public.post_views(slug);
alter table public.post_views enable row level security;

-- Anyone can insert a view (for analytics)
create policy "public_insert_views" on public.post_views
  for insert with check (true);
