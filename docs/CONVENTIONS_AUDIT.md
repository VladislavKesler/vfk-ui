# Conventions Audit

Audit date: 2026-06-08
Audited against conventions defined in: `CLAUDE.md`

---

## Status

### Source files (src/)

| File | Status | Notes |
|------|--------|-------|
| `src/components/elements/vfk-button/VfkButton.vue` | ✅ Compliant | `<script setup lang="ts">`, CSS Custom Properties only, JSDoc, ARIA |
| `src/stories/elements/VfkButton.stories.ts` | ✅ Compliant | CSF3, `@storybook/vue3-vite`, interaction tests, realistic args |
| `src/tests/elements/VfkButton.spec.ts` | ✅ Compliant | 10 unit tests, behavior-focused, no snapshot tests |

### Documentation files

| File | Status | Notes |
|------|--------|-------|
| `CLAUDE.md` | ✅ Compliant | English, structured, under 50 lines |
| `src/components/CONTEXT.md` | ✅ Compliant | English, correct workspace |
| `src/stories/CONTEXT.md` | ✅ Compliant | English, correct workspace |
| `src/styles/CONTEXT.md` | ✅ Compliant | English, correct workspace |
| `src/tests/CONTEXT.md` | ✅ Compliant | English, correct workspace |
| `CONVENTIONS_AUDIT.md` | ✅ Compliant | This file |

### Component catalog

| File | Status | Notes |
|------|--------|-------|
| `structure.md` | ✅ Compliant | English component catalog — translate patterns to Vue 3 when implementing |

---

## Checklist — VfkButton (first component)

- [x] Filename is `kebab-case` (folder) + `PascalCase` (component name): `vfk-button/VfkButton.vue`
- [x] `<script setup lang="ts">` at the top — no Options API, no class syntax
- [x] All style values use `var(--token-name)` — no literals
- [x] JSDoc block present
- [x] Story file created in `src/stories/elements/`
- [x] Test file created in `src/tests/elements/`

## Known ESLint Rule

Stories must import `Meta`/`StoryObj` from `@storybook/vue3-vite` (the framework package), **not** `@storybook/vue3` (the renderer). Rule: `storybook/no-renderer-packages`.
