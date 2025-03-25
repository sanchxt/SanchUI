# Progress Component

A flexible and customizable progress bar component that provides visual feedback about an ongoing process. The Progress component can be used for file uploads, loading states, form completions, and other processes where users need to see progress.

## Features

- Configurable progress value, min, and max
- Multiple sizes (small, medium, large)
- Different color variants (default, primary, success, destructive, secondary)
- Indeterminate state for unknown progress
- Optional label and value display
- Customizable value formatting
- Inside or outside value positioning
- Animation controls
- Fully accessible with ARIA attributes

## Usage

```tsx
import { Progress } from '@sanch-ui/core';

function MyComponent() {
  return <Progress value={75} label="Uploading file..." showValue />;
}
```

## Component

### Progress

The main progress bar component.

| **Prop**           | **Type**                                                            | **Default**  | **Description**                              |
| ------------------ | ------------------------------------------------------------------- | ------------ | -------------------------------------------- |
| value              | number                                                              | 0            | Current progress value                       |
| max                | number                                                              | 100          | Maximum value                                |
| min                | number                                                              | 0            | Minimum value                                |
| indeterminate      | boolean                                                             | false        | Shows indeterminate loading state            |
| size               | 'sm' \| 'md' \| 'lg'                                                | 'md'         | Size of the progress bar                     |
| color              | 'default' \| 'primary' \| 'success' \| 'destructive' \| 'secondary' | 'default'    | Color variant                                |
| showValue          | boolean                                                             | false        | Displays the current progress value          |
| valueFormat        | 'percentage' \| 'ratio' \| ((value: number, max: number) => string) | 'percentage' | Progress value format                        |
| label              | ReactNode                                                           | undefined    | Label shown above the progress bar           |
| valuePosition      | 'inside' \| 'outside'                                               | 'outside'    | Position of the value text                   |
| className          | string                                                              | undefined    | Additional CSS class for container           |
| trackClassName     | string                                                              | undefined    | Additional CSS class for track               |
| indicatorClassName | string                                                              | undefined    | Additional CSS class for indicator           |
| valueClassName     | string                                                              | undefined    | Additional CSS class for value text          |
| labelClassName     | string                                                              | undefined    | Additional CSS class for label               |
| animate            | boolean                                                             | true         | Enables/disables animation                   |
| progressProps      | React.ComponentPropsWithoutRef<'progress'> & DataAttributes         | undefined    | Additional props for native progress element |

## Accessibility

The Progress component follows best accessibility practices:

- Uses native `<progress>` element for screen readers and semantic meaning
- Includes appropriate ARIA attributes (`aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`)
- Provides `role="region"` for the container to improve navigation
- Visual rendering is accessible with proper contrast ratios
- Respects user preferences for reduced motion when using animations
- Maintains a clear visual state for all progress variations and states
- Consistent visual feedback with proper text alternatives

## Examples

### Basic Progress Bar

```tsx
<Progress value={60} />
```

### With Label and Value

```tsx
<Progress label="Download Progress" value={45} showValue />
```

### Indeterminate Progress

```tsx
<Progress indeterminate label="Loading..." />
```

### Colored Progress Bars

```tsx
<Progress value={75} color="success" />
<Progress value={50} color="destructive" />
<Progress value={30} color="primary" />
```

### Custom Value Format

```tsx
<Progress
  value={250}
  max={500}
  showValue
  valueFormat={(value, max) => `${value}MB of ${max}MB`}
/>
```

### Inside Value Position (Large Size Only)

```tsx
<Progress value={85} showValue valuePosition="inside" size="lg" />
```

### Custom Styling

```tsx
<Progress
  value={60}
  trackClassName="bg-gradient-to-r from-gray-100 to-gray-200"
  indicatorClassName="bg-gradient-to-r from-blue-400 to-purple-500"
  labelClassName="text-blue-500 font-bold"
  valueClassName="text-purple-500"
  label="Custom Styled Progress"
  showValue
/>
```

## Integration Examples

### File Upload Progress

```tsx
function FileUpload() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setProgress(0);

    // Simulate file upload
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div className="space-y-4">
      <Progress
        value={progress}
        label="Uploading file..."
        showValue
        indeterminate={isUploading && progress === 0}
      />

      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  );
}
```

### Multi-Step Form Progress

```tsx
function FormProgress({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between">
        <span className="text-sm">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm">{Math.round(progress)}% complete</span>
      </div>
      <Progress value={progress} color="primary" />
    </div>
  );
}
```

## Design Considerations

1. **Size Selection**: Choose the appropriate size based on the prominence needed:

   - `sm`: For subtle progress indicators in tight spaces
   - `md`: For standard use cases (default)
   - `lg`: For prominent progress indicators with inside value display

2. **Color Semantics**:

   - `default`: Neutral progress without specific meaning
   - `primary`: Main actions and processes
   - `success`: Completed or positive processes
   - `destructive`: Errors or critical processes
   - `secondary`: Background or less important processes

3. **Value Display**:

   - Consider showing values for longer processes to provide more context
   - Use inside value position only for `lg` size to ensure readability
   - Use custom formatters for bytes, time, or other specialized units

4. **Animation**:
   - Enable animations for most cases to provide visual feedback
   - Consider disabling animations for performance-critical applications or for users with reduced motion preferences

## Theming

The Progress component respects the application's theme settings, including dark mode. Colors are derived from the theme variables in your Tailwind configuration.

```tsx
// Example of Progress in dark mode
<div className="dark">
  <Progress value={75} color="primary" label="Download progress" showValue />
</div>
```

## Behavior Notes

- **Value Clamping**: Values are automatically clamped between the `min` and `max` values
- **Indeterminate Mode**: When `indeterminate` is true, the `value` prop is ignored
- **Inside Value**: The value is only displayed inside the progress bar when `size` is set to `lg`
- **Animations**: Transitions are applied to width changes for smooth updates, can be disabled with `animate={false}`

## API Design Decisions

1. **Why separate `trackClassName` and `indicatorClassName`?**
   This allows granular styling control over both the background track and the filled indicator separately.

2. **Why use a native `<progress>` element?**
   The native element provides the best semantics and accessibility for screen readers, even though it's visually hidden.

3. **Why include a `valueFormat` function option?**
   This provides flexibility for complex formatting scenarios beyond simple percentages or ratios.

4. **Why use CSS variables for styling?**
   CSS variables ensure theme consistency and make component styling more maintainable.

## Best Practices

- Always include a descriptive `label` for important processes
- Use `indeterminate` state only when progress cannot be determined
- Include `showValue` for longer processes to keep users informed
- Consider using `color="success"` when a process completes successfully
- Pair the Progress component with descriptive text explaining the current action
- For user-initiated processes, provide a way to cancel the operation when appropriate
- When displaying file operations, consider showing both percentage and actual bytes transferred

## Customization

The Progress component can be extensively customized:

```tsx
// Custom colors and styling
<Progress
  value={60}
  trackClassName="h-3 bg-gray-100 dark:bg-gray-700"
  indicatorClassName="bg-gradient-to-r from-cyan-500 to-blue-500"
  className="w-full max-w-md"
  valueClassName="font-mono text-xs"
  showValue
/>

// Custom animations
<Progress
  value={80}
  indicatorClassName="transition-all duration-1000 ease-in-out"
  animate={true}
/>
```

## Related Components

- **LoadingSpinner**: For loading states without progress indication
- **FileUploadInput**: For file uploads with integrated progress
- **Stepper**: For step-by-step processes with discrete states

## Contribution

Feel free to suggest improvements or report issues for this component on our GitHub repository.
