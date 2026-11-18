# Contributing to iridium

Thanks for helping. The general process, commit conventions, and review expectations are in the
[Iridium Group contributing guide](https://github.com/Iridium-Group/.github/blob/main/CONTRIBUTING.md).
This file covers what is specific to the website.

## Setup

```sh
npm ci
npm run dev
```

## Before you open a pull request

Run the same checks as CI:

```sh
npm run format:check
npm run typecheck
npm run build
npm run check:links
```

## Guidelines

- Project entries live in `src/data/projects.ts`. Keep status labels honest: use the definitions
  in `ui/status.ts`, and do not add metrics, counts, or badges that are not backed by real data.
- Use the `--ir-*` tokens from `ui/tokens.css` instead of new colors.
- Changes to `ui/` affect other Iridium sites that copy these files. Note any token change in
  the pull request description.
- Check new layouts at 360 px and 1440 px wide, with keyboard navigation, and with reduced motion
  enabled.
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`).
