import { Link, LinkProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ExternalLink,
  Download,
  FileText,
  Check,
  ArrowRight,
} from 'lucide-react';

const meta: Meta<LinkProps> = {
  title: 'Components/Navigation/Link',
  component: Link,
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
        'destructive',
        'success',
        'muted',
      ],
      description: 'The variant style of the link',
      defaultValue: 'default',
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
      description: 'Whether the link should display an underline',
      defaultValue: 'hover',
    },
    showExternalIcon: {
      control: 'boolean',
      description: 'Whether to show an external link icon for external URLs',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the link is disabled',
      defaultValue: false,
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the link',
      defaultValue: 'md',
    },
    href: {
      control: 'text',
      description: 'The URL to link to',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Where to open the linked document',
    },
    as: {
      control: false,
      description:
        'Component to use as the link, can be used for integration with React Router',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default link
export const Default: Story = {
  args: {
    href: 'https://example.com',
    children: 'Default Link',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Default</p>
        <Link href="#">Default link style</Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Primary</p>
        <Link href="#" variant="primary">
          Primary link style
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Secondary</p>
        <Link href="#" variant="secondary">
          Secondary link style
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Destructive</p>
        <Link href="#" variant="destructive">
          Destructive link style
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Success</p>
        <Link href="#" variant="success">
          Success link style
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Muted</p>
        <Link href="#" variant="muted">
          Muted link style
        </Link>
      </div>
    </div>
  ),
};

// Underline styles
export const UnderlineStyles: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Always underlined</p>
        <Link href="#" underline="always">
          Always underlined link
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Underline on hover (Default)</p>
        <Link href="#" underline="hover">
          Hover to see underline
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">No underline</p>
        <Link href="#" underline="none">
          Never underlined link
        </Link>
      </div>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Small</p>
        <Link href="#" size="sm">
          Small link
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Medium (Default)</p>
        <Link href="#" size="md">
          Medium link
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Large</p>
        <Link href="#" size="lg">
          Large link
        </Link>
      </div>
    </div>
  ),
};

// External links
export const ExternalLinks: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">External link with icon</p>
        <Link href="https://example.com" showExternalIcon>
          External link with icon
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">External link without icon</p>
        <Link href="https://example.com">External link without icon</Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">
          With target blank (automatically external)
        </p>
        <Link href="#" target="_blank" showExternalIcon>
          Opens in new tab
        </Link>
      </div>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Normal</p>
        <Link href="#">Normal link state</Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Disabled</p>
        <Link href="#" disabled>
          Disabled link state
        </Link>
      </div>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">With leading icon</p>
        <Link href="#" className="gap-1">
          <ExternalLink className="h-4 w-4" />
          <span>Link with leading icon</span>
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">With trailing icon</p>
        <Link href="#" className="gap-1">
          <span>Link with trailing icon</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Download link</p>
        <Link href="#" className="gap-1">
          <Download className="h-4 w-4" />
          <span>Download file</span>
        </Link>
      </div>
    </div>
  ),
};

// Dark theme
export const DarkTheme: Story = {
  render: () => (
    <div
      className="dark bg-background p-6 rounded-md"
      style={{ width: '480px' }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">Dark Theme</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Default</p>
          <Link href="#">Default dark theme link</Link>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Primary</p>
          <Link href="#" variant="primary">
            Primary dark theme link
          </Link>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">With icon</p>
          <Link href="#" className="gap-1">
            <FileText className="h-4 w-4" />
            <span>Document link</span>
          </Link>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">External with icon</p>
          <Link href="https://example.com" showExternalIcon>
            External dark theme link
          </Link>
        </div>
      </div>
    </div>
  ),
};

// Usage examples
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-8" style={{ width: '480px' }}>
      {/* Article example */}
      <div className="p-4 border border-border rounded-lg space-y-3">
        <h3 className="text-lg font-semibold mb-1">Article Example</h3>
        <p className="text-sm text-muted-foreground">
          This is a paragraph of text that includes a{' '}
          <Link href="#" variant="primary">
            link to more information
          </Link>
          . The text continues after the link and might contain another{' '}
          <Link href="https://example.com" showExternalIcon>
            external resource
          </Link>{' '}
          as well.
        </p>
      </div>

      {/* Card actions */}
      <div className="p-4 border border-border rounded-lg">
        <h3 className="text-lg font-semibold mb-1">Card Actions</h3>
        <p className="text-sm text-muted-foreground mb-3">
          A card with primary and secondary actions.
        </p>
        <div className="flex gap-4 pt-2">
          <Link href="#" variant="primary" className="gap-1">
            <span>Learn more</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="#" variant="muted">
            Dismiss
          </Link>
        </div>
      </div>

      {/* Success confirmation */}
      <div className="p-4 border border-border rounded-lg bg-success/10">
        <div className="flex items-start gap-2">
          <Check className="h-5 w-5 text-success mt-0.5" />
          <div>
            <h3 className="text-base font-semibold mb-1">Success!</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Your profile has been updated successfully.
            </p>
            <Link href="#" variant="success" underline="always">
              View your profile
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation list */}
      <div className="p-4 border border-border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Navigation Menu</h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="#"
              className="block py-1 px-2 hover:bg-secondary rounded transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-1 px-2 hover:bg-secondary rounded transition-colors"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-1 px-2 hover:bg-secondary rounded transition-colors"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="https://example.com"
              className="block py-1 px-2 hover:bg-secondary rounded transition-colors"
              showExternalIcon
            >
              Partner Site
            </Link>
          </li>
        </ul>
      </div>
    </div>
  ),
};
