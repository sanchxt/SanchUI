import React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Toast,
  ToastContainer,
  ToastProvider,
  useToast,
  ToastProps,
  ToastPosition,
  ToastInitializer,
} from './index'; // Adjust the import path as needed

// Mock timer
jest.useFakeTimers();

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  CheckCircle: function CheckCircle(props: any) {
    return <div data-testid="check-circle-icon" {...props} />;
  },
  AlertCircle: function AlertCircle(props: any) {
    return <div data-testid="alert-circle-icon" {...props} />;
  },
  InfoIcon: function InfoIcon(props: any) {
    return <div data-testid="info-icon" {...props} />;
  },
  AlertTriangle: function AlertTriangle(props: any) {
    return <div data-testid="alert-triangle-icon" {...props} />;
  },
  X: function X(props: any) {
    return <div data-testid="x-icon" {...props} />;
  },
}));

// Mock createPortal to make testing easier
jest.mock('react-dom', () => {
  const originalModule = jest.requireActual('react-dom');
  return {
    ...originalModule,
    createPortal: (node: React.ReactNode) => node,
  };
});

// Test component to trigger toast APIs
const TestComponent = ({
  toastProps,
}: {
  toastProps?: Partial<ToastProps>;
}) => {
  const { addToast, removeAllToasts } = useToast();

  const handleAddToast = () => {
    addToast({
      title: 'Test Toast',
      description: 'This is a test toast',
      ...toastProps,
    });
  };

  const handleClearToasts = () => {
    removeAllToasts();
  };

  return (
    <div>
      <button data-testid="add-toast-button" onClick={handleAddToast}>
        Add Toast
      </button>
      <button data-testid="clear-toasts-button" onClick={handleClearToasts}>
        Clear Toasts
      </button>
    </div>
  );
};

// Create a wrapper component with the ToastProvider
const ToastWrapper = ({
  children,
  defaultPosition,
}: {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
}) => (
  <ToastProvider defaultPosition={defaultPosition}>
    <ToastInitializer />
    {children}
  </ToastProvider>
);

