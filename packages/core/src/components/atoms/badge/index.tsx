import { cn } from '@/utils/cn';
import React from 'react';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Content to display inside the badge
   */
  children: React.ReactNode;

  /**
   * Visual style variant of the badge
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge
   */
  size?: BadgeSize;

  /**
   * Whether to use rounded-full (pill) style
   */
  pill?: boolean;

  /**
   * Makes the badge use an outline style instead of filled
   */
  outline?: boolean;

  /**
   * Show dot indicator before badge content
   */
  withDot?: boolean;

  /**
   * Badge dot color (uses the variant color by default)
   */
  dotColor?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Ref for the badge element
   */
  ref?: React.Ref<HTMLSpanElement>;
}

/**
 * Badge component for displaying short statuses, counts or labels
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  pill = false,
  outline = false,
  withDot = false,
  dotColor,
  className,
  ref,
  ...props
}: BadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };

  // dot color based on variant (if not provided)
  const getDotColor = () => {
    if (dotColor) return dotColor;

    const variantColorMap = {
      default: 'bg-foreground',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      success: 'bg-success',
      warning: 'bg-amber-500',
      error: 'bg-destructive',
      info: 'bg-blue-500',
    };

    return variantColorMap[variant];
  };

  // base variant styles
  const variantStyles = {
    default: outline ? '' : 'bg-secondary text-secondary-foreground',

    primary: outline ? '' : 'bg-primary text-primary-foreground',

    secondary: outline ? '' : 'bg-secondary text-secondary-foreground',

    success: outline ? '' : 'bg-success text-success-foreground',

    warning: outline ? '' : 'bg-amber-500 text-white',

    error: outline ? '' : 'bg-destructive text-destructive-foreground',

    info: outline ? '' : 'bg-blue-500 text-white',
  };

  // outline specific styles
  const outlineStyles = {
    default: 'border-border text-foreground',
    primary: 'border-primary text-primary',
    secondary: 'border-secondary text-secondary-foreground',
    success: 'border-success text-success',
    warning: 'border-amber-500 text-amber-600 dark:text-amber-400',
    error: 'border-destructive text-destructive',
    info: 'border-blue-500 text-blue-600 dark:text-blue-400',
  };

  return (
    <span
      ref={ref}
      className={cn(
        // base styles
        'inline-flex items-center justify-center font-medium transition-colors',
        'border border-transparent',
        sizeClasses[size],

        // border radius - pill or rounded
        pill ? 'rounded-full' : 'rounded-md',

        // variant styles (filled or outline)
        outline ? outlineStyles[variant] : variantStyles[variant],

        // outline base styling
        outline && 'bg-transparent',

        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn(
            'mr-1 inline-block h-1.5 w-1.5 rounded-full',
            getDotColor()
          )}
        />
      )}
      {children}
    </span>
  );
};

export { Badge };
