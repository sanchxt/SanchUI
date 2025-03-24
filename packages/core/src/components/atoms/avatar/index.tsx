import React, { useState, useEffect } from 'react';
import { cn } from '../../../utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * URL of the avatar image
   */
  src?: string;
  /**
   * Alt text for the avatar image
   */
  alt?: string;
  /**
   * Fallback text to display when image is not available (typically initials)
   */
  fallbackText?: string;
  /**
   * The size of the avatar
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /**
   * The shape of the avatar
   * @default "circle"
   */
  shape?: 'circle' | 'square' | 'rounded';
  /**
   * Optional border around the avatar
   * @default false
   */
  bordered?: boolean;
  /**
   * Color scheme for fallback background
   * @default "primary"
   */
  colorScheme?: 'primary' | 'secondary' | 'accent' | 'muted' | 'gray';
  /**
   * Status indicator (online, offline, away, busy)
   */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /**
   * Optional badge content
   */
  badge?: React.ReactNode;
  /**
   * Position of the badge
   * @default "bottom-right"
   */
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /**
   * Determines if a placeholder should be shown while image is loading
   * @default true
   */
  showPlaceholder?: boolean;
}

/**
 * Avatar component for user profile images with fallback options
 */
function Avatar({
  src,
  alt = 'Avatar',
  fallbackText,
  size = 'md',
  shape = 'circle',
  bordered = false,
  colorScheme = 'primary',
  status,
  badge,
  badgePosition = 'bottom-right',
  showPlaceholder = true,
  className,
  ...props
}: AvatarProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(!!src);

  // Reset states when src changes
  useEffect(() => {
    if (src) {
      setIsLoading(true);
      setImgError(false);
      setImgLoaded(false);
    } else {
      setIsLoading(false);
      setImgError(false);
    }
  }, [src]);

  // Get initials from fallbackText or generate fallback
  const getInitials = () => {
    if (!fallbackText) return '';

    return fallbackText
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Size classes
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
    '2xl': 'h-24 w-24 text-xl',
  };

  // Shape classes
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-md',
  };

  // Status indicator classes
  const statusClasses = {
    online: 'bg-success',
    offline: 'bg-muted-foreground',
    away: 'bg-orange-400',
    busy: 'bg-destructive',
  };

  // Badge position classes - adjusted to be more visible
  const badgePositionClasses = {
    'top-right': '-top-2 -right-2',
    'top-left': '-top-2 -left-2',
    'bottom-right': '-bottom-2 -right-2',
    'bottom-left': '-bottom-2 -left-2',
  };

  // Color scheme styles for fallback
  const colorSchemeClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    muted: 'bg-muted text-muted-foreground',
    gray: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200',
  };

  // Border style
  const borderStyle = bordered
    ? 'ring-2 ring-background dark:ring-background'
    : '';

  // Placeholder styles
  const placeholderClasses =
    showPlaceholder && isLoading && !imgLoaded && !imgError
      ? 'bg-muted animate-pulse'
      : '';

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        // Remove overflow-hidden to prevent status indicators and badges from being clipped
        sizeClasses[size],
        shapeClasses[shape],
        !imgLoaded || imgError ? colorSchemeClasses[colorScheme] : '',
        placeholderClasses,
        borderStyle,
        className
      )}
      {...props}
      role="img"
      aria-label={alt}
    >
      {/* Image with overflow-hidden wrapper */}
      {src && !imgError && (
        <div
          className={cn('h-full w-full overflow-hidden', shapeClasses[shape])}
        >
          <img
            src={src}
            alt={alt}
            className={cn(
              'h-full w-full object-cover',
              !imgLoaded && 'invisible'
            )}
            onLoad={() => {
              setImgLoaded(true);
              setIsLoading(false);
            }}
            onError={() => {
              setImgError(true);
              setIsLoading(false);
            }}
          />
        </div>
      )}

      {/* Fallback (shown when no image or error) */}
      {(!src || imgError) && fallbackText && (
        <div
          className={cn(
            'h-full w-full overflow-hidden flex items-center justify-center',
            shapeClasses[shape]
          )}
        >
          <span className="font-medium">{getInitials()}</span>
        </div>
      )}

      {/* Status indicator */}
      {status && (
        <span
          className={cn(
            'absolute block rounded-full ring-2 ring-background dark:ring-background',
            statusClasses[status],
            {
              'h-2 w-2 -right-0.5 -bottom-0.5': size === 'xs',
              'h-2.5 w-2.5 -right-0.5 -bottom-0.5': size === 'sm',
              'h-3 w-3 -right-0.5 -bottom-0.5': size === 'md',
              'h-3.5 w-3.5 -right-0.5 -bottom-0.5': size === 'lg',
              'h-4 w-4 -right-1 -bottom-1': size === 'xl',
              'h-5 w-5 -right-1 -bottom-1': size === '2xl',
            }
          )}
          aria-label={`Status: ${status}`}
        />
      )}

      {/* Badge */}
      {badge && (
        <div
          className={cn(
            'absolute z-10 flex items-center justify-center',
            badgePositionClasses[badgePosition]
          )}
        >
          {badge}
        </div>
      )}
    </div>
  );
}

export { Avatar };
