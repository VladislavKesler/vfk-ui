import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkStatusBadge from '@/components/fragments/vfk-status-badge/VfkStatusBadge.vue'

describe('VfkStatusBadge', () => {
  it('renders the German label for "eingereicht"', () => {
    const wrapper = mount(VfkStatusBadge, { props: { status: 'eingereicht' } })
    expect(wrapper.text()).toBe('Eingereicht')
  })

  it('maps "eingereicht" to the info variant', () => {
    const wrapper = mount(VfkStatusBadge, { props: { status: 'eingereicht' } })
    expect(wrapper.find('.vfk-badge--info').exists()).toBe(true)
  })

  it('maps "ausstehend" to the warning variant', () => {
    const wrapper = mount(VfkStatusBadge, { props: { status: 'ausstehend' } })
    expect(wrapper.find('.vfk-badge--warning').exists()).toBe(true)
  })

  it('maps "fehlgeschlagen" to the danger variant', () => {
    const wrapper = mount(VfkStatusBadge, { props: { status: 'fehlgeschlagen' } })
    expect(wrapper.find('.vfk-badge--danger').exists()).toBe(true)
  })

  it('allows overriding the displayed label', () => {
    const wrapper = mount(VfkStatusBadge, {
      props: { status: 'fehlgeschlagen', label: 'Fehlgeschlagen am 10.06.2026' },
    })
    expect(wrapper.text()).toBe('Fehlgeschlagen am 10.06.2026')
  })

  it('has role="status"', () => {
    const wrapper = mount(VfkStatusBadge, { props: { status: 'ausstehend' } })
    expect(wrapper.attributes('role')).toBe('status')
  })
})
