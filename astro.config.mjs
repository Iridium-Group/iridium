// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://iridium-group.github.io",
  base: "/iridium",
  trailingSlash: "ignore",
  output: "static",
  build: {
    format: "directory",
  },
});
