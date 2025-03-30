import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

// Try to import icons, with fallbacks
let CheckCircle: React.ComponentType<{ className?: string }>;
let AlertCircle: React.ComponentType<{ className?: string }>;
let InfoIcon: React.ComponentType<{ className?: string }>;
let AlertTriangle: React.ComponentType<{ className?: string }>;
let X: React.ComponentType<{ className?: string }>;

try {
  const icons = require('lucide-react');
  CheckCircle = icons.CheckCircle;
  AlertCircle = icons.AlertCircle;
  InfoIcon = icons.Info;
  AlertTriangle = icons.AlertTriangle;
  X = icons.X;
} catch (e) {
  // Fallback SVG icons
  CheckCircle = ({ className }: { className?: string }) => (
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
      data-testid="check-circle-icon"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  AlertCircle = ({ className }: { className?: string }) => (
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
      data-testid="alert-circle-icon"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );

  InfoIcon = ({ className }: { className?: string }) => (
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
      data-testid="info-icon"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );

  AlertTriangle = ({ className }: { className?: string }) => (
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
      data-testid="alert-triangle-icon"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );

  X = ({ className }: { className?: string }) => (
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
      data-testid="x-icon"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// Types
export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'default'
  | 'loading';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

// omit title attribute to avoid type conflict
export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Title of the toast
   */
  title?: React.ReactNode;
  /**
   * Description of the toast
   */
  description?: React.ReactNode;
  /**
   * Type of the toast
   * @default 'default'
   */
  type?: ToastType;
  /**
   * Duration in milliseconds
   * @default 5000
   */
  duration?: number;
  /**
   * Whether the toast is open
   * @default true
   */
  open?: boolean;
  /**
   * Whether to show a close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Action button for the toast
   */
  action?: React.ReactNode;
  /**
   * Optional icon to override the default icon
   */
  icon?: React.ReactNode;
  /**
   * Size of the toast
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large';
  /**
   * Callback function when toast is closed
   */
  onClose?: () => void;
  /**
   * Callback function when toast action is clicked
   */
  onAction?: () => void;
  /**
   * Adds a progress bar to show remaining time
   * @default false
   */
  showProgress?: boolean;
  /**
   * Whether the toast can be dismissed by clicking on it
   * @default false
   */
  dismissible?: boolean;
  /**
   * Pauses the timer when hovering over the toast
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Unique ID for the toast
   */
  id?: string;
  /**
   * The z-index of the toast
   * @default 9999
   */
  zIndex?: number;
}

export interface ToastContextProps {
  toasts: (ToastProps & { id: string })[];
  addToast: (toast: Omit<ToastProps, 'open'>) => string;
  updateToast: (id: string, toast: Partial<ToastProps>) => void;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
  position: ToastPosition;
  setPosition: (position: ToastPosition) => void;
}

// Create context
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

/**
 * Generate a unique ID for toasts
 */
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const Toast = (props: ToastProps) => {
  const {
    title,
    description,
    type = 'default',
    duration = 5000,
    open = true,
    showCloseButton = true,
    action,
    icon,
    size = 'default',
    onClose,
    onAction,
    showProgress = false,
    dismissible = false,
    pauseOnHover = true,
    className,
    children,
    id,
    zIndex = 9999,
    ...rest
  } = props;

  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  // Handle timeout for auto-dismiss
  useEffect(() => {
    if (!open || duration === Infinity || isPaused) return;

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [open, duration, onClose, isPaused, timeLeft]);

  // Update progress bar
  useEffect(() => {
    if (!open || duration === Infinity || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 100) {
          clearInterval(interval);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [open, duration, isPaused]);

  // Reset timer when duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Handle mouse events for pauseOnHover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  // Handle click for dismissible toasts
  const handleClick = useCallback(() => {
    if (dismissible && onClose) {
      onClose();
    }
  }, [dismissible, onClose]);

  // Handle close button click
  const handleCloseClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onClose) onClose();
    },
    [onClose]
  );

  // Handle action button click
  const handleActionClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onAction) onAction();
    },
    [onAction]
  );

  // Determine icon based on type
  const getIcon = useCallback(() => {
    if (icon) return icon;

    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'info':
        return <InfoIcon className="h-5 w-5 text-info" />;
      case 'loading':
        return (
          <div className="h-5 w-5" role="status" data-testid="loading-spinner">
            <svg
              className="animate-spin h-5 w-5 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        );
      default:
        return null;
    }
  }, [type, icon]);

  // If not open, don't render
  if (!open) return null;

  return (
    <div
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={cn(
        'relative overflow-hidden rounded-md shadow-md',
        'flex w-full items-start gap-3 p-4',
        'border text-foreground bg-background',
        'transition-all duration-300 ease-in-out',
        {
          'border-success/20 bg-success/10': type === 'success',
          'border-destructive/20 bg-destructive/10': type === 'error',
          'border-warning/20 bg-warning/10': type === 'warning',
          'border-info/20 bg-info/10': type === 'info',
          'animate-pulse': type === 'loading',
          'py-2 px-3 text-sm': size === 'small',
          'p-4': size === 'default',
          'p-5': size === 'large',
          'cursor-pointer': dismissible,
        },
        className
      )}
      style={{ zIndex }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="toast"
      data-type={type}
      data-size={size}
      {...rest}
    >
      {/* Icon */}
      {getIcon() && <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>}

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1">
        {title && (
          <div
            className={cn('font-semibold', {
              'text-sm': size === 'small',
              'text-base': size === 'default',
              'text-lg': size === 'large',
            })}
            data-testid="toast-title"
          >
            {title}
          </div>
        )}
        {description && (
          <div
            className={cn('text-muted-foreground', {
              'text-xs': size === 'small',
              'text-sm': size === 'default',
              'text-base': size === 'large',
            })}
            data-testid="toast-description"
          >
            {description}
          </div>
        )}
        {children && <div data-testid="toast-children">{children}</div>}
        {action && (
          <div className="mt-2" data-testid="toast-action">
            <button
              className={cn(
                'inline-flex items-center justify-center font-medium',
                'transition-colors focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-ring rounded-md text-sm',
                'text-primary hover:text-primary/90 disabled:pointer-events-none',
                {
                  'h-8 px-3': size === 'default' || size === 'large',
                  'h-7 px-2 text-xs': size === 'small',
                }
              )}
              onClick={handleActionClick}
            >
              {action}
            </button>
          </div>
        )}
      </div>

      {/* Close Button */}
      {showCloseButton && (
        <button
          className={cn(
            'rounded-md p-1 text-foreground/50 hover:text-foreground',
            'transition-colors hover:bg-background focus:outline-none',
            'focus:ring-2 focus:ring-ring'
          )}
          onClick={handleCloseClick}
          aria-label="Close"
          data-testid="toast-close-button"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Progress bar */}
      {showProgress && duration !== Infinity && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-primary"
          style={{ width: `${(timeLeft / duration) * 100}%` }}
          data-testid="toast-progress"
        />
      )}
    </div>
  );
};

