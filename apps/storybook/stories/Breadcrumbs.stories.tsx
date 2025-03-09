import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbProps,
} from '@sanch-ui/core';

import { ChevronRight, Slash } from 'lucide-react';

const meta: Meta<BreadcrumbProps> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    separator: {
      control: 'select',
      options: ['chevron', 'slash', 'dot'],
      mapping: {
        chevron: <ChevronRight className="h-3.5 w-3.5" />,
        slash: <Slash className="h-3.5 w-3.5" />,
        dot: '•',
      },
    },
    showHomeIcon: {
      control: 'boolean',
    },
    collapsible: {
      control: 'boolean',
    },
    maxItems: {
      control: { type: 'number', min: 0, max: 10 },
    },
  },
  args: {
    separator: <ChevronRight className="h-3.5 w-3.5" />,
    showHomeIcon: false,
    collapsible: false,
    maxItems: 0,
  },
};

export default meta;
type Story = StoryObj<BreadcrumbProps>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products/electronics">
            Electronics
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products/electronics/computers">
            Computers
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const WithDarkTheme: Story = {
  render: (args) => (
    <div className="dark p-6 rounded-md bg-background">
      <Breadcrumb {...args}>
        <BreadcrumbList>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/" isRoot>
              Home
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};

export const MobileResponsive: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  args: {
    collapsible: true,
    maxItems: 2,
  },
  render: (args) => (
    <div className="w-[320px]">
      <Breadcrumb {...args}>
        <BreadcrumbList>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/" isRoot>
              Home
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/products/electronics">
              Electronics
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/products/electronics/computers">
              Computers
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};

export const Customized: Story = {
  render: (args) => (
    <Breadcrumb
      {...args}
      className="bg-muted px-4 py-2 rounded-lg shadow-sm"
      separator={<span className="text-primary font-bold">→</span>}
    >
      <BreadcrumbList className="font-medium">
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink
            href="/"
            isRoot
            className="text-primary hover:underline"
          >
            Start
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink
            href="/dashboard"
            className="text-primary hover:underline"
          >
            Dashboard
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbPage className="font-bold">Current View</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const WithHomeIcon: Story = {
  args: {
    showHomeIcon: true,
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/" isRoot>
            Home
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const WithCustomSeparator: Story = {
  args: {
    separator: '/',
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/" isRoot>
            Home
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const WithLongPath: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/" isRoot>
            Home
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products/electronics">
            Electronics
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products/electronics/computers">
            Computers
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products/electronics/computers/laptops">
            Laptops
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbPage>MacBook Pro 16-inch</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const Collapsible: Story = {
  args: {
    collapsible: true,
    maxItems: 3,
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/" isRoot>
            Home
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products/electronics">
            Electronics
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products/electronics/computers">
            Computers
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/products/electronics/computers/laptops">
            Laptops
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const SlashSeparator: Story = {
  args: {
    separator: <Slash className="h-3.5 w-3.5" />,
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/" isRoot>
            Home
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const DotSeparator: Story = {
  args: {
    separator: '•',
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/" isRoot>
            Home
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const WithEllipsis: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink href="/" isRoot>
            Home
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbEllipsis count={3} />
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbPage>Current Page</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const Interactive: Story = {
  args: {
    showHomeIcon: true,
  },
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbList>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink
            href="/"
            isRoot
            onClick={(e: React.MouseEvent<HTMLAnchorElement>): void => {
              e.preventDefault();
              alert('Home clicked!');
            }}
          >
            Home
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbLink
            href="/dashboard"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>): void => {
              e.preventDefault();
              alert('Dashboard clicked!');
            }}
          >
            Dashboard
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        <BreadcrumbItem data-item="breadcrumb-item">
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const ResponsiveCollapsible: Story = {
  args: {
    collapsible: true,
    maxItems: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Automatically collapses breadcrumb items when there are too many to display. Try resizing the viewport to see the effect.',
      },
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Breadcrumb {...args}>
        <BreadcrumbList>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/" isRoot>
              Home
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/account">Account</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/account/settings">Settings</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/account/settings/profile">
              Profile
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbPage>Preferences</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};

export const TruncatedItems: Story = {
  render: (args) => (
    <div className="w-64">
      <Breadcrumb {...args}>
        <BreadcrumbList>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/" isRoot>
              Home
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbLink href="/extremely-long-category-name-that-should-be-truncated">
              Extremely Long Category Name That Should Be Truncated
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem data-item="breadcrumb-item">
            <BreadcrumbPage>
              Another Long Item Name For Testing Truncation
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};
