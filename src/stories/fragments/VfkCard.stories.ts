import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import VfkCard from '@/components/fragments/vfk-card/VfkCard.vue'
import VfkButton from '@/components/elements/vfk-button/VfkButton.vue'

const meta: Meta<typeof VfkCard> = {
  component: VfkCard,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    onClick: fn(),
  },
}
export default meta
type Story = StoryObj<typeof VfkCard>

export const Default: Story = {
  render: (args) => ({
    components: { VfkCard },
    setup() {
      return { args }
    },
    template: `
      <VfkCard v-bind="args">
        vfk-ui is a Vue 3 component library built with Vite, TypeScript, and Storybook.
      </VfkCard>
    `,
  }),
}

export const WithHeaderAndFooter: Story = {
  render: (args) => ({
    components: { VfkCard, VfkButton },
    setup() {
      return { args }
    },
    template: `
      <VfkCard v-bind="args">
        <template #header>Project Alpha</template>
        The quarterly report is ready for review.
        <template #footer>
          <VfkButton label="Open report" />
        </template>
      </VfkCard>
    `,
  }),
}

export const Interactive: Story = {
  args: { variant: 'interactive' },
  render: (args) => ({
    components: { VfkCard },
    setup() {
      return { args }
    },
    template: `
      <VfkCard v-bind="args">
        <template #header>Project Alpha</template>
        Click anywhere on this card to open the project.
      </VfkCard>
    `,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByRole('button')

    await userEvent.click(card)
    await expect(args.onClick).toHaveBeenCalledTimes(1)

    card.focus()
    await userEvent.keyboard('{Enter}')
    await expect(args.onClick).toHaveBeenCalledTimes(2)

    await userEvent.keyboard(' ')
    await expect(args.onClick).toHaveBeenCalledTimes(3)
  },
}
