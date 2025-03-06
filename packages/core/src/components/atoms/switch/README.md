## Component

### Switch

The main switch component.

| **Prop**         | **Type**                                             | **Default** | **Description**                                     |
| ---------------- | ---------------------------------------------------- | ----------- | --------------------------------------------------- |
| wrapperClassName | string                                               | undefined   | Additional CSS classes for the wrapper (if labeled) |
| size             | 'sm' \| 'md' \| 'lg'                                 | 'md'        | Size of the switch                                  |
| checked          | boolean                                              | undefined   | Controlled state of the switch                      |
| defaultChecked   | boolean                                              | undefined   | Initial state of the switch (uncontrolled)          |
| disabled         | boolean                                              | false       | Disables the switch                                 |
| label            | ReactNode                                            | undefined   | Text or element to display as the label             |
| labelPosition    | 'left' \| 'right'                                    | 'right'     | Position of the label relative to the switch        |
| variant          | 'default' \| 'primary' \| 'success' \| 'destructive' | 'primary'   | Color variant of the switch when checked            |
| className        | string                                               | undefined   | Additional CSS classes for the switch itself        |
| ref              | React.Ref<HTMLInputElement>                          | undefined   | Reference to the underlying checkbox input          |

## Accessibility

This switch component adheres to WCAG guidelines:

- Uses a hidden `<input type="checkbox">` for native accessibility
- Provides visible focus styles with `peer-focus-visible:ring`
- Supports keyboard navigation (toggle with spacebar)
- Ensures disabled states are visually distinct and marked with `disabled` attribute
- Label is clickable to toggle the switch (when provided)
- Screen readers interpret it as a checkbox control

## Examples

### Basic Switch

```tsx
<Switch />
```

### With Label

```tsx
<Switch label="Toggle me" />
```

### Controlled Switch

```tsx
function MyComponent() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  );
}
```

### Different Sizes

```tsx
<div className="space-y-4">
  <Switch size="sm" label="Small" />
  <Switch size="md" label="Medium" />
  <Switch size="lg" label="Large" />
</div>
```

### Variants

```tsx
<div className="space-y-4">
  <Switch variant="default" label="Default" />
  <Switch variant="primary" label="Primary" />
  <Switch variant="success" label="Success" />
  <Switch variant="destructive" label="Destructive" />
</div>
```

### Label on Left

```tsx
<Switch label="Toggle me" labelPosition="left" />
```

### Disabled Switch

```tsx
<Switch disabled label="Disabled switch" />
```

### Custom Styling

```tsx
<Switch
  className="peer-checked:bg-purple-500"
  wrapperClassName="bg-gray-100 p-2 rounded-lg"
  label="Custom switch"
/>
```
