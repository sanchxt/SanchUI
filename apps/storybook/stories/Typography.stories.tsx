import type { Meta, StoryObj } from '@storybook/react';
import {
  Typography,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
  Blockquote,
  Lead,
  Large,
  Small,
  Muted,
  Subtle,
  TypographyProps,
} from '@sanch-ui/core';

const meta: Meta<TypographyProps> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'blockquote',
        'lead',
        'large',
        'small',
        'muted',
        'subtle',
      ],
      description: 'The variant of the typography',
      defaultValue: 'p',
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'muted',
        'accent',
        'destructive',
        'success',
      ],
      description: 'The color of the text',
      defaultValue: 'default',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'The weight of the text',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'The alignment of the text',
    },
    transform: {
      control: 'select',
      options: ['normal', 'uppercase', 'lowercase', 'capitalize'],
      description: 'The transform of the text',
    },
    truncate: {
      control: 'boolean',
      description: 'Whether to truncate text with an ellipsis if it overflows',
      defaultValue: false,
    },
    lineClamp: {
      control: 'number',
      description:
        'The number of lines to show before truncating with an ellipsis',
    },
    responsive: {
      control: 'boolean',
      description:
        'Whether to enable a responsive size reduction on smaller screens',
      defaultValue: true,
    },
    themedDark: {
      control: 'boolean',
      description: 'Whether the text follows the dark mode theme automatically',
      defaultValue: true,
    },
    as: {
      control: 'text',
      description:
        'HTML element to render (overrides default based on variant)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base example
export const Default: Story = {
  args: {
    variant: 'p',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <H5>Heading 5</H5>
      <H6>Heading 6</H6>
      <Paragraph>
        Paragraph: The quick brown fox jumps over the lazy dog.
      </Paragraph>
      <Blockquote>
        "This is a blockquote. Design is not just what it looks like and feels
        like. Design is how it works."
      </Blockquote>
      <Lead>
        This is a lead paragraph, often used for introductions or summaries.
      </Lead>
      <Large>
        This is large text, slightly bigger than normal paragraph text.
      </Large>
      <Small>
        This is small text, slightly smaller than normal paragraph text.
      </Small>
      <Muted>This is muted text, used for secondary information.</Muted>
      <Subtle>This is subtle text, even less prominent than muted text.</Subtle>
    </div>
  ),
};

// Color variations
export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography color="default">Default color</Typography>
      <Typography color="primary">Primary color</Typography>
      <Typography color="secondary">Secondary color</Typography>
      <Typography color="muted">Muted color</Typography>
      <Typography color="accent">Accent color</Typography>
      <Typography color="destructive">Destructive color</Typography>
      <Typography color="success">Success color</Typography>
    </div>
  ),
};

// Font weight variations
export const FontWeights: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography weight="normal">Normal weight</Typography>
      <Typography weight="medium">Medium weight</Typography>
      <Typography weight="semibold">Semibold weight</Typography>
      <Typography weight="bold">Bold weight</Typography>
    </div>
  ),
};

// Alignment variations
export const Alignment: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Typography align="left">
        This text is left-aligned. This is usually the default for most text
        elements.
      </Typography>
      <Typography align="center">
        This text is center-aligned. Useful for headings or important
        statements.
      </Typography>
      <Typography align="right">
        This text is right-aligned. Sometimes used for numerical data or dates.
      </Typography>
      <Typography align="justify">
        This text is justify-aligned. The text is spread out to ensure the left
        and right edges are aligned. This can improve readability for large
        blocks of text.
      </Typography>
    </div>
  ),
};

// Text transformations
export const TextTransformations: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography transform="normal">
        Normal case (no transformation)
      </Typography>
      <Typography transform="uppercase">Uppercase transformation</Typography>
      <Typography transform="lowercase">Lowercase transformation</Typography>
      <Typography transform="capitalize">Capitalize transformation</Typography>
    </div>
  ),
};

// Truncation example
export const Truncation: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <Typography variant="h5">Truncate with ellipsis:</Typography>
        <Typography truncate className="w-48">
          This is a long text that will be truncated with an ellipsis when it
          overflows the container width.
        </Typography>
      </div>

      <div>
        <Typography variant="h5">Line clamp examples:</Typography>
        <Typography lineClamp={1} className="border border-border p-2 mb-2">
          This text will be clamped to 1 line. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Proin euismod magna ut quam ultricies,
          eget efficitur nisl tincidunt.
        </Typography>
        <Typography lineClamp={2} className="border border-border p-2 mb-2">
          This text will be clamped to 2 lines. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Proin euismod magna ut quam ultricies,
          eget efficitur nisl tincidunt. Suspendisse potenti. Quisque consequat
          justo id urna feugiat ultricies.
        </Typography>
        <Typography lineClamp={3} className="border border-border p-2">
          This text will be clamped to 3 lines. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Proin euismod magna ut quam ultricies,
          eget efficitur nisl tincidunt. Suspendisse potenti. Quisque consequat
          justo id urna feugiat ultricies. Fusce nec libero vel magna vehicula
          fringilla et id orci. Morbi elementum magna id risus bibendum, ac
          pulvinar nisi vehicula.
        </Typography>
      </div>
    </div>
  ),
};

