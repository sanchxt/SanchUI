import { useState } from 'react';
import { Radio, RadioProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<RadioProps> = {
  title: 'Components/Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Changes the size of the radio button',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Displays the radio button in an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio button',
    },
    checked: {
      control: 'boolean',
      description: 'Displays the radio button in a checked state',
    },
    label: {
      control: 'text',
      description: 'The label for the radio button',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Where to render the label',
    },
    name: {
      control: 'text',
      description: 'Name attribute for the radio button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    label: 'Radio option',
    size: 'md',
  },
};

// sizes
export const Small: Story = {
  args: {
    label: 'Small radio',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium radio',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large radio',
    size: 'lg',
  },
};

// states
export const Checked: Story = {
  args: {
    label: 'Checked radio',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled radio',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked radio',
    disabled: true,
    defaultChecked: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Invalid radio',
    isInvalid: true,
  },
};

// label
export const LabelStart: Story = {
  args: {
    label: 'Label at start',
    labelPlacement: 'start',
  },
};

export const LabelEnd: Story = {
  args: {
    label: 'Label at end',
    labelPlacement: 'end',
  },
};

// No label
export const NoLabel: Story = {
  args: {},
};

// radio group
export const RadioGroup: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return (
      <div className="space-y-2">
        <h3 className="text-lg font-medium mb-2">Select an option:</h3>
        <div className="space-y-2">
          <Radio
            name="group-example"
            value="option1"
            checked={value === 'option1'}
            onChange={handleChange}
            label="Option 1"
          />
          <Radio
            name="group-example"
            value="option2"
            checked={value === 'option2'}
            onChange={handleChange}
            label="Option 2"
          />
          <Radio
            name="group-example"
            value="option3"
            checked={value === 'option3'}
            onChange={handleChange}
            label="Option 3"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Selected: {value}</p>
      </div>
    );
  },
};

// dark theme
export const WithDarkTheme: Story = {
  render: (args) => (
    <div className="dark p-6 rounded-md bg-background">
      <Radio {...args} label="Dark theme radio" />
    </div>
  ),
};

// form example
export const FormExample: Story = {
  render: () => {
    const [selectedDelivery, setSelectedDelivery] = useState('standard');

    return (
      <form className="w-80 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Delivery options:</h3>

          <div className="space-y-2 border p-3 rounded-md">
            <Radio
              name="delivery"
              value="standard"
              checked={selectedDelivery === 'standard'}
              onChange={(e) => setSelectedDelivery(e.target.value)}
              label="Standard delivery (3-5 days)"
            />
            <div className="text-xs text-muted-foreground ml-7">Free</div>
          </div>

          <div className="space-y-2 border p-3 rounded-md">
            <Radio
              name="delivery"
              value="express"
              checked={selectedDelivery === 'express'}
              onChange={(e) => setSelectedDelivery(e.target.value)}
              label="Express delivery (1-2 days)"
            />
            <div className="text-xs text-muted-foreground ml-7">+$9.99</div>
          </div>

          <div className="space-y-2 border p-3 rounded-md">
            <Radio
              name="delivery"
              value="nextDay"
              checked={selectedDelivery === 'nextDay'}
              onChange={(e) => setSelectedDelivery(e.target.value)}
              label="Next day delivery"
            />
            <div className="text-xs text-muted-foreground ml-7">+$14.99</div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Continue to payment
        </button>
      </form>
    );
  },
};

// custom radio card
export const RadioCards: Story = {
  render: () => {
    const [selectedPlan, setSelectedPlan] = useState('basic');

    return (
      <div className="space-y-4 w-80">
        <h3 className="text-lg font-medium">Select a plan:</h3>

        <div className="space-y-3">
          {[
            {
              id: 'basic',
              name: 'Basic',
              price: '$9',
              features: '5 projects, 2GB storage',
            },
            {
              id: 'pro',
              name: 'Pro',
              price: '$19',
              features: '15 projects, 10GB storage',
            },
            {
              id: 'enterprise',
              name: 'Enterprise',
              price: '$49',
              features: 'Unlimited projects, 100GB storage',
            },
          ].map((plan) => (
            <label
              key={plan.id}
              className={`block border rounded-md p-4 cursor-pointer transition-colors ${
                selectedPlan === plan.id
                  ? 'border-primary bg-primary/5'
                  : 'border-input hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <Radio
                  name="plan"
                  value={plan.id}
                  checked={selectedPlan === plan.id}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-medium">{plan.name}</h4>
                    <div className="font-medium">{plan.price}/mo</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {plan.features}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  },
};
