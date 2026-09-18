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

## Library Usage

Consuming apps install directly from GitHub (this package is `private: true`,
not on the npm registry):

```bash
npm install github:VladislavKesler/vfk-ui#main
```

`npm install` runs the `prepare` script, which builds `dist/` (component
bundle + rolled-up types) on the fly — no separate build step needed on the
consumer side.

```ts
import { VfkButton, VfkCard } from 'vfk-ui'
import 'vfk-ui/style.css' // design tokens, reset, component styles
```

Fonts (`@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono`) are **not**
bundled into `style.css` — inlining them would add >1MB of base64. Consumers
load the weights they need themselves, e.g.:

```ts
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-mono/400.css'
```

Only `elements/` and `fragments/` components are exported. `layout/`
components such as `SiteNav` are internal to this repo's demo site.

## Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run storybook` | Launch Storybook component explorer |
| `npm run test` | Run Vitest test suite |
| `npm run build` | Build the demo/Storybook app |
| `npm run build:lib` | Build the distributable package (`dist/`) consumers install |

## Contributing

- Branch off `main` using `feat/component-name` or `fix/issue-description`
- Every component requires a Storybook story and at least one test before merge
- Follow [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `chore:`, `BREAKING CHANGE:`
- Write a meaningful commit after every unit of work — no batching unrelated changes
- Open a Pull Request; direct pushes to `main` are not permitted

See [`CLAUDE.md`](CLAUDE.md) for the full coding conventions and component checklist.
