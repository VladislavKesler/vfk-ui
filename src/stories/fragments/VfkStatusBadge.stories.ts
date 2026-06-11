import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VfkStatusBadge from '@/components/fragments/vfk-status-badge/VfkStatusBadge.vue'

const meta: Meta<typeof VfkStatusBadge> = {
  component: VfkStatusBadge,
  tags: ['autodocs'],
  args: {
    status: 'submitted',
  },
}
export default meta
type Story = StoryObj<typeof VfkStatusBadge>

export const Submitted: Story = {
  args: { status: 'submitted' },
}

export const Pending: Story = {
  args: { status: 'pending' },
}

export const Failed: Story = {
  args: { status: 'failed' },
}

export const CustomLabel: Story = {
  args: { status: 'failed', label: 'Failed on 2026-06-10' },
}
