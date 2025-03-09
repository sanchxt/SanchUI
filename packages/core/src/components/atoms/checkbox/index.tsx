import React, { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Changes the size of the checkbox
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Displays the checkbox in a checked state
   */
  checked?: boolean;
  /**
   * Displays the checkbox in an indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Displays the checkbox in an error state
   */
  isInvalid?: boolean;
  /**
   * The label for the checkbox
   */
  label?: React.ReactNode;
  /**
   * Where to render the label
   */
  labelPlacement?: 'start' | 'end';
  /**
   * Reference to the input element
   */
  ref?: React.RefObject<HTMLInputElement | null>;
}

function Checkbox({
  className,
  size = 'md',
  checked,
  indeterminate,
  isInvalid = false,
  disabled,
  required,
  label,
  labelPlacement = 'end',
  onChange,
  ref,
  ...props
}: CheckboxProps) {
  const innerRef = useRef<HTMLInputElement>(null);
  const resolvedRef = ref || innerRef;

  // handle indeterminate state
  useEffect(() => {
    if (resolvedRef.current)
      resolvedRef.current.indeterminate = indeterminate || false;
  }, [indeterminate, resolvedRef]);

  const checkbox = (
    <div className="relative inline-flex">
      <input
        type="checkbox"
        className={cn(
          // base styles
          'peer appearance-none rounded-md border transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'hover:border-primary/50 dark:hover:border-primary/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'z-10',

          // size styles
          {
            'h-4 w-4': size === 'sm',
            'h-5 w-5': size === 'md',
            'h-6 w-6': size === 'lg',
          },

          // invalid state
          {
            'border-destructive focus-visible:ring-destructive': isInvalid,
            'border-input': !isInvalid,
          },

          className
        )}
        ref={resolvedRef}
        checked={checked}
        disabled={disabled}
        required={required}
        aria-invalid={isInvalid}
        onChange={onChange}
        {...props}
      />

      {/* checked state indicator */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center rounded-md',
          'scale-90 opacity-0 transition-all',
          'peer-checked:scale-100 peer-checked:opacity-100 peer-checked:bg-primary',
          'peer-disabled:opacity-50',
          {
            'text-xs': size === 'sm',
            'text-sm': size === 'md',
            'text-base': size === 'lg',
          }
        )}
      >
        {indeterminate ? (
          <svg
            className="text-primary-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            height="65%"
            width="65%"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        ) : (
          <svg
            className="text-primary-foreground"
            fill="none"
            height="65%"
            width="65%"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
  );

  if (!label) return checkbox;

  return (
    <label
      className={cn('flex items-center gap-2.5 text-foreground', {
        'flex-row-reverse justify-end': labelPlacement === 'start',
        'cursor-not-allowed opacity-50': disabled,
        'cursor-pointer': !disabled,
      })}
    >
      {checkbox}
      <span
        className={cn({
          'text-xs': size === 'sm',
          'text-sm': size === 'md',
          'text-sm font-medium': size === 'lg',
        })}
      >
        {label}
      </span>
    </label>
  );
}

export { Checkbox };
