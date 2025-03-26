# Label Component

A flexible and accessible label component designed for form elements, with support for different sizes, variants, and required indicators.

## Features

- Multiple variants: default, secondary, destructive, success, and muted
- Three size options: small, medium, and large
- Required field indicator with customizable content
- Screen reader only mode for improved accessibility
- Peer styling support for disabled states

## Usage

```tsx
import { Label } from '@sanch-ui/core';

function MyForm() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email" required>
        Email address
      </Label>
      <input id="email" type="email" />
    </div>
  );
}
```

## Props

| Prop              | Type                                                              | Default    | Description                                                   |
| ----------------- | ----------------------------------------------------------------- | ---------- | ------------------------------------------------------------- |
| variant           | 'default' \| 'secondary' \| 'destructive' \| 'success' \| 'muted' | 'default'  | The visual style of the label                                 |
| required          | boolean                                                           | false      | Whether to display a required field indicator                 |
| requiredIndicator | React.ReactNode                                                   | '\*'       | Custom content for the required indicator                     |
| srOnly            | boolean                                                           | false      | Visually hide label but keep it accessible for screen readers |
| size              | 'sm' \| 'md' \| 'lg'                                              | 'md'       | The size of the label text                                    |
| className         | string                                                            | ''         | Additional CSS classes                                        |
| children          | React.ReactNode                                                   | (required) | The label content                                             |
| ref               | React.Ref<HTMLLabelElement>                                       | -          | Ref to the underlying label element                           |

Plus all standard HTML label attributes.

## Examples

### Basic Label

```tsx
<Label htmlFor="name">Full Name</Label>
<input id="name" type="text" />
```

### Required Field

```tsx
<Label htmlFor="email" required>Email Address</Label>
<input id="email" type="email" required />
```

### Custom Required Indicator

```tsx
<Label htmlFor="password" required requiredIndicator=" (required)">
  Password
</Label>
<input id="password" type="password" required />
```

### Different Variants

```tsx
<Label variant="default">Default Label</Label>
<Label variant="secondary">Secondary Label</Label>
<Label variant="destructive">Destructive Label</Label>
<Label variant="success">Success Label</Label>
<Label variant="muted">Muted Label</Label>
```

### Different Sizes

```tsx
<Label size="sm">Small Label</Label>
<Label size="md">Medium Label</Label>
<Label size="lg">Large Label</Label>
```

### Screen Reader Only

Visually hidden but accessible to screen readers:

```tsx
<Label htmlFor="search" srOnly>Search</Label>
<input id="search" type="search" placeholder="Search..." />
```

### With Form Components

```tsx
<div className="space-y-2">
  <Label htmlFor="username" required>
    Username
  </Label>
  <Input id="username" placeholder="Enter your username" />
  <p className="text-xs text-muted-foreground">Choose a unique username</p>
</div>
```

## Accessibility

The Label component follows accessibility best practices:

- Associates with form controls using the `htmlFor` attribute
- Supports screen reader only mode with the `srOnly` prop
- Clearly indicates required fields with visual indicators
- Maintains proper contrast ratios for all variants
- Includes proper ARIA attributes

## Styling

The Label component uses CSS variables from your theme for consistent styling:

- Text colors use the `--foreground`, `--secondary-foreground`, `--destructive`, `--success`, and `--muted-foreground` variables
- Adapts to dark mode when the `.dark` class is applied to a parent element
- Supports peer styling for disabled states

## Customization

You can customize the Label component by providing a custom className:

```tsx
<Label className="italic underline" htmlFor="custom-field">
  Custom Styled Label
</Label>
```

Tailwind classes can be used directly for custom styling needs.
