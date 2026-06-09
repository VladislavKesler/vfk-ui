import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkToggle from '@/components/elements/vfk-toggle/VfkToggle.vue'

describe('VfkToggle', () => {
  it('renders the track with role switch', () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false } })
    expect(wrapper.find('[role="switch"]').exists()).toBe(true)
  })

  it('sets aria-checked to false when modelValue is false', () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false } })
    expect(wrapper.find('[role="switch"]').attributes('aria-checked')).toBe('false')
  })

  it('sets aria-checked to true when modelValue is true', () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: true } })
    expect(wrapper.find('[role="switch"]').attributes('aria-checked')).toBe('true')
  })

  it('emits update:modelValue with true when clicked while off', async () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false } })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('emits update:modelValue with false when clicked while on', async () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: true } })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false, disabled: true } })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('sets aria-disabled when disabled', () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false, disabled: true } })
    expect(wrapper.find('[role="switch"]').attributes('aria-disabled')).toBe('true')
  })

  it('renders label text when label prop is provided', () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false, label: 'Dark mode' } })
    expect(wrapper.text()).toContain('Dark mode')
  })

  it('does not render label element when label prop is absent', () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false } })
    expect(wrapper.find('.vfk-toggle__label').exists()).toBe(false)
  })

  it('emits update:modelValue on Space keydown', async () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false } })
    await wrapper.find('[role="switch"]').trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('emits update:modelValue on Enter keydown', async () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false } })
    await wrapper.find('[role="switch"]').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('does not emit on Space when disabled', async () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false, disabled: true } })
    await wrapper.find('[role="switch"]').trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('thumb has --on modifier class when modelValue is true', () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: true } })
    expect(wrapper.find('.vfk-toggle__thumb--on').exists()).toBe(true)
  })

  it('thumb does not have --on modifier class when modelValue is false', () => {
    const wrapper = mount(VfkToggle, { props: { modelValue: false } })
    expect(wrapper.find('.vfk-toggle__thumb--on').exists()).toBe(false)
  })
})
