<script setup lang="ts">
/**
 * VfkAlert — inline message banner for contextual feedback.
 *
 * @prop {string} message - The alert text content.
 * @prop {'info'|'success'|'warning'|'danger'} [variant='info'] - Semantic color variant.
 * @prop {boolean} [dismissible=false] - Shows a close button that hides the alert.
 *
 * @emits dismiss - Fired when the close button is activated.
 *
 * @example
 * <VfkAlert message="Your changes have been saved." variant="success" />
 * <VfkAlert message="This action cannot be undone." variant="danger" dismissible @dismiss="onDismiss" />
 */

import { ref } from 'vue'
import VfkButton from '@/components/elements/vfk-button/VfkButton.vue'

interface Props {
  message: string
  variant?: 'info' | 'success' | 'warning' | 'danger'
  dismissible?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'info',
  dismissible: false,
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
    :class="['vfk-alert', `vfk-alert--${variant}`]"
    role="alert"
  >
    <span class="vfk-alert__icon" aria-hidden="true">
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

    <p class="vfk-alert__message">{{ message }}</p>

    <VfkButton
      v-if="dismissible"
      class="vfk-alert__dismiss"
      variant="icon"
      label="Meldung schließen"
      @click="dismiss"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </VfkButton>
  </div>
</template>

<style scoped>
.vfk-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  padding: var(--space-md);
  border: 1px solid;
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
}

.vfk-alert--info {
  background-color: var(--color-info-subtle);
  border-color: var(--color-info);
  color: var(--color-info);
}

.vfk-alert--success {
  background-color: var(--color-success-subtle);
  border-color: var(--color-success);
  color: var(--color-success);
}

.vfk-alert--warning {
  background-color: var(--color-warning-subtle);
  border-color: var(--color-warning);
  color: var(--color-warning);
}

.vfk-alert--danger {
  background-color: var(--color-danger-subtle);
  border-color: var(--color-danger);
  color: var(--color-danger);
}

.vfk-alert__icon {
  display: flex;
  flex-shrink: 0;
  padding-top: 1px;
}

.vfk-alert__message {
  flex: 1;
  margin: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-text);
}

.vfk-alert__dismiss {
  flex-shrink: 0;
  margin: calc(var(--space-xs) * -1);
}
</style>
