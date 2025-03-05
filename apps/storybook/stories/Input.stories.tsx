import { useState } from 'react';
import { Input, InputProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import { Search, Mail, Eye, EyeOff, Check, Lock, User } from 'lucide-react';

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
export const Outline: Story = {
  args: {
    placeholder: 'Outline Input',
    variant: 'outline',
  },
};

export const Filled: Story = {
  args: {
    placeholder: 'Filled Input',
    variant: 'filled',
  },
};

export const Flushed: Story = {
  args: {
    placeholder: 'Flushed Input',
    variant: 'flushed',
  },
};

export const Unstyled: Story = {
  args: {
    placeholder: 'Unstyled Input (no styling)',
    variant: 'unstyled',
  },
};

// sizes
export const Small: Story = {
  args: {
    placeholder: 'Small Input',
    inputSize: 'sm',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Medium Input',
    inputSize: 'md',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large Input',
    inputSize: 'lg',
  },
};

// states
export const Invalid: Story = {
  args: {
    placeholder: 'Invalid Input',
    isInvalid: true,
    defaultValue: 'Invalid input value',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled Input',
    disabled: true,
    defaultValue: 'You cannot edit this',
  },
};

// types
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    leftAddon: <Lock className="h-4 w-4 text-muted-foreground" />,
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email address',
    leftAddon: <Mail className="h-4 w-4 text-muted-foreground" />,
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    leftAddon: <Search className="h-4 w-4 text-muted-foreground" />,
  },
};

// addons
export const WithLeftAddon: Story = {
  args: {
    placeholder: 'Username',
    leftAddon: <User className="h-4 w-4 text-muted-foreground" />,
  },
};

export const WithRightAddon: Story = {
  args: {
    placeholder: 'Enter text',
    rightAddon: <Check className="h-4 w-4 text-muted-foreground" />,
  },
};

export const WithBothAddons: Story = {
  args: {
    placeholder: 'Search...',
    leftAddon: <Search className="h-4 w-4 text-muted-foreground" />,
    rightAddon: <Check className="h-4 w-4 text-muted-foreground" />,
  },
};

// extras
export const WithDarkTheme: Story = {
  render: (args) => (
    <div className="dark p-6 rounded-md bg-background">
      <Input
        {...args}
        placeholder="Dark theme input"
        leftAddon={<Mail className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  ),
};

export const NumberWithAddons: Story = {
  args: {
    type: 'number',
    placeholder: 'Amount',
    leftAddon: <span className="text-sm font-medium">$</span>,
    rightAddon: <span className="text-sm font-medium">.00</span>,
  },
};

// interactive
export const PasswordToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter password"
        leftAddon={<Lock className="h-4 w-4 text-muted-foreground" />}
        rightAddon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        }
      />
    );
  },
};

export const CharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 20;

    return (
      <div className="w-full space-y-1">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Max 20 characters"
          maxLength={maxLength}
          isInvalid={value.length >= maxLength}
        />
        <div
          className={`text-right text-xs ${
            value.length >= maxLength
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

export const FormExample: Story = {
  render: () => {
    return (
      <form className="w-80 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            placeholder="Enter your name"
            leftAddon={<User className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            leftAddon={<Mail className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            leftAddon={<Lock className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>
      </form>
    );
  },
};

export const ValidationExample: Story = {
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
      <div className="w-full max-w-sm space-y-2">
        <Input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email address"
          isInvalid={!isValid}
          leftAddon={<Mail className="h-4 w-4 text-muted-foreground" />}
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
