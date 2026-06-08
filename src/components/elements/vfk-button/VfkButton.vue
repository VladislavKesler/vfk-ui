<script setup lang="ts">
/**
 * VfkButton — base interactive button element.
 *
 * @prop {string} label - Visible text (primary/secondary) or accessible label (icon variant).
 * @prop {'primary'|'secondary'|'icon'} [variant='primary'] - Visual style of the button.
 * @prop {boolean} [disabled=false] - Disables the button and suppresses click events.
 * @prop {'button'|'submit'|'reset'} [type='button'] - Native button type attribute.
 *
 * @emits click - Fired when the button is activated and not disabled.
 *
 * @example
 * <VfkButton label="Save" variant="primary" @click="onSave" />
 * <VfkButton label="Add item" variant="icon" @click="onAdd">
 *   <svg ...aria-hidden="true" />
 * </VfkButton>
 */

interface Props {
  label: string
  variant?: 'primary' | 'secondary' | 'icon'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="variant === 'icon' ? label : undefined"
    :aria-disabled="disabled"
    :class="['vfk-button', `vfk-button--${variant}`, { 'vfk-button--disabled': disabled }]"
    @click="handleClick"
  >
    <span v-if="variant !== 'icon'" class="vfk-button__label">{{ label }}</span>
    <slot />
  </button>
</template>

<style scoped>
.vfk-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-in-out),
    border-color var(--duration-fast) var(--ease-in-out),
    color var(--duration-fast) var(--ease-in-out);
  white-space: nowrap;
  user-select: none;
}

.vfk-button--primary {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text-on-primary);
}

.vfk-button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.vfk-button--primary:active:not(:disabled) {
  background-color: var(--color-primary-active);
  border-color: var(--color-primary-active);
}

.vfk-button--secondary {
  background-color: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.vfk-button--secondary:hover:not(:disabled) {
  background-color: var(--color-primary-subtle);
  border-color: var(--color-primary-hover);
  color: var(--color-primary-hover);
}

.vfk-button--secondary:active:not(:disabled) {
  background-color: var(--color-primary-subtle);
  border-color: var(--color-primary-active);
  color: var(--color-primary-active);
}

.vfk-button--icon {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-text);
  padding: var(--space-sm);
  border-radius: var(--radius-full);
}

.vfk-button--icon:hover:not(:disabled) {
  background-color: var(--color-surface-overlay);
}

.vfk-button--icon:active:not(:disabled) {
  background-color: var(--color-border);
}

.vfk-button:disabled,
.vfk-button--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.vfk-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
