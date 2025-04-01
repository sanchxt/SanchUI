import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  /**
   * Controls if the drawer is open
   */
  isOpen: boolean;
  /**
   * Callback when the drawer is closed
   */
  onClose: () => void;
  /**
   * The position from which the drawer slides in
   * @default 'right'
   */
  position?: DrawerPosition;
  /**
   * The size of the drawer
   * @default 'md'
   */
  size?: DrawerSize;
  /**
   * Custom class name for the drawer container
   */
  className?: string;
  /**
   * Custom class name for the drawer content
   */
  contentClassName?: string;
  /**
   * Custom class name for the backdrop/overlay
   */
  backdropClassName?: string;
  /**
   * Whether the drawer should close when clicking outside
   * @default true
   */
  closeOnClickOutside?: boolean;
  /**
   * Whether the drawer should close when pressing escape key
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Whether to render the drawer in a portal
   * @default true
   */
  usePortal?: boolean;
  /**
   * Whether to show the backdrop/overlay
   * @default true
   */
  showBackdrop?: boolean;
  /**
   * ID for the drawer
   */
  id?: string;
  /**
   * Duration of the slide animation in milliseconds
   * @default 250
   */
  animationDuration?: number;
  /**
   * Whether to lock the body scroll when the drawer is open
   * @default true
   */
  lockScroll?: boolean;
  /**
   * The content of the drawer
   */
  children: React.ReactNode;
  /**
   * Ref to the drawer element
   */
  ref?: React.RefObject<HTMLDivElement>;
  /**
   * Whether the drawer has a close button
   * @default true
   */
  hasCloseButton?: boolean;
  /**
   * Content to render in the header section
   */
  header?: React.ReactNode;
  /**
   * Content to render in the footer section
   */
  footer?: React.ReactNode;
}

const sizeMap = {
  sm: {
    left: 'w-64',
    right: 'w-64',
    top: 'h-64',
    bottom: 'h-64',
  },
  md: {
    left: 'w-80',
    right: 'w-80',
    top: 'h-80',
    bottom: 'h-80',
  },
  lg: {
    left: 'w-96',
    right: 'w-96',
    top: 'h-96',
    bottom: 'h-96',
  },
  xl: {
    left: 'w-1/3',
    right: 'w-1/3',
    top: 'h-1/2',
    bottom: 'h-1/2',
  },
  full: {
    left: 'w-full sm:w-1/2 md:w-2/5 lg:w-1/3',
    right: 'w-full sm:w-1/2 md:w-2/5 lg:w-1/3',
    top: 'h-full sm:h-1/2',
    bottom: 'h-full sm:h-1/2',
  },
};

