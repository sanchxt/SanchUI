# Tooltip Component

A customizable and accessible tooltip component that displays informational content when users hover, click, or focus on an element. Supports various positioning options, animations, and interactive behaviors.

## Features

- 12 positioning options (top, right, bottom, left, with start/end variants)
- Multiple trigger methods: hover, click, focus, or manual control
- Customizable show/hide delays
- Interactive mode for hoverable tooltips
- Supports arrow indicators with customizable styling
- Keyboard accessibility (Escape to dismiss)
- Fully customizable appearance
- Animation control
- Position offset customization
- Support for rich content (not just text)
- Works in both light and dark themes

## Usage

```tsx
import { Tooltip } from '@sanch-ui/core';

function MyComponent() {
  return (
    <Tooltip content="This is a helpful tooltip">
      <button>Hover over me</button>
    </Tooltip>
  );
}
```

## Component

### Tooltip

The main tooltip component.

| **Prop**            | **Type**                                  | **Default** | **Description**                            |
| ------------------- | ----------------------------------------- | ----------- | ------------------------------------------ |
| content             | ReactNode                                 | (required)  | Content to display in the tooltip          |
| children            | ReactNode                                 | (required)  | Element that triggers the tooltip          |
| position            | TooltipPosition                           | 'top'       | Position relative to the trigger           |
| showDelay           | number                                    | 0           | Delay before showing tooltip (ms)          |
| hideDelay           | number                                    | 0           | Delay before hiding tooltip (ms)           |
| maxWidth            | string                                    | '20rem'     | Maximum width of the tooltip               |
| arrow               | boolean                                   | true        | Whether to show an arrow                   |
| className           | string                                    | ''          | Class for the container element            |
| contentClassName    | string                                    | ''          | Class for the tooltip content              |
| arrowClassName      | string                                    | ''          | Class for the arrow element                |
| disabled            | boolean                                   | false       | Whether the tooltip is disabled            |
| trigger             | 'hover' \| 'click' \| 'focus' \| 'manual' | 'hover'     | How the tooltip is triggered               |
| isOpen              | boolean                                   | false       | For manual control (with trigger="manual") |
| onShow              | () => void                                | undefined   | Callback when tooltip shows                |
| onHide              | () => void                                | undefined   | Callback when tooltip hides                |
| closeOnOutsideClick | boolean                                   | true        | Close when clicking outside                |
| closeOnEscape       | boolean                                   | true        | Close when Escape key is pressed           |
| zIndex              | number                                    | 50          | Z-index of the tooltip                     |
| interactive         | boolean                                   | false       | Can move cursor into tooltip               |
| animationDuration   | number                                    | 150         | Animation duration in ms                   |
| offset              | number                                    | 8           | Distance from trigger element (px)         |
| id                  | string                                    | (auto)      | Custom ID for the tooltip                  |

**TooltipPosition Options**:
`'top'`, `'top-start'`, `'top-end'`, `'right'`, `'right-start'`, `'right-end'`, `'bottom'`, `'bottom-start'`, `'bottom-end'`, `'left'`, `'left-start'`, `'left-end'`

## Accessibility

This tooltip component follows WCAG guidelines:

- Uses proper ARIA attributes (`role="tooltip"`)
- Establishes relationship between tooltip and trigger with `aria-describedby`
- Supports keyboard navigation and dismissal
- Ensures focus management follows accessibility best practices
- Provides sufficient color contrast in both light and dark themes
- Offers customizable delays for users who may need more time
- Allows disabling animations for users who prefer reduced motion

## Examples

### Basic Tooltip

```tsx
<Tooltip content="Simple tooltip text">
  <button>Hover me</button>
</Tooltip>
```

### Different Positions

```tsx
<Tooltip content="Appears on top" position="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Appears on the right" position="right">
  <button>Right</button>
</Tooltip>

<Tooltip content="Appears at the bottom" position="bottom">
  <button>Bottom</button>
</Tooltip>

<Tooltip content="Appears on the left" position="left">
  <button>Left</button>
</Tooltip>
```

### Different Triggers

```tsx
// Default hover trigger
<Tooltip content="Hover to show">
  <button>Hover me</button>
</Tooltip>

// Click trigger
<Tooltip content="Click to toggle" trigger="click">
  <button>Click me</button>
</Tooltip>

// Focus trigger
<Tooltip content="Focus to show" trigger="focus">
  <input placeholder="Focus me" />
</Tooltip>

// Manual control
function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip
        content="Manually controlled"
        trigger="manual"
        isOpen={isOpen}
      >
        <button>Tooltip is {isOpen ? 'shown' : 'hidden'}</button>
      </Tooltip>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle tooltip
      </button>
    </>
  );
}
```

### With Delays

```tsx
<Tooltip
  content="Appears after 500ms"
  showDelay={500}
>
  <button>Delayed appearance</button>
</Tooltip>

<Tooltip
  content="Disappears after 1s"
  hideDelay={1000}
>
  <button>Delayed disappearance</button>
</Tooltip>
```

### Rich Content

```tsx
<Tooltip
  content={
    <div className="p-2">
      <h3 className="font-bold">Rich Tooltip</h3>
      <p className="text-sm">This tooltip contains multiple elements.</p>
      <button className="mt-2 px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
        Click me
      </button>
    </div>
  }
  interactive
>
  <button>Show rich tooltip</button>
</Tooltip>
```

### With Icons

```tsx
import { InfoCircle } from 'lucide-react';

<Tooltip content="Important information">
  <button className="text-blue-500 rounded-full">
    <InfoCircle size={20} />
  </button>
</Tooltip>;
```

### Without Arrow

```tsx
<Tooltip content="This tooltip has no arrow" arrow={false}>
  <button>No arrow</button>
</Tooltip>
```

### Interactive Tooltip

```tsx
<Tooltip
  content={
    <div>
      <p>You can hover on this tooltip without it disappearing.</p>
      <a href="#" className="text-blue-500 underline">
        Click this link
      </a>
    </div>
  }
  interactive
>
  <button>Interactive tooltip</button>
</Tooltip>
```

### With Custom Styling

```tsx
<Tooltip
  content="Custom styled tooltip"
  className="group"
  contentClassName="bg-blue-500 text-white border-blue-600"
  arrowClassName="bg-blue-500 border-blue-600"
>
  <button>Custom styling</button>
</Tooltip>
```

## Behavior Notes

- **Interactivity**: When `interactive` is true, users can move their cursor onto the tooltip without it disappearing
- **Keyboard Support**: Press `Escape` to dismiss tooltips when focused
- **Outside Clicks**: Tooltips triggered by click will dismiss when clicking outside (configurable)
- **Positioning**: The component automatically handles positioning to remain within the viewport
- **Accessibility**: The tooltip uses appropriate ARIA attributes to ensure screen reader compatibility
- **Animation**: Smooth fade transitions are applied by default for a polished user experience
