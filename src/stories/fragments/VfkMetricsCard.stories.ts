import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VfkMetricsCard from '@/components/fragments/vfk-metrics-card/VfkMetricsCard.vue'

const meta: Meta<typeof VfkMetricsCard> = {
  component: VfkMetricsCard,
  tags: ['autodocs'],
  args: {
    label: 'Active Users',
    value: '1,284',
  },
}
export default meta
type Story = StoryObj<typeof VfkMetricsCard>

export const Default: Story = {
  args: { label: 'Open Tickets', value: '42' },
}

export const TrendUp: Story = {
  args: { label: 'Active Users', value: '1,284', delta: '+12.5%', trend: 'up' },
}

export const TrendDown: Story = {
  args: { label: 'Churn Rate', value: '2.4%', delta: '-0.6%', trend: 'down' },
}

export const TrendNeutral: Story = {
  args: { label: 'Avg. Session Duration', value: '4m 12s', delta: '±0.0%', trend: 'neutral' },
}