describe('Toast Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders correctly with title and description', () => {
    render(
      <Toast title="Test Title" description="Test Description" open={true} />
    );

    expect(screen.getByTestId('toast')).toBeInTheDocument();
    expect(screen.getByTestId('toast-title')).toHaveTextContent('Test Title');
    expect(screen.getByTestId('toast-description')).toHaveTextContent(
      'Test Description'
    );
  });

  it('does not render when open is false', () => {
    const { container } = render(
      <Toast title="Test Title" description="Test Description" open={false} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders with different types', () => {
    render(
      <div>
        <Toast
          title="Success Toast"
          type="success"
          open={true}
          data-testid="success-toast"
        />
        <Toast
          title="Error Toast"
          type="error"
          open={true}
          data-testid="error-toast"
        />
        <Toast
          title="Warning Toast"
          type="warning"
          open={true}
          data-testid="warning-toast"
        />
        <Toast
          title="Info Toast"
          type="info"
          open={true}
          data-testid="info-toast"
        />
        <Toast
          title="Loading Toast"
          type="loading"
          open={true}
          data-testid="loading-toast"
        />
        <Toast
          title="Default Toast"
          type="default"
          open={true}
          data-testid="default-toast"
        />
      </div>
    );

    // Check that each toast has rendered with the right type
    expect(screen.getByTestId('success-toast')).toHaveAttribute(
      'data-type',
      'success'
    );
    expect(screen.getByTestId('error-toast')).toHaveAttribute(
      'data-type',
      'error'
    );
    expect(screen.getByTestId('warning-toast')).toHaveAttribute(
      'data-type',
      'warning'
    );
    expect(screen.getByTestId('info-toast')).toHaveAttribute(
      'data-type',
      'info'
    );
    expect(screen.getByTestId('loading-toast')).toHaveAttribute(
      'data-type',
      'loading'
    );
    expect(screen.getByTestId('default-toast')).toHaveAttribute(
      'data-type',
      'default'
    );

    // Check that appropriate icons are rendered
    expect(screen.getByTestId('check-circle-icon')).toBeInTheDocument();
    expect(screen.getByTestId('alert-circle-icon')).toBeInTheDocument();
    expect(screen.getByTestId('alert-triangle-icon')).toBeInTheDocument();
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    render(
      <div>
        <Toast
          title="Small Toast"
          size="small"
          open={true}
          data-testid="small-toast"
        />
        <Toast
          title="Default Toast"
          size="default"
          open={true}
          data-testid="default-toast"
        />
        <Toast
          title="Large Toast"
          size="large"
          open={true}
          data-testid="large-toast"
        />
      </div>
    );

    expect(screen.getByTestId('small-toast')).toHaveAttribute(
      'data-size',
      'small'
    );
    expect(screen.getByTestId('default-toast')).toHaveAttribute(
      'data-size',
      'default'
    );
    expect(screen.getByTestId('large-toast')).toHaveAttribute(
      'data-size',
      'large'
    );
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup({ delay: null });
    const onClose = jest.fn();
    render(
      <Toast
        title="Test Toast"
        open={true}
        onClose={onClose}
        showCloseButton={true}
      />
    );

    const closeButton = screen.getByTestId('toast-close-button');

    // Use fireEvent for more direct interaction
    fireEvent.click(closeButton);

    // Wait for the callback to be called
    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 }
    );
  });

  it('calls onAction when action button is clicked', async () => {
    const onAction = jest.fn();
    render(
      <Toast
        title="Test Toast"
        open={true}
        action="Action"
        onAction={onAction}
      />
    );

    const actionButton = screen.getByText('Action');

    // Use fireEvent for more direct interaction
    fireEvent.click(actionButton);

    // Wait for the callback to be called
    await waitFor(
      () => {
        expect(onAction).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 }
    );
  });

  it('auto-closes after duration', () => {
    const onClose = jest.fn();
    render(
      <Toast title="Test Toast" open={true} onClose={onClose} duration={2000} />
    );

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('pauses timer when hovering and pauseOnHover is true', () => {
    const onClose = jest.fn();
    render(
      <Toast
        title="Test Toast"
        open={true}
        onClose={onClose}
        duration={2000}
        pauseOnHover={true}
      />
    );

    // Hover over toast
    act(() => {
      fireEvent.mouseEnter(screen.getByTestId('toast'));
    });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Should not have closed because timer was paused
    expect(onClose).not.toHaveBeenCalled();

    // Move mouse away
    act(() => {
      fireEvent.mouseLeave(screen.getByTestId('toast'));
    });

    // Fast-forward time again
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Should now be closed
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('dismisses when clicked if dismissible is true', async () => {
    const onClose = jest.fn();
    render(
      <Toast
        title="Test Toast"
        open={true}
        onClose={onClose}
        dismissible={true}
      />
    );

    fireEvent.click(screen.getByTestId('toast'));

    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 }
    );
  });

  it('does not dismiss when clicked if dismissible is false', async () => {
    const onClose = jest.fn();
    render(
      <Toast
        title="Test Toast"
        open={true}
        onClose={onClose}
        dismissible={false}
      />
    );

    fireEvent.click(screen.getByTestId('toast'));

    // Wait a bit to ensure callback isn't called
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders with custom icon', () => {
    render(
      <Toast
        title="Custom Icon Toast"
        open={true}
        icon={<div data-testid="custom-icon">Custom Icon</div>}
      />
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders progress bar when showProgress is true', () => {
    render(
      <Toast
        title="Progress Toast"
        open={true}
        showProgress={true}
        duration={5000}
      />
    );

    expect(screen.getByTestId('toast-progress')).toBeInTheDocument();
  });

  it('does not render progress bar when showProgress is false', () => {
    render(
      <Toast title="No Progress Toast" open={true} showProgress={false} />
    );

    expect(screen.queryByTestId('toast-progress')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Toast
        title="Custom Class Toast"
        open={true}
        className="custom-toast-class"
      />
    );

    expect(screen.getByTestId('toast')).toHaveClass('custom-toast-class');
  });

  it('allows children content', () => {
    render(
      <Toast open={true}>
        <div data-testid="custom-children">Custom Children Content</div>
      </Toast>
    );

    expect(screen.getByTestId('custom-children')).toBeInTheDocument();
    expect(screen.getByText('Custom Children Content')).toBeInTheDocument();
  });

  // ToastContainer tests
  describe('ToastContainer Component', () => {
    it('renders with correct position', () => {
      render(<ToastContainer position="top-right" />);
      expect(screen.getByTestId('toast-container')).toHaveAttribute(
        'data-position',
        'top-right'
      );
    });

    it('uses bottom-right as default position', () => {
      render(<ToastContainer />);
      expect(screen.getByTestId('toast-container')).toHaveAttribute(
        'data-position',
        'bottom-right'
      );
    });

    it('applies custom className', () => {
      render(<ToastContainer className="custom-container-class" />);
      expect(screen.getByTestId('toast-container')).toHaveClass(
        'custom-container-class'
      );
    });
  });

  // ToastProvider and useToast tests
  describe('ToastProvider and useToast', () => {
    it('adds and displays toast', async () => {
      render(
        <ToastWrapper>
          <TestComponent />
        </ToastWrapper>
      );

      // Click to add a toast
      fireEvent.click(screen.getByTestId('add-toast-button'));

      // Check if toast is rendered with waitFor
      await waitFor(
        () => {
          expect(screen.getByText('Test Toast')).toBeInTheDocument();
          expect(screen.getByText('This is a test toast')).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    it('removes all toasts when clear is called', async () => {
      render(
        <ToastWrapper>
          <TestComponent />
        </ToastWrapper>
      );

      // Add toast
      fireEvent.click(screen.getByTestId('add-toast-button'));

      // Wait for toast to appear
      await waitFor(
        () => {
          expect(screen.getByText('Test Toast')).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Clear toasts
      fireEvent.click(screen.getByTestId('clear-toasts-button'));

      // Wait for toast to disappear
      await waitFor(
        () => {
          expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    it('respects default position from provider', async () => {
      render(
        <ToastWrapper defaultPosition="top-left">
          <TestComponent />
        </ToastWrapper>
      );

      await userEvent.click(screen.getByTestId('add-toast-button'));

      // Wait for the toast container to be updated with the position
      await waitFor(() => {
        expect(screen.getByTestId('toast-container')).toHaveAttribute(
          'data-position',
          'top-left'
        );
      });
    });

    it('renders toast with specified type', async () => {
      render(
        <ToastWrapper>
          <TestComponent toastProps={{ type: 'success' }} />
        </ToastWrapper>
      );

      await userEvent.click(screen.getByTestId('add-toast-button'));

      // Wait for the toast to appear with success type
      await waitFor(() => {
        const successToast = screen.getByTestId('toast');
        expect(successToast).toHaveAttribute('data-type', 'success');
        expect(screen.getByTestId('check-circle-icon')).toBeInTheDocument();
      });
    });
  });
});
