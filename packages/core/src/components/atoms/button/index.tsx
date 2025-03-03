import * as React from 'react';
import { cn } from '../../../utils/cn';

let Loader2: React.ComponentType<{ className?: string }>;
try {
  Loader2 = require('lucide-react').Loader2;
} catch (e) {
  // fallback loader
  Loader2 = ({ className }: { className?: string }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'danger'
    | 'success'
    | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

function Button({
  className,
  variant = 'default',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ref,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(
        // base
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',

        // variants
        {
          'bg-primary text-primary-foreground hover:bg-primary/90':
            variant === 'default',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80':
            variant === 'secondary',
          'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground':
            variant === 'outline',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90':
            variant === 'danger',
          'bg-success text-success-foreground hover:bg-success/90':
            variant === 'success',
          'hover:bg-accent hover:text-accent-foreground text-foreground':
            variant === 'ghost',
        },

        // size
        {
          'h-9 px-3 text-sm gap-1.5': size === 'sm',
          'h-10 px-4 text-base gap-2': size === 'md',
          'h-11 px-8 text-lg gap-2.5': size === 'lg',
        },

        // loading
        isLoading &&
          'relative children:text-transparent transition-none hover:children:text-transparent',
        className
      )}
      disabled={isDisabled}
      ref={ref}
      aria-label={
        isLoading
          ? `${ariaLabel || children?.toString() || 'button'} loading`
          : ariaLabel
      }
      aria-busy={isLoading}
      {...props}
    >
      {/* loading spinner */}
      {isLoading && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-current"
          aria-hidden="true"
        >
          <Loader2 className="h-[1.2em] w-[1.2em] animate-spin" />
        </span>
      )}

      {/* content */}
      <div className={cn('flex items-center gap-2', isLoading && 'invisible')}>
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>
    </button>
  );
}

Button.displayName = 'Button';

export { Button };
