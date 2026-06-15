// ============================================================
// POST /api/news/sync
// Called by Render cron job to fetch GNews → Supabase cache.
// Protected by CRON_SECRET header.
// Schedule: "0 */3 * * *" (every 3 hours — stays under GNews 100 req/day)
// ============================================================

import { NextResponse } from "next/server";
import { fetchTopicFromGNews, syncArticlesToSupabase } from "@/lib/gnews";

function isAuthorized(req: Request): boolean {
  return req.headers.get("x-cron-secret") === process.env.CRON_SECRET;
}

const SYNC_JOBS = [
  { type: "topic" as const, topic_key: "breaking-news", topic: "breaking",     count: 10 },
  { type: "topic" as const, topic_key: "world",         topic: "world",        count: 8  },
  { type: "topic" as const, topic_key: "technology",    topic: "technology",   count: 8  },
  { type: "topic" as const, topic_key: "business",      topic: "business",     count: 8  },
  { type: "topic" as const, topic_key: "entertainment", topic: "entertainment",count: 6  },
  { type: "topic" as const, topic_key: "sports",        topic: "sports",       count: 6  },
] as const;

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, number> = {};
  let totalSynced = 0;

  for (const job of SYNC_JOBS) {
    const articles = await fetchTopicFromGNews(job.topic_key, job.count);

    const synced = await syncArticlesToSupabase(articles, job.topic);
    results[job.topic] = synced;
    totalSynced += synced;
  }

  return NextResponse.json({
    success: true,
    totalSynced,
    byTopic: results,
    syncedAt: new Date().toISOString(),
  });
}

// GET for manual trigger during development — skips auth check, returns diagnostics
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  const diagnostics: Record<string, { fetched: number; synced: number; error?: string }> = {};
  let totalSynced = 0;

  for (const job of SYNC_JOBS) {
    let articles: Awaited<ReturnType<typeof fetchTopicFromGNews>> = [];
    let fetchError: string | undefined;

    try {
      articles = await fetchTopicFromGNews(job.topic_key, job.count);
    } catch (e) {
      fetchError = String(e);
    }

    let synced = 0;
    let syncError: string | undefined;
    if (articles.length > 0) {
      try {
        synced = await syncArticlesToSupabase(articles, job.topic);
      } catch (e) {
        syncError = String(e);
      }
    }

    diagnostics[job.topic] = {
      fetched: articles.length,
      synced,
      ...(fetchError ? { fetchError } : {}),
      ...(syncError  ? { syncError  } : {}),
    };
    totalSynced += synced;
  }

  return NextResponse.json({
    success: true,
    totalSynced,
    diagnostics,
    env: {
      hasGNewsKey: !!process.env.GNEWS_API_KEY,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    syncedAt: new Date().toISOString(),
  });
}
