// ============================================================
// Sanity Schema Reference — oghie_blog
// Full schemas for Post, Category, Author
// ============================================================

import { defineField, defineType } from "sanity";

// ── POST ──────────────────────────────────────────────────
export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
      description: "Short summary shown in post cards and meta description.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
        { type: "code" }, // requires @sanity/code-input plugin
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    // SEO
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      validation: (Rule) => Rule.max(60),
      description: "Overrides title in <title> tag. Max 60 chars.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(155),
      description: "Meta description. Max 155 chars.",
    }),
    // AI & Social flags
    defineField({
      name: "aiGenerated",
      title: "AI Generated",
      type: "boolean",
      description: "Set to true when Claude generated this draft.",
      initialValue: false,
    }),
    defineField({
      name: "socialPosted",
      title: "Social Posted",
      type: "boolean",
      description: "Set to true after auto-posting to social media.",
      initialValue: false,
    }),
    // Newsletter
    defineField({
      name: "newsletterSent",
      title: "Newsletter Sent",
      type: "boolean",
      description: "Set to true after sending to email subscribers.",
      initialValue: false,
    }),
    defineField({
      name: "featuredPost",
      title: "Featured Post",
      type: "boolean",
      description: "Show in hero/featured section on homepage.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      status: "status",
    },
    prepare({ title, author, media, status }) {
      const icons: Record<string, string> = { draft: "✏️", published: "✅", archived: "📦" };
      return {
        title: `${icons[status] ?? ""} ${title}`,
        subtitle: author ? `by ${author}` : "No author",
        media,
      };
    },
  },
  orderings: [
    { title: "Published (newest)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Title A-Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
});

// ── CATEGORY ──────────────────────────────────────────────
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "color", title: "Colour (hex)", type: "string", description: "Badge colour e.g. #3b82f6" }),
    defineField({ name: "icon", title: "Emoji Icon", type: "string", description: "Single emoji e.g. 📈" }),
  ],
});

// ── AUTHOR ────────────────────────────────────────────────
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "twitterHandle", title: "Twitter / X Handle", type: "string" }),
  ],
});

// ── INDEX ─────────────────────────────────────────────────
// sanity/schemaTypes/index.ts
export const schemaTypes = [post, category, author];
