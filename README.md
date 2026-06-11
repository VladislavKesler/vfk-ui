# vfk-ui

A Vue 3 component library providing reusable, accessible UI components. Built with Vite, TypeScript, Storybook, and Vitest.

## Component Architecture

Components are organized in three tiers — lower tiers never import from higher ones:

```
src/components/
  elements/     # Atomic: Button, Badge, Checkbox, Icon, TextField, …
  fragments/    # Composed: Alert, Notification, ProgressBar, TeaserCard, …
  layout/       # Structural: Header, Footer, Navigation, Dialog, Grid
```

Full component catalog: [`structure.md`](structure.md)

## Getting Started

> Prerequisites: Node.js 20+

```bash
npm install
```

## Design Tokens

Visual design tokens (colors, typography, radius, shadow, spacing, easing) live
in [`src/styles/tokens/`](src/styles/tokens/) as CSS Custom Properties — see
[`src/styles/CONTEXT.md`](src/styles/CONTEXT.md). The current theme is
**Meridian** (deep navy ink, azure accent, IBM Plex Sans/Mono). Fonts are
loaded via `@fontsource/ibm-plex-sans` and `@fontsource/ibm-plex-mono`,
imported once in [`src/main.ts`](src/main.ts).

## Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run storybook` | Launch Storybook component explorer |
| `npm run test` | Run Vitest test suite |
| `npm run build` | Build the library for distribution |

## Contributing

- Branch off `main` using `feat/component-name` or `fix/issue-description`
- Every component requires a Storybook story and at least one test before merge
- Follow [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `chore:`, `BREAKING CHANGE:`
- Write a meaningful commit after every unit of work — no batching unrelated changes
- Open a Pull Request; direct pushes to `main` are not permitted

See [`CLAUDE.md`](CLAUDE.md) for the full coding conventions and component checklist.
