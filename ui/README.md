# Iridium UI kit

Shared design pieces for Iridium Group web projects. They live in this folder of the
`iridium` website repository and are used directly by the site.

## Contents

| File                           | Purpose                                                                    |
| ------------------------------ | -------------------------------------------------------------------------- |
| `tokens.css`                   | Design tokens (`--ir-*` custom properties). The single source of truth.    |
| `base.css`                     | Reset, typography, focus ring, container, and reduced-motion rules.        |
| `status.ts`                    | Status labels and definitions (Stable, Active, Experimental, ...).         |
| `components/Button.astro`      | Link styled as a primary, secondary, or ghost button.                      |
| `components/Badge.astro`       | Small monospace label for tech or metadata.                                |
| `components/Status.astro`      | Status pill driven by `status.ts`.                                         |
| `components/Card.astro`        | Bordered surface for grouped content.                                      |
| `components/CodeBlock.astro`   | Code sample with a copy button (shown only when the Clipboard API exists). |
| `components/Nav.astro`         | Site header with the Iridium mark. The one glass surface in the kit.       |
| `components/Footer.astro`      | Site footer with grouped links.                                            |
| `components/ProjectCard.astro` | Editorial project row (a `<li>`; wrap rows in a `<ul>`).                   |

Components take all content through props and import nothing from the site, so they can be
copied into another Astro project as-is.

## How other Iridium sites use it

There is no published package. `iridium-docs` and `iridium-status` reuse the kit by copying
`tokens.css` (and, where useful, `base.css`) into their own repositories. When a token changes
here, those copies need the same change by hand.

## Rules

- Use the `--ir-*` token names exactly; do not add new colors inline.
- Keep borders at 1px and radii at `--ir-radius` or `--ir-radius-sm`.
- Every interactive element must show the `--ir-focus` outline on keyboard focus.
- Motion must stay optional: respect `prefers-reduced-motion`.
