<script setup lang="ts">
/**
 * VfkBadge — small inline label for status or count display.
 *
 * @prop {string} label - Text content displayed inside the badge.
 * @prop {'neutral'|'primary'|'success'|'warning'|'danger'|'info'} [variant='neutral'] - Semantic color variant.
 *
 * @example
 * <VfkBadge label="New" variant="primary" />
 * <VfkBadge label="Error" variant="danger" />
 */

interface Props {
  label: string
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

withDefaults(defineProps<Props>(), {
  variant: 'neutral',
})
</script>

<template>
  <span
    :class="['vfk-badge', `vfk-badge--${variant}`]"
    role="status"
    :aria-label="label"
  >{{ label }}</span>
</template>

<style scoped>
.vfk-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-full);
  font-family: var(--font-family-base);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-wide);
  white-space: nowrap;
  user-select: none;
}

.vfk-badge--neutral {
  background-color: var(--color-surface-overlay);
  color: var(--color-text-muted);
}

.vfk-badge--primary {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
}

.vfk-badge--success {
  background-color: var(--color-success-subtle);
  color: var(--color-success);
}

.vfk-badge--warning {
  background-color: var(--color-warning-subtle);
  color: var(--color-warning);
}

.vfk-badge--danger {
  background-color: var(--color-danger-subtle);
  color: var(--color-danger);
}

.vfk-badge--info {
  background-color: var(--color-info-subtle);
  color: var(--color-info);
}
</style>
