# Divider Component

A versatile and customizable divider component for visually separating content sections with support for horizontal and vertical orientations, labels, and various styling options.

## Features

- Configurable orientation (horizontal or vertical)
- Multiple thickness and style variants
- Optional label with alignment control
- Decorative gradient effect
- Fully customizable with theming support
- Accessible with proper ARIA attributes
- Dark mode compatible

## Usage

```tsx
import { Divider } from '@sanch-ui/core';

function MyComponent() {
  return (
    <div>
      <h2>Section Title</h2>
      <Divider />
      <p>Content goes here...</p>

      {/* With label */}
      <Divider label="New Section" />
      <p>More content goes here...</p>
    </div>
  );
}
```

## Component

### Divider

The main divider component for separating content.

| **Prop**       | **Type**                        | **Default**  | **Description**                      |
| -------------- | ------------------------------- | ------------ | ------------------------------------ |
| orientation    | 'horizontal' \| 'vertical'      | 'horizontal' | Direction of the divider             |
| thickness      | 'thin' \| 'regular' \| 'thick'  | 'regular'    | Thickness of the divider line        |
| variant        | 'solid' \| 'dashed' \| 'dotted' | 'solid'      | Visual style of the divider line     |
| color          | string                          | undefined    | Custom color for the divider         |
| label          | ReactNode                       | undefined    | Content to display in the middle     |
| labelAlignment | 'start' \| 'center' \| 'end'    | 'center'     | Alignment of the label               |
| decorative     | boolean                         | false        | Apply a gradient effect              |
| withMargin     | boolean                         | false        | Add spacing around the divider       |
| className      | string                          | ''           | Additional CSS classes for container |
| labelClassName | string                          | ''           | Additional CSS classes for label     |
| role           | string                          | 'separator'  | ARIA role for accessibility          |

## Accessibility

This divider component follows accessibility best practices:

- Uses proper semantic HTML with the `role="separator"` attribute
- Includes appropriate `aria-orientation` for screen readers
- Provides adequate color contrast following WCAG guidelines
- Maintains semantic structure when labels are present
- Follows accessible spacing and visibility standards

## Examples

### Basic Divider

```tsx
<Divider />
```

### With Different Thickness

```tsx
<Divider thickness="thin" />
<Divider thickness="regular" />
<Divider thickness="thick" />
```

### With Different Variants

```tsx
<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />
```

### Vertical Divider

```tsx
<div className="flex h-20">
  <div>Left content</div>
  <Divider orientation="vertical" />
  <div>Right content</div>
</div>
```

### With Label

```tsx
<Divider label="Section Title" />
```

### With Custom Label Alignment

```tsx
<Divider label="Start Aligned" labelAlignment="start" />
<Divider label="End Aligned" labelAlignment="end" />
```

### Decorative Divider

```tsx
<Divider decorative />
```

### With Label and Decorative Style

```tsx
<Divider decorative label="Featured Content" />
```

### With Custom Styling

```tsx
<Divider
  className="my-8"
  labelClassName="font-bold text-primary"
  label="Important Section"
/>
```

### In a Card Layout

```tsx
<div className="border rounded-lg p-4">
  <h3 className="text-lg font-medium">Card Title</h3>
  <Divider className="my-4" />
  <p>Card content goes here...</p>
</div>
```

### Timeline Pattern

```tsx
<div className="relative pl-10">
  <div className="relative mb-10">
    <div className="absolute -left-10">
      <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
        1
      </div>
    </div>
    <div>
      <h3>Step One</h3>
      <p>Complete this step</p>
    </div>
    <div className="absolute -left-6 top-8 h-full">
      <Divider orientation="vertical" thickness="thin" className="h-full" />
    </div>
  </div>

  {/* Additional steps follow the same pattern */}
</div>
```

## Design Notes

- The divider automatically adapts to dark mode when used within a `.dark` container
- For vertical dividers, ensure the parent has an appropriate height set
- Label feature only works with horizontal dividers
- When using custom colors, consider maintaining adequate contrast with surrounding content
- The decorative variant uses a gradient effect for a more subtle appearance
