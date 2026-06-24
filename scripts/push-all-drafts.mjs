#!/usr/bin/env node
/**
 * Push all JSON files in content/drafts/ to Sanity as draft posts.
 * Run this locally after cloning:
 *   node scripts/push-all-drafts.mjs
 */

import { readdirSync } from "fs";
import { execSync }    from "child_process";
import path            from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const draftsDir = path.resolve(__dirname, "../content/drafts");
const script    = path.resolve(__dirname, "sanity-create-post.mjs");

const files = readdirSync(draftsDir)
  .filter((f) => f.endsWith(".json"))
  .sort();

console.log(`Found ${files.length} draft(s) to push...\n`);

let passed = 0;
let failed = 0;

for (const file of files) {
  const fullPath = path.join(draftsDir, file);
  console.log(`── ${file}`);
  try {
    execSync(`node "${script}" --input "${fullPath}"`, { stdio: "inherit" });
    passed++;
  } catch {
    console.error(`   ❌  Failed: ${file}`);
    failed++;
  }
  console.log();
}

console.log(`Done. ${passed} pushed, ${failed} failed.`);
