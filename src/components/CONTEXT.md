# /src/components — Component Workspace

## Purpose
All Vue 3 UI components live here, organized into three tiers. Lower tiers must never import from higher tiers.

## Tier Structure
```
src/components/
  elements/    # Atomic: Button, Badge, Checkbox, Icon, TextField, etc.
  fragments/   # Composed: Alert, Notification, ProgressBar, TeaserCard, etc.
  layout/      # Structural: Header, Footer, Navigation, Dialog, Grid
```

## Process
1. **Check existing components first.** Before building, verify no existing component covers the use case (DRY). Document the decision in the PR description.
2. **Pick the right tier.** Elements have no dependencies on other custom components. Fragments compose elements. Layout composes fragments and elements into page structure.
3. **Translate, do not copy.** Reference patterns in `storybook-knowledge/struktur.md` for the component catalog. Translate Stencil TSX → Vue 3 `<script setup>`.
4. **One folder per component** containing the `.vue` file and any component-scoped assets.

## Standard File Pattern
```
elements/
  vfk-button/
    VfkButton.vue       ← <script setup lang="ts"> + <template> + <style scoped>
```

## Good Work Here Looks Like
- Props fully typed with TypeScript interfaces; defaults set where appropriate
- JSDoc block at the top of `<script setup>` (props, emitted events, usage example)
- All colors, spacing, and typography use CSS Custom Properties from `src/styles/`
- ARIA attributes and keyboard handlers on every interactive element
- Component passes the checklist in `CLAUDE.md` before being considered done

## Avoid
- Importing a `fragment/` or `layout/` component inside an `elements/` component
- Hardcoded values in `<style scoped>` — use `var(--token-name)` only
- Class-based components or Options API — `<script setup>` only
- Copying `.tsx` files from `storybook-knowledge/` without translating to Vue syntax
- Building a new component when an existing one can be composed or extended
- Icon-action buttons from scratch — reuse the icon-button variant of the base button element
