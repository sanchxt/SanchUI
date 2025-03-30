import React from 'react';
import { cn } from '@/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton
   * Can be any valid CSS width value (px, %, rem, etc.)
   */
  width?: string | number;

  /**
   * Height of the skeleton
   * Can be any valid CSS height value (px, %, rem, etc.)
   */
  height?: string | number;

  /**
   * Animation type
   */
  animation?: 'pulse' | 'wave' | 'none';

  /**
   * Whether to make the skeleton a circle
   */
  circle?: boolean;

  /**
   * Border radius of the skeleton
   * Can be a predefined size (sm, md, lg, full) or any CSS value
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full' | string;

  /**
   * Whether the skeleton should be translucent (slightly see-through)
   */
  translucent?: boolean;

  /**
   * Whether to show the skeleton with a shimmer effect
   * This overrides the animation prop
   */
  shimmer?: boolean;

  /**
   * Element to render as
   */
  as?: React.ElementType;

  /**
   * Whether this is a text skeleton (adds specific styling for text)
   */
  text?: boolean;

  /**
   * For text skeletons, which variant of text to mimic
   */
  textVariant?: 'heading' | 'body' | 'caption';
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      width,
      height,
      animation = 'pulse',
      circle = false,
      radius = 'md',
      translucent = false,
      shimmer = false,
      as: Component = 'div',
      text = false,
      textVariant = 'body',
      style,
      ...props
    },
    ref
  ) => {
    // convert number values to pixel values
    const widthStyle = typeof width === 'number' ? `${width}px` : width;
    const heightStyle = typeof height === 'number' ? `${height}px` : height;

    // determine border radius based on prop
    const getBorderRadius = () => {
      switch (radius) {
        case 'none':
          return '0';
        case 'sm':
          return 'var(--radius-sm, 0.125rem)';
        case 'md':
          return 'var(--radius, 0.5rem)';
        case 'lg':
          return 'var(--radius-lg, 0.75rem)';
        case 'full':
          return '9999px';
        default:
          return radius;
      }
    };

    // determine text-specific styling
    const getTextStyles = () => {
      if (!text) return {};

      switch (textVariant) {
        case 'heading':
          return {
            height: heightStyle || '2rem',
            width: widthStyle || '40%',
            marginBottom: '0.7rem',
          };
        case 'body':
          return {
            height: heightStyle || '1rem',
            width: widthStyle || '100%',
            marginBottom: '0.5rem',
          };
        case 'caption':
          return {
            height: heightStyle || '0.8rem',
            width: widthStyle || '60%',
            marginBottom: '0.5rem',
          };
        default:
          return {};
      }
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'bg-muted',
          // base styles
          'inline-block relative overflow-hidden',
          // animation variants
          shimmer
            ? 'skeleton-shimmer'
            : animation === 'pulse'
              ? 'animate-pulse'
              : animation === 'wave'
                ? 'skeleton-wave'
                : '',
          // translucent variant
          translucent && 'opacity-70',
          // circle variant (if enabled, overrides radius)
          circle && 'rounded-full',
          // text-specific styling
          text && 'skeleton-text',
          className
        )}
        style={{
          width: widthStyle,
          height: heightStyle,
          borderRadius: !circle ? getBorderRadius() : undefined,
          ...getTextStyles(),
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
