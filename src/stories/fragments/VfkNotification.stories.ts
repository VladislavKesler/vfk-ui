import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import VfkNotification from '@/components/fragments/vfk-notification/VfkNotification.vue'

const meta: Meta<typeof VfkNotification> = {
  component: VfkNotification,
  tags: ['autodocs'],
  args: {
    variant: 'info',
  },
  argTypes: {
    onDismiss: { action: 'dismiss' },
  },
}
export default meta
type Story = StoryObj<typeof VfkNotification>

export const Info: Story = {
  args: {
    title: 'New version available',
    description: 'vfk-ui 1.2.0 has been published. Update your dependencies to get the latest components.',
    variant: 'info',
  },
}

export const Success: Story = {
  args: {
    title: 'Export complete',
    description: 'Your report has been generated and is ready to download.',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    title: 'Session expiring',
    description: 'Your session will expire in 5 minutes. Save your work to avoid losing changes.',
    variant: 'warning',
  },
}

export const Danger: Story = {
  args: {
    title: 'Upload failed',
    description: 'The file could not be uploaded. Please check your connection and try again.',
    variant: 'danger',
  },
}

export const DismissInteraction: Story = {
  args: {
    title: 'Export complete',
    description: 'Your report has been generated and is ready to download.',
    variant: 'success',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('alert')).toBeInTheDocument()

    const closeButton = canvas.getByRole('button', { name: 'Benachrichtigung schließen' })
    await userEvent.click(closeButton)

    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument()
  },
}
