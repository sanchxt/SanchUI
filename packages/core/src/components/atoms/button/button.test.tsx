jest.mock('lucide-react', () => ({
  CheckIcon: function CheckIcon(props: any) {
    return <div data-testid={props['data-testid'] || 'check-icon'} />;
  },
  Loader2: function Loader2(props: any) {
    return <div data-testid="loader-icon" className={props.className} />;
  },
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './index';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('applies the correct classes for variants', () => {
    const { rerender } = render(<Button variant="default">Button</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');

    rerender(<Button variant="secondary">Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');

    rerender(<Button variant="outline">Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('border');

    rerender(<Button variant="danger">Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive');

    rerender(<Button variant="success">Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-success');

    rerender(<Button variant="ghost">Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-background');
  });

  it('applies the correct classes for sizes', () => {
    const { rerender } = render(<Button size="sm">Button</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('h-9');

    rerender(<Button size="md">Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-10');

    rerender(<Button size="lg">Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-11');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports disabled state', async () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none');

    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('handles loading state correctly', () => {
    render(<Button isLoading>Loading Button</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveClass('children:text-transparent');
    expect(screen.getByText('Loading Button')).toBeInTheDocument();
  });

  it('renders with left icon correctly', () => {
    render(
      <Button leftIcon={<div data-testid="left-icon" />}>With Icon</Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('renders with right icon correctly', () => {
    render(
      <Button rightIcon={<div data-testid="right-icon" />}>With Icon</Button>
    );

    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('hides icons when loading', () => {
    render(
      <Button
        isLoading
        leftIcon={<div data-testid="left-icon" />}
        rightIcon={<div data-testid="right-icon" />}
      >
        Loading
      </Button>
    );

    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('allows custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('handles loading state with aria-label correctly', () => {
    render(
      <Button isLoading aria-label="Submit form">
        Submit
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Submit form loading');
  });
});
