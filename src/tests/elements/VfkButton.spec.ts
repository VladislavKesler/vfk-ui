import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkButton from '@/components/elements/vfk-button/VfkButton.vue'

describe('VfkButton', () => {
  it('renders the label text for primary variant', () => {
    const wrapper = mount(VfkButton, { props: { label: 'Click me' } })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(VfkButton, { props: { label: 'Go' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(VfkButton, { props: { label: 'Go', disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('applies the correct variant class', () => {
    const wrapper = mount(VfkButton, { props: { label: 'Go', variant: 'secondary' } })
    expect(wrapper.classes()).toContain('vfk-button--secondary')
  })

  it('applies the disabled class when disabled', () => {
    const wrapper = mount(VfkButton, { props: { label: 'Go', disabled: true } })
    expect(wrapper.classes()).toContain('vfk-button--disabled')
  })

  it('sets aria-label on icon variant', () => {
    const wrapper = mount(VfkButton, { props: { label: 'Add item', variant: 'icon' } })
    expect(wrapper.attributes('aria-label')).toBe('Add item')
  })

  it('does not set aria-label on primary variant', () => {
    const wrapper = mount(VfkButton, { props: { label: 'Save' } })
    expect(wrapper.attributes('aria-label')).toBeUndefined()
  })

  it('sets native disabled attribute when disabled', () => {
    const wrapper = mount(VfkButton, { props: { label: 'Go', disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('hides label text in icon variant', () => {
    const wrapper = mount(VfkButton, { props: { label: 'Add item', variant: 'icon' } })
    expect(wrapper.find('.vfk-button__label').exists()).toBe(false)
  })

  it('uses button type attribute', () => {
    const wrapper = mount(VfkButton, { props: { label: 'Submit', type: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })
})
