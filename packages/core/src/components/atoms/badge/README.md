# Badge Component

A versatile Badge component for displaying status indicators, counts, labels, or tags with support for various styles, sizes, and visual indicators.

## Features

- Multiple visual variants (default, primary, secondary, success, warning, error, info)
- Three size options: small, medium, large
- Support for both rounded and pill shapes
- Filled and outline styles
- Optional status dot indicator with customizable color
- Fully customizable with additional CSS classes
- Accessible with proper semantic markup
- Dark mode support

## Usage

```tsx
import { Badge } from '@sanch-ui/core';

function MyComponent() {
  return (
    <div>
      <h2>
        User Status <Badge variant="success">Active</Badge>
      </h2>
      <button>
        Notifications{' '}
        <Badge variant="error" pill>
          3
        </Badge>
      </button>
    </div>
  );
}
```

## Component

### Badge

The main Badge component for displaying short statuses, counts, or labels.

| **Prop**  | **Type**                                                                             | **Default** | **Description**                                        |
| --------- | ------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------ |
| children  | React.ReactNode                                                                      | -           | Content to display inside the badge                    |
| variant   | 'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info' | 'default'   | Visual style variant of the badge                      |
| size      | 'sm' \| 'md' \| 'lg'                                                                 | 'md'        | Size of the badge                                      |
| pill      | boolean                                                                              | false       | Whether to use rounded-full (pill) style               |
| outline   | boolean                                                                              | false       | Makes the badge use an outline style instead of filled |
| withDot   | boolean                                                                              | false       | Show dot indicator before badge content                |
| dotColor  | string                                                                               | -           | Badge dot color (uses the variant color by default)    |
| className | string                                                                               | -           | Additional CSS classes                                 |

## Accessibility

The Badge component follows accessibility best practices:

- Uses semantic HTML elements (`<span>`)
- Maintains proper color contrast ratios for all variants
- Has appropriate text sizing for readability
- Supports keyboard focus styles when used in interactive contexts

## Examples

### Basic Badge

```tsx
<Badge>Default</Badge>
```

### Variants

```tsx
<div className="flex gap-2">
  <Badge variant="default">Default</Badge>
  <Badge variant="primary">Primary</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="error">Error</Badge>
  <Badge variant="info">Info</Badge>
</div>
```

### Sizes

```tsx
<div className="flex gap-2 items-center">
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
  <Badge size="lg">Large</Badge>
</div>
```

### Pill Shape

```tsx
<Badge pill>Pill Badge</Badge>
```

### Outline Style

```tsx
<div className="flex gap-2">
  <Badge outline>Default</Badge>
  <Badge outline variant="primary">
    Primary
  </Badge>
  <Badge outline variant="success">
    Success
  </Badge>
</div>
```

### With Status Dot

```tsx
<div className="flex gap-2">
  <Badge withDot variant="success">
    Online
  </Badge>
  <Badge withDot variant="error">
    Offline
  </Badge>
  <Badge withDot dotColor="bg-purple-500">
    Custom
  </Badge>
</div>
```

### Combined Features

```tsx
<Badge pill outline variant="primary" withDot size="lg">
  New Feature
</Badge>
```

## Common Use Cases

### Status Indicators

```tsx
<Badge variant="success" withDot>Active</Badge>
<Badge variant="warning" withDot>Pending</Badge>
<Badge variant="error" withDot>Failed</Badge>
<Badge variant="info" withDot>Processing</Badge>
```

### Counters

```tsx
<button className="relative">
  Notifications
  <Badge variant="error" pill className="absolute -top-2 -right-2">
    3
  </Badge>
</button>
```

### Tags/Labels

```tsx
<div className="flex gap-2">
  <Badge pill outline variant="info">
    Beta
  </Badge>
  <Badge pill outline variant="success">
    New
  </Badge>
  <Badge pill outline variant="warning">
    Coming Soon
  </Badge>
</div>
```

### Custom Styling

```tsx
<Badge
  variant="primary"
  className="shadow-md hover:bg-primary-600 transition-colors"
>
  Customized
</Badge>
```

## Behavior Notes

- The Badge component is designed to be non-interactive by default, but can be used within interactive elements.
- When used with dynamic content (like counters), the Badge will automatically adapt to the content size.
- For very small badges with minimal content, the pill style (rounded-full) is recommended for better aesthetics.
- When using the `withDot` prop, the dot color will automatically match the variant color unless explicitly overridden with `dotColor`.
