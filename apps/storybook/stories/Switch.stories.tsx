import { useState } from 'react';
import { Switch, SwitchProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Check,
  X,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Bell,
  BellOff,
  Eye,
  EyeOff,
  Zap,
  Volume2,
  VolumeX,
  Bluetooth,
  BluetoothOff,
} from 'lucide-react';

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
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">Small</p>
        <Switch size="sm" label="Small switch" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Medium (Default)</p>
        <Switch size="md" label="Medium switch" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Large</p>
        <Switch size="lg" label="Large switch" />
      </div>
    </div>
  ),
};

// variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">Primary (Default)</p>
        <Switch variant="primary" label="Primary variant" defaultChecked />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Success</p>
        <Switch variant="success" label="Success variant" defaultChecked />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Destructive</p>
        <Switch
          variant="destructive"
          label="Destructive variant"
          defaultChecked
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Default</p>
        <Switch variant="default" label="Default variant" defaultChecked />
      </div>
    </div>
  ),
};

// states
export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">Unchecked</p>
        <Switch label="Unchecked switch" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Checked</p>
        <Switch label="Checked switch" defaultChecked />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Disabled Unchecked</p>
        <Switch label="Disabled switch" disabled />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Disabled Checked</p>
        <Switch label="Disabled checked switch" disabled defaultChecked />
      </div>
    </div>
  ),
};

// label positions
export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">Label on Right (Default)</p>
        <Switch label="Label on right" labelPosition="right" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Label on Left</p>
        <Switch label="Label on left" labelPosition="left" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">No Label</p>
        <Switch />
      </div>
    </div>
  ),
};

// controlled example
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <Switch
          checked={checked}
          onChange={() => setChecked(!checked)}
          label={`Switch is ${checked ? 'ON' : 'OFF'}`}
          variant={checked ? 'success' : 'default'}
        />

        <button
          onClick={() => setChecked(!checked)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
        >
          Toggle from outside
        </button>
      </div>
    );
  },
};

