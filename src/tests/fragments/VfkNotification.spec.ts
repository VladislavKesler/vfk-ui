import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import VfkNotification from '@/components/fragments/vfk-notification/VfkNotification.vue'

describe('VfkNotification', () => {
  const props = {
    title: 'Export complete',
    description: 'Your report has been generated and is ready to download.',
  }

  it('renders the title text', () => {
    const wrapper = mount(VfkNotification, { props })
    expect(wrapper.text()).toContain('Export complete')
  })

  it('renders the description text', () => {
    const wrapper = mount(VfkNotification, { props })
    expect(wrapper.text()).toContain('Your report has been generated and is ready to download.')
  })

  it('defaults to info variant', () => {
    const wrapper = mount(VfkNotification, { props })
    expect(wrapper.classes()).toContain('vfk-notification--info')
  })

  it('applies the correct variant class', () => {
    const variants = ['info', 'success', 'warning', 'danger'] as const
    for (const variant of variants) {
      const wrapper = mount(VfkNotification, { props: { ...props, variant } })
      expect(wrapper.classes()).toContain(`vfk-notification--${variant}`)
    }
  })

  it('has role="alert"', () => {
    const wrapper = mount(VfkNotification, { props })
    expect(wrapper.attributes('role')).toBe('alert')
  })

  it('renders a dismiss button', () => {
    const wrapper = mount(VfkNotification, { props })
    expect(wrapper.find('.vfk-notification__dismiss').exists()).toBe(true)
  })

  it('emits dismiss when the close button is clicked', async () => {
    const wrapper = mount(VfkNotification, { props })
    await wrapper.find('.vfk-notification__dismiss').trigger('click')
    expect(wrapper.emitted('dismiss')).toBeTruthy()
  })

  it('hides itself after the close button is clicked', async () => {
    const wrapper = mount(VfkNotification, { props })
    await wrapper.find('.vfk-notification__dismiss').trigger('click')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})
