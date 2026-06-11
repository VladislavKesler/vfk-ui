import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkStatusBadge from '@/components/fragments/vfk-status-badge/VfkStatusBadge.vue'

describe('VfkStatusBadge', () => {
  it('renders the label for "submitted"', () => {
    const wrapper = mount(VfkStatusBadge, { props: { status: 'submitted' } })
    expect(wrapper.text()).toBe('Submitted')
  })

  it('maps "submitted" to the info variant', () => {
    const wrapper = mount(VfkStatusBadge, { props: { status: 'submitted' } })
    expect(wrapper.find('.vfk-badge--info').exists()).toBe(true)
  })

  it('maps "pending" to the warning variant', () => {
    const wrapper = mount(VfkStatusBadge, { props: { status: 'pending' } })
    expect(wrapper.find('.vfk-badge--warning').exists()).toBe(true)
  })

  it('maps "failed" to the danger variant', () => {
    const wrapper = mount(VfkStatusBadge, { props: { status: 'failed' } })
    expect(wrapper.find('.vfk-badge--danger').exists()).toBe(true)
  })

  it('allows overriding the displayed label', () => {
    const wrapper = mount(VfkStatusBadge, {
      props: { status: 'failed', label: 'Failed on 2026-06-10' },
    })
    expect(wrapper.text()).toBe('Failed on 2026-06-10')
  })

  it('has role="status"', () => {
    const wrapper = mount(VfkStatusBadge, { props: { status: 'pending' } })
    expect(wrapper.attributes('role')).toBe('status')
  })
})
