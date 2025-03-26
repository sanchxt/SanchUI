import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeProps } from '@sanch-ui/core';

const meta: Meta<BadgeProps> = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
      ],
      description: 'Visual style variant of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    pill: {
      control: 'boolean',
      description: 'Whether to use rounded-full (pill) style',
    },
    outline: {
      control: 'boolean',
      description: 'Makes the badge use an outline style instead of filled',
    },
    withDot: {
      control: 'boolean',
      description: 'Show dot indicator before badge content',
    },
    dotColor: {
      control: 'color',
      description: 'Badge dot color (uses the variant color by default)',
    },
    children: {
      control: 'text',
      description: 'Content to display inside the badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default badge
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Small</p>
        <div className="flex flex-wrap gap-2">
          <Badge size="sm">Small Badge</Badge>
          <Badge size="sm" variant="primary">
            Small Badge
          </Badge>
          <Badge size="sm" variant="success">
            Small Badge
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Medium (Default)</p>
        <div className="flex flex-wrap gap-2">
          <Badge size="md">Medium Badge</Badge>
          <Badge size="md" variant="primary">
            Medium Badge
          </Badge>
          <Badge size="md" variant="success">
            Medium Badge
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Large</p>
        <div className="flex flex-wrap gap-2">
          <Badge size="lg">Large Badge</Badge>
          <Badge size="lg" variant="primary">
            Large Badge
          </Badge>
          <Badge size="lg" variant="success">
            Large Badge
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Pill vs Rounded
export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Rounded (Default)</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Rounded</Badge>
          <Badge variant="primary">Rounded</Badge>
          <Badge variant="success">Rounded</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Pill</p>
        <div className="flex flex-wrap gap-2">
          <Badge pill>Pill</Badge>
          <Badge pill variant="primary">
            Pill
          </Badge>
          <Badge pill variant="success">
            Pill
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Outline Style
export const OutlineStyle: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Filled (Default)</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Outline</p>
        <div className="flex flex-wrap gap-2">
          <Badge outline>Default</Badge>
          <Badge outline variant="primary">
            Primary
          </Badge>
          <Badge outline variant="secondary">
            Secondary
          </Badge>
          <Badge outline variant="success">
            Success
          </Badge>
          <Badge outline variant="warning">
            Warning
          </Badge>
          <Badge outline variant="error">
            Error
          </Badge>
          <Badge outline variant="info">
            Info
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// With Dot Indicator
export const WithDot: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">With Default Dot</p>
        <div className="flex flex-wrap gap-2">
          <Badge withDot>Default</Badge>
          <Badge withDot variant="primary">
            Primary
          </Badge>
          <Badge withDot variant="success">
            Success
          </Badge>
          <Badge withDot variant="warning">
            Warning
          </Badge>
          <Badge withDot variant="error">
            Error
          </Badge>
          <Badge withDot variant="info">
            Info
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">With Custom Dot Color</p>
        <div className="flex flex-wrap gap-2">
          <Badge withDot dotColor="bg-purple-500">
            Custom Purple
          </Badge>
          <Badge withDot dotColor="bg-pink-500">
            Custom Pink
          </Badge>
          <Badge withDot dotColor="bg-orange-500">
            Custom Orange
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">With Dot in Outline Style</p>
        <div className="flex flex-wrap gap-2">
          <Badge withDot outline variant="primary">
            Primary
          </Badge>
          <Badge withDot outline variant="success">
            Success
          </Badge>
          <Badge withDot outline variant="error">
            Error
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Common use cases
export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Status Indicators</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" withDot>
            Active
          </Badge>
          <Badge variant="warning" withDot>
            Pending
          </Badge>
          <Badge variant="error" withDot>
            Failed
          </Badge>
          <Badge variant="info" withDot>
            Processing
          </Badge>
          <Badge variant="secondary" withDot>
            Inactive
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Counters</p>
        <div className="flex flex-wrap gap-2">
          <Badge pill variant="primary">
            +99
          </Badge>
          <Badge pill variant="secondary">
            New
          </Badge>
          <Badge pill variant="error">
            3
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Feature Tags</p>
        <div className="flex flex-wrap gap-2">
          <Badge pill outline variant="info">
            Beta
          </Badge>
          <Badge pill outline variant="success">
            New
          </Badge>
          <Badge pill outline variant="warning">
            Coming Soon
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// Dark Theme
export const DarkTheme: Story = {
  render: () => (
    <div
      className="dark bg-background p-6 rounded-md"
      style={{ minWidth: '500px' }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Dark Theme</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Standard Variants</p>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Outline Variants</p>
          <div className="flex flex-wrap gap-2">
            <Badge outline>Default</Badge>
            <Badge outline variant="primary">
              Primary
            </Badge>
            <Badge outline variant="secondary">
              Secondary
            </Badge>
            <Badge outline variant="success">
              Success
            </Badge>
            <Badge outline variant="warning">
              Warning
            </Badge>
            <Badge outline variant="error">
              Error
            </Badge>
            <Badge outline variant="info">
              Info
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">With Dot</p>
          <div className="flex flex-wrap gap-2">
            <Badge withDot>Default</Badge>
            <Badge withDot variant="primary">
              Primary
            </Badge>
            <Badge withDot variant="success">
              Success
            </Badge>
            <Badge withDot outline variant="error">
              Error Outline
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
};
