import { useState } from 'react';
import { Input, InputProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Search,
  Mail,
  Check,
  Lock,
  User,
  Phone,
  Calendar,
  X,
  AtSign,
  AlertCircle,
  CreditCard,
} from 'lucide-react';

const meta: Meta<InputProps> = {
  title: 'Components/Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed', 'unstyled'],
      description: 'Changes the visual style of the input',
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Changes the size of the input',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Displays the input in an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    leftAddon: {
      control: 'boolean',
      description: 'Toggle left addon (icon for demo)',
    },
    rightAddon: {
      control: 'boolean',
      description: 'Toggle right addon (icon for demo)',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
    variant: 'outline',
    inputSize: 'md',
  },
};

// variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Outline (Default)</p>
        <Input placeholder="Outline variant" variant="outline" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Filled</p>
        <Input placeholder="Filled variant" variant="filled" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Flushed</p>
        <Input placeholder="Flushed variant" variant="flushed" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Unstyled</p>
        <Input placeholder="Unstyled variant" variant="unstyled" />
      </div>
    </div>
  ),
};

// sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p className="text-sm font-medium mb-2">Small</p>
        <Input placeholder="Small input" inputSize="sm" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Medium (Default)</p>
        <Input placeholder="Medium input" inputSize="md" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Large</p>
        <Input placeholder="Large input" inputSize="lg" />
      </div>
    </div>
  ),
};

// states
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p className="text-sm font-medium mb-2">Normal</p>
        <Input placeholder="Normal state" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Focused</p>
        <Input placeholder="Focused state (click to see)" autoFocus />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Invalid</p>
        <Input
          placeholder="Invalid input"
          isInvalid
          defaultValue="Invalid value"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Disabled</p>
        <Input
          placeholder="Disabled input"
          disabled
          defaultValue="Cannot edit this"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Read-only</p>
        <Input
          placeholder="Read only input"
          readOnly
          defaultValue="Read only value"
        />
      </div>
    </div>
  ),
};

// types
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p className="text-sm font-medium mb-2">Text</p>
        <Input type="text" placeholder="Text input" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Password</p>
        <Input
          type="password"
          placeholder="Password input"
          leftAddon={<Lock className="h-4 w-4" />}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Email</p>
        <Input
          type="email"
          placeholder="Email input"
          leftAddon={<Mail className="h-4 w-4" />}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Number</p>
        <Input type="number" placeholder="Number input" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Date</p>
        <Input type="date" leftAddon={<Calendar className="h-4 w-4" />} />
      </div>
    </div>
  ),
};

// addons
export const WithAddons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p className="text-sm font-medium mb-2">Left Icon</p>
        <Input
          placeholder="Username"
          leftAddon={<User className="h-4 w-4" />}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Right Icon</p>
        <Input
          placeholder="Verified input"
          rightAddon={<Check className="h-4 w-4 text-success" />}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Both Sides</p>
        <Input
          placeholder="Search..."
          leftAddon={<Search className="h-4 w-4" />}
          rightAddon={<X className="h-4 w-4 cursor-pointer" />}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Text Addons</p>
        <Input
          type="number"
          placeholder="Amount"
          leftAddon={<span className="text-sm font-medium">$</span>}
          rightAddon={<span className="text-sm font-medium">.00</span>}
        />
      </div>
    </div>
  ),
};

// dark theme
export const DarkTheme: Story = {
  render: () => (
    <div
      className="dark bg-background p-2 rounded-md"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <h3 className="text-lg font-semibold text-foreground">Dark Theme</h3>

      <div className="space-y-4">
        <Input placeholder="Default input" />

        <Input
          placeholder="With icon"
          leftAddon={<Mail className="h-4 w-4" />}
        />

        <Input
          placeholder="Invalid input"
          isInvalid
          leftAddon={<AlertCircle className="h-4 w-4" />}
        />

        <Input
          placeholder="Filled variant"
          variant="filled"
          leftAddon={<Search className="h-4 w-4" />}
        />
      </div>
    </div>
  ),
};

