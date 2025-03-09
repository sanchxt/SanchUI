import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';

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
    expect(input).toHaveClass('shadow-sm');

    rerender(<Input variant="filled" placeholder="Test" />);
    input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('bg-secondary/50');
    expect(input).toHaveClass('shadow-sm');
    expect(input).not.toHaveClass('border');

    rerender(<Input variant="flushed" placeholder="Test" />);
    input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('border-b-2');
    expect(input).toHaveClass('rounded-none');

    rerender(<Input variant="unstyled" placeholder="Test" />);
    input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('border-0');
    expect(input).toHaveClass('p-0');
    expect(input).toHaveClass('shadow-none');
  });

  it('applies the correct classes for sizes', () => {
    const { rerender } = render(<Input inputSize="sm" placeholder="Test" />);
    let input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('h-8');
    expect(input).toHaveClass('text-sm');

    rerender(<Input inputSize="md" placeholder="Test" />);
    input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('h-10');
    expect(input).toHaveClass('text-base');

    rerender(<Input inputSize="lg" placeholder="Test" />);
    input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('h-12');
    expect(input).toHaveClass('text-lg');
  });

  it('handles invalid state correctly', () => {
    render(<Input isInvalid placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('border-destructive');
    expect(input).toHaveClass('focus-visible:ring-destructive/30');
  });

  it('handles disabled state', async () => {
    const onChange = jest.fn();
    render(<Input disabled placeholder="Test" onChange={onChange} />);
    const input = screen.getByPlaceholderText('Test');

    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed');
    expect(input).toHaveClass('disabled:opacity-60');

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
    expect(screen.getByPlaceholderText('Amount')).toHaveClass('border-l-0');
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
    expect(screen.getByPlaceholderText('Amount')).toHaveClass('border-r-0');
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

  it('renders password toggle button when showPasswordToggle is true', () => {
    render(
      <Input type="password" showPasswordToggle placeholder="Enter password" />
    );

    // Verify button exists
    const toggleButton = screen.getByRole('button', { name: /show password/i });
    expect(toggleButton).toBeInTheDocument();

    // Default state should be password hidden
    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility when button is clicked', () => {
    render(
      <Input type="password" showPasswordToggle placeholder="Enter password" />
    );

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button', { name: /show password/i });
    fireEvent.click(toggleButton);

    expect(input).toHaveAttribute('type', 'text');

    expect(toggleButton).toHaveAttribute('aria-label', 'Hide password');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('password toggle takes precedence over rightAddon when both are provided', () => {
    render(
      <Input
        type="password"
        showPasswordToggle
        rightAddon={<span data-testid="custom-addon">Custom</span>}
        placeholder="Enter password"
      />
    );

    const toggleButton = screen.getByRole('button', { name: /show password/i });
    expect(toggleButton).toBeInTheDocument();

    const customAddon = screen.queryByTestId('custom-addon');
    expect(customAddon).not.toBeInTheDocument();
  });

  it('allows custom password toggle icons', () => {
    const customShowIcon = <span data-testid="custom-show-icon">Show</span>;
    const customHideIcon = <span data-testid="custom-hide-icon">Hide</span>;

    render(
      <Input
        type="password"
        showPasswordToggle
        showPasswordIcon={customShowIcon}
        hidePasswordIcon={customHideIcon}
        placeholder="Enter password"
      />
    );

    expect(screen.getByTestId('custom-show-icon')).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', { name: /show password/i });
    fireEvent.click(toggleButton);

    expect(screen.getByTestId('custom-hide-icon')).toBeInTheDocument();
  });
});
