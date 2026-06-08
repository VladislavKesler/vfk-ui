import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import VfkButton from '@/components/elements/vfk-button/VfkButton.vue'

const meta: Meta<typeof VfkButton> = {
  component: VfkButton,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
}
export default meta
type Story = StoryObj<typeof VfkButton>

export const Primary: Story = {
  args: { label: 'Save changes', variant: 'primary' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Save changes' })
    await userEvent.click(button)
    expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Secondary: Story = {
  args: { label: 'Cancel', variant: 'secondary' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Cancel' })
    await userEvent.click(button)
    expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Icon: Story = {
  args: { label: 'Add item', variant: 'icon' },
  render: (args) => ({
    components: { VfkButton },
    setup() {
      return { args }
    },
    template: `
      <VfkButton v-bind="args">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </VfkButton>
    `,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Add item' })
    await userEvent.click(button)
    expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Disabled: Story = {
  args: { label: 'Save changes', variant: 'primary', disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Save changes' })
    await userEvent.click(button)
    expect(args.onClick).not.toHaveBeenCalled()
  },
}
