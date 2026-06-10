<script setup lang="ts">
/**
 * FragmentPage
 *
 * Renders a live preview of a fragment-tier component.
 * Reads the `:component` route param, looks it up in the registry,
 * and renders each registered variant. Falls back to a placeholder
 * when no component is registered yet.
 *
 * @param component - route param; the fragment component name to preview
 */
import { computed, defineAsyncComponent, h, type VNode } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface Variant {
  label: string
  /** Props spread onto the registry component via v-bind. */
  props?: Record<string, unknown>
  /** For slot-based components: returns the fully rendered preview VNode. */
  render?: () => VNode
}

interface RegistryEntry {
  component: ReturnType<typeof defineAsyncComponent>
  variants: Variant[]
}

const VfkCard = defineAsyncComponent(
  () => import('@/components/fragments/vfk-card/VfkCard.vue'),
)
const VfkButton = defineAsyncComponent(
  () => import('@/components/elements/vfk-button/VfkButton.vue'),
)

const registry: Record<string, RegistryEntry> = {
  alert: {
    component: defineAsyncComponent(
      () => import('@/components/fragments/vfk-alert/VfkAlert.vue'),
    ),
    variants: [
      { label: 'Info', props: { message: 'A new version of vfk-ui is available.', variant: 'info' } },
      { label: 'Success', props: { message: 'Your changes have been saved.', variant: 'success' } },
      { label: 'Warning', props: { message: 'Your session will expire in 5 minutes.', variant: 'warning' } },
      { label: 'Danger', props: { message: 'Unable to save changes. Please try again.', variant: 'danger' } },
      { label: 'Dismissible', props: { message: 'This alert can be dismissed.', variant: 'info', dismissible: true } },
    ],
  },
  card: {
    component: VfkCard,
    variants: [
      {
        label: 'Default',
        render: () =>
          h(VfkCard, null, {
            default: () => 'vfk-ui is a Vue 3 component library built with Vite, TypeScript, and Storybook.',
          }),
      },
      {
        label: 'With Header and Footer',
        render: () =>
          h(VfkCard, null, {
            header: () => 'Project Alpha',
            default: () => 'The quarterly report is ready for review.',
            footer: () => h(VfkButton, { label: 'Open report' }),
          }),
      },
      {
        label: 'Interactive',
        render: () =>
          h(VfkCard, { variant: 'interactive' }, {
            header: () => 'Project Alpha',
            default: () => 'Click anywhere on this card to open the project.',
          }),
      },
    ],
  },
  notification: {
    component: defineAsyncComponent(
      () => import('@/components/fragments/vfk-notification/VfkNotification.vue'),
    ),
    variants: [
      {
        label: 'Info',
        props: {
          title: 'New version available',
          description: 'vfk-ui 1.2.0 has been published. Update your dependencies to get the latest components.',
          variant: 'info',
        },
      },
      {
        label: 'Success',
        props: {
          title: 'Export complete',
          description: 'Your report has been generated and is ready to download.',
          variant: 'success',
        },
      },
      {
        label: 'Warning',
        props: {
          title: 'Session expiring',
          description: 'Your session will expire in 5 minutes. Save your work to avoid losing changes.',
          variant: 'warning',
        },
      },
      {
        label: 'Danger',
        props: {
          title: 'Upload failed',
          description: 'The file could not be uploaded. Please check your connection and try again.',
          variant: 'danger',
        },
      },
    ],
  },
}

const componentName = computed(() => route.params.component as string)
const entry = computed(() => registry[componentName.value] ?? null)
</script>

<template>
  <div class="fragment-page">
    <h1 class="fragment-page__title">{{ componentName }}</h1>

    <template v-if="entry">
      <div
        v-for="variant in entry.variants"
        :key="variant.label"
        class="fragment-page__variant"
      >
        <span class="fragment-page__variant-label">{{ variant.label }}</span>
        <div class="fragment-page__preview">
          <component :is="variant.render" v-if="variant.render" />
          <component :is="entry.component" v-else v-bind="variant.props" />
        </div>
      </div>
    </template>

    <p v-else class="fragment-page__placeholder">Component preview coming soon.</p>
  </div>
</template>

<style scoped>
.fragment-page {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.fragment-page__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  text-transform: capitalize;
  margin: 0;
}

.fragment-page__variant {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.fragment-page__variant-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.fragment-page__preview {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg);
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.fragment-page__placeholder {
  font-size: var(--font-size-md);
  color: var(--color-text-muted);
  margin: 0;
}
</style>
