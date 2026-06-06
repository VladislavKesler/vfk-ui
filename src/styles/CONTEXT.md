# /src/styles — Design Tokens & Global Styles Workspace

## Purpose
Defines all design tokens as CSS Custom Properties and provides global resets and base styles. This is the single source of truth for every visual value used across the library. No component may hardcode a color, spacing, or typography value.

## Process
1. **Token first.** Before using any visual value in a component, check whether a token exists. If not, define it here before using it.
2. **Organize by category.** Each token group lives in its own file.
3. **Global styles** (reset, base typography) are applied once in the library entry point — not inside components.

## Standard File Structure
```
src/styles/
  tokens/
    colors.css        ← --color-primary, --color-surface, etc.
    spacing.css       ← --space-xs, --space-sm, --space-md, etc.
    typography.css    ← --font-size-base, --font-weight-bold, etc.
    radius.css        ← --radius-sm, --radius-md, etc.
    shadow.css        ← --shadow-sm, --shadow-lg, etc.
    easing.css        ← --ease-in-out, --ease-spring, etc.
  global.css          ← reset + @import of all token files
```

## Token Naming Convention
```
--{category}-{variant}-{modifier}
--color-primary          ✅
--color-primary-hover    ✅
#3b82f6                  ❌  (hardcoded)
16px                     ❌  (hardcoded spacing)
```

## Good Work Here Looks Like
- Tokens cover the full scale needed: at least xs/sm/md/lg/xl for spacing, a complete color palette for primary/secondary/neutral/semantic states
- Token names are semantic (what it means) not literal (what it looks like): `--color-danger` not `--color-red`
- `global.css` is the only file imported in the library entry — components use `var()` only

## Avoid
- Defining component-specific one-off values here — those belong in `<style scoped>`
- Duplicate tokens with different names for the same value
- Importing `global.css` inside individual components (causes duplication in the bundle)
- Any hardcoded value anywhere in this folder — tokens reference each other via `var()` when composing