// Create a container component for multiple toasts
export const ToastContainer: React.FC<{
  position?: ToastPosition;
  children?: React.ReactNode;
  className?: string;
}> = ({ position = 'bottom-right', children, className }) => {
  // Calculate position classes
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-0 right-0',
  };

  return (
    <div
      className={cn(
        'fixed z-[9999] flex flex-col p-4 gap-2 max-w-md w-full',
        positionClasses[position],
        className
      )}
      data-testid="toast-container"
      data-position={position}
    >
      {children}
    </div>
  );
};

// Toast Provider
export interface ToastProviderProps {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = 'bottom-right',
}) => {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);
  const [position, setPosition] = useState<ToastPosition>(defaultPosition);

  // Add a new toast
  const addToast = useCallback((toast: Omit<ToastProps, 'open'>) => {
    const id = toast.id || generateId();
    setToasts((prev) => [...prev, { ...toast, id, open: true }]);
    return id;
  }, []);

  // Update an existing toast
  const updateToast = useCallback((id: string, toast: Partial<ToastProps>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...toast } : t))
    );
  }, []);

  // Remove a toast
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Remove all toasts
  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Auto-remove toasts when they close
  useEffect(() => {
    const handleRemove = (toast: ToastProps & { id: string }) => {
      if (toast.onClose) {
        toast.onClose();
      }
      removeToast(toast.id);
    };

    // Process toasts that need to be removed
    toasts.forEach((toast) => {
      if (toast.open === false) {
        handleRemove(toast);
      }
    });
  }, [toasts, removeToast]);

  const contextValue = {
    toasts,
    addToast,
    updateToast,
    removeToast,
    removeAllToasts,
    position,
    setPosition,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <ToastContainer position={position}>
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                onClose={() => {
                  updateToast(toast.id, { open: false });
                }}
              />
            ))}
          </ToastContainer>,
          document.body
        )}
    </ToastContext.Provider>
  );
};

