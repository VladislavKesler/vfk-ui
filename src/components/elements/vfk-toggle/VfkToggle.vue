<script setup lang="ts">
/**
 * VfkToggle — a boolean on/off switch with full keyboard and screen-reader support.
 *
 * @prop {boolean} modelValue - Current checked state (bind with v-model).
 * @prop {string}  [label]    - Visible label text rendered next to the switch.
 * @prop {boolean} [disabled=false] - Prevents interaction when true.
 *
 * @emits {update:modelValue} Emitted with the new boolean value on toggle.
 *
 * @example
 * <VfkToggle v-model="isEnabled" label="Enable notifications" />
 * <VfkToggle v-model="isEnabled" disabled />
 */

interface Props {
  modelValue: boolean
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function toggle() {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    toggle()
  }
}
</script>

<template>
  <label
    :class="['vfk-toggle', { 'vfk-toggle--disabled': disabled }]"
    @click.prevent="toggle"
  >
    <span
      class="vfk-toggle__track"
      role="switch"
      :aria-checked="modelValue"
      :aria-disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      @keydown="onKeydown"
    >
      <span :class="['vfk-toggle__thumb', { 'vfk-toggle__thumb--on': modelValue }]" />
    </span>
    <span v-if="label" class="vfk-toggle__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.vfk-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  user-select: none;
}

.vfk-toggle--disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.vfk-toggle__track {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  border-radius: var(--radius-full);
  background-color: var(--color-border-strong);
  transition: background-color var(--duration-normal) var(--ease-in-out);
  outline: none;
  flex-shrink: 0;
}

.vfk-toggle__track[aria-checked='true'] {
  background-color: var(--color-primary);
}

.vfk-toggle__track:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.vfk-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: var(--radius-full);
  background-color: var(--color-surface);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform var(--duration-normal) var(--ease-spring);
}

.vfk-toggle__thumb--on {
  transform: translateX(20px);
}

.vfk-toggle__label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text);
  line-height: var(--line-height-normal);
}

.vfk-toggle--disabled .vfk-toggle__label {
  color: var(--color-text-disabled);
}
</style>