// interactive
export const PasswordToggle: Story = {
  render: () => {
    return (
      <div className="w-80">
        <p className="text-sm font-medium mb-2">Password with Toggle</p>
        <Input
          type="password"
          placeholder="Enter password"
          leftAddon={<Lock className="h-4 w-4" />}
          showPasswordToggle
        />
        <p className="text-xs text-muted-foreground mt-2">
          Built-in password visibility toggle - no state management needed
        </p>
      </div>
    );
  },
};

export const CharacterCounter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 20;

    return (
      <div className="w-80 space-y-1">
        <p className="text-sm font-medium mb-2">Character Counter</p>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Max 20 characters"
          maxLength={maxLength}
          isInvalid={value.length === maxLength}
        />
        <div
          className={`text-right text-xs ${
            value.length === maxLength
              ? 'text-destructive'
              : 'text-muted-foreground'
          }`}
        >
          {value.length}/{maxLength}
        </div>
      </div>
    );
  },
};

export const EmailValidation: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);

    const validateEmail = (value: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);

      if (value === '' || validateEmail(value)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };

    return (
      <div className="w-80 space-y-2">
        <p className="text-sm font-medium mb-2">Email Validation</p>
        <Input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email address"
          isInvalid={!isValid}
          leftAddon={<AtSign className="h-4 w-4" />}
          rightAddon={
            email && isValid ? <Check className="h-4 w-4 text-success" /> : null
          }
        />
        {!isValid && (
          <p className="text-xs text-destructive">
            Please enter a valid email address
          </p>
        )}
      </div>
    );
  },
};

export const VariantsWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p className="text-sm font-medium mb-2">Outline with Icon</p>
        <Input
          placeholder="Search..."
          variant="outline"
          leftAddon={<Search className="h-4 w-4" />}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Filled with Icon</p>
        <Input
          placeholder="Search..."
          variant="filled"
          leftAddon={<Search className="h-4 w-4" />}
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Flushed with Icon</p>
        <Input
          placeholder="Search..."
          variant="flushed"
          leftAddon={<Search className="h-4 w-4" />}
        />
      </div>
    </div>
  ),
};

export const CreditCardInput: Story = {
  render: () => {
    const [cardNumber, setCardNumber] = useState('');

    const formatCardNumber = (value: string) => {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length) {
        return parts.join(' ');
      } else {
        return value;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCardNumber(e.target.value);
      setCardNumber(formatted);
    };

    return (
      <div className="w-80 space-y-1">
        <p className="text-sm font-medium mb-2">Credit Card Input</p>
        <Input
          value={cardNumber}
          onChange={handleChange}
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          leftAddon={<CreditCard className="h-4 w-4" />}
        />
      </div>
    );
  },
};

export const PhoneNumberInput: Story = {
  render: () => {
    const [phone, setPhone] = useState('');

    const formatPhoneNumber = (value: string) => {
      const phoneNumber = value.replace(/[^\d]/g, '');

      if (phoneNumber.length < 4) return phoneNumber;
      if (phoneNumber.length < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      }
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      setPhone(formatted);
    };

    return (
      <div className="w-80 space-y-1">
        <p className="text-sm font-medium mb-2">Phone Number Input</p>
        <Input
          value={phone}
          onChange={handleChange}
          placeholder="(123) 456-7890"
          maxLength={14}
          leftAddon={<Phone className="h-4 w-4" />}
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    return (
      <form
        className="w-96 space-y-4 p-6 bg-background border border-border rounded-lg shadow-sm p-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <h3 className="text-lg font-semibold mb-4">Sign Up Form</h3>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <Input
            id="name"
            placeholder="Enter your name"
            leftAddon={<User className="h-4 w-4" />}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            leftAddon={<Mail className="h-4 w-4" />}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            leftAddon={<Lock className="h-4 w-4" />}
          />
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="(123) 456-7890"
            leftAddon={<Phone className="h-4 w-4" />}
          />
        </div>

        <button
          type="submit"
          className="w-full h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Create Account
        </button>
      </form>
    );
  },
};
