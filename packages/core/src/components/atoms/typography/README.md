# Typography Component

A versatile and customizable typography system designed to maintain consistent text styling throughout your application while supporting various hierarchies, colors, weights, and transformations.

## Features

- Comprehensive set of text variants (h1-h6, paragraph, blockquote, etc.)
- Multiple color options to match your design system
- Font weight variations for visual hierarchy
- Text alignment and transformation controls
- Support for text truncation and line clamping
- Responsive text sizing for different viewport sizes
- Dark mode support
- Ability to override the rendered HTML element

## Usage

```tsx
import { Typography, H1, H2, Paragraph, Lead } from '@sanch-ui/core';

function MyComponent() {
  return (
    <div>
      <H1>Main Heading</H1>
      <Lead>This is an introduction paragraph that stands out.</Lead>
      <Paragraph>Regular paragraph text goes here.</Paragraph>
      <Typography variant="small" color="muted" align="right">
        Some small, muted, right-aligned text.
      </Typography>
    </div>
  );
}
```

## Component

### Typography

The main Typography component that can be configured for any text style.

| **Prop**   | **Type**            | **Default** | **Description**                               |
| ---------- | ------------------- | ----------- | --------------------------------------------- |
| variant    | TypographyVariant   | 'p'         | The variant of the typography                 |
| color      | TypographyColor     | 'default'   | The color of the text                         |
| weight     | TypographyWeight    | undefined   | The weight of the text                        |
| align      | TypographyAlign     | undefined   | The alignment of the text                     |
| transform  | TypographyTransform | undefined   | The transform of the text                     |
| truncate   | boolean             | false       | Whether to truncate with ellipsis if overflow |
| lineClamp  | number              | undefined   | Number of lines before truncating             |
| responsive | boolean             | true        | Enable responsive size reduction              |
| themedDark | boolean             | true        | Whether text follows dark mode theme          |
| className  | string              | undefined   | Additional CSS classes                        |
| as         | React.ElementType   | undefined   | HTML element to override default              |
| children   | React.ReactNode     | (required)  | The content of the typography component       |

### Type Definitions

```typescript
type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'blockquote'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted'
  | 'subtle';

type TypographyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'accent'
  | 'destructive'
  | 'success';

type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

type TypographyTransform = 'normal' | 'uppercase' | 'lowercase' | 'capitalize';
```

## Convenience Components

For common use cases, the library provides pre-configured components:

| **Component** | **Description**                              |
| ------------- | -------------------------------------------- |
| H1            | Primary heading (largest)                    |
| H2            | Secondary heading                            |
| H3            | Tertiary heading                             |
| H4            | Fourth-level heading                         |
| H5            | Fifth-level heading                          |
| H6            | Sixth-level heading (smallest)               |
| Paragraph     | Standard paragraph text                      |
| Blockquote    | Styled blockquote for citations or quotes    |
| Lead          | Larger paragraph text for introductions      |
| Large         | Slightly larger than standard paragraph text |
| Small         | Smaller text for auxiliary information       |
| Muted         | Text with reduced prominence                 |
| Subtle        | Even less prominent than muted text          |

All convenience components accept the same props as the main Typography component, except `variant`, which is pre-defined.

## Examples

### Basic Examples

```tsx
// Simple paragraph
<Paragraph>This is a standard paragraph.</Paragraph>

// Heading with custom color
<H2 color="primary">Primary Colored Heading</H2>

// Custom weight and alignment
<Typography weight="bold" align="center">
  Bold, centered text
</Typography>
```

### Text Transformations

```tsx
<Typography transform="uppercase">Uppercase text</Typography>
<Typography transform="lowercase">LOWERCASE TEXT</Typography>
<Typography transform="capitalize">capitalize this text</Typography>
```

### Text Truncation

```tsx
// Single line truncation with ellipsis
<Typography truncate className="w-48">
  This text will be truncated if it's longer than the container.
</Typography>

// Multi-line clamping
<Typography lineClamp={2}>
  This text will be limited to two lines maximum. Any content beyond that will be
  truncated with an ellipsis. This is useful for card descriptions or previews.
</Typography>
```

### Custom HTML Element

```tsx
// Render an H2 variant as a div
<Typography variant="h2" as="div">
  This looks like an H2 but is actually a div
</Typography>

// Use a span for inline styled text
<p>
  Here is a sentence with <Typography as="span" weight="bold" color="primary">styled inline text</Typography>.
</p>
```

### Responsive Typography

```tsx
// Default - responsive (smaller on mobile)
<H1>This heading is responsive</H1>

// Explicitly non-responsive
<H1 responsive={false}>This heading stays the same size on all devices</H1>
```

### Dark Mode Support

```tsx
// Default - follows dark mode
<Paragraph>This text adapts to dark mode</Paragraph>

// Manually handle dark mode colors
<Paragraph themedDark={false} className="dark:text-blue-300">
  Custom dark mode styling
</Paragraph>
```

## Accessibility

This Typography component follows accessibility best practices:

- Uses semantic HTML elements by default (h1-h6, p, blockquote)
- Maintains proper text hierarchy for screen readers
- Supports customizing the HTML element when needed
- Preserves color contrast ratios in both light and dark modes
- Respects user preferences for reduced motion when animations are added

## Design Guidelines

For consistent typography in your applications:

1. Use headings (H1-H6) to establish proper content hierarchy
2. Use Lead for introductory text at the beginning of sections
3. Use Muted or Small for supporting information
4. Use the Blockquote component for quotations
5. Maintain consistent text alignment within sections
6. Limit font weight variations to establish clear hierarchy
7. Use color variations sparingly and purposefully

## Behavioral Notes

- **Responsive Sizing**: By default, text sizes are slightly reduced on smaller screens
- **Dark Mode**: Automatically applies appropriate colors in dark mode
- **Line Clamping**: Works best with modern browsers; falls back gracefully
- **Truncation**: Requires a width constraint on the containing element
