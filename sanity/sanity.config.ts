import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name:      "oghie-blog",
  title:     "Oghie Blog Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wbphzmlj",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET    ?? "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
  basePath: "/studio",
});
