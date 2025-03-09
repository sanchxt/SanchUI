# Input Component

A customizable and accessible input component for forms, supporting various styles, sizes, and addons.

## Features

- Fully accessible with proper ARIA attributes
- Supports multiple variants: `outline`, `filled`, `flushed`, and `unstyled`
- Adjustable sizes: `sm`, `md`, and `lg`
- Optional left and right addons (e.g., icons or buttons)
- Visual feedback for focus, hover, and error states
- Disabled and required states
- Responsive and flexible design

## Usage

```tsx
import { Input } from '@sanch-ui/core';

function MyComponent() {
  return <Input placeholder="Enter your text" />;
}
```

## Component

### Input

The main input component.

| **Prop**         | **Type**                                         | **Default** | **Description**                                             |
| ---------------- | ------------------------------------------------ | ----------- | ----------------------------------------------------------- |
| wrapperClassName | string                                           | undefined   | Additional CSS classes for the wrapper (if addons are used) |
| isInvalid        | boolean                                          | false       | Displays the input in an error state                        |
| leftAddon        | ReactNode                                        | undefined   | Content (e.g., icons) to display before the input           |
| rightAddon       | ReactNode                                        | undefined   | Content (e.g., icons) to display after the input            |
| inputSize        | 'sm' \| 'md' \| 'lg'                             | 'md'        | Size of the input                                           |
| variant          | 'outline' \| 'filled' \| 'flushed' \| 'unstyled' | 'outline'   | Visual style of the input                                   |
| type             | string                                           | 'text'      | HTML input type (e.g., 'text', 'password')                  |
| disabled         | boolean                                          | false       | Disables the input                                          |
| required         | boolean                                          | false       | Marks the input as required                                 |
| className        | string                                           | undefined   | Additional CSS classes for the input itself                 |
| ref              | React.Ref<HTMLInputElement>                      | undefined   | Reference to the input element                              |

## Accessibility

This input component adheres to WCAG guidelines:

- Uses semantic HTML (`<input>`) with appropriate `type` attributes
- Includes `aria-invalid` for error states
- Provides visible focus styles with `focus-visible:ring`
- Supports keyboard navigation
- Ensures disabled states are visually distinct and marked with `disabled` attribute
- Addons are wrapped in a container that respects the disabled state

## Examples

### Basic Input

```tsx
<Input placeholder="Enter your text" />
```

### With Error State

```tsx
<Input isInvalid placeholder="Invalid input" />
```

### With Addons

```tsx
import { SearchIcon } from 'lucide-react';

<Input
  leftAddon={<SearchIcon className="h-4 w-4" />}
  placeholder="Search..."
/>;
```

### Different Sizes

```tsx
<div className="space-y-4">
  <Input inputSize="sm" placeholder="Small input" />
  <Input inputSize="md" placeholder="Medium input" />
  <Input inputSize="lg" placeholder="Large input" />
</div>
```

### Variants

```tsx
<div className="space-y-4">
  <Input variant="outline" placeholder="Outline variant" />
  <Input variant="filled" placeholder="Filled variant" />
  <Input variant="flushed" placeholder="Flushed variant" />
  <Input variant="unstyled" placeholder="Unstyled variant" />
</div>
```

### With Left and Right Addons

```tsx
import { LockIcon, EyeIcon } from 'lucide-react';

<Input
  type="password"
  leftAddon={<LockIcon className="h-4 w-4" />}
  rightAddon={<EyeIcon className="h-4 w-4" />}
  placeholder="Enter password"
/>;
```

### Disabled Input

```tsx
<Input disabled placeholder="Disabled input" />
```

### Custom Styling

```tsx
<Input
  className="border-blue-500 focus-visible:ring-blue-500"
  wrapperClassName="bg-gray-100 rounded-lg"
  placeholder="Custom styled input"
/>
```

### With Addons and Error State

```tsx
import { MailIcon } from 'lucide-react';

<Input
  isInvalid
  leftAddon={<MailIcon className="h-4 w-4" />}
  placeholder="Invalid email"
/>;
```
