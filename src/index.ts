// Public library entry point — barrel export for consumers installing vfk-ui
// as a package dependency. `SiteNav` and other demo-site-only components are
// intentionally excluded; they are internal to this repo's component browser.

// Design tokens + reset, bundled into the emitted style.css so consumers only
// need one `import 'vfk-ui/style.css'`. Fonts are NOT bundled here — inlining
// @fontsource into this CSS balloons it to >1MB of base64. Consumers load
// IBM Plex Sans/Mono themselves (see README "Library usage").
import './styles/global.css'

// Elements
export { default as VfkBadge } from '@/components/elements/vfk-badge/VfkBadge.vue'
export { default as VfkButton } from '@/components/elements/vfk-button/VfkButton.vue'
export { default as VfkDatePicker } from '@/components/elements/vfk-date-picker/VfkDatePicker.vue'
export { default as VfkTextfield } from '@/components/elements/vfk-textfield/VfkTextfield.vue'
export { default as VfkToggle } from '@/components/elements/vfk-toggle/VfkToggle.vue'

// Fragments
export { default as VfkAlert } from '@/components/fragments/vfk-alert/VfkAlert.vue'
export { default as VfkCard } from '@/components/fragments/vfk-card/VfkCard.vue'
export { default as VfkDataTable } from '@/components/fragments/vfk-data-table/VfkDataTable.vue'
export { default as VfkMetricsCard } from '@/components/fragments/vfk-metrics-card/VfkMetricsCard.vue'
export { default as VfkNotification } from '@/components/fragments/vfk-notification/VfkNotification.vue'
export { default as VfkStatusBadge } from '@/components/fragments/vfk-status-badge/VfkStatusBadge.vue'
