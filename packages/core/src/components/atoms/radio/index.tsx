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
        'appearance-none rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        'checked:border-primary checked:border-[5px] checked:bg-background',
        'dark:checked:bg-background',

        // hover effects
        'hover:border-primary/70 dark:hover:border-primary/60',
        'hover:shadow-sm',

        // focus state
        'focus-visible:ring-primary/30 dark:focus-visible:ring-primary/40',
        'focus-visible:ring-offset-background',

        // size styles
        {
          'h-4 w-4': size === 'sm',
          'h-5 w-5': size === 'md',
          'h-6 w-6': size === 'lg',
        },

        // invalid state
        {
          'border-destructive hover:border-destructive/70 focus-visible:ring-destructive/30':
            isInvalid,
          'border-input dark:border-input': !isInvalid,
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
      className={cn('flex items-center gap-2.5 transition-opacity', {
        'flex-row-reverse justify-end': labelPlacement === 'start',
        'cursor-not-allowed opacity-60': disabled,
        'cursor-pointer': !disabled,
      })}
    >
      {radio}
      <span
        className={cn('text-sm text-foreground dark:text-foreground', {
          'text-muted-foreground': disabled,
          'font-medium': props.checked || props.defaultChecked,
        })}
      >
        {label}
      </span>
    </label>
  );
}

export { Radio };
