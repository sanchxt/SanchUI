import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Link } from './index';

// Mock the cn utility to avoid dependency issues in tests
jest.mock('@/utils/cn', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Link', () => {
  it('renders correctly with default props', () => {
    render(<Link href="/test">Link Text</Link>);

    const link = screen.getByText('Link Text');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link.tagName).toBe('A');
    expect(link).toHaveClass(
      'text-sm',
      'text-foreground',
      'hover:text-foreground/80',
      'no-underline',
      'hover:underline'
    );
  });

  it('renders with custom className', () => {
    render(
      <Link href="/test" className="custom-class">
        Link Text
      </Link>
    );

    const link = screen.getByText('Link Text');
    expect(link).toHaveClass('custom-class');
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Link href="/test" variant="primary">
        Primary Link
      </Link>
    );

    let link = screen.getByText('Primary Link');
    expect(link).toHaveClass('text-primary', 'hover:text-primary/80');

    rerender(
      <Link href="/test" variant="destructive">
        Destructive Link
      </Link>
    );
    link = screen.getByText('Destructive Link');
    expect(link).toHaveClass('text-destructive', 'hover:text-destructive/80');

    rerender(
      <Link href="/test" variant="success">
        Success Link
      </Link>
    );
    link = screen.getByText('Success Link');
    expect(link).toHaveClass('text-success', 'hover:text-success/80');

    rerender(
      <Link href="/test" variant="secondary">
        Secondary Link
      </Link>
    );
    link = screen.getByText('Secondary Link');
    expect(link).toHaveClass(
      'text-secondary-foreground',
      'hover:text-secondary-foreground/80'
    );

    rerender(
      <Link href="/test" variant="muted">
        Muted Link
      </Link>
    );
    link = screen.getByText('Muted Link');
    expect(link).toHaveClass(
      'text-muted-foreground',
      'hover:text-muted-foreground/80'
    );
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Link href="/test" size="sm">
        Small Link
      </Link>
    );

    let link = screen.getByText('Small Link');
    expect(link).toHaveClass('text-xs');

    rerender(
      <Link href="/test" size="md">
        Medium Link
      </Link>
    );
    link = screen.getByText('Medium Link');
    expect(link).toHaveClass('text-sm');

    rerender(
      <Link href="/test" size="lg">
        Large Link
      </Link>
    );
    link = screen.getByText('Large Link');
    expect(link).toHaveClass('text-base');
  });

  it('renders with different underline styles', () => {
    const { rerender } = render(
      <Link href="/test" underline="always">
        Always Underlined
      </Link>
    );

    let link = screen.getByText('Always Underlined');
    expect(link).toHaveClass('underline');

    rerender(
      <Link href="/test" underline="hover">
        Hover Underlined
      </Link>
    );
    link = screen.getByText('Hover Underlined');
    expect(link).toHaveClass('no-underline', 'hover:underline');

    rerender(
      <Link href="/test" underline="none">
        No Underline
      </Link>
    );
    link = screen.getByText('No Underline');
    expect(link).toHaveClass('no-underline');
    expect(link).not.toHaveClass('hover:underline');
  });

  it('handles disabled state correctly', () => {
    render(
      <Link href="/test" disabled>
        Disabled Link
      </Link>
    );

    const link = screen.getByText('Disabled Link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveClass(
      'opacity-50',
      'pointer-events-none',
      'cursor-not-allowed'
    );
    expect(link).not.toHaveAttribute('href');
  });

  it('displays external link icon when specified', () => {
    render(
      <Link href="https://example.com" showExternalIcon>
        External Link
      </Link>
    );

    const link = screen.getByText('External Link', { exact: false });
    const svgElement = link.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('does not display external icon for internal links', () => {
    render(
      <Link href="/internal" showExternalIcon>
        Internal Link
      </Link>
    );

    const link = screen.getByText('Internal Link');
    const svgElement = link.querySelector('svg');
    expect(svgElement).not.toBeInTheDocument();
  });

  it('adds security attributes for external links', () => {
    render(<Link href="https://example.com">External Link</Link>);

    const link = screen.getByText('External Link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('respects target attribute if provided for external links', () => {
    render(
      <Link href="https://example.com" target="_self">
        External With Target
      </Link>
    );

    const link = screen.getByText('External With Target');
    expect(link).toHaveAttribute('target', '_self');
  });

  it('adds noreferrer noopener when target is _blank even for internal links', () => {
    render(
      <Link href="/internal" target="_blank">
        Internal Blank
      </Link>
    );

    const link = screen.getByText('Internal Blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('renders with custom component using "as" prop', () => {
    const CustomComponent = ({ children, ...props }: any) => (
      <div data-testid="custom-component" {...props}>
        {children}
      </div>
    );

    render(
      <Link as={CustomComponent} href="/test">
        Custom Component Link
      </Link>
    );

    const customLink = screen.getByTestId('custom-component');
    expect(customLink).toBeInTheDocument();
    expect(customLink).toHaveTextContent('Custom Component Link');
  });

  it('passes additional props to the underlying element', () => {
    render(
      <Link href="/test" data-testid="test-link" title="Link Title">
        Link With Props
      </Link>
    );

    const link = screen.getByTestId('test-link');
    expect(link).toHaveAttribute('title', 'Link Title');
  });

  it('accepts ref as a direct prop', () => {
    const ref = { current: null };
    render(
      <Link href="/test" ref={ref}>
        Ref Link
      </Link>
    );

    expect(ref.current).not.toBeNull();
    expect((ref.current as any) instanceof HTMLAnchorElement).toBe(true);
  });
});
