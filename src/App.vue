<script setup lang="ts">
import SiteNav from '@/components/layout/site-nav/SiteNav.vue'
</script>

<template>
  <div class="app-layout">
    <aside class="app-layout__sidebar">
      <SiteNav />
    </aside>
    <main class="app-layout__content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  --sidebar-width: 240px;
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-surface);
}

.app-layout__sidebar {
  border-right: 1px solid var(--color-border);
  background-color: var(--color-surface-raised);
  overflow: hidden;
}

.app-layout__content {
  overflow-y: auto;
}
</style>
