import React, {
  useState,
  useEffect,
  useId,
  createContext,
  useContext,
  useRef,
} from 'react';

import { cn } from '@/utils/cn';

// types
type AccordionType = 'single' | 'multiple';
type AccordionExpandDirection = 'down' | 'up' | 'left' | 'right';
type AccordionSize = 'sm' | 'md' | 'lg';
type AccordionVariant = 'default' | 'bordered' | 'ghost' | 'highlight';

// context types
type AccordionContextValue = {
  type: AccordionType;
  expandDirection: AccordionExpandDirection;
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  size: AccordionSize;
  variant: AccordionVariant;
  chevronPosition: 'start' | 'end';
  disabled?: boolean;
  collapsible?: boolean;
  animated?: boolean;
  animationDuration?: number;
};

// item context type
type AccordionItemContextValue = {
  itemValue: string;
  disabled?: boolean;
};

// contexts
const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
);

// accordion context hook
const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

// hook to use accordion item context
const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionTrigger and AccordionContent must be used within an AccordionItem'
    );
  }
  return context;
};

// root Accordion component
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Type of accordion - single selection or multiple items can be open at once
   * @default 'single'
   */
  type?: AccordionType;

  /**
   * The direction in which the accordion expands
   * @default 'down'
   */
  expandDirection?: AccordionExpandDirection;

  /**
   * The value(s) of the expanded accordion item(s)
   */
  value?: string | string[];

  /**
   * Default value(s) for uncontrolled accordion
   */
  defaultValue?: string | string[];

  /**
   * Callback when expanded items change
   */
  onValueChange?: (value: string | string[]) => void;

  /**
   * Size of the accordion items
   * @default 'md'
   */
  size?: AccordionSize;

  /**
   * Variant style of accordion
   * @default 'default'
   */
  variant?: AccordionVariant;

  /**
   * Position of the chevron indicator
   * @default 'end'
   */
  chevronPosition?: 'start' | 'end';

  /**
   * Whether the accordion is disabled
   */
  disabled?: boolean;

  /**
   * Allow the active item to be collapsed
   * @default true
   */
  collapsible?: boolean;

  /**
   * Enable animations
   * @default true
   */
  animated?: boolean;

  /**
   * Animation duration in ms
   * @default 200
   */
  animationDuration?: number;

  /**
   * Accordion items
   */
  children: React.ReactNode;
}

