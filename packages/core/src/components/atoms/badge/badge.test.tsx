import { render, screen } from '@testing-library/react';
import { Badge } from './index';

describe('Badge', () => {
  it('renders correctly with default props', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-secondary');
    expect(badge).toHaveClass('text-secondary-foreground');
    expect(badge).not.toHaveClass('rounded-full');
  });

  it('renders with primary variant', () => {
    render(<Badge variant="primary">Primary</Badge>);
    const badge = screen.getByText('Primary');

    expect(badge).toHaveClass('bg-primary');
    expect(badge).toHaveClass('text-primary-foreground');
  });

  it('renders with success variant', () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText('Success');

    expect(badge).toHaveClass('bg-success');
    expect(badge).toHaveClass('text-success-foreground');
  });

  it('renders with warning variant', () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText('Warning');

    expect(badge).toHaveClass('bg-amber-500');
    expect(badge).toHaveClass('text-white');
  });

  it('renders with error variant', () => {
    render(<Badge variant="error">Error</Badge>);
    const badge = screen.getByText('Error');

    expect(badge).toHaveClass('bg-destructive');
    expect(badge).toHaveClass('text-destructive-foreground');
  });

  it('renders with info variant', () => {
    render(<Badge variant="info">Info</Badge>);
    const badge = screen.getByText('Info');

    expect(badge).toHaveClass('bg-blue-500');
    expect(badge).toHaveClass('text-white');
  });

  it('renders with pill style when pill=true', () => {
    render(<Badge pill>Pill Badge</Badge>);
    const badge = screen.getByText('Pill Badge');

    expect(badge).toHaveClass('rounded-full');
    expect(badge).not.toHaveClass('rounded-md');
  });

  it('renders with outline style when outline=true', () => {
    render(
      <Badge variant="primary" outline>
        Outline Badge
      </Badge>
    );
    const badge = screen.getByText('Outline Badge');

    expect(badge).toHaveClass('border-primary');
    expect(badge).toHaveClass('text-primary');
    expect(badge).toHaveClass('bg-transparent');
  });

  it('renders in different sizes', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    let badge = screen.getByText('Small');
    expect(badge).toHaveClass('text-xs');
    expect(badge).toHaveClass('px-2');
    expect(badge).toHaveClass('py-0.5');

    rerender(<Badge size="md">Medium</Badge>);
    badge = screen.getByText('Medium');
    expect(badge).toHaveClass('text-xs');
    expect(badge).toHaveClass('px-2.5');
    expect(badge).toHaveClass('py-0.5');

    rerender(<Badge size="lg">Large</Badge>);
    badge = screen.getByText('Large');
    expect(badge).toHaveClass('text-sm');
    expect(badge).toHaveClass('px-3');
    expect(badge).toHaveClass('py-1');
  });

  it('renders with dot indicator when withDot=true', () => {
    render(
      <Badge variant="success" withDot>
        With Dot
      </Badge>
    );

    const badge = screen.getByText('With Dot');
    const dotElement = badge.querySelector('span');

    expect(dotElement).toBeInTheDocument();
    expect(dotElement).toHaveClass('bg-success');
    expect(dotElement).toHaveClass('rounded-full');
  });

  it('renders with custom dot color when dotColor is provided', () => {
    render(
      <Badge withDot dotColor="bg-purple-500">
        Custom Dot
      </Badge>
    );

    const badge = screen.getByText('Custom Dot');
    const dotElement = badge.querySelector('span');

    expect(dotElement).toBeInTheDocument();
    expect(dotElement).toHaveClass('bg-purple-500');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Class</Badge>);

    const badge = screen.getByText('Custom Class');
    expect(badge).toHaveClass('custom-class');
  });
});
