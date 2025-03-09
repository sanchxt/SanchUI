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
   * Enables password visibility toggle for password inputs
   */
  showPasswordToggle?: boolean;
  /**
   * Custom icon for show password
   */
  showPasswordIcon?: React.ReactNode;
  /**
   * Custom icon for hide password
   */
  hidePasswordIcon?: React.ReactNode;
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
  showPasswordToggle = false,
  showPasswordIcon,
  hidePasswordIcon,
  ref,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const isPasswordInput = type === 'password';

  const actualType = isPasswordInput && showPassword ? 'text' : type;

  // default password icons if not provided
  const defaultShowPasswordIcon = (
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
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const defaultHidePasswordIcon = (
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
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );

  // create password toggle button if enabled & input type = 'password'
  const passwordToggle =
    isPasswordInput && showPasswordToggle ? (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="focus:outline-none text-muted-foreground hover:text-foreground transition-colors"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        {showPassword
          ? hidePasswordIcon || defaultHidePasswordIcon
          : showPasswordIcon || defaultShowPasswordIcon}
      </button>
    ) : null;

  // if password toggle's enabled, it takes precedence over rightAddon
  const effectiveRightAddon =
    isPasswordInput && showPasswordToggle ? passwordToggle : rightAddon;

  const hasAddons = leftAddon || effectiveRightAddon;

  const input = (
    <input
      type={actualType}
      className={cn(
        // base styles
        'flex w-full bg-transparent transition-all',
        'text-foreground placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-60',

        // variants styles
        {
          // outline variant
          'border border-input rounded-md shadow-sm': variant === 'outline',
          'hover:border-primary/70 focus-visible:border-primary focus-visible:ring-primary/30':
            variant === 'outline' && !isInvalid,
          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30':
            variant === 'outline' && isInvalid,

          // filled variant
          'bg-secondary/50 border-0 rounded-md shadow-sm': variant === 'filled',
          'hover:bg-secondary/70 focus-visible:bg-secondary/70 focus-visible:ring-primary/30':
            variant === 'filled' && !isInvalid,
          'bg-destructive/10 hover:bg-destructive/15 focus-visible:bg-destructive/15 focus-visible:ring-destructive/30':
            variant === 'filled' && isInvalid,

          // flushed variant
          'border-0 border-b-2 border-input rounded-none px-0':
            variant === 'flushed',
          'hover:border-primary/70 focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:ring-offset-0':
            variant === 'flushed' && !isInvalid,
          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 focus-visible:ring-offset-0':
            variant === 'flushed' && isInvalid,

          // unstyled variant
          'border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0':
            variant === 'unstyled',
          'rounded-none': variant === 'unstyled' || variant === 'flushed',
        },

        // inputSize styles
        variant !== 'unstyled' && {
          'h-8 px-3 py-1 text-sm': inputSize === 'sm',
          'h-10 px-4 py-2 text-base': inputSize === 'md',
          'h-12 px-5 py-3 text-lg': inputSize === 'lg',
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

  return (
    <div
      className={cn(
        'flex w-full items-center relative',
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
              'h-8 px-3 rounded-l-md': inputSize === 'sm',
              'h-10 px-3 rounded-l-md': inputSize === 'md',
              'h-12 px-4 rounded-l-md': inputSize === 'lg',
              'border-destructive': isInvalid,
              'border-0 border-b-2 rounded-none': variant === 'flushed',
              'border-0 rounded-none': variant === 'unstyled',
              'shadow-sm': variant === 'outline' || variant === 'filled',
            }
          )}
        >
          {leftAddon}
        </div>
      )}

      {input}

      {/* right addon */}
      {effectiveRightAddon && (
        <div
          className={cn(
            'flex items-center justify-center border border-l-0 border-input bg-muted/60 text-muted-foreground',
            {
              'h-8 px-3 rounded-r-md': inputSize === 'sm',
              'h-10 px-3 rounded-r-md': inputSize === 'md',
              'h-12 px-4 rounded-r-md': inputSize === 'lg',
              'border-destructive': isInvalid,
              'border-0 border-b-2 rounded-none': variant === 'flushed',
              'border-0 rounded-none': variant === 'unstyled',
              'shadow-sm': variant === 'outline' || variant === 'filled',
            }
          )}
        >
          {effectiveRightAddon}
        </div>
      )}
    </div>
  );
}

export { Input };
