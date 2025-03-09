import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Options to display in the select
   */
  options?: SelectOption[];
  /**
   * Optional container to wrap the select
   */
  wrapperClassName?: string;
  /**
   * Displays the select in an error state
   */
  isInvalid?: boolean;
  /**
   * Add icons or elements before the select
   */
  leftAddon?: React.ReactNode;
  /**
   * Add icons or elements after the select
   */
  rightAddon?: React.ReactNode;
  /**
   * Changes the size of the select
   */
  selectSize?: 'sm' | 'md' | 'lg';
  /**
   * Changes the visual style of the select
   */
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  /**
   * Custom icon for the select dropdown
   */
  chevronIcon?: React.ReactNode;
  /**
   * Reference to the select element
   */
  ref?: React.Ref<HTMLSelectElement>;
}

function Select({
  className,
  wrapperClassName,
  options = [],
  isInvalid = false,
  leftAddon,
  rightAddon,
  selectSize = 'md',
  variant = 'outline',
  disabled,
  required,
  children,
  chevronIcon,
  ref,
  ...props
}: SelectProps) {
  const hasAddons = leftAddon || rightAddon;
  const hasOptions = options && options.length > 0;

  const select = (
    <div className="relative">
      <select
        className={cn(
          // base styles
          'flex w-full bg-transparent transition-all appearance-none',
          'text-foreground font-medium',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60',
          'placeholder:text-muted-foreground',

          // shadow & hover effects
          'shadow-sm dark:shadow-none',
          'hover:shadow hover:border-primary/70 dark:hover:border-primary/60',

          // variants styles
          {
            // outline variant
            'border border-input rounded-md': variant === 'outline',
            'focus-visible:border-primary focus-visible:ring-primary/30 dark:focus-visible:ring-primary/40':
              variant === 'outline' && !isInvalid,
            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30 dark:focus-visible:ring-destructive/40':
              variant === 'outline' && isInvalid,

            // filled variant
            'bg-secondary/50 dark:bg-secondary/30 border-0 rounded-md':
              variant === 'filled',
            'hover:bg-secondary/70 dark:hover:bg-secondary/40 focus-visible:bg-secondary/70 dark:focus-visible:bg-secondary/40 focus-visible:ring-primary/30 dark:focus-visible:ring-primary/40':
              variant === 'filled' && !isInvalid,
            'bg-destructive/10 hover:bg-destructive/15 focus-visible:bg-destructive/15 focus-visible:ring-destructive/30 dark:focus-visible:ring-destructive/40':
              variant === 'filled' && isInvalid,

            // flushed variant
            'border-0 border-b-2 border-input rounded-none px-0':
              variant === 'flushed',
            'hover:border-primary/70 focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-offset-0':
              variant === 'flushed' && !isInvalid,
            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 focus-visible:ring-offset-0':
              variant === 'flushed' && isInvalid,

            // unstyled variant
            'border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 hover:shadow-none':
              variant === 'unstyled',
          },

          // selectSize styles
          variant !== 'unstyled' && {
            'h-8 px-3 text-sm': selectSize === 'sm',
            'h-10 px-4 text-base': selectSize === 'md',
            'h-12 px-5 text-lg': selectSize === 'lg',
          },

          // addon styles
          {
            'rounded-l-none border-l-0': Boolean(leftAddon),
            'rounded-r-none border-r-0': Boolean(rightAddon),
          },

          // focus & hover states
          'focus-visible:ring-offset-background',

          className
        )}
        ref={ref}
        disabled={disabled}
        required={required}
        aria-invalid={isInvalid}
        {...props}
      >
        {hasOptions
          ? options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={option.disabled ? 'text-muted-foreground' : ''}
              >
                {option.label}
              </option>
            ))
          : children}
      </select>
      {chevronIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <div
            className={cn(
              'text-muted-foreground transition-transform duration-200',
              {
                'opacity-60': disabled,
                'text-destructive': isInvalid,
                'mr-3': selectSize === 'lg',
                'mr-2': selectSize === 'md',
                'mr-1': selectSize === 'sm',
              }
            )}
          >
            {chevronIcon}
          </div>
        </div>
      )}
      {!chevronIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <div
            className={cn(
              'text-muted-foreground transition-transform duration-200',
              {
                'opacity-60': disabled,
                'text-destructive': isInvalid,
                'mr-3': selectSize === 'lg',
                'mr-2': selectSize === 'md',
                'mr-1': selectSize === 'sm',
              }
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );

  if (!hasAddons) return select;

  return (
    <div
      className={cn(
        'flex w-full items-center',
        { 'opacity-60 cursor-not-allowed': disabled },
        wrapperClassName
      )}
    >
      {/* left addon */}
      {leftAddon && (
        <div
          className={cn(
            'flex items-center justify-center border border-r-0 border-input bg-muted/60 text-muted-foreground',
            {
              'h-8 px-3 rounded-l-md': selectSize === 'sm',
              'h-10 px-3 rounded-l-md': selectSize === 'md',
              'h-12 px-4 rounded-l-md': selectSize === 'lg',
              'border-destructive': isInvalid,
              'border-0 border-b-2 rounded-none': variant === 'flushed',
              'rounded-none': variant === 'unstyled',
              'shadow-sm': variant === 'outline' || variant === 'filled',
            }
          )}
        >
          {leftAddon}
        </div>
      )}

      {select}

      {/* right addon */}
      {rightAddon && (
        <div
          className={cn(
            'flex items-center justify-center border border-l-0 border-input bg-muted/60 text-muted-foreground',
            {
              'h-8 px-3 rounded-r-md': selectSize === 'sm',
              'h-10 px-3 rounded-r-md': selectSize === 'md',
              'h-12 px-4 rounded-r-md': selectSize === 'lg',
              'border-destructive': isInvalid,
              'border-0 border-b-2 rounded-none': variant === 'flushed',
              'rounded-none': variant === 'unstyled',
              'shadow-sm': variant === 'outline' || variant === 'filled',
            }
          )}
        >
          {rightAddon}
        </div>
      )}
    </div>
  );
}

export { Select };
