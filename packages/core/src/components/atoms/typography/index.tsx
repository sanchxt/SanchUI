import React from 'react';
import { cn } from '@/utils/cn';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'blockquote'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted'
  | 'subtle';

export type TypographyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'accent'
  | 'destructive'
  | 'success';

export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export type TypographyTransform =
  | 'normal'
  | 'uppercase'
  | 'lowercase'
  | 'capitalize';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The variant of the typography
   * @default 'p'
   */
  variant?: TypographyVariant;

  /**
   * The color of the text
   * @default 'default'
   */
  color?: TypographyColor;

  /**
   * The weight of the text
   */
  weight?: TypographyWeight;

  /**
   * The alignment of the text
   */
  align?: TypographyAlign;

  /**
   * The transform of the text
   */
  transform?: TypographyTransform;

  /**
   * Whether to truncate text with an ellipsis if it overflows
   */
  truncate?: boolean;

  /**
   * The number of lines to show before truncating with an ellipsis
   */
  lineClamp?: number;

  /**
   * Whether to enable a responsive size reduction on smaller screens
   * @default true
   */
  responsive?: boolean;

  /**
   * Whether the text follows the dark mode theme automatically
   * @default true
   */
  themedDark?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * The React children
   */
  children: React.ReactNode;

  /**
   * HTML element to render (overrides default based on variant)
   */
  as?: React.ElementType;
}

const Typography = ({
  variant = 'p',
  color = 'default',
  weight,
  align,
  transform,
  truncate = false,
  lineClamp,
  responsive = true,
  themedDark = true,
  className,
  children,
  as,
  ref,
  ...props
}: TypographyProps & { ref?: React.Ref<HTMLElement> }) => {
  // Map variants to HTML elements
  const variantElementMap: Record<TypographyVariant, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
    blockquote: 'blockquote',
    lead: 'p',
    large: 'p',
    small: 'p',
    muted: 'p',
    subtle: 'p',
  };

  // Map variants to default classes
  const variantClassMap: Record<TypographyVariant, string> = {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-semibold tracking-tight',
    h3: 'text-2xl font-semibold tracking-tight',
    h4: 'text-xl font-semibold tracking-tight',
    h5: 'text-lg font-semibold tracking-tight',
    h6: 'text-base font-semibold tracking-tight',
    p: 'text-base leading-7',
    blockquote: 'text-xl border-l-4 border-border pl-6 italic',
    lead: 'text-xl text-muted-foreground leading-7',
    large: 'text-lg font-medium',
    small: 'text-sm font-normal',
    muted: 'text-sm text-muted-foreground',
    subtle: 'text-sm text-muted-foreground/75',
  };

  // Define standard responsive behavior (reduce by one size on smaller screens)
  const getResponsiveClasses = (
    variant: TypographyVariant,
    responsive: boolean
  ) => {
    if (!responsive) return '';

    // Different responsive behavior based on variant type
    if (variant.startsWith('h')) {
      // Headings scale differently on larger screens
      return variant === 'h1'
        ? 'sm:text-4xl md:text-5xl'
        : variant === 'h2'
          ? 'sm:text-3xl md:text-4xl'
          : variant === 'h3'
            ? 'sm:text-2xl md:text-3xl'
            : variant === 'h4'
              ? 'sm:text-xl md:text-2xl'
              : '';
    }

    // Specialized text variants maintain their distinct sizes
    switch (variant) {
      case 'lead':
        return 'sm:text-xl';
      case 'large':
        return 'sm:text-lg';
      case 'p':
        return 'sm:text-base';
      case 'small':
        return 'sm:text-sm';
      case 'muted':
        return 'sm:text-sm';
      case 'subtle':
        return 'sm:text-sm';
      case 'blockquote':
        return 'sm:text-xl';
      default:
        return '';
    }
  };

  // Apply responsive classes
  const responsiveClasses = getResponsiveClasses(variant, responsive);

  // Color variants
  const colorClassMap: Record<TypographyColor, string> = {
    default: 'text-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary-foreground',
    muted: 'text-muted-foreground',
    accent: 'text-accent-foreground',
    destructive: 'text-destructive',
    success: 'text-success',
  };

  // Font weight variations
  const weightClassMap: Record<TypographyWeight, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  // Text alignment
  const alignClassMap: Record<TypographyAlign, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  // Text transform
  const transformClassMap: Record<TypographyTransform, string> = {
    normal: 'normal-case',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  };

  // Truncation classes
  const truncateClasses = truncate ? 'truncate' : '';
  const lineClampClasses = lineClamp ? `line-clamp-${lineClamp}` : '';

  // Dark mode classes
  const darkModeClasses = themedDark ? 'dark:text-foreground' : '';

  // Determine element to render
  const Element = as || variantElementMap[variant];

  return (
    <Element
      ref={ref}
      className={cn(
        variantClassMap[variant],
        colorClassMap[color],
        weight && weightClassMap[weight],
        align && alignClassMap[align],
        transform && transformClassMap[transform],
        truncateClasses,
        lineClampClasses,
        responsiveClasses,
        darkModeClasses,
        className
      )}
      {...props}
    >
      {children}
    </Element>
  );
};

// Typed components for specific variants
export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const H3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const H4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
);

export const H5 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h5" {...props} />
);

export const H6 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h6" {...props} />
);

export const Paragraph = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="p" {...props} />
);

export const Blockquote = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="blockquote" {...props} />
);

export const Lead = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="lead" {...props} />
);

export const Large = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="large" {...props} />
);

export const Small = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="small" {...props} />
);

export const Muted = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="muted" {...props} />
);

export const Subtle = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtle" {...props} />
);

export { Typography };
