import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import VfkToggle from '@/components/elements/vfk-toggle/VfkToggle.vue'

const meta: Meta<typeof VfkToggle> = {
  component: VfkToggle,
  tags: ['autodocs'],
  args: {
    modelValue: false,
    disabled: false,
  },
  argTypes: {
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
}
export default meta
type Story = StoryObj<typeof VfkToggle>

export const Default: Story = {
  args: {
    modelValue: false,
    label: 'Enable notifications',
  },
}

export const On: Story = {
  args: {
    modelValue: true,
    label: 'Enable notifications',
  },
}

export const NoLabel: Story = {
  args: {
    modelValue: false,
  },
}

export const Disabled: Story = {
  args: {
    modelValue: false,
    label: 'This option is unavailable',
    disabled: true,
  },
}

export const DisabledOn: Story = {
  args: {
    modelValue: true,
    label: 'Always active',
    disabled: true,
  },
}

export const Interactive: Story = {
  render: () => ({
    components: { VfkToggle },
    setup() {
      const enabled = ref(false)
      return { enabled }
    },
    template: `<VfkToggle v-model="enabled" :label="enabled ? 'On' : 'Off'" />`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const track = canvas.getByRole('switch')

    await expect(track).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(track)
    await expect(track).toHaveAttribute('aria-checked', 'true')
    await userEvent.click(track)
    await expect(track).toHaveAttribute('aria-checked', 'false')
  },
}

export const KeyboardToggle: Story = {
  render: () => ({
    components: { VfkToggle },
    setup() {
      const enabled = ref(false)
      return { enabled }
    },
    template: `<VfkToggle v-model="enabled" label="Keyboard controlled" />`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const track = canvas.getByRole('switch')

    track.focus()
    await expect(track).toHaveAttribute('aria-checked', 'false')
    await userEvent.keyboard(' ')
    await expect(track).toHaveAttribute('aria-checked', 'true')
  },
}
