import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import VfkDatePicker from '@/components/elements/vfk-date-picker/VfkDatePicker.vue'

const meta: Meta<typeof VfkDatePicker> = {
  component: VfkDatePicker,
  tags: ['autodocs'],
  args: {
    modelValue: null,
    disabled: false,
  },
}
export default meta
type Story = StoryObj<typeof VfkDatePicker>

export const Default: Story = {
  args: {
    modelValue: null,
    label: 'Date of birth',
  },
}

export const WithValue: Story = {
  args: {
    modelValue: '2026-06-15',
    label: 'Date of birth',
  },
}

export const WithError: Story = {
  args: {
    modelValue: null,
    label: 'Appointment date',
    error: 'Please select a date.',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: null,
    label: 'Locked date',
    disabled: true,
  },
}

export const WithMinMax: Story = {
  args: {
    modelValue: null,
    label: 'Booking date',
    min: '2026-06-01',
    max: '2026-06-30',
  },
}

export const Interactive: Story = {
  render: () => ({
    components: { VfkDatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date }
    },
    template: `
      <div style="padding-bottom: 320px;">
        <VfkDatePicker v-model="date" label="Select a date" />
        <p style="margin-top: 16px; font-size: 14px;">Selected: {{ date ?? 'none' }}</p>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox')

    await expect(input).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(input)
    await expect(input).toHaveAttribute('aria-expanded', 'true')

    const popup = canvas.getByRole('dialog')
    await expect(popup).toBeVisible()
  },
}

export const KeyboardOpen: Story = {
  render: () => ({
    components: { VfkDatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date }
    },
    template: `<div style="padding-bottom: 320px;"><VfkDatePicker v-model="date" label="Keyboard test" /></div>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox')

    input.focus()
    await userEvent.keyboard('{Enter}')
    await expect(canvas.getByRole('dialog')).toBeVisible()

    await userEvent.keyboard('{Escape}')
    await expect(input).toHaveAttribute('aria-expanded', 'false')
  },
}

export const SelectDate: Story = {
  render: () => ({
    components: { VfkDatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date }
    },
    template: `
      <div style="padding-bottom: 320px;">
        <VfkDatePicker v-model="date" label="Pick a date" />
        <p data-testid="output" style="margin-top: 16px; font-size: 14px;">{{ date ?? 'none' }}</p>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('combobox'))

    const day15 = canvas.getByRole('gridcell', { name: /15/ })
    await userEvent.click(day15)

    await expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false')
  },
}
