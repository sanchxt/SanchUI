## Component

### Select

The main select component.

| **Prop**         | **Type**                                         | **Default** | **Description**                                                   |
| ---------------- | ------------------------------------------------ | ----------- | ----------------------------------------------------------------- |
| options          | SelectOption[]                                   | []          | Predefined options for the select (`{ value, label, disabled? }`) |
| wrapperClassName | string                                           | undefined   | Additional CSS classes for the wrapper (if addons are used)       |
| isInvalid        | boolean                                          | false       | Displays the select in an error state                             |
| leftAddon        | ReactNode                                        | undefined   | Content (e.g., icons) to display before the select                |
| rightAddon       | ReactNode                                        | undefined   | Content (e.g., icons) to display after the select                 |
| selectSize       | 'sm' \| 'md' \| 'lg'                             | 'md'        | Size of the select                                                |
| variant          | 'outline' \| 'filled' \| 'flushed' \| 'unstyled' | 'outline'   | Visual style of the select                                        |
| chevronIcon      | ReactNode                                        | undefined   | Custom icon for the dropdown indicator                            |
| disabled         | boolean                                          | false       | Disables the select                                               |
| required         | boolean                                          | false       | Marks the select as required                                      |
| className        | string                                           | undefined   | Additional CSS classes for the select itself                      |
| ref              | React.Ref<HTMLSelectElement>                     | undefined   | Reference to the select element                                   |

## Accessibility

This select component adheres to WCAG guidelines:

- Uses semantic HTML (`<select>` and `<option>`) with appropriate attributes
- Includes `aria-invalid` for error states
- Provides visible focus styles with `focus-visible:ring`
- Supports keyboard navigation
- Ensures disabled states are visually distinct and marked with `disabled` attribute
- Dropdown indicator is decorative and hidden from screen readers

## Examples

### Basic Select

```tsx
<Select>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</Select>
```

### With Predefined Options

```tsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
];

<Select options={options} />;
```

### With Error State

```tsx
<Select isInvalid>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>
```

### With Addons

```tsx
import { SearchIcon } from 'lucide-react';

<Select leftAddon={<SearchIcon className="h-4 w-4" />}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>;
```

### Different Sizes

```tsx
<div className="space-y-4">
  <Select selectSize="sm">
    <option value="option1">Option 1</option>
  </Select>
  <Select selectSize="md">
    <option value="option1">Option 1</option>
  </Select>
  <Select selectSize="lg">
    <option value="option1">Option 1</option>
  </Select>
</div>
```

### Variants

```tsx
<div className="space-y-4">
  <Select variant="outline">
    <option value="option1">Option 1</option>
  </Select>
  <Select variant="filled">
    <option value="option1">Option 1</option>
  </Select>
  <Select variant="flushed">
    <option value="option1">Option 1</option>
  </Select>
  <Select variant="unstyled">
    <option value="option1">Option 1</option>
  </Select>
</div>
```

### With Custom Chevron Icon

```tsx
import { ChevronDown } from 'lucide-react';

<Select chevronIcon={<ChevronDown className="h-4 w-4" />}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>;
```

### Disabled Select

```tsx
<Select disabled>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>
```

### Custom Styling

```tsx
<Select
  className="border-green-500 focus-visible:ring-green-500"
  wrapperClassName="bg-gray-100 rounded-lg"
>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>
```

---

## README for Switch Component

# Switch Component

A customizable and accessible toggle switch component for enabling or disabling options, with support for labels, sizes, and color variants.

## Features

- Fully accessible with proper ARIA attributes
- Supports multiple sizes: `sm`, `md`, and `lg`
- Adjustable label position (`left` or `right`)
- Color variants: `default`, `primary`, `success`, and `destructive`
- Visual feedback for focus and checked states
- Disabled state with reduced opacity
- Smooth transition animations

## Usage

```tsx
import { Switch } from '@sanch-ui/core';

function MyComponent() {
  return <Switch />;
}
```
