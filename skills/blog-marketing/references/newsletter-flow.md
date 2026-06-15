# Newsletter Double Opt-In Flow

## Flow Overview

```
User fills form → POST /api/newsletter
  → Insert to Supabase (confirmed: false)
  → Send confirmation email (Resend)
     → User clicks link → GET /api/newsletter/confirm?token=xxx
        → Update confirmed: true in Supabase
        → Redirect to /subscribe/confirmed
```

## Confirmation Route

```ts
// app/api/newsletter/confirm/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return NextResponse.redirect(new URL("/", req.url));

  const supabase = createClient();
  const { error } = await supabase
    .from("subscribers")
    .update({ confirmed: true })
    .eq("confirmation_token", token)
    .eq("confirmed", false); // idempotent

  const base = process.env.NEXT_PUBLIC_SITE_URL!;
  return NextResponse.redirect(new URL(error ? "/subscribe/error" : "/subscribe/confirmed", base));
}
```

## Unsubscribe Route

```ts
// app/api/newsletter/unsubscribe/route.ts
export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get("email");
  if (!email) return NextResponse.redirect(new URL("/", req.url));

  const supabase = createClient();
  await supabase
    .from("subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("email", email);

  return NextResponse.redirect(new URL("/unsubscribed", process.env.NEXT_PUBLIC_SITE_URL!));
}
```

## Sending Newsletters When a Post is Published

Trigger: Sanity webhook on `status == "published" && !newsletterSent`

```ts
// app/api/newsletter/broadcast/route.ts
import { sendNewPostNewsletter } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  if (req.headers.get("x-cron-secret") !== process.env.CRON_SECRET)
    return new Response("Unauthorized", { status: 401 });

  const post = await req.json(); // { title, excerpt, slug }
  const supabase = createClient();

  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("email, name")
    .eq("confirmed", true)
    .is("unsubscribed_at", null);

  if (!subscribers?.length) return Response.json({ sent: 0 });

  await sendNewPostNewsletter(subscribers, post);
  return Response.json({ sent: subscribers.length });
}
```

## Tips

- Always include unsubscribe link in every email: `${SITE_URL}/api/newsletter/unsubscribe?email=${email}`
- Use Resend's batch API to avoid rate limits — 50 emails per batch on free tier
- Track open rates by adding a 1×1 pixel tracking image (Resend handles this automatically)
- Segment subscribers with `tags` array — e.g. tags: ["seo", "social-media"]
