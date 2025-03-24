import { useState } from 'react';
import { Tooltip, TooltipProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertCircle,
  Info,
  HelpCircle,
  Settings,
  Copy,
  Check,
  Lock,
  RefreshCw,
  Share,
} from 'lucide-react';

const meta: Meta<TooltipProps> = {
  title: 'Components/Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to display in the tooltip',
    },
    position: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
      description: 'Position of the tooltip relative to the trigger element',
    },
    showDelay: {
      control: 'number',
      description: 'Delay before showing the tooltip (in ms)',
    },
    hideDelay: {
      control: 'number',
      description: 'Delay before hiding the tooltip (in ms)',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the tooltip',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show an arrow on the tooltip',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus', 'manual'],
      description: 'How the tooltip is triggered',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the tooltip should be interactive',
    },
    animationDuration: {
      control: 'number',
      description: 'Duration of the animation (in ms)',
    },
    offset: {
      control: 'number',
      description: 'Offset from the trigger element (in px)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: (
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Hover me
      </button>
    ),
  },
};

// positions
export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-10 p-10">
      <Tooltip content="Top position" position="top">
        <button className="p-2 bg-primary text-primary-foreground rounded-md">
          Top
        </button>
      </Tooltip>

      <Tooltip content="Top-start position" position="top-start">
        <button className="p-2 bg-primary text-primary-foreground rounded-md">
          Top-start
        </button>
      </Tooltip>

      <Tooltip content="Top-end position" position="top-end">
        <button className="p-2 bg-primary text-primary-foreground rounded-md">
          Top-end
        </button>
      </Tooltip>

      <Tooltip content="Left position" position="left">
        <button className="p-2 bg-primary text-primary-foreground rounded-md">
          Left
        </button>
      </Tooltip>

      <div className="flex items-center justify-center">
        <div className="bg-muted p-2 rounded-md text-sm text-center">
          Hover around
        </div>
      </div>

      <Tooltip content="Right position" position="right">
        <button className="p-2 bg-primary text-primary-foreground rounded-md">
          Right
        </button>
      </Tooltip>

      <Tooltip content="Bottom position" position="bottom">
        <button className="p-2 bg-primary text-primary-foreground rounded-md">
          Bottom
        </button>
      </Tooltip>

      <Tooltip content="Bottom-start position" position="bottom-start">
        <button className="p-2 bg-primary text-primary-foreground rounded-md">
          Bottom-start
        </button>
      </Tooltip>

      <Tooltip content="Bottom-end position" position="bottom-end">
        <button className="p-2 bg-primary text-primary-foreground rounded-md">
          Bottom-end
        </button>
      </Tooltip>
    </div>
  ),
};

// trigger types
export const TriggerTypes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Hover trigger (default)</p>
        <Tooltip content="Activated by hovering">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Hover me
          </button>
        </Tooltip>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Click trigger</p>
        <Tooltip content="Activated by clicking" trigger="click">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Click me
          </button>
        </Tooltip>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Focus trigger</p>
        <Tooltip content="Activated by focusing" trigger="focus">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Focus me (hit Tab)
          </button>
        </Tooltip>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Manual trigger (controlled)</p>
        <ControlledTooltipExample />
      </div>
    </div>
  ),
};

// delays
export const Delays: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">No delay (default)</p>
        <Tooltip content="Shows and hides immediately">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            No delay
          </button>
        </Tooltip>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Show delay (500ms)</p>
        <Tooltip content="Takes 500ms to appear" showDelay={500}>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Show delay
          </button>
        </Tooltip>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Hide delay (500ms)</p>
        <Tooltip content="Takes 500ms to disappear" hideDelay={500}>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Hide delay
          </button>
        </Tooltip>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">
          Both delays (300ms show, 500ms hide)
        </p>
        <Tooltip
          content="Delayed appearance and disappearance"
          showDelay={300}
          hideDelay={500}
        >
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Combined delays
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

// with icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tooltip content="Information">
        <button className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
          <Info size={18} />
        </button>
      </Tooltip>

      <Tooltip content="Warning! This action cannot be undone.">
        <button className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-200">
          <AlertCircle size={18} />
        </button>
      </Tooltip>

      <Tooltip
        content="Need help? Click here for assistance."
        position="bottom"
      >
        <button className="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200">
          <HelpCircle size={18} />
        </button>
      </Tooltip>

      <Tooltip content="Settings and preferences" position="bottom">
        <button className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <Settings size={18} />
        </button>
      </Tooltip>
    </div>
  ),
};

