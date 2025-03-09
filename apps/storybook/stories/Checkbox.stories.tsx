import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxProps } from '@sanch-ui/core';

const meta: Meta<CheckboxProps> = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An elegant, accessible checkbox component with multiple states and customization options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Changes the size of the checkbox',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Displays the checkbox in an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Displays the checkbox in a checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Displays the checkbox in an indeterminate state',
    },
    label: {
      control: 'text',
      description: 'The label for the checkbox',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Where to render the label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    label: 'Checkbox option',
    size: 'md',
  },
};

// sizes
export const Small: Story = {
  args: {
    label: 'Small checkbox',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium checkbox',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large checkbox',
    size: 'lg',
  },
};

// states
export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    defaultChecked: true,
  },
};

export const DisabledIndeterminate: Story = {
  args: {
    label: 'Disabled indeterminate checkbox',
    disabled: true,
    indeterminate: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Invalid checkbox',
    isInvalid: true,
  },
};

// label
export const LabelStart: Story = {
  args: {
    label: 'Label at start',
    labelPlacement: 'start',
  },
};

export const LabelEnd: Story = {
  args: {
    label: 'Label at end',
    labelPlacement: 'end',
  },
};

// no label
export const NoLabel: Story = {
  args: {},
};

// dark theme
export const WithDarkTheme: Story = {
  render: (args) => (
    <div className="dark p-6 rounded-lg bg-background">
      <Checkbox {...args} label="Dark theme checkbox" />
    </div>
  ),
};

// theme comparison
export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-2xl">
      <div className="p-6 rounded-lg bg-background border flex flex-col gap-4">
        <h3 className="text-lg font-medium mb-2">Light Theme</h3>
        <div className="space-y-4">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Invalid" isInvalid />
        </div>
      </div>

      <div className="dark p-6 rounded-lg bg-background border flex flex-col gap-4">
        <h3 className="text-lg font-medium text-foreground mb-2">Dark Theme</h3>
        <div className="space-y-4">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Invalid" isInvalid />
        </div>
      </div>
    </div>
  ),
};

// interactive
export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['option1']);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (selected.includes(value)) {
        setSelected(selected.filter((item) => item !== value));
      } else {
        setSelected([...selected, value]);
      }
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-2">Select options:</h3>
        <div className="space-y-3 p-4 border rounded-lg">
          <Checkbox
            value="option1"
            checked={selected.includes('option1')}
            onChange={handleChange}
            label="Option 1"
          />
          <Checkbox
            value="option2"
            checked={selected.includes('option2')}
            onChange={handleChange}
            label="Option 2"
          />
          <Checkbox
            value="option3"
            checked={selected.includes('option3')}
            onChange={handleChange}
            label="Option 3"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Selected: {selected.join(', ') || 'None'}
        </p>
      </div>
    );
  },
};

// indeterminate (parent-child)
export const IndeterminateExample: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
      apple: false,
      banana: false,
      orange: false,
    });

    const allChecked = Object.values(checkedItems).every(Boolean);
    const isIndeterminate =
      Object.values(checkedItems).some(Boolean) && !allChecked;

    const handleParentChange = () => {
      const newState = !allChecked;
      const updatedItems: Record<string, boolean> = {};

      Object.keys(checkedItems).forEach((key) => {
        updatedItems[key] = newState;
      });

      setCheckedItems(updatedItems);
    };

    const handleChildChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems({
        ...checkedItems,
        [e.target.value]: e.target.checked,
      });
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select fruits:</h3>

        <Checkbox
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={handleParentChange}
          label={<span className="font-medium">All fruits</span>}
          size="md"
        />

        <div className="ml-6 space-y-2 border-l-2 border-primary/20 pl-4">
          <Checkbox
            value="apple"
            checked={checkedItems.apple}
            onChange={handleChildChange}
            label="Apple"
            size="sm"
          />
          <Checkbox
            value="banana"
            checked={checkedItems.banana}
            onChange={handleChildChange}
            label="Banana"
            size="sm"
          />
          <Checkbox
            value="orange"
            checked={checkedItems.orange}
            onChange={handleChildChange}
            label="Orange"
            size="sm"
          />
        </div>

        <div className="text-sm text-muted-foreground pt-2">
          {Object.entries(checkedItems).filter(([_, v]) => v).length} of{' '}
          {Object.keys(checkedItems).length} selected
        </div>
      </div>
    );
  },
};

// form
export const FormExample: Story = {
  render: () => {
    const [formState, setFormState] = useState({
      terms: false,
      newsletter: false,
      marketing: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setFormState({
        ...formState,
        [name]: checked,
      });
    };

    return (
      <form
        className="w-80 space-y-4 p-4 border rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <h3 className="text-lg font-medium">Account preferences</h3>

        <div className="space-y-3 pt-2">
          <Checkbox
            name="terms"
            checked={formState.terms}
            onChange={handleChange}
            label={
              <span className="text-sm">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </span>
            }
            isInvalid={!formState.terms}
          />

          <Checkbox
            name="newsletter"
            checked={formState.newsletter}
            onChange={handleChange}
            label="Subscribe to our newsletter"
          />

          <Checkbox
            name="marketing"
            checked={formState.marketing}
            onChange={handleChange}
            label="Receive marketing emails"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          disabled={!formState.terms}
        >
          Create account
        </button>

        {!formState.terms && (
          <p className="text-xs text-destructive">
            You must agree to the terms to continue
          </p>
        )}
      </form>
    );
  },
};

// custom checkbox card
export const CheckboxCards: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleFeature = (id: string) => {
      if (selected.includes(id)) {
        setSelected(selected.filter((item) => item !== id));
      } else {
        setSelected([...selected, id]);
      }
    };

    const features = [
      {
        id: 'backup',
        name: 'Auto Backup',
        description: 'Automatic daily backups',
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        ),
      },
      {
        id: 'analytics',
        name: 'Analytics',
        description: 'Detailed usage statistics',
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        ),
      },
      {
        id: 'api',
        name: 'API Access',
        description: 'Full API access for developers',
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        ),
      },
    ];

    return (
      <div className="space-y-4 w-80">
        <h3 className="text-lg font-medium">Select additional features:</h3>

        <div className="space-y-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selected.includes(feature.id)
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-input hover:border-primary/30'
              }`}
              onClick={() => toggleFeature(feature.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selected.includes(feature.id)}
                  className="mt-1"
                  onChange={() => {}} // Handled by container click
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">{feature.icon}</span>
                    <h4 className="font-medium">{feature.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {selected.length === 0
            ? 'No features selected'
            : `Selected features: ${selected.length}`}
        </p>
      </div>
    );
  },
};

// todo list example
export const TodoList: Story = {
  render: () => {
    const [todos, setTodos] = useState([
      { id: 1, text: 'Learn React', completed: true },
      { id: 2, text: 'Build a UI library', completed: false },
      { id: 3, text: 'Write documentation', completed: false },
    ]);

    const [newTodo, setNewTodo] = useState('');

    const toggleTodo = (id: number) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };

    const addTodo = () => {
      if (newTodo.trim() === '') return;
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    };

    return (
      <div className="w-80 space-y-4">
        <h3 className="text-lg font-medium">Todo List</h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 h-10 px-3 rounded-md border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="px-3 h-10 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Add
          </button>
        </div>

        <div className="space-y-2 border rounded-lg p-3">
          {todos.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">No tasks yet</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-2 py-1">
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                >
                  {todo.text}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          {todos.filter((t) => t.completed).length} of {todos.length} tasks
          completed
        </div>
      </div>
    );
  },
};
