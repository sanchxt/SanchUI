import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionProps,
} from '@sanch-ui/core';

const meta: Meta<AccordionProps> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accordion component for showing and hiding content in an expandable panel format.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description:
        'Whether a single panel or multiple panels can be opened at once',
      table: {
        type: { summary: 'single | multiple' },
        defaultValue: { summary: 'single' },
      },
    },
    expandDirection: {
      control: 'radio',
      options: ['down', 'up', 'left', 'right'],
      description: 'Direction in which the accordion expands',
      table: {
        type: { summary: 'down | up | left | right' },
        defaultValue: { summary: 'down' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the accordion items',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'radio',
      options: ['default', 'bordered', 'ghost', 'highlight'],
      description: 'Visual style variant of the accordion',
      table: {
        type: { summary: 'default | bordered | ghost | highlight' },
        defaultValue: { summary: 'default' },
      },
    },
    chevronPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of the chevron indicator',
      table: {
        type: { summary: 'start | end' },
        defaultValue: { summary: 'end' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether the open panel can be collapsed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate the accordion',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    animationDuration: {
      control: { type: 'number', min: 100, max: 1000, step: 50 },
      description: 'Duration of the animation in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Accordion Example
export const BasicAccordion: Story = {
  args: {
    type: 'single',
    expandDirection: 'down',
    size: 'md',
    variant: 'default',
    chevronPosition: 'end',
    collapsible: true,
    animated: true,
    animationDuration: 200,
  },
  render: (args) => (
    <Accordion className="w-full max-w-md" defaultValue="item-1" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is an accordion?</AccordionTrigger>
        <AccordionContent>
          An accordion is a UI component that expands/collapses to reveal/hide
          content, saving screen space while keeping related information
          accessible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>When to use accordions?</AccordionTrigger>
        <AccordionContent>
          Use accordions to organize related information in a compact way,
          especially when users don't need to see all information at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Accessibility features</AccordionTrigger>
        <AccordionContent>
          This accordion component has built-in accessibility features including
          proper ARIA attributes, keyboard navigation, and focus management.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Multiple Selection Accordion
export const MultipleSelection: Story = {
  args: {
    type: 'multiple',
    expandDirection: 'down',
    size: 'md',
    variant: 'default',
  },
  render: (args) => (
    <Accordion
      className="w-full max-w-md"
      defaultValue={['item-1', 'item-3']}
      {...args}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Multiple items can be open</AccordionTrigger>
        <AccordionContent>
          In this mode, multiple accordion items can be expanded at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Click to expand this item too</AccordionTrigger>
        <AccordionContent>
          You can keep multiple items open simultaneously for easier comparison.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>This one starts expanded</AccordionTrigger>
        <AccordionContent>
          Items can have default expanded states in multiple selection mode.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Size Variations
export const SizeVariations: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The accordion component supports multiple sizes: small, medium, and large.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <p className="mb-2 text-sm font-medium">Small Size</p>
        <Accordion type="single" size="sm" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Small accordion header</AccordionTrigger>
            <AccordionContent>
              Content for a small sized accordion item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Medium Size (Default)</p>
        <Accordion type="single" size="md" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Medium accordion header</AccordionTrigger>
            <AccordionContent>
              Content for a medium sized accordion item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Large Size</p>
        <Accordion type="single" size="lg" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Large accordion header</AccordionTrigger>
            <AccordionContent>
              Content for a large sized accordion item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Variant Styles
export const VariantStyles: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants of the accordion component.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <p className="mb-2 text-sm font-medium">Default Style</p>
        <Accordion type="single" variant="default" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Default variant</AccordionTrigger>
            <AccordionContent>The default accordion styling.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>
              Additional content for demonstration.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Bordered Style</p>
        <Accordion type="single" variant="bordered" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Bordered variant</AccordionTrigger>
            <AccordionContent>
              Accordion with more prominent borders.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>
              Additional content for demonstration.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Ghost Style</p>
        <Accordion type="single" variant="ghost" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Ghost variant</AccordionTrigger>
            <AccordionContent>
              A more minimal, transparent styling.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>
              Additional content for demonstration.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Highlight Style</p>
        <Accordion type="single" variant="highlight" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Highlight variant</AccordionTrigger>
            <AccordionContent>
              Style that emphasizes the active item.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>
              Additional content for demonstration.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Expansion Directions
export const ExpansionDirections: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Accordions can expand in different directions: down, up, left, or right.',
      },
    },
  },
  render: () => (
    <div className="space-y-8 w-full">
      <div>
        <p className="mb-2 text-sm font-medium">Expand Down (Default)</p>
        <Accordion
          type="single"
          expandDirection="down"
          defaultValue="item-1"
          className="max-w-md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Expands downward</AccordionTrigger>
            <AccordionContent>
              Content appears below the trigger - this is the default behavior.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>
              Additional content for demonstration.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Expand Up</p>
        <Accordion
          type="single"
          expandDirection="up"
          defaultValue="item-1"
          className="max-w-md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Expands upward</AccordionTrigger>
            <AccordionContent>
              Content appears above the trigger in this mode.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>
              Additional content for demonstration.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Expand Left</p>
        <Accordion
          type="single"
          expandDirection="left"
          defaultValue="item-1"
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Expands to the left</AccordionTrigger>
            <AccordionContent>
              Content appears to the left of the trigger.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>Additional content.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Expand Right</p>
        <Accordion
          type="single"
          expandDirection="right"
          defaultValue="item-1"
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Expands to the right</AccordionTrigger>
            <AccordionContent>
              Content appears to the right of the trigger.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Another item</AccordionTrigger>
            <AccordionContent>Additional content.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Chevron Position
export const ChevronPositions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The chevron indicator can be positioned at the start or end of the trigger.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <p className="mb-2 text-sm font-medium">Chevron at End (Default)</p>
        <Accordion type="single" chevronPosition="end" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Chevron at the end</AccordionTrigger>
            <AccordionContent>
              The chevron indicator is positioned at the end of the trigger.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Chevron at Start</p>
        <Accordion type="single" chevronPosition="start" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Chevron at the start</AccordionTrigger>
            <AccordionContent>
              The chevron indicator is positioned at the start of the trigger.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Disabled State
export const DisabledStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Accordions and individual items can be disabled.',
      },
    },
  },
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <p className="mb-2 text-sm font-medium">Fully Disabled Accordion</p>
        <Accordion type="single" disabled defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              This entire accordion is disabled
            </AccordionTrigger>
            <AccordionContent>
              None of the items can be interacted with.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Another disabled item</AccordionTrigger>
            <AccordionContent>This item is also disabled.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Individual Disabled Items</p>
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>This item is enabled</AccordionTrigger>
            <AccordionContent>
              This item can be interacted with normally.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" disabled>
            <AccordionTrigger>This item is disabled</AccordionTrigger>
            <AccordionContent>
              This specific item cannot be interacted with.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>This item is enabled</AccordionTrigger>
            <AccordionContent>
              This item can be interacted with normally.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Controlled Accordion Example
export const ControlledAccordion: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An example of a controlled accordion component.',
      },
    },
  },
  render: () => {
    const ControlledAccordionExample = () => {
      const [value, setValue] = useState<string | string[]>('item-1');

      // Create a handler that can accept the union type
      const handleValueChange = (newValue: string | string[]) => {
        setValue(newValue);
      };

      return (
        <div className="space-y-4 w-full max-w-md">
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm"
              onClick={() => setValue('item-1')}
            >
              Open Item 1
            </button>
            <button
              className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm"
              onClick={() => setValue('item-2')}
            >
              Open Item 2
            </button>
            <button
              className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm"
              onClick={() => setValue('item-3')}
            >
              Open Item 3
            </button>
          </div>

          <Accordion
            type="single"
            value={value}
            onValueChange={handleValueChange}
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Item One</AccordionTrigger>
              <AccordionContent>
                This accordion is controlled by the buttons above.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Item Two</AccordionTrigger>
              <AccordionContent>
                Click the buttons to programmatically control which item is
                open.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Item Three</AccordionTrigger>
              <AccordionContent>
                You can still interact with the accordion directly too.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="text-sm">
            Currently open: <span className="font-medium">{value}</span>
          </div>
        </div>
      );
    };

    return <ControlledAccordionExample />;
  },
};

