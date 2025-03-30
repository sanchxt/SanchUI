import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider, RangeSliderProps } from '@sanch-ui/core';

const meta: Meta<RangeSliderProps> = {
  title: 'Components/Forms/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum value of the slider',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      description: 'Maximum value of the slider',
      defaultValue: 100,
    },
    step: {
      control: 'number',
      description: 'Step increment between values',
      defaultValue: 1,
    },
    value: {
      control: 'object',
      description: 'Current value(s) of the slider (controlled mode)',
    },
    defaultValue: {
      control: 'object',
      description: 'Default value(s) of the slider (uncontrolled mode)',
    },
    label: {
      control: 'text',
      description: 'Label for the slider',
    },
    showTooltip: {
      control: 'select',
      options: ['always', 'hover', 'never'],
      description: 'When to show tooltips',
      defaultValue: 'hover',
    },
    showMinMaxLabels: {
      control: 'boolean',
      description: 'Display min/max values',
      defaultValue: false,
    },
    showMarkers: {
      control: 'boolean',
      description: 'Show markers on the track',
      defaultValue: false,
    },
    markerCount: {
      control: 'number',
      description: 'Number of markers to display',
      defaultValue: 5,
    },
    showValueLabel: {
      control: 'boolean',
      description: 'Show the current value label',
      defaultValue: false,
    },
    formatValue: {
      description: 'Function to format the displayed values',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the slider',
      defaultValue: 'md',
    },
    width: {
      control: 'text',
      description: 'Width of the slider container',
      defaultValue: '100%',
    },
    color: {
      control: 'text',
      description: 'Color theme of the slider',
      defaultValue: 'primary',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
      defaultValue: false,
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the slider',
      defaultValue: 'horizontal',
    },
    height: {
      control: 'text',
      description: 'Height for vertical orientation',
      defaultValue: '200px',
    },
    marks: {
      control: 'object',
      description: 'Custom marks for the slider',
    },
    showTicks: {
      control: 'boolean',
      description: 'Show tick marks',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic slider
export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 40,
    width: '300px',
  },
};

// Range slider
export const Range: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: [20, 80],
    width: '300px',
    showValueLabel: true,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Small</p>
        <RangeSlider defaultValue={30} size="sm" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Medium (Default)</p>
        <RangeSlider defaultValue={50} size="md" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Large</p>
        <RangeSlider defaultValue={70} size="lg" />
      </div>
    </div>
  ),
};

// With tooltips
export const TooltipVariants: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Tooltip on hover (default)</p>
        <RangeSlider defaultValue={40} showTooltip="hover" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Tooltip always visible</p>
        <RangeSlider defaultValue={50} showTooltip="always" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">No tooltip</p>
        <RangeSlider defaultValue={60} showTooltip="never" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Range slider with tooltips</p>
        <RangeSlider defaultValue={[30, 70]} showTooltip="hover" />
      </div>
    </div>
  ),
};

// With labels
export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 w-80">
      <div className="space-y-2">
        <RangeSlider defaultValue={40} label="Volume" showValueLabel={true} />
      </div>
      <div className="space-y-2">
        <RangeSlider
          defaultValue={50}
          label="Progress"
          showMinMaxLabels={true}
        />
      </div>
      <div className="space-y-2">
        <RangeSlider
          defaultValue={[20, 80]}
          label="Price Range"
          showValueLabel={true}
          showMinMaxLabels={true}
        />
      </div>
    </div>
  ),
};

// With markers and ticks
export const MarkersAndTicks: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">With markers</p>
        <RangeSlider defaultValue={40} showMarkers={true} markerCount={5} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">With custom marks</p>
        <RangeSlider
          defaultValue={3}
          min={0}
          max={5}
          step={1}
          marks={[
            { value: 0, label: 'Poor' },
            { value: 1, label: 'Fair' },
            { value: 2, label: 'Good' },
            { value: 3, label: 'Very Good' },
            { value: 4, label: 'Excellent' },
            { value: 5, label: 'Outstanding' },
          ]}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">With ticks</p>
        <RangeSlider defaultValue={60} showTicks={true} />
      </div>
    </div>
  ),
};