function Drawer({
  isOpen = false,
  onClose,
  position = 'right',
  size = 'md',
  className = '',
  contentClassName = '',
  backdropClassName = '',
  closeOnClickOutside = true,
  closeOnEsc = true,
  usePortal = true,
  showBackdrop = true,
  id,
  animationDuration = 250,
  lockScroll = true,
  children,
  hasCloseButton = true,
  header,
  footer,
  ref,
  ...rest
}: DrawerProps) {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const initialFocusRef = useRef<HTMLElement | null>(null);
  const internalDrawerRef = useRef<HTMLDivElement>(null);
  const drawerRef = ref || internalDrawerRef;
  const contentRef = useRef<HTMLDivElement>(null);

  // mount/unmount & trigger visibility transitions
  useEffect(() => {
    let mountTimer: ReturnType<typeof setTimeout> | null = null;
    let visibilityTimer: ReturnType<typeof setTimeout> | null = null;

    if (isOpen) {
      // mount component
      setIsMounted(true);
      // minimal timeout (~1 frame) to allow the browser to paint the component in its initial (off-screen) state.
      mountTimer = setTimeout(() => {
        // isVisible to true to trigger the transition to on-screen.
        setIsVisible(true);
      }, 10);
    } else {
      // start close animation by setting visibility off
      setIsVisible(false);
    }

    return () => {
      if (mountTimer) clearTimeout(mountTimer);
      if (visibilityTimer) clearTimeout(visibilityTimer);
    };
  }, [isOpen]);

  // handle transition end for removing from DOM when closed
  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>
  ) => {
    if (event.target === drawerRef.current && !isOpen && !isVisible) {
      setIsMounted(false);
    }
  };

  // handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (closeOnEsc && isOpen && event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, closeOnEsc]);

  // handle body scroll locking
  useEffect(() => {
    if (
      lockScroll &&
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    ) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      if (isOpen && isMounted) {
        document.body.style.overflow = 'hidden';
      } else {
        // ensure scroll is restored if component unmounts or closes
        document.body.style.overflow = originalStyle;
      }
      // cleanup function to restore scroll always when effect cleans up or deps change
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen, isMounted, lockScroll]);

  // focus management
  useEffect(() => {
    // manage focus when the drawer is fully visible
    if (isOpen && isVisible && drawerRef.current) {
      setTimeout(() => {
        if (!drawerRef.current) return;

        const focusableElements =
          drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

        // save current focus if it's outside the drawer
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && !drawerRef.current.contains(activeElement)) {
          initialFocusRef.current = activeElement;
        } else {
          if (
            initialFocusRef.current &&
            drawerRef.current.contains(initialFocusRef.current)
          ) {
            initialFocusRef.current = null;
          }
        }

        if (focusableElements.length > 0) {
          // try to focus the first element
          focusableElements[0].focus();
        } else {
          // if no focusable elements, focus the drawer itself to trap focus
          drawerRef.current.focus();
        }
      }, 0);

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && drawerRef.current) {
          // re-query focusable elements within the handler in case content changed
          const currentFocusable = Array.from(
            drawerRef.current.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null);

          if (currentFocusable.length === 0) {
            // if no focusable elements, prevent tabbing away
            e.preventDefault();
            return;
          }

          const firstFocusable = currentFocusable[0];
          const lastFocusable = currentFocusable[currentFocusable.length - 1];

          if (e.shiftKey && document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);

      return () => {
        document.removeEventListener('keydown', handleTabKey);
        // restore focus only if it was saved and exists
        if (
          initialFocusRef.current &&
          document.body.contains(initialFocusRef.current)
        ) {
          initialFocusRef.current.focus();
        }
        initialFocusRef.current = null;
      };
    } else if (!isOpen && !isVisible) {
      initialFocusRef.current = null;
    }
  }, [isOpen, isVisible]);

  // handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnClickOutside) {
      onClose();
    }
  };

  // position-specific classes
  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'left-0 top-0 h-full';
      case 'right':
        return 'right-0 top-0 h-full';
      case 'top':
        return 'top-0 left-0 w-full';
      case 'bottom':
        return 'bottom-0 left-0 w-full';
      default:
        return 'right-0 top-0 h-full';
    }
  };

  // transform styles based on position and visibility state
  const getTransformStyle = () => {
    const transform = !isVisible
      ? position === 'left'
        ? 'translateX(-100%)'
        : position === 'right'
          ? 'translateX(100%)'
          : position === 'top'
            ? 'translateY(-100%)'
            : 'translateY(100%)'
      : 'translate(0, 0)';

    return {
      transform,
      transitionProperty: 'transform',
      transitionDuration: `${animationDuration}ms`,
      transitionTimingFunction: 'var(--ease-out, cubic-bezier(0, 0, 0.2, 1))',
    };
  };

  // backdrop classes
  const backdropClasses = cn(
    'fixed inset-0 bg-black/50 z-[999]',
    'transition-opacity',
    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
    backdropClassName
  );

  // drawer container classes
  const drawerClasses = cn(
    'fixed z-[1000] bg-background shadow-lg flex flex-col',
    getPositionClasses(),
    sizeMap[size]?.[position] ?? sizeMap.md.right,
    className
  );

  // content classes
  const contentClasses = cn(
    'flex flex-col h-full p-4 overflow-y-auto',
    contentClassName
  );

  // don't render anything if not mounted
  if (!isMounted) return null;

  const drawerContent = (
    <>
      {showBackdrop && (
        <div
          className={backdropClasses}
          data-testid="drawer-backdrop"
          style={{
            transitionDuration: `${animationDuration}ms`,
            transitionTimingFunction:
              'var(--ease-out, cubic-bezier(0, 0, 0.2, 1))',
          }}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
      <div
        ref={drawerRef}
        className={drawerClasses}
        style={getTransformStyle()}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        tabIndex={-1}
        id={id}
        onTransitionEnd={handleTransitionEnd}
        data-testid="drawer-container"
        {...rest}
      >
        {/* header */}
        {(header || hasCloseButton) && (
          <div className="px-4 py-3 border-b border-border flex items-center justify-between flex-shrink-0">
            {header ? (
              <div className="font-medium text-foreground text-lg flex-1 mr-2">
                {typeof header === 'string' ? <h2>{header}</h2> : header}
              </div>
            ) : (
              <div />
            )}

            {hasCloseButton && (
              <button
                className="text-muted-foreground p-1 hover:text-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={onClose}
                aria-label="Close drawer"
                data-testid="drawer-close-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            )}
          </div>
        )}

        {/* main content */}
        <div
          ref={contentRef}
          className={contentClasses}
          tabIndex={-1}
          data-testid="drawer-content-container"
        >
          {children}
        </div>

        {/* footer */}
        {footer && (
          <div
            className="px-4 py-3 border-t border-border mt-auto flex-shrink-0"
            data-testid="drawer-footer-container"
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );

  if (usePortal && typeof document !== 'undefined') {
    return createPortal(drawerContent, document.body);
  }

  return drawerContent;
}

export { Drawer };
