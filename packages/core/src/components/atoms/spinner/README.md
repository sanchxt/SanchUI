# Spinner Component

A customizable and accessible spinner component for indicating loading states, with multiple variants, sizes, and color options.

## Features

- Three visual variants: `border` (rotating circle), `dots` (bouncing dots), and `grow` (pulsing circle)
- Adjustable sizes: `xs`, `sm`, `md`, `lg`, and `xl`
- Color schemes: `primary`, `secondary`, `accent`, `destructive`, `success`, and `muted`
- Optional inline mode for seamless integration in text or layouts
- Fully accessible with ARIA attributes and screen reader support
- Smooth animations for each variant
- Flexible styling with custom class names

## Usage

```tsx
import { Spinner } from '@sanch-ui/core';

function MyComponent() {
  return <Spinner />;
}
```

## Component

### Spinner

The main spinner component.

| **Prop**  | **Type**                                                                      | **Default** | **Description**                                  |
| --------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------------------------ |
| size      | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'                                          | 'md'        | Size of the spinner                              |
| variant   | 'border' \| 'dots' \| 'grow'                                                  | 'border'    | Visual style of the spinner                      |
| color     | 'primary' \| 'secondary' \| 'accent' \| 'destructive' \| 'success' \| 'muted' | 'primary'   | Color scheme of the spinner                      |
| inline    | boolean                                                                       | false       | Removes margins for inline use                   |
| label     | string                                                                        | 'Loading'   | Accessible label for screen readers              |
| className | string                                                                        | undefined   | Additional CSS classes for the spinner container |

## Accessibility

This spinner component adheres to WCAG guidelines:

- Uses `role="status"` to indicate a loading state
- Includes `aria-label` for screen reader announcements
- Provides a visually hidden `<span>` with the label for screen readers
- Ensures animations are smooth and not overly distracting
- Maintains sufficient color contrast through utility classes

## Examples

### Basic Spinner

```tsx
<Spinner />
```

### Different Sizes

```tsx
<div className="flex gap-4">
  <Spinner size="xs" />
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</div>
```

### Variants

```tsx
<div className="flex gap-4">
  <Spinner variant="border" />
  <Spinner variant="dots" />
  <Spinner variant="grow" />
</div>
```

### Colored Spinners

```tsx
<div className="flex gap-4">
  <Spinner color="primary" />
  <Spinner color="secondary" />
  <Spinner color="accent" />
  <Spinner color="destructive" />
  <Spinner color="success" />
  <Spinner color="muted" />
</div>
```

### Inline Spinner

```tsx
<p>
  Loading <Spinner inline size="sm" /> your content...
</p>
```

### Dots Variant with Custom Color

```tsx
<Spinner variant="dots" color="success" size="lg" />
```

### Grow Variant with Custom Size

```tsx
<Spinner variant="grow" size="xl" color="accent" />
```

### Custom Styling

```tsx
<Spinner variant="border" size="md" color="primary" className="border-dashed" />
```

### With Custom Label

```tsx
<Spinner label="Fetching data" variant="dots" />
```

## Variant Details

- **Border**: A circular spinner with a rotating border, using a transparent top border for the animation effect.
- **Dots**: Three bouncing dots with staggered animation delays (0ms, 150ms, 300ms) for a dynamic effect.
- **Grow**: A single circle that pulses by scaling and changing opacity, defined by a custom `@keyframes` animation.

## Notes

- The `inline` prop removes default margins, making the spinner suitable for use within text or tight layouts.
- The `grow` variant uses an inline `<style>` tag to define its custom animation, ensuring encapsulation.
- All variants use Tailwind-compatible utility classes for styling, assuming integration with a Tailwind CSS setup (via the `cn` utility).
