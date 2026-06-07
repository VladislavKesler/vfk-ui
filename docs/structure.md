# Component Catalog

Reference catalog for vfk-ui components.
Adapt component names and folder paths to vfk-ui conventions when building Vue 3 equivalents.
Folder structure for vfk-ui: `src/components/elements/` · `fragments/` · `layout/`

---

## Elements (`src/components/elements/`)

Atomic UI components. Each has a single file and its own styles.

| Component | Description |
|-----------|-------------|
| badge | Small label for status or count |
| button | Clickable button with screen/print variants |
| card | Card container for structured content |
| chart | Chart display for metrics/measurements |
| checkbox | Checkbox input for boolean selection |
| date-picker | Date selection with calendar UI |
| divider | Horizontal rule for visual separation |
| editor | Rich-text editor area |
| form-field | Wrapper for form fields including label and status |
| form-send-indicator | Display for send or loading state in forms |
| grid | Grid layout for content and columns |
| headline | Heading component with variants |
| icon | Icon rendering for UI symbols |
| link | Link component for navigation |
| list | List container |
| list-item | Entry within a list |
| load-indicator | Loading spinner |
| logo | Logo display |
| picture | Image component with responsive sources |
| rich-text | Formatted text area |
| select | Select input with screen/print variants |
| textarea | Multi-line text input field |
| textfield | Single-line text input field |
| timer-button | Button with countdown/time control |
| toggle | Toggle switch for on/off state |
| tooltip | Tooltip for contextual information |

---

## Fragments (`src/components/fragments/`)

Composed UI fragments — combine multiple elements into a single unit.

| Component | Description |
|-----------|-------------|
| alert | Alert message with variants (info, warning, error, success) |
| headline-text | Headline + body text combined in one fragment |
| metrics | Key metrics block for dashboards |
| notification | Single notification unit |
| notification-container | Container for multiple stacked notifications |
| progress-bar | Progress indicator |
| segment-control | Segmented button group |
| sub-navigation-card | Card for sub-navigation links |
| teaser-card-contact | Teaser card with contact information |
| teaser-card-icon | Teaser card with icon |
| teaser-card-image-full | Teaser card with full-bleed image |
| teaser-card-image-text | Teaser card with image and text |
| teaser-card-text-only | Teaser card with text only |

---

## Layout (`src/components/layout/`)

Structural components for page composition and navigation.

| Component | Description |
|-----------|-------------|
| grid-structure | Grid layout structure for pages |
| page-breadcrumb | Breadcrumb navigation |
| page-burger-button | Burger button for menus |
| page-dialog | Dialog container for overlays/modals |
| page-footer | Footer layout |
| page-header | Header layout |
| page-menu | Side menu container |
| page-menu-list | List container within the side menu |
| page-menu-list-item | Menu list entry |
| page-menu-overlay | Overlay for mobile menu |
| page-module | Layout wrapper for content modules |

---

## Modules (`src/components/modules/`)

Content-section modules — compose fragments and elements into page sections.

| Component | Description |
|-----------|-------------|
| module-content | Content module for page areas |
| module-teasers | Module for teaser lists |

---

## Page Modules (`src/components/page-modules/`)

Higher-level page sections combining multiple modules.

| Component | Description |
|-----------|-------------|
| page-module-content | Page module for content blocks |
| page-module-headline-text | Page module for headline + text |
| page-module-quick-access | Page module for quick-access links |
| page-module-teasers | Page module for teaser blocks |
