<script setup lang="ts">
/**
 * VfkDatePicker — date input with a calendar popup for selecting a date.
 *
 * @prop {string | null} modelValue   - Selected ISO date (YYYY-MM-DD) or null; use with v-model.
 * @prop {string}  [label]            - Visible label rendered above the input.
 * @prop {string}  [placeholder='DD.MM.YYYY'] - Placeholder shown when no date is selected.
 * @prop {boolean} [disabled=false]   - Prevents interaction when true.
 * @prop {string}  [error]            - Error message shown below the field; sets aria-invalid.
 * @prop {string}  [min]              - Earliest selectable date as ISO string (YYYY-MM-DD).
 * @prop {string}  [max]              - Latest selectable date as ISO string (YYYY-MM-DD).
 *
 * @emits {update:modelValue} Emitted with the selected ISO date string on selection.
 *
 * @example
 * <VfkDatePicker v-model="birthdate" label="Date of birth" />
 * <VfkDatePicker v-model="date" min="2026-01-01" max="2026-12-31" />
 */

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

let idCounter = 0

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

interface Props {
  modelValue: string | null
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  min?: string
  max?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: 'DD.MM.YYYY',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const uid = ++idCounter
const inputId = `vfk-datepicker-${uid}`
const popupId = `${inputId}-popup`
const errorId = computed(() => (props.error ? `${inputId}-error` : undefined))

const isOpen = ref(false)
const today = new Date()
const todayISO = toISO(today)
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())
const rootRef = ref<HTMLElement | null>(null)

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const d = parseISO(val)
      viewYear.value = d.getFullYear()
      viewMonth.value = d.getMonth()
    }
  },
)

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number) as [number, number, number]
  return new Date(y, m - 1, d)
}

function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  const [y, m, d] = props.modelValue.split('-')
  return `${d}.${m}.${y}`
})

const monthLabel = computed(
  () => `${MONTH_NAMES[viewMonth.value]} ${viewYear.value}`,
)

interface DayCell {
  iso: string
  day: number
  currentMonth: boolean
  isSelected: boolean
  isToday: boolean
  isDisabled: boolean
}

function makeCell(iso: string, day: number, currentMonth: boolean): DayCell {
  return {
    iso,
    day,
    currentMonth,
    isSelected: iso === props.modelValue,
    isToday: iso === todayISO,
    isDisabled:
      (!!props.min && iso < props.min) || (!!props.max && iso > props.max),
  }
}

const daysInGrid = computed<DayCell[]>(() => {
  const year = viewYear.value
  const month = viewMonth.value
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // Mon-first: Mon=0 … Sun=6
  const startOffset = (firstDay.getDay() + 6) % 7

  const cells: DayCell[] = []

  // Padding from previous month
  for (let i = startOffset - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    cells.push(makeCell(toISO(date), date.getDate(), false))
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(makeCell(toISO(new Date(year, month, d)), d, true))
  }

  // Padding from next month (fill to 42 cells = 6 rows × 7)
  let nextDay = 1
  while (cells.length < 42) {
    const date = new Date(year, month + 1, nextDay++)
    cells.push(makeCell(toISO(date), date.getDate(), false))
  }

  return cells
})

const weeks = computed<DayCell[][]>(() => {
  const grid = daysInGrid.value
  const result: DayCell[][] = []
  for (let i = 0; i < grid.length; i += 7) {
    result.push(grid.slice(i, i + 7))
  }
  return result
})

function cellTabIndex(cell: DayCell): number {
  if (cell.isSelected) return 0
  if (!props.modelValue && cell.isToday && cell.currentMonth) return 0
  return -1
}

function open() {
  if (props.disabled) return
  if (props.modelValue) {
    const d = parseISO(props.modelValue)
    viewYear.value = d.getFullYear()
    viewMonth.value = d.getMonth()
  } else {
    viewYear.value = today.getFullYear()
    viewMonth.value = today.getMonth()
  }
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function selectDate(cell: DayCell) {
  if (cell.isDisabled) return
  emit('update:modelValue', cell.iso)
  close()
}

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value--
  } else {
    viewMonth.value--
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value++
  } else {
    viewMonth.value++
  }
}

function onInputKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (isOpen.value) { close() } else { open() }
  } else if (event.key === 'Escape') {
    close()
  }
}

function onPopupKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
  }
}

