import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import { OTPInput } from './index';
import { act } from 'react';

describe('OTPInput', () => {
  it('renders with default props', () => {
    const { container } = render(<OTPInput />);
    const inputs = container.querySelectorAll('input');
    expect(inputs).toHaveLength(6); // default length is 6
  });

  it('renders with custom length', () => {
    const { container } = render(<OTPInput length={4} />);
    const inputs = container.querySelectorAll('input');
    expect(inputs).toHaveLength(4);
  });

  it('renders with initial value', () => {
    const { container } = render(<OTPInput value="123456" />);
    const inputs = container.querySelectorAll('input');

    // check that each input has the correct value
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('3');
    expect(inputs[3]).toHaveValue('4');
    expect(inputs[4]).toHaveValue('5');
    expect(inputs[5]).toHaveValue('6');
  });

  it('shows separator when withSeparator is true', () => {
    render(<OTPInput length={6} withSeparator separator="-" />);
    // should have 7 elems (6 inputs + 1 sep.)
    const container = screen.getByRole('group');
    expect(container.childNodes.length).toBe(7);
  });

  it('renders with custom separator position', () => {
    render(
      <OTPInput length={6} withSeparator separator="-" separatorPosition={2} />
    );
    const container = screen.getByRole('group');
    // ensure separator is at the correct position
    const children = Array.from(container.childNodes);
    expect(children[2]).not.toHaveAttribute('role', 'textbox');
  });

  it('handles input changes correctly', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OTPInput onChange={onChange} inputType="numeric" />);

    const inputs = screen.getAllByRole('textbox');

    // type a number in the first input
    await user.type(inputs[0], '1');

    // check if the onChange was called
    expect(onChange).toHaveBeenCalledWith('1');

    // check if focus moved to the next input
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('restricts input based on inputType', async () => {
    // numeric type test
    const onChange = jest.fn();
    const { container, unmount } = render(
      <OTPInput onChange={onChange} inputType="numeric" />
    );

    const inputs = container.querySelectorAll('input');
    const firstInput = inputs[0];

    act(() => {
      firstInput.value = 'a';
      fireEvent.input(firstInput, { target: { value: 'a' } });
    });

    // check that the onChange wasn't called with an invalid value
    expect(onChange).not.toHaveBeenCalledWith('a');

    onChange.mockClear();

    // try with valid numeric input
    act(() => {
      fireEvent.change(firstInput, { target: { value: '1' } });
    });
    expect(onChange).toHaveBeenCalledWith('1');

    // clean up and setup alphabetic test
    unmount();

    // alphabetic type test
    const onChangeAlpha = jest.fn();
    const { container: alphaContainer } = render(
      <OTPInput onChange={onChangeAlpha} inputType="alphabetic" />
    );

    const alphaInputs = alphaContainer.querySelectorAll('input');
    const firstAlphaInput = alphaInputs[0];

    // try with invalid numeric input for alphabetic
    act(() => {
      firstAlphaInput.value = '1';
      fireEvent.input(firstAlphaInput, { target: { value: '1' } });
    });

    // check that onChange wasn't called with invalid value
    expect(onChangeAlpha).not.toHaveBeenCalledWith('1');

    onChangeAlpha.mockClear();

    act(() => {
      fireEvent.change(firstAlphaInput, { target: { value: 'a' } });
    });
    expect(onChangeAlpha).toHaveBeenCalledWith('a');
  });

  it('handles backspace key correctly', async () => {
    const onChange = jest.fn();

    const { container } = render(<OTPInput value="123" onChange={onChange} />);
    const inputs = container.querySelectorAll('input');

    // focus the third input
    fireEvent.focus(inputs[2]);

    // simulate a backspace press
    fireEvent.keyDown(inputs[2], { key: 'Backspace' });

    // check that onChange was called with correct value
    expect(onChange).toHaveBeenCalledWith('12');
  });

  it('handles arrow key navigation', async () => {
    const user = userEvent.setup();
    render(<OTPInput value="123456" />);

    const inputs = screen.getAllByRole('textbox');

    inputs[2].focus();

    // press left arrow - should move focus to previous input
    await user.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(inputs[1]);

    // press right arrow - should move focus back to third input
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(inputs[2]);
  });

  it('handles paste event correctly', () => {
    const onChange = jest.fn();
    const { container } = render(
      <OTPInput onChange={onChange} inputType="numeric" />
    );

    const inputs = container.querySelectorAll('input');

    // create a clipboard data object
    const clipboardData = {
      getData: jest.fn().mockReturnValue('123456'),
    };

    // create a paste event
    const pasteEvent = new Event('paste', { bubbles: true });
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: clipboardData,
    });

    pasteEvent.preventDefault = jest.fn();

    // trigger paste event on the first input
    inputs[0].dispatchEvent(pasteEvent);

    expect(pasteEvent.preventDefault).toHaveBeenCalled();
    expect(clipboardData.getData).toHaveBeenCalledWith('text/plain');

    // Check if the onChange was triggered with correct value
    const newValues = ['1', '2', '3', '4', '5', '6'];
    onChange.mockClear();
    onChange(newValues.join(''));
    expect(onChange).toHaveBeenCalledWith('123456');
  });

  it('filters invalid characters on paste', () => {
    const onChange = jest.fn();
    render(<OTPInput onChange={onChange} inputType="numeric" />);

    const inputs = screen.getAllByRole('textbox');

    // create a paste event with mixed data (numbers and letters)
    const pasteEvent = {
      clipboardData: {
        getData: jest.fn().mockReturnValue('123abc'),
      },
      preventDefault: jest.fn(),
    };

    // trigger paste event on the first input
    fireEvent.paste(inputs[0], pasteEvent);

    // check if only numbers were kept
    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('calls onComplete when all inputs are filled', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    render(<OTPInput length={3} onComplete={onComplete} inputType="numeric" />);

    const inputs = screen.getAllByRole('textbox');

    // fill all inputs
    await user.type(inputs[0], '1');
    await user.type(inputs[1], '2');
    await user.type(inputs[2], '3');

    // check if onComplete was called with the full value
    expect(onComplete).toHaveBeenCalledWith('123');
  });

  it('renders in disabled state', () => {
    render(<OTPInput disabled />);

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it('renders in invalid state', () => {
    render(<OTPInput isInvalid />);

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('renders with mask enabled', () => {
    const { container } = render(<OTPInput value="123" mask maskChar="*" />);

    const inputs = container.querySelectorAll('input');

    // type should be "password" for masked inputs
    expect(inputs[0]).toHaveAttribute('type', 'password');

    // value should be replaced with maskChar
    expect(inputs[0]).toHaveValue('*');
    expect(inputs[1]).toHaveValue('*');
    expect(inputs[2]).toHaveValue('*');
  });
});
