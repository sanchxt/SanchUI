import * as React from 'react';
import { cn } from '@/utils/cn';

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
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  // connect external ref to internal (if provided)
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

    // reset height to auto to recalculate
    textarea.style.height = 'auto';

    const lineHeight = parseInt(
      getComputedStyle(textarea).lineHeight || '24',
      10
    );
    const minHeight = `${Math.max(minRows, 1) * lineHeight}px`;
    let maxHeight = maxRows ? `${maxRows * lineHeight}px` : '';

    textarea.style.minHeight = minHeight;
    if (maxHeight) textarea.style.maxHeight = maxHeight;

    const newHeight = `${textarea.scrollHeight}px`;
    textarea.style.height = newHeight;

    textarea.style.overflowY =
      maxHeight && textarea.scrollHeight > maxRows! * lineHeight
        ? 'auto'
        : 'hidden';
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

  // Focus handlers
  const handleFocus = React.useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    },
    [props]
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    },
    [props]
  );

  // initial resize on mount / value change / autoResize change
  React.useEffect(() => {
    handleResize();

    // update character count on value change
    if (showCount && typeof value === 'string') {
      setTextLength(value.length);
    }
  }, [value, autoResize, handleResize, showCount]);

  const isOverLimit = maxLength && textLength > maxLength;
  const isNearLimit =
    maxLength && textLength >= maxLength * 0.9 && textLength < maxLength;

  return (
    <div className="w-full">
      <textarea
        className={cn(
          // base styles
          'flex w-full bg-transparent',
          'text-foreground placeholder:text-muted-foreground/70',
          'focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-60',
          autoResize
            ? 'transition-all duration-200 resize-none'
            : 'resize-vertical',
          // handle variants
          {
            // outline variant
            'border border-input rounded-md p-3 shadow-sm':
              variant === 'outline',
            'hover:border-primary/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-1':
              variant === 'outline' && !isInvalid,
            'border-destructive focus-visible:border-destructive focus-visible:ring-2 focus-visible:ring-destructive/30 focus-visible:ring-offset-1':
              variant === 'outline' && isInvalid,

            // filled variant
            'bg-secondary/50 border-0 rounded-md p-3': variant === 'filled',
            'hover:bg-secondary/70 focus-visible:bg-secondary/70 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-1':
              variant === 'filled' && !isInvalid,
            'bg-destructive/10 hover:bg-destructive/15 focus-visible:bg-destructive/15 focus-visible:ring-2 focus-visible:ring-destructive/30 focus-visible:ring-offset-1':
              variant === 'filled' && isInvalid,

            // flushed variant
            'border-0 border-b-2 border-input rounded-none px-0 py-2 transition-colors':
              variant === 'flushed',
            'hover:border-primary/70 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/20 focus-visible:ring-offset-0':
              variant === 'flushed' && !isInvalid,
            'border-destructive focus-visible:border-destructive focus-visible:ring-1 focus-visible:ring-destructive/20 focus-visible:ring-offset-0':
              variant === 'flushed' && isInvalid,

            // unstyled variant
            'border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 shadow-none':
              variant === 'unstyled',
          },

          className
        )}
        ref={textareaRef}
        disabled={disabled}
        required={required}
        onChange={handleInputChange}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        maxLength={maxLength}
        rows={minRows}
        aria-invalid={!!(isInvalid || isOverLimit)}
        {...props}
      />

      {/* character count */}
      {showCount && (
        <div
          data-testid="char-count"
          className={cn(
            'flex justify-end items-center text-sm mt-1.5 transition-colors duration-200',
            isOverLimit
              ? 'text-destructive'
              : isNearLimit
                ? 'text-yellow-500 dark:text-yellow-400'
                : isFocused
                  ? 'text-primary/80'
                  : 'text-muted-foreground'
          )}
        >
          {counterPrefix && (
            <span className="mr-1 select-none">{counterPrefix}</span>
          )}
          <span
            className={cn(
              'font-medium transition-all',
              isOverLimit && 'font-semibold',
              maxLength &&
                textLength === maxLength &&
                'animate-pulse text-yellow-600 dark:text-yellow-400'
            )}
          >
            {textLength}
            {maxLength ? (
              <span
                className={cn(
                  isOverLimit
                    ? 'text-destructive font-semibold'
                    : isNearLimit
                      ? 'text-yellow-500 dark:text-yellow-400'
                      : 'text-muted-foreground/80'
                )}
              >
                /{maxLength}
              </span>
            ) : null}
          </span>
        </div>
      )}
    </div>
  );
}

export { Textarea };
