import * as React from 'react';
import { cn } from '../../../utils/cn';

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
  const innerRef = React.useRef<HTMLInputElement>(null);
  const resolvedRef = ref || innerRef;

  // handle indeterminate state
  React.useEffect(() => {
    if (resolvedRef.current)
      resolvedRef.current.indeterminate = indeterminate || false;
  }, [indeterminate, resolvedRef]);

  const checkbox = (
    <input
      type="checkbox"
      className={cn(
        // base styles
        'appearance-none rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'checked:bg-primary checked:border-primary checked:text-primary-foreground',

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

        // indeterminate and checked state styles
        'relative',
        'after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-primary-foreground',
        'checked:after:content-["✓"]',
        {
          'after:text-xs': size === 'sm',
          'after:text-sm': size === 'md',
          'after:text-base': size === 'lg',
          'after:content-["-"] indeterminate:after:content-["-"]':
            indeterminate,
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
  );

  if (!label) return checkbox;

  return (
    <label
      className={cn('flex items-center gap-2', {
        'flex-row-reverse justify-end': labelPlacement === 'start',
        'cursor-not-allowed opacity-50': disabled,
      })}
    >
      {checkbox}
      <span className="text-sm">{label}</span>
    </label>
  );
}

export { Checkbox };
