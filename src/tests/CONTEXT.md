# /src/tests — Tests Workspace

## Purpose
Contains Vitest unit and integration tests for component logic, computed behavior, and non-trivial utility functions. Tests verify correctness of behavior — not DOM structure or visual appearance (that is Storybook's job).

## Process
1. **One test file per component** (or utility), mirroring the `src/components/` folder structure.
2. **Test behavior, not implementation.** Assert on what the user observes: emitted events, visible text, ARIA state, disabled behavior — not internal refs or method calls.
3. **Arrange → Act → Assert** structure in every test case.
4. For components with complex logic (date picking, validation, keyboard navigation), write tests here in addition to Storybook Interaction Tests.

## Standard File Pattern
```
src/tests/
  elements/
    VfkButton.spec.ts
  fragments/
    VfkAlert.spec.ts
  utils/
    formatDate.spec.ts
```

## Standard Test Structure
```ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkButton from '@/components/elements/vfk-button/VfkButton.vue'

describe('VfkButton', () => {
  it('emits click event when clicked', async () => {
    const wrapper = mount(VfkButton, { props: { label: 'Go' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(VfkButton, { props: { label: 'Go', disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
```

## Good Work Here Looks Like
- Covers the happy path, edge cases (disabled, empty props), and keyboard interactions
- Each test has a single, clear assertion — not one test asserting ten things
- Test descriptions read as specifications: `'emits click event when clicked'`
- No `setTimeout` or arbitrary waits — use `await nextTick()` or `flushPromises()`

## Vitest Projects

Vitest runs two projects defined in `vitest.config.ts`:

| Project      | Command               | Environment | Used by     |
| ------------ | --------------------- | ----------- | ----------- |
| `unit`       | `npm run test:unit`   | jsdom       | CI, local   |
| `storybook`  | `npm run test`        | Playwright  | local only  |

**Always use `npm run test:unit` in CI** — the `storybook` project requires Playwright browser binaries that are not available in the GitHub Actions runner. Adding a new test script to CI must use `vitest --project=unit`.

## Avoid
- Testing internal implementation details (private refs, method names)
- Snapshot tests for component markup (brittle, low signal)
- Mocking Vue itself or `@vue/test-utils` internals
- Duplicating interaction tests already covered by Storybook's `play()` function — add value, don't repeat
- Tests that pass trivially (asserting the component mounts without asserting anything meaningful)
- Using `npm run test` in CI — it triggers the Playwright browser project and will fail without binaries
