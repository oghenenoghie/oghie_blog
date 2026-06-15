import { NextResponse } from "next/server";

// Simple health check for Render's uptime monitoring.
export async function GET() {
  return NextResponse.json({ status: "ok", ts: Date.now() });
}
