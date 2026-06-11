import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { expect, userEvent, within } from 'storybook/test'
import VfkDataTable from '@/components/fragments/vfk-data-table/VfkDataTable.vue'
import VfkStatusBadge from '@/components/fragments/vfk-status-badge/VfkStatusBadge.vue'

const meta: Meta<typeof VfkDataTable> = {
  component: VfkDataTable,
  tags: ['autodocs'],
  args: {
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
      { key: 'department', label: 'Department' },
    ],
    rows: [
      { name: 'Alice Mendes', role: 'Engineer', department: 'Platform' },
      { name: 'Bruno Costa', role: 'Designer', department: 'Product' },
      { name: 'Chen Wei', role: 'Engineer', department: 'Platform' },
    ],
  },
}
export default meta
type Story = StoryObj<typeof VfkDataTable>

export const Default: Story = {}

export const WithCaption: Story = {
  args: { caption: 'Team Members' },
}

export const NonSortableColumns: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'department', label: 'Department' },
    ],
  },
}

export const Pagination: Story = {
  args: {
    pageSize: 2,
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
    ],
    rows: [
      { name: 'Alice Mendes', role: 'Engineer' },
      { name: 'Bruno Costa', role: 'Designer' },
      { name: 'Chen Wei', role: 'Engineer' },
      { name: 'Dana Frost', role: 'Manager' },
      { name: 'Elif Aydin', role: 'Engineer' },
    ],
  },
}

export const Empty: Story = {
  args: { rows: [] },
}

export const AuditLog: Story = {
  args: {
    caption: 'Audit Log',
    columns: [
      { key: 'timestamp', label: 'Timestamp', sortable: true },
      { key: 'user', label: 'User', sortable: true },
      { key: 'action', label: 'Action' },
      { key: 'status', label: 'Status', sortable: true },
    ],
    rows: [
      { timestamp: '2026-06-10 09:14', user: 'a.mendes', action: 'Login', status: 'submitted' },
      { timestamp: '2026-06-10 09:02', user: 'b.costa', action: 'Export report', status: 'failed' },
      { timestamp: '2026-06-09 17:45', user: 'c.wei', action: 'Update settings', status: 'pending' },
      { timestamp: '2026-06-09 14:30', user: 'a.mendes', action: 'Delete record', status: 'submitted' },
    ],
  },
  render: (args) => ({
    components: { VfkDataTable, VfkStatusBadge },
    setup() {
      return { args }
    },
    template: `
      <VfkDataTable v-bind="args">
        <template #cell-status="{ value }">
          <VfkStatusBadge :status="value" />
        </template>
      </VfkDataTable>
    `,
  }),
}

export const SortAndPaginateInteraction: Story = {
  args: {
    pageSize: 2,
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
    ],
    rows: [
      { name: 'Chen Wei', role: 'Engineer' },
      { name: 'Alice Mendes', role: 'Engineer' },
      { name: 'Bruno Costa', role: 'Designer' },
      { name: 'Dana Frost', role: 'Manager' },
      { name: 'Elif Aydin', role: 'Engineer' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Page 1 of 3')).toBeInTheDocument()
    await expect(canvas.getAllByRole('cell')[0]).toHaveTextContent('Chen Wei')

    const nameHeader = canvas.getByRole('button', { name: 'Name' })
    await userEvent.click(nameHeader)
    await expect(canvas.getAllByRole('cell')[0]).toHaveTextContent('Alice Mendes')
    await expect(canvas.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('aria-sort', 'ascending')

    await userEvent.click(nameHeader)
    await expect(canvas.getAllByRole('cell')[0]).toHaveTextContent('Elif Aydin')
    await expect(canvas.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('aria-sort', 'descending')

    const nextButton = canvas.getByRole('button', { name: 'Next' })
    await userEvent.click(nextButton)
    await expect(canvas.getByText('Page 2 of 3')).toBeInTheDocument()

    const prevButton = canvas.getByRole('button', { name: 'Previous' })
    await userEvent.click(prevButton)
    await expect(canvas.getByText('Page 1 of 3')).toBeInTheDocument()
    await expect(prevButton).toBeDisabled()
  },
}
