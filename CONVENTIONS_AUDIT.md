# Conventions Audit

Audit date: 2026-06-06
Audited against conventions defined in: `CLAUDE.md`

---

## Status

### Source files (src/)
No source files exist yet. The project is at initial setup stage — `src/` will be created when the first component is built. All future files must follow the conventions from the start; there is no legacy code to migrate.

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

## Action Required Before First Component

When the first `.vue` file is created, verify:
- [ ] Filename is `kebab-case` (folder) + `PascalCase` (component name): `vfk-button/VfkButton.vue`
- [ ] `<script setup lang="ts">` at the top — no Options API, no class syntax
- [ ] All style values use `var(--token-name)` — no literals
- [ ] JSDoc block present
- [ ] Story file created in `src/stories/`
- [ ] Test file created in `src/tests/`
