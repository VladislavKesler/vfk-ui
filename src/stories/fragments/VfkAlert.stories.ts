import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import VfkAlert from '@/components/fragments/vfk-alert/VfkAlert.vue'

const meta: Meta<typeof VfkAlert> = {
  component: VfkAlert,
  tags: ['autodocs'],
  args: {
    variant: 'info',
    dismissible: false,
  },
  argTypes: {
    onDismiss: { action: 'dismiss' },
  },
}
export default meta
type Story = StoryObj<typeof VfkAlert>

export const Info: Story = {
  args: {
    message: 'A new version of vfk-ui is available.',
    variant: 'info',
  },
}

export const Success: Story = {
  args: {
    message: 'Your changes have been saved.',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    message: 'Your session will expire in 5 minutes.',
    variant: 'warning',
  },
}

export const Danger: Story = {
  args: {
    message: 'Unable to save changes. Please try again.',
    variant: 'danger',
  },
}

export const Dismissible: Story = {
  args: {
    message: 'This alert can be dismissed.',
    variant: 'info',
    dismissible: true,
  },
}

export const DismissInteraction: Story = {
  args: {
    message: 'Click the close button to dismiss this alert.',
    variant: 'warning',
    dismissible: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('alert')).toBeInTheDocument()

    const closeButton = canvas.getByRole('button', { name: 'Meldung schließen' })
    await userEvent.click(closeButton)

    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument()
  },
}
