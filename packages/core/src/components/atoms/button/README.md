# Button Component

A flexible button component that supports various styles, sizes, and states.

## Usage

```tsx
import { Button } from '@sanch-ui/core';

function MyComponent() {
  return (
    <Button variant="default" size="md" leftIcon={<Icon />} isLoading={false}>
      Click me
    </Button>
  );
}
```

## Props

| **Prop**  | **Type**                                                                  | **Default** | **Description**                    |
| --------- | ------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| variant   | 'default' \| 'secondary' \| 'outline' \| 'danger' \| 'success' \| 'ghost' | 'default'   | The visual style of the button     |
| size      | 'sm' \| 'md' \| 'lg'                                                      | 'md'        | The size of the button             |
| isLoading | boolean                                                                   | false       | Shows loading spinner if true      |
| disabled  | boolean                                                                   | false       | Whether the button is disabled     |
| leftIcon  | ReactNode                                                                 | undefined   | Icon to display before button text |
| rightIcon | ReactNode                                                                 | undefined   | Icon to display after button text  |
| className | string                                                                    | undefined   | Additional CSS classes             |

## Examples

### Variants

```tsx
<Button variant="default">Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="danger">Danger Button</Button>
<Button variant="success">Success Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

### Sizes

```tsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>
```

### States

```tsx
<Button isLoading>Loading Button</Button>
<Button disabled>Disabled Button</Button>
```

### With Icons

```tsx
<Button leftIcon={<MailIcon />}>Send Mail</Button>
<Button rightIcon={<ArrowRightIcon />}>Next</Button>
<Button leftIcon={<GithubIcon />} rightIcon={<ArrowRightIcon />}>
  View Repository
</Button>
```

## Accessibility

The Button component:

- Uses native `<button>` element
- Supports keyboard navigation
- Includes proper ARIA attributes (`aria-label`, `aria-busy` for loading)
- Maintains focus states with visible outlines
- Makes decorative icons hidden from screen readers
- Disables interaction when loading or disabled
