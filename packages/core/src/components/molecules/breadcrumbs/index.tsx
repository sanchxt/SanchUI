import * as React from 'react';
import { ChevronRight, MoreHorizontal, HomeIcon } from 'lucide-react';

import { cn } from '../../../utils/cn';

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
      <nav aria-label="Breadcrumb" className={cn('flex', className)} {...props}>
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
    const childrenArray = React.Children.toArray(children).filter(Boolean);

    if (childrenArray.length > maxItems) {
      const firstElems = childrenArray.slice(0, 1);
      const lastElems = childrenArray.slice(-Math.max(1, maxItems - 1));

      // collapsed indicator
      const collapsedCount =
        childrenArray.length - firstElems.length - lastElems.length;
      const collapsedElement = (
        <BreadcrumbItem key="collapsed">
          <BreadcrumbEllipsis count={collapsedCount} />
          <BreadcrumbSeparator />
        </BreadcrumbItem>
      );

      modifiedChildren = [...firstElems, collapsedElement, ...lastElems];
    }
  }

  return (
    <ol
      className={cn(
        'flex items-center gap-1.5 flex-wrap text-sm sm:text-base',
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
  return (
    <li
      className={cn('inline-flex items-center', className)}
      aria-current={isCurrent ? 'page' : undefined}
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
        'transition-colors text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:underline',
        'inline-flex items-center gap-1.5',
        className
      )}
      {...props}
    >
      {isRoot && showHomeIcon && <HomeIcon className="h-3.5 w-3.5" />}
      {asChild ? children : <span className="truncate">{children}</span>}
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
      className={cn('font-medium text-foreground truncate', className)}
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
      role="presentation"
      aria-hidden="true"
      className={cn('text-muted-foreground mx-1', className)}
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
        'flex h-7 items-center justify-center px-2 rounded-md',
        'text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:underline',
        'relative',
        className
      )}
      aria-label={`${count} more breadcrumb levels`}
      {...props}
    >
      <MoreHorizontal className="h-3.5 w-3.5" />
      {count && count > 0 ? (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
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
