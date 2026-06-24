#!/usr/bin/env node
/**
 * Push a blog post JSON to Sanity CMS.
 *
 * Usage:
 *   node scripts/sanity-create-post.mjs --input /tmp/post.json
 *   cat /tmp/post.json | node scripts/sanity-create-post.mjs
 *
 * Required env vars (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET   (defaults to "production")
 *   SANITY_WRITE_TOKEN
 */

import { readFileSync, existsSync } from "fs";
import { createInterface } from "readline";
import { createHash, randomBytes } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

// ── Load .env.local ──────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, "");
  }
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN      = process.env.SANITY_WRITE_TOKEN;
const API_VER    = "2024-01-01";

if (!PROJECT_ID) { console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set"); process.exit(1); }
if (!TOKEN)       { console.error("❌  SANITY_WRITE_TOKEN is not set"); process.exit(1); }

const SANITY_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VER}/data`;

// ── Helpers ──────────────────────────────────────────────────────────────────
function uid() { return randomBytes(8).toString("hex"); }

/** Generate a short block key (required by Sanity for Portable Text spans). */
function blockKey() { return randomBytes(5).toString("hex"); }

/** Read all stdin as a string. */
function readStdin() {
  return new Promise((resolve) => {
    let buf = "";
    const rl = createInterface({ input: process.stdin });
    rl.on("line", (l) => (buf += l + "\n"));
    rl.on("close", () => resolve(buf.trim()));
  });
}

async function sanityQuery(query, params = {}) {
  const url = new URL(`${SANITY_URL}/query/${DATASET}`);
  url.searchParams.set("query", query);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v));
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${await res.text()}`);
  return (await res.json()).result;
}

async function sanityMutate(mutations) {
  const res = await fetch(`${SANITY_URL}/mutate/${DATASET}?returnIds=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) throw new Error(`Sanity mutate failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/**
 * Convert a plain-text body (paragraph blocks separated by blank lines,
 * # for h2, ## for h3) into Sanity Portable Text blocks.
 * Also accepts a pre-built array of Portable Text blocks directly.
 */
function toPortableText(body) {
  if (Array.isArray(body)) {
    // Already Portable Text — ensure keys exist
    return body.map((block) => ({
      ...block,
      _key: block._key ?? blockKey(),
      children: (block.children ?? []).map((c) => ({ ...c, _key: c._key ?? blockKey() })),
    }));
  }

  if (typeof body !== "string") return [];

  const paragraphs = body.split(/\n{2,}/);
  return paragraphs
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      let style = "normal";
      let text  = p;

      if (p.startsWith("### ")) { style = "h3"; text = p.slice(4); }
      else if (p.startsWith("## ")) { style = "h2"; text = p.slice(3); }
      else if (p.startsWith("# ")) { style = "h2"; text = p.slice(2); }
      else if (p.startsWith("> ")) { style = "blockquote"; text = p.slice(2); }

      return {
        _type: "block",
        _key: blockKey(),
        style,
        markDefs: [],
        children: [{ _type: "span", _key: blockKey(), text, marks: [] }],
      };
    });
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // Read input JSON
  const inputFlag = process.argv.indexOf("--input");
  let raw;
  if (inputFlag !== -1 && process.argv[inputFlag + 1]) {
    raw = readFileSync(process.argv[inputFlag + 1], "utf8");
  } else {
    raw = await readStdin();
  }

  const post = JSON.parse(raw);

  // Validate required fields
  for (const f of ["title", "slug", "body"]) {
    if (!post[f]) { console.error(`❌  Missing required field: ${f}`); process.exit(1); }
  }

  // Resolve category _id by slug
  let categoryRef = null;
  if (post.category) {
    const cats = await sanityQuery(
      `*[_type=="category" && slug.current==$slug][0]{ _id }`,
      { slug: post.category }
    );
    if (cats?._id) {
      categoryRef = { _type: "reference", _ref: cats._id };
    } else {
      console.warn(`⚠️  Category "${post.category}" not found — skipping category field`);
    }
  }

  // Resolve author _id (first author, or by name)
  let authorRef = null;
  const authorQuery = post.authorName
    ? `*[_type=="author" && name==$name][0]{ _id }`
    : `*[_type=="author"] | order(_createdAt asc)[0]{ _id }`;
  const authorParams = post.authorName ? { name: post.authorName } : {};
  const author = await sanityQuery(authorQuery, authorParams);
  if (author?._id) {
    authorRef = { _type: "reference", _ref: author._id };
  } else {
    console.warn("⚠️  No author found — skipping author field");
  }

  // Build the Sanity document (draft)
  const docId = `drafts.${uid()}`;
  const doc = {
    _id:   docId,
    _type: "post",
    title: post.title,
    slug:  { _type: "slug", current: post.slug },
    publishedAt: post.publishedAt ?? new Date().toISOString(),
    excerpt: post.excerpt ?? null,
    estimatedReadingTime: post.estimatedReadingTime ?? null,
    aiGenerated: true,
    socialPosted: false,
    body: toPortableText(post.body),
    seoTitle:       post.seoTitle       ?? post.title,
    seoDescription: post.seoDescription ?? post.excerpt ?? null,
    tags: post.tags ?? [],
    ...(categoryRef && { category: categoryRef }),
    ...(authorRef   && { author:   authorRef }),
  };

  console.log(`📝  Creating draft post: "${post.title}"`);
  const result = await sanityMutate([{ create: doc }]);
  const created = result.results?.[0];

  console.log(`✅  Draft created!`);
  console.log(`    Document ID : ${created?.id ?? docId}`);
  console.log(`    Slug        : ${post.slug}`);
  console.log(`    Studio URL  : https://oghie-blog.sanity.studio/structure/post;${created?.id ?? docId}`);
}

main().catch((err) => { console.error("❌ ", err.message); process.exit(1); });