// Hook to use the toast context
export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Create a separate toast utilities object to avoid direct hook calls
let toastUtils: ToastContextProps | null = null;

// Function to set the toast utils
export const setToastUtils = (utils: ToastContextProps) => {
  toastUtils = utils;
};

// Component to initialize toast utils
export const ToastInitializer: React.FC = () => {
  const utils = useToast();

  useEffect(() => {
    setToastUtils(utils);
  }, [utils]);

  return null;
};

// Utility functions for common toast types
export const toast = {
  /**
   * Show a success toast
   */
  success: (props: Omit<ToastProps, 'type'>) => {
    if (!toastUtils) {
      console.error(
        'Toast utilities not initialized. Wrap your app with ToastProvider and include ToastInitializer.'
      );
      return '';
    }
    return toastUtils.addToast({ ...props, type: 'success' });
  },
  /**
   * Show an error toast
   */
  error: (props: Omit<ToastProps, 'type'>) => {
    if (!toastUtils) {
      console.error(
        'Toast utilities not initialized. Wrap your app with ToastProvider and include ToastInitializer.'
      );
      return '';
    }
    return toastUtils.addToast({ ...props, type: 'error' });
  },
  /**
   * Show a warning toast
   */
  warning: (props: Omit<ToastProps, 'type'>) => {
    if (!toastUtils) {
      console.error(
        'Toast utilities not initialized. Wrap your app with ToastProvider and include ToastInitializer.'
      );
      return '';
    }
    return toastUtils.addToast({ ...props, type: 'warning' });
  },
  /**
   * Show an info toast
   */
  info: (props: Omit<ToastProps, 'type'>) => {
    if (!toastUtils) {
      console.error(
        'Toast utilities not initialized. Wrap your app with ToastProvider and include ToastInitializer.'
      );
      return '';
    }
    return toastUtils.addToast({ ...props, type: 'info' });
  },
  /**
   * Show a default toast
   */
  default: (props: Omit<ToastProps, 'type'>) => {
    if (!toastUtils) {
      console.error(
        'Toast utilities not initialized. Wrap your app with ToastProvider and include ToastInitializer.'
      );
      return '';
    }
    return toastUtils.addToast({ ...props, type: 'default' });
  },
  /**
   * Show a loading toast
   */
  loading: (props: Omit<ToastProps, 'type'>) => {
    if (!toastUtils) {
      console.error(
        'Toast utilities not initialized. Wrap your app with ToastProvider and include ToastInitializer.'
      );
      return '';
    }
    return toastUtils.addToast({ ...props, type: 'loading' });
  },
  /**
   * Show a toast with promise
   */
  promise: <T,>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: Omit<ToastProps, 'type'>;
      success: (data: T) => Omit<ToastProps, 'type'>;
      error: (err: unknown) => Omit<ToastProps, 'type'>;
    }
  ) => {
    if (!toastUtils) {
      console.error(
        'Toast utilities not initialized. Wrap your app with ToastProvider and include ToastInitializer.'
      );
      return promise;
    }

    const id = toastUtils.addToast({ ...loading, type: 'loading' });

    promise
      .then((data) => {
        toastUtils?.updateToast(id, { ...success(data), type: 'success' });
        return data;
      })
      .catch((err) => {
        toastUtils?.updateToast(id, { ...error(err), type: 'error' });
        return Promise.reject(err);
      });

    return promise;
  },
  /**
   * Dismiss all toasts
   */
  dismiss: (toastId?: string) => {
    if (!toastUtils) {
      console.error(
        'Toast utilities not initialized. Wrap your app with ToastProvider and include ToastInitializer.'
      );
      return;
    }

    if (toastId) {
      toastUtils.removeToast(toastId);
    } else {
      toastUtils.removeAllToasts();
    }
  },
  /**
   * Create a custom toast
   */
  custom: (props: ToastProps) => {
    if (!toastUtils) {
      console.error(
        'Toast utilities not initialized. Wrap your app with ToastProvider and include ToastInitializer.'
      );
      return '';
    }
    return toastUtils.addToast(props);
  },
};
