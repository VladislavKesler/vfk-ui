import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import VfkDataTable from '@/components/fragments/vfk-data-table/VfkDataTable.vue'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role' },
]

const rows = [
  { name: 'Chen Wei', role: 'Engineer' },
  { name: 'Alice Mendes', role: 'Designer' },
  { name: 'Bruno Costa', role: 'Manager' },
]

function findButton(wrapper: VueWrapper, label: string) {
  return wrapper.findAll('.vfk-button').find((button) => button.text() === label)
}

function makeRows(length: number) {
  return Array.from({ length }, (_, i) => ({ name: `Person ${i}`, role: 'Engineer' }))
}

describe('VfkDataTable', () => {
  it('renders a column header for each column', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows } })
    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(2)
    expect(headers[0]!.text()).toContain('Name')
    expect(headers[1]!.text()).toBe('Role')
  })

  it('renders a row for each item up to pageSize', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows, pageSize: 2 } })
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
  })

  it('renders the caption when provided', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows, caption: 'Team Members' } })
    expect(wrapper.find('caption').text()).toBe('Team Members')
  })

  it('does not render a caption element when caption is omitted', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows } })
    expect(wrapper.find('caption').exists()).toBe(false)
  })

  it('renders a sort button for sortable columns', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows } })
    expect(wrapper.find('thead button').exists()).toBe(true)
  })

  it('does not render a sort button for non-sortable columns', () => {
    const wrapper = mount(VfkDataTable, {
      props: { columns: [{ key: 'role', label: 'Role' }], rows },
    })
    expect(wrapper.find('thead button').exists()).toBe(false)
  })

  it('sorts rows ascending on first click of a sortable column header', async () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows, pageSize: 10 } })
    await wrapper.find('thead button').trigger('click')
    const cells = wrapper.findAll('tbody td:first-child').map((td) => td.text())
    expect(cells).toEqual(['Alice Mendes', 'Bruno Costa', 'Chen Wei'])
  })

  it('sorts rows descending on second click of the same column header', async () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows, pageSize: 10 } })
    const sortButton = wrapper.find('thead button')
    await sortButton.trigger('click')
    await sortButton.trigger('click')
    const cells = wrapper.findAll('tbody td:first-child').map((td) => td.text())
    expect(cells).toEqual(['Chen Wei', 'Bruno Costa', 'Alice Mendes'])
  })

  it('cycles back to ascending order on a third click', async () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows, pageSize: 10 } })
    const sortButton = wrapper.find('thead button')
    await sortButton.trigger('click')
    await sortButton.trigger('click')
    await sortButton.trigger('click')
    const cells = wrapper.findAll('tbody td:first-child').map((td) => td.text())
    expect(cells).toEqual(['Alice Mendes', 'Bruno Costa', 'Chen Wei'])
  })

  it('sorts numeric columns numerically, not lexicographically', async () => {
    const wrapper = mount(VfkDataTable, {
      props: {
        columns: [{ key: 'count', label: 'Count', sortable: true }],
        rows: [{ count: 2 }, { count: 10 }, { count: 1 }],
        pageSize: 10,
      },
    })
    await wrapper.find('thead button').trigger('click')
    const cells = wrapper.findAll('tbody td').map((td) => td.text())
    expect(cells).toEqual(['1', '2', '10'])
  })

  it('does not change order when clicking a non-sortable column header', async () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows, pageSize: 10 } })
    await wrapper.findAll('thead th')[1]!.trigger('click')
    const cells = wrapper.findAll('tbody td:first-child').map((td) => td.text())
    expect(cells).toEqual(['Chen Wei', 'Alice Mendes', 'Bruno Costa'])
  })

  it('resets to page 1 when sorting changes while on a later page', async () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows: makeRows(6), pageSize: 2 } })
    await findButton(wrapper, 'Next')!.trigger('click')
    expect(wrapper.text()).toContain('Page 2 of 3')

    await wrapper.find('thead button').trigger('click')
    expect(wrapper.text()).toContain('Page 1 of 3')
  })

  it('sets aria-sort="none" on a sortable column header before it is sorted', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows } })
    expect(wrapper.findAll('th')[0]!.attributes('aria-sort')).toBe('none')
  })

  it('sets aria-sort="ascending" after sorting ascending', async () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows } })
    await wrapper.find('thead button').trigger('click')
    expect(wrapper.findAll('th')[0]!.attributes('aria-sort')).toBe('ascending')
  })

  it('sets aria-sort="descending" after toggling to descending', async () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows } })
    const sortButton = wrapper.find('thead button')
    await sortButton.trigger('click')
    await sortButton.trigger('click')
    expect(wrapper.findAll('th')[0]!.attributes('aria-sort')).toBe('descending')
  })

  it('does not set aria-sort on non-sortable column headers', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows } })
    expect(wrapper.findAll('th')[1]!.attributes('aria-sort')).toBeUndefined()
  })

  it('shows only the first pageSize rows on page 1', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows: makeRows(5), pageSize: 2 } })
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
  })

  it('disables the Previous button on the first page', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows: makeRows(5), pageSize: 2 } })
    expect(findButton(wrapper, 'Previous')?.attributes('disabled')).toBeDefined()
  })

  it('enables the Next button when more pages exist', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows: makeRows(5), pageSize: 2 } })
    expect(findButton(wrapper, 'Next')?.attributes('disabled')).toBeUndefined()
  })

  it('disables the Next button on the last page', async () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows: makeRows(5), pageSize: 2 } })
    const nextButton = findButton(wrapper, 'Next')!
    await nextButton.trigger('click')
    await nextButton.trigger('click')
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('navigates to the next page and shows the next slice of rows', async () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows: makeRows(5), pageSize: 2 } })
    await findButton(wrapper, 'Next')!.trigger('click')
    expect(wrapper.find('tbody td').text()).toBe('Person 2')
  })

  it('navigates back to the previous page', async () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows: makeRows(5), pageSize: 2 } })
    await findButton(wrapper, 'Next')!.trigger('click')
    await findButton(wrapper, 'Previous')!.trigger('click')
    expect(wrapper.find('tbody td').text()).toBe('Person 0')
  })

  it('shows "Page X of Y" with the current and total page counts', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows, pageSize: 2 } })
    expect(wrapper.text()).toContain('Page 1 of 2')
  })

  it('clamps to a single page when rows fit within pageSize', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows, pageSize: 10 } })
    expect(wrapper.text()).toContain('Page 1 of 1')
    expect(findButton(wrapper, 'Next')?.attributes('disabled')).toBeDefined()
    expect(findButton(wrapper, 'Previous')?.attributes('disabled')).toBeDefined()
  })

  it('renders the empty message row when rows is empty', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows: [] } })
    expect(wrapper.text()).toContain('No data available.')
  })

  it('renders a custom emptyMessage when provided', () => {
    const wrapper = mount(VfkDataTable, {
      props: { columns, rows: [], emptyMessage: 'Nothing here yet.' },
    })
    expect(wrapper.text()).toContain('Nothing here yet.')
  })

  it('does not render the empty message row when rows are present', () => {
    const wrapper = mount(VfkDataTable, { props: { columns, rows } })
    expect(wrapper.text()).not.toContain('No data available.')
  })

  it('renders default cell content (the raw value) when no scoped slot is provided', () => {
    const wrapper = mount(VfkDataTable, {
      props: { columns, rows: [{ name: 'Alice', role: 'Engineer' }] },
    })
    expect(wrapper.find('tbody td').text()).toBe('Alice')
  })

  it('renders an em-dash for null/undefined cell values when no slot is provided', () => {
    const wrapper = mount(VfkDataTable, {
      props: { columns: [{ key: 'name', label: 'Name' }], rows: [{ name: null }] },
    })
    expect(wrapper.find('tbody td').text()).toBe('—')
  })

  it('renders custom content via the cell-{key} scoped slot, passing row and value', () => {
    const wrapper = mount(VfkDataTable, {
      props: {
        columns: [{ key: 'status', label: 'Status' }],
        rows: [{ status: 'submitted' }],
      },
      slots: {
        'cell-status': (slotProps: { row: Record<string, unknown>; value: unknown }) =>
          h('strong', `${slotProps.value}-${slotProps.row.status}`),
      },
    })
    expect(wrapper.find('tbody td strong').text()).toBe('submitted-submitted')
  })
})
