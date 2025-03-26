import { render, screen } from '@testing-library/react';
import { Label } from './index';

describe('Label', () => {
  it('renders correctly with default props', () => {
    render(<Label htmlFor="test">Label Text</Label>);

    const labelElement = screen.getByText('Label Text');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe('LABEL');
    expect(labelElement).toHaveAttribute('for', 'test');
    expect(labelElement).not.toHaveTextContent('*');
  });

  it('renders with required indicator when required is true', () => {
    render(
      <Label htmlFor="test" required>
        Required Field
      </Label>
    );

    const labelElement = screen.getByText('Required Field');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.innerHTML).toContain('*');
  });

  it('renders with custom required indicator', () => {
    render(
      <Label htmlFor="test" required requiredIndicator=" (required)">
        Custom Required
      </Label>
    );

    const labelElement = screen.getByText('Custom Required');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.innerHTML).toContain('(required)');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <Label htmlFor="test" variant="destructive">
        Destructive Label
      </Label>
    );

    let labelElement = screen.getByText('Destructive Label');
    expect(labelElement).toHaveClass('text-destructive');

    rerender(
      <Label htmlFor="test" variant="muted">
        Muted Label
      </Label>
    );

    labelElement = screen.getByText('Muted Label');
    expect(labelElement).toHaveClass('text-muted-foreground');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(
      <Label htmlFor="test" size="sm">
        Small Label
      </Label>
    );

    let labelElement = screen.getByText('Small Label');
    expect(labelElement).toHaveClass('text-xs');

    rerender(
      <Label htmlFor="test" size="lg">
        Large Label
      </Label>
    );

    labelElement = screen.getByText('Large Label');
    expect(labelElement).toHaveClass('text-base');
  });

  it('applies srOnly class correctly', () => {
    render(
      <Label htmlFor="test" srOnly>
        Screen Reader Only Label
      </Label>
    );

    const labelElement = screen.getByText('Screen Reader Only Label');
    expect(labelElement).toHaveClass('absolute');
    expect(labelElement).toHaveClass('w-px');
    expect(labelElement).toHaveClass('h-px');
  });

  it('applies additional custom className', () => {
    render(
      <Label htmlFor="test" className="custom-class">
        Custom Class Label
      </Label>
    );

    const labelElement = screen.getByText('Custom Class Label');
    expect(labelElement).toHaveClass('custom-class');
  });

  it('forwards additional props to the label element', () => {
    render(
      <Label htmlFor="test" data-testid="test-label">
        Prop Forwarding Test
      </Label>
    );

    const labelElement = screen.getByTestId('test-label');
    expect(labelElement).toHaveTextContent('Prop Forwarding Test');
  });
});
