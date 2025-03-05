import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Changes the size of the radio
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Displays the radio in an error state
   */
  isInvalid?: boolean;
  /**
   * The label for the radio
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

function Radio({
  className,
  size = 'md',
  isInvalid = false,
  disabled,
  required,
  label,
  labelPlacement = 'end',
  ref,
  ...props
}: RadioProps) {
  const radio = (
    <input
      type="radio"
      className={cn(
        // base styles
        'appearance-none rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'checked:border-primary checked:text-primary-foreground',
        // radio checked style - inner circle
        'relative',
        'after:absolute after:rounded-full after:bg-primary after:opacity-0 after:content-[""]',
        'checked:after:opacity-100',

        // size styles - both for outer circle and inner checked circle
        {
          'h-4 w-4 after:left-1 after:top-1 after:h-2 after:w-2': size === 'sm',
          'h-5 w-5 after:left-[5px] after:top-[5px] after:h-[10px] after:w-[10px]':
            size === 'md',
          'h-6 w-6 after:left-[6px] after:top-[6px] after:h-3 after:w-3':
            size === 'lg',
        },

        // invalid state
        {
          'border-destructive focus-visible:ring-destructive': isInvalid,
          'border-input': !isInvalid,
        },

        className
      )}
      ref={ref}
      disabled={disabled}
      required={required}
      aria-invalid={isInvalid}
      {...props}
    />
  );

  if (!label) return radio;

  return (
    <label
      className={cn('flex items-center gap-2', {
        'flex-row-reverse justify-end': labelPlacement === 'start',
        'cursor-not-allowed opacity-50': disabled,
      })}
    >
      {radio}
      <span className="text-sm">{label}</span>
    </label>
  );
}

export { Radio };
