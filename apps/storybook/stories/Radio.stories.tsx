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
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p className="text-sm font-medium mb-2">Small</p>
        <Radio size="sm" label="Small radio" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Medium (Default)</p>
        <Radio size="md" label="Medium radio" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Large</p>
        <Radio size="lg" label="Large radio" />
      </div>
    </div>
  ),
};

// states
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p className="text-sm font-medium mb-2">Unchecked</p>
        <Radio label="Unchecked radio" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Checked</p>
        <Radio label="Checked radio" checked readOnly />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Invalid</p>
        <Radio label="Invalid radio" isInvalid />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Disabled</p>
        <Radio label="Disabled radio" disabled />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Disabled & Checked</p>
        <Radio label="Disabled and checked radio" disabled checked readOnly />
      </div>
    </div>
  ),
};

// label
export const LabelPlacement: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p className="text-sm font-medium mb-2">Label at end (Default)</p>
        <Radio label="Label at end" labelPlacement="end" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Label at start</p>
        <Radio label="Label at start" labelPlacement="start" />
      </div>
    </div>
  ),
};

// No label
export const NoLabel: Story = {
  args: {},
};

// radio group
export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <div className="space-y-4">
        <p className="text-sm font-medium mb-2">
          Select your preferred contact method:
        </p>
        <div
          role="radiogroup"
          aria-label="Contact Method"
          className="space-y-2"
        >
          <Radio
            name="contact"
            value="option1"
            label="Email"
            checked={selected === 'option1'}
            onChange={() => setSelected('option1')}
          />
          <Radio
            name="contact"
            value="option2"
            label="Phone"
            checked={selected === 'option2'}
            onChange={() => setSelected('option2')}
          />
          <Radio
            name="contact"
            value="option3"
            label="SMS"
            checked={selected === 'option3'}
            onChange={() => setSelected('option3')}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Selected option:{' '}
          {selected === 'option1'
            ? 'Email'
            : selected === 'option2'
              ? 'Phone'
              : 'SMS'}
        </p>
      </div>
    );
  },
};

// dark theme
export const DarkTheme: Story = {
  render: () => (
    <div
      className="dark bg-background p-6 rounded-md"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <h3 className="text-lg font-semibold text-foreground">Dark Theme</h3>

      <div className="space-y-3">
        <Radio label="Unchecked option" />
        <Radio label="Checked option" checked readOnly />
        <Radio label="Invalid option" isInvalid />
        <Radio label="Disabled option" disabled />
      </div>
    </div>
  ),
};

// form example
export const FormExample: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState('standard');

    return (
      <form
        className="w-80 space-y-4 p-6 bg-background border border-border rounded-lg shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <h3 className="text-lg font-semibold mb-4">Shipping Options</h3>

        <div className="space-y-2">
          <p className="text-sm font-medium">Select shipping method:</p>
          <div
            role="radiogroup"
            aria-label="Shipping Method"
            className="space-y-3 mt-2"
          >
            <Radio
              name="shipping"
              value="standard"
              label={
                <div className="flex flex-col">
                  <span className="font-medium">Standard Shipping</span>
                  <span className="text-xs text-muted-foreground">
                    3-5 business days
                  </span>
                </div>
              }
              checked={selectedOption === 'standard'}
              onChange={() => setSelectedOption('standard')}
            />
            <Radio
              name="shipping"
              value="express"
              label={
                <div className="flex flex-col">
                  <span className="font-medium">Express Shipping</span>
                  <span className="text-xs text-muted-foreground">
                    1-2 business days
                  </span>
                </div>
              }
              checked={selectedOption === 'express'}
              onChange={() => setSelectedOption('express')}
            />
            <Radio
              name="shipping"
              value="overnight"
              label={
                <div className="flex flex-col">
                  <span className="font-medium">Overnight Shipping</span>
                  <span className="text-xs text-muted-foreground">
                    Next business day
                  </span>
                </div>
              }
              checked={selectedOption === 'overnight'}
              onChange={() => setSelectedOption('overnight')}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Continue
        </button>
      </form>
    );
  },
};

// interactive example
export const InteractiveExample: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [selected, setSelected] = useState('option1');

    return (
      <div className="bg-background p-2 rounded-md border border-border min-w-80">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">
              Radio Component
            </h3>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Size:</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setSize('sm')}
                className={`px-2 py-1 rounded-md text-xs ${
                  size === 'sm'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                Small
              </button>
              <button
                onClick={() => setSize('md')}
                className={`px-2 py-1 rounded-md text-xs ${
                  size === 'md'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setSize('lg')}
                className={`px-2 py-1 rounded-md text-xs ${
                  size === 'lg'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                Large
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium text-foreground">Options:</p>
            <div role="radiogroup" aria-label="Options" className="space-y-3">
              <Radio
                name="options"
                value="option1"
                label="Option 1"
                size={size}
                checked={selected === 'option1'}
                onChange={() => setSelected('option1')}
              />
              <Radio
                name="options"
                value="option2"
                label="Option 2"
                size={size}
                checked={selected === 'option2'}
                onChange={() => setSelected('option2')}
              />
              <Radio
                name="options"
                value="option3"
                label="Option 3"
                size={size}
                checked={selected === 'option3'}
                onChange={() => setSelected('option3')}
              />
              <Radio
                name="options"
                value="option4"
                label="Disabled option"
                size={size}
                disabled
              />
              <Radio
                name="options"
                value="option5"
                label="Invalid option"
                size={size}
                isInvalid
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
