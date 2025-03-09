import React from 'react';
import { cn } from '@/utils/cn';

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
  const trackClasses = cn(
    // base styles
    'relative rounded-full transition-all duration-200',
    'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
    'hover:scale-[1.02] active:scale-[0.98]',
    'border',

    // size
    {
      'h-5 w-9': size === 'sm',
      'h-6 w-11': size === 'md',
      'h-7 w-14': size === 'lg',
    },

    // color variants (unchecked)
    'bg-muted border-input',

    // ring & focus colors by variant
    {
      'peer-focus-visible:ring-primary/60': variant === 'primary',
      'peer-focus-visible:ring-success/60': variant === 'success',
      'peer-focus-visible:ring-destructive/60': variant === 'destructive',
      'peer-focus-visible:ring-foreground/60': variant === 'default',
    },

    // color variants (checked)
    {
      'peer-checked:bg-primary peer-checked:border-primary':
        variant === 'primary',
      'peer-checked:bg-success peer-checked:border-success':
        variant === 'success',
      'peer-checked:bg-destructive peer-checked:border-destructive':
        variant === 'destructive',
      'peer-checked:bg-foreground peer-checked:border-foreground':
        variant === 'default',
    },

    className
  );

  // thumb classes
  const thumbClasses = cn(
    // base styles (thumb)
    'absolute rounded-full bg-background',
    'flex items-center justify-center',
    'transition-transform duration-200 ease-out',
    'shadow-md dark:shadow-md/40',
    'border-2',
    'top-1/2 -translate-y-1/2',
    'peer-checked:scale-[0.85]',

    // size variants (thumb)
    {
      'h-4 w-4': size === 'sm',
      'h-5 w-5': size === 'md',
      'h-6 w-6': size === 'lg',
    },

    // Position and transform for different sizes
    {
      'translate-x-0.5 peer-checked:translate-x-4': size === 'sm',
      'translate-x-0.5 peer-checked:translate-x-5': size === 'md',
      'translate-x-0.5 peer-checked:translate-x-7': size === 'lg',
    },

    // thumb border color
    'border-input/20',
    'peer-checked:border-transparent',

    // thumb colors
    {
      'peer-checked:bg-white':
        variant === 'primary' ||
        variant === 'success' ||
        variant === 'destructive',
      'peer-checked:bg-background': variant === 'default',
    },

    // disabled styles
    'peer-disabled:shadow-none'
  );

  // icon placeholder styles (optional checkmark or icon)
  const iconClasses = cn(
    'absolute inset-0 flex items-center justify-center',
    'opacity-0 peer-checked:opacity-100 transition-opacity duration-200',
    {
      'text-primary scale-0 peer-checked:scale-75': variant === 'primary',
      'text-success scale-0 peer-checked:scale-75': variant === 'success',
      'text-destructive scale-0 peer-checked:scale-75':
        variant === 'destructive',
      'text-foreground scale-0 peer-checked:scale-75': variant === 'default',
    }
  );

  return (
    <label
      className={cn(
        'inline-flex items-center transition-opacity gap-x-2',
        {
          'opacity-50 cursor-not-allowed': disabled,
          'cursor-pointer': !disabled,
          'flex-row-reverse': labelPosition === 'left',
        },
        wrapperClassName
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <div className={trackClasses} data-testid="switch-track" />
        <div className={thumbClasses} data-testid="switch-thumb">
          <div className={iconClasses}>{/* TODO: add an icon here */}</div>
        </div>
      </div>

      {label && (
        <span
          className={cn('text-foreground', {
            'mr-1': labelPosition === 'left',
            'text-sm': size === 'sm',
            'text-base': size === 'md',
            'text-lg': size === 'lg',
            'font-medium': checked || defaultChecked,
          })}
        >
          {label}
        </span>
      )}
    </label>
  );
}

export { Switch };
