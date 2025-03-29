import { render, screen } from '@testing-library/react';
import { Typography, H1, H2, Paragraph, Blockquote } from './index';

describe('Typography', () => {
  // Test basic rendering
  it('renders with default props', () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('Hello World').tagName).toBe('P');
  });

  // Test variants render correct element types
  it('renders correct HTML elements for each variant', () => {
    const { rerender } = render(
      <Typography variant="h1">Heading 1</Typography>
    );
    expect(screen.getByText('Heading 1').tagName).toBe('H1');

    rerender(<Typography variant="h2">Heading 2</Typography>);
    expect(screen.getByText('Heading 2').tagName).toBe('H2');

    rerender(<Typography variant="h3">Heading 3</Typography>);
    expect(screen.getByText('Heading 3').tagName).toBe('H3');

    rerender(<Typography variant="p">Paragraph</Typography>);
    expect(screen.getByText('Paragraph').tagName).toBe('P');

    rerender(<Typography variant="blockquote">Quote</Typography>);
    expect(screen.getByText('Quote').tagName).toBe('BLOCKQUOTE');
  });

  // Test as prop overrides default element
  it('respects the "as" prop to override default element', () => {
    render(
      <Typography as="span" variant="h1">
        Span Element
      </Typography>
    );
    expect(screen.getByText('Span Element').tagName).toBe('SPAN');
  });

  // Test specialized components
  it('renders specialized component variants correctly', () => {
    const { rerender } = render(<H1>H1 Component</H1>);
    expect(screen.getByText('H1 Component').tagName).toBe('H1');

    rerender(<H2>H2 Component</H2>);
    expect(screen.getByText('H2 Component').tagName).toBe('H2');

    rerender(<Paragraph>P Component</Paragraph>);
    expect(screen.getByText('P Component').tagName).toBe('P');

    rerender(<Blockquote>Quote Component</Blockquote>);
    expect(screen.getByText('Quote Component').tagName).toBe('BLOCKQUOTE');
  });

  // Test className prop
  it('applies additional classes from className prop', () => {
    render(<Typography className="test-class">With Class</Typography>);
    expect(screen.getByText('With Class')).toHaveClass('test-class');
  });

  // Test color variants
  it('applies color classes correctly', () => {
    const { rerender } = render(
      <Typography color="primary">Primary Text</Typography>
    );
    expect(screen.getByText('Primary Text')).toHaveClass('text-primary');

    rerender(<Typography color="destructive">Error Text</Typography>);
    expect(screen.getByText('Error Text')).toHaveClass('text-destructive');
  });

  // Test weight variants
  it('applies font weight classes correctly', () => {
    const { rerender } = render(
      <Typography weight="bold">Bold Text</Typography>
    );
    expect(screen.getByText('Bold Text')).toHaveClass('font-bold');

    rerender(<Typography weight="normal">Normal Text</Typography>);
    expect(screen.getByText('Normal Text')).toHaveClass('font-normal');
  });

  // Test alignment
  it('applies text alignment classes correctly', () => {
    const { rerender } = render(
      <Typography align="center">Centered Text</Typography>
    );
    expect(screen.getByText('Centered Text')).toHaveClass('text-center');

    rerender(<Typography align="right">Right Text</Typography>);
    expect(screen.getByText('Right Text')).toHaveClass('text-right');
  });

  // Test text transform
  it('applies text transform classes correctly', () => {
    const { rerender } = render(
      <Typography transform="uppercase">Uppercase Text</Typography>
    );
    expect(screen.getByText('Uppercase Text')).toHaveClass('uppercase');

    rerender(<Typography transform="capitalize">capitalize text</Typography>);
    expect(screen.getByText('capitalize text')).toHaveClass('capitalize');
  });

  // Test truncation
  it('applies truncation classes correctly', () => {
    render(<Typography truncate>Truncated Text</Typography>);
    expect(screen.getByText('Truncated Text')).toHaveClass('truncate');
  });

  // Test line clamp
  it('applies line clamp classes correctly', () => {
    render(
      <Typography lineClamp={2}>
        Multi-line text that should be clamped
      </Typography>
    );
    expect(
      screen.getByText('Multi-line text that should be clamped')
    ).toHaveClass('line-clamp-2');
  });

  // Test multiple props together
  it('combines multiple props correctly', () => {
    render(
      <Typography
        variant="h3"
        color="primary"
        weight="bold"
        align="center"
        className="custom-class"
      >
        Combined Styles
      </Typography>
    );

    const element = screen.getByText('Combined Styles');
    expect(element.tagName).toBe('H3');
    expect(element).toHaveClass('text-primary');
    expect(element).toHaveClass('font-bold');
    expect(element).toHaveClass('text-center');
    expect(element).toHaveClass('custom-class');
  });

  // Test responsive prop
  it('respects the responsive flag', () => {
    const { rerender } = render(
      <Typography responsive>Responsive Text</Typography>
    );
    expect(screen.getByText('Responsive Text')).toHaveClass('sm:text-base');
  });

  // Test passing HTML attributes
  it('passes through HTML attributes', () => {
    render(
      <Typography data-testid="test-typography" id="test-id">
        With Attributes
      </Typography>
    );
    const element = screen.getByText('With Attributes');
    expect(element).toHaveAttribute('data-testid', 'test-typography');
    expect(element).toHaveAttribute('id', 'test-id');
  });

  // Test ref can be passed directly
  it('accepts ref as a prop', () => {
    const ref = jest.fn();
    render(<Typography ref={ref}>Text with ref</Typography>);
    expect(screen.getByText('Text with ref')).toBeInTheDocument();
    // We can't directly test if the ref was assigned in JSDOM,
    // but we can verify it doesn't throw an error
  });

  // Test dark mode
  it('applies dark mode classes when enabled', () => {
    const { rerender } = render(
      <Typography themedDark>Dark Theme Text</Typography>
    );
    expect(screen.getByText('Dark Theme Text')).toHaveClass(
      'dark:text-foreground'
    );

    rerender(<Typography themedDark={false}>No Dark Theme Text</Typography>);
    expect(screen.getByText('No Dark Theme Text')).not.toHaveClass(
      'dark:text-foreground'
    );
  });
});
