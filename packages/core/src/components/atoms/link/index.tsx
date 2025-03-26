import React from 'react';
import { cn } from '@/utils/cn';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * The variant style of the link
   */
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'muted';
  /**
   * Whether the link should display an underline
   */
  underline?: 'always' | 'hover' | 'none';
  /**
   * Whether to show an external link icon for external URLs
   */
  showExternalIcon?: boolean;
  /**
   * Whether the link is disabled
   */
  disabled?: boolean;
  /**
   * Size of the link
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional class names to apply to the link
   */
  className?: string;
  /**
   * Component to use as the link, can be used for integration with React Router
   */
  as?: React.ElementType;
  /**
   * The children of the link
   */
  children: React.ReactNode;
  /**
   * Ref to the underlying DOM element
   */
  ref?: React.Ref<HTMLAnchorElement>;
}

const ExternalLinkIcon = () => (
  <svg
    className="inline-block ml-1 h-3 w-3"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

function Link({
  variant = 'default',
  underline = 'hover',
  showExternalIcon = false,
  disabled = false,
  size = 'md',
  className = '',
  as: Component = 'a',
  href,
  target,
  rel,
  children,
  ref,
  ...props
}: LinkProps) {
  // check if link is external based on href
  const isExternal =
    href?.startsWith('http') || href?.startsWith('//') || target === '_blank';

  // if it's external or target is _blank, ensure rel includes noreferrer and noopener for security
  const secureRel =
    isExternal || target === '_blank'
      ? `${rel || ''} noreferrer noopener`.trim()
      : rel;

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const variantClasses = {
    default: 'text-foreground hover:text-foreground/80',
    primary: 'text-primary hover:text-primary/80',
    secondary: 'text-secondary-foreground hover:text-secondary-foreground/80',
    destructive: 'text-destructive hover:text-destructive/80',
    success: 'text-success hover:text-success/80',
    muted: 'text-muted-foreground hover:text-muted-foreground/80',
  };

  const underlineClasses = {
    always: 'underline',
    hover: 'no-underline hover:underline',
    none: 'no-underline',
  };

  // disabled state
  const disabledClasses = disabled
    ? 'opacity-50 pointer-events-none cursor-not-allowed'
    : '';

  return (
    <Component
      className={cn(
        'inline-flex items-center transition-colors duration-200',
        sizeClasses[size],
        variantClasses[variant],
        underlineClasses[underline],
        disabledClasses,
        className
      )}
      href={disabled ? undefined : href}
      target={isExternal ? target || '_blank' : target}
      rel={secureRel}
      aria-disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
      {isExternal && showExternalIcon && <ExternalLinkIcon />}
    </Component>
  );
}

Link.displayName = 'Link';

export { Link };
