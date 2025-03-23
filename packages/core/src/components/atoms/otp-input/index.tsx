import { cn } from '@/utils/cn';
import React, {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

export type OtpInputType = 'numeric' | 'alphabetic' | 'alphanumeric';

export interface OTPInputProps {
  /**
   * Number of input boxes (length of OTP)
   */
  length?: number;
  /**
   * Value of the OTP
   */
  value?: string;
  /**
   * Called when OTP value changes
   */
  onChange?: (value: string) => void;
  /**
   * Called when all inputs are filled
   */
  onComplete?: (value: string) => void;
  /**
   * Type of input accepted
   */
  inputType?: OtpInputType;
  /**
   * Adds a separator in the middle
   */
  withSeparator?: boolean;
  /**
   * Custom separator character/element
   */
  separator?: React.ReactNode;
  /**
   * Position of separator (0-indexed, defaults to middle)
   */
  separatorPosition?: number;
  /**
   * Auto focus on the first input when component mounts
   */
  autoFocus?: boolean;
  /**
   * Disables all inputs
   */
  disabled?: boolean;
  /**
   * Shows error state
   */
  isInvalid?: boolean;
  /**
   * Input size
   */
  inputSize?: 'sm' | 'md' | 'lg';
  /**
   * Additional class name for the container
   */
  className?: string;
  /**
   * Additional class name for each input
   */
  inputClassName?: string;
  /**
   * Additional class name for the separator
   */
  separatorClassName?: string;
  /**
   * Placeholder character for each input
   */
  placeholder?: string;
  /**
   * Whether to mask the input (like password)
   */
  mask?: boolean;
  /**
   * Masking character (only used if mask is true)
   */
  maskChar?: string;
  /**
   * aria-label for the input
   */
  ariaLabel?: string;
}

const OTPInput = ({
  length = 6,
  value = '',
  onChange,
  onComplete,
  inputType = 'numeric',
  withSeparator = false,
  separator = '-',
  separatorPosition,
  autoFocus = false,
  disabled = false,
  isInvalid = false,
  inputSize = 'md',
  className = '',
  inputClassName = '',
  separatorClassName = '',
  placeholder = '',
  mask = false,
  maskChar = '•',
  ariaLabel = 'OTP input',
}: OTPInputProps) => {
  // Calculate default separator position (middle of OTP)
  const defaultSeparatorPos = Math.floor(length / 2);
  const actualSeparatorPosition =
    separatorPosition !== undefined ? separatorPosition : defaultSeparatorPos;

  // Initialize refs for input elements
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Initialize state with the provided value or empty strings
  const [otpValues, setOtpValues] = useState<string[]>(() => {
    const initialValue = value.split('').slice(0, length);
    return Array(length)
      .fill('')
      .map((_, index) => initialValue[index] || '');
  });

  // Input regex patterns based on inputType
  const inputPatterns = {
    numeric: /^[0-9]$/,
    alphabetic: /^[A-Za-z]$/,
    alphanumeric: /^[0-9A-Za-z]$/,
  };

  // Function to check if input is valid based on inputType
  const isValidInput = (input: string): boolean => {
    return inputPatterns[inputType].test(input);
  };

  // Update parent component when OTP changes
  useEffect(() => {
    const currentValue = otpValues.join('');
    if (onChange) {
      onChange(currentValue);
    }

    // Call onComplete only when all inputs are filled
    if (currentValue.length === length && onComplete) {
      onComplete(currentValue);
    }
  }, [otpValues, onChange, onComplete, length]);

  // Update internal state when the value prop changes
  useEffect(() => {
    if (value) {
      const valueArray = value.split('').slice(0, length);
      setOtpValues(
        Array(length)
          .fill('')
          .map((_, index) => valueArray[index] || '')
      );
    }
  }, [value, length]);

  // Auto focus the first input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const currentValue = e.target.value;

    // if empty, allow it and update state
    if (currentValue === '') {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = '';
      setOtpValues(newOtpValues);
      return;
    }

    // get the last char if multiple are entered
    const lastChar = currentValue[currentValue.length - 1];

    // proceed if the input matches the pattern
    if (isValidInput(lastChar)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = lastChar;
      setOtpValues(newOtpValues);

      // auto focus next input if available
      if (index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      // for invalid input, don't update the state
      // reset the input value to empty
      const newOtpValues = [...otpValues];
      newOtpValues[index] = '';
      setOtpValues(newOtpValues);

      if (e.target instanceof HTMLInputElement) {
        e.target.value = '';
      }
    }
  };

  // Handle key down events (backspace, arrow keys)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Prevent default to have full control

      if (otpValues[index] === '') {
        // Move to previous input if current is empty
        if (index > 0) {
          // Clear the previous input
          const newOtpValues = [...otpValues];
          newOtpValues[index - 1] = '';
          setOtpValues(newOtpValues);

          // Focus the previous input immediately
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        // Clear current input
        const newOtpValues = [...otpValues];
        newOtpValues[index] = '';
        setOtpValues(newOtpValues);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move focus to previous input
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      // Move focus to next input
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    // Make sure to call preventDefault
    e.preventDefault();

    // Get pasted content
    const pastedData = e.clipboardData.getData('text/plain').trim();

    // Filter only valid characters based on inputType
    const validChars = pastedData
      .split('')
      .filter((char) => isValidInput(char))
      .slice(0, length - index);

    if (validChars.length === 0) return;

    // Update OTP values with pasted characters
    const newOtpValues = [...otpValues];
    validChars.forEach((char, i) => {
      if (index + i < length) {
        newOtpValues[index + i] = char;
      }
    });

    setOtpValues(newOtpValues);

    // Focus the input after the last pasted character
    const focusIndex = Math.min(index + validChars.length, length - 1);
    setTimeout(() => {
      inputRefs.current[focusIndex]?.focus();
    }, 0);
  };

  // Handle focus event
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select the input content on focus
    e.target.select();
  };

  // Determine input size classes
  const inputSizeClasses = {
    sm: 'h-8 w-8 text-lg',
    md: 'h-10 w-10 text-xl',
    lg: 'h-12 w-12 text-2xl',
  };

  // Render the OTP inputs
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2',
        isInvalid && 'has-[input:focus]:ring-destructive/30',
        className
      )}
      role="group"
      aria-labelledby={ariaLabel}
    >
      {Array(length)
        .fill(null)
        .map((_, index) => {
          // Determine if we need to render a separator before this input
          const showSeparator =
            withSeparator && index === actualSeparatorPosition;

          return (
            <React.Fragment key={index}>
              {showSeparator && (
                <div
                  className={cn(
                    'flex items-center justify-center mx-1',
                    separatorClassName
                  )}
                  aria-hidden="true"
                >
                  {separator}
                </div>
              )}
              <input
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                }}
                type={mask ? 'password' : 'text'}
                inputMode={inputType === 'numeric' ? 'numeric' : 'text'}
                pattern={inputType === 'numeric' ? '[0-9]*' : undefined}
                maxLength={1}
                value={mask && otpValues[index] ? maskChar : otpValues[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                onFocus={handleFocus}
                disabled={disabled}
                aria-invalid={isInvalid}
                placeholder={placeholder}
                className={cn(
                  // Base styles
                  'text-center rounded-md text-foreground',
                  'border border-input bg-background',
                  'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
                  'transition-all duration-200',
                  'disabled:cursor-not-allowed disabled:opacity-60',

                  // Size styles
                  inputSizeClasses[inputSize],

                  // Error state
                  isInvalid &&
                    'border-destructive focus:ring-destructive/30 focus:border-destructive',

                  inputClassName
                )}
              />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export { OTPInput };
