#!/usr/bin/env node
// Verifies that every internal link and asset reference in the built site resolves to a file in dist/.
// Internal means a URL that starts with the site base (/iridium, or / on Vercel) or is relative; in-page #fragments
// are checked against element ids. External URLs are not fetched.
import { readFile, readdir, stat } from "node:fs/promises";
import { join, resolve, relative, extname } from "node:path";

// Must match the base in astro.config.mjs (a bare "/" is stored as an empty prefix).
const onVercel = Boolean(process.env.VERCEL);
const BASE = (process.env.SITE_BASE ?? (onVercel ? "/" : "/iridium")).replace(/\/$/, "");
const DIST = resolve(process.argv[2] ?? "dist");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function exists(path) {
  try {
    return await stat(path);
  } catch {
    return null;
  }
}

/** Map a URL path inside the site to a file in dist, or null if none exists. */
async function resolveTarget(pathname) {
  const decoded = decodeURIComponent(pathname);
  const candidates = [];
  const local = join(DIST, decoded);
  if (decoded.endsWith("/")) candidates.push(join(local, "index.html"));
  else {
    candidates.push(local, `${local}.html`, join(local, "index.html"));
  }
  for (const c of candidates) {
    const s = await exists(c);
    if (s?.isFile()) return c;
  }
  return null;
}

const idCache = new Map();
async function idsIn(file) {
  if (!idCache.has(file)) {
    const html = await readFile(file, "utf8");
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
}

const files = (await walk(DIST)).filter((f) => extname(f) === ".html");
if (files.length === 0) {
  console.error(`No HTML files found in ${DIST}. Run "npm run build" first.`);
  process.exit(1);
}

const attr = /\s(?:href|src)="([^"]*)"/g;
const problems = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(file, "utf8");
  const pageUrl = "/" + relative(DIST, file).split("\\").join("/");
  const pagePath = BASE + pageUrl.replace(/index\.html$/, "");
  for (const [, raw] of html.matchAll(attr)) {
    const value = raw.replaceAll("&amp;", "&").trim();
    if (value === "") {
      problems.push(`${relative(DIST, file)}: empty link`);
      continue;
    }
    if (/^(https?:|mailto:|tel:|data:)/i.test(value) || value.startsWith("//")) continue;

    const url = new URL(value, `https://site.invalid${pagePath}`);
    let target;
    if (value.startsWith("#")) {
      target = file;
    } else {
      if (!url.pathname.startsWith(BASE)) {
        problems.push(`${relative(DIST, file)}: ${value} is outside the base path ${BASE}`);
        continue;
      }
      target = await resolveTarget(url.pathname.slice(BASE.length) || "/");
      if (!target) {
        problems.push(`${relative(DIST, file)}: ${value} does not resolve`);
        continue;
      }
    }
    checked++;
    const fragment = decodeURIComponent(url.hash.slice(1));
    if (fragment && extname(target) === ".html" && !(await idsIn(target)).has(fragment)) {
      problems.push(`${relative(DIST, file)}: ${value} points to a missing id "${fragment}"`);
    }
  }
}

if (problems.length > 0) {
  console.error(`Found ${problems.length} broken internal link(s):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`Checked ${checked} internal links across ${files.length} pages. All resolve.`);
