import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, TextareaProps } from '@sanch-ui/core';
import { useState } from 'react';
import { AlertCircle, AlertTriangle, Check, Send } from 'lucide-react';

const meta: Meta<TextareaProps> = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed', 'unstyled'],
      description: 'Changes the visual style of the textarea',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Displays the textarea in an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea',
    },
    autoResize: {
      control: 'boolean',
      description: 'Automatically adjusts the height to fit content',
    },
    minRows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Minimum number of rows to display',
    },
    maxRows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum number of rows before scrolling',
    },
    showCount: {
      control: 'boolean',
      description: 'Show a character count',
    },
    maxLength: {
      control: { type: 'number', min: 0 },
      description: 'Limits the number of characters',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    counterPrefix: {
      control: 'text',
      description: 'Text to display before the character count',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    placeholder: 'Enter your message here...',
    variant: 'outline',
    minRows: 3,
  },
};

// variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Outline (Default)</h3>
        <Textarea
          placeholder="Outline variant - the default style with a simple border"
          variant="outline"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Filled</h3>
        <Textarea
          placeholder="Filled variant - with a subtle background color"
          variant="filled"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Flushed</h3>
        <Textarea
          placeholder="Flushed variant - with only a bottom border"
          variant="flushed"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Unstyled</h3>
        <Textarea
          placeholder="Unstyled variant - without any styling"
          variant="unstyled"
        />
      </div>
    </div>
  ),
};

// states
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Default State</h3>
        <Textarea placeholder="Default state" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Focused State (click to see)</h3>
        <Textarea placeholder="Click here to see focus state" autoFocus />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Invalid/Error State</h3>
        <Textarea
          placeholder="This input has an error"
          isInvalid
          defaultValue="Invalid content that needs correction"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Disabled State</h3>
        <Textarea
          placeholder="This input is disabled"
          disabled
          defaultValue="This content cannot be edited"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Read-Only State</h3>
        <Textarea
          placeholder="This input is read-only"
          readOnly
          defaultValue="This content cannot be edited but can be selected and copied"
        />
      </div>
    </div>
  ),
};

// sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Single Line (minRows=1)</h3>
        <Textarea placeholder="Single line textarea" minRows={1} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Default Height (minRows=3)</h3>
        <Textarea placeholder="Default height textarea" minRows={3} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Medium Height (minRows=5)</h3>
        <Textarea placeholder="Medium height textarea" minRows={5} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Large Height (minRows=8)</h3>
        <Textarea placeholder="Large height textarea" minRows={8} />
      </div>
    </div>
  ),
};

// character count
export const CharacterCount: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Character Count</h3>
        <Textarea placeholder="Type to see character count..." showCount />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Maximum Length (100 chars)</h3>
        <Textarea
          placeholder="Limited to 100 characters..."
          showCount
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Counter Prefix</h3>
        <Textarea
          placeholder="Type to see character count with prefix..."
          showCount
          counterPrefix="Characters:"
        />
      </div>
    </div>
  ),
};

// auto resize
export const AutoResize: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Auto-Resize</h3>
        <Textarea
          placeholder="Type something to see auto-resize in action..."
          autoResize
          minRows={2}
        />
        <p className="text-xs text-muted-foreground">
          The textarea will automatically grow as you type more content
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Maximum Height</h3>
        <Textarea
          placeholder="Type a lot to see scrollbar appear after maximum height..."
          autoResize
          minRows={2}
          maxRows={6}
        />
        <p className="text-xs text-muted-foreground">
          The textarea will stop growing after 6 rows and show a scrollbar
          instead
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Auto-Resize with Sample Text</h3>
        <AutoResizeWithSample />
      </div>
    </div>
  ),
};

