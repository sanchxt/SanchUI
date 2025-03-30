import { cn } from '@/utils/cn';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

export type TooltipPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

export interface TooltipProps {
  /**
   * The content to display inside the tooltip
   */
  content: ReactNode;
  /**
   * The element that triggers the tooltip
   */
  children: ReactNode;
  /**
   * The position of the tooltip relative to the trigger element
   * @default 'top'
   */
  position?: TooltipPosition;
  /**
   * Delay in ms before showing the tooltip
   * @default 0
   */
  showDelay?: number;
  /**
   * Delay in ms before hiding the tooltip
   * @default 0
   */
  hideDelay?: number;
  /**
   * Max width of the tooltip
   * @default '20rem'
   */
  maxWidth?: string;
  /**
   * Whether to show an arrow pointing to the trigger element
   * @default true
   */
  arrow?: boolean;
  /**
   * Additional class name for the tooltip container
   */
  className?: string;
  /**
   * Additional class name for the tooltip content
   */
  contentClassName?: string;
  /**
   * Additional class name for the tooltip arrow
   */
  arrowClassName?: string;
  /**
   * Whether the tooltip is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * How the tooltip is triggered
   * @default 'hover'
   */
  trigger?: TooltipTrigger;
  /**
   * Whether the tooltip is visible (only used with trigger='manual')
   * @default false
   */
  isOpen?: boolean;
  /**
   * Callback when tooltip is shown
   */
  onShow?: () => void;
  /**
   * Callback when tooltip is hidden
   */
  onHide?: () => void;
  /**
   * Whether to close when clicking outside
   * @default true
   */
  closeOnOutsideClick?: boolean;
  /**
   * Whether to close when Escape key is pressed
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Z-index of the tooltip
   * @default 50
   */
  zIndex?: number;
  /**
   * Whether the tooltip should be interactive (can move cursor into tooltip)
   * @default false
   */
  interactive?: boolean;
  /**
   * Animation duration in ms
   * @default 150
   */
  animationDuration?: number;
  /**
   * Offset from the trigger element in pixels
   * @default 8
   */
  offset?: number;
  /**
   * ID for the tooltip (for accessibility)
   */
  id?: string;
}

