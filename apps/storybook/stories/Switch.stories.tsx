import { useState } from 'react';
import { Switch, SwitchProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import { Sun, Moon, Check, X } from 'lucide-react';

const meta: Meta<SwitchProps> = {
  title: 'Components/Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Changes the size of the switch',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'destructive'],
      description: 'Changes the color variant of the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch',
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state (controlled component)',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Sets the initial checked state (uncontrolled component)',
    },
    label: {
      control: 'text',
      description: 'Label text for the switch',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    label: 'Toggle me',
  },
};

// sizes
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small switch',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium switch',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large switch',
  },
};

// variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary',
    defaultChecked: true,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Success',
    defaultChecked: true,
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Destructive',
    defaultChecked: true,
  },
};

export const DefaultVariant: Story = {
  args: {
    variant: 'default',
    label: 'Default',
    defaultChecked: true,
  },
};

// states
export const Checked: Story = {
  args: {
    label: 'Checked switch',
    defaultChecked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Unchecked switch',
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked switch',
    disabled: true,
    defaultChecked: true,
  },
};

// label positions
export const LabelLeft: Story = {
  args: {
    label: 'Label on the left',
    labelPosition: 'left',
  },
};

export const LabelRight: Story = {
  args: {
    label: 'Label on the right',
    labelPosition: 'right',
  },
};

export const NoLabel: Story = {
  args: {},
};

// interactive
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <Switch
          checked={checked}
          onChange={() => setChecked(!checked)}
          label={`Switch is ${checked ? 'on' : 'off'}`}
        />
        <button
          onClick={() => setChecked(!checked)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Toggle from outside
        </button>
      </div>
    );
  },
};

export const DarkModeToggle: Story = {
  render: () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
      <div
        className={`p-6 rounded-md ${isDarkMode ? 'dark bg-background' : 'bg-background'}`}
      >
        <Switch
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
          label={
            <div className="flex items-center gap-2">
              {isDarkMode ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
          }
          variant={isDarkMode ? 'default' : 'primary'}
        />
      </div>
    );
  },
};

export const WithDarkTheme: Story = {
  render: (args) => (
    <div className="dark p-6 rounded-md bg-background">
      <Switch {...args} label="Dark themed switch" />
    </div>
  ),
};

export const FeatureToggleExample: Story = {
  render: () => {
    const [features, setFeatures] = useState({
      darkMode: false,
      notifications: true,
      analytics: true,
    });

    const toggleFeature = (feature: keyof typeof features) => {
      setFeatures({
        ...features,
        [feature]: !features[feature],
      });
    };

    return (
      <div className="w-72 space-y-4 p-4 border border-input rounded-md">
        <h3 className="text-lg font-medium">App Settings</h3>
        <div className="space-y-3">
          <Switch
            checked={features.darkMode}
            onChange={() => toggleFeature('darkMode')}
            label="Dark Mode"
            variant="default"
          />
          <Switch
            checked={features.notifications}
            onChange={() => toggleFeature('notifications')}
            label="Enable Notifications"
            variant="primary"
          />
          <Switch
            checked={features.analytics}
            onChange={() => toggleFeature('analytics')}
            label="Allow Analytics"
            variant="success"
          />
        </div>
      </div>
    );
  },
};

export const FormValidationExample: Story = {
  render: () => {
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <form className="w-80 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Switch
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            label="I agree to the terms and conditions"
            variant={submitted && !agreed ? 'destructive' : 'primary'}
          />
          {submitted && !agreed && (
            <p className="text-xs text-destructive">
              You must agree to the terms to continue
            </p>
          )}
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

export const CustomIconSwitch: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex items-center gap-4">
        <Switch
          checked={checked}
          onChange={() => setChecked(!checked)}
          variant={checked ? 'success' : 'destructive'}
          label={
            <div className="flex items-center gap-2">
              {checked ? (
                <>
                  <Check className="h-4 w-4 text-success" />
                  <span>Enabled</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-destructive" />
                  <span>Disabled</span>
                </>
              )}
            </div>
          }
        />
      </div>
    );
  },
};
