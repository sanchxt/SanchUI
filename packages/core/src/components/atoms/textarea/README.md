# Textarea Component

A versatile and accessible textarea component for multi-line text input, with support for auto-resizing, character counting, and various visual styles.

## Features

- Fully accessible with proper ARIA attributes
- Supports multiple variants: `outline`, `filled`, `flushed`, and `unstyled`
- Optional auto-resize functionality to fit content
- Configurable minimum and maximum rows
- Character count display with optional maximum length
- Visual feedback for focus, hover, and error states
- Disabled and required states
- Customizable counter prefix

## Usage

```tsx
import { Textarea } from '@sanch-ui/core';

function MyComponent() {
  return <Textarea placeholder="Enter your text here..." />;
}
```

## Component

### Textarea

The main textarea component.

| **Prop**      | **Type**                                         | **Default** | **Description**                                   |
| ------------- | ------------------------------------------------ | ----------- | ------------------------------------------------- |
| isInvalid     | boolean                                          | false       | Displays the textarea in an error state           |
| autoResize    | boolean                                          | false       | Automatically adjusts height to fit content       |
| maxRows       | number                                           | undefined   | Maximum rows before scrolling (with `autoResize`) |
| minRows       | number                                           | 3           | Minimum rows to display                           |
| variant       | 'outline' \| 'filled' \| 'flushed' \| 'unstyled' | 'outline'   | Visual style of the textarea                      |
| counterPrefix | ReactNode                                        | undefined   | Text or element before the character count        |
| showCount     | boolean                                          | false       | Displays a character count                        |
| maxLength     | number                                           | undefined   | Limits the number of characters                   |
| disabled      | boolean                                          | false       | Disables the textarea                             |
| required      | boolean                                          | false       | Marks the textarea as required                    |
| className     | string                                           | undefined   | Additional CSS classes for the textarea           |
| ref           | React.Ref<HTMLTextAreaElement>                   | undefined   | Reference to the textarea element                 |

## Accessibility

This textarea component adheres to WCAG guidelines:

- Uses semantic HTML (`<textarea>`) with appropriate attributes
- Includes `aria-invalid` for error states
- Provides visible focus styles with `focus-visible:ring`
- Supports keyboard navigation
- Ensures disabled states are visually distinct and marked with `disabled` attribute
- Character count is visually clear and styled for error states when exceeding `maxLength`

## Examples

### Basic Textarea

```tsx
<Textarea placeholder="Enter your text here..." />
```

### With Error State

```tsx
<Textarea isInvalid placeholder="Invalid input" />
```

### Auto-Resizing Textarea

```tsx
<Textarea
  autoResize
  minRows={2}
  maxRows={5}
  placeholder="Type here to see it resize..."
/>
```

### With Character Count

```tsx
<Textarea showCount placeholder="Start typing..." />
```

### With Character Limit and Count

```tsx
<Textarea showCount maxLength={100} placeholder="Limited to 100 characters" />
```

### With Custom Counter Prefix

```tsx
<Textarea
  showCount
  maxLength={50}
  counterPrefix="Characters:"
  placeholder="Type here..."
/>
```

### Different Variants

```tsx
<div className="space-y-4">
  <Textarea variant="outline" placeholder="Outline variant" />
  <Textarea variant="filled" placeholder="Filled variant" />
  <Textarea variant="flushed" placeholder="Flushed variant" />
  <Textarea variant="unstyled" placeholder="Unstyled variant" />
</div>
```

### Disabled Textarea

```tsx
<Textarea disabled placeholder="Disabled textarea" />
```

### Custom Styling

```tsx
<Textarea
  className="border-purple-500 focus-visible:ring-purple-500 text-purple-700"
  placeholder="Custom styled textarea"
/>
```

### With All Features Combined

```tsx
<Textarea
  isInvalid
  autoResize
  maxRows={4}
  minRows={2}
  showCount
  maxLength={200}
  counterPrefix={<span className="font-bold">Chars:</span>}
  placeholder="Type here with all features enabled..."
/>
```
