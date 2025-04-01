import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, Button, DrawerProps } from '@sanch-ui/core';

const meta: Meta<DrawerProps> = {
  title: 'Molecules/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'The position from which the drawer slides in',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'The size of the drawer',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    hasCloseButton: {
      control: 'boolean',
      description: 'Whether the drawer has a close button',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Whether the drawer should close when clicking outside',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether the drawer should close when pressing escape key',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showBackdrop: {
      control: 'boolean',
      description: 'Whether to show the backdrop/overlay',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    lockScroll: {
      control: 'boolean',
      description: 'Whether to lock the body scroll when the drawer is open',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    usePortal: {
      control: 'boolean',
      description: 'Whether to render the drawer in a portal',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    animationDuration: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Duration of the slide animation in milliseconds',
      table: {
        defaultValue: { summary: '250' },
      },
    },
    header: {
      control: 'text',
      description: 'Content to render in the header section',
    },
    footer: {
      control: 'text',
      description: 'Content to render in the footer section',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Properly typed DrawerDemo component
const DrawerDemo = (args: Partial<DrawerProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={onOpen}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} onClose={onClose}>
        {args.children || (
          <div className="flex flex-col gap-4">
            <p>This is drawer content</p>
            <p>You can put any content here</p>
            <Button onClick={onClose}>Close Drawer</Button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

// Basic example
export const Basic: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'right',
    size: 'md',
  },
};

// With header and footer
export const WithHeaderAndFooter: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'right',
    size: 'md',
    header: 'Drawer Title',
    footer: (
      <div className="flex justify-end w-full">
        <Button onClick={() => {}} className="mr-2" variant="outline">
          Cancel
        </Button>
        <Button onClick={() => {}}>Confirm</Button>
      </div>
    ),
  },
};

// Left position
export const LeftPosition: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'left',
    size: 'md',
    header: 'Left Drawer',
  },
};

// Top position
export const TopPosition: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'top',
    size: 'md',
    header: 'Top Drawer',
  },
};

// Bottom position
export const BottomPosition: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'bottom',
    size: 'md',
    header: 'Bottom Drawer',
  },
};

// Full size
export const FullSize: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'right',
    size: 'full',
    header: 'Full Size Drawer',
  },
};

// Without backdrop
export const WithoutBackdrop: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'right',
    size: 'md',
    showBackdrop: false,
    header: 'No Backdrop',
  },
};

// Without close button
export const WithoutCloseButton: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'right',
    size: 'md',
    hasCloseButton: false,
    header: 'No Close Button',
  },
};

// Custom content with form
export const WithForm: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'right',
    size: 'md',
    header: 'Contact Form',
    children: (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="border border-border rounded p-2"
            placeholder="Enter your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border border-border rounded p-2"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            className="border border-border rounded p-2 h-24"
            placeholder="Enter your message"
          />
        </div>
        <Button className="mt-2">Submit</Button>
      </div>
    ),
  },
};

// Custom animations
export const SlowAnimation: Story = {
  render: (args) => <DrawerDemo {...args} />,
  args: {
    position: 'right',
    size: 'md',
    animationDuration: 800,
    header: 'Slow Animation (800ms)',
  },
};

// Nested drawers example
export const NestedDrawers: Story = {
  render: (args) => {
    const [mainDrawerOpen, setMainDrawerOpen] = useState(false);
    const [nestedDrawerOpen, setNestedDrawerOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setMainDrawerOpen(true)}>
          Open Main Drawer
        </Button>

        <Drawer
          position="right"
          size="md"
          header="Main Drawer"
          isOpen={mainDrawerOpen}
          onClose={() => setMainDrawerOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <p>This is the main drawer</p>
            <Button onClick={() => setNestedDrawerOpen(true)}>
              Open Nested Drawer
            </Button>
          </div>

          <Drawer
            position="left"
            size="sm"
            header="Nested Drawer"
            isOpen={nestedDrawerOpen}
            onClose={() => setNestedDrawerOpen(false)}
          >
            <div className="flex flex-col gap-4">
              <p>This is a nested drawer</p>
              <Button onClick={() => setNestedDrawerOpen(false)}>
                Close Nested Drawer
              </Button>
            </div>
          </Drawer>
        </Drawer>
      </div>
    );
  },
};

// Dark mode example
export const DarkMode: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setIsOpen(true)}>Open Dark Mode Drawer</Button>

        <div className="dark">
          <Drawer
            {...args}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className="dark"
          >
            <div className="flex flex-col gap-4">
              <p>This drawer uses dark mode styles</p>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </div>
          </Drawer>
        </div>
      </div>
    );
  },
  args: {
    position: 'right',
    size: 'md',
    header: 'Dark Mode Drawer',
  },
};
