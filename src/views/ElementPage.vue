<script setup lang="ts">
/**
 * ElementPage
 *
 * Renders a live preview of an element-tier component.
 * Reads the `:component` route param, looks it up in the registry,
 * and renders each registered variant. Falls back to a placeholder
 * when no component is registered yet.
 *
 * @param component - route param; the element component name to preview
 */
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface Variant {
  label: string
  props: Record<string, unknown>
}

interface RegistryEntry {
  component: ReturnType<typeof defineAsyncComponent>
  variants: Variant[]
}

const registry: Record<string, RegistryEntry> = {
  button: {
    component: defineAsyncComponent(
      () => import('@/components/elements/vfk-button/VfkButton.vue'),
    ),
    variants: [
      { label: 'Primary', props: { label: 'Save changes', variant: 'primary' } },
      { label: 'Secondary', props: { label: 'Cancel', variant: 'secondary' } },
      { label: 'Disabled', props: { label: 'Save changes', variant: 'primary', disabled: true } },
    ],
  },
  badge: {
    component: defineAsyncComponent(
      () => import('@/components/elements/vfk-badge/VfkBadge.vue'),
    ),
    variants: [
      { label: 'Neutral', props: { label: 'Draft', variant: 'neutral' } },
      { label: 'Primary', props: { label: 'New', variant: 'primary' } },
      { label: 'Success', props: { label: 'Active', variant: 'success' } },
      { label: 'Warning', props: { label: 'Pending', variant: 'warning' } },
      { label: 'Danger', props: { label: 'Error', variant: 'danger' } },
      { label: 'Info', props: { label: 'Info', variant: 'info' } },
    ],
  },
  toggle: {
    component: defineAsyncComponent(
      () => import('@/components/elements/vfk-toggle/VfkToggle.vue'),
    ),
    variants: [
      { label: 'Off', props: { modelValue: false, label: 'Enable notifications' } },
      { label: 'On', props: { modelValue: true, label: 'Enable notifications' } },
      { label: 'Disabled Off', props: { modelValue: false, label: 'Unavailable option', disabled: true } },
      { label: 'Disabled On', props: { modelValue: true, label: 'Always active', disabled: true } },
      { label: 'No Label', props: { modelValue: false } },
    ],
  },
}

const componentName = computed(() => route.params.component as string)
const entry = computed(() => registry[componentName.value] ?? null)
</script>

<template>
  <div class="element-page">
    <h1 class="element-page__title">{{ componentName }}</h1>

    <template v-if="entry">
      <div
        v-for="variant in entry.variants"
        :key="variant.label"
        class="element-page__variant"
      >
        <span class="element-page__variant-label">{{ variant.label }}</span>
        <div class="element-page__preview">
          <component :is="entry.component" v-bind="variant.props" />
        </div>
      </div>
    </template>

    <p v-else class="element-page__placeholder">Component preview coming soon.</p>
  </div>
</template>

<style scoped>
.element-page {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.element-page__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  text-transform: capitalize;
  margin: 0;
}

.element-page__variant {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.element-page__variant-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.element-page__preview {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.element-page__placeholder {
  font-size: var(--font-size-md);
  color: var(--color-text-muted);
  margin: 0;
}
</style>
