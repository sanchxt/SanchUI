import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the spinner
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * The visual style variant of the spinner
   * @default 'border'
   */
  variant?: 'border' | 'dots' | 'grow';

  /**
   * The color scheme of the spinner
   * @default 'primary'
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'destructive'
    | 'success'
    | 'muted';

  /**
   * Set to true to make the spinner take up no space, suitable for inline use
   * @default false
   */
  inline?: boolean;

  /**
   * Accessible label for the spinner
   * @default 'Loading'
   */
  label?: string;
}

/**
 * Spinner component for loading states
 */
function Spinner({
  size = 'md',
  variant = 'border',
  color = 'primary',
  inline = false,
  label = 'Loading',
  className,
  ...props
}: SpinnerProps) {
  // border variant - circle with rotating border
  if (variant === 'border') {
    return (
      <div
        role="status"
        aria-label={label}
        className={cn(
          'animate-spin rounded-full border-current',
          'border-t-transparent',
          {
            // size styles
            'size-3 border-2': size === 'xs',
            'size-4 border-2': size === 'sm',
            'size-6 border-3': size === 'md',
            'size-8 border-3': size === 'lg',
            'size-10 border-4': size === 'xl',

            // color styles
            'text-primary': color === 'primary',
            'text-secondary': color === 'secondary',
            'text-accent': color === 'accent',
            'text-destructive': color === 'destructive',
            'text-success': color === 'success',
            'text-muted-foreground': color === 'muted',

            // if inline, no margins
            'm-0': inline,
          },
          className
        )}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // dots variant - three bouncing dots
  if (variant === 'dots') {
    const dotBaseClasses = cn('mx-1 rounded-full animate-bounce', {
      // color styles
      'bg-primary': color === 'primary',
      'bg-secondary': color === 'secondary',
      'bg-accent': color === 'accent',
      'bg-destructive': color === 'destructive',
      'bg-success': color === 'success',
      'bg-muted-foreground': color === 'muted',

      // size styles
      'size-1': size === 'xs',
      'size-1.5': size === 'sm',
      'size-2': size === 'md',
      'size-2.5': size === 'lg',
      'size-3': size === 'xl',
    });

    // staggered animation effect for the three dots
    return (
      <div
        role="status"
        aria-label={label}
        className={cn(
          'flex items-center justify-center',
          { 'm-0': inline },
          className
        )}
        {...props}
      >
        <div
          className={cn(dotBaseClasses)}
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className={cn(dotBaseClasses)}
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className={cn(dotBaseClasses)}
          style={{ animationDelay: '300ms' }}
        ></div>
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // grow variant - pulsing circle that changes size
  if (variant === 'grow') {
    // size styles
    const sizeValue =
      size === 'xs'
        ? '0.75rem'
        : size === 'sm'
          ? '1rem'
          : size === 'md'
            ? '1.5rem'
            : size === 'lg'
              ? '2rem'
              : '2.5rem'; // xl

    return (
      <div
        role="status"
        aria-label={label}
        className={cn(
          'rounded-full',
          {
            // color styles
            'bg-primary': color === 'primary',
            'bg-secondary': color === 'secondary',
            'bg-accent': color === 'accent',
            'bg-destructive': color === 'destructive',
            'bg-success': color === 'success',
            'bg-muted-foreground': color === 'muted',

            // if inline, no margins
            'm-0': inline,
          },
          className
        )}
        style={{
          width: sizeValue,
          height: sizeValue,
          animation: 'spinner-grow 1.5s ease-in-out infinite',
        }}
        {...props}
      >
        <style>{`
          @keyframes spinner-grow {
            0%,
            100% {
              transform: scale(0.5);
              opacity: 0.2;
            }
            50% {
              transform: scale(1);
              opacity: 0.8;
            }
          }
        `}</style>
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // default fallback
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        {
          'text-primary': color === 'primary',
        },
        className
      )}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}

export { Spinner };