// Vertical orientation
export const VerticalOrientation: Story = {
  render: () => (
    <div className="flex space-x-12 h-64">
      <div className="space-y-2">
        <p className="text-sm font-medium">Basic</p>
        <RangeSlider defaultValue={40} orientation="vertical" height="200px" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">With labels</p>
        <RangeSlider
          defaultValue={60}
          orientation="vertical"
          height="200px"
          showMinMaxLabels={true}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Range</p>
        <RangeSlider
          defaultValue={[20, 80]}
          orientation="vertical"
          height="200px"
          showTooltip="hover"
        />
      </div>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Normal</p>
        <RangeSlider defaultValue={40} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Disabled</p>
        <RangeSlider defaultValue={50} disabled />
      </div>
    </div>
  ),
};

// Controlled component
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(40);

    return (
      <div className="flex flex-col space-y-4 w-80">
        <RangeSlider
          value={value}
          onChange={(newValue) => setValue(newValue as number)}
          label="Controlled Slider"
          showValueLabel={true}
        />
        <div className="flex justify-between">
          <button
            className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded"
            onClick={() => setValue(Math.max(0, value - 10))}
          >
            Decrease
          </button>
          <button
            className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded"
            onClick={() => setValue(Math.min(100, value + 10))}
          >
            Increase
          </button>
        </div>
      </div>
    );
  },
};

// Format value
export const FormattedValues: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Currency formatter</p>
        <RangeSlider
          defaultValue={[500, 1500]}
          min={0}
          max={2000}
          step={50}
          label="Price Range"
          showValueLabel={true}
          formatValue={(value) => `$${value}`}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Percentage formatter</p>
        <RangeSlider
          defaultValue={40}
          label="Completion"
          showValueLabel={true}
          formatValue={(value) => `${value}%`}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Custom formatter</p>
        <RangeSlider
          defaultValue={5}
          min={0}
          max={10}
          step={0.5}
          label="Rating"
          showValueLabel={true}
          formatValue={(value) => `${value} ⭐`}
        />
      </div>
    </div>
  ),
};

// Color variations
export const ColorVariations: Story = {
  render: () => (
    <div className="flex flex-col space-y-8 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Primary (default)</p>
        <RangeSlider defaultValue={40} color="primary" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Destructive</p>
        <RangeSlider defaultValue={60} color="destructive" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Success</p>
        <RangeSlider defaultValue={80} color="success" />
      </div>
    </div>
  ),
};

// Complex example
export const PriceRangeFilter: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);

    const handleChange = (value: number | [number, number]) => {
      setPriceRange(value as [number, number]);
    };

    return (
      <div className="w-80 p-6 bg-background border border-border rounded-lg shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Filter by Price</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Adjust the range to find products within your budget
          </p>
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={50}
          value={priceRange}
          onChange={handleChange}
          showTooltip="hover"
          showMinMaxLabels={true}
          showValueLabel={true}
          formatValue={(value) => `$${value}`}
        />

        <div className="mt-6 flex justify-between">
          <button className="px-2 py-1 text-sm border border-border rounded">
            Reset
          </button>
          <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">
            Apply Filter
          </button>
        </div>
      </div>
    );
  },
};

// Dark theme
export const DarkTheme: Story = {
  render: () => (
    <div
      className="dark bg-background p-6 rounded-md flex flex-col space-y-8"
      style={{ width: '400px' }}
    >
      <h3 className="text-lg font-semibold text-foreground">
        Dark Theme Sliders
      </h3>

      <div className="space-y-4">
        <p className="text-sm font-medium">Basic Slider</p>
        <RangeSlider defaultValue={40} showValueLabel={true} />

        <p className="text-sm font-medium mt-4">Range Slider</p>
        <RangeSlider
          defaultValue={[20, 80]}
          showValueLabel={true}
          showMinMaxLabels={true}
        />

        <p className="text-sm font-medium mt-4">With Markers</p>
        <RangeSlider defaultValue={60} showMarkers={true} markerCount={5} />

        <p className="text-sm font-medium mt-4">Custom Marks</p>
        <RangeSlider
          min={1}
          max={5}
          step={1}
          defaultValue={3}
          marks={[
            { value: 1, label: 'Very Poor' },
            { value: 2, label: 'Poor' },
            { value: 3, label: 'Average' },
            { value: 4, label: 'Good' },
            { value: 5, label: 'Excellent' },
          ]}
        />
      </div>
    </div>
  ),
};
