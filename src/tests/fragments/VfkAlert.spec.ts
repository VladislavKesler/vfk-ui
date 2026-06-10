import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkAlert from '@/components/fragments/vfk-alert/VfkAlert.vue'

describe('VfkAlert', () => {
  it('renders the message text', () => {
    const wrapper = mount(VfkAlert, { props: { message: 'Saved successfully.' } })
    expect(wrapper.text()).toContain('Saved successfully.')
  })

  it('defaults to info variant', () => {
    const wrapper = mount(VfkAlert, { props: { message: 'Heads up.' } })
    expect(wrapper.classes()).toContain('vfk-alert--info')
  })

  it('applies the correct variant class', () => {
    const variants = ['info', 'success', 'warning', 'danger'] as const
    for (const variant of variants) {
      const wrapper = mount(VfkAlert, { props: { message: 'Heads up.', variant } })
      expect(wrapper.classes()).toContain(`vfk-alert--${variant}`)
    }
  })

  it('has role="alert"', () => {
    const wrapper = mount(VfkAlert, { props: { message: 'Heads up.' } })
    expect(wrapper.attributes('role')).toBe('alert')
  })

  it('does not render a dismiss button by default', () => {
    const wrapper = mount(VfkAlert, { props: { message: 'Heads up.' } })
    expect(wrapper.find('.vfk-alert__dismiss').exists()).toBe(false)
  })

  it('renders a dismiss button when dismissible', () => {
    const wrapper = mount(VfkAlert, { props: { message: 'Heads up.', dismissible: true } })
    expect(wrapper.find('.vfk-alert__dismiss').exists()).toBe(true)
  })

  it('emits dismiss when the close button is clicked', async () => {
    const wrapper = mount(VfkAlert, { props: { message: 'Heads up.', dismissible: true } })
    await wrapper.find('.vfk-alert__dismiss').trigger('click')
    expect(wrapper.emitted('dismiss')).toBeTruthy()
  })

  it('hides itself after the close button is clicked', async () => {
    const wrapper = mount(VfkAlert, { props: { message: 'Heads up.', dismissible: true } })
    await wrapper.find('.vfk-alert__dismiss').trigger('click')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})
