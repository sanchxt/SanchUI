import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, TextareaProps } from '@sanch-ui/core';
import { useState } from 'react';

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
export const Outline: Story = {
  args: {
    placeholder: 'Outline Textarea',
    variant: 'outline',
  },
};

export const Filled: Story = {
  args: {
    placeholder: 'Filled Textarea',
    variant: 'filled',
  },
};

export const Flushed: Story = {
  args: {
    placeholder: 'Flushed Textarea',
    variant: 'flushed',
  },
};

export const Unstyled: Story = {
  args: {
    placeholder: 'Unstyled Textarea (no styling)',
    variant: 'unstyled',
  },
};

// states
export const Invalid: Story = {
  args: {
    placeholder: 'Invalid Textarea',
    isInvalid: true,
    defaultValue: 'This textarea contains invalid content',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled Textarea',
    disabled: true,
    defaultValue: 'This content cannot be edited',
  },
};

// sizes
export const SingleLine: Story = {
  args: {
    placeholder: 'Single line textarea',
    minRows: 1,
  },
};

export const MediumHeight: Story = {
  args: {
    placeholder: 'Medium height textarea',
    minRows: 5,
  },
};

export const LargeHeight: Story = {
  args: {
    placeholder: 'Large height textarea',
    minRows: 10,
  },
};

// auto-resize
export const AutoResize: Story = {
  args: {
    placeholder: 'Type something to see auto-resize in action...',
    autoResize: true,
    minRows: 2,
  },
};

export const AutoResizeWithMaxHeight: Story = {
  args: {
    placeholder: 'Type a lot to see scrollbar appear after maximum height...',
    autoResize: true,
    minRows: 2,
    maxRows: 6,
  },
};

// character count
export const WithCharacterCount: Story = {
  args: {
    placeholder: 'Type to see character count...',
    showCount: true,
  },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: 'Limited to 100 characters...',
    showCount: true,
    maxLength: 100,
  },
};

export const WithCounterPrefix: Story = {
  args: {
    placeholder: 'Type to see character count with prefix...',
    showCount: true,
    counterPrefix: 'Characters:',
  },
};

// extras
export const WithDarkTheme: Story = {
  render: (args) => (
    <div className="dark p-6 rounded-md bg-background">
      <Textarea
        {...args}
        placeholder="Dark theme textarea"
        showCount
        maxLength={200}
      />
    </div>
  ),
};

// interactive
export const LiveCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 280;

    return (
      <div className="w-full max-w-md space-y-1">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What's happening?"
          minRows={3}
          maxLength={maxLength}
          isInvalid={value.length > 250}
          showCount
        />
        <div
          className={`text-right text-xs ${
            value.length > 250
              ? 'text-destructive'
              : value.length > 200
                ? 'text-orange-500'
                : 'text-muted-foreground'
          }`}
        >
          {maxLength - value.length} characters remaining
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    return (
      <form className="w-96 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <input
            id="subject"
            className="w-full h-10 px-4 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            minRows={4}
            maxLength={500}
            showCount
            autoResize
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Send Message
        </button>
      </form>
    );
  },
};

export const RealTimeAutoResize: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="w-full max-w-md">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to see auto-resize in action..."
          minRows={2}
          autoResize
          className="border-dashed"
        />
        <div className="mt-4">
          <button
            onClick={() =>
              setValue(
                'This is a demonstration of auto-resize.\n\nAs you can see, the textarea grows as content is added.\n\nIt maintains a smooth user experience without requiring manual resizing.\n\nThis is particularly useful for comment forms, message inputs, and other areas where the amount of text may vary significantly.'
              )
            }
            className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80"
          >
            Fill with sample text
          </button>
          <button
            onClick={() => setValue('')}
            className="ml-2 rounded-md bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80"
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

export const ValidationExample: Story = {
  render: () => {
    const [bio, setBio] = useState('');
    const maxLength = 200;
    const minLength = 30;

    const getValidationState = () => {
      if (bio.length === 0) return 'empty';
      if (bio.length < minLength) return 'tooShort';
      if (bio.length > maxLength) return 'tooLong';
      return 'valid';
    };

    const validationState = getValidationState();

    return (
      <div className="w-full max-w-md space-y-2">
        <label className="text-sm font-medium block">
          Bio{' '}
          <span className="text-muted-foreground">(min {minLength} chars)</span>
        </label>

        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          minRows={3}
          isInvalid={
            validationState === 'tooShort' || validationState === 'tooLong'
          }
          autoResize
          maxLength={maxLength + 10} // Allow slightly over to show error state
          showCount
        />

        {validationState === 'tooShort' && (
          <p className="text-xs text-destructive">
            Please enter at least {minLength} characters (currently {bio.length}
            , need {minLength - bio.length} more)
          </p>
        )}

        {validationState === 'tooLong' && (
          <p className="text-xs text-destructive">
            Please keep your bio under {maxLength} characters (currently{' '}
            {bio.length}, remove {bio.length - maxLength})
          </p>
        )}

        {validationState === 'valid' && (
          <p className="text-xs text-success">Your bio looks great!</p>
        )}
      </div>
    );
  },
};

export const ExpandingFeedbackForm: Story = {
  render: () => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState<number | null>(null);

    return (
      <div className="w-full max-w-md p-6 border rounded-lg bg-card space-y-4">
        <h3 className="text-lg font-semibold">Share your feedback</h3>

        <div className="space-y-2">
          <label className="text-sm font-medium block">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${
                  rating && star <= rating
                    ? 'text-yellow-400'
                    : 'text-muted-foreground'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium block">Comments</label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what you think..."
            minRows={2}
            maxRows={10}
            autoResize
            showCount
            maxLength={500}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          disabled={!rating || !feedback.trim()}
        >
          Submit Feedback
        </button>
      </div>
    );
  },
};
