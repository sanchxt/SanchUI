# ColorPicker Component

A versatile, accessible color picker component that supports multiple color formats, custom presets, and advanced features like eyedropper tool and opacity control.

## Features

- Multiple color formats (HEX, RGB, HSL) with format switching
- Interactive saturation-lightness area and hue slider
- Alpha/opacity control
- Eyedropper tool (in supported browsers)
- Color presets with customization options
- Recent colors history
- Copy to clipboard functionality
- Responsive design with multiple size options
- Keyboard navigation and full accessibility support
- Dark mode compatible

## Usage

```tsx
import { ColorPicker } from '@sanch-ui/core';
import { useState } from 'react';

function MyComponent() {
  const [color, setColor] = useState('#3b82f6');

  return <ColorPicker value={color} onChange={(value) => setColor(value)} />;
}
```

## Component

### ColorPicker

The main color picker component.

| **Prop**         | **Type**                                         | **Default**    | **Description**                      |
| ---------------- | ------------------------------------------------ | -------------- | ------------------------------------ |
| value            | string                                           | undefined      | Current color value                  |
| onChange         | (value: string, colorObject: ColorValue) => void | undefined      | Callback when color changes          |
| defaultMode      | 'hex' \| 'rgb' \| 'hsl'                          | 'hex'          | Default color format mode            |
| withAlpha        | boolean                                          | true           | Enable alpha/opacity slider          |
| showPresets      | boolean                                          | true           | Display color presets                |
| presets          | string[]                                         | defaultPresets | Custom color presets to display      |
| showEyeDropper   | boolean                                          | true           | Show eyedropper tool (if supported)  |
| showFormatToggle | boolean                                          | true           | Show format switching buttons        |
| showRecentColors | boolean                                          | true           | Display recently used colors         |
| maxRecentColors  | number                                           | 5              | Maximum recent colors to display     |
| returnFormat     | 'hex' \| 'rgb' \| 'hsl' \| 'auto'                | 'auto'         | Format to return color value in      |
| className        | string                                           | ''             | Additional CSS classes for container |
| disabled         | boolean                                          | false          | Disable the color picker             |
| showCopyButton   | boolean                                          | true           | Show copy-to-clipboard button        |
| ariaLabel        | string                                           | 'Color picker' | ARIA label for accessibility         |
| size             | 'sm' \| 'md' \| 'lg'                             | 'md'           | Size of the color picker component   |

## Accessibility

This component follows WCAG guidelines:

- All interactive elements are keyboard accessible
- Clear focus states for all controls
- Proper ARIA labels and roles
- Color contrast information
- Disabled states are clearly indicated
- Supports screen readers with meaningful text alternatives

## Examples

### Basic Usage

```tsx
<ColorPicker value="#3b82f6" onChange={(value) => console.log(value)} />
```

### Without Alpha Channel

```tsx
<ColorPicker value="rgb(59, 130, 246)" withAlpha={false} />
```

### Custom Presets

```tsx
<ColorPicker
  presets={['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7']}
/>
```

### Compact Size Without Extra Features

```tsx
<ColorPicker
  size="sm"
  showFormatToggle={false}
  showPresets={false}
  showRecentColors={false}
  showEyeDropper={false}
/>
```

### With HSL Default and Return Format

```tsx
<ColorPicker defaultMode="hsl" returnFormat="hsl" value="hsl(217, 91%, 60%)" />
```

### Disabled State

```tsx
<ColorPicker value="#3b82f6" disabled />
```

### With Dark Mode

```tsx
<div className="dark">
  <ColorPicker value="#3b82f6" />
</div>
```

## Behavior Notes

- **Color Formats**: Supports HEX, RGB, and HSL color inputs and outputs
- **Auto Detection**: Automatically detects the format of the input color
- **Return Format**: Can return the color in a specific format or maintain the input format
- **Eyedropper**: Only shown in browsers that support the EyeDropper API
- **Recent Colors**: Automatically tracks recently used colors (up to the specified maximum)
- **Clipboard**: Allows copying the current color value to clipboard
- **Dragging**: Supports mouse dragging for the saturation-lightness area
- **Validation**: Handles and validates user input for all color formats
