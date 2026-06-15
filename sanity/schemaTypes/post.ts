import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title",  title: "Title",  type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug",   title: "Slug",   type: "slug",   options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt (SEO)", type: "text", rows: 3 }),
    defineField({
      name: "mainImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
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
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({
      name: "estimatedReadingTime",
      title: "Estimated Reading Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal",     value: "normal"     },
            { title: "H2",         value: "h2"         },
            { title: "H3",         value: "h3"         },
            { title: "H4",         value: "h4"         },
            { title: "Quote",      value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold",      value: "strong"    },
              { title: "Italic",    value: "em"        },
              { title: "Code",      value: "code"      },
              { title: "Highlight", value: "highlight" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({ name: "href",  type: "url",     title: "URL" }),
                  defineField({ name: "blank", type: "boolean", title: "Open in new tab" }),
                ],
              },
              {
                name: "affiliateLink",
                type: "object",
                title: "Affiliate Link",
                fields: [
                  defineField({ name: "href",         type: "url",    title: "Affiliate URL" }),
                  defineField({ name: "disclosure",   type: "string", title: "Disclosure text" }),
                ],
              },
            ],
          },
        },
        { type: "image", options: { hotspot: true }, fields: [
          defineField({ name: "alt",     title: "Alt Text", type: "string" }),
          defineField({ name: "caption", title: "Caption",  type: "string" }),
        ]},
        {
          name: "callout",
          title: "Callout Box",
          type: "object",
          fields: [
            defineField({ name: "text", title: "Text", type: "text" }),
            defineField({ name: "tone", title: "Tone", type: "string", options: { list: ["info", "warning", "success"] } }),
          ],
        },
      ],
    }),
    defineField({ name: "aiGenerated",    title: "AI Generated",     type: "boolean", initialValue: false }),
    defineField({ name: "socialPosted",   title: "Posted to Social", type: "boolean", initialValue: false }),
    defineField({ name: "newsletterSent", title: "Sent in Newsletter",type: "boolean", initialValue: false }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "seoTitle",       title: "SEO Title (override)",       type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description (override)", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "mainImage" },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `by ${author}` : "No author", media };
    },
  },
  orderings: [
    { title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
});
