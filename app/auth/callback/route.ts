// ============================================================
// GET /auth/callback
// Supabase redirects here after the user clicks the magic link.
// We exchange the code for a session, mark the subscriber as
// confirmed in our table, then forward to ?next= destination.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    // No code — likely a direct visit; redirect home
    return NextResponse.redirect(`${SITE_URL}/`);
  }

  try {
    // Exchange the one-time code for a session (sets the auth cookie)
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) throw error;

    const email = data.session?.user?.email;

    if (email) {
      // Mark the subscriber row as confirmed
      const service = createServiceClient();
      await service
        .from("subscribers")
        .update({
          confirmed_at: new Date().toISOString(),
          status: "active",
        })
        .eq("email", email)
        .is("confirmed_at", null); // only update if not already confirmed
    }
  } catch (err) {
    console.error("[auth/callback]", err);
    // Still redirect — don't leave the user on a blank page
  }

  return NextResponse.redirect(`${SITE_URL}${next}`);
}
