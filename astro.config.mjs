// @ts-check
import { defineConfig } from "astro/config";

// GitHub Pages serves this site under /iridium; Vercel serves it at the root. Vercel sets VERCEL
// during its builds, so the right base is chosen without any setting. SITE_BASE and SITE_URL
// override both (for example for a custom domain).
const onVercel = Boolean(process.env.VERCEL);
const base = process.env.SITE_BASE ?? (onVercel ? "/" : "/iridium");
const site =
  process.env.SITE_URL ??
  (onVercel && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://iridium-group.github.io");

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  output: "static",
  build: {
    format: "directory",
  },
});
