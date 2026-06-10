<script setup lang="ts">
/**
 * VfkStatusBadge — semantic status indicator built on VfkBadge.
 *
 * @prop {'eingereicht'|'ausstehend'|'fehlgeschlagen'} status - The semantic status to display.
 * @prop {string} [label] - Optional custom label; defaults to the German status text.
 *
 * @example
 * <VfkStatusBadge status="eingereicht" />
 * <VfkStatusBadge status="fehlgeschlagen" label="Fehlgeschlagen am 10.06.2026" />
 */

import { computed } from 'vue'
import VfkBadge from '@/components/elements/vfk-badge/VfkBadge.vue'

interface Props {
  status: 'eingereicht' | 'ausstehend' | 'fehlgeschlagen'
  label?: string
}

const props = defineProps<Props>()

const statusConfig: Record<Props['status'], { label: string; variant: 'info' | 'warning' | 'danger' }> = {
  eingereicht: { label: 'Eingereicht', variant: 'info' },
  ausstehend: { label: 'Ausstehend', variant: 'warning' },
  fehlgeschlagen: { label: 'Fehlgeschlagen', variant: 'danger' },
}

const variant = computed(() => statusConfig[props.status].variant)
const displayLabel = computed(() => props.label ?? statusConfig[props.status].label)
</script>

<template>
  <VfkBadge :label="displayLabel" :variant="variant" />
</template>
