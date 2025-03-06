import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Select } from './index';

describe('Select', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders correctly', () => {
    render(<Select options={defaultOptions} data-testid="select" />);
    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('renders with a placeholder option when provided', () => {
    render(
      <Select data-testid="select">
        <option value="">Select an option</option>
        <option value="child1">Child 1</option>
      </Select>
    );
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders children instead of options when no options provided', () => {
    render(
      <Select data-testid="select">
        <option value="child1">Child 1</option>
        <option value="child2">Child 2</option>
      </Select>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('applies the correct classes for variants', () => {
    const { rerender } = render(
      <Select variant="outline" options={defaultOptions} data-testid="select" />
    );
    let select = screen.getByTestId('select');
    expect(select).toHaveClass('border');
    expect(select).toHaveClass('rounded-md');

    rerender(
      <Select variant="filled" options={defaultOptions} data-testid="select" />
    );
    select = screen.getByTestId('select');
    expect(select).toHaveClass('bg-secondary/50');
    expect(select).not.toHaveClass('border');

    rerender(
      <Select variant="flushed" options={defaultOptions} data-testid="select" />
    );
    select = screen.getByTestId('select');
    expect(select).toHaveClass('border-b');
    expect(select).toHaveClass('rounded-none');

    rerender(
      <Select
        variant="unstyled"
        options={defaultOptions}
        data-testid="select"
      />
    );
    select = screen.getByTestId('select');
    expect(select).toHaveClass('border-0');
    expect(select).toHaveClass('p-0');
  });

  it('applies the correct classes for sizes', () => {
    const { rerender } = render(
      <Select selectSize="sm" options={defaultOptions} data-testid="select" />
    );
    let select = screen.getByTestId('select');
    expect(select).toHaveClass('h-8');

    rerender(
      <Select selectSize="md" options={defaultOptions} data-testid="select" />
    );
    select = screen.getByTestId('select');
    expect(select).toHaveClass('h-10');

    rerender(
      <Select selectSize="lg" options={defaultOptions} data-testid="select" />
    );
    select = screen.getByTestId('select');
    expect(select).toHaveClass('h-12');
  });

  it('handles invalid state correctly', () => {
    render(<Select isInvalid options={defaultOptions} data-testid="select" />);
    const select = screen.getByTestId('select');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveClass('border-destructive');
  });

  it('handles disabled state', async () => {
    const onChange = jest.fn();
    render(
      <Select
        disabled
        options={defaultOptions}
        data-testid="select"
        onChange={onChange}
      />
    );
    const select = screen.getByTestId('select');

    expect(select).toBeDisabled();
    expect(select).toHaveClass('disabled:cursor-not-allowed');
    expect(select).toHaveClass('disabled:opacity-50');
  });

  it('handles change events', async () => {
    const onChange = jest.fn();
    render(
      <Select
        options={defaultOptions}
        data-testid="select"
        onChange={onChange}
      />
    );
    const select = screen.getByTestId('select');

    await userEvent.selectOptions(select, 'option2');
    expect(onChange).toHaveBeenCalled();
    expect(select).toHaveValue('option2');
  });

  it('handles ref correctly', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select ref={ref} options={defaultOptions} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLSelectElement).toBe(true);
  });

  it('renders with left addon correctly', () => {
    render(
      <Select
        leftAddon={<div data-testid="left-addon">$</div>}
        options={defaultOptions}
        data-testid="select"
      />
    );

    expect(screen.getByTestId('left-addon')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toHaveClass('rounded-l-none');
  });

  it('renders with right addon correctly', () => {
    render(
      <Select
        rightAddon={<div data-testid="right-addon">.00</div>}
        options={defaultOptions}
        data-testid="select"
      />
    );

    expect(screen.getByTestId('right-addon')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toHaveClass('rounded-r-none');
  });

  it('renders with both addons correctly', () => {
    render(
      <Select
        leftAddon={<div data-testid="left-addon">$</div>}
        rightAddon={<div data-testid="right-addon">.00</div>}
        options={defaultOptions}
        data-testid="select"
      />
    );

    expect(screen.getByTestId('left-addon')).toBeInTheDocument();
    expect(screen.getByTestId('right-addon')).toBeInTheDocument();
    expect(screen.getByTestId('select')).toHaveClass('rounded-l-none');
    expect(screen.getByTestId('select')).toHaveClass('rounded-r-none');
  });

  it('renders with custom chevron icon when provided', () => {
    const customIcon = <div data-testid="custom-chevron">↓</div>;
    render(
      <Select
        chevronIcon={customIcon}
        options={defaultOptions}
        data-testid="select"
      />
    );

    expect(screen.getByTestId('custom-chevron')).toBeInTheDocument();
  });

  it('allows custom className', () => {
    render(
      <Select
        className="custom-class"
        options={defaultOptions}
        data-testid="select"
      />
    );
    expect(screen.getByTestId('select')).toHaveClass('custom-class');
  });

  it('allows custom wrapperClassName when addons are present', () => {
    render(
      <Select
        leftAddon={<span>$</span>}
        wrapperClassName="custom-wrapper"
        options={defaultOptions}
        data-testid="select"
      />
    );
    const wrapper = screen.getByTestId('select').closest('.custom-wrapper');
    expect(wrapper).toHaveClass('custom-wrapper');
  });
});
