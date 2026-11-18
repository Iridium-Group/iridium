import type { StatusId } from "../../ui/status";

export type ProjectKind = "Infrastructure" | "Library" | "Tool" | "Site" | "Organization";

export interface Project {
  /** Repository name under github.com/Iridium-Group */
  name: string;
  /** npm package name, when the repository is a package */
  packageName?: string;
  kind: ProjectKind;
  description: string;
  status: StatusId;
  tech: string[];
  license: string;
  github: string;
  docs: string;
  /** Show in the compact list on the home page */
  featured?: boolean;
}

const gh = (repo: string) => `https://github.com/Iridium-Group/${repo}`;
const docs = (slug: string) => `https://iridium-group.github.io/iridium-docs/${slug}`;

export const projects: Project[] = [
  {
    name: "iridium-proxy",
    kind: "Infrastructure",
    description:
      "Open web infrastructure for browser-based networking and proxy applications. A Node server that hosts a Wisp endpoint and serves the Scramjet client with an Epoxy transport.",
    status: "experimental",
    tech: ["Node.js", "TypeScript", "Wisp", "Scramjet"],
    license: "AGPL-3.0-only",
    github: gh("iridium-proxy"),
    docs: docs("proxy/"),
    featured: true,
  },
  {
    name: "iridium-transport",
    packageName: "@iridium-group/transport",
    kind: "Library",
    description:
      "A small transport interface with direct, Wisp client, and in-memory implementations, plus an address policy that rejects private and reserved destinations.",
    status: "experimental",
    tech: ["TypeScript", "Web Streams", "WebSocket"],
    license: "MIT",
    github: gh("iridium-transport"),
    docs: docs("transport/"),
    featured: true,
  },
  {
    name: "iridium-config",
    packageName: "@iridium-group/config",
    kind: "Library",
    description:
      "Zero-dependency loading and validation for Iridium configuration files, with environment overrides and a published JSON Schema.",
    status: "experimental",
    tech: ["TypeScript", "JSON Schema"],
    license: "MIT",
    github: gh("iridium-config"),
    docs: docs("config/"),
    featured: true,
  },
  {
    name: "iridium-utils",
    packageName: "@iridium-group/utils",
    kind: "Library",
    description:
      "Pure helpers for Node and browsers: URL parsing, encodings, safe JSON, header handling, timing, and private-address checks.",
    status: "experimental",
    tech: ["TypeScript"],
    license: "MIT",
    github: gh("iridium-utils"),
    docs: docs("utils/"),
    featured: true,
  },
  {
    name: "iridium-inspector",
    kind: "Tool",
    description:
      "A browser-based developer tool for inspecting URLs, encodings, headers, and JSON, built on the Iridium utilities. Runs entirely in the page.",
    status: "development",
    tech: ["TypeScript", "Static site"],
    license: "MIT",
    github: gh("iridium-inspector"),
    docs: docs("inspector/"),
    featured: true,
  },
  {
    name: "iridium-examples",
    kind: "Tool",
    description: "Small, runnable examples that show how the Iridium libraries fit together.",
    status: "development",
    tech: ["Node.js", "TypeScript"],
    license: "MIT",
    github: gh("iridium-examples"),
    docs: docs("examples/"),
  },
  {
    name: "iridium-docs",
    kind: "Site",
    description: "Documentation for every Iridium project, deployed with GitHub Pages.",
    status: "development",
    tech: ["Static site", "Markdown"],
    license: "MIT",
    github: gh("iridium-docs"),
    docs: docs(""),
  },
  {
    name: "iridium-status",
    kind: "Site",
    description:
      "A static status page for Iridium services, updated by scheduled GitHub Actions checks.",
    status: "development",
    tech: ["Node.js", "GitHub Actions", "Static site"],
    license: "MIT",
    github: gh("iridium-status"),
    docs: docs("status/"),
  },
  {
    name: "iridium",
    kind: "Site",
    description:
      "This website, and the shared Iridium UI kit: design tokens, base styles, and components.",
    status: "development",
    tech: ["Astro", "CSS"],
    license: "MIT",
    github: gh("iridium"),
    docs: docs("website/"),
  },
  {
    name: ".github",
    kind: "Organization",
    description:
      "Organization profile and shared community files: contributing guide, code of conduct, and security policy.",
    status: "development",
    tech: ["Markdown"],
    license: "MIT",
    github: gh(".github"),
    docs: docs("contributing/"),
  },
];
