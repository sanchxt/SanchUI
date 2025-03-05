import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Input } from './index';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter name" />);
    const input = screen.getByPlaceholderText('Enter name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('allows custom type attribute', () => {
    render(<Input type="email" placeholder="Enter email" />);
    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('applies the correct classes for variants', () => {
    const { rerender } = render(<Input variant="outline" placeholder="Test" />);
    let input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('rounded-md');

    rerender(<Input variant="filled" placeholder="Test" />);
    input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('bg-secondary/50');
    expect(input).not.toHaveClass('border');

    rerender(<Input variant="flushed" placeholder="Test" />);
    input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('border-b');
    expect(input).toHaveClass('rounded-none');

    rerender(<Input variant="unstyled" placeholder="Test" />);
    input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('border-0');
    expect(input).toHaveClass('p-0');
  });

  it('applies the correct classes for sizes', () => {
    const { rerender } = render(<Input inputSize="sm" placeholder="Test" />);
    let input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('h-8');

    rerender(<Input inputSize="md" placeholder="Test" />);
    input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('h-10');

    rerender(<Input inputSize="lg" placeholder="Test" />);
    input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('h-12');
  });

  it('handles invalid state correctly', () => {
    render(<Input isInvalid placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('border-destructive');
  });

  it('handles disabled state', async () => {
    const onChange = jest.fn();
    render(<Input disabled placeholder="Test" onChange={onChange} />);
    const input = screen.getByPlaceholderText('Test');

    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed');
    expect(input).toHaveClass('disabled:opacity-50');

    await userEvent.type(input, 'Hello');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('handles change events', async () => {
    const onChange = jest.fn();
    render(<Input placeholder="Test" onChange={onChange} />);
    const input = screen.getByPlaceholderText('Test');

    await userEvent.type(input, 'Hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('handles ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLInputElement).toBe(true);
  });

  it('renders with left addon correctly', () => {
    render(
      <Input
        leftAddon={<div data-testid="left-addon">$</div>}
        placeholder="Amount"
      />
    );

    expect(screen.getByTestId('left-addon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount')).toHaveClass('rounded-l-none');
  });

  it('renders with right addon correctly', () => {
    render(
      <Input
        rightAddon={<div data-testid="right-addon">.00</div>}
        placeholder="Amount"
      />
    );

    expect(screen.getByTestId('right-addon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount')).toHaveClass('rounded-r-none');
  });

  it('renders with both addons correctly', () => {
    render(
      <Input
        leftAddon={<div data-testid="left-addon">$</div>}
        rightAddon={<div data-testid="right-addon">.00</div>}
        placeholder="Amount"
      />
    );

    expect(screen.getByTestId('left-addon')).toBeInTheDocument();
    expect(screen.getByTestId('right-addon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount')).toHaveClass('rounded-l-none');
    expect(screen.getByPlaceholderText('Amount')).toHaveClass('rounded-r-none');
  });

  it('allows custom className', () => {
    render(<Input className="custom-class" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('custom-class');
  });

  it('allows custom wrapperClassName when addons are present', () => {
    render(
      <Input
        leftAddon={<span>$</span>}
        wrapperClassName="custom-wrapper"
        placeholder="Test"
      />
    );
    const wrapper = screen.getByPlaceholderText('Test').parentElement;
    expect(wrapper).toHaveClass('custom-wrapper');
  });
});
