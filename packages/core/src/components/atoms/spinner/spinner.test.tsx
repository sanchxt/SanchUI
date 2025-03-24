import { render, screen } from '@testing-library/react';

import { Spinner } from './index';

describe('Spinner', () => {
  it('renders correctly with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('rounded-full');
    expect(spinner).toHaveClass('border-current');
    expect(spinner).toHaveClass('border-t-transparent');
    expect(spinner).toHaveClass('text-primary');
  });

  it('renders with custom label', () => {
    render(<Spinner label="Processing" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Processing');
    expect(screen.getByText('Processing')).toBeInTheDocument();
    expect(screen.getByText('Processing')).toHaveClass('sr-only');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Spinner size="xs" />);
    expect(screen.getByRole('status')).toHaveClass('size-3');
    expect(screen.getByRole('status')).toHaveClass('border-2');

    rerender(<Spinner size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('size-4');
    expect(screen.getByRole('status')).toHaveClass('border-2');

    rerender(<Spinner size="md" />);
    expect(screen.getByRole('status')).toHaveClass('size-6');
    expect(screen.getByRole('status')).toHaveClass('border-3');

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('size-8');
    expect(screen.getByRole('status')).toHaveClass('border-3');

    rerender(<Spinner size="xl" />);
    expect(screen.getByRole('status')).toHaveClass('size-10');
    expect(screen.getByRole('status')).toHaveClass('border-4');
  });

  it('applies correct color classes', () => {
    const { rerender } = render(<Spinner color="primary" />);
    expect(screen.getByRole('status')).toHaveClass('text-primary');

    rerender(<Spinner color="secondary" />);
    expect(screen.getByRole('status')).toHaveClass('text-secondary');

    rerender(<Spinner color="accent" />);
    expect(screen.getByRole('status')).toHaveClass('text-accent');

    rerender(<Spinner color="destructive" />);
    expect(screen.getByRole('status')).toHaveClass('text-destructive');

    rerender(<Spinner color="success" />);
    expect(screen.getByRole('status')).toHaveClass('text-success');

    rerender(<Spinner color="muted" />);
    expect(screen.getByRole('status')).toHaveClass('text-muted-foreground');
  });

  it('applies inline style when inline prop is true', () => {
    render(<Spinner inline />);
    expect(screen.getByRole('status')).toHaveClass('m-0');
  });

  it('renders dots variant correctly', () => {
    render(<Spinner variant="dots" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('flex');
    expect(spinner).toHaveClass('items-center');
    expect(spinner).toHaveClass('justify-center');

    // check that we have three dots
    const dots = spinner.querySelectorAll(
      'div[class*="mx-1 rounded-full animate-bounce"]'
    );
    expect(dots.length).toBe(3);

    // check animation delays
    expect(dots[0]).toHaveStyle('animation-delay: 0ms');
    expect(dots[1]).toHaveStyle('animation-delay: 150ms');
    expect(dots[2]).toHaveStyle('animation-delay: 300ms');
  });

  it('renders grow variant correctly', () => {
    render(<Spinner variant="grow" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('rounded-full');
    expect(spinner).toHaveClass('bg-primary');
    expect(spinner).toHaveStyle(
      'animation: spinner-grow 1.5s ease-in-out infinite'
    );
  });

  it('allows custom className', () => {
    render(<Spinner className="custom-class" />);
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });
});
