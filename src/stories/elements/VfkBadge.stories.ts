import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VfkBadge from '@/components/elements/vfk-badge/VfkBadge.vue'

const meta: Meta<typeof VfkBadge> = {
  component: VfkBadge,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof VfkBadge>

export const Neutral: Story = {
  args: { label: 'Draft', variant: 'neutral' },
}

export const Primary: Story = {
  args: { label: 'New', variant: 'primary' },
}

export const Success: Story = {
  args: { label: 'Active', variant: 'success' },
}

export const Warning: Story = {
  args: { label: 'Pending', variant: 'warning' },
}

export const Danger: Story = {
  args: { label: 'Error', variant: 'danger' },
}

export const Info: Story = {
  args: { label: 'Info', variant: 'info' },
}