const Tooltip = ({
  content,
  children,
  position = 'top',
  showDelay = 0,
  hideDelay = 0,
  maxWidth = '20rem',
  arrow = true,
  className = '',
  contentClassName = '',
  arrowClassName = '',
  disabled = false,
  trigger = 'hover',
  isOpen = false,
  onShow,
  onHide,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  zIndex = 50,
  interactive = false,
  animationDuration = 150,
  offset = 8,
  id,
}: TooltipProps) => {
  // state for tooltip visibility
  const [visible, setVisible] = useState(trigger === 'manual' ? isOpen : false);

  // refs for elements and timers
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  // unique ID for accessibility
  const tooltipId = useRef<string>(
    id || `tooltip-${Math.random().toString(36).substring(2, 9)}`
  );

  // update visible state when isOpen changes (for manual mode)
  useEffect(() => {
    if (trigger === 'manual') {
      setVisible(isOpen);
    }
  }, [isOpen, trigger]);

  // clear timers on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) window.clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // handle showing the tooltip
  const handleShow = useCallback(() => {
    if (disabled) return;

    // Clear any existing hide timeout
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (!visible) {
      if (showDelay > 0) {
        showTimeoutRef.current = window.setTimeout(() => {
          setVisible(true);
          if (onShow) onShow();
        }, showDelay);
      } else {
        setVisible(true);
        if (onShow) onShow();
      }
    }
  }, [disabled, visible, showDelay, onShow]);

  // handle hiding the tooltip
  const handleHide = useCallback(() => {
    // for interactive tooltips, we need a small delay to allow moving to the tooltip
    if (interactive) {
      hideTimeoutRef.current = window.setTimeout(() => {
        // check if mouse has moved to tooltip before hiding
        if (!tooltipRef.current?.matches(':hover')) {
          setVisible(false);
          if (onHide) onHide();
        }
      }, 50);
    } else {
      if (hideDelay > 0) {
        hideTimeoutRef.current = window.setTimeout(() => {
          setVisible(false);
          if (onHide) onHide();
        }, hideDelay);
      } else {
        setVisible(false);
        if (onHide) onHide();
      }
    }
  }, [visible, hideDelay, onHide, interactive]);

  // handle click outside
  useEffect(() => {
    if (!closeOnOutsideClick || !visible || trigger !== 'click') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleHide();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnOutsideClick, visible, trigger, handleHide]);

  // handle escape key
  useEffect(() => {
    if (!closeOnEscape || !visible) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleHide();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeOnEscape, visible, handleHide]);

  // set appropriate event handlers based on trigger type
  const triggerProps = {
    ref: triggerRef,
    'aria-describedby': visible ? tooltipId.current : undefined,
  };

  if (trigger === 'hover') {
    Object.assign(triggerProps, {
      onMouseEnter: handleShow,
      onMouseLeave: handleHide,
      onFocus: handleShow,
      onBlur: handleHide,
    });
  } else if (trigger === 'click') {
    Object.assign(triggerProps, {
      onClick: visible ? handleHide : handleShow,
    });
  } else if (trigger === 'focus') {
    Object.assign(triggerProps, {
      onFocus: handleShow,
      onBlur: handleHide,
    });
  }

  // calculate tooltip position
  const getTooltipPositionStyles = () => {
    let positionStyles = {};

    // convert position to CSS properties
    switch (position) {
      case 'top':
        positionStyles = {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: `${offset}px`,
        };
        break;
      case 'top-start':
        positionStyles = {
          bottom: '100%',
          left: '0',
          marginBottom: `${offset}px`,
        };
        break;
      case 'top-end':
        positionStyles = {
          bottom: '100%',
          right: '0',
          marginBottom: `${offset}px`,
        };
        break;
      case 'right':
        positionStyles = {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: `${offset}px`,
        };
        break;
      case 'right-start':
        positionStyles = {
          left: '100%',
          top: '0',
          marginLeft: `${offset}px`,
        };
        break;
      case 'right-end':
        positionStyles = {
          left: '100%',
          bottom: '0',
          marginLeft: `${offset}px`,
        };
        break;
      case 'bottom':
        positionStyles = {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: `${offset}px`,
        };
        break;
      case 'bottom-start':
        positionStyles = {
          top: '100%',
          left: '0',
          marginTop: `${offset}px`,
        };
        break;
      case 'bottom-end':
        positionStyles = {
          top: '100%',
          right: '0',
          marginTop: `${offset}px`,
        };
        break;
      case 'left':
        positionStyles = {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: `${offset}px`,
        };
        break;
      case 'left-start':
        positionStyles = {
          right: '100%',
          top: '0',
          marginRight: `${offset}px`,
        };
        break;
      case 'left-end':
        positionStyles = {
          right: '100%',
          bottom: '0',
          marginRight: `${offset}px`,
        };
        break;
      default:
        positionStyles = {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: `${offset}px`,
        };
    }

    return positionStyles;
  };

  // calculate arrow position
  const getArrowPositionStyles = () => {
    let arrowStyles = {};

    // convert position to CSS arrow properties
    if (position.startsWith('top')) {
      arrowStyles = {
        bottom: '-4px',
        transform: 'rotate(45deg)',
        borderRight: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      };

      if (position === 'top') {
        arrowStyles = { ...arrowStyles, left: 'calc(50% - 4px)' };
      } else if (position === 'top-start') {
        arrowStyles = { ...arrowStyles, left: '1rem' };
      } else if (position === 'top-end') {
        arrowStyles = { ...arrowStyles, right: '1rem' };
      }
    } else if (position.startsWith('right')) {
      arrowStyles = {
        left: '-4px',
        transform: 'rotate(45deg)',
        borderLeft: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      };

      if (position === 'right') {
        arrowStyles = { ...arrowStyles, top: 'calc(50% - 4px)' };
      } else if (position === 'right-start') {
        arrowStyles = { ...arrowStyles, top: '1rem' };
      } else if (position === 'right-end') {
        arrowStyles = { ...arrowStyles, bottom: '1rem' };
      }
    } else if (position.startsWith('bottom')) {
      arrowStyles = {
        top: '-4px',
        transform: 'rotate(45deg)',
        borderLeft: '1px solid var(--color-border)',
        borderTop: '1px solid var(--color-border)',
      };

      if (position === 'bottom') {
        arrowStyles = { ...arrowStyles, left: 'calc(50% - 4px)' };
      } else if (position === 'bottom-start') {
        arrowStyles = { ...arrowStyles, left: '1rem' };
      } else if (position === 'bottom-end') {
        arrowStyles = { ...arrowStyles, right: '1rem' };
      }
    } else if (position.startsWith('left')) {
      arrowStyles = {
        right: '-4px',
        transform: 'rotate(45deg)',
        borderRight: '1px solid var(--color-border)',
        borderTop: '1px solid var(--color-border)',
      };

      if (position === 'left') {
        arrowStyles = { ...arrowStyles, top: 'calc(50% - 4px)' };
      } else if (position === 'left-start') {
        arrowStyles = { ...arrowStyles, top: '1rem' };
      } else if (position === 'left-end') {
        arrowStyles = { ...arrowStyles, bottom: '1rem' };
      }
    }

    return arrowStyles;
  };

  // handle mouse enter/leave for interactive tooltips
  const tooltipMouseProps = interactive
    ? {
        onMouseEnter: () => {
          if (hideTimeoutRef.current) {
            window.clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
          }
        },
        onMouseLeave: handleHide,
      }
    : {};

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        {...triggerProps}
        aria-describedby={visible ? tooltipId.current : undefined}
      >
        {children}
      </div>

      {visible && (
        <div
          ref={tooltipRef}
          id={tooltipId.current}
          role="tooltip"
          data-testid="tooltip"
          className={cn(
            'absolute z-50 max-w-xs py-1 px-2 rounded-md',
            'bg-background border border-border shadow-sm',
            'text-sm text-foreground',
            'transition-opacity duration-150',
            contentClassName
          )}
          style={{
            ...getTooltipPositionStyles(),
            maxWidth,
            zIndex,
            animationDuration: `${animationDuration}ms`,
            opacity: 1,
          }}
          {...tooltipMouseProps}
        >
          {content}

          {arrow && (
            <div
              className={cn('absolute w-2 h-2 bg-background', arrowClassName)}
              style={getArrowPositionStyles()}
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </div>
  );
};

export { Tooltip };
