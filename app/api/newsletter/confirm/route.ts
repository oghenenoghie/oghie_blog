// This route is no longer used.
// Subscription confirmation is now handled by Supabase Auth magic links.
// The callback lands at /auth/callback which marks the subscriber confirmed.
// Keeping this file to return a helpful redirect in case old links are clicked.

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/subscribe", req.url));
}
