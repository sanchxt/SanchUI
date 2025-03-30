# Range Slider Component

A versatile and accessible slider component for selecting values from a range. Supports both single value and range selection, with customizable handles, colors, and orientations.

## Features

- Single value or range (min/max) selection
- Horizontal or vertical orientation
- Customizable size, colors, and width
- Support for disabled state
- Tooltips for value display (on hover, always, or never)
- Min/max labels display
- Custom markers and ticks
- Value formatting
- Accessible keyboard navigation
- Full ARIA support
- Touch support for mobile devices

## Usage

```tsx
import { RangeSlider } from '@sanch-ui/core';

function MyComponent() {
  const [value, setValue] = useState(50);

  return (
    <RangeSlider
      value={value}
      onChange={setValue}
      label="Volume"
      showTooltip="hover"
      showMinMaxLabels
    />
  );
}
```

## Component

### RangeSlider

The main RangeSlider component.

| **Prop**             | **Type**                                               | **Default**               | **Description**                         |
| -------------------- | ------------------------------------------------------ | ------------------------- | --------------------------------------- |
| min                  | number                                                 | 0                         | Minimum value of the slider             |
| max                  | number                                                 | 100                       | Maximum value of the slider             |
| step                 | number                                                 | 1                         | Step size for the slider                |
| value                | number \| [number, number]                             | undefined                 | Current value(s) (controlled)           |
| defaultValue         | number \| [number, number]                             | undefined                 | Default value(s) (uncontrolled)         |
| label                | string                                                 | undefined                 | Label text to display                   |
| showTooltip          | 'always' \| 'hover' \| 'never'                         | 'hover'                   | When to show value tooltip              |
| showMinMaxLabels     | boolean                                                | false                     | Show min and max value labels           |
| showMarkers          | boolean                                                | false                     | Show value markers on the track         |
| markerCount          | number                                                 | 5                         | Number of markers to show               |
| showValueLabel       | boolean                                                | false                     | Show current value label                |
| formatValue          | (value: number) => string                              | value => value.toString() | Format values for display               |
| size                 | 'sm' \| 'md' \| 'lg'                                   | 'md'                      | Size of the slider                      |
| width                | string                                                 | '100%'                    | Width of the slider                     |
| color                | 'primary' \| 'secondary' \| 'success' \| 'destructive' | 'primary'                 | Color of the filled track               |
| disabled             | boolean                                                | false                     | Disable the slider                      |
| onChange             | (value: number \| [number, number]) => void            | undefined                 | Called when the value changes           |
| onChangeStart        | (value: number \| [number, number]) => void            | undefined                 | Called when user starts dragging        |
| onChangeEnd          | (value: number \| [number, number]) => void            | undefined                 | Called when user stops dragging         |
| className            | string                                                 | ''                        | Additional CSS classes for container    |
| trackClassName       | string                                                 | ''                        | Additional CSS classes for track        |
| filledTrackClassName | string                                                 | ''                        | Additional CSS classes for filled track |
| handleClassName      | string                                                 | ''                        | Additional CSS classes for handle       |
| id                   | string                                                 | undefined                 | Id for accessibility                    |
| ariaLabel            | string                                                 | undefined                 | ARIA label for the slider               |
| marks                | Array<{ value: number; label?: string }>               | undefined                 | Custom marks to display on the slider   |
| showTicks            | boolean                                                | false                     | Show ticks on the track                 |
| orientation          | 'horizontal' \| 'vertical'                             | 'horizontal'              | Orientation of the slider               |
| height               | string                                                 | '200px'                   | Height for vertical orientation         |

## Accessibility

This Range Slider component follows WCAG guidelines:

- Uses semantic HTML with appropriate ARIA roles
- Includes proper labeling with `aria-label` and `aria-labelledby`
- Provides `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` attributes
- Supports `aria-orientation` for directional context
- Ensures keyboard focus management with proper focus indicators
- Maintains disabled states with `aria-disabled`
- Supports touch interactions for mobile accessibility

## Examples

### Basic Slider

```tsx
<RangeSlider
  label="Volume"
  defaultValue={50}
  onChange={(value) => console.log(value)}
/>
```

### Range Slider

```tsx
<RangeSlider
  label="Price Range"
  defaultValue={[25, 75]}
  formatValue={(value) => `$${value}`}
  showValueLabel
  showMinMaxLabels
/>
```

### With Custom Marks

```tsx
<RangeSlider
  min={0}
  max={100}
  marks={[
    { value: 0, label: 'Low' },
    { value: 50, label: 'Medium' },
    { value: 100, label: 'High' },
  ]}
/>
```

### Different Sizes

```tsx
<div className="space-y-4">
  <RangeSlider size="sm" label="Small" defaultValue={30} />
  <RangeSlider size="md" label="Medium" defaultValue={50} />
  <RangeSlider size="lg" label="Large" defaultValue={70} />
</div>
```

### Vertical Orientation

```tsx
<RangeSlider
  orientation="vertical"
  height="200px"
  label="Volume"
  defaultValue={50}
  showMinMaxLabels
/>
```

### With Tooltips

```tsx
<RangeSlider label="With Tooltip" defaultValue={50} showTooltip="always" />
```

### Disabled State

```tsx
<RangeSlider label="Disabled" defaultValue={50} disabled />
```

### Custom Formatting

```tsx
<RangeSlider
  label="Temperature"
  min={0}
  max={100}
  defaultValue={22}
  formatValue={(value) => `${value}°C`}
  showValueLabel
/>
```

### With Step Constraint

```tsx
<RangeSlider
  label="Brightness"
  min={0}
  max={100}
  step={10}
  defaultValue={50}
  showMarkers
  markerCount={11}
/>
```

## Behavior Notes

- **Range Selection**: When providing an array as `value` or `defaultValue`, the component will render as a range slider with two handles.
- **Step Constraint**: Values will snap to the nearest step value when changed.
- **Tooltips**: Can be configured to show always, on hover, or never.
- **Markers**: Provide visual indicators for specific values along the track.
- **Touch Support**: Works on touch devices with proper touch event handling.
- **Customization**: All visual aspects can be customized via props or className overrides.
