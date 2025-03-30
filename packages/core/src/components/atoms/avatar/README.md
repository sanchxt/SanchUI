# Avatar Component

A versatile avatar component for displaying user images with fallback options, supporting multiple sizes, shapes, status indicators, and badge variations.

## Features

- Display user images with smart fallback to initials
- Multiple size variants: `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`
- Shape options: `circle`, `square`, and `rounded`
- Status indicators: `online`, `offline`, `away`, and `busy`
- Support for custom badges with configurable positions
- Color scheme options for fallback backgrounds
- Border option for enhanced visual appearance
- Loading state handling with optional placeholders
- Full accessibility with appropriate ARIA attributes

## Usage

```tsx
import { Avatar } from '@sanch-ui/core';

function MyComponent() {
  return <Avatar src="/path-to-image.jpg" alt="User Name" />;
}
```

## Component

### Avatar

The main avatar component.

| **Prop**        | **Type**                                                     | **Default**    | **Description**                                  |
| --------------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------ |
| src             | string                                                       | undefined      | URL of the avatar image                          |
| alt             | string                                                       | 'Avatar'       | Alt text for the avatar image                    |
| fallbackText    | string                                                       | undefined      | Text to display when image is unavailable        |
| size            | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'                | 'md'           | Size of the avatar                               |
| shape           | 'circle' \| 'square' \| 'rounded'                            | 'circle'       | Shape of the avatar                              |
| bordered        | boolean                                                      | false          | Whether to display a border around the avatar    |
| colorScheme     | 'primary' \| 'secondary' \| 'accent' \| 'muted' \| 'gray'    | 'primary'      | Color scheme for fallback background             |
| status          | 'online' \| 'offline' \| 'away' \| 'busy'                    | undefined      | Status indicator to display                      |
| badge           | React.ReactNode                                              | undefined      | Custom badge content                             |
| badgePosition   | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' | 'bottom-right' | Position of the badge                            |
| showPlaceholder | boolean                                                      | true           | Whether to show placeholder during image loading |
| className       | string                                                       | undefined      | Additional CSS classes for the avatar container  |

## Accessibility

This avatar component follows accessibility best practices:

- Uses `role="img"` for proper semantic meaning
- Includes `aria-label` attribute for screen readers
- Provides appropriate `alt` text for avatar images
- Includes accessible status indicator labels
- Maintains proper contrast ratios for text and background colors

## Examples

### Basic Avatar with Image

```tsx
<Avatar src="https://example.com/user.jpg" alt="John Doe" />
```

### Fallback with Initials

```tsx
<Avatar fallbackText="John Doe" />
```

### Different Sizes

```tsx
<div className="flex items-end gap-4">
  <Avatar size="xs" fallbackText="JD" />
  <Avatar size="sm" fallbackText="JD" />
  <Avatar size="md" fallbackText="JD" />
  <Avatar size="lg" fallbackText="JD" />
  <Avatar size="xl" fallbackText="JD" />
  <Avatar size="2xl" fallbackText="JD" />
</div>
```

### Different Shapes

```tsx
<div className="flex gap-4">
  <Avatar shape="circle" fallbackText="JD" />
  <Avatar shape="square" fallbackText="JD" />
  <Avatar shape="rounded" fallbackText="JD" />
</div>
```

### With Status Indicator

```tsx
<div className="flex gap-4">
  <Avatar src="https://example.com/user.jpg" status="online" />
  <Avatar src="https://example.com/user.jpg" status="offline" />
  <Avatar src="https://example.com/user.jpg" status="away" />
  <Avatar src="https://example.com/user.jpg" status="busy" />
</div>
```

### With Badge

```tsx
<Avatar
  src="https://example.com/user.jpg"
  badge={
    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
      3
    </div>
  }
/>
```

### With Border

```tsx
<Avatar src="https://example.com/user.jpg" bordered />
```

### Custom Color Schemes

```tsx
<div className="flex gap-4">
  <Avatar fallbackText="John Doe" colorScheme="primary" />
  <Avatar fallbackText="Alice Smith" colorScheme="secondary" />
  <Avatar fallbackText="Bob Johnson" colorScheme="accent" />
  <Avatar fallbackText="Emma Wilson" colorScheme="muted" />
  <Avatar fallbackText="James Brown" colorScheme="gray" />
</div>
```

### Badge Positions

```tsx
<div className="flex gap-4">
  <Avatar
    src="https://example.com/user.jpg"
    badge={<div>3</div>}
    badgePosition="top-right"
  />
  <Avatar
    src="https://example.com/user.jpg"
    badge={<div>3</div>}
    badgePosition="top-left"
  />
  <Avatar
    src="https://example.com/user.jpg"
    badge={<div>3</div>}
    badgePosition="bottom-right"
  />
  <Avatar
    src="https://example.com/user.jpg"
    badge={<div>3</div>}
    badgePosition="bottom-left"
  />
</div>
```

### Avatar Group

```tsx
<div className="flex">
  {['user1.jpg', 'user2.jpg', 'user3.jpg'].map((url, i) => (
    <div
      key={i}
      className="inline-block"
      style={{ marginLeft: i > 0 ? '-0.75rem' : '0' }}
    >
      <Avatar src={`https://example.com/${url}`} size="md" bordered />
    </div>
  ))}
  <div className="inline-block" style={{ marginLeft: '-0.75rem' }}>
    <Avatar fallbackText="More Users" size="md" bordered colorScheme="muted" />
  </div>
</div>
```

## Usage in Components

### In User Profile

```tsx
<div className="flex items-center gap-3">
  <Avatar src="https://example.com/user.jpg" size="xl" status="online" />
  <div>
    <h4 className="font-medium">John Anderson</h4>
    <p className="text-sm text-muted-foreground">Product Designer</p>
  </div>
</div>
```

### In Comment Section

```tsx
<div className="flex gap-3">
  <Avatar src="https://example.com/user.jpg" size="md" />
  <div>
    <div className="bg-muted p-3 rounded-lg">
      <h4 className="text-sm font-medium">Sarah Johnson</h4>
      <p className="text-sm mt-1">This looks great!</p>
    </div>
  </div>
</div>
```

### In Chat List

```tsx
<div className="flex items-center gap-3">
  <div className="relative">
    <Avatar src="https://example.com/user.jpg" size="md" status="online" />
    <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
      3
    </div>
  </div>
  <div>
    <h4 className="font-medium">Alice Cooper</h4>
    <p className="text-sm text-muted-foreground">Hey there!</p>
  </div>
</div>
```