// interactive tooltip
export const Interactive: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">
          Interactive tooltip (you can hover on the tooltip itself)
        </p>
        <Tooltip
          content={
            <div className="p-1">
              <p className="font-medium">Interactive tooltip</p>
              <p className="text-xs text-muted-foreground mt-1">
                You can hover over this tooltip without it disappearing.
              </p>
              <div className="flex gap-2 mt-2">
                <button className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded">
                  Action 1
                </button>
                <button className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                  Action 2
                </button>
              </div>
            </div>
          }
          interactive
        >
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Hover for interactive tooltip
          </button>
        </Tooltip>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">
          Non-interactive tooltip (default behavior)
        </p>
        <Tooltip
          content={
            <div className="p-1">
              <p className="font-medium">Non-interactive tooltip</p>
              <p className="text-xs text-muted-foreground mt-1">
                This tooltip will disappear if you try to hover on it.
              </p>
            </div>
          }
        >
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Hover for regular tooltip
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

// rich content
export const RichContent: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Tooltip
        content={
          <div className="p-1">
            <div className="font-medium flex items-center gap-2">
              <Share size={14} />
              Share Options
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <Check size={14} className="text-success" />
                </div>
                <span>Public link</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <Lock size={14} className="text-muted-foreground" />
                </div>
                <span>Private access</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 flex items-center justify-center">
                  <RefreshCw size={14} className="text-muted-foreground" />
                </div>
                <span>Regenerate link</span>
              </div>
            </div>
          </div>
        }
        maxWidth="16rem"
        interactive
      >
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2">
          <Share size={16} />
          Share
        </button>
      </Tooltip>
    </div>
  ),
};

// without arrow
export const WithoutArrow: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">With arrow (default)</p>
        <Tooltip content="This tooltip has an arrow">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            With arrow
          </button>
        </Tooltip>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Without arrow</p>
        <Tooltip content="This tooltip has no arrow" arrow={false}>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            No arrow
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

// different offsets
export const Offsets: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Default offset (8px)</p>
        <Tooltip content="Default offset">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Default
          </button>
        </Tooltip>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Small offset (4px)</p>
        <Tooltip content="Small offset" offset={4}>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Close
          </button>
        </Tooltip>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Large offset (16px)</p>
        <Tooltip content="Large offset" offset={16}>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Far
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

// dark theme
export const DarkTheme: Story = {
  render: () => (
    <div className="dark bg-background p-6 rounded-md">
      <h3 className="text-lg font-semibold text-foreground mb-4">Dark Theme</h3>

      <div className="flex gap-4">
        <Tooltip content="Information tooltip" position="top">
          <button className="p-2 rounded-full bg-primary/20 text-primary">
            <Info size={18} />
          </button>
        </Tooltip>

        <Tooltip
          content={
            <div className="p-1">
              <p className="font-medium">Rich tooltip</p>
              <p className="text-xs text-muted-foreground mt-1">
                This is a tooltip with more content.
              </p>
            </div>
          }
          position="bottom"
        >
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Hover me
          </button>
        </Tooltip>

        <Tooltip content="Click activated" trigger="click">
          <button className="p-2 rounded-full bg-secondary text-secondary-foreground">
            <Settings size={18} />
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

// copy tooltip example (practical use case)
export const CopyTooltip: Story = {
  render: () => {
    return <CopyTooltipExample />;
  },
};

// controlled tooltip example
const ControlledTooltipExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Tooltip content="Controlled by state" trigger="manual" isOpen={isOpen}>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Tooltip is {isOpen ? 'on' : 'off'}
        </button>
      </Tooltip>

      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        Toggle tooltip
      </button>
    </div>
  );
};

// copy tooltip example
const CopyTooltipExample = () => {
  const [copied, setCopied] = useState(false);
  const textToCopy = 'npm i @sanch-ui/core';

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-sm font-medium mb-2">
        Practical example: Copy to clipboard with feedback
      </p>

      <div className="flex">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-l-md px-4 py-2 font-mono text-sm">
          {textToCopy}
        </div>
        <Tooltip content={copied ? 'Copied!' : 'Copy to clipboard'}>
          <button
            className="bg-primary text-primary-foreground px-3 rounded-r-md flex items-center"
            onClick={handleCopy}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
