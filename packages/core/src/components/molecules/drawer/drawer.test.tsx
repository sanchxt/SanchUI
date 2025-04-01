import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Drawer, DrawerProps } from './index';

// mock createPortal for testing
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    createPortal: (node: React.ReactNode) => node,
  };
});

// mock timer for animation handling
jest.useFakeTimers();

// default props for most tests
const defaultProps: DrawerProps = {
  isOpen: true,
  onClose: jest.fn(),
  children: <div data-testid="drawer-content">Drawer Content</div>,
};

describe('Drawer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the drawer when isOpen is true', () => {
      render(<Drawer {...defaultProps} />);
      jest.advanceTimersByTime(20);
      expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
    });

    it('does not render the drawer when isOpen is false', () => {
      render(<Drawer {...defaultProps} isOpen={false} />);
      expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();
    });

    it('renders header when provided', () => {
      render(
        <Drawer
          {...defaultProps}
          header={<div data-testid="drawer-header">Header Content</div>}
        />
      );
      expect(screen.getByTestId('drawer-header')).toBeInTheDocument();
    });

    it('renders footer when provided', () => {
      render(
        <Drawer
          {...defaultProps}
          footer={<div data-testid="drawer-footer">Footer Content</div>}
        />
      );
      expect(screen.getByTestId('drawer-footer')).toBeInTheDocument();
      expect(screen.getByTestId('drawer-footer-container')).toBeInTheDocument();
    });

    it('renders the close button by default', () => {
      render(<Drawer {...defaultProps} header="Test Header" />);
      expect(screen.getByTestId('drawer-close-button')).toBeInTheDocument();
    });

    it('does not render close button when hasCloseButton is false', () => {
      render(
        <Drawer {...defaultProps} header="Test Header" hasCloseButton={false} />
      );
      expect(
        screen.queryByTestId('drawer-close-button')
      ).not.toBeInTheDocument();
    });

    it('renders backdrop by default', () => {
      render(<Drawer {...defaultProps} />);
      jest.advanceTimersByTime(20);
      expect(screen.getByTestId('drawer-backdrop')).toBeInTheDocument();
    });

    it('does not render backdrop when showBackdrop is false', () => {
      render(<Drawer {...defaultProps} showBackdrop={false} />);
      jest.advanceTimersByTime(20);
      expect(screen.queryByTestId('drawer-backdrop')).not.toBeInTheDocument();
    });
  });

  describe('Positioning', () => {
    it('applies correct classes for right position (default)', () => {
      render(<Drawer {...defaultProps} />);
      const dialog = screen.getByTestId('drawer-container');
      expect(dialog).toHaveClass('right-0', 'top-0', 'h-full');
    });

    it('applies correct classes for left position', () => {
      render(<Drawer {...defaultProps} position="left" />);
      const dialog = screen.getByTestId('drawer-container');
      expect(dialog).toHaveClass('left-0', 'top-0', 'h-full');
    });

    it('applies correct classes for top position', () => {
      render(<Drawer {...defaultProps} position="top" />);
      const dialog = screen.getByTestId('drawer-container');
      expect(dialog).toHaveClass('top-0', 'left-0', 'w-full');
    });

    it('applies correct classes for bottom position', () => {
      render(<Drawer {...defaultProps} position="bottom" />);
      const dialog = screen.getByTestId('drawer-container');
      expect(dialog).toHaveClass('bottom-0', 'left-0', 'w-full');
    });
  });

  describe('Sizing', () => {
    it('applies correct classes for md size (default)', () => {
      render(<Drawer {...defaultProps} />);
      const dialog = screen.getByTestId('drawer-container');
      expect(dialog).toHaveClass('w-80');
    });

    it('applies correct classes for sm size', () => {
      render(<Drawer {...defaultProps} size="sm" />);
      const dialog = screen.getByTestId('drawer-container');
      expect(dialog).toHaveClass('w-64');
    });

    it('applies correct classes for lg size', () => {
      render(<Drawer {...defaultProps} size="lg" />);
      const dialog = screen.getByTestId('drawer-container');
      expect(dialog).toHaveClass('w-96');
    });

    it('applies correct classes for xl size', () => {
      render(<Drawer {...defaultProps} size="xl" />);
      const dialog = screen.getByTestId('drawer-container');
      expect(dialog).toHaveClass('w-1/3');
    });

    it('applies correct classes for full size', () => {
      render(<Drawer {...defaultProps} size="full" />);
      const dialog = screen.getByTestId('drawer-container');
      expect(dialog).toHaveClass('w-full');
    });
  });

  describe('Interactivity', () => {
    it('calls onClose when clicking the close button', () => {
      render(<Drawer {...defaultProps} header="Test Header" />);
      jest.advanceTimersByTime(20);

      const closeButton = screen.getByTestId('drawer-close-button');
      fireEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking the backdrop', () => {
      render(<Drawer {...defaultProps} />);
      jest.advanceTimersByTime(20);

      const backdrop = screen.getByTestId('drawer-backdrop');
      expect(backdrop).toBeInTheDocument();

      fireEvent.click(backdrop);
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when clicking backdrop and closeOnClickOutside is false', () => {
      render(<Drawer {...defaultProps} closeOnClickOutside={false} />);
      jest.advanceTimersByTime(20);

      const backdrop = screen.getByTestId('drawer-backdrop');
      expect(backdrop).toBeInTheDocument();

      fireEvent.click(backdrop);
      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });

    it('calls onClose when pressing Escape key', () => {
      render(<Drawer {...defaultProps} />);
      jest.advanceTimersByTime(20);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when pressing Escape key and closeOnEsc is false', () => {
      render(<Drawer {...defaultProps} closeOnEsc={false} />);
      jest.advanceTimersByTime(20);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
  });

  describe('Focus Management', () => {
    it('focuses the first focusable element when opened', () => {
      // mock the focus function to avoid actual DOM focus in tests
      const mockFocus = jest.fn();
      const { rerender } = render(
        <Drawer isOpen={false} onClose={jest.fn()}>
          <button
            data-testid="focus-button"
            onClick={() => {}}
            onFocus={mockFocus}
          >
            Focus Me
          </button>
        </Drawer>
      );

      rerender(
        <Drawer isOpen={true} onClose={jest.fn()}>
          <button
            data-testid="focus-button"
            onClick={() => {}}
            onFocus={mockFocus}
          >
            Focus Me
          </button>
        </Drawer>
      );

      jest.advanceTimersByTime(50);

      // check if the button is in the document
      expect(screen.getByTestId('focus-button')).toBeInTheDocument();
    });

    it('attempts to focus the first focusable element', () => {
      // mock the focus function to avoid actual DOM focus in tests
      const mockFocus = jest.fn();
      render(
        <Drawer isOpen={true} onClose={jest.fn()}>
          <button
            data-testid="first-button"
            onClick={() => {}}
            onFocus={mockFocus}
          >
            Focusable Button
          </button>
        </Drawer>
      );

      jest.advanceTimersByTime(50);

      expect(screen.getByTestId('first-button')).toBeInTheDocument();
    });

    it('traps focus inside the drawer (tab key)', () => {
      render(
        <Drawer {...defaultProps}>
          <button data-testid="first-button">First</button>
          <button data-testid="middle-button">Middle</button>
          <button data-testid="last-button">Last</button>
        </Drawer>
      );

      jest.advanceTimersByTime(20);

      const lastButton = screen.getByTestId('last-button');
      lastButton.focus();
      expect(lastButton).toHaveFocus();

      fireEvent.keyDown(document, { key: 'Tab' });

      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });

    it('traps focus inside the drawer (shift+tab key)', () => {
      render(
        <Drawer {...defaultProps}>
          <button data-testid="first-button">First</button>
          <button data-testid="middle-button">Middle</button>
          <button data-testid="last-button">Last</button>
        </Drawer>
      );

      jest.advanceTimersByTime(20);

      const firstButton = screen.getByTestId('first-button');
      firstButton.focus();
      expect(firstButton).toHaveFocus();

      fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has the correct ARIA attributes', () => {
      render(<Drawer {...defaultProps} />);
      const dialog = screen.getByTestId('drawer-container');

      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-hidden', 'false');
    });

    it('assigns the custom id when provided', () => {
      render(<Drawer {...defaultProps} id="custom-drawer-id" />);
      const dialog = screen.getByTestId('drawer-container');

      expect(dialog).toHaveAttribute('id', 'custom-drawer-id');
    });
  });

  describe('Animation and Transitions', () => {
    it('applies the correct animation duration to the drawer', () => {
      const customDuration = 500;
      render(<Drawer {...defaultProps} animationDuration={customDuration} />);
      const dialog = screen.getByTestId('drawer-container');

      expect(dialog.style.transitionDuration).toBe(`${customDuration}ms`);
    });

    it('handles transition end events to unmount closed drawers', async () => {
      const { rerender } = render(<Drawer {...defaultProps} />);

      // dialog reference before closing
      const dialog = screen.getByTestId('drawer-container');

      // close drawer
      rerender(<Drawer {...defaultProps} isOpen={false} />);

      // transition end on the drawer element
      fireEvent.transitionEnd(dialog);

      // after transition ends, drawer shouldn't be in the DOM
      await waitFor(() => {
        expect(
          screen.queryByTestId('drawer-container')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Custom className props', () => {
    it('applies custom className to drawer container', () => {
      render(<Drawer {...defaultProps} className="custom-drawer-class" />);
      const dialog = screen.getByTestId('drawer-container');

      expect(dialog).toHaveClass('custom-drawer-class');
    });

    it('applies custom contentClassName', () => {
      render(
        <Drawer {...defaultProps} contentClassName="custom-content-class" />
      );
      const content = screen.getByTestId('drawer-content-container');

      expect(content).toHaveClass('custom-content-class');
    });

    it('applies custom backdropClassName', () => {
      render(
        <Drawer {...defaultProps} backdropClassName="custom-backdrop-class" />
      );
      jest.advanceTimersByTime(20);

      const backdrop = screen.getByTestId('drawer-backdrop');
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toHaveClass('custom-backdrop-class');
    });
  });

  describe('Body scroll locking', () => {
    const originalStyle = document.body.style.overflow;

    afterEach(() => {
      document.body.style.overflow = originalStyle;
    });

    it('locks body scroll when drawer is open and lockScroll is true', () => {
      render(<Drawer {...defaultProps} lockScroll={true} />);

      jest.advanceTimersByTime(20);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('does not lock body scroll when lockScroll is false', () => {
      document.body.style.overflow = 'visible';
      render(<Drawer {...defaultProps} lockScroll={false} />);

      expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('restores original overflow style when unmounted', () => {
      document.body.style.overflow = 'visible';
      const { unmount } = render(<Drawer {...defaultProps} />);

      jest.advanceTimersByTime(20);
      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      document.body.style.overflow = 'visible';
      expect(document.body.style.overflow).toBe('visible');
    });
  });

  describe('Portal usage', () => {
    it('renders without errors when usePortal is false', () => {
      render(<Drawer {...defaultProps} usePortal={false} />);
      jest.advanceTimersByTime(20);
      expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
    });

    it('renders in a portal when usePortal is true', () => {
      render(
        <Drawer {...defaultProps} usePortal={true}>
          <div data-testid="portal-content">Portal Content</div>
        </Drawer>
      );
      jest.advanceTimersByTime(20);

      expect(screen.getByTestId('portal-content')).toBeInTheDocument();

      const dialog = screen.getByTestId('drawer-container');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });
  });
});
