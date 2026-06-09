import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ref } from 'vue'
import VfkTextfield from '@/components/elements/vfk-textfield/VfkTextfield.vue'

const meta: Meta<typeof VfkTextfield> = {
  component: VfkTextfield,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    disabled: false,
  },
}
export default meta
type Story = StoryObj<typeof VfkTextfield>

export const Default: Story = {
  args: {
    modelValue: '',
    label: 'Full name',
    placeholder: 'Jane Doe',
  },
}

export const WithValue: Story = {
  args: {
    modelValue: 'Jane Doe',
    label: 'Full name',
  },
}

export const Email: Story = {
  args: {
    modelValue: '',
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
}

export const Password: Story = {
  args: {
    modelValue: '',
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
  },
}

export const WithError: Story = {
  args: {
    modelValue: '',
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
    error: 'Please enter a valid email address.',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: '',
    label: 'Username',
    placeholder: 'Not editable',
    disabled: true,
  },
}

export const NoLabel: Story = {
  args: {
    modelValue: '',
    placeholder: 'Search…',
    type: 'search',
  },
}

export const Interactive: Story = {
  render: () => ({
    components: { VfkTextfield },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `<VfkTextfield v-model="value" label="Your name" placeholder="Type something…" />`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    await expect(input).toHaveValue('')
    await userEvent.type(input, 'Hello')
    await expect(input).toHaveValue('Hello')
  },
}

export const ErrorState: Story = {
  render: () => ({
    components: { VfkTextfield },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `<VfkTextfield v-model="value" label="Email" type="email" error="This field is required." />`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    await expect(input).toHaveAttribute('aria-invalid', 'true')
    await expect(canvas.getByRole('alert')).toHaveTextContent('This field is required.')
  },
}
