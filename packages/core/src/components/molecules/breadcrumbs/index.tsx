import React from 'react';

import { cn } from '@/utils/cn';

let ChevronRight: React.ComponentType<{ className?: string }>;
let MoreHorizontal: React.ComponentType<{ className?: string }>;
let HomeIcon: React.ComponentType<{ className?: string }>;

try {
  const icons = require('lucide-react');
  ChevronRight = icons.ChevronRight;
  MoreHorizontal = icons.MoreHorizontal;
  HomeIcon = icons.Home;
} catch (e) {
  // fallback icons
  ChevronRight = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      data-testid="chevron-right-icon"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );

  MoreHorizontal = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      data-testid="more-horizontal-icon"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );

  HomeIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      data-testid="home-icon"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

// *** context ***
const BreadcrumbContext = React.createContext<{
  separator?: React.ReactNode;
  collapsible?: boolean;
  maxItems?: number;
  itemCount?: number;
  showHomeIcon?: boolean;
}>({});

// *** root component ***
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;
  collapsible?: boolean;
  maxItems?: number;
  showHomeIcon?: boolean;
}

function Breadcrumb({
  children,
  separator = <ChevronRight className="h-3.5 w-3.5" />,
  collapsible = false,
  maxItems = 0,
  showHomeIcon = false,
  className,
  ...props
}: BreadcrumbProps) {
  const itemCount = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === BreadcrumbList
  ).length;

  return (
    <BreadcrumbContext.Provider
      value={{ separator, collapsible, maxItems, itemCount, showHomeIcon }}
    >
      <nav
        aria-label="Breadcrumb"
        className={cn('flex max-w-full items-center', className)}
        {...props}
      >
        {children}
      </nav>
    </BreadcrumbContext.Provider>
  );
}

// *** list component ***
export interface BreadcrumbListProps
  extends React.OlHTMLAttributes<HTMLOListElement> {}

function BreadcrumbList({
  children,
  className,
  ...props
}: BreadcrumbListProps) {
  const { collapsible, maxItems } = React.useContext(BreadcrumbContext);

  let modifiedChildren = children;

  // handle collapsible behaviour
  if (collapsible && maxItems && maxItems > 0) {
    // extract all BreadcrumbItems
    const childrenArray = React.Children.toArray(children).filter(Boolean);

    // get all breadcrumb items (not separators)
    const breadcrumbItems = childrenArray.filter(
      (child) =>
        React.isValidElement(child) &&
        (child.type === BreadcrumbItem ||
          (child.props as { 'data-item'?: string })['data-item'] ===
            'breadcrumb-item')
    );

    if (breadcrumbItems.length > maxItems) {
      // keep first and last items as per maxItems config
      const firstItems = breadcrumbItems.slice(0, 1);
      const lastItems = breadcrumbItems.slice(-(maxItems - 1));

      // calculate hidden count
      const hiddenCount =
        breadcrumbItems.length - firstItems.length - lastItems.length;

      // create ellipsis element
      const ellipsisItem = (
        <BreadcrumbItem key="collapsed">
          <BreadcrumbEllipsis count={hiddenCount} />
          <BreadcrumbSeparator />
        </BreadcrumbItem>
      );

      // combine visible items with ellipsis
      modifiedChildren = [...firstItems, ellipsisItem, ...lastItems];
    }
  }

  return (
    <ol
      className={cn(
        'flex items-center flex-wrap text-sm',
        'py-1 overflow-x-auto scrollbar-none',
        className
      )}
      {...props}
    >
      {modifiedChildren}
    </ol>
  );
}

// *** item component ***
export interface BreadcrumbItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  isCurrent?: boolean;
}

function BreadcrumbItem({
  children,
  className,
  isCurrent,
  ...props
}: BreadcrumbItemProps) {
  const hasCurrentPage = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === BreadcrumbPage
  );

  return (
    <li
      className={cn(
        'inline-flex items-center',
        'transition-opacity',
        className
      )}
      aria-current={isCurrent || hasCurrentPage ? 'page' : undefined}
      {...props}
    >
      {children}
    </li>
  );
}

// *** link component ***
export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  isRoot?: boolean;
}

function BreadcrumbLink({
  asChild = false,
  className,
  isRoot = false,
  children,
  ...props
}: BreadcrumbLinkProps) {
  const { showHomeIcon } = React.useContext(BreadcrumbContext);
  const Comp = asChild ? React.Fragment : 'a';

  return (
    <Comp
      className={cn(
        'transition-colors text-muted-foreground hover:text-foreground',
        'hover:underline focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:rounded-sm',
        'inline-flex items-center gap-1.5',
        'text-sm font-medium',
        className
      )}
      {...props}
    >
      {isRoot && showHomeIcon && (
        <HomeIcon className="h-3.5 w-3.5 flex-shrink-0" />
      )}
      {asChild ? (
        children
      ) : (
        <span className="truncate max-w-[180px] md:max-w-xs">{children}</span>
      )}
    </Comp>
  );
}

// *** page component ***
export interface BreadcrumbPageProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cn(
        'font-semibold text-foreground truncate max-w-[200px] md:max-w-xs',
        className
      )}
      {...props}
    />
  );
}

// *** separator component ***
export interface BreadcrumbSeparatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

function BreadcrumbSeparator({
  className,
  children,
  ...props
}: BreadcrumbSeparatorProps) {
  const { separator } = React.useContext(BreadcrumbContext);

  return (
    <span
      data-testid="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(
        'text-muted-foreground mx-1 flex-shrink-0',
        'opacity-70',
        className
      )}
      {...props}
    >
      {children || separator}
    </span>
  );
}

// *** ellipsis component ***
export interface BreadcrumbEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number;
}

function BreadcrumbEllipsis({
  className,
  count,
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-7 items-center justify-center rounded-md',
        'text-muted-foreground hover:text-foreground hover:bg-accent/50',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        'relative',
        className
      )}
      aria-label={`${count || 0} more breadcrumb levels`}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      {count && count > 0 ? (
        <span
          className={cn(
            'absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center',
            'rounded-full bg-primary text-[10px] font-medium text-primary-foreground',
            'shadow-sm'
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
