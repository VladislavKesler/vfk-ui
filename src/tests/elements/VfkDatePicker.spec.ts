import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import VfkDatePicker from '@/components/elements/vfk-date-picker/VfkDatePicker.vue'

// Fixed ISO date whose month navigation is predictable
const JUNE_15 = '2026-06-15'
const JUNE_LABEL = 'Juni 2026'
const MAY_LABEL = 'Mai 2026'
const JULY_LABEL = 'Juli 2026'

async function openPicker(wrapper: ReturnType<typeof mount>) {
  await wrapper.find('.vfk-datepicker__input').trigger('click')
  await nextTick()
}

describe('VfkDatePicker', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders a text input with role combobox', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    expect(wrapper.find('[role="combobox"]').exists()).toBe(true)
  })

  it('renders label when label prop is provided', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null, label: 'Birthdate' } })
    expect(wrapper.find('label').text()).toBe('Birthdate')
  })

  it('does not render label element when label prop is absent', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('associates label with input via for/id', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null, label: 'Date' } })
    const inputId = wrapper.find('input').attributes('id')
    expect(wrapper.find('label').attributes('for')).toBe(inputId)
  })

  it('displays formatted date when modelValue is set', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: JUNE_15 } })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('15.06.2026')
  })

  it('shows empty input when modelValue is null', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('')
  })

  it('forwards placeholder to the input', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null, placeholder: 'Wählen…' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Wählen…')
  })

  // ── Popup open / close ─────────────────────────────────────────────────────

  it('popup is not rendered by default', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('popup opens when input is clicked', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    await openPicker(wrapper)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('popup opens when trigger button is clicked', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    await wrapper.find('.vfk-datepicker__trigger').trigger('click')
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('sets aria-expanded to true when popup is open', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    await openPicker(wrapper)
    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe('true')
  })

  it('sets aria-expanded to false when popup is closed', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe('false')
  })

  it('does not open popup when disabled', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null, disabled: true } })
    await openPicker(wrapper)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('closes popup on Escape keydown on the input', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    await openPicker(wrapper)
    await wrapper.find('[role="combobox"]').trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('closes popup on Escape keydown inside the popup', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    await openPicker(wrapper)
    await wrapper.find('[role="dialog"]').trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('toggles popup on Enter keydown on the input', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    await wrapper.find('[role="combobox"]').trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    await wrapper.find('[role="combobox"]').trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  // ── Calendar grid ──────────────────────────────────────────────────────────

  it('renders 7 weekday headers', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: JUNE_15 } })
    await openPicker(wrapper)
    expect(wrapper.findAll('[role="columnheader"]')).toHaveLength(7)
  })

  it('renders exactly 42 day cells', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: JUNE_15 } })
    await openPicker(wrapper)
    expect(wrapper.findAll('[role="gridcell"]')).toHaveLength(42)
  })

  it('shows the correct month label for the selected date', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: JUNE_15 } })
    await openPicker(wrapper)
    expect(wrapper.find('[data-testid="month-label"]').text()).toBe(JUNE_LABEL)
  })

  it('marks the selected day cell as aria-selected', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: JUNE_15 } })
    await openPicker(wrapper)
    const selectedCell = wrapper.find('[aria-label="2026-06-15"]')
    expect(selectedCell.attributes('aria-selected')).toBe('true')
  })

  // ── Date selection ─────────────────────────────────────────────────────────

  it('emits update:modelValue with ISO string when a day is clicked', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: JUNE_15 } })
    await openPicker(wrapper)
    await wrapper.find('[aria-label="2026-06-20"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['2026-06-20']])
  })

  it('closes popup after a day is selected', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: JUNE_15 } })
    await openPicker(wrapper)
    await wrapper.find('[aria-label="2026-06-20"]').trigger('click')
    await nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('does not emit when a disabled day is clicked', async () => {
    const wrapper = mount(VfkDatePicker, {
      props: { modelValue: JUNE_15, min: '2026-06-10', max: '2026-06-20' },
    })
    await openPicker(wrapper)
    await wrapper.find('[aria-label="2026-06-05"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('marks out-of-range days as aria-disabled', async () => {
    const wrapper = mount(VfkDatePicker, {
      props: { modelValue: JUNE_15, min: '2026-06-10' },
    })
    await openPicker(wrapper)
    expect(wrapper.find('[aria-label="2026-06-05"]').attributes('aria-disabled')).toBe('true')
    expect(wrapper.find('[aria-label="2026-06-15"]').attributes('aria-disabled')).toBe('false')
  })

  // ── Month navigation ───────────────────────────────────────────────────────

  it('navigates to previous month when prev button is clicked', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: JUNE_15 } })
    await openPicker(wrapper)
    await wrapper.find('[aria-label="Vorheriger Monat"]').trigger('click')
    await nextTick()
    expect(wrapper.find('[data-testid="month-label"]').text()).toBe(MAY_LABEL)
  })

  it('navigates to next month when next button is clicked', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: JUNE_15 } })
    await openPicker(wrapper)
    await wrapper.find('[aria-label="Nächster Monat"]').trigger('click')
    await nextTick()
    expect(wrapper.find('[data-testid="month-label"]').text()).toBe(JULY_LABEL)
  })

  it('wraps from January to December on prev', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: '2026-01-15' } })
    await openPicker(wrapper)
    await wrapper.find('[aria-label="Vorheriger Monat"]').trigger('click')
    await nextTick()
    expect(wrapper.find('[data-testid="month-label"]').text()).toBe('Dezember 2025')
  })

  it('wraps from December to January on next', async () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: '2026-12-15' } })
    await openPicker(wrapper)
    await wrapper.find('[aria-label="Nächster Monat"]').trigger('click')
    await nextTick()
    expect(wrapper.find('[data-testid="month-label"]').text()).toBe('Januar 2027')
  })

  // ── Error state ────────────────────────────────────────────────────────────

  it('renders error message when error prop is provided', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null, error: 'Required' } })
    expect(wrapper.find('[role="alert"]').text()).toBe('Required')
  })

  it('does not render error element when error is absent', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('sets aria-invalid to true when error is present', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null, error: 'Required' } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('sets aria-invalid to false when no error', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('false')
  })

  it('links input to error via aria-describedby', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null, error: 'Required' } })
    const errorId = wrapper.find('[role="alert"]').attributes('id')
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(errorId)
  })

  it('applies error modifier class to wrapper', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null, error: 'Oops' } })
    expect(wrapper.find('.vfk-datepicker--error').exists()).toBe(true)
  })

  it('applies disabled modifier class to wrapper when disabled', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null, disabled: true } })
    expect(wrapper.find('.vfk-datepicker--disabled').exists()).toBe(true)
  })

  // ── Disabled input ─────────────────────────────────────────────────────────

  it('disables the input element when disabled is true', () => {
    const wrapper = mount(VfkDatePicker, { props: { modelValue: null, disabled: true } })
    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true)
  })
})
