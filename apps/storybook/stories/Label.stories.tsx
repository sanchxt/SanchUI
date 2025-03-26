import type { Meta, StoryObj } from '@storybook/react';
import { Label, LabelProps, Input, Checkbox } from '@sanch-ui/core';

const meta: Meta<LabelProps> = {
  title: 'Components/Forms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'success', 'muted'],
      description: 'The visual style of the label',
      defaultValue: 'default',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the label',
      defaultValue: 'md',
    },
    required: {
      control: 'boolean',
      description: 'Whether to show a required indicator',
      defaultValue: false,
    },
    requiredIndicator: {
      control: 'text',
      description: 'Custom required indicator character',
      defaultValue: '*',
    },
    srOnly: {
      control: 'boolean',
      description:
        'Visually hide the label but keep it accessible for screen readers',
      defaultValue: false,
    },
    children: {
      control: 'text',
      description: 'The label content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

// examples
export const BasicExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label>Email address</Label>
        <Input type="email" placeholder="example@email.com" />
      </div>

      <div className="space-y-2">
        <Label required>Password</Label>
        <Input type="password" placeholder="Enter your password" />
      </div>

      <div className="space-y-2">
        <Label srOnly>Hidden Label (screen reader only)</Label>
        <Input placeholder="Label is hidden but accessible" />
      </div>
    </div>
  ),
};

// variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <Label variant="default">Default variant</Label>
        <p className="text-xs text-muted-foreground">
          Standard label appearance
        </p>
      </div>

      <div className="space-y-1">
        <Label variant="secondary">Secondary variant</Label>
        <p className="text-xs text-muted-foreground">
          Secondary style for less emphasis
        </p>
      </div>

      <div className="space-y-1">
        <Label variant="destructive">Destructive variant</Label>
        <p className="text-xs text-muted-foreground">
          For highlighting errors or warnings
        </p>
      </div>

      <div className="space-y-1">
        <Label variant="success">Success variant</Label>
        <p className="text-xs text-muted-foreground">For success states</p>
      </div>

      <div className="space-y-1">
        <Label variant="muted">Muted variant</Label>
        <p className="text-xs text-muted-foreground">Subdued appearance</p>
      </div>
    </div>
  ),
};

// sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label size="sm">Small label</Label>
        <Input inputSize="sm" placeholder="Small input" />
      </div>

      <div className="space-y-2">
        <Label size="md">Medium label (default)</Label>
        <Input placeholder="Medium input" />
      </div>

      <div className="space-y-2">
        <Label size="lg">Large label</Label>
        <Input inputSize="lg" placeholder="Large input" />
      </div>
    </div>
  ),
};

// required labels
export const RequiredLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label required>Default required indicator (*)</Label>
        <Input placeholder="This field is required" />
      </div>

      <div className="space-y-2">
        <Label required requiredIndicator="†">
          Custom symbol (†)
        </Label>
        <Input placeholder="Using a custom required indicator" />
      </div>

      <div className="space-y-2">
        <Label required requiredIndicator=" (required)">
          Text indicator
        </Label>
        <Input placeholder="Using text as an indicator" />
      </div>

      <div className="space-y-2">
        <Label required variant="destructive">
          Destructive required
        </Label>
        <Input placeholder="Error state with required indicator" />
      </div>
    </div>
  ),
};

// form group
export const FormGroupExamples: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username" required>
          Username
        </Label>
        <Input id="username" placeholder="Enter your username" />
        <p className="text-xs text-muted-foreground">
          Your unique username for the platform
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" placeholder="example@email.com" />
        <p className="text-xs text-muted-foreground">
          We'll never share your email
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-bio" variant="muted">
          Bio (optional)
        </Label>
        <textarea
          id="profile-bio"
          className="w-full min-h-24 px-3 py-2 text-sm rounded-md border border-input bg-background"
          placeholder="Tell us about yourself"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" variant="destructive" required>
          Password (invalid)
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter a secure password"
          className="border-destructive focus:ring-destructive/30"
        />
        <p className="text-xs text-destructive">
          Password must be at least 8 characters
        </p>
      </div>
    </div>
  ),
};

// dark theme
export const DarkTheme: Story = {
  render: () => (
    <div className="dark bg-background p-6 rounded-lg shadow-sm border border-border w-80">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Form in Dark Mode
      </h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label required>Email</Label>
          <Input type="email" placeholder="example@email.com" />
        </div>

        <div className="space-y-2">
          <Label variant="muted">Display name (optional)</Label>
          <Input placeholder="How you'll appear to others" />
        </div>

        <div className="space-y-2">
          <Label variant="destructive" required>
            Password
          </Label>
          <Input type="password" placeholder="Choose a strong password" />
          <p className="text-xs text-destructive">Password is too weak</p>
        </div>

        <div className="space-y-2">
          <Label variant="success">Account type</Label>
          <select className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background">
            <option value="personal">Personal</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
          </select>
        </div>
      </div>
    </div>
  ),
};

// accessibility
export const AccessibilityExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-medium mb-3">Screen Reader Only Label</h3>
        <div className="relative">
          <Label htmlFor="search" srOnly>
            Search
          </Label>
          <Input
            id="search"
            type="search"
            placeholder="Search..."
            className="pl-8"
          />
          <div className="absolute left-2.5 top-2.5 text-muted-foreground">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          The label is hidden visually but still accessible to screen readers
        </p>
      </div>

      <div>
        <h3 className="text-base font-medium mb-3">
          Associated Label with htmlFor
        </h3>
        <div className="space-y-2">
          <Label htmlFor="email-input" required>
            Email address
          </Label>
          <Input
            id="email-input"
            type="email"
            placeholder="example@email.com"
          />
          <p className="text-xs text-muted-foreground">
            The label is correctly associated with the input using htmlFor/id
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-base font-medium mb-3">
          Checkbox with Wrapper Label
        </h3>
        <label className="flex items-center space-x-2 cursor-pointer">
          <Checkbox />
          <span className="text-sm">Accept terms and conditions</span>
        </label>
        <p className="text-xs text-muted-foreground mt-2">
          Using a label wrapper makes the entire area clickable
        </p>
      </div>
    </div>
  ),
};
