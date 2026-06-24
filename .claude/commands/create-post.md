# Create Blog Post

Research trending topics, generate a full blog post, and publish it to Sanity CMS as a draft.

## Arguments

`$ARGUMENTS` — The topic or title to write about. If blank, search for trending affiliate marketing / passive income topics yourself.

## Step-by-step workflow

### 1. Research

If `$ARGUMENTS` is provided, use it as the topic seed. Otherwise search the web for:
- "affiliate marketing news today"
- "passive income trends [current month year]"
- "top Google Trends finance/blogging topics"

Pick the most newsworthy, useful angle. Note key facts, data points, and sources you find.

### 2. Source a hero image

Find a relevant, royalty-free image **before** writing the post JSON.

1. Use WebSearch: `pexels.com "{main topic keyword}" free photo` (e.g. `pexels.com "affiliate marketing" free photo`)
2. Use WebFetch on one of the results to visit a Pexels photo page and locate the direct CDN image URL in the HTML — it looks like:
   `https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?...`
3. If Pexels doesn't yield a usable URL, try Unsplash:
   - WebSearch: `unsplash.com "{main topic keyword}" photo`
   - WebFetch the page and find a CDN URL like:
     `https://images.unsplash.com/photo-{ID}?w=1200&h=630&fit=crop&auto=format&q=80`

Use the direct CDN image URL (not an HTML page URL) as `imageUrl` in the JSON.  
Write a concise, descriptive `imageAlt` (10–15 words) for the image you chose.

### 3. Generate post JSON

Create a JSON object matching this schema (every field is plain JSON, no Markdown fences):

```json
{
  "title": "Headline under 80 chars, title-case",
  "slug": "url-safe-kebab-case-from-title",
  "excerpt": "2–3 sentence summary, under 160 chars",
  "imageUrl": "https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "imageAlt": "Descriptive alt text for the hero image (10–15 words)",
  "publishedAt": "2026-06-24T00:00:00.000Z",
  "estimatedReadingTime": 5,
  "category": "one-of-the-slugs-below",
  "tags": ["tag1", "tag2"],
  "seoTitle": "SEO headline ≤60 chars",
  "seoDescription": "Meta description ≤160 chars",
  "body": "Full article text — see Portable Text rules below"
}
```

> **`imageUrl` is required** — the push script will error without it. Every published post must have a hero image.

**Category slugs** (use exactly one):
- `getting-approved` — getting into affiliate programs
- `programs` — reviewing specific programs / networks
- `traffic` — driving visitors (Pinterest, email, paid ads)
- `seo` — search engine optimization for affiliate sites
- `tools` — software, plugins, and platforms
- `passive-income` — building automated income streams

**`body` field — two formats accepted:**

*Format A — plain Markdown-ish string (easiest):*
Separate paragraphs with blank lines. Prefix headings with `## ` or `### `.  
Start blockquotes with `> `.  
The script converts these to Portable Text automatically.

```
Opening paragraph with hook and key insight.

## First Main Section

Body paragraph exploring the topic with facts, data, or examples.

## Second Section

Another paragraph. Include a practical tip or action step.

> Pull-quote or key stat worth highlighting.

## Conclusion

Wrap up with a clear takeaway and call to action.
```

*Format B — Sanity Portable Text array (advanced, use only if you need precise control):*
```json
[
  {
    "_type": "block",
    "_key": "a1b2c3",
    "style": "normal",
    "markDefs": [],
    "children": [{ "_type": "span", "_key": "d4e5f6", "text": "Paragraph text.", "marks": [] }]
  }
]
```
`style` options: `normal`, `h2`, `h3`, `blockquote`

**Writing guidelines:**
- Aim for 800–1 200 words (estimatedReadingTime 4–6)
- Affiliate marketing niche — practical, actionable, credibility-building
- No filler ("In conclusion…", "It's important to note…")
- Use real data or named programs where possible
- Write in a confident editorial voice, not AI-sounding

### 4. Write to temp file

Save the JSON to a temp file:
```bash
cat > /tmp/claude-blog-post.json << 'POSTEOF'
{ ... your JSON ... }
POSTEOF
```

Validate it parses correctly:
```bash
node -e "JSON.parse(require('fs').readFileSync('/tmp/claude-blog-post.json','utf8')); console.log('✅ valid JSON')"
```

### 5. Run the push script

```bash
node scripts/sanity-create-post.mjs --input /tmp/claude-blog-post.json
```

This will:
- Download the hero image from `imageUrl` and upload it to Sanity's media library
- Look up the category and author in Sanity
- Create the post as a **draft** (won't be publicly visible until you publish in Sanity Studio)
- Print the Studio URL for review

### 6. Report back

Tell the user:
- The post title and slug
- The Sanity Studio URL to review/edit/publish
- A 1-sentence summary of what the post covers

## Required environment variables

Make sure `.env.local` contains:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=sk...your_write_token...
```

Get the write token from: Sanity Studio → Manage → API → Tokens → Add API token (Editor or higher).
