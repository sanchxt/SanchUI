import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Switch } from './index';

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch data-testid="switch" />);
    const switchInput = screen.getByTestId('switch');
    expect(switchInput).toBeInTheDocument();
    expect(switchInput).toHaveAttribute('type', 'checkbox');
  });

  it('renders with label correctly', () => {
    render(<Switch label="Toggle me" data-testid="switch" />);
    const switchInput = screen.getByTestId('switch');
    const label = screen.getByText('Toggle me');
    expect(switchInput).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('handles label position properly', () => {
    const { rerender } = render(
      <Switch label="Toggle me" labelPosition="right" data-testid="switch" />
    );

    let labelContainer = screen.getByText('Toggle me').closest('label');
    expect(labelContainer).not.toHaveClass('flex-row-reverse');

    rerender(
      <Switch label="Toggle me" labelPosition="left" data-testid="switch" />
    );
    labelContainer = screen.getByText('Toggle me').closest('label');
    expect(labelContainer).toHaveClass('flex-row-reverse');
  });

  it('applies the correct classes for sizes', () => {
    const { rerender } = render(<Switch size="sm" data-testid="switch" />);

    let switchElement = screen.getByTestId('switch').nextElementSibling;
    expect(switchElement).toHaveClass('h-5');
    expect(switchElement).toHaveClass('w-9');

    rerender(<Switch size="md" data-testid="switch" />);
    switchElement = screen.getByTestId('switch').nextElementSibling;
    expect(switchElement).toHaveClass('h-6');
    expect(switchElement).toHaveClass('w-11');

    rerender(<Switch size="lg" data-testid="switch" />);
    switchElement = screen.getByTestId('switch').nextElementSibling;
    expect(switchElement).toHaveClass('h-7');
    expect(switchElement).toHaveClass('w-14');
  });

  it('handles color variants correctly', () => {
    const { rerender } = render(
      <Switch variant="primary" data-testid="switch" />
    );

    let switchElement = screen.getByTestId('switch').nextElementSibling;
    expect(switchElement).toHaveClass('peer-checked:bg-primary');

    rerender(<Switch variant="success" data-testid="switch" />);
    switchElement = screen.getByTestId('switch').nextElementSibling;
    expect(switchElement).toHaveClass('peer-checked:bg-success');

    rerender(<Switch variant="destructive" data-testid="switch" />);
    switchElement = screen.getByTestId('switch').nextElementSibling;
    expect(switchElement).toHaveClass('peer-checked:bg-destructive');

    rerender(<Switch variant="default" data-testid="switch" />);
    switchElement = screen.getByTestId('switch').nextElementSibling;
    expect(switchElement).toHaveClass('peer-checked:bg-foreground');
  });

  it('handles checked state', () => {
    render(<Switch defaultChecked data-testid="switch" />);
    const switchInput = screen.getByTestId('switch');
    expect(switchInput).toBeChecked();
  });

  it('handles default checked state', () => {
    render(<Switch defaultChecked data-testid="switch" />);
    const switchInput = screen.getByTestId('switch');
    expect(switchInput).toBeChecked();
  });

  it('handles disabled state', () => {
    render(<Switch disabled data-testid="switch" />);
    const switchInput = screen.getByTestId('switch');
    expect(switchInput).toBeDisabled();
  });

  it('handles change events', async () => {
    const onChange = jest.fn();
    render(<Switch onChange={onChange} data-testid="switch" />);
    const switchInput = screen.getByTestId('switch');

    await userEvent.click(switchInput);
    expect(onChange).toHaveBeenCalled();
    expect(switchInput).toBeChecked();
  });

  it('handles ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Switch ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLInputElement).toBe(true);
  });

  it('toggles when clicking on the label', async () => {
    const onChange = jest.fn();
    render(
      <Switch label="Toggle me" onChange={onChange} data-testid="switch" />
    );
    const label = screen.getByText('Toggle me');

    await userEvent.click(label);
    expect(onChange).toHaveBeenCalled();
  });

  it('allows custom className', () => {
    render(<Switch className="custom-class" data-testid="switch" />);
    const switchElement = screen.getByTestId('switch').nextElementSibling;
    expect(switchElement).toHaveClass('custom-class');
  });

  it('allows custom wrapperClassName when label is present', () => {
    render(
      <Switch
        label="Toggle me"
        wrapperClassName="custom-wrapper"
        data-testid="switch"
      />
    );
    const labelElement = screen.getByText('Toggle me').closest('label');
    expect(labelElement).toHaveClass('custom-wrapper');
  });

  it('adds hover and active scaling effects', () => {
    render(<Switch data-testid="switch" />);
    const switchElement = screen.getByTestId('switch').nextElementSibling;
    expect(switchElement).toHaveClass('hover:scale-[1.02]');
    expect(switchElement).toHaveClass('active:scale-[0.98]');
  });

  it('applies border styles to track and thumb', () => {
    render(<Switch data-testid="switch" />);

    const track = screen.getByTestId('switch-track');
    const thumb = screen.getByTestId('switch-thumb');

    expect(track).toHaveClass('border');
    expect(thumb).toHaveClass('border-2');
  });

  it('adds font-medium to label when checked', () => {
    render(<Switch label="Toggle me" defaultChecked data-testid="switch" />);
    const label = screen.getByText('Toggle me');
    expect(label).toHaveClass('font-medium');
  });

  it('applies shadow to the thumb', () => {
    render(<Switch data-testid="switch" />);
    const thumb = screen.getByTestId('switch-thumb');

    expect(thumb).toHaveClass('shadow-md');
  });
});
