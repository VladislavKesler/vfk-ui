<script setup lang="ts">
/**
 * SiteNav — grouped sidebar navigation for the vfk-ui component demo site.
 *
 * Renders three labelled groups (Elements, Fragments, Layout), each containing
 * RouterLinks to the corresponding demo route. The active link is styled via
 * .router-link-active. The nav is scrollable when content overflows.
 *
 * No props. No emits.
 *
 * @example
 * <SiteNav />
 */

const groups = [
  {
    id: 'elements',
    label: 'Elements',
    basePath: '/elements',
    items: [
      'badge',
      'button',
      'card',
      'chart',
      'checkbox',
      'date-picker',
      'divider',
      'editor',
      'form-field',
      'form-send-indicator',
      'grid',
      'headline',
      'icon',
      'link',
      'list',
      'list-item',
      'load-indicator',
      'logo',
      'picture',
      'rich-text',
      'select',
      'textarea',
      'textfield',
      'timer-button',
      'toggle',
      'tooltip',
    ],
  },
  {
    id: 'fragments',
    label: 'Fragments',
    basePath: '/fragments',
    items: [
      'alert',
      'card',
      'headline-text',
      'metrics',
      'notification',
      'notification-container',
      'progress-bar',
      'segment-control',
      'sub-navigation-card',
      'teaser-card-contact',
      'teaser-card-icon',
      'teaser-card-image-full',
      'teaser-card-image-text',
      'teaser-card-text-only',
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    basePath: '/layout',
    items: [
      'grid-structure',
      'page-breadcrumb',
      'page-burger-button',
      'page-dialog',
      'page-footer',
      'page-header',
      'page-menu',
      'page-menu-list',
      'page-menu-list-item',
      'page-menu-overlay',
      'page-module',
    ],
  },
]
</script>

<template>
  <nav role="navigation" aria-label="Component navigation" class="site-nav">
    <section
      v-for="group in groups"
      :key="group.id"
      :aria-labelledby="`site-nav-heading-${group.id}`"
      class="site-nav__group"
    >
      <h2
        :id="`site-nav-heading-${group.id}`"
        class="site-nav__group-heading"
      >
        {{ group.label }}
      </h2>
      <ul class="site-nav__list" role="list">
        <li v-for="item in group.items" :key="item" class="site-nav__list-item">
          <RouterLink
            :to="`${group.basePath}/${item}`"
            class="site-nav__link"
          >
            {{ item }}
          </RouterLink>
        </li>
      </ul>
    </section>
  </nav>
</template>

<style scoped>
.site-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-md);
  overflow-y: auto;
  height: 100%;
  font-family: var(--font-family-base);
}

.site-nav__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.site-nav__group-heading {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: var(--space-xs) var(--space-sm);
  margin: 0;
}

.site-nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.site-nav__link {
  display: block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm, 4px);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text);
  text-decoration: none;
  line-height: var(--line-height-normal);
  transition: background-color 150ms var(--ease-in-out, ease-in-out),
    color 150ms var(--ease-in-out, ease-in-out);
}

.site-nav__link:hover {
  background-color: var(--color-surface-overlay);
  color: var(--color-text);
}

.site-nav__link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.site-nav__link.router-link-active {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}
</style>
