# vfk-ui

**Vue 3 component library** — Vite · TypeScript · Storybook 8 · Vitest. Three-tier hierarchy: `elements/` (atomic) → `fragments/` (composed) → `layout/` (structural). Component catalog in [`structure.md`](structure.md) — always translate patterns to Vue 3 `<script setup>`.

## Commands

| Action     | Command             |
| ---------- | ------------------- |
| Dev server | `npm run dev`       |
| Storybook  | `npm run storybook` |
| Tests      | `npm run test`      |
| Build      | `npm run build`     |

## Folder Structure

| Task             | Folder          | Read                                    |
| ---------------- | --------------- | --------------------------------------- |
| Build components | /src/components | [CONTEXT.md](src/components/CONTEXT.md) |
| Write stories    | /src/stories    | [CONTEXT.md](src/stories/CONTEXT.md)    |
| Design Tokens    | /src/styles     | [CONTEXT.md](src/styles/CONTEXT.md)     |
| Tests            | /src/tests      | [CONTEXT.md](src/tests/CONTEXT.md)      |

## Conventions

- **Language**: English — all code, comments, and documentation
- **Files**: `kebab-case` filenames · `PascalCase` Vue component names
- **Hierarchy**: `elements/` → `fragments/` → `layout/` — lower tiers may not import higher
- **Commits**: Conventional Commits (`feat:`, `fix:`, `BREAKING CHANGE:`)
- **CSS**: CSS Custom Properties only — no hardcoded colors, spacing, or typography
- **Comments**: JSDoc block per component (props, events, example); non-obvious logic only
- **Accessibility**: ARIA labels and keyboard navigation on all interactive components
- **Reuse first**: Check existing components before building new; document the decision
- **README**: Keep `README.md` up to date whenever components, commands, or setup steps change

## Component Checklist (required before every merge)

- [ ] At least one Storybook story
- [ ] At least one Interaction Test or Vitest test covering logic
- [ ] All props typed with TypeScript · JSDoc block present · No hardcoded styles · ARIA where applicable

## Git Rules

- **No direct commits or pushes to `main`** — feature branches only
- **Branch naming**: `feat/component-name` or `fix/issue-description`
- **Merging**: Pull Request only; branch protection on `main` must be enabled
- **Only the repository owner pushes to GitHub**
- **Commit after every unit of work**: Write a meaningful commit after every `feat`, `fix`, `chore`, or `refactor` — one logical change per commit, no batching unrelated changes

## Forbidden

- Direct commits or pushes to `main`
- Hardcoded colors, spacing, or font values — use `var(--token-name)` only
- Class-based Vue components — `<script setup>` exclusively
- Implementing component patterns without translating to Vue 3 `<script setup>` syntax
- Merging without passing the checklist · Renaming/deleting files without confirmation
