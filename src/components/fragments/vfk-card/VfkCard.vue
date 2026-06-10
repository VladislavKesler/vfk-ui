<script setup lang="ts">
/**
 * VfkCard — flexible content container with optional header and footer slots.
 *
 * @prop {'default'|'interactive'} [variant='default'] - 'interactive' adds hover/focus
 * styling and makes the whole card clickable and keyboard-activatable.
 *
 * @slot header - Optional content rendered above the body, separated by a divider.
 * @slot default - Main card content.
 * @slot footer - Optional content rendered below the body, separated by a divider.
 *
 * @emits click - Fired when an interactive card is activated via click, Enter, or Space.
 *
 * @example
 * <VfkCard>
 *   <template #header>Project Alpha</template>
 *   Short project description.
 *   <template #footer><VfkButton label="Open" /></template>
 * </VfkCard>
 * <VfkCard variant="interactive" @click="openDetails">Open project details</VfkCard>
 */

interface Props {
  variant?: 'default' | 'interactive'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const emit = defineEmits<{
  click: [event: MouseEvent | KeyboardEvent]
}>()

function onClick(event: MouseEvent) {
  if (props.variant === 'interactive') {
    emit('click', event)
  }
}

function onKeydown(event: KeyboardEvent) {
  if (props.variant !== 'interactive') return
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    emit('click', event)
  }
}
</script>

<template>
  <div
    :class="['vfk-card', `vfk-card--${variant}`]"
    :role="variant === 'interactive' ? 'button' : undefined"
    :tabindex="variant === 'interactive' ? 0 : undefined"
    @click="onClick"
    @keydown="onKeydown"
  >
    <header v-if="$slots.header" class="vfk-card__header">
      <slot name="header" />
    </header>
    <div class="vfk-card__body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="vfk-card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.vfk-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.vfk-card--interactive {
  cursor: pointer;
  transition:
    box-shadow var(--duration-fast) var(--ease-in-out),
    border-color var(--duration-fast) var(--ease-in-out);
}

.vfk-card--interactive:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-strong);
}

.vfk-card--interactive:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.vfk-card__header {
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.vfk-card__body {
  flex: 1;
  padding: var(--space-md);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-text);
}

.vfk-card__footer {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-top: 1px solid var(--color-border);
}
</style>
