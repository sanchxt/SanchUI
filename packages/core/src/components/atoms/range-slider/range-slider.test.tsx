import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { RangeSlider } from './index';
import { act } from 'react';

const mockGetBoundingClientRect = () => {
  const original = Element.prototype.getBoundingClientRect;

  // Create a proper DOMRect-like object
  const mockRect = {
    width: 200,
    height: 200,
    top: 100,
    left: 100,
    right: 300,
    bottom: 300,
    x: 100,
    y: 100,
    toJSON: () => ({}),
  };

  // Use proper type casting
  Element.prototype.getBoundingClientRect = jest.fn(() => mockRect as DOMRect);

  return () => {
    Element.prototype.getBoundingClientRect = original;
  };
};

// Create proper event types
interface MockMouseEvent extends Partial<Event> {
  clientX?: number;
  clientY?: number;
}

interface MockTouchEvent extends Partial<Event> {
  touches?: Array<{ clientX: number; clientY: number }>;
}

type MockEvent = MockMouseEvent | MockTouchEvent | Partial<Event>;
type MockEventListener = (event: MockEvent) => void;

interface MockDocumentWithEvents extends Document {
  _mockListeners: Record<string, MockEventListener[]>;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
}

// Prepare our mock document with typed listeners
const setupMockListeners = () => {
  // Storage for our listeners
  const listeners: Record<string, MockEventListener[]> = {};

  // Create mocked add/remove listener functions
  const addListener = jest.fn((event: string, callback: MockEventListener) => {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);
  });

  const removeListener = jest.fn(
    (event: string, callback: MockEventListener) => {
      if (listeners[event]) {
        const index = listeners[event].indexOf(callback);
        if (index !== -1) {
          listeners[event].splice(index, 1);
        }
      }
    }
  );

  // Save original methods
  const originalAddEventListener = document.addEventListener;
  const originalRemoveEventListener = document.removeEventListener;

  // Apply mocks
  document.addEventListener = addListener;
  document.removeEventListener = removeListener;

  // Add helpers to trigger events
  const triggerEvent = (event: string, payload: MockEvent) => {
    if (listeners[event]) {
      listeners[event].forEach((callback) => callback(payload));
    }
  };

  // Restore original
  const restore = () => {
    document.addEventListener = originalAddEventListener;
    document.removeEventListener = originalRemoveEventListener;
  };

  return {
    triggerMouseMove: (clientX: number, clientY: number) =>
      triggerEvent('mousemove', { clientX, clientY }),
    triggerMouseUp: () => triggerEvent('mouseup', {}),
    triggerTouchMove: (touches: { clientX: number; clientY: number }[]) =>
      triggerEvent('touchmove', { touches }),
    triggerTouchEnd: () => triggerEvent('touchend', {}),
    getListeners: (event: string) => listeners[event] || [],
    restore,
  };
};

describe('RangeSlider', () => {
  let cleanupMock: () => void;
  let mockEvents: ReturnType<typeof setupMockListeners>;

  beforeEach(() => {
    cleanupMock = mockGetBoundingClientRect();
    mockEvents = setupMockListeners();
  });

  afterEach(() => {
    cleanupMock();
    mockEvents.restore();
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<RangeSlider />);
    const slider = screen.getByRole('slider');

    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders with custom min, max values', () => {
    render(<RangeSlider min={10} max={50} />);
    const slider = screen.getByRole('slider');

    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '50');
  });

  it('renders with a label', () => {
    render(<RangeSlider label="Volume" />);

    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('renders in disabled state', () => {
    render(<RangeSlider disabled />);
    const slider = screen.getByRole('slider');

    expect(slider).toHaveAttribute('aria-disabled', 'true');
    expect(slider).toHaveAttribute('tabindex', '-1');
  });

  it('renders min/max labels when showMinMaxLabels is true', () => {
    render(<RangeSlider min={0} max={100} showMinMaxLabels />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders with a single handle by default', () => {
    const { container } = render(<RangeSlider />);

    // One handle for single value
    const handles = container.querySelectorAll('[data-handle="max"]');
    expect(handles.length).toBe(1);
  });

  it('renders with two handles when defaultValue is an array', () => {
    const { container } = render(<RangeSlider defaultValue={[25, 75]} />);

    // Should have min and max handles for range
    const minHandles = container.querySelectorAll('[data-handle="min"]');
    const maxHandles = container.querySelectorAll('[data-handle="max"]');
    expect(minHandles.length).toBe(1);
    expect(maxHandles.length).toBe(1);
  });
});
