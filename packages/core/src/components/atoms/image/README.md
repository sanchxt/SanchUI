# Image Component

A responsive, versatile image component with support for aspect ratios, placeholders, fallbacks, and accessibility features.

## Features

- **Responsive Design**: Works across all screen sizes
- **Aspect Ratio Control**: Maintain consistent image proportions
- **Loading States**: Show placeholders while images load
- **Error Handling**: Display fallback images if the main image fails to load
- **Object Fit Controls**: Various ways to display images within their containers
- **Rounded Corners**: Multiple border radius options
- **Lazy Loading**: Automatically defers off-screen images
- **Accessible**: Properly implements accessibility attributes and best practices
- **Captions**: Optional descriptive text below images
- **Priority Loading**: Option to prioritize critical images
- **Dark Mode Compatible**: Works seamlessly with dark theme

## Usage

```tsx
import { Image } from '@sanch-ui/core';

// Basic usage
<Image
  src="/path/to/image.jpg"
  alt="Description of the image"
/>

// With aspect ratio and rounded corners
<Image
  src="/path/to/image.jpg"
  alt="Description of the image"
  aspectRatio="16/9"
  rounded="lg"
/>

// With placeholder and caption
<Image
  src="/path/to/image.jpg"
  alt="Description of the image"
  placeholder="#f3f4f6"
  caption="This is a caption for the image"
/>

// With fallback image
<Image
  src="/path/to/image.jpg"
  alt="Description of the image"
  fallbackSrc="/path/to/fallback.jpg"
/>
```

## API Reference

### Props

| Prop                 | Type                | Default     | Description                                          |
| -------------------- | ------------------- | ----------- | ---------------------------------------------------- |
| `src`                | `string`            | (Required)  | Image source URL                                     |
| `alt`                | `string`            | (Required)  | Alternative text for accessibility                   |
| `aspectRatio`        | `AspectRatio`       | `'auto'`    | Controls the aspect ratio of the image container     |
| `objectFit`          | `ObjectFit`         | `'cover'`   | Controls how the image is resized                    |
| `objectPosition`     | `ObjectPosition`    | `'center'`  | Controls image positioning within its container      |
| `rounded`            | `boolean \| string` | `false`     | Applies rounded corners to the image                 |
| `fallbackSrc`        | `string`            | `undefined` | URL for fallback image if main image fails to load   |
| `placeholder`        | `string`            | `undefined` | URL or color for the placeholder                     |
| `caption`            | `React.ReactNode`   | `undefined` | Caption text to display below the image              |
| `containerClassName` | `string`            | `''`        | Additional CSS class for the container               |
| `imageClassName`     | `string`            | `''`        | Additional CSS class for the image                   |
| `captionClassName`   | `string`            | `''`        | Additional CSS class for the caption                 |
| `onLoaded`           | `() => void`        | `undefined` | Called when the image has finished loading           |
| `onError`            | `() => void`        | `undefined` | Called when the image fails to load                  |
| `priority`           | `boolean`           | `false`     | When true, disables lazy loading for priority images |
| `...props`           | `ImgHTMLAttributes` | -           | Any additional props are passed to the img element   |

### Types

```tsx
type AspectRatio = '1/1' | '4/3' | '16/9' | '21/9' | '3/4' | '9/16' | string;
type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
type ObjectPosition =
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | string;
```

## Examples

### Basic Image

```tsx
<Image src="/images/landscape.jpg" alt="Beautiful mountain landscape" />
```

### With Aspect Ratio and Object Fit

```tsx
<Image
  src="/images/profile.jpg"
  alt="Profile picture"
  aspectRatio="1/1"
  objectFit="cover"
  rounded="full"
/>
```

### With Placeholder and Fallback

```tsx
<Image
  src="/images/product.jpg"
  alt="Product image"
  placeholder="#f0f0f0"
  fallbackSrc="/images/product-placeholder.jpg"
  onError={() => console.log('Image failed to load')}
/>
```

### Gallery with Different Aspect Ratios

```tsx
<div className="grid grid-cols-3 gap-4">
  <Image
    src="/images/landscape1.jpg"
    alt="Landscape"
    aspectRatio="16/9"
    rounded="md"
  />
  <Image
    src="/images/portrait.jpg"
    alt="Portrait"
    aspectRatio="3/4"
    rounded="md"
  />
  <Image src="/images/square.jpg" alt="Square" aspectRatio="1/1" rounded="md" />
</div>
```

### With Caption

```tsx
<Image
  src="/images/chart.jpg"
  alt="Data visualization chart"
  caption={
    <span>
      <strong>Figure 1:</strong> Annual revenue growth by quarter
    </span>
  }
/>
```

## Accessibility

The Image component has been designed with accessibility in mind:

- Required `alt` attribute for screen readers
- Maintains aspect ratio to prevent layout shifts
- Supports keyboard focus and navigation
- Proper ARIA attributes and semantic HTML
- Caption support for additional context

## Customization

The Image component can be customized using the provided className props:

```tsx
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  containerClassName="my-custom-container"
  imageClassName="my-custom-image"
  captionClassName="my-custom-caption"
/>
```

You can also customize the loading and error behavior using the callback props:

```tsx
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  onLoaded={() => console.log('Image loaded successfully')}
  onError={() => console.log('Image failed to load')}
/>
```

## Best Practices

- Always provide a meaningful `alt` text for screen readers
- Use the appropriate `aspectRatio` to prevent layout shifts
- Provide a `fallbackSrc` for reliability
- Use `placeholder` for better user experience during loading
- Set `priority` to `true` for above-the-fold images
- Consider using WebP or AVIF formats for better performance
- Optimize images before using them in your application
