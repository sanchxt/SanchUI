# Skeleton Component

A customizable and accessible loading placeholder component designed to improve perceived performance and user experience during content loading.

## Features

- Multiple animation options (pulse, wave, shimmer)
- Customizable dimensions and shapes (rectangle, rounded, circle)
- Text skeleton variants for mimicking paragraph content
- Supports custom element types
- Translucent option for subtler loading states
- Fully accessible with proper ARIA attributes
- Dark mode compatible

## Usage

```tsx
import { Skeleton } from '@sanch-ui/core';

// Basic usage
<Skeleton width={200} height={20} />

// Circle variant (e.g., for avatar placeholders)
<Skeleton width={50} height={50} circle />

// Text placeholders
<Skeleton text textVariant="heading" />
<Skeleton text textVariant="body" />
<Skeleton text textVariant="caption" width="60%" />
```

## Component

### Skeleton

The main skeleton component for representing loading states.

| **Prop**    | **Type**                                           | **Default** | **Description**                              |
| ----------- | -------------------------------------------------- | ----------- | -------------------------------------------- |
| width       | string \| number                                   | undefined   | Width of the skeleton                        |
| height      | string \| number                                   | undefined   | Height of the skeleton                       |
| animation   | 'pulse' \| 'wave' \| 'none'                        | 'pulse'     | Animation type to display                    |
| circle      | boolean                                            | false       | Whether to make the skeleton a circle        |
| radius      | 'none' \| 'sm' \| 'md' \| 'lg' \| 'full' \| string | 'md'        | Border radius of the skeleton                |
| translucent | boolean                                            | false       | Makes the skeleton slightly see-through      |
| shimmer     | boolean                                            | false       | Shows a shimmer effect (overrides animation) |
| as          | React.ElementType                                  | 'div'       | Element to render as                         |
| text        | boolean                                            | false       | Styles for text placeholder skeletons        |
| textVariant | 'heading' \| 'body' \| 'caption'                   | 'body'      | Text style variant                           |
| className   | string                                             | undefined   | Additional CSS classes                       |
| style       | React.CSSProperties                                | undefined   | Additional inline styles                     |

All other standard HTML attributes for divs can also be passed as props.

## Accessibility

This component follows accessibility best practices:

- Uses `aria-hidden="true"` to prevent screen readers from announcing these placeholder elements
- Maintains sufficient color contrast even in the translucent variant
- Does not rely solely on animation to convey meaning

## Examples

### Basic Rectangle Skeleton

```tsx
<Skeleton width={200} height={24} />
```

### Circle Skeleton (for Avatars)

```tsx
<Skeleton width={40} height={40} circle />
```

### Text Content Skeletons

```tsx
<div className="space-y-2">
  <Skeleton text textVariant="heading" />
  <Skeleton text textVariant="body" />
  <Skeleton text textVariant="body" />
  <Skeleton text textVariant="body" width="90%" />
  <Skeleton text textVariant="caption" width="40%" />
</div>
```

### Card Loading Skeleton

```tsx
<div className="border rounded-lg overflow-hidden">
  <Skeleton width="100%" height={200} radius="none" />
  <div className="p-4 space-y-4">
    <Skeleton width="70%" height={24} />
    <div className="space-y-2">
      <Skeleton width="100%" height={16} />
      <Skeleton width="90%" height={16} />
      <Skeleton width="95%" height={16} />
    </div>
    <div className="flex gap-2 pt-2">
      <Skeleton width={80} height={32} radius="full" />
      <Skeleton width={100} height={32} radius="full" />
    </div>
  </div>
</div>
```

### Avatar and Text Combination

```tsx
<div className="flex items-center gap-4">
  <Skeleton width={64} height={64} circle />
  <div className="space-y-2">
    <Skeleton width={150} height={20} />
    <Skeleton width={100} height={16} />
  </div>
</div>
```

### Different Animation Types

```tsx
<div className="space-y-4">
  <Skeleton width={200} height={20} animation="pulse" />
  <Skeleton width={200} height={20} animation="wave" />
  <Skeleton width={200} height={20} shimmer />
  <Skeleton width={200} height={20} animation="none" />
</div>
```

### Translucent Variant

```tsx
<Skeleton width="100%" height={100} translucent />
```

## CSS Requirements

For the wave and shimmer animations to work, you need to include the following CSS in your project:

```css
@keyframes skeleton-wave {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton-wave {
  background: linear-gradient(
    90deg,
    var(--color-muted) 25%,
    var(--color-muted-foreground) 37%,
    var(--color-muted) 63%
  );
  background-size: 200px 100%;
  animation: skeleton-wave 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton-shimmer {
  background: linear-gradient(
    110deg,
    var(--color-muted) 8%,
    var(--color-secondary) 18%,
    var(--color-muted) 33%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s linear infinite;
}

.skeleton-text {
  border-radius: var(--radius-sm, 0.125rem);
}
```

## Behavior Notes

- Numbers provided for width and height are automatically converted to pixel values
- When using `text={true}`, default dimensions are provided based on the `textVariant`
- The `circle` prop takes precedence over the `radius` prop
- The `shimmer` prop takes precedence over the `animation` prop
