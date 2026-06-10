import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkMetricsCard from '@/components/fragments/vfk-metrics-card/VfkMetricsCard.vue'

describe('VfkMetricsCard', () => {
  it('renders the label and value', () => {
    const wrapper = mount(VfkMetricsCard, { props: { label: 'Active Users', value: '1,284' } })
    expect(wrapper.text()).toContain('Active Users')
    expect(wrapper.text()).toContain('1,284')
  })

  it('does not render a delta badge when no delta is provided', () => {
    const wrapper = mount(VfkMetricsCard, { props: { label: 'Open Tickets', value: '42' } })
    expect(wrapper.find('.vfk-badge').exists()).toBe(false)
  })

  it('renders an upward trend with the success variant and an up arrow', () => {
    const wrapper = mount(VfkMetricsCard, {
      props: { label: 'Active Users', value: '1,284', delta: '+12.5%', trend: 'up' },
    })
    const badge = wrapper.find('.vfk-badge')
    expect(badge.classes()).toContain('vfk-badge--success')
    expect(badge.text()).toBe('▲ +12.5%')
  })

  it('renders a downward trend with the danger variant and a down arrow', () => {
    const wrapper = mount(VfkMetricsCard, {
      props: { label: 'Churn Rate', value: '2.4%', delta: '-0.6%', trend: 'down' },
    })
    const badge = wrapper.find('.vfk-badge')
    expect(badge.classes()).toContain('vfk-badge--danger')
    expect(badge.text()).toBe('▼ -0.6%')
  })

  it('renders a neutral trend with the neutral variant and no arrow', () => {
    const wrapper = mount(VfkMetricsCard, {
      props: { label: 'Sessions', value: '4m 12s', delta: '±0.0%', trend: 'neutral' },
    })
    const badge = wrapper.find('.vfk-badge')
    expect(badge.classes()).toContain('vfk-badge--neutral')
    expect(badge.text()).toBe('±0.0%')
  })
})
