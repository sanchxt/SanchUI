import { Divider, DividerProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight, BookOpen, Heart } from 'lucide-react';

const meta: Meta<DividerProps> = {
  title: 'Components/Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the divider',
    },
    thickness: {
      control: 'radio',
      options: ['thin', 'regular', 'thick'],
      description: 'The thickness of the line',
    },
    variant: {
      control: 'radio',
      options: ['solid', 'dashed', 'dotted'],
      description: 'The style of the line',
    },
    label: {
      control: 'text',
      description: 'Optional text or element in the middle (horizontal only)',
    },
    labelAlignment: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the label',
    },
    decorative: {
      control: 'boolean',
      description: 'Use a gradient effect instead of a solid line',
    },
    withMargin: {
      control: 'boolean',
      description: 'Add margin to the divider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    thickness: 'regular',
    variant: 'solid',
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <div className="mb-4 text-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
      </div>
      <Divider {...args} />
      <div className="mt-4 text-foreground">
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies
        sed, dolor.
      </div>
    </div>
  ),
};

// thicknesses
export const Thicknesses: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Thin Divider</h3>
        <Divider thickness="thin" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Regular Divider (Default)</h3>
        <Divider thickness="regular" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Thick Divider</h3>
        <Divider thickness="thick" />
      </div>
    </div>
  ),
};

// variants
export const Variants: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Solid (Default)</h3>
        <Divider variant="solid" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Dashed</h3>
        <Divider variant="dashed" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Dotted</h3>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
};

// vertical orientation
export const Vertical: Story = {
  render: () => (
    <div className="flex items-start h-60 gap-4">
      <div className="text-foreground">Left content</div>
      <Divider orientation="vertical" />
      <div className="text-foreground">Right content</div>

      <Divider orientation="vertical" thickness="thick" />
      <div className="text-foreground">More content</div>

      <Divider orientation="vertical" variant="dashed" />
      <div className="text-foreground">Final section</div>
    </div>
  ),
};

// with label examples
export const WithLabel: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Simple Text Label</h3>
        <Divider label="Section" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Label with Icon</h3>
        <Divider
          label={
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>New Chapter</span>
            </div>
          }
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Start Alignment</h3>
        <Divider label="Start" labelAlignment="start" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Center Alignment (Default)</h3>
        <Divider label="Center" labelAlignment="center" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">End Alignment</h3>
        <Divider label="End" labelAlignment="end" />
      </div>
    </div>
  ),
};

// decorative
export const Decorative: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Decorative Horizontal</h3>
        <Divider decorative />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Decorative with Label</h3>
        <Divider
          decorative
          label={
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-destructive" />
              <span>Featured</span>
            </span>
          }
        />
      </div>

      <div className="flex h-40 items-start space-x-4">
        <h3 className="text-sm font-medium">Decorative Vertical</h3>
        <Divider orientation="vertical" decorative />
        <div className="text-foreground">Content after divider</div>
      </div>
    </div>
  ),
};

// breadcrumb divider
export const BreadcrumbStyle: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <div className="flex items-center">
        <span className="text-foreground">Home</span>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground">Products</span>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-primary font-medium">Product Details</span>
      </div>

      <Divider className="my-4" />

      <p className="text-foreground">
        Here's a breadcrumb navigation with a divider below it to separate it
        from the content.
      </p>
    </div>
  ),
};

// card
export const InCard: Story = {
  render: () => (
    <div className="w-full max-w-md rounded-lg border border-border p-6 bg-background shadow-sm">
      <h3 className="text-lg font-semibold text-foreground">Card Title</h3>

      <Divider className="my-4" />

      <p className="text-foreground">
        This is the main content of the card, separated from the title with a
        divider.
      </p>

      <Divider className="my-4" label="Additional Information" />

      <p className="text-muted-foreground text-sm">
        Extra details go here, separated by a labeled divider.
      </p>

      <Divider className="my-4" decorative />

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Action Button
        </button>
      </div>
    </div>
  ),
};

// dark Theme
export const DarkTheme: Story = {
  render: () => (
    <div className="dark bg-background p-6 rounded-lg w-full max-w-md">
      <h3 className="text-lg font-semibold text-foreground">Dark Theme</h3>

      <div className="space-y-8 mt-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Regular</p>
          <Divider />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">With Label</p>
          <Divider label="Section" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Dashed</p>
          <Divider variant="dashed" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Thick</p>
          <Divider thickness="thick" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Decorative</p>
          <Divider decorative />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            Decorative with Label
          </p>
          <Divider decorative label="Featured" />
        </div>
      </div>
    </div>
  ),
};

// list dividers
export const ListDividers: Story = {
  render: () => (
    <div className="w-full max-w-md border border-border rounded-lg overflow-hidden">
      <div className="p-4 text-foreground">List Item 1</div>
      <Divider />
      <div className="p-4 text-foreground">List Item 2</div>
      <Divider />
      <div className="p-4 text-foreground">List Item 3</div>
      <Divider />
      <div className="p-4 text-foreground">List Item 4</div>
    </div>
  ),
};

// timeline with divider Component
export const TimelineWithDivider: Story = {
  render: () => (
    <div className="w-full max-w-md p-4">
      <div className="relative pl-10">
        <div className="relative mb-10">
          <div className="absolute -left-10 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
              1
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground">Step One</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Complete the first task
            </p>
          </div>

          <div
            className="absolute -left-6 top-8 bottom-0 flex flex-col"
            style={{ height: 'calc(100% + 10px)' }}
          >
            <Divider
              orientation="vertical"
              className="h-full"
              thickness="thin"
            />
          </div>
        </div>

        <div className="relative mb-10">
          <div className="absolute -left-10 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium z-10">
              2
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground">Step Two</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Proceed to the second task
            </p>
          </div>

          <div
            className="absolute -left-6 top-8 bottom-0 flex flex-col"
            style={{ height: 'calc(100% + 10px)' }}
          >
            <Divider
              orientation="vertical"
              className="h-full"
              thickness="thin"
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium z-10">
              3
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground">Step Three</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Complete the final task
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};
