import { Spinner, SpinnerProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<SpinnerProps> = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['border', 'dots', 'grow'],
      description: 'The visual style of the spinner',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the spinner',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'destructive',
        'success',
        'muted',
      ],
      description: 'The color of the spinner',
    },
    inline: {
      control: 'boolean',
      description: 'Whether to render the spinner inline (no margins)',
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base example
export const Default: Story = {
  args: {
    variant: 'border',
    size: 'md',
    color: 'primary',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Border (Default)</p>
        <Spinner variant="border" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Dots</p>
        <Spinner variant="dots" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Grow</p>
        <Spinner variant="grow" />
      </div>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Extra Small</p>
        <Spinner size="xs" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Small</p>
        <Spinner size="sm" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Medium (Default)</p>
        <Spinner size="md" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Large</p>
        <Spinner size="lg" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Extra Large</p>
        <Spinner size="xl" />
      </div>
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Primary (Default)</p>
        <Spinner color="primary" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Secondary</p>
        <Spinner color="secondary" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Accent</p>
        <Spinner color="accent" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Destructive</p>
        <Spinner color="destructive" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Success</p>
        <Spinner color="success" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Muted</p>
        <Spinner color="muted" />
      </div>
    </div>
  ),
};

// Showcase all variants & sizes
export const VariantSizeMatrix: Story = {
  render: () => (
    <div className="overflow-x-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b-2"></th>
            <th className="p-2 border-b-2 text-sm font-medium">XS</th>
            <th className="p-2 border-b-2 text-sm font-medium">SM</th>
            <th className="p-2 border-b-2 text-sm font-medium">MD</th>
            <th className="p-2 border-b-2 text-sm font-medium">LG</th>
            <th className="p-2 border-b-2 text-sm font-medium">XL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border-r border-b text-sm font-medium">
              Border
            </td>
            <td className="p-4 border-b text-center">
              <Spinner variant="border" size="xs" />
            </td>
            <td className="p-4 border-b text-center">
              <Spinner variant="border" size="sm" />
            </td>
            <td className="p-4 border-b text-center">
              <Spinner variant="border" size="md" />
            </td>
            <td className="p-4 border-b text-center">
              <Spinner variant="border" size="lg" />
            </td>
            <td className="p-4 border-b text-center">
              <Spinner variant="border" size="xl" />
            </td>
          </tr>
          <tr>
            <td className="p-2 border-r border-b text-sm font-medium">Dots</td>
            <td className="p-4 border-b text-center">
              <Spinner variant="dots" size="xs" />
            </td>
            <td className="p-4 border-b text-center">
              <Spinner variant="dots" size="sm" />
            </td>
            <td className="p-4 border-b text-center">
              <Spinner variant="dots" size="md" />
            </td>
            <td className="p-4 border-b text-center">
              <Spinner variant="dots" size="lg" />
            </td>
            <td className="p-4 border-b text-center">
              <Spinner variant="dots" size="xl" />
            </td>
          </tr>
          <tr>
            <td className="p-2 border-r text-sm font-medium">Grow</td>
            <td className="p-4 text-center">
              <Spinner variant="grow" size="xs" />
            </td>
            <td className="p-4 text-center">
              <Spinner variant="grow" size="sm" />
            </td>
            <td className="p-4 text-center">
              <Spinner variant="grow" size="md" />
            </td>
            <td className="p-4 text-center">
              <Spinner variant="grow" size="lg" />
            </td>
            <td className="p-4 text-center">
              <Spinner variant="grow" size="xl" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

// Dark Theme
export const DarkTheme: Story = {
  render: () => (
    <div
      className="dark bg-background p-6 rounded-md"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <h3 className="text-lg font-semibold text-foreground">Dark Theme</h3>

      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium">Border</p>
          <Spinner variant="border" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium">Dots</p>
          <Spinner variant="dots" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium">Grow</p>
          <Spinner variant="grow" />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium">Primary</p>
          <Spinner color="primary" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium">Secondary</p>
          <Spinner color="secondary" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium">Destructive</p>
          <Spinner color="destructive" />
        </div>
      </div>
    </div>
  ),
};

// Usage examples
export const InlineUsage: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Default (with margins)</p>
        <div className="flex items-center gap-2 p-2 border border-border rounded">
          <Spinner size="sm" />
          <span>Loading content...</span>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Inline (no margins)</p>
        <div className="flex items-center gap-2 p-2 border border-border rounded">
          <Spinner size="sm" inline />
          <span>Loading content...</span>
        </div>
      </div>
    </div>
  ),
};

// Button with spinner example
export const ButtonLoading: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <p className="text-sm font-medium">Button with Loading State</p>

        <div className="flex gap-4">
          <button
            className="flex items-center justify-center h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground"
            disabled
          >
            <Spinner size="sm" color="primary" inline className="mr-2" />
            Loading...
          </button>

          <button
            className="flex items-center justify-center h-10 px-4 py-2 rounded-md border border-border"
            disabled
          >
            <Spinner size="sm" inline className="mr-2" />
            Processing
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium">Full-width Button with Spinner</p>
        <button
          className="w-full flex items-center justify-center h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground"
          disabled
        >
          <Spinner size="sm" color="primary" inline className="mr-2" />
          Submitting Form
        </button>
      </div>
    </div>
  ),
};

// Card loading state example
export const CardLoading: Story = {
  render: () => (
    <div className="w-72 p-6 border border-border rounded-lg shadow-sm flex flex-col items-center justify-center h-36">
      <Spinner />
      <p className="mt-2 text-sm text-muted-foreground">Loading content...</p>
    </div>
  ),
};

// Page loading example
export const PageLoading: Story = {
  render: () => (
    <div className="w-96 h-64 flex flex-col items-center justify-center">
      <Spinner size="xl" />
      <p className="mt-4 text-lg font-medium">Loading Application</p>
      <p className="text-sm text-muted-foreground">
        Please wait while we prepare your dashboard
      </p>
    </div>
  ),
};
