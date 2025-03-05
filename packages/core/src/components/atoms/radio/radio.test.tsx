import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Radio } from './index';

describe('Radio', () => {
  it('renders correctly', () => {
    render(<Radio data-testid="radio" />);
    const radio = screen.getByTestId('radio');
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute('type', 'radio');
  });

  it('handles checked state correctly', () => {
    render(<Radio checked readOnly data-testid="radio" />);
    const radio = screen.getByTestId('radio');
    expect(radio).toBeChecked();
  });

  it('applies the correct classes for sizes', () => {
    const { rerender } = render(<Radio size="sm" data-testid="radio" />);
    let radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('h-4');
    expect(radio).toHaveClass('w-4');

    rerender(<Radio size="md" data-testid="radio" />);
    radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('h-5');
    expect(radio).toHaveClass('w-5');

    rerender(<Radio size="lg" data-testid="radio" />);
    radio = screen.getByTestId('radio');
    expect(radio).toHaveClass('h-6');
    expect(radio).toHaveClass('w-6');
  });

  it('handles invalid state correctly', () => {
    render(<Radio isInvalid data-testid="radio" />);
    const radio = screen.getByTestId('radio');
    expect(radio).toHaveAttribute('aria-invalid', 'true');
    expect(radio).toHaveClass('border-destructive');
  });

  it('handles disabled state', async () => {
    const onChange = jest.fn();
    render(<Radio disabled data-testid="radio" onChange={onChange} />);
    const radio = screen.getByTestId('radio');

    expect(radio).toBeDisabled();
    expect(radio).toHaveClass('disabled:cursor-not-allowed');
    expect(radio).toHaveClass('disabled:opacity-50');

    await userEvent.click(radio);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with label correctly', () => {
    render(<Radio label="Option 1" />);
    const label = screen.getByText('Option 1');
    expect(label).toBeInTheDocument();
  });

  it('correctly places label at the start', () => {
    render(
      <Radio
        label="Label at start"
        labelPlacement="start"
        data-testid="radio"
      />
    );
    const radio = screen.getByTestId('radio');
    const label = screen.getByText('Label at start');
    const wrapper = radio.closest('label');

    expect(wrapper).toHaveClass('flex-row-reverse');
    expect(wrapper).toHaveClass('justify-end');
    expect(label).toBeInTheDocument();
  });

  it('handles change events', async () => {
    const onChange = jest.fn();
    render(<Radio data-testid="radio" onChange={onChange} />);
    const radio = screen.getByTestId('radio');

    await userEvent.click(radio);
    expect(onChange).toHaveBeenCalled();
  });

  it('handles ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLInputElement).toBe(true);
  });

  it('allows custom className', () => {
    render(<Radio className="custom-class" data-testid="radio" />);
    expect(screen.getByTestId('radio')).toHaveClass('custom-class');
  });

  it('supports required attribute', () => {
    render(<Radio required data-testid="radio" />);
    expect(screen.getByTestId('radio')).toBeRequired();
  });

  it('renders correctly in radio group context', () => {
    render(
      <div role="radiogroup" aria-label="Options">
        <Radio name="options" value="option1" label="Option 1" />
        <Radio name="options" value="option2" label="Option 2" />
      </div>
    );

    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');

    expect(option1).toHaveAttribute('name', 'options');
    expect(option1).toHaveAttribute('value', 'option1');
    expect(option2).toHaveAttribute('name', 'options');
    expect(option2).toHaveAttribute('value', 'option2');
  });
});