// Custom Icons Example
export const CustomIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Example showing how to customize the accordion with custom icons.',
      },
    },
  },
  render: () => {
    // Custom icons
    const PlusIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    );

    const MinusIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    );

    return (
      <div className="w-full max-w-md">
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger
              expandedIcon={<MinusIcon />}
              collapsedIcon={<PlusIcon />}
            >
              Custom plus/minus icons
            </AccordionTrigger>
            <AccordionContent>
              This uses custom plus and minus icons instead of the default
              chevron.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger
              expandedIcon={<MinusIcon />}
              collapsedIcon={<PlusIcon />}
            >
              Another example
            </AccordionTrigger>
            <AccordionContent>
              Each trigger can have its own custom icons.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};

// Dark Mode Example
export const DarkMode: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing the accordion in dark mode.',
      },
    },
  },
  render: () => (
    <div className="dark p-6 bg-background rounded-lg w-full max-w-md">
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Dark mode accordion</AccordionTrigger>
          <AccordionContent>
            The accordion adapts to dark mode automatically when inside a
            container with the "dark" class.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Another item</AccordionTrigger>
          <AccordionContent>
            All colors and styles adjust to maintain proper contrast in dark
            mode.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Final item</AccordionTrigger>
          <AccordionContent>
            The theme is controlled by the presence of the "dark" class higher
            in the DOM.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// Interactive FAQ Example
export const FAQExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A practical example of using the accordion for an FAQ section.',
      },
    },
  },
  render: () => (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Find answers to common questions about our design system.
        </p>
      </div>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How do I install this component library?
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">
              You can install our component library using npm or yarn:
            </p>
            <div className="bg-secondary p-2 rounded mb-2 font-mono text-sm">
              npm install @sanch-ui/core
            </div>
            <p>
              After installation, import the components and styles as needed in
              your project.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            Is this library compatible with React 19?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Yes, our component library is fully compatible with React 19. We
              have updated all components to work with React 19's new features,
              including the simplified ref pattern that no longer requires
              forwardRef.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>How do I customize the theme?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">
              Our library uses Tailwind v4 theme variables which can be
              customized in your CSS:
            </p>
            <div className="bg-secondary p-2 rounded font-mono text-sm mb-2">
              {`@theme {
    --primary: 224 76% 48%;
    --primary-foreground: 210 40% 98%;
    /* Add more custom variables */
  }`}
            </div>
            <p>
              This will override our default theme variables with your custom
              values.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            Can I use this library with Next.js?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              Yes, our component library works seamlessly with Next.js. We've
              designed it to be framework-agnostic while providing specific
              optimizations for Next.js applications, ensuring efficient
              server-side rendering and client-side hydration.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Where can I find documentation?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">
              Comprehensive documentation is available in multiple places:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Storybook (for component usage examples)</li>
              <li>
                Our documentation site at{' '}
                <span className="text-primary">docs.sanch-ui.com</span>
              </li>
              <li>
                README files within each component folder in the repository
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