const AutoResizeWithSample = () => {
  const [value, setValue] = useState('');

  const sampleText = `This is a demonstration of auto-resize.

  As you can see, the textarea grows as content is added.

  It maintains a smooth user experience without requiring manual resizing.

  This is particularly useful for comment forms, message inputs, and other areas where the amount of text may vary significantly.`;

  return (
    <div>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Click 'Add sample text' to see auto-resize in action..."
        minRows={2}
        autoResize
        className="mb-2"
      />
      <div className="flex gap-2">
        <button
          onClick={() => setValue(sampleText)}
          className="text-xs px-3 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          Add sample text
        </button>
        <button
          onClick={() => setValue('')}
          className="text-xs px-3 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

// dark theme
export const DarkTheme: Story = {
  render: () => (
    <div className="dark p-6 rounded-md bg-background max-w-md space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Dark Theme</h3>

      <div className="space-y-4">
        <Textarea
          placeholder="Outline variant in dark mode"
          variant="outline"
        />

        <Textarea placeholder="Filled variant in dark mode" variant="filled" />

        <Textarea
          placeholder="With character counter in dark mode"
          showCount
          maxLength={200}
        />

        <Textarea placeholder="Error state in dark mode" isInvalid />
      </div>
    </div>
  ),
};

// live character counter with remaining chars
export const TwitterStyle: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 280;

    return (
      <div className="w-full max-w-md space-y-2 p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-2">Tweet composer</h3>

        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What's happening?"
          minRows={3}
          maxLength={maxLength + 20} // allow typing beyond limit to show error state
          autoResize
          maxRows={10}
          isInvalid={value.length > maxLength}
          showCount
        />

        <div className="flex justify-between items-center mt-2">
          <div
            className={`text-sm transition-colors ${
              value.length > maxLength
                ? 'text-destructive'
                : value.length > maxLength * 0.9
                  ? 'text-yellow-500 dark:text-yellow-400'
                  : 'text-muted-foreground'
            }`}
          >
            {value.length > maxLength ? (
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>{value.length - maxLength} characters over limit</span>
              </div>
            ) : (
              <span>{maxLength - value.length} remaining</span>
            )}
          </div>

          <button
            disabled={value.length === 0 || value.length > maxLength}
            className="inline-flex items-center justify-center rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  },
};

// feedback form with validation
export const FeedbackForm: Story = {
  render: () => {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const minLength = 20;
    const maxLength = 500;

    const isValid =
      feedback.length >= minLength && feedback.length <= maxLength;
    const isTooShort = feedback.length > 0 && feedback.length < minLength;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isValid) {
        setSubmitted(true);
      }
    };

    if (submitted) {
      return (
        <div className="w-full max-w-md p-6 border rounded-lg space-y-4 text-center">
          <div className="rounded-full bg-success/20 p-3 w-12 h-12 mx-auto flex items-center justify-center">
            <Check className="h-6 w-6 text-success" />
          </div>
          <h3 className="text-lg font-semibold">
            Thank you for your feedback!
          </h3>
          <p className="text-muted-foreground">
            Your comments have been submitted successfully.
          </p>
          <button
            onClick={() => {
              setFeedback('');
              setSubmitted(false);
            }}
            className="text-primary hover:underline"
          >
            Submit another response
          </button>
        </div>
      );
    }

    return (
      <form
        className="w-full max-w-md p-6 border rounded-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-lg font-semibold">Share your feedback</h3>
        <p className="text-sm text-muted-foreground">
          Please tell us about your experience using our product.
        </p>

        <div className="space-y-2">
          <label htmlFor="feedback" className="text-sm font-medium block">
            Your comments{' '}
            <span className="text-muted-foreground text-xs">
              ({minLength}-{maxLength} chars)
            </span>
          </label>

          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What did you like? What could be improved?"
            minRows={4}
            maxRows={10}
            autoResize
            showCount
            maxLength={maxLength}
            isInvalid={isTooShort}
          />

          {isTooShort && (
            <div className="flex items-center text-destructive text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>Please provide at least {minLength} characters</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Feedback
        </button>
      </form>
    );
  },
};

// another form example
export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <form
        className="w-full max-w-md space-y-4 p-6 border rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <h3 className="text-xl font-semibold">Contact Us</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              className="w-full h-10 px-3 rounded-md border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full h-10 px-3 rounded-md border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <input
            id="subject"
            className="w-full h-10 px-3 rounded-md border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Message subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleChange}
            minRows={4}
            maxRows={10}
            autoResize
            showCount
            maxLength={1000}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
          disabled={!formData.name || !formData.email || !formData.message}
        >
          Send Message
        </button>
      </form>
    );
  },
};

// all variants
export const ComprehensiveShowcase: Story = {
  render: () => {
    const variants = ['outline', 'filled', 'flushed', 'unstyled'] as const;

    return (
      <div className="max-w-4xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left font-medium">Variant / State</th>
              <th className="py-2 text-left font-medium">Default</th>
              <th className="py-2 text-left font-medium">Invalid</th>
              <th className="py-2 text-left font-medium">Disabled</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant} className="border-b">
                <td className="py-4 font-medium capitalize">{variant}</td>
                <td className="py-4 px-2">
                  <Textarea
                    placeholder={`${variant} variant`}
                    variant={variant}
                    minRows={2}
                  />
                </td>
                <td className="py-4 px-2">
                  <Textarea
                    placeholder={`${variant} invalid`}
                    variant={variant}
                    isInvalid
                    minRows={2}
                  />
                </td>
                <td className="py-4 px-2">
                  <Textarea
                    placeholder={`${variant} disabled`}
                    variant={variant}
                    disabled
                    minRows={2}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
