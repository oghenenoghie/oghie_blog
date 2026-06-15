import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug",  title: "Slug",  type: "slug",   options: { source: "title" } }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      options: { list: ["navy", "signal", "gold", "teal"] },
    }),
  ],
});
