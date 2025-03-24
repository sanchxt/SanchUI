import { Skeleton, SkeletonProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<SkeletonProps> = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: 'Width of the skeleton (number in px or string with units)',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton (number in px or string with units)',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: 'Animation type to display',
    },
    circle: {
      control: 'boolean',
      description: 'Whether to make the skeleton a circle',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Border radius of the skeleton',
    },
    translucent: {
      control: 'boolean',
      description: 'Whether to make the skeleton translucent',
    },
    shimmer: {
      control: 'boolean',
      description: 'Whether to show a shimmer effect (overrides animation)',
    },
    text: {
      control: 'boolean',
      description: 'Whether this is a text skeleton',
    },
    textVariant: {
      control: 'select',
      options: ['heading', 'body', 'caption'],
      description: 'Which text variant to mimic (requires text=true)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

// shapes and sizes
export const ShapesAndSizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Rectangles with Different Border Radii
        </h3>
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">None</p>
            <Skeleton width={100} height={100} radius="none" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Small</p>
            <Skeleton width={100} height={100} radius="sm" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Medium (Default)</p>
            <Skeleton width={100} height={100} radius="md" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Large</p>
            <Skeleton width={100} height={100} radius="lg" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Full</p>
            <Skeleton width={100} height={100} radius="full" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Custom (1.5rem)</p>
            <Skeleton width={100} height={100} radius="1.5rem" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Circles</h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-2">
            <p className="text-sm font-medium">Small (24px)</p>
            <Skeleton width={24} height={24} circle />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Medium (48px)</p>
            <Skeleton width={48} height={48} circle />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Large (64px)</p>
            <Skeleton width={64} height={64} circle />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Avatar (40px)</p>
            <Skeleton width={40} height={40} circle />
          </div>
        </div>
      </div>
    </div>
  ),
};

// animation Variants
export const Animations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Animation Types</h3>
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">Pulse (Default)</p>
            <Skeleton width={200} height={20} animation="pulse" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Wave</p>
            <Skeleton width={200} height={20} animation="wave" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Shimmer</p>
            <Skeleton width={200} height={20} shimmer />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">None</p>
            <Skeleton width={200} height={20} animation="none" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// text Skeletons
export const TextSkeletons: Story = {
  render: () => (
    <div className="space-y-8 w-[500px]">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Text Variants</h3>
        <div className="flex flex-col space-y-6 border border-border p-6 rounded-lg">
          <div className="space-y-1">
            <Skeleton text textVariant="heading" />
            <div className="flex flex-col gap-2">
              <Skeleton text textVariant="body" />
              <Skeleton text textVariant="body" />
              <Skeleton text textVariant="body" width="90%" />
            </div>
            <Skeleton text textVariant="caption" className="mt-2" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Text Widths</h3>
        <div className="flex flex-col space-y-3 border border-border p-6 rounded-lg">
          <Skeleton text textVariant="heading" width="70%" />
          <Skeleton text textVariant="body" width="100%" />
          <Skeleton text textVariant="body" width="90%" />
          <Skeleton text textVariant="body" width="95%" />
          <Skeleton text textVariant="body" width="85%" />
        </div>
      </div>
    </div>
  ),
};

// translucent Skeletons
export const TranslucentSkeletons: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Translucent vs Standard</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">Standard</p>
            <div className="border border-border p-4 rounded-lg">
              <Skeleton width={150} height={20} className="mb-4" />
              <Skeleton width="100%" height={100} />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Translucent</p>
            <div className="border border-border p-4 rounded-lg">
              <Skeleton width={150} height={20} translucent className="mb-4" />
              <Skeleton width="100%" height={100} translucent />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// common UI Patterns
export const UIPatterns: Story = {
  render: () => (
    <div className="space-y-8 max-w-[600px]">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Card Loading State</h3>
        <div className="border border-border rounded-lg overflow-hidden">
          {/* Card header */}
          <Skeleton width="100%" height={200} radius="none" />
          <div className="p-4 space-y-4">
            <Skeleton width="70%" height={24} />
            <div className="space-y-2">
              <Skeleton width="100%" height={16} />
              <Skeleton width="90%" height={16} />
              <Skeleton width="95%" height={16} />
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton width={80} height={32} radius="full" />
              <Skeleton width={100} height={32} radius="full" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Profile Loading State</h3>
        <div className="flex items-center gap-4 border border-border p-4 rounded-lg">
          <Skeleton width={64} height={64} circle />
          <div className="flex-1 space-y-2">
            <Skeleton width={150} height={20} />
            <Skeleton width={100} height={16} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">List Loading State</h3>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="p-4 space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton width={40} height={40} circle />
                <div className="flex-1 space-y-2">
                  <Skeleton width={`${Math.random() * 30 + 60}%`} height={16} />
                  <Skeleton width={`${Math.random() * 20 + 30}%`} height={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

// dark theme
export const DarkTheme: Story = {
  render: () => (
    <div className="dark bg-background p-6 rounded-md space-y-8">
      <h3 className="text-lg font-semibold text-foreground">Dark Theme</h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Basic Shapes</p>
          <div className="flex flex-wrap gap-4">
            <Skeleton width={100} height={20} />
            <Skeleton width={60} height={60} circle />
            <Skeleton width={100} height={40} radius="lg" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Animation Types</p>
          <div className="flex flex-col space-y-4">
            <Skeleton width={200} height={20} animation="pulse" />
            <Skeleton width={200} height={20} animation="wave" />
            <Skeleton width={200} height={20} shimmer />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Text Pattern</p>
          <div className="border border-border p-4 rounded-lg space-y-2">
            <Skeleton text textVariant="heading" />
            <Skeleton text textVariant="body" />
            <Skeleton text textVariant="body" width="90%" />
            <Skeleton text textVariant="body" width="95%" />
            <Skeleton text textVariant="caption" width="40%" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// custom examples
export const CustomExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Element Types</h3>
        <div className="space-y-2">
          <p className="text-sm font-medium">As Button Element</p>
          <Skeleton as="button" width={120} height={40} radius="lg" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Styling</h3>
        <div className="space-y-2">
          <p className="text-sm font-medium">With Custom Classes</p>
          <Skeleton
            width={200}
            height={100}
            className="shadow-md hover:shadow-lg transition-shadow"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Article Loading Pattern</h3>
        <div className="border border-border rounded-lg p-6 space-y-4 max-w-[700px]">
          <Skeleton text textVariant="heading" width="80%" />
          <div className="flex gap-2 items-center">
            <Skeleton width={32} height={32} circle />
            <Skeleton width={120} height={16} />
            <Skeleton width={100} height={16} className="ml-auto" />
          </div>

          <Skeleton width="100%" height={300} className="my-4" />

          <div className="space-y-2">
            <Skeleton text textVariant="body" />
            <Skeleton text textVariant="body" />
            <Skeleton text textVariant="body" width="95%" />
            <Skeleton text textVariant="body" width="90%" />
          </div>

          <div className="space-y-2 mt-4">
            <Skeleton text textVariant="body" />
            <Skeleton text textVariant="body" width="92%" />
            <Skeleton text textVariant="body" width="88%" />
            <Skeleton text textVariant="body" width="94%" />
          </div>
        </div>
      </div>
    </div>
  ),
};
