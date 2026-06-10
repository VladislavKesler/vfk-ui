<script setup lang="ts">
/**
 * VfkDataTable — sortable, paginated data table. Built on VfkCard and VfkButton.
 *
 * @prop {Column[]} columns - Column definitions: { key, label, sortable? }.
 * @prop {Row[]} rows - Row data, keyed by column `key`. Values may be string, number,
 * boolean, null, or undefined.
 * @prop {number} [pageSize=5] - Number of rows shown per page.
 * @prop {string} [caption] - Optional accessible table caption.
 * @prop {string} [emptyMessage='No data available.'] - Message shown when `rows` is empty.
 *
 * @slot cell-{key} - Optional scoped slot per column key to customize cell rendering.
 * Receives `{ row, value }`. Falls back to the raw value (or "—" for null/undefined).
 *
 * @example
 * <VfkDataTable
 *   :columns="[
 *     { key: 'timestamp', label: 'Timestamp', sortable: true },
 *     { key: 'status', label: 'Status', sortable: true },
 *   ]"
 *   :rows="auditLogRows"
 *   caption="Audit Log"
 * >
 *   <template #cell-status="{ value }">
 *     <VfkStatusBadge :status="value" />
 *   </template>
 * </VfkDataTable>
 */

import { computed, ref } from 'vue'
import VfkCard from '@/components/fragments/vfk-card/VfkCard.vue'
import VfkButton from '@/components/elements/vfk-button/VfkButton.vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Row {
  [key: string]: string | number | boolean | null | undefined
}

interface Props {
  columns: Column[]
  rows: Row[]
  pageSize?: number
  caption?: string
  emptyMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 5,
  emptyMessage: 'No data available.',
})

const sortKey = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)

function compareValues(a: Row[string], b: Row[string]): number {
  if (a === null || a === undefined) return b === null || b === undefined ? 0 : -1
  if (b === null || b === undefined) return 1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  const key = sortKey.value
  const direction = sortDirection.value === 'asc' ? 1 : -1
  return [...props.rows].sort((a, b) => compareValues(a[key], b[key]) * direction)
})

const totalPages = computed(() => Math.max(1, Math.ceil(sortedRows.value.length / props.pageSize)))

const safePage = computed(() => Math.min(Math.max(1, currentPage.value), totalPages.value))

const paginatedRows = computed(() => {
  const start = (safePage.value - 1) * props.pageSize
  return sortedRows.value.slice(start, start + props.pageSize)
})

function toggleSort(column: Column) {
  if (!column.sortable) return
  if (sortKey.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortDirection.value = 'asc'
  }
  currentPage.value = 1
}

function goToPage(page: number) {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}

function ariaSortFor(column: Column): 'ascending' | 'descending' | 'none' | undefined {
  if (!column.sortable) return undefined
  if (sortKey.value !== column.key) return 'none'
  return sortDirection.value === 'asc' ? 'ascending' : 'descending'
}

function sortIcon(column: Column): string {
  if (sortKey.value !== column.key) return '⇅'
  return sortDirection.value === 'asc' ? '▲' : '▼'
}
</script>

<template>
  <VfkCard class="vfk-data-table">
    <div
      class="vfk-data-table__scroll"
      role="region"
      :aria-label="caption ?? 'Data table'"
      tabindex="0"
    >
      <table class="vfk-data-table__table">
        <caption v-if="caption" class="vfk-data-table__caption">{{ caption }}</caption>
        <thead>
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              :aria-sort="ariaSortFor(column)"
              class="vfk-data-table__th"
            >
              <button
                v-if="column.sortable"
                type="button"
                class="vfk-data-table__sort-button"
                @click="toggleSort(column)"
              >
                {{ column.label }}
                <span class="vfk-data-table__sort-icon" aria-hidden="true">{{ sortIcon(column) }}</span>
              </button>
              <template v-else>{{ column.label }}</template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedRows.length === 0">
            <td :colspan="columns.length" class="vfk-data-table__empty">{{ emptyMessage }}</td>
          </tr>
          <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex" class="vfk-data-table__row">
            <td v-for="column in columns" :key="column.key" class="vfk-data-table__td">
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] ?? '—' }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template #footer>
      <VfkButton
        label="Previous"
        variant="secondary"
        :disabled="safePage === 1"
        @click="goToPage(safePage - 1)"
      />
      <span class="vfk-data-table__page-info" aria-live="polite">Page {{ safePage }} of {{ totalPages }}</span>
      <VfkButton
        label="Next"
        variant="secondary"
        :disabled="safePage === totalPages"
        @click="goToPage(safePage + 1)"
      />
    </template>
  </VfkCard>
</template>

<style scoped>
.vfk-data-table__scroll {
  overflow-x: auto;
}

.vfk-data-table__table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  color: var(--color-text);
}

.vfk-data-table__caption {
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  padding-bottom: var(--space-sm);
}

.vfk-data-table__th {
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-surface-raised);
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.vfk-data-table__sort-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-weight: inherit;
  color: inherit;
  cursor: pointer;
}

.vfk-data-table__sort-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.vfk-data-table__sort-icon {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.vfk-data-table__td {
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-border);
}

.vfk-data-table__row:last-child .vfk-data-table__td {
  border-bottom: none;
}

.vfk-data-table__empty {
  padding: var(--space-lg) var(--space-md);
  text-align: center;
  color: var(--color-text-muted);
}

.vfk-data-table__page-info {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.vfk-data-table :deep(.vfk-card__footer) {
  justify-content: space-between;
}
</style>