function onDocumentClick(event: MouseEvent) {
  if (isOpen.value && rootRef.value && !rootRef.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      'vfk-datepicker',
      { 'vfk-datepicker--disabled': disabled, 'vfk-datepicker--error': error },
    ]"
  >
    <label v-if="label" :for="inputId" class="vfk-datepicker__label">{{ label }}</label>

    <div class="vfk-datepicker__control">
      <input
        :id="inputId"
        class="vfk-datepicker__input"
        type="text"
        readonly
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        role="combobox"
        :aria-expanded="isOpen"
        aria-haspopup="dialog"
        :aria-controls="popupId"
        :aria-invalid="!!error"
        :aria-describedby="errorId"
        @click="open"
        @keydown="onInputKeydown"
      />
      <button
        class="vfk-datepicker__trigger"
        type="button"
        aria-label="Kalender öffnen"
        :disabled="disabled"
        tabindex="-1"
        @click.stop="isOpen ? close() : open()"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M1.5 6.5h13" stroke="currentColor" stroke-width="1.5"/>
          <path d="M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <div
      v-if="isOpen"
      :id="popupId"
      class="vfk-datepicker__popup"
      role="dialog"
      aria-modal="true"
      aria-label="Datum auswählen"
      @keydown.stop="onPopupKeydown"
    >
      <div class="vfk-datepicker__header">
        <button
          type="button"
          class="vfk-datepicker__nav"
          aria-label="Vorheriger Monat"
          @click.stop="prevMonth"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <span class="vfk-datepicker__month-label" data-testid="month-label">{{ monthLabel }}</span>
        <button
          type="button"
          class="vfk-datepicker__nav"
          aria-label="Nächster Monat"
          @click.stop="nextMonth"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="vfk-datepicker__grid" role="grid">
        <div class="vfk-datepicker__weekdays" role="row">
          <span
            v-for="wd in WEEKDAYS"
            :key="wd"
            class="vfk-datepicker__weekday"
            role="columnheader"
          >{{ wd }}</span>
        </div>
        <div
          v-for="(week, wi) in weeks"
          :key="wi"
          class="vfk-datepicker__week"
          role="row"
        >
          <button
            v-for="cell in week"
            :key="cell.iso"
            type="button"
            role="gridcell"
            :aria-selected="cell.isSelected"
            :aria-disabled="cell.isDisabled"
            :aria-label="cell.iso"
            :tabindex="cellTabIndex(cell)"
            :class="[
              'vfk-datepicker__day',
              {
                'vfk-datepicker__day--other-month': !cell.currentMonth,
                'vfk-datepicker__day--today': cell.isToday,
                'vfk-datepicker__day--selected': cell.isSelected,
                'vfk-datepicker__day--disabled': cell.isDisabled,
              },
            ]"
            @click.stop="selectDate(cell)"
          >{{ cell.day }}</button>
        </div>
      </div>
    </div>

    <span v-if="error" :id="errorId" class="vfk-datepicker__error" role="alert">{{ error }}</span>
  </div>
</template>

<style scoped>
.vfk-datepicker {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  position: relative;
}

.vfk-datepicker__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  line-height: var(--line-height-normal);
}

.vfk-datepicker--disabled .vfk-datepicker__label {
  color: var(--color-text-disabled);
}

/* Control row (input + icon button) */
.vfk-datepicker__control {
  position: relative;
  display: flex;
}

.vfk-datepicker__input {
  width: 100%;
  box-sizing: border-box;
  padding: var(--space-sm) var(--space-2xl) var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text);
  line-height: var(--line-height-normal);
  cursor: pointer;
  outline: none;
  transition:
    border-color var(--duration-fast) var(--ease-in-out),
    box-shadow var(--duration-fast) var(--ease-in-out);
}

.vfk-datepicker__input::placeholder {
  color: var(--color-text-muted);
}

.vfk-datepicker__input:hover:not(:disabled) {
  border-color: var(--color-border-strong);
}

.vfk-datepicker__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.vfk-datepicker--error .vfk-datepicker__input {
  border-color: var(--color-danger);
}

.vfk-datepicker--error .vfk-datepicker__input:focus {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 3px var(--color-danger-subtle);
}

.vfk-datepicker__input:disabled {
  background-color: var(--color-surface-overlay);
  color: var(--color-text-disabled);
  cursor: not-allowed;
  border-color: var(--color-border);
}

.vfk-datepicker__trigger {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: var(--space-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  transition: color var(--duration-fast) var(--ease-in-out);
}

.vfk-datepicker__trigger:hover:not(:disabled) {
  color: var(--color-text);
}

.vfk-datepicker__trigger:disabled {
  cursor: not-allowed;
  color: var(--color-text-disabled);
}

/* Popup */
.vfk-datepicker__popup {
  position: absolute;
  top: calc(100% + var(--space-xs));
  left: 0;
  z-index: 100;
  width: 280px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-md);
}

/* Header */
.vfk-datepicker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
}

.vfk-datepicker__month-label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.vfk-datepicker__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: var(--radius-md);
  background: none;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-in-out),
    color var(--duration-fast) var(--ease-in-out);
}

.vfk-datepicker__nav:hover {
  background-color: var(--color-surface-overlay);
  color: var(--color-text);
}

.vfk-datepicker__nav:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Grid */
.vfk-datepicker__weekdays,
.vfk-datepicker__week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.vfk-datepicker__weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-family: var(--font-family-base);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  letter-spacing: var(--letter-spacing-wide);
}

.vfk-datepicker__day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: var(--radius-md);
  background: none;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-in-out),
    color var(--duration-fast) var(--ease-in-out);
}

.vfk-datepicker__day:hover:not(.vfk-datepicker__day--disabled) {
  background-color: var(--color-surface-overlay);
}

.vfk-datepicker__day:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.vfk-datepicker__day--other-month {
  color: var(--color-text-muted);
}

.vfk-datepicker__day--today:not(.vfk-datepicker__day--selected) {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.vfk-datepicker__day--selected {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  font-weight: var(--font-weight-semibold);
}

.vfk-datepicker__day--selected:hover {
  background-color: var(--color-primary-hover);
}

.vfk-datepicker__day--disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

/* Error */
.vfk-datepicker__error {
  font-family: var(--font-family-base);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  color: var(--color-danger);
  line-height: var(--line-height-normal);
}
</style>
