import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/lib/client";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Full-text search in post titles, excerpts, and tags
    const results = await sanityClient.fetch(
      `*[_type == "post" && defined(publishedAt) && (
        title match $q + "*" ||
        excerpt match $q + "*" ||
        $q in tags
      )] | order(publishedAt desc) [0...20] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        estimatedReadingTime,
        mainImage { asset->{ url }, alt },
        category->{ title, slug },
        author->{ name }
      }`,
      { q: q.toLowerCase() },
      { next: { revalidate: 0 } }
    );

    return NextResponse.json({ results });
  } catch (err) {
    console.error("[/api/search]", err);
    return NextResponse.json({ results: [] });
  }
}
