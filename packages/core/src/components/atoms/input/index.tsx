import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional container to wrap the input
   */
  wrapperClassName?: string;
  /**
   * Displays the input in an error state
   */
  isInvalid?: boolean;
  /**
   * Add icons or elements before the input
   */
  leftAddon?: React.ReactNode;
  /**
   * Add icons or elements after the input
   */
  rightAddon?: React.ReactNode;
  /**
   * Changes the size of the input
   */
  inputSize?: 'sm' | 'md' | 'lg';
  /**
   * Changes the visual style of the input
   */
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  /**
   * Reference to the input element
   */
  ref?: React.Ref<HTMLInputElement>;
}

function Input({
  className,
  wrapperClassName,
  type = 'text',
  isInvalid = false,
  leftAddon,
  rightAddon,
  inputSize = 'md',
  variant = 'outline',
  disabled,
  required,
  ref,
  ...props
}: InputProps) {
  const hasAddons = leftAddon || rightAddon;

  const input = (
    <input
      type={type}
      className={cn(
        // base styles
        'flex w-full bg-transparent transition-colors',
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

        // inputSize styls
        variant !== 'unstyled' && {
          'h-8 px-3 text-sm': inputSize === 'sm',
          'h-10 px-4 text-base': inputSize === 'md',
          'h-12 px-6 text-lg': inputSize === 'lg',
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
    />
  );

  if (!hasAddons) return input;

  // if addons, wrap everything
  return (
    <div
      className={cn(
        'flex w-full items-center',
        { 'opacity-50 cursor-not-allowed': disabled },
        wrapperClassName
      )}
    >
      {/* Left addon */}
      {leftAddon && (
        <div
          className={cn(
            'flex items-center justify-center border border-r-0 border-input bg-muted',
            {
              'h-8 px-3 rounded-l-md': inputSize === 'sm',
              'h-10 px-3 rounded-l-md': inputSize === 'md',
              'h-12 px-4 rounded-l-md': inputSize === 'lg',
              'border-destructive': isInvalid,
              'border-0 border-b rounded-none': variant === 'flushed',
              'rounded-none': variant === 'unstyled',
            }
          )}
        >
          {leftAddon}
        </div>
      )}

      {input}

      {/* right addon */}
      {rightAddon && (
        <div
          className={cn(
            'flex items-center justify-center border border-l-0 border-input bg-muted',
            {
              'h-8 px-3 rounded-r-md': inputSize === 'sm',
              'h-10 px-3 rounded-r-md': inputSize === 'md',
              'h-12 px-4 rounded-r-md': inputSize === 'lg',
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

export { Input };