// Responsive behavior (requires viewport resize to see effect)
export const ResponsiveTypography: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h2" responsive={true}>
        This heading is responsive (default)
      </Typography>
      <Typography variant="h2" responsive={false}>
        This heading is NOT responsive
      </Typography>
      <div className="text-sm text-muted-foreground">
        <p>Resize the viewport to see the difference.</p>
        <p>The responsive heading will be smaller on mobile devices.</p>
      </div>
    </div>
  ),
};

// Dark theme example
export const DarkTheme: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-background rounded-md dark">
      <H3 className="mb-4">Typography in Dark Theme</H3>

      <div className="space-y-2">
        <Typography variant="p">Default paragraph in dark mode</Typography>
        <Typography variant="p" color="primary">
          Primary color in dark mode
        </Typography>
        <Typography variant="p" color="muted">
          Muted color in dark mode
        </Typography>
        <Typography variant="p" color="destructive">
          Destructive color in dark mode
        </Typography>
      </div>

      <div className="mt-4">
        <Typography variant="p" themedDark={false} className="text-white">
          This text has dark theming disabled (manually set to white)
        </Typography>
      </div>
    </div>
  ),
};

// Typography as different HTML elements
export const CustomElements: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h3" as="div">
        This is an H3 variant rendered as a div
      </Typography>

      <Typography variant="p" as="span">
        This is a paragraph variant rendered as a span
      </Typography>

      <Typography variant="blockquote" as="div">
        This is a blockquote variant rendered as a div
      </Typography>
    </div>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      {/* Blog post example */}
      <div className="space-y-4">
        <H4>Blog Post Example</H4>
        <div className="p-4 border border-border rounded-md space-y-4">
          <H2>The Future of Web Development</H2>
          <Small color="muted">Posted on March 30, 2025 · 5 min read</Small>
          <Lead>
            As we move further into 2025, new patterns and technologies continue
            to reshape how we build for the web.
          </Lead>
          <Paragraph>
            The landscape of web development is constantly evolving. With the
            rise of AI-assisted coding and new frameworks that prioritize
            developer experience, we're seeing a paradigm shift in how
            applications are built and maintained.
          </Paragraph>
          <Blockquote>
            "The best way to predict the future is to invent it." — Alan Kay
          </Blockquote>
          <Paragraph>
            As these tools mature, we can expect to see even more innovation in
            the coming years.
          </Paragraph>
        </div>
      </div>

      {/* Product card example */}
      <div className="space-y-4">
        <H4>Product Card Example</H4>
        <div className="p-4 border border-border rounded-md space-y-2 max-w-xs">
          <Typography
            color="primary"
            transform="uppercase"
            weight="semibold"
            className="text-xs"
          >
            Limited Edition
          </Typography>
          <H5>Premium Wireless Earbuds</H5>
          <Typography color="muted">
            High-fidelity sound with active noise cancellation
          </Typography>
          <Typography weight="bold" className="text-lg">
            $199.99
          </Typography>
          <Muted>
            <s>$249.99</s> · 20% off
          </Muted>
        </div>
      </div>

      {/* Error message example */}
      <div className="space-y-4">
        <H4>Error Message Example</H4>
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md space-y-2">
          <Typography color="destructive" weight="semibold">
            Unable to process payment
          </Typography>
          <Typography>
            Your credit card was declined. Please check your card details and
            try again.
          </Typography>
          <Small color="destructive">Error code: PAYMENT_FAILED_001</Small>
        </div>
      </div>
    </div>
  ),
};

// Combinations
export const Combinations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <H4 className="mb-2">Color + Weight</H4>
        <div className="grid grid-cols-2 gap-2">
          <Typography color="primary" weight="bold">
            Primary Bold
          </Typography>
          <Typography color="destructive" weight="semibold">
            Destructive Semibold
          </Typography>
          <Typography color="success" weight="medium">
            Success Medium
          </Typography>
          <Typography color="muted" weight="normal">
            Muted Normal
          </Typography>
        </div>
      </div>

      <div>
        <H4 className="mb-2">Transform + Alignment</H4>
        <div className="space-y-2">
          <Typography transform="uppercase" align="center">
            Uppercase Centered
          </Typography>
          <Typography transform="capitalize" align="right">
            capitalized Right-aligned
          </Typography>
        </div>
      </div>

      <div>
        <H4 className="mb-2">Variant + Color + Transform</H4>
        <div className="space-y-2">
          <Typography variant="h3" color="primary" transform="uppercase">
            Primary Uppercase H3
          </Typography>
          <Typography variant="small" color="muted" transform="lowercase">
            MUTED LOWERCASE SMALL
          </Typography>
        </div>
      </div>
    </div>
  ),
};
