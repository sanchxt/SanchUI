import React from 'react';
import { cn } from '@/utils/cn';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The variant style of the label
   */
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'muted';
  /**
   * Whether the label should show a required indicator
   */
  required?: boolean;
  /**
   * Custom content for the required indicator
   */
  requiredIndicator?: React.ReactNode;
  /**
   * Whether the label should be visually hidden but still accessible to screen readers
   */
  srOnly?: boolean;
  /**
   * The size of the label
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional class names to apply to the label
   */
  className?: string;
  /**
   * The children of the label
   */
  children: React.ReactNode;
  /**
   * Ref to the underlying label element
   */
  ref?: React.Ref<HTMLLabelElement>;
}

function Label({
  variant = 'default',
  required = false,
  requiredIndicator = '*',
  srOnly = false,
  size = 'md',
  className = '',
  children,
  ref,
  ...props
}: LabelProps) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const variantClasses = {
    default: 'text-foreground',
    secondary: 'text-secondary-foreground',
    destructive: 'text-destructive',
    success: 'text-success',
    muted: 'text-muted-foreground',
  };

  // screen reader only class
  const srOnlyClass = srOnly
    ? 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0'
    : '';

  return (
    <label
      ref={ref}
      className={cn(
        'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        sizeClasses[size],
        variantClasses[variant],
        srOnlyClass,
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span
          className={cn(
            'ml-1',
            variant === 'destructive' ? 'text-destructive' : 'text-destructive'
          )}
          aria-hidden="true"
        >
          {requiredIndicator}
        </span>
      )}
    </label>
  );
}

Label.displayName = 'Label';

export { Label };
