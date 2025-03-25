import { cn } from '@/utils/cn';
import React, { useMemo } from 'react';

type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean;
};

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /**
   * Reference to the container element
   */
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Current progress value (0-100)
   */
  value?: number;
  /**
   * Maximum value (default: 100)
   */
  max?: number;
  /**
   * Minimum value (default: 0)
   */
  min?: number;
  /**
   * Shows indeterminate loading animation
   */
  indeterminate?: boolean;
  /**
   * The size of the progress bar
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The color variant of the progress bar
   */
  color?: 'default' | 'primary' | 'success' | 'destructive' | 'secondary';
  /**
   * Displays the current progress value as text
   */
  showValue?: boolean;
  /**
   * Format for the progress value
   */
  valueFormat?:
    | 'percentage'
    | 'ratio'
    | ((value: number, max: number) => string);
  /**
   * Adds a label above the progress bar
   */
  label?: React.ReactNode;
  /**
   * Position of the value text
   */
  valuePosition?: 'inside' | 'outside';
  /**
   * Additional class name for the container
   */
  className?: string;
  /**
   * Additional class name for the track (background)
   */
  trackClassName?: string;
  /**
   * Additional class name for the indicator (filled part)
   */
  indicatorClassName?: string;
  /**
   * Additional class name for the value text
   */
  valueClassName?: string;
  /**
   * Additional class name for the label
   */
  labelClassName?: string;
  /**
   * Whether to animate the progress indicator
   */
  animate?: boolean;
  /**
   * Additional props for the progress element
   */
  progressProps?: React.ComponentPropsWithoutRef<'progress'> & DataAttributes;
}

const Progress = ({
  value = 0,
  max = 100,
  min = 0,
  indeterminate = false,
  size = 'md',
  color = 'default',
  showValue = false,
  valueFormat = 'percentage',
  label,
  valuePosition = 'outside',
  className,
  trackClassName,
  indicatorClassName,
  valueClassName,
  labelClassName,
  animate = true,
  progressProps,
  ref,
  ...props
}: ProgressProps) => {
  // ensure value is within bounds
  const normalizedValue = Math.max(min, Math.min(max, value));

  // calculate percentage for styling
  const percentage = ((normalizedValue - min) / (max - min)) * 100;

  // format the display value
  const formattedValue = useMemo(() => {
    if (typeof valueFormat === 'function') {
      return valueFormat(normalizedValue, max);
    }

    if (valueFormat === 'ratio') {
      return `${normalizedValue}/${max}`;
    }

    return `${Math.round(percentage)}%`;
  }, [normalizedValue, max, percentage, valueFormat]);

  // size class mapping
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  // color class mapping
  const colorClasses = {
    default: 'bg-foreground',
    primary: 'bg-primary',
    success: 'bg-success',
    destructive: 'bg-destructive',
    secondary: 'bg-secondary',
  };

  const labelSizeClasses = {
    sm: 'text-xs mb-1',
    md: 'text-sm mb-1.5',
    lg: 'text-base mb-2',
  };

  return (
    <div
      ref={ref}
      className={cn('w-full space-y-1', className)}
      role="region"
      aria-label={typeof label === 'string' ? label : 'Progress indicator'}
      {...props}
    >
      {/* label and/or outside value display */}
      {(label || (showValue && valuePosition === 'outside')) && (
        <div className="flex justify-between items-center w-full">
          {label && (
            <div
              className={cn(
                labelSizeClasses[size],
                'font-medium',
                labelClassName
              )}
            >
              {label}
            </div>
          )}
          {showValue && valuePosition === 'outside' && (
            <div
              className={cn('text-xs text-muted-foreground', valueClassName)}
            >
              {formattedValue}
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {/* hidden native progress for screen readers */}
        <progress
          value={indeterminate ? undefined : normalizedValue}
          max={max}
          className="sr-only"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : normalizedValue}
          aria-valuetext={formattedValue}
          aria-busy={indeterminate}
          {...progressProps}
        />

        {/* visual progress track (background) */}
        <div
          className={cn(
            'w-full overflow-hidden rounded-full bg-secondary/40',
            sizeClasses[size],
            trackClassName
          )}
        >
          {/* visual progress indicator (filled part) */}
          <div
            className={cn(
              'h-full w-full flex-1 rounded-full transition-all',
              colorClasses[color],
              animate &&
                !indeterminate &&
                'transition-[width] duration-500 ease-in-out',
              indeterminate && 'animate-pulse',
              indicatorClassName
            )}
            style={{
              width: indeterminate ? '100%' : `${percentage}%`,
              ...(indeterminate && {
                backgroundImage: `linear-gradient(to right, transparent 0%, ${colorClasses[color]} 50%, transparent 100%)`,
                backgroundSize: '500% 100%',
                backgroundPosition: 'left -31.25% top 0%',
              }),
            }}
          >
            {/* Inside value display */}
            {showValue && valuePosition === 'inside' && size === 'lg' && (
              <div
                className={cn(
                  'px-2 text-xs text-primary-foreground whitespace-nowrap flex items-center justify-center h-full',
                  valueClassName
                )}
              >
                {formattedValue}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Progress.displayName = 'Progress';

export { Progress };
