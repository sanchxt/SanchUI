import { render, screen } from '@testing-library/react';

import { Skeleton } from './index';

describe('Skeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom width and height', () => {
    const { container } = render(
      <Skeleton data-testid="skeleton" width={200} height={100} />
    );
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveStyle('width: 200px');
    expect(skeleton).toHaveStyle('height: 100px');
  });

  it('applies string width and height values', () => {
    const { container } = render(
      <Skeleton data-testid="skeleton" width="50%" height="10rem" />
    );
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveStyle('width: 50%');
    expect(skeleton).toHaveStyle('height: 10rem');
  });

  it('applies the correct border radius based on radius prop', () => {
    const { rerender } = render(
      <Skeleton data-testid="skeleton" radius="sm" />
    );
    let skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle('border-radius: var(--radius-sm, 0.125rem)');

    rerender(<Skeleton data-testid="skeleton" radius="md" />);
    expect(skeleton).toHaveStyle('border-radius: var(--radius, 0.5rem)');

    rerender(<Skeleton data-testid="skeleton" radius="lg" />);
    expect(skeleton).toHaveStyle('border-radius: var(--radius-lg, 0.75rem)');

    rerender(<Skeleton data-testid="skeleton" radius="full" />);
    expect(skeleton).toHaveStyle('border-radius: 9999px');

    rerender(<Skeleton data-testid="skeleton" radius="none" />);
    expect(skeleton).toHaveStyle('border-radius: 0');

    rerender(<Skeleton data-testid="skeleton" radius="1.5rem" />);
    expect(skeleton).toHaveStyle('border-radius: 1.5rem');
  });

  it('applies circle style when circle prop is true', () => {
    const { container } = render(
      <Skeleton data-testid="skeleton" circle width={50} height={50} />
    );
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveClass('rounded-full');
  });

  it('applies the correct animation classes', () => {
    const { rerender } = render(
      <Skeleton data-testid="skeleton" animation="pulse" />
    );
    let skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('animate-pulse');

    rerender(<Skeleton data-testid="skeleton" animation="wave" />);
    expect(skeleton).toHaveClass('skeleton-wave');

    rerender(<Skeleton data-testid="skeleton" animation="none" />);
    expect(skeleton).not.toHaveClass('animate-pulse');
    expect(skeleton).not.toHaveClass('skeleton-wave');
  });

  it('prioritizes shimmer over animation prop', () => {
    const { container } = render(
      <Skeleton data-testid="skeleton" shimmer animation="pulse" />
    );
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveClass('skeleton-shimmer');
    expect(skeleton).not.toHaveClass('animate-pulse');
  });

  it('applies translucent class when translucent prop is true', () => {
    const { container } = render(
      <Skeleton data-testid="skeleton" translucent />
    );
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveClass('opacity-70');
  });

  it('renders as a custom element when as prop is provided', () => {
    const { container } = render(<Skeleton data-testid="skeleton" as="span" />);
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton.tagName).toBe('SPAN');
  });

  it('applies the correct styles for text skeletons', () => {
    const { rerender } = render(<Skeleton data-testid="skeleton" text />);
    let skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('skeleton-text');

    // check heading variant
    rerender(<Skeleton data-testid="skeleton" text textVariant="heading" />);
    expect(skeleton).toHaveStyle('height: 2rem');
    expect(skeleton).toHaveStyle('width: 40%');

    // check body variant
    rerender(<Skeleton data-testid="skeleton" text textVariant="body" />);
    expect(skeleton).toHaveStyle('height: 1rem');
    expect(skeleton).toHaveStyle('width: 100%');

    // check caption variant
    rerender(<Skeleton data-testid="skeleton" text textVariant="caption" />);
    expect(skeleton).toHaveStyle('height: 0.8rem');
    expect(skeleton).toHaveStyle('width: 60%');
  });

  it('combines custom styles with component styles', () => {
    const { container } = render(
      <Skeleton data-testid="skeleton" style={{ margin: '10px' }} width={100} />
    );
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveStyle('margin: 10px');
    expect(skeleton).toHaveStyle('width: 100px');
  });

  it('passes additional props to the underlying element', () => {
    const { container } = render(
      <Skeleton data-testid="skeleton" data-custom="test" title="Loading..." />
    );
    const skeleton = screen.getByTestId('skeleton');

    expect(skeleton).toHaveAttribute('data-custom', 'test');
    expect(skeleton).toHaveAttribute('title', 'Loading...');
  });
});
