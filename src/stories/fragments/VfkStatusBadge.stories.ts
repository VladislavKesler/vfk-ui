import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VfkStatusBadge from '@/components/fragments/vfk-status-badge/VfkStatusBadge.vue'

const meta: Meta<typeof VfkStatusBadge> = {
  component: VfkStatusBadge,
  tags: ['autodocs'],
  args: {
    status: 'eingereicht',
  },
}
export default meta
type Story = StoryObj<typeof VfkStatusBadge>

export const Eingereicht: Story = {
  args: { status: 'eingereicht' },
}

export const Ausstehend: Story = {
  args: { status: 'ausstehend' },
}

export const Fehlgeschlagen: Story = {
  args: { status: 'fehlgeschlagen' },
}

export const CustomLabel: Story = {
  args: { status: 'fehlgeschlagen', label: 'Fehlgeschlagen am 10.06.2026' },
}
