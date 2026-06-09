import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkBadge from '@/components/elements/vfk-badge/VfkBadge.vue'

describe('VfkBadge', () => {
  it('renders the label text', () => {
    const wrapper = mount(VfkBadge, { props: { label: 'Active' } })
    expect(wrapper.text()).toContain('Active')
  })

  it('defaults to neutral variant', () => {
    const wrapper = mount(VfkBadge, { props: { label: 'Draft' } })
    expect(wrapper.classes()).toContain('vfk-badge--neutral')
  })

  it('applies the correct variant class', () => {
    const variants = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const
    for (const variant of variants) {
      const wrapper = mount(VfkBadge, { props: { label: 'Tag', variant } })
      expect(wrapper.classes()).toContain(`vfk-badge--${variant}`)
    }
  })

  it('renders as a span element', () => {
    const wrapper = mount(VfkBadge, { props: { label: 'New' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('span')
  })

  it('sets aria-label equal to the label prop', () => {
    const wrapper = mount(VfkBadge, { props: { label: 'Error' } })
    expect(wrapper.attributes('aria-label')).toBe('Error')
  })

  it('has role="status"', () => {
    const wrapper = mount(VfkBadge, { props: { label: 'Pending' } })
    expect(wrapper.attributes('role')).toBe('status')
  })
})
