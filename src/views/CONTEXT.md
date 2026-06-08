# /src/views — Demo Site Page Views

## Purpose
Three page views power the live component browser (`npm run dev`). Each view handles one tier of the component hierarchy and exposes a `registry` map that drives component previews.

## Architecture

```
App.vue
├── <SiteNav />           ← sidebar (src/components/layout/site-nav/)
└── <RouterView />        ← renders the matched page view below

src/views/
  ElementPage.vue         ← /elements/:component
  FragmentPage.vue        ← /fragments/:component
  LayoutPage.vue          ← /layout/:component
```

Routes are declared in `src/router/index.ts`. All three tier routes already exist — no router changes are needed when adding components.

## Registry Pattern

Each page view contains a `registry` object that maps a component's kebab-case route name to an async component import and a list of variants to preview.

```ts
const registry: Record<string, RegistryEntry> = {
  'component-name': {
    component: defineAsyncComponent(
      () => import('@/components/elements/component-name/ComponentName.vue'),
    ),
    variants: [
      { label: 'Default', props: { requiredProp: 'value' } },
      { label: 'Disabled', props: { requiredProp: 'value', disabled: true } },
    ],
  },
}
```

- **`component`** — always use `defineAsyncComponent` so each component is lazy-loaded.
- **`variants`** — one entry per meaningful prop combination. `label` appears as an uppercase caption above the preview box. `props` are spread onto the component via `v-bind`.
- Components not in the registry render a "coming soon" placeholder automatically.

## Rules

- Mirror story variants: if `VfkButton.stories.ts` has Primary / Secondary / Disabled, the registry should match those states.
- Slot-based variants (e.g. icon buttons) require a custom `render` function — ask before adding one to keep the pattern consistent.
- No hardcoded styles in page views — use `var(--token-name)` only.
- Do not import Fragment or Layout components into `ElementPage`, and do not import Layout into `FragmentPage` — respect the tier hierarchy.

## Good Work Here Looks Like
- Every component that has a `.vue` file also has a registry entry before the PR is merged
- Variant labels match the story names in `src/stories/` so the two stay in sync
- Props in the registry use realistic values, not "foo" or "test"
