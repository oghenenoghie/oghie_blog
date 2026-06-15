import Anthropic from "@anthropic-ai/sdk";
import { slugify } from "./utils";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  body: unknown[];   // Sanity portable text blocks
}

export async function generateBlogPost(topic: string): Promise<GeneratedPost> {
  const message = await anthropic.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `You are an expert digital marketing writer for Oghie Blog, a world-class affiliate and SEO blog.

Write a comprehensive, SEO-optimised blog post about: "${topic}"

Requirements:
- Target keyword density: 1–2% naturally
- Include H2 and H3 headings for structure
- Actionable tips the reader can implement today
- Where appropriate, note where affiliate links or product recommendations would go (use placeholder text like "[PRODUCT LINK]")
- Tone: Expert but approachable, no fluff

Respond ONLY with valid JSON in this exact structure:
{
  "title": "...",
  "excerpt": "...(max 160 chars for SEO meta description)...",
  "body": [
    { "_type": "block", "style": "normal", "children": [{ "_type": "span", "text": "..." }] },
    { "_type": "block", "style": "h2", "children": [{ "_type": "span", "text": "..." }] }
  ]
}

Use block styles: normal, h2, h3, blockquote. Keep portable text format valid.`,
      },
    ],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text : "{}";
  // Strip markdown fences if present
  const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
  const parsed = JSON.parse(cleaned) as { title: string; excerpt: string; body: unknown[] };

  return {
    title:   parsed.title,
    slug:    slugify(parsed.title),
    excerpt: parsed.excerpt,
    body:    parsed.body,
  };
}

export async function generateSocialPost(title: string, excerpt: string, url: string): Promise<{ twitter: string; linkedin: string }> {
  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `Create two social media posts promoting this blog article for Oghie Blog.

Title: ${title}
Excerpt: ${excerpt}
URL: ${url}

Respond with JSON only:
{
  "twitter": "...(max 240 chars, include URL, 2-3 hashtags)...",
  "linkedin": "...(max 600 chars, professional tone, include URL)..."
}`,
      },
    ],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text : "{}";
  const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
  return JSON.parse(cleaned) as { twitter: string; linkedin: string };
}
