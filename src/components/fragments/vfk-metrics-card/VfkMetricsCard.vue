<script setup lang="ts">
/**
 * VfkMetricsCard — KPI display card showing a label, a prominent value,
 * and an optional delta/trend indicator. Built on VfkCard and VfkBadge.
 *
 * @prop {string} label - The metric name (e.g. "Active Users").
 * @prop {string|number} value - The metric value (e.g. "1,284" or 1284).
 * @prop {string} [delta] - Optional change text (e.g. "+12.5%"). Omit to hide the indicator.
 * @prop {'up'|'down'|'neutral'} [trend='neutral'] - Direction of the change; controls the
 * indicator color and arrow.
 *
 * @example
 * <VfkMetricsCard label="Active Users" value="1,284" delta="+12.5%" trend="up" />
 * <VfkMetricsCard label="Churn Rate" value="2.4%" delta="-0.6%" trend="down" />
 * <VfkMetricsCard label="Open Tickets" value="42" />
 */

import { computed } from 'vue'
import VfkCard from '@/components/fragments/vfk-card/VfkCard.vue'
import VfkBadge from '@/components/elements/vfk-badge/VfkBadge.vue'

interface Props {
  label: string
  value: string | number
  delta?: string
  trend?: 'up' | 'down' | 'neutral'
}

const props = withDefaults(defineProps<Props>(), {
  trend: 'neutral',
})

const trendConfig: Record<NonNullable<Props['trend']>, { variant: 'success' | 'danger' | 'neutral'; arrow: string }> = {
  up: { variant: 'success', arrow: '▲' },
  down: { variant: 'danger', arrow: '▼' },
  neutral: { variant: 'neutral', arrow: '' },
}

const trendVariant = computed(() => trendConfig[props.trend].variant)
const deltaLabel = computed(() => [trendConfig[props.trend].arrow, props.delta].filter(Boolean).join(' '))
</script>

<template>
  <VfkCard class="vfk-metrics-card">
    <span class="vfk-metrics-card__label">{{ label }}</span>
    <div class="vfk-metrics-card__row">
      <span class="vfk-metrics-card__value">{{ value }}</span>
      <VfkBadge
        v-if="delta"
        class="vfk-metrics-card__delta"
        :label="deltaLabel"
        :variant="trendVariant"
      />
    </div>
  </VfkCard>
</template>

<style scoped>
.vfk-metrics-card__label {
  display: block;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
}

.vfk-metrics-card__row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.vfk-metrics-card__value {
  font-family: var(--font-family-base);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text);
}
</style>
