import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkTextfield from '@/components/elements/vfk-textfield/VfkTextfield.vue'

describe('VfkTextfield', () => {
  it('renders an input element', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '' } })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders the label when label prop is provided', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', label: 'Email' } })
    expect(wrapper.find('label').text()).toBe('Email')
  })

  it('does not render a label element when label prop is absent', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '' } })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('associates label with input via for/id', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', label: 'Name' } })
    const inputId = wrapper.find('input').attributes('id')
    expect(wrapper.find('label').attributes('for')).toBe(inputId)
  })

  it('binds modelValue to the input value', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: 'hello' } })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('hello')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '' } })
    await wrapper.find('input').setValue('world')
    expect(wrapper.emitted('update:modelValue')).toEqual([['world']])
  })

  it('forwards placeholder to the input', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', placeholder: 'Search…' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search…')
  })

  it('forwards type to the input', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', type: 'email' } })
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })

  it('defaults to type text', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '' } })
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('disables the input when disabled is true', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', disabled: true } })
    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true)
  })

  it('does not emit when typing into a disabled input', async () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', disabled: true } })
    await wrapper.find('input').trigger('input')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('renders error message when error prop is provided', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', error: 'Required' } })
    expect(wrapper.find('[role="alert"]').text()).toBe('Required')
  })

  it('does not render error element when error prop is absent', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '' } })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('sets aria-invalid to true when error is present', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', error: 'Required' } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('sets aria-invalid to false when no error', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '' } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('false')
  })

  it('links input to error via aria-describedby', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', error: 'Required' } })
    const errorId = wrapper.find('[role="alert"]').attributes('id')
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(errorId)
  })

  it('applies error modifier class to the wrapper when error is present', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', error: 'Oops' } })
    expect(wrapper.find('.vfk-textfield--error').exists()).toBe(true)
  })

  it('applies disabled modifier class to the wrapper when disabled', () => {
    const wrapper = mount(VfkTextfield, { props: { modelValue: '', disabled: true } })
    expect(wrapper.find('.vfk-textfield--disabled').exists()).toBe(true)
  })
})
