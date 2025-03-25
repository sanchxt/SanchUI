import { useState } from 'react';
import { Progress, ProgressProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import { Download, RefreshCw, UploadCloud } from 'lucide-react';

const meta: Meta<ProgressProps> = {
  title: 'Components/Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0-100)',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Shows indeterminate loading animation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the progress bar',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'destructive', 'secondary'],
      description: 'Color variant of the progress bar',
    },
    showValue: {
      control: 'boolean',
      description: 'Displays the current progress value',
    },
    valueFormat: {
      control: 'select',
      options: ['percentage', 'ratio'],
      description: 'Format for the progress value',
    },
    label: {
      control: 'text',
      description: 'Label text above the progress bar',
    },
    valuePosition: {
      control: 'radio',
      options: ['inside', 'outside'],
      description: 'Position of the value text',
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the progress indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base Progress
export const Default: Story = {
  args: {
    value: 40,
    size: 'md',
    color: 'primary',
  },
};

// Sizes
export const Sizes: Story = {
  args: {
    value: 1,
  },

  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Small</p>
        <Progress size="sm" value={60} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Medium (Default)</p>
        <Progress size="md" value={60} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Large</p>
        <Progress size="lg" value={60} />
      </div>
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Default</p>
        <Progress color="default" value={60} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Primary</p>
        <Progress color="primary" value={60} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Success</p>
        <Progress color="success" value={60} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Destructive</p>
        <Progress color="destructive" value={60} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Secondary</p>
        <Progress color="secondary" value={60} />
      </div>
    </div>
  ),
};

// With Label and Value
export const WithLabelAndValue: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">With Label</p>
        <Progress label="Download Progress" value={45} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">With Value (Outside)</p>
        <Progress value={65} showValue />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">With Value (Inside)</p>
        <Progress value={85} showValue valuePosition="inside" size="lg" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">With Label and Value</p>
        <Progress label="Upload Progress" value={60} showValue />
      </div>
    </div>
  ),
};

// Value Formats
export const ValueFormats: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Percentage (Default)</p>
        <Progress value={42} showValue valueFormat="percentage" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Ratio</p>
        <Progress value={67} max={100} showValue valueFormat="ratio" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Custom Format</p>
        <Progress
          value={75}
          max={100}
          showValue
          valueFormat={(value, max) => `${value}MB of ${max}MB`}
        />
      </div>
    </div>
  ),
};

// Indeterminate
export const Indeterminate: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Default Indeterminate</p>
        <Progress indeterminate />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">With Label</p>
        <Progress indeterminate label="Loading..." />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Different Colors</p>
        <Progress indeterminate color="primary" />
        <div className="h-2"></div>
        <Progress indeterminate color="success" />
        <div className="h-2"></div>
        <Progress indeterminate color="destructive" />
      </div>
    </div>
  ),
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-80">
      <div className="space-y-2">
        <p className="text-sm font-medium">Custom Track Color</p>
        <Progress
          value={60}
          trackClassName="bg-primary/10"
          indicatorClassName="bg-primary"
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Custom Border Radius</p>
        <Progress
          value={60}
          trackClassName="rounded-none"
          indicatorClassName="rounded-none"
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Gradient Indicator</p>
        <Progress
          value={60}
          indicatorClassName="bg-gradient-to-r from-blue-400 to-purple-500"
        />
      </div>
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const startProgress = () => {
      setIsLoading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          return newProgress;
        });
      }, 300);
    };

    return (
      <div className="w-80 space-y-4 p-6 bg-background border border-border rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Upload File</h3>
          </div>
          {progress === 100 && !isLoading && (
            <button
              onClick={startProgress}
              className="p-1 text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </div>

        <Progress
          value={progress}
          color="primary"
          indeterminate={isLoading && progress === 0}
          showValue={progress > 0}
          valueFormat={(value) => `${Math.round(value)}%`}
        />

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {progress === 100
              ? 'Upload complete!'
              : isLoading
                ? 'Uploading...'
                : 'Ready to upload'}
          </span>
          <button
            onClick={startProgress}
            disabled={isLoading}
            className="flex items-center gap-1 text-xs rounded-md bg-primary px-2 py-1 text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-3 w-3" />
            {progress === 100 ? 'Upload Again' : 'Upload'}
          </button>
        </div>
      </div>
    );
  },
};

// dark theme
export const DarkTheme: Story = {
  render: () => (
    <div className="dark bg-background p-6 rounded-md space-y-6 w-80">
      <h3 className="text-lg font-semibold text-foreground">Dark Theme</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Basic</p>
          <Progress value={60} color="primary" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">With Label and Value</p>
          <Progress label="Download Progress" value={45} showValue />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Indeterminate</p>
          <Progress indeterminate color="primary" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Color Variants</p>
          <Progress value={70} color="success" />
          <div className="h-2"></div>
          <Progress value={50} color="destructive" />
          <div className="h-2"></div>
          <Progress value={85} color="secondary" />
        </div>
      </div>
    </div>
  ),
};
