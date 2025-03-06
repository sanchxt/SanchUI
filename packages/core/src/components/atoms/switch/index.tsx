import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Optional container to wrap the switch
   */
  wrapperClassName?: string;
  /**
   * The size of the switch
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * If true, the switch is checked
   */
  checked?: boolean;
  /**
   * Default state of the switch
   */
  defaultChecked?: boolean;
  /**
   * If true, the switch is disabled
   */
  disabled?: boolean;
  /**
   * The label for the switch
   */
  label?: React.ReactNode;
  /**
   * The position of the label
   */
  labelPosition?: 'left' | 'right';
  /**
   * Reference to the input element
   */
  ref?: React.Ref<HTMLInputElement>;
  /**
   * Color variant of the switch
   */
  variant?: 'default' | 'primary' | 'success' | 'destructive';
}

function Switch({
  className,
  wrapperClassName,
  size = 'md',
  checked,
  defaultChecked,
  disabled,
  label,
  labelPosition = 'right',
  variant = 'primary',
  ref,
  ...props
}: SwitchProps) {
  const switchComponent = (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          // base styles
          'relative rounded-full transition-colors',
          'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',

          // size variants
          {
            'h-5 w-9': size === 'sm',
            'h-6 w-11': size === 'md',
            'h-7 w-14': size === 'lg',
          },

          // color variants (unchecked)
          'bg-muted',

          // color variants (checked)
          {
            'peer-checked:bg-primary': variant === 'primary',
            'peer-checked:bg-success': variant === 'success',
            'peer-checked:bg-destructive': variant === 'destructive',
            'peer-checked:bg-foreground': variant === 'default',
          },

          className
        )}
      >
        <div
          className={cn(
            // base styles (thumb)
            'absolute rounded-full bg-background transition-transform',
            'flex items-center justify-center',
            'transform-gpu',

            // size variants (thumb)
            {
              'h-3 w-3 translate-x-1 peer-checked:translate-x-5': size === 'sm',
              'h-4 w-4 translate-x-1 peer-checked:translate-x-6': size === 'md',
              'h-5 w-5 translate-x-1 peer-checked:translate-x-8': size === 'lg',
            },

            // shadow & hover effects
            'shadow-sm',
            'peer-disabled:shadow-none',
            {
              'ring-primary': variant === 'primary',
              'ring-success': variant === 'success',
              'ring-destructive': variant === 'destructive',
              'ring-foreground': variant === 'default',
            }
          )}
        />
      </div>
    </div>
  );

  if (!label) return switchComponent;

  return (
    <label
      className={cn(
        'inline-flex items-center',
        {
          'opacity-50 cursor-not-allowed': disabled,
          'flex-row-reverse': labelPosition === 'left',
        },
        wrapperClassName
      )}
    >
      {switchComponent}
      <span
        className={cn('text-foreground', {
          'ml-2': labelPosition === 'right',
          'mr-2': labelPosition === 'left',
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-lg': size === 'lg',
          'cursor-pointer': !disabled,
          'cursor-not-allowed': disabled,
        })}
      >
        {label}
      </span>
    </label>
  );
}

export { Switch };
