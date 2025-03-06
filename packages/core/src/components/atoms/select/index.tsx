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
          'flex w-full bg-transparent transition-colors appearance-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'placeholder:text-muted-foreground',

          // variants styles
          {
            // outline variant
            'border border-input rounded-md': variant === 'outline',
            'hover:border-primary focus-visible:border-primary':
              variant === 'outline' && !isInvalid,
            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive':
              variant === 'outline' && isInvalid,

            // filled variant
            'bg-secondary/50 border-0 rounded-md': variant === 'filled',
            'hover:bg-secondary focus-visible:bg-secondary':
              variant === 'filled' && !isInvalid,
            'bg-destructive/10 focus-visible:ring-destructive':
              variant === 'filled' && isInvalid,

            // flushed variant
            'border-0 border-b border-input rounded-none px-0':
              variant === 'flushed',
            'hover:border-primary': variant === 'flushed' && !isInvalid,
            'focus-visible:border-primary': variant === 'flushed' && !isInvalid,
            'border-destructive focus-visible:ring-destructive':
              variant === 'flushed' && isInvalid,

            // unstyled variant
            'border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0':
              variant === 'unstyled',
          },

          // selectSize styles
          variant !== 'unstyled' && {
            'h-8 px-3 text-sm': selectSize === 'sm',
            'h-10 px-4 text-base': selectSize === 'md',
            'h-12 px-6 text-lg': selectSize === 'lg',
          },

          // addon styles
          {
            'rounded-l-none border-l-0': Boolean(leftAddon),
            'rounded-r-none border-r-0': Boolean(rightAddon),
          },

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
              >
                {option.label}
              </option>
            ))
          : children}
      </select>
      {chevronIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <div
            className={cn('text-muted-foreground', {
              'opacity-50': disabled,
              'text-destructive': isInvalid,
              'mr-3': selectSize === 'lg',
              'mr-2': selectSize === 'md',
              'mr-1': selectSize === 'sm',
            })}
          >
            {chevronIcon}
          </div>
        </div>
      )}
      {!chevronIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <div
            className={cn('text-muted-foreground', {
              'opacity-50': disabled,
              'text-destructive': isInvalid,
              'mr-3': selectSize === 'lg',
              'mr-2': selectSize === 'md',
              'mr-1': selectSize === 'sm',
            })}
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
        { 'opacity-50 cursor-not-allowed': disabled },
        wrapperClassName
      )}
    >
      {/* left addon */}
      {leftAddon && (
        <div
          className={cn(
            'flex items-center justify-center border border-r-0 border-input bg-muted',
            {
              'h-8 px-3 rounded-l-md': selectSize === 'sm',
              'h-10 px-3 rounded-l-md': selectSize === 'md',
              'h-12 px-4 rounded-l-md': selectSize === 'lg',
              'border-destructive': isInvalid,
              'border-0 border-b rounded-none': variant === 'flushed',
              'rounded-none': variant === 'unstyled',
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
            'flex items-center justify-center border border-l-0 border-input bg-muted',
            {
              'h-8 px-3 rounded-r-md': selectSize === 'sm',
              'h-10 px-3 rounded-r-md': selectSize === 'md',
              'h-12 px-4 rounded-r-md': selectSize === 'lg',
              'border-destructive': isInvalid,
              'border-0 border-b rounded-none': variant === 'flushed',
              'rounded-none': variant === 'unstyled',
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
