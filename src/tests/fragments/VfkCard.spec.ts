import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkCard from '@/components/fragments/vfk-card/VfkCard.vue'

describe('VfkCard', () => {
  it('renders default slot content', () => {
    const wrapper = mount(VfkCard, { slots: { default: 'Card body content' } })
    expect(wrapper.text()).toContain('Card body content')
  })

  it('does not render a header element when no header slot is provided', () => {
    const wrapper = mount(VfkCard, { slots: { default: 'Body' } })
    expect(wrapper.find('.vfk-card__header').exists()).toBe(false)
  })

  it('renders header slot content when provided', () => {
    const wrapper = mount(VfkCard, {
      slots: { header: 'Project Alpha', default: 'Body' },
    })
    expect(wrapper.find('.vfk-card__header').text()).toBe('Project Alpha')
  })

  it('does not render a footer element when no footer slot is provided', () => {
    const wrapper = mount(VfkCard, { slots: { default: 'Body' } })
    expect(wrapper.find('.vfk-card__footer').exists()).toBe(false)
  })

  it('renders footer slot content when provided', () => {
    const wrapper = mount(VfkCard, {
      slots: { default: 'Body', footer: 'Footer actions' },
    })
    expect(wrapper.find('.vfk-card__footer').text()).toBe('Footer actions')
  })

  it('defaults to the default variant without interactive attributes', () => {
    const wrapper = mount(VfkCard, { slots: { default: 'Body' } })
    expect(wrapper.classes()).toContain('vfk-card--default')
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('applies role and tabindex when interactive', () => {
    const wrapper = mount(VfkCard, {
      props: { variant: 'interactive' },
      slots: { default: 'Body' },
    })
    expect(wrapper.classes()).toContain('vfk-card--interactive')
    expect(wrapper.attributes('role')).toBe('button')
    expect(wrapper.attributes('tabindex')).toBe('0')
  })

  it('emits click when an interactive card is clicked', async () => {
    const wrapper = mount(VfkCard, {
      props: { variant: 'interactive' },
      slots: { default: 'Body' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when a default card is clicked', async () => {
    const wrapper = mount(VfkCard, { slots: { default: 'Body' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('emits click on Enter keydown when interactive', async () => {
    const wrapper = mount(VfkCard, {
      props: { variant: 'interactive' },
      slots: { default: 'Body' },
    })
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('emits click on Space keydown when interactive', async () => {
    const wrapper = mount(VfkCard, {
      props: { variant: 'interactive' },
      slots: { default: 'Body' },
    })
    await wrapper.trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click on keydown when not interactive', async () => {
    const wrapper = mount(VfkCard, { slots: { default: 'Body' } })
    await wrapper.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
