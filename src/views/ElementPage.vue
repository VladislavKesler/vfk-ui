/**
 * ElementPage
 *
 * Displays a placeholder page for an element-tier component.
 * Reads the `:component` route param and renders its name as a heading.
 *
 * @param component - route param; the element component name to preview
 */
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="page">
    <h1 class="page__title">{{ route.params.component }}</h1>
    <p class="page__subtitle">Component preview coming soon.</p>
  </div>
</template>

<style scoped>
.page {
  padding: var(--space-8);
}

.page__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  text-transform: capitalize;
}

.page__subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}
</style>