export const Accordion = ({
  type = 'single',
  expandDirection = 'down',
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  variant = 'default',
  chevronPosition = 'end',
  disabled = false,
  collapsible = true,
  animated = true,
  animationDuration = 200,
  className,
  children,
  ...props
}: AccordionProps) => {
  // for controlled/uncontrolled mode
  const [internalValue, setInternalValue] = useState<string | string[]>(
    value !== undefined ? value : defaultValue || (type === 'single' ? '' : [])
  );

  // update internal state when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // handle value changes
  const handleValueChange = (newValue: string | string[]) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  // get actual current value
  const currentValue = value !== undefined ? value : internalValue;

  // context value
  const contextValue: AccordionContextValue = {
    type,
    expandDirection,
    value: currentValue,
    onValueChange: handleValueChange,
    size,
    variant,
    chevronPosition,
    disabled,
    collapsible,
    animated,
    animationDuration,
  };

  const directionClasses = {
    down: '',
    up: 'flex flex-col-reverse',
    left: 'flex flex-row-reverse',
    right: 'flex flex-row',
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        className={cn(
          'w-full',
          directionClasses[expandDirection],
          expandDirection === 'left' || expandDirection === 'right'
            ? 'items-start'
            : '',
          variant === 'bordered' && 'border rounded-md border-border',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique value for the accordion item
   */
  value: string;

  /**
   * Whether this accordion item is disabled
   */
  disabled?: boolean;

  /**
   * Custom content for when item is collapsed (advanced usage)
   */
  collapsedContent?: React.ReactNode;

  /**
   * Optional icon to show when expanded
   */
  expandedIcon?: React.ReactNode;

  /**
   * Optional icon to show when collapsed
   */
  collapsedIcon?: React.ReactNode;
}

export const AccordionItem = ({
  value,
  disabled,
  className,
  children,
  collapsedContent,
  expandedIcon,
  collapsedIcon,
  ...props
}: AccordionItemProps) => {
  const {
    value: contextValue,
    expandDirection,
    variant,
    disabled: contextDisabled,
  } = useAccordion();

  // check if the item is expanded
  const isExpanded = Array.isArray(contextValue)
    ? contextValue.includes(value)
    : contextValue === value;

  // combine disabled state from context and props
  const isDisabled = disabled || contextDisabled;

  const variantClasses = {
    default: 'border-b border-border',
    bordered: 'border-b border-border last:border-0',
    ghost: 'bg-transparent',
    highlight: isExpanded ? 'bg-accent' : 'hover:bg-muted/50',
  };

  const directionClasses = {
    down: '',
    up: '',
    left: 'border-r border-border last:border-r-0',
    right: 'border-l border-border first:border-l-0',
  };

  const itemContextValue: AccordionItemContextValue = {
    itemValue: value,
    disabled: isDisabled,
  };

  return (
    <AccordionItemContext.Provider value={itemContextValue}>
      <div
        data-state={isExpanded ? 'open' : 'closed'}
        data-disabled={isDisabled ? '' : undefined}
        className={cn(
          'w-full',
          expandDirection === 'left' || expandDirection === 'right'
            ? 'h-full'
            : '',
          variantClasses[variant],
          directionClasses[expandDirection],
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
        {collapsedContent && !isExpanded && (
          <div className="px-4 py-2">{collapsedContent}</div>
        )}
      </div>
    </AccordionItemContext.Provider>
  );
};

interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Override the default chevron icon
   */
  icon?: React.ReactNode;

  /**
   * Icon to show when expanded (will override default chevron)
   */
  expandedIcon?: React.ReactNode;

  /**
   * Icon to show when collapsed (will override default chevron)
   */
  collapsedIcon?: React.ReactNode;

  /**
   * Enable hover effect on trigger
   * @default true
   */
  enableHoverEffect?: boolean;
}

export const AccordionTrigger = ({
  children,
  className,
  icon,
  expandedIcon,
  collapsedIcon,
  enableHoverEffect = true,
  ...props
}: AccordionTriggerProps) => {
  const {
    type,
    value,
    onValueChange,
    size,
    chevronPosition,
    collapsible,
    animationDuration,
  } = useAccordion();

  const { itemValue, disabled: itemDisabled } = useAccordionItem();

  // check if the item is expanded
  const isExpanded = Array.isArray(value)
    ? value.includes(itemValue)
    : value === itemValue;

  // unique ID for ARIA
  const triggerId = useId();

  // handle click
  const handleClick = () => {
    if (itemDisabled) return;

    if (type === 'single') {
      if (isExpanded) {
        if (collapsible) {
          onValueChange('');
        }
      } else {
        onValueChange(itemValue);
      }
    } else {
      if (isExpanded) {
        if (collapsible) {
          onValueChange(
            (Array.isArray(value) ? value : []).filter((v) => v !== itemValue)
          );
        }
      } else {
        onValueChange([...(Array.isArray(value) ? value : []), itemValue]);
      }
    }
  };

  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4',
    lg: 'py-4 px-6 text-lg',
  };

  const defaultChevron = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('transition-transform', {
        'rotate-180': isExpanded,
      })}
      style={{
        transitionDuration: `${animationDuration}ms`,
      }}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  // icon to show
  const iconToShow =
    isExpanded && expandedIcon
      ? expandedIcon
      : !isExpanded && collapsedIcon
        ? collapsedIcon
        : icon || defaultChevron;

  return (
    <button
      id={triggerId}
      type="button"
      onClick={handleClick}
      disabled={itemDisabled}
      aria-expanded={isExpanded}
      aria-controls={`accordion-content-${itemValue}`}
      data-state={isExpanded ? 'open' : 'closed'}
      className={cn(
        'flex items-center justify-between w-full',
        sizeClasses[size],
        enableHoverEffect && !itemDisabled && 'hover:bg-muted/40',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'font-medium',
        'text-foreground',
        className
      )}
      {...props}
    >
      {chevronPosition === 'start' && (
        <span className="mr-2 shrink-0">{iconToShow}</span>
      )}
      <span
        className={cn(
          'flex-1',
          chevronPosition === 'start' ? 'text-left' : 'text-left'
        )}
      >
        {children}
      </span>
      {chevronPosition === 'end' && (
        <span className="ml-2 shrink-0">{iconToShow}</span>
      )}
    </button>
  );
};

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = ({
  children,
  className,
  ...props
}: AccordionContentProps) => {
  const { value, expandDirection, animated, animationDuration } =
    useAccordion();
  const { itemValue } = useAccordionItem();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(0);

  // check if the item is expanded
  const isExpanded = Array.isArray(value)
    ? value.includes(itemValue)
    : value === itemValue;

  // unique ID for ARIA
  const contentId = useId();

  // update height when expanded state changes
  useEffect(() => {
    if (!animated) return;

    if (isExpanded) {
      const contentHeight = contentRef.current?.scrollHeight;
      setHeight(contentHeight || 'auto');

      // after animation set to auto for proper content flow
      const timer = setTimeout(() => {
        setHeight('auto');
      }, animationDuration);

      return () => clearTimeout(timer);
    } else {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        setHeight(contentHeight);

        contentRef.current.offsetHeight;

        setTimeout(() => setHeight(0), 5);
      } else {
        setHeight(0);
      }
    }
  }, [isExpanded, animated, animationDuration]);

  const slideDirections = {
    down: { closed: 'translateY(-10%)', open: 'translateY(0)' },
    up: { closed: 'translateY(10%)', open: 'translateY(0)' },
    left: { closed: 'translateX(10%)', open: 'translateX(0)' },
    right: { closed: 'translateX(-10%)', open: 'translateX(0)' },
  };

  const animationStyles = animated
    ? {
        overflow: 'hidden',
        height,
        opacity: isExpanded ? 1 : 0,
        transform: isExpanded
          ? slideDirections[expandDirection].open
          : slideDirections[expandDirection].closed,
        transition: `height ${animationDuration}ms ease-out,
                      opacity ${animationDuration}ms ease-out,
                      transform ${animationDuration}ms ease-out`,
      }
    : {
        display: isExpanded ? 'block' : 'none',
      };

  return (
    <div
      id={`accordion-content-${itemValue}`}
      role="region"
      aria-labelledby={contentId}
      data-state={isExpanded ? 'open' : 'closed'}
      className={cn('overflow-hidden will-change-auto', className)}
      style={animationStyles as React.CSSProperties}
      {...props}
    >
      <div ref={contentRef} className="p-4 text-foreground">
        {children}
      </div>
    </div>
  );
};

export const AccordionRoot = Accordion;
