<script setup lang="ts">
/**
 * VfkStatusBadge — semantic status indicator built on VfkBadge.
 *
 * @prop {'submitted'|'pending'|'failed'} status - The semantic status to display.
 * @prop {string} [label] - Optional custom label; defaults to the status text.
 *
 * @example
 * <VfkStatusBadge status="submitted" />
 * <VfkStatusBadge status="failed" label="Failed on 2026-06-10" />
 */

import { computed } from 'vue'
import VfkBadge from '@/components/elements/vfk-badge/VfkBadge.vue'

interface Props {
  status: 'submitted' | 'pending' | 'failed'
  label?: string
}

const props = defineProps<Props>()

const statusConfig: Record<Props['status'], { label: string; variant: 'info' | 'warning' | 'danger' }> = {
  submitted: { label: 'Submitted', variant: 'info' },
  pending: { label: 'Pending', variant: 'warning' },
  failed: { label: 'Failed', variant: 'danger' },
}

const variant = computed(() => statusConfig[props.status].variant)
const displayLabel = computed(() => props.label ?? statusConfig[props.status].label)
</script>

<template>
  <VfkBadge :label="displayLabel" :variant="variant" />
</template>
