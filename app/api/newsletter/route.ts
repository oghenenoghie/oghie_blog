// ============================================================
// POST /api/newsletter
// Stores the subscriber then sends a Supabase magic-link email
// for confirmation — no Resend or external service needed.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient, createStaticClient } from "@/lib/supabase/server";

const schema = z.object({
  name:  z.string().min(2).max(100),
  email: z.string().email(),
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = schema.parse(body);

    // 1 ── Save subscriber (unconfirmed) to our table
    const supabase = createServiceClient();
    const { error: dbError } = await supabase.from("subscribers").upsert(
      { email, name, confirmed_at: null },
      { onConflict: "email", ignoreDuplicates: false }
    );
    if (dbError) throw dbError;

    // 2 ── Send confirmation magic-link via Supabase built-in email
    //      The user clicks the link → /auth/callback confirms them.
    const anonClient = createStaticClient();
    const { error: otpError } = await anonClient.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${SITE_URL}/auth/callback?next=/subscribe/confirmed`,
        data: { name },
      },
    });

    if (otpError) throw otpError;

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
