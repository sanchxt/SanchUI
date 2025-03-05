import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';

import { Textarea } from './index';

// mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Textarea', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Enter description" />);
    const textarea = screen.getByPlaceholderText('Enter description');
    expect(textarea).toBeInTheDocument();
  });

  it('applies the correct classes for variants', () => {
    const { rerender } = render(
      <Textarea variant="outline" placeholder="Test" />
    );
    let textarea = screen.getByPlaceholderText('Test');
    expect(textarea).toHaveClass('border');
    expect(textarea).toHaveClass('rounded-md');

    rerender(<Textarea variant="filled" placeholder="Test" />);
    textarea = screen.getByPlaceholderText('Test');
    expect(textarea).toHaveClass('bg-secondary/50');
    expect(textarea).not.toHaveClass('border');

    rerender(<Textarea variant="flushed" placeholder="Test" />);
    textarea = screen.getByPlaceholderText('Test');
    expect(textarea).toHaveClass('border-b');
    expect(textarea).toHaveClass('rounded-none');

    rerender(<Textarea variant="unstyled" placeholder="Test" />);
    textarea = screen.getByPlaceholderText('Test');
    expect(textarea).toHaveClass('border-0');
    expect(textarea).toHaveClass('p-0');
  });

  it('handles invalid state correctly', () => {
    render(<Textarea isInvalid placeholder="Test" />);
    const textarea = screen.getByPlaceholderText('Test');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveClass('border-destructive');
  });

  it('handles disabled state', async () => {
    const onChange = jest.fn();
    render(<Textarea disabled placeholder="Test" onChange={onChange} />);
    const textarea = screen.getByPlaceholderText('Test');

    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:cursor-not-allowed');
    expect(textarea).toHaveClass('disabled:opacity-50');

    await userEvent.type(textarea, 'Hello');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('handles change events', async () => {
    const onChange = jest.fn();
    render(<Textarea placeholder="Test" onChange={onChange} />);
    const textarea = screen.getByPlaceholderText('Test');

    await userEvent.type(textarea, 'Hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('handles ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current instanceof HTMLTextAreaElement).toBe(true);
  });

  it('has resize-vertical by default', () => {
    render(<Textarea placeholder="Test" />);
    const textarea = screen.getByPlaceholderText('Test');
    expect(textarea).toHaveClass('resize-vertical');
  });

  it('has resize-none when autoResize is enabled', () => {
    render(<Textarea autoResize placeholder="Test" />);
    const textarea = screen.getByPlaceholderText('Test');
    expect(textarea).toHaveClass('resize-none');
    expect(textarea).not.toHaveClass('resize-vertical');
  });

  it('sets initial rows from minRows prop', () => {
    render(<Textarea minRows={5} placeholder="Test" />);
    const textarea = screen.getByPlaceholderText('Test');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('shows character count when showCount is true', async () => {
    render(<Textarea showCount placeholder="Test" />);

    const textarea = screen.getByPlaceholderText('Test');
    expect(screen.getByText('0')).toBeInTheDocument();

    await userEvent.type(textarea, 'Hello');
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows character count with max when maxLength is provided', () => {
    render(
      <Textarea showCount maxLength={100} placeholder="Test" value="Hello" />
    );
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('displays counter prefix when provided', () => {
    render(
      <Textarea
        showCount
        counterPrefix="Characters:"
        placeholder="Test"
        value="Hello"
      />
    );
    expect(screen.getByText('Characters:')).toBeInTheDocument();
  });

  it('enforces maxLength constraint', async () => {
    render(<Textarea maxLength={5} placeholder="Test" />);
    const textarea = screen.getByPlaceholderText('Test');

    await userEvent.type(textarea, 'Hello World');
    expect(textarea).toHaveValue('Hello');
  });

  it('allows custom className', () => {
    render(<Textarea className="custom-class" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('custom-class');
  });

  it('triggers resize on input', () => {
    const onInput = jest.fn();
    render(<Textarea autoResize onInput={onInput} placeholder="Test" />);

    const textarea = screen.getByPlaceholderText('Test');
    fireEvent.input(textarea, { target: { value: 'New test content' } });

    expect(onInput).toHaveBeenCalled();
  });
});
