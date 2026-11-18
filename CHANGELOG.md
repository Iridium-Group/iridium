# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.1.0 — 2026-11-19

### Added

- Astro static site with the `/iridium` base path: home, projects, infrastructure, community,
  and 404 pages.
- Projects list for all ten Iridium repositories from a single data file,
  `src/data/projects.ts`, with a status legend.
- Architecture diagram (Client, Iridium Proxy, Transport, Target) drawn in HTML and CSS.
- Shared UI kit in `ui/`: design tokens, base styles, status definitions, and Button, Badge,
  Status, Card, CodeBlock, Nav, Footer, and ProjectCard components.
- Self-hosted Inter, Space Grotesk, and JetBrains Mono fonts.
- `scripts/check-links.mjs` to verify internal links and assets in the build output.
- CI workflow (format check, `astro check`, build, link check on Node 22 and 24), GitHub Pages
  deploy workflow, and Dependabot configuration.
