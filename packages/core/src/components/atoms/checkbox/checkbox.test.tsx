import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Checkbox } from './index';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('handles checked state correctly', () => {
    render(<Checkbox checked readOnly data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('handles indeterminate state correctly', () => {
    const { rerender } = render(
      <Checkbox indeterminate data-testid="checkbox" />
    );
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);

    rerender(<Checkbox indeterminate={false} data-testid="checkbox" />);
    expect(checkbox.indeterminate).toBe(false);
  });

  it('applies the correct classes for sizes', () => {
    const { rerender } = render(<Checkbox size="sm" data-testid="checkbox" />);
    let checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass('h-4');
    expect(checkbox).toHaveClass('w-4');

    rerender(<Checkbox size="md" data-testid="checkbox" />);
    checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass('h-5');
    expect(checkbox).toHaveClass('w-5');

    rerender(<Checkbox size="lg" data-testid="checkbox" />);
    checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass('h-6');
    expect(checkbox).toHaveClass('w-6');
  });

  it('handles invalid state correctly', () => {
    render(<Checkbox isInvalid data-testid="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveClass('border-destructive');
  });

  it('handles disabled state', async () => {
    const onChange = jest.fn();
    render(<Checkbox disabled data-testid="checkbox" onChange={onChange} />);
    const checkbox = screen.getByTestId('checkbox');

    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass('disabled:cursor-not-allowed');
    expect(checkbox).toHaveClass('disabled:opacity-50');

    await userEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with label correctly', () => {
    render(<Checkbox label="Accept terms" />);
    const label = screen.getByText('Accept terms');
    expect(label).toBeInTheDocument();
  });

  it('correctly places label at the start', () => {
    render(
      <Checkbox
        label="Label at start"
        labelPlacement="start"
        data-testid="checkbox"
      />
    );
    const checkbox = screen.getByTestId('checkbox');
    const label = screen.getByText('Label at start');
    const wrapper = checkbox.closest('label');

    expect(wrapper).toHaveClass('flex-row-reverse');
    expect(wrapper).toHaveClass('justify-end');
    expect(label).toBeInTheDocument();
  });

  it('handles change events', async () => {
    const onChange = jest.fn();
    render(<Checkbox data-testid="checkbox" onChange={onChange} />);
    const checkbox = screen.getByTestId('checkbox');

    await userEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });

  it('handles ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLInputElement).toBe(true);
  });

  it('allows custom className', () => {
    render(<Checkbox className="custom-class" data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toHaveClass('custom-class');
  });

  it('supports required attribute', () => {
    render(<Checkbox required data-testid="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeRequired();
  });
});
