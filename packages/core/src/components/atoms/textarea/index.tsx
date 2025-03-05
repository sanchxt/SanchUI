import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Displays the textarea in an error state
   */
  isInvalid?: boolean;
  /**
   * Automatically adjusts the height to fit content
   */
  autoResize?: boolean;
  /**
   * Maximum number of rows before scrolling
   * Only applies when autoResize is true
   */
  maxRows?: number;
  /**
   * Minimum number of rows to display
   */
  minRows?: number;
  /**
   * Changes the visual style of the textarea
   */
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  /**
   * Optional text/element to display before value count
   */
  counterPrefix?: React.ReactNode;
  /**
   * Show a character count, optionally with a maximum
   */
  showCount?: boolean;
  /**
   * Limits the number of characters
   */
  maxLength?: number;
  /**
   * Reference to the textarea element
   */
  ref?: React.Ref<HTMLTextAreaElement>;
}

function Textarea({
  className,
  isInvalid = false,
  autoResize = false,
  maxRows,
  minRows = 3,
  variant = 'outline',
  counterPrefix,
  showCount = false,
  maxLength,
  value,
  onChange,
  onInput,
  disabled,
  required,
  ref,
  ...props
}: TextareaProps) {
  // ref to handle auto resize
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [textLength, setTextLength] = React.useState<number>(
    typeof value === 'string' ? value.length : 0
  );

  // connect external ref to interal (if provided)
  React.useEffect(() => {
    if (ref && typeof ref === 'function') {
      ref(textareaRef.current);
    } else if (ref && 'current' in ref) {
      (ref as React.RefObject<HTMLTextAreaElement | null>).current =
        textareaRef.current;
    }
  }, [ref]);

  const handleResize = React.useCallback(() => {
    if (!autoResize || !textareaRef.current) return;

    const textarea = textareaRef.current;

    // reset height
    textarea.style.height = 'auto';

    // calc base line height
    const lineHeight = parseInt(
      getComputedStyle(textarea).lineHeight || '24',
      10
    );

    // calc min and max heights
    const minHeight = `${Math.max(minRows, 1) * lineHeight}px`;
    let maxHeight = '';

    if (maxRows) maxHeight = `${maxRows * lineHeight}px`;

    // set height to scroll height
    const newHeight = `${textarea.scrollHeight}px`;

    // apply heights with constraints
    textarea.style.minHeight = minHeight;
    if (maxHeight) textarea.style.maxHeight = maxHeight;
    textarea.style.height = newHeight;

    // overflow only if content exceeds max height
    if (maxHeight && textarea.scrollHeight > maxRows! * lineHeight) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  }, [autoResize, maxRows, minRows]);

  // handle input changes for auto-resize & character count
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      // update character count
      if (showCount) setTextLength(e.target.value.length);

      onChange?.(e);

      // resize after state updates
      setTimeout(handleResize, 0);
    },
    [onChange, handleResize, showCount]
  );

  // merged onInput handler
  const handleInput = React.useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      onInput?.(e);
      handleResize();
    },
    [onInput, handleResize]
  );

  // initial resize on mount / value change / autoResize change
  React.useEffect(() => {
    handleResize();

    // update character count on value change
    if (showCount && typeof value === 'string') {
      setTextLength(value.length);
    }
  }, [value, autoResize, handleResize, showCount]);

  return (
    <div className="w-full">
      <textarea
        className={cn(
          // base styles
          'flex w-full bg-transparent transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'placeholder:text-muted-foreground',
          'resize-none',
          !autoResize && 'resize-vertical',

          // handle variants
          {
            // outline variant
            'border border-input rounded-md p-3': variant === 'outline',
            'hover:border-primary focus-visible:border-primary':
              variant === 'outline' && !isInvalid,
            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive':
              variant === 'outline' && isInvalid,

            // filled variant
            'bg-secondary/50 border-0 rounded-md p-3': variant === 'filled',
            'hover:bg-secondary focus-visible:bg-secondary':
              variant === 'filled' && !isInvalid,
            'bg-destructive/10 focus-visible:ring-destructive':
              variant === 'filled' && isInvalid,

            // flushed variant
            'border-0 border-b border-input rounded-none px-0 py-2':
              variant === 'flushed',
            'hover:border-primary': variant === 'flushed' && !isInvalid,
            'border-destructive focus-visible:border-destructive':
              variant === 'flushed' && isInvalid,

            // unstyled variant
            'border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0':
              variant === 'unstyled',
          },

          className
        )}
        ref={textareaRef}
        disabled={disabled}
        required={required}
        onChange={handleInputChange}
        onInput={handleInput}
        value={value}
        maxLength={maxLength}
        rows={minRows}
        aria-invalid={isInvalid}
        {...props}
      />

      {/* character count */}
      {showCount && (
        <div
          className={cn(
            'flex justify-end text-sm text-muted-foreground mt-1',
            isInvalid && textLength > (maxLength || 0) && 'text-destructive'
          )}
        >
          {counterPrefix && <span className="mr-1">{counterPrefix}</span>}
          <span>
            {textLength}
            {maxLength ? `/${maxLength}` : ''}
          </span>
        </div>
      )}
    </div>
  );
}

export { Textarea };
