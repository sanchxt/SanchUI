import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorPicker, ColorValue } from './index';

jest.mock('lucide-react', () => ({
  EyeDropper: () => <div data-testid="mock-eye-dropper" />,
  Check: () => <div data-testid="mock-check" />,
  Copy: () => <div data-testid="mock-copy" />,
  Pipette: () => <div data-testid="mock-pipette" />,
  RefreshCw: () => <div data-testid="mock-refresh-cw" />,
}));

// Mock the EyeDropper API if not available in test environment
const mockEyeDropper = {
  open: jest.fn().mockResolvedValue({ sRGBHex: '#ff0000' }),
};

// Create a mock function for clipboard writeText
const mockClipboardWriteText = jest.fn().mockResolvedValue(undefined);

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  configurable: true,
  value: {
    writeText: mockClipboardWriteText,
  },
});

// Mocking window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('ColorPicker', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Ensure clipboard mock is properly set up
    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: mockClipboardWriteText,
      },
    });

    // Mock the EyeDropper API
    if (typeof window !== 'undefined') {
      // @ts-ignore - mocking EyeDropper API
      window.EyeDropper = jest.fn().mockImplementation(() => mockEyeDropper);
    }
  });

  it('renders correctly with default props', () => {
    const { container } = render(<ColorPicker />);
    expect(container).toBeInTheDocument();

    // Default color should be visible
    const colorPreview = container.querySelector(
      'div[style*="background-color"]'
    );
    expect(colorPreview).toBeInTheDocument();
  });

  it('renders with a custom initial color value', () => {
    const { container } = render(<ColorPicker value="#ff0000" />);

    // Get the input that should display the hex value
    const input = screen.getByDisplayValue('#ff0000');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange handler when color changes', () => {
    const handleChange = jest.fn();
    const { container } = render(<ColorPicker onChange={handleChange} />);

    // Find the hex input
    const hexInput = container.querySelector('input[type="text"]');
    expect(hexInput).toBeInTheDocument();

    // Change the hex value
    if (hexInput) {
      fireEvent.change(hexInput, { target: { value: '#ff0000' } });
      expect(handleChange).toHaveBeenCalledWith('#ff0000', expect.any(Object));
    }
  });

  it('switches between color modes correctly', async () => {
    const user = userEvent.setup();
    const { container } = render(<ColorPicker showFormatToggle />);

    // Find the mode buttons
    const rgbButton = screen.getByText('rgb', { exact: false });
    const hslButton = screen.getByText('hsl', { exact: false });

    // Switch to RGB mode
    await user.click(rgbButton);
    expect(container.textContent).toContain('R');
    expect(container.textContent).toContain('G');
    expect(container.textContent).toContain('B');

    // Switch to HSL mode
    await user.click(hslButton);
    expect(container.textContent).toContain('H');
    expect(container.textContent).toContain('S');
    expect(container.textContent).toContain('L');
  });

  it('handles RGB input changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { container } = render(
      <ColorPicker onChange={handleChange} defaultMode="rgb" showFormatToggle />
    );

    // Find the RGB inputs
    const rgbInputs = container.querySelectorAll('input[type="number"]');
    expect(rgbInputs.length).toBe(3); // R, G, B inputs

    // Change the R value
    await user.clear(rgbInputs[0]);
    await user.type(rgbInputs[0], '255');

    expect(handleChange).toHaveBeenCalled();

    // The last call should contain RGB with R=255
    const lastCall =
      handleChange.mock.calls[handleChange.mock.calls.length - 1];
    const colorObj = lastCall[1] as ColorValue;
    expect(colorObj.rgb.r).toBe(255);
  });

  it('handles HSL input changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { container } = render(
      <ColorPicker onChange={handleChange} defaultMode="hsl" showFormatToggle />
    );

    // Find the HSL inputs
    const hslInputs = container.querySelectorAll('input[type="number"]');
    expect(hslInputs.length).toBe(3); // H, S, L inputs

    // Change the H value
    await user.clear(hslInputs[0]);
    await user.type(hslInputs[0], '180');

    expect(handleChange).toHaveBeenCalled();

    // The last call should contain HSL with H=180
    const lastCall =
      handleChange.mock.calls[handleChange.mock.calls.length - 1];
    const colorObj = lastCall[1] as ColorValue;
    expect(colorObj.hsl.h).toBe(180);
  });

  it('handles alpha slider changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { container } = render(
      <ColorPicker onChange={handleChange} withAlpha />
    );

    // Find the alpha slider (should be the second range input)
    const sliders = container.querySelectorAll('input[type="range"]');
    expect(sliders.length).toBeGreaterThanOrEqual(2); // At least hue and alpha sliders

    const alphaSlider = sliders[1]; // Assuming the second slider is alpha

    // Change alpha to 0.5
    fireEvent.change(alphaSlider, { target: { value: '0.5' } });

    expect(handleChange).toHaveBeenCalled();

    // The last call should contain alpha=0.5
    const lastCall =
      handleChange.mock.calls[handleChange.mock.calls.length - 1];
    const colorObj = lastCall[1] as ColorValue;
    expect(colorObj.rgb.a).toBe(0.5);
  });

  it('handles preset color selection', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const presets = ['#ff0000', '#00ff00', '#0000ff'];

    const { container } = render(
      <ColorPicker onChange={handleChange} presets={presets} showPresets />
    );

    // Find preset buttons (should be at least 3)
    const presetButtons = container.querySelectorAll(
      '[aria-label^="Select color #"]'
    );
    expect(presetButtons.length).toBeGreaterThanOrEqual(3);

    // Click the first preset (#ff0000)
    await user.click(presetButtons[0]);

    // Check if onChange was called with the correct color
    expect(handleChange).toHaveBeenCalledWith('#ff0000', expect.any(Object));
  });

  it('handles copy to clipboard', async () => {
    // Reset mock before test
    mockClipboardWriteText.mockClear();

    // Force the clipboard mock to be available
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: mockClipboardWriteText },
    });

    // Render with a controlled setup
    const { getByRole } = render(
      <ColorPicker
        value="#ff0000"
        showCopyButton={true}
        returnFormat="hex" // Force hex format to ensure predictable behavior
      />
    );

    // Get the button directly with getByRole
    const copyButton = getByRole('button', {
      name: /copy color to clipboard/i,
    });

    // Simulate a click (using fireEvent for direct invocation)
    fireEvent.click(copyButton);

    // Wait a moment for any potential async operations
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Now check if the mock was called
    expect(mockClipboardWriteText).toHaveBeenCalledWith('#ff0000');
  });

  it('handles eye dropper click when supported', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    const { container } = render(
      <ColorPicker onChange={handleChange} showEyeDropper />
    );

    // Find eye dropper button
    const eyeDropperButton = container.querySelector(
      '[aria-label="Use eye dropper to pick color from screen"]'
    );
    expect(eyeDropperButton).toBeInTheDocument();

    // Click eye dropper button
    if (eyeDropperButton) {
      await user.click(eyeDropperButton);

      // Wait for the promise to resolve
      await act(async () => {
        await Promise.resolve();
      });

      // Check if EyeDropper.open was called
      expect(mockEyeDropper.open).toHaveBeenCalled();

      // Check if onChange was called with the color from eye dropper
      expect(handleChange).toHaveBeenCalledWith('#ff0000', expect.any(Object));
    }
  });

  it('disables all interactive elements when disabled prop is true', () => {
    const { container } = render(<ColorPicker disabled />);

    // All inputs should be disabled
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });

    // All buttons should be disabled
    const buttons = container.querySelectorAll('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });

    // Container should have disabled styles
    const colorPickerContainer = container.firstChild;
    expect(colorPickerContainer).toHaveClass('opacity-50');
    expect(colorPickerContainer).toHaveClass('cursor-not-allowed');
  });

  it('renders with different sizes', () => {
    const { container: containerSm, unmount: unmountSm } = render(
      <ColorPicker size="sm" />
    );
    expect(containerSm.firstChild).toHaveClass('w-56');
    unmountSm();

    const { container: containerMd, unmount: unmountMd } = render(
      <ColorPicker size="md" />
    );
    expect(containerMd.firstChild).toHaveClass('w-64');
    unmountMd();

    const { container: containerLg } = render(<ColorPicker size="lg" />);
    expect(containerLg.firstChild).toHaveClass('w-80');
  });

  // Test color calculations
  it('correctly converts between color formats', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <ColorPicker onChange={handleChange} value="#ff0000" />
    );

    // Find the mode buttons
    const rgbButton = screen.getByText('rgb', { exact: false });
    const hslButton = screen.getByText('hsl', { exact: false });

    // Switch to RGB mode
    fireEvent.click(rgbButton);

    // Find RGB inputs and check values
    const rgbInputs = container.querySelectorAll('input[type="number"]');
    expect(rgbInputs[0]).toHaveValue(255); // R
    expect(rgbInputs[1]).toHaveValue(0); // G
    expect(rgbInputs[2]).toHaveValue(0); // B

    // Switch to HSL mode
    fireEvent.click(hslButton);

    // Find HSL inputs and check values
    const hslInputs = container.querySelectorAll('input[type="number"]');
    expect(hslInputs[0]).toHaveValue(0); // H
    expect(hslInputs[1]).toHaveValue(100); // S
    expect(hslInputs[2]).toHaveValue(50); // L
  });

  it('handles saturation-lightness area click', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const { container } = render(<ColorPicker onChange={handleChange} />);

    // Find the saturation-lightness area
    const slArea = container.querySelector(`.cursor-crosshair`);
    expect(slArea).toBeInTheDocument();

    // Click in the middle of the area
    // This is a bit tricky to test precisely because getBoundingClientRect is not implemented in jsdom
    // So we mock a click event with clientX and clientY properties
    if (slArea) {
      const mockEvent = {
        clientX: 50,
        clientY: 50,
        currentTarget: {
          getBoundingClientRect: () => ({
            left: 0,
            top: 0,
            width: 100,
            height: 100,
            right: 100,
            bottom: 100,
          }),
        },
      };

      // Simulate a click event with our mock event object
      fireEvent.click(slArea, mockEvent);

      // Check if onChange was called
      expect(handleChange).toHaveBeenCalled();
    }
  });

  it('returns color in correct format based on returnFormat prop', () => {
    // Test returnFormat = 'hex'
    const handleChangeHex = jest.fn();
    const { unmount: unmountHex } = render(
      <ColorPicker
        onChange={handleChangeHex}
        value="rgb(255, 0, 0)"
        returnFormat="hex"
      />
    );

    // Find and change the range slider to trigger a change
    const hexSlider = screen.getAllByRole('slider')[0];
    fireEvent.change(hexSlider, { target: { value: 180 } });

    // Check if the onChange was called with hex format
    expect(handleChangeHex).toHaveBeenCalledWith(
      expect.stringMatching(/^#[0-9a-f]{6}$/i),
      expect.any(Object)
    );
    unmountHex();

    // Test returnFormat = 'rgb'
    const handleChangeRgb = jest.fn();
    const { unmount: unmountRgb } = render(
      <ColorPicker
        onChange={handleChangeRgb}
        value="#ff0000"
        returnFormat="rgb"
      />
    );

    // Find and change the range slider to trigger a change
    const rgbSlider = screen.getAllByRole('slider')[0];
    fireEvent.change(rgbSlider, { target: { value: 180 } });

    // Check if the onChange was called with rgb format
    expect(handleChangeRgb).toHaveBeenCalledWith(
      expect.stringMatching(/^rgb\(\d+, \d+, \d+\)$/),
      expect.any(Object)
    );
    unmountRgb();

    // Test returnFormat = 'hsl'
    const handleChangeHsl = jest.fn();
    render(
      <ColorPicker
        onChange={handleChangeHsl}
        value="#ff0000"
        returnFormat="hsl"
      />
    );

    // Find and change the range slider to trigger a change
    const hslSlider = screen.getAllByRole('slider')[0];
    fireEvent.change(hslSlider, { target: { value: 180 } });

    // Check if the onChange was called with hsl format
    expect(handleChangeHsl).toHaveBeenCalledWith(
      expect.stringMatching(/^hsl\(\d+, \d+%, \d+%\)$/),
      expect.any(Object)
    );
  });
});
