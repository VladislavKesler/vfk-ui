# /src/stories — Storybook Stories Workspace

## Purpose
Contains Storybook stories that document every component visually and serve as living, interactive API documentation. Stories are the primary way to develop, review, and test component appearance and behavior.

## Process
1. **One story file per component**, placed here (not co-located with the component).
2. **Mirror the component's prop surface.** Every meaningful prop combination gets its own named story.
3. **Add Interaction Tests** for all interactive components (open/close, selection, keyboard navigation) using `@storybook/test` `userEvent` and `expect`.
4. **Default story** (`Default`) shows the component with typical real-world values, not empty/undefined props.

## Standard File Pattern
```
src/stories/
  elements/
    VfkButton.stories.ts
  fragments/
    VfkAlert.stories.ts
  layout/
    VfkHeader.stories.ts
```

## Story File Structure (CSF3)
```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import VfkButton from '@/components/elements/vfk-button/VfkButton.vue'

const meta: Meta<typeof VfkButton> = {
  component: VfkButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof VfkButton>

export const Default: Story = { args: { label: 'Click me' } }
export const Disabled: Story = { args: { label: 'Click me', disabled: true } }
```

## Good Work Here Looks Like
- All prop variants covered — at minimum: default, disabled, and any visual mode switches
- Interaction tests present for every click, toggle, open/close behavior
- `tags: ['autodocs']` set so the component gets auto-generated API documentation
- Args use realistic values (not "foo", "test", "string")

## Avoid
- Stories with no `args` defined — always pass realistic prop values
- Skipping interaction tests for interactive components (buttons, inputs, dialogs)
- Hardcoded styles or inline `style=` on story wrappers
- Duplicating stories for states already covered by a controls knob
