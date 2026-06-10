<script setup lang="ts">
/**
 * VfkNotification — dismissible notification card with a title and description.
 *
 * @prop {string} title - The notification heading.
 * @prop {string} description - Supporting detail text shown below the title.
 * @prop {'info'|'success'|'warning'|'danger'} [variant='info'] - Semantic color variant.
 *
 * @emits dismiss - Fired when the close button is activated.
 *
 * @example
 * <VfkNotification
 *   title="Export complete"
 *   description="Your report has been generated and is ready to download."
 *   variant="success"
 *   @dismiss="onDismiss"
 * />
 */

import { ref } from 'vue'
import VfkButton from '@/components/elements/vfk-button/VfkButton.vue'

interface Props {
  title: string
  description: string
  variant?: 'info' | 'success' | 'warning' | 'danger'
}

withDefaults(defineProps<Props>(), {
  variant: 'info',
})

const emit = defineEmits<{
  dismiss: []
}>()

const visible = ref(true)

function dismiss() {
  visible.value = false
  emit('dismiss')
}
</script>

<template>
  <div
    v-if="visible"
    :class="['vfk-notification', `vfk-notification--${variant}`]"
    role="alert"
  >
    <span class="vfk-notification__icon" aria-hidden="true">
      <svg v-if="variant === 'info'" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" />
        <path d="M10 9v4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        <circle cx="10" cy="6.25" r="0.75" fill="currentColor" />
      </svg>
      <svg v-else-if="variant === 'success'" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" />
        <path d="M6.5 10.5l2.25 2.25L13.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg v-else-if="variant === 'warning'" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5l8 14H2l8-14z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M10 8v3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        <circle cx="10" cy="14" r="0.75" fill="currentColor" />
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" />
        <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </span>

    <div class="vfk-notification__content">
      <p class="vfk-notification__title">{{ title }}</p>
      <p class="vfk-notification__description">{{ description }}</p>
    </div>

    <VfkButton
      class="vfk-notification__dismiss"
      variant="icon"
      label="Benachrichtigung schließen"
      @click="dismiss"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </VfkButton>
  </div>
</template>

<style scoped>
.vfk-notification {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  width: 360px;
  max-width: 100%;
  box-sizing: border-box;
  padding: var(--space-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  font-family: var(--font-family-base);
}

.vfk-notification__icon {
  display: flex;
  flex-shrink: 0;
  padding-top: 1px;
}

.vfk-notification--info .vfk-notification__icon {
  color: var(--color-info);
}

.vfk-notification--success .vfk-notification__icon {
  color: var(--color-success);
}

.vfk-notification--warning .vfk-notification__icon {
  color: var(--color-warning);
}

.vfk-notification--danger .vfk-notification__icon {
  color: var(--color-danger);
}

.vfk-notification__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.vfk-notification__title {
  margin: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-text);
}

.vfk-notification__description {
  margin: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-text-muted);
}

.vfk-notification__dismiss {
  flex-shrink: 0;
  margin: calc(var(--space-xs) * -1);
}
</style>
