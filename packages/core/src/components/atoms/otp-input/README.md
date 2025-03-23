# OTP Input Component

A customizable and accessible One-Time Password (OTP) input component designed for entering verification codes with support for different input types, separators, and sizes.

## Features

- Configurable length for OTP codes
- Supports numeric, alphabetic, or alphanumeric input
- Optional separator with customizable position and character
- Auto-focus capability for first input
- Error state visualization
- Multiple size options: `sm`, `md`, `lg`
- Masking support for secure input display
- Handles paste events intelligently
- Keyboard navigation (arrows, backspace)
- Fully accessible with ARIA attributes
- Responsive design with customizable styling

## Usage

```tsx
import { OTPInput } from '@sanch-ui/core';

function MyComponent() {
  const [otp, setOtp] = useState('');

  return (
    <OTPInput value={otp} onChange={setOtp} length={6} inputType="numeric" />
  );
}
```

## Component

### OTPInput

The main OTP input component.

| **Prop**           | **Type**                                    | **Default** | **Description**                       |
| ------------------ | ------------------------------------------- | ----------- | ------------------------------------- |
| length             | number                                      | 6           | Number of input boxes (OTP length)    |
| value              | string                                      | ''          | Current value of the OTP              |
| onChange           | (value: string) => void                     | undefined   | Callback when OTP value changes       |
| onComplete         | (value: string) => void                     | undefined   | Callback when all inputs are filled   |
| inputType          | 'numeric' \| 'alphabetic' \| 'alphanumeric' | 'numeric'   | Type of input accepted                |
| withSeparator      | boolean                                     | false       | Adds a separator between inputs       |
| separator          | ReactNode                                   | '-'         | Custom separator element or character |
| separatorPosition  | number                                      | middle      | 0-indexed position of separator       |
| autoFocus          | boolean                                     | false       | Auto-focus first input on mount       |
| disabled           | boolean                                     | false       | Disables all inputs                   |
| isInvalid          | boolean                                     | false       | Shows error state                     |
| inputSize          | 'sm' \| 'md' \| 'lg'                        | 'md'        | Size of each input box                |
| className          | string                                      | ''          | Additional CSS classes for container  |
| inputClassName     | string                                      | ''          | Additional CSS classes for each input |
| separatorClassName | string                                      | ''          | Additional CSS classes for separator  |
| placeholder        | string                                      | ''          | Placeholder character for each input  |
| mask               | boolean                                     | false       | Masks input like a password           |
| maskChar           | string                                      | '•'         | Character used for masking            |
| ariaLabel          | string                                      | 'OTP input' | ARIA label for accessibility          |

## Accessibility

This OTP input component follows WCAG guidelines:

- Uses semantic HTML with appropriate `inputMode` and `pattern` attributes
- Includes `aria-invalid` for error states
- Provides visible focus styles with `focus:ring`
- Supports keyboard navigation (left/right arrows, backspace)
- Maintains proper focus management
- Ensures disabled states are visually distinct
- Groups inputs with `role="group"` for screen readers
- Provides customizable ARIA labels

## Examples

### Basic OTP Input

```tsx
<OTPInput length={4} inputType="numeric" />
```

### With Error State

```tsx
<OTPInput length={6} isInvalid />
```

### With Separator

```tsx
<OTPInput
  length={6}
  withSeparator
  separator={<span className="text-gray-500">-</span>}
/>
```

### Different Sizes

```tsx
<div className="space-y-4">
  <OTPInput inputSize="sm" length={4} />
  <OTPInput inputSize="md" length={4} />
  <OTPInput inputSize="lg" length={4} />
</div>
```

### Masked Input

```tsx
<OTPInput length={6} mask maskChar="*" />
```

### With Auto Focus and Completion Handler

```tsx
function MyComponent() {
  const [otp, setOtp] = useState('');

  const handleComplete = (value) => {
    console.log('OTP Complete:', value);
  };

  return (
    <OTPInput
      length={6}
      value={otp}
      onChange={setOtp}
      onComplete={handleComplete}
      autoFocus
    />
  );
}
```

### Alphanumeric Input

```tsx
<OTPInput length={5} inputType="alphanumeric" placeholder="X" />
```

### Custom Styling

```tsx
<OTPInput
  length={6}
  className="gap-4"
  inputClassName="border-blue-500 focus:ring-blue-500"
  separatorClassName="text-blue-500"
/>
```

### With Custom Separator Position

```tsx
<OTPInput length={8} withSeparator separator=":" separatorPosition={3} />
```

## Behavior Notes

- **Pasting**: Automatically filters invalid characters and fills inputs from the paste position
- **Backspace**: Clears current input or moves to previous input if empty
- **Arrow Keys**: Navigate between inputs
- **Input Validation**: Enforces input type restrictions (numeric, alphabetic, or alphanumeric)
- **Focus**: Selects content on focus for easy replacement
