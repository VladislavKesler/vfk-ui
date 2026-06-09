<script setup lang="ts">
/**
 * VfkTextfield — single-line text input with label, placeholder, error, and disabled states.
 *
 * @prop {string}  modelValue         - Current input value (bind with v-model).
 * @prop {string}  [label]            - Visible label rendered above the input.
 * @prop {string}  [placeholder]      - Placeholder text shown when the field is empty.
 * @prop {'text'|'email'|'password'|'search'|'tel'|'url'} [type='text'] - Native input type.
 * @prop {boolean} [disabled=false]   - Prevents interaction when true.
 * @prop {string}  [error]            - Error message shown below the field; also sets aria-invalid.
 *
 * @emits {update:modelValue} Emitted with the new string value on every input event.
 *
 * @example
 * <VfkTextfield v-model="email" label="Email" type="email" placeholder="you@example.com" />
 * <VfkTextfield v-model="name" label="Name" error="Name is required" />
 */

import { computed } from 'vue'

let idCounter = 0

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  disabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputId = `vfk-textfield-${++idCounter}`
const errorId = computed(() => (props.error ? `${inputId}-error` : undefined))

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="['vfk-textfield', { 'vfk-textfield--disabled': disabled, 'vfk-textfield--error': error }]">
    <label v-if="label" :for="inputId" class="vfk-textfield__label">{{ label }}</label>
    <input
      :id="inputId"
      class="vfk-textfield__input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="!!error"
      :aria-describedby="errorId"
      @input="onInput"
    />
    <span v-if="error" :id="errorId" class="vfk-textfield__error" role="alert">{{ error }}</span>
  </div>
</template>

<style scoped>
.vfk-textfield {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.vfk-textfield__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  line-height: var(--line-height-normal);
}

.vfk-textfield--disabled .vfk-textfield__label {
  color: var(--color-text-disabled);
}

.vfk-textfield__input {
  width: 100%;
  box-sizing: border-box;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text);
  line-height: var(--line-height-normal);
  transition:
    border-color var(--duration-fast) var(--ease-in-out),
    box-shadow var(--duration-fast) var(--ease-in-out);
  outline: none;
}

.vfk-textfield__input::placeholder {
  color: var(--color-text-muted);
}

.vfk-textfield__input:hover:not(:disabled) {
  border-color: var(--color-border-strong);
}

.vfk-textfield__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.vfk-textfield--error .vfk-textfield__input {
  border-color: var(--color-danger);
}

.vfk-textfield--error .vfk-textfield__input:focus {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 3px var(--color-danger-subtle);
}

.vfk-textfield__input:disabled {
  background-color: var(--color-surface-overlay);
  color: var(--color-text-disabled);
  cursor: not-allowed;
  border-color: var(--color-border);
}

.vfk-textfield__error {
  font-family: var(--font-family-base);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  color: var(--color-danger);
  line-height: var(--line-height-normal);
}
</style>
