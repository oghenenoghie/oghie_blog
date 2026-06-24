import { NextRequest, NextResponse } from "next/server";
import { generateBlogPost, generateSocialPost } from "@/lib/claude";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wbphzmlj",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
  apiVersion: "2024-01-01",
});

// ── Buffer social posting ─────────────────────────────────────────────────────

async function postToBuffer(text: string, profileId?: string): Promise<void> {
  const token = process.env.BUFFER_ACCESS_TOKEN;
  if (!token) return; // silently skip if not configured

  const profiles = profileId
    ? [profileId]
    : await getBufferProfileIds(token);

  if (!profiles.length) return;

  await fetch("https://api.bufferapp.com/1/updates/create.json", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      access_token: token,
      text,
      ...Object.fromEntries(profiles.map((id, i) => [`profile_ids[${i}]`, id])),
    }),
  });
}

async function getBufferProfileIds(token: string): Promise<string[]> {
  const res = await fetch(
    `https://api.bufferapp.com/1/profiles.json?access_token=${token}`
  );
  if (!res.ok) return [];
  const profiles = (await res.json()) as Array<{ id: string }>;
  return profiles.map((p) => p.id);
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Protect with cron secret
  const secret = req.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { topic, category } = body as { topic: string; category?: string };

    if (!topic) return NextResponse.json({ error: "topic required" }, { status: 400 });

    // 1. Generate blog post content with Claude
    const post = await generateBlogPost(topic);

    // 2. Find category reference in Sanity
    let categoryRef: { _type: "reference"; _ref: string } | undefined;
    if (category) {
      const cat = await sanity.fetch(
        `*[_type=="category" && slug.current==$slug][0]{_id}`,
        { slug: category }
      );
      if (cat?._id) categoryRef = { _type: "reference", _ref: cat._id };
    }

    // 3. Find or create "Claude AI" author
    let authorRef: { _type: "reference"; _ref: string } | undefined;
    const author = await sanity.fetch(`*[_type=="author" && name=="Claude AI"][0]{_id}`);
    if (author?._id) authorRef = { _type: "reference", _ref: author._id };

    // 4. Publish to Sanity
    const doc = await sanity.create({
      _type: "post",
      title:       post.title,
      slug:        { _type: "slug", current: post.slug },
      excerpt:     post.excerpt,
      body:        post.body,
      aiGenerated: true,
      publishedAt: new Date().toISOString(),
      ...(categoryRef && { category: categoryRef }),
      ...(authorRef   && { author: authorRef }),
    });

    // 5. Auto-post to social via Buffer (non-blocking — failures don't error the response)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oghieblog.com";
    const postUrl = `${siteUrl}/blog/${post.slug}`;

    try {
      const social = await generateSocialPost(post.title, post.excerpt, postUrl);

      // Post Twitter and LinkedIn versions (Buffer queues them to connected profiles)
      await Promise.allSettled([
        postToBuffer(social.twitter),
        postToBuffer(social.linkedin),
      ]);
    } catch (socialErr) {
      // Social posting is best-effort — log but don't fail the whole request
      console.warn("[generate-post] Social post failed:", socialErr);
    }

    return NextResponse.json({
      ok:   true,
      _id:  doc._id,
      slug: post.slug,
      url:  postUrl,
    });
  } catch (err) {
    console.error("[generate-post]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
