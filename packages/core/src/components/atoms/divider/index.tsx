import React from 'react';

import { cn } from '@/utils/cn';

export type DividerAlignment = 'start' | 'center' | 'end';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerThickness = 'thin' | 'regular' | 'thick';

export interface DividerProps {
  /**
   * The orientation of the divider
   * @default "horizontal"
   */
  orientation?: DividerOrientation;

  /**
   * The thickness of the divider
   * @default "regular"
   */
  thickness?: DividerThickness;

  /**
   * The visual style of the divider
   * @default "solid"
   */
  variant?: DividerVariant;

  /**
   * Custom color for the divider
   * By default, uses the border color from theme
   */
  color?: string;

  /**
   * Optional label to display in the middle of the divider
   */
  label?: React.ReactNode;

  /**
   * Alignment of the label (only applies when label is provided)
   * @default "center"
   */
  labelAlignment?: DividerAlignment;

  /**
   * Optional class name for the divider container
   */
  className?: string;

  /**
   * Optional class name for the label
   */
  labelClassName?: string;

  /**
   * Sets a decorative look with a gradient effect
   */
  decorative?: boolean;

  /**
   * Adds margin to the divider
   */
  withMargin?: boolean;

  /**
   * Aria role, defaults to "separator"
   */
  role?: string;
}

/**
 * Divider component for separating content areas
 */
const Divider = ({
  orientation = 'horizontal',
  thickness = 'regular',
  variant = 'solid',
  color,
  label,
  labelAlignment = 'center',
  className = '',
  labelClassName = '',
  decorative = false,
  withMargin = false,
  role = 'separator',
  ...props
}: DividerProps) => {
  // thickness styles
  const thicknessStyles = {
    thin: orientation === 'horizontal' ? 'border-t' : 'border-l',
    regular: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2',
    thick: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4',
  };

  // variant styles
  const variantStyles = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  // alignment styles (for labels in horizontal dividers)
  const labelAlignmentStyles = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  };

  // inline styles for custom colors
  const customColorStyle = color ? { borderColor: color } : {};
  const customGradientStyle =
    color && decorative && orientation === 'horizontal'
      ? {
          backgroundImage: `linear-gradient(to right, transparent, ${color}, transparent)`,
        }
      : color && decorative && orientation === 'vertical'
        ? {
            backgroundImage: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
          }
        : {};

  // render with label layout or not
  const hasLabel = !!label && orientation === 'horizontal';

  // simple divider without label
  if (!hasLabel) {
    return (
      <div
        role={role}
        aria-orientation={orientation}
        className={cn(
          // base styles
          'border-border',
          thicknessStyles[thickness],
          variantStyles[variant],

          // orientation specific styles
          orientation === 'horizontal' ? 'w-full' : 'h-full self-stretch',

          // margin styles
          withMargin && orientation === 'horizontal'
            ? 'my-4'
            : withMargin && orientation === 'vertical'
              ? 'mx-4'
              : '',

          // decorative styles
          decorative && orientation === 'horizontal'
            ? 'bg-gradient-to-r from-transparent via-border to-transparent border-none h-px'
            : decorative && orientation === 'vertical'
              ? 'bg-gradient-to-b from-transparent via-border to-transparent border-none w-px'
              : '',

          className
        )}
        style={decorative ? customGradientStyle : customColorStyle}
        {...props}
      />
    );
  }

  // divider with label (horizontal orientation)
  return (
    <div
      role={role}
      aria-orientation="horizontal"
      className={cn(
        'w-full flex items-center',
        labelAlignmentStyles[labelAlignment],
        withMargin && 'my-4',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'border-border flex-grow',
          thicknessStyles[thickness],
          variantStyles[variant],

          // decorative styles
          decorative
            ? 'bg-gradient-to-r from-transparent via-border to-transparent border-none h-px'
            : ''
        )}
        style={decorative ? customGradientStyle : customColorStyle}
      />

      {/* label container */}
      <span
        className={cn(
          'px-2 text-sm text-muted-foreground whitespace-nowrap',
          labelClassName
        )}
      >
        {label}
      </span>

      <div
        className={cn(
          'border-border flex-grow',
          thicknessStyles[thickness],
          variantStyles[variant],

          // decorative styles
          decorative
            ? 'bg-gradient-to-r from-transparent via-border to-transparent border-none h-px'
            : ''
        )}
        style={decorative ? customGradientStyle : customColorStyle}
      />
    </div>
  );
};

export { Divider };