// features toggle
export const FeatureTogglesExample: Story = {
  render: () => {
    const [features, setFeatures] = useState({
      darkMode: false,
      notifications: true,
      analytics: true,
      autoUpdate: false,
    });

    const toggleFeature = (feature: keyof typeof features) => {
      setFeatures({
        ...features,
        [feature]: !features[feature],
      });
    };

    return (
      <div className="w-72 space-y-4 p-6 border border-input rounded-md bg-background">
        <h3 className="text-lg font-medium">App Settings</h3>

        <div className="space-y-4">
          <Switch
            checked={features.darkMode}
            onChange={() => toggleFeature('darkMode')}
            label={
              <div className="flex items-center gap-2">
                {features.darkMode ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span>Dark Mode</span>
              </div>
            }
            variant="default"
          />

          <Switch
            checked={features.notifications}
            onChange={() => toggleFeature('notifications')}
            label={
              <div className="flex items-center gap-2">
                {features.notifications ? (
                  <Bell className="h-4 w-4" />
                ) : (
                  <BellOff className="h-4 w-4" />
                )}
                <span>Notifications</span>
              </div>
            }
            variant="primary"
          />

          <Switch
            checked={features.analytics}
            onChange={() => toggleFeature('analytics')}
            label={
              <div className="flex items-center gap-2">
                {features.analytics ? (
                  <Zap className="h-4 w-4" />
                ) : (
                  <Zap className="h-4 w-4 opacity-50" />
                )}
                <span>Analytics</span>
              </div>
            }
            variant="success"
          />

          <Switch
            checked={features.autoUpdate}
            onChange={() => toggleFeature('autoUpdate')}
            label="Auto Updates"
            variant="primary"
          />
        </div>

        <div className="pt-2 mt-4 border-t border-input">
          <p className="text-sm text-muted-foreground">
            {features.darkMode ? 'Dark mode enabled' : 'Light mode active'}.
            Notifications are {features.notifications ? 'enabled' : 'disabled'}.
            Analytics {features.analytics ? 'allowed' : 'blocked'}. Auto updates{' '}
            {features.autoUpdate ? 'on' : 'off'}.
          </p>
        </div>
      </div>
    );
  },
};

// form validation example
export const FormValidationExample: Story = {
  render: () => {
    const [formState, setFormState] = useState({
      termsAccepted: false,
      marketingEmails: false,
      dataSharing: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (field: keyof typeof formState) => {
      setFormState({
        ...formState,
        [field]: !formState[field],
      });
      if (error && field === 'termsAccepted' && !formState.termsAccepted) {
        setError(false);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);

      if (!formState.termsAccepted) {
        setError(true);
        return;
      }

      // Show success message or continue with form submission
      alert('Form submitted successfully!');
    };

    return (
      <form
        className="w-80 space-y-5 p-6 border border-input rounded-md"
        onSubmit={handleSubmit}
      >
        <h3 className="text-lg font-medium">Sign Up Preferences</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Switch
              checked={formState.termsAccepted}
              onChange={() => handleChange('termsAccepted')}
              label="I accept the terms and conditions"
              variant={error ? 'destructive' : 'primary'}
            />
            {error && (
              <p className="text-xs text-destructive">
                You must agree to the terms to continue
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Switch
              checked={formState.marketingEmails}
              onChange={() => handleChange('marketingEmails')}
              label="Send me marketing emails"
              variant="default"
            />
            <p className="text-xs text-muted-foreground ml-7">
              We'll send you updates about new features
            </p>
          </div>

          <Switch
            checked={formState.dataSharing}
            onChange={() => handleChange('dataSharing')}
            label="Allow anonymous data sharing"
            variant="default"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Complete Registration
        </button>
      </form>
    );
  },
};

// device status example
export const DeviceStatusExample: Story = {
  render: () => {
    const [devices, setDevices] = useState({
      wifi: true,
      bluetooth: false,
      location: true,
      nfc: false,
    });

    const toggleDevice = (device: keyof typeof devices) => {
      setDevices({
        ...devices,
        [device]: !devices[device],
      });
    };

    return (
      <div className="w-72 p-6 border border-input rounded-md bg-background space-y-6">
        <h3 className="text-lg font-medium">Device Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {devices.wifi ? (
                <Wifi className="h-5 w-5 text-primary" />
              ) : (
                <WifiOff className="h-5 w-5 text-muted-foreground" />
              )}
              <span>Wi-Fi</span>
            </div>
            <Switch
              checked={devices.wifi}
              onChange={() => toggleDevice('wifi')}
              variant="primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {devices.bluetooth ? (
                <Bluetooth className="h-5 w-5 text-primary" />
              ) : (
                <BluetoothOff className="h-5 w-5 text-muted-foreground" />
              )}
              <span>Bluetooth</span>
            </div>
            <Switch
              checked={devices.bluetooth}
              onChange={() => toggleDevice('bluetooth')}
              variant="primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {devices.location ? (
                <Eye className="h-5 w-5 text-primary" />
              ) : (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              )}
              <span>Location</span>
            </div>
            <Switch
              checked={devices.location}
              onChange={() => toggleDevice('location')}
              variant="primary"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {devices.nfc ? (
                <Volume2 className="h-5 w-5 text-primary" />
              ) : (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
              )}
              <span>NFC</span>
            </div>
            <Switch
              checked={devices.nfc}
              onChange={() => toggleDevice('nfc')}
              variant="primary"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-input">
          <div className="flex items-center justify-between">
            <p className="text-sm">Active connections:</p>
            <span className="text-sm font-medium">
              {Object.values(devices).filter(Boolean).length}
            </span>
          </div>
        </div>
      </div>
    );
  },
};

// animation showcase
export const InteractiveExample: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [variant, setVariant] = useState<
      'default' | 'primary' | 'success' | 'destructive'
    >('primary');
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div className={`${theme === 'dark' ? 'dark' : ''}`}>
        <div className="bg-background p-6 rounded-lg border border-input min-w-96 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">
              Switch Playground
            </h3>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm transition-colors"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Variant:</p>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setVariant('default')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    variant === 'default'
                      ? 'bg-foreground text-background'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Default
                </button>
                <button
                  onClick={() => setVariant('primary')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    variant === 'primary'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Primary
                </button>
                <button
                  onClick={() => setVariant('success')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    variant === 'success'
                      ? 'bg-success text-success-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Success
                </button>
                <button
                  onClick={() => setVariant('destructive')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    variant === 'destructive'
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Destructive
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Size:</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSize('sm')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    size === 'sm'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Small
                </button>
                <button
                  onClick={() => setSize('md')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    size === 'md'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setSize('lg')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    size === 'lg'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Large
                </button>
              </div>
            </div>
          </div>

          <div className="py-4 flex flex-col items-center justify-center gap-6 border-y border-input">
            <Switch
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              label={`Switch is ${isChecked ? 'ON' : 'OFF'}`}
              variant={variant}
              size={size}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setIsChecked(true)}
                className="px-3 py-1 rounded-md bg-success text-success-foreground text-sm"
              >
                Turn ON
              </button>
              <button
                onClick={() => setIsChecked(false)}
                className="px-3 py-1 rounded-md bg-destructive text-destructive-foreground text-sm"
              >
                Turn OFF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Normal:</p>
              <Switch variant={variant} size={size} label="Enabled" />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Checked:</p>
              <Switch
                variant={variant}
                size={size}
                defaultChecked
                label="Enabled"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Disabled:</p>
              <Switch variant={variant} size={size} disabled label="Disabled" />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Disabled Checked:</p>
              <Switch
                variant={variant}
                size={size}
                disabled
                defaultChecked
                label="Disabled"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// custom indicators example
export const CustomIndicatorsExample: Story = {
  render: () => {
    const [states, setStates] = useState({
      published: true,
      maintenance: false,
      premium: false,
    });

    const toggleState = (key: keyof typeof states) => {
      setStates({
        ...states,
        [key]: !states[key],
      });
    };

    return (
      <div className="w-72 p-6 border border-input rounded-md bg-background space-y-5">
        <h3 className="text-lg font-medium">Status Controls</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="published-switch"
              className="flex items-center gap-2"
            >
              {states.published ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <X className="h-4 w-4 text-destructive" />
              )}
              <span>Published</span>
            </label>
            <Switch
              id="published-switch"
              checked={states.published}
              onChange={() => toggleState('published')}
              variant={states.published ? 'success' : 'destructive'}
            />
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="maintenance-switch"
              className="flex items-center gap-2"
            >
              {states.maintenance ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <X className="h-4 w-4 text-destructive" />
              )}
              <span>Maintenance Mode</span>
            </label>
            <Switch
              id="maintenance-switch"
              checked={states.maintenance}
              onChange={() => toggleState('maintenance')}
              variant={states.maintenance ? 'success' : 'destructive'}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="premium-switch" className="flex items-center gap-2">
              {states.premium ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <X className="h-4 w-4 text-destructive" />
              )}
              <span>Premium Features</span>
            </label>
            <Switch
              id="premium-switch"
              checked={states.premium}
              onChange={() => toggleState('premium')}
              variant={states.premium ? 'success' : 'destructive'}
            />
          </div>
        </div>

        <div className="pt-3 border-t border-input text-sm">
          <p className={states.published ? 'text-success' : 'text-destructive'}>
            Site is {states.published ? 'online' : 'offline'}
          </p>
          {states.maintenance && (
            <p className="text-warning mt-1">Maintenance mode active</p>
          )}
          {states.premium && (
            <p className="text-primary mt-1">Premium features enabled</p>
          )}
        </div>
      </div>
    );
  },
};
