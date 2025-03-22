import { useState } from 'react';
import { OTPInput, OTPInputProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import {
  CheckCircle,
  AlertCircle,
  LockKeyhole,
  SmartphoneNfc,
} from 'lucide-react';

const meta: Meta<OTPInputProps> = {
  title: 'Components/Forms/OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: 'number',
      description: 'Number of input fields',
      defaultValue: 6,
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Changes the size of the input fields',
    },
    inputType: {
      control: 'select',
      options: ['numeric', 'alphabetic', 'alphanumeric'],
      description: 'Type of characters allowed',
    },
    withSeparator: {
      control: 'boolean',
      description: 'Add separator between input fields',
    },
    separator: {
      control: 'text',
      description: 'Character used as separator',
    },
    separatorPosition: {
      control: 'number',
      description: 'Position of the separator (0-indexed)',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Displays the inputs in an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all input fields',
    },
    mask: {
      control: 'boolean',
      description: 'Masks the input values',
    },
    maskChar: {
      control: 'text',
      description: 'Character used for masking',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Autofocuses the first input on mount',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    length: 6,
    inputSize: 'md',
    inputType: 'numeric',
  },
};

// lengths
export const Lengths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">4-digit OTP</p>
        <OTPInput length={4} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">6-digit OTP (Default)</p>
        <OTPInput length={6} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">8-digit OTP</p>
        <OTPInput length={8} />
      </div>
    </div>
  ),
};

// sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Small</p>
        <OTPInput inputSize="sm" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Medium (Default)</p>
        <OTPInput inputSize="md" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Large</p>
        <OTPInput inputSize="lg" />
      </div>
    </div>
  ),
};

// input types
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Numeric (Default)</p>
        <OTPInput inputType="numeric" length={4} />
        <p className="text-xs text-muted-foreground mt-2">
          Only accepts numbers (0-9)
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Alphabetic</p>
        <OTPInput inputType="alphabetic" length={4} />
        <p className="text-xs text-muted-foreground mt-2">
          Only accepts letters (A-Z, a-z)
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Alphanumeric</p>
        <OTPInput inputType="alphanumeric" length={4} />
        <p className="text-xs text-muted-foreground mt-2">
          Accepts both letters and numbers
        </p>
      </div>
    </div>
  ),
};

// separators
export const WithSeparators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Default separator (-)</p>
        <OTPInput withSeparator separator="-" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Custom separator (•)</p>
        <OTPInput withSeparator separator="•" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">
          Custom position (after first digit)
        </p>
        <OTPInput withSeparator separator="-" separatorPosition={1} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">
          Phone number format (XXX-XXX)
        </p>
        <OTPInput
          length={6}
          withSeparator
          separator="-"
          separatorPosition={3}
        />
      </div>
    </div>
  ),
};

// states
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Normal</p>
        <OTPInput length={4} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">With initial value</p>
        <OTPInput length={4} value="1234" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Invalid</p>
        <OTPInput length={4} isInvalid />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Disabled</p>
        <OTPInput length={4} disabled value="1234" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Auto Focus</p>
        <OTPInput length={4} autoFocus />
      </div>
    </div>
  ),
};

// masked OTP
export const MaskedOTP: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Default mask character (•)</p>
        <OTPInput length={4} value="1234" mask />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Custom mask character (*)</p>
        <OTPInput length={4} value="1234" mask maskChar="*" />
      </div>
    </div>
  ),
};

// dark theme
export const DarkTheme: Story = {
  render: () => (
    <div
      className="dark bg-background p-6 rounded-md"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <h3 className="text-lg font-semibold text-foreground">Dark Theme</h3>

      <div className="space-y-4">
        <p className="text-sm font-medium">Default OTP</p>
        <OTPInput length={4} />

        <p className="text-sm font-medium mt-4">With Separator</p>
        <OTPInput length={6} withSeparator />

        <p className="text-sm font-medium mt-4">Invalid state</p>
        <OTPInput length={4} isInvalid />

        <p className="text-sm font-medium mt-4">Masked</p>
        <OTPInput length={4} value="1234" mask />
      </div>
    </div>
  ),
};

// verification examples
export const VerificationCode: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleChange = (value: string) => {
      setOtp(value);
      setIsError(false);
      setIsVerified(false);
    };

    const handleComplete = (value: string) => {
      setIsVerifying(true);

      // Simulate verification (success if OTP is "1234", failure otherwise)
      setTimeout(() => {
        if (value === '1234') {
          setIsVerified(true);
          setIsError(false);
        } else {
          setIsVerified(false);
          setIsError(true);
        }
        setIsVerifying(false);
      }, 1500);
    };

    return (
      <div className="w-80 space-y-4 p-6 bg-background border border-border rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <LockKeyhole className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Verify your account</h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Enter the 4-digit code sent to your device. Try "1234" for a
          successful verification.
        </p>

        <div className="py-2">
          <OTPInput
            length={4}
            onChange={handleChange}
            onComplete={handleComplete}
            isInvalid={isError}
            autoFocus
          />
        </div>

        {isVerifying && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <SmartphoneNfc className="h-4 w-4 animate-pulse" />
            Verifying code...
          </p>
        )}

        {isVerified && (
          <p className="text-sm text-success flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Code verified successfully!
          </p>
        )}

        {isError && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Invalid verification code. Please try again.
          </p>
        )}

        <div className="pt-2">
          <button
            className="text-sm text-primary hover:text-primary/90 transition-colors"
            onClick={() => setOtp('')}
          >
            Resend code
          </button>
        </div>
      </div>
    );
  },
};

export const PhoneVerification: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    const timeLeft = 30; // Static time for storybook

    return (
      <div className="w-80 space-y-4 p-6 bg-background border border-border rounded-lg shadow-sm">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Verify Your Phone</h3>
          <p className="text-sm text-muted-foreground mt-1">
            We've sent a code to +1 (XXX) XXX-5678
          </p>
        </div>

        <div className="py-4">
          <OTPInput
            length={6}
            withSeparator
            separator=" "
            onChange={setOtp}
            inputSize="md"
            autoFocus
          />
        </div>

        <button
          className="w-full h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={otp.length !== 6}
        >
          Verify
        </button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive code? Resend in{' '}
            <span className="font-medium">{timeLeft}s</span>
          </p>
        </div>
      </div>
    );
  },
};
