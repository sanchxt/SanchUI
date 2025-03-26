# Link Component

A customizable and accessible link component designed for navigation, with support for different styles, sizes, and external link handling.

## Features

- Multiple visual variants (default, primary, secondary, destructive, success, muted)
- Configurable underline behavior (always, hover, none)
- Multiple size options (sm, md, lg)
- Automatic external link detection with optional external link icon
- Support for custom components (e.g., for React Router integration)
- Disabled state support
- Proper security attributes for external links
- Fully accessible with appropriate ARIA attributes

## Usage

```tsx
import { Link } from '@sanch-ui/core';

function MyComponent() {
  return (
    <Link href="https://example.com" variant="primary">
      Visit Example Website
    </Link>
  );
}
```

## Component

### Link

The main link component.

| **Prop**         | **Type**                                                                       | **Default** | **Description**                                   |
| ---------------- | ------------------------------------------------------------------------------ | ----------- | ------------------------------------------------- |
| variant          | 'default' \| 'primary' \| 'secondary' \| 'destructive' \| 'success' \| 'muted' | 'default'   | The variant style of the link                     |
| underline        | 'always' \| 'hover' \| 'none'                                                  | 'hover'     | Whether the link should display an underline      |
| showExternalIcon | boolean                                                                        | false       | Whether to show an external link icon             |
| disabled         | boolean                                                                        | false       | Whether the link is disabled                      |
| size             | 'sm' \| 'md' \| 'lg'                                                           | 'md'        | Size of the link                                  |
| className        | string                                                                         | ''          | Additional CSS classes                            |
| as               | React.ElementType                                                              | 'a'         | Component to use as the link                      |
| href             | string                                                                         | undefined   | The URL to link to                                |
| ref              | React.Ref<HTMLAnchorElement>                                                   | undefined   | Ref to the underlying DOM element                 |
| children         | React.ReactNode                                                                | required    | The content of the link                           |
| ...props         | React.AnchorHTMLAttributes<HTMLAnchorElement>                                  | -           | Any additional props passed to the anchor element |

## Accessibility

This Link component follows WCAG guidelines:

- Uses semantic HTML with proper anchor elements
- Provides clear focus states with visible focus indicators
- Includes `aria-disabled` for disabled states
- Adds appropriate security attributes (`rel="noreferrer noopener"`) for external links
- Maintains proper color contrast in all variants
- Works with keyboard navigation

## Examples

### Basic Link

```tsx
<Link href="/about">About Us</Link>
```

### Link Variants

```tsx
<div className="space-y-2">
  <Link href="#" variant="default">
    Default Link
  </Link>
  <Link href="#" variant="primary">
    Primary Link
  </Link>
  <Link href="#" variant="secondary">
    Secondary Link
  </Link>
  <Link href="#" variant="destructive">
    Destructive Link
  </Link>
  <Link href="#" variant="success">
    Success Link
  </Link>
  <Link href="#" variant="muted">
    Muted Link
  </Link>
</div>
```

### Underline Styles

```tsx
<div className="space-y-2">
  <Link href="#" underline="always">
    Always Underlined
  </Link>
  <Link href="#" underline="hover">
    Hover Underlined (Default)
  </Link>
  <Link href="#" underline="none">
    Never Underlined
  </Link>
</div>
```

### Sizes

```tsx
<div className="space-y-2">
  <Link href="#" size="sm">
    Small Link
  </Link>
  <Link href="#" size="md">
    Medium Link (Default)
  </Link>
  <Link href="#" size="lg">
    Large Link
  </Link>
</div>
```

### External Links

```tsx
<Link href="https://example.com" showExternalIcon>
  External Link with Icon
</Link>
```

### Disabled Link

```tsx
<Link href="#" disabled>
  Disabled Link
</Link>
```

### With Icons

```tsx
import { ArrowRight } from 'lucide-react';

<Link href="#" className="flex items-center gap-1">
  Read More <ArrowRight className="h-4 w-4" />
</Link>;
```

### Integration with React Router

```tsx
import { Link as RouterLink } from 'react-router-dom';

<Link as={RouterLink} to="/dashboard" variant="primary">
  Go to Dashboard
</Link>;
```

## Behavior Notes

- **External Links**: Links with URLs starting with "http", "//", or with `target="_blank"` are treated as external links
- **Security**: External links automatically receive `rel="noreferrer noopener"` for security
- **Disabled Links**: When disabled, links will not have an `href` attribute and will have `aria-disabled="true"`
- **Component Substitution**: The `as` prop allows using a different component (like React Router's Link) while maintaining all styling
