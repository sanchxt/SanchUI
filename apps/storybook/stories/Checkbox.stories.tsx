import { useState } from 'react';
import { Checkbox, CheckboxProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<CheckboxProps> = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
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
    <div className="dark p-6 rounded-md bg-background">
      <Checkbox {...args} label="Dark theme checkbox" />
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
      <div className="space-y-2">
        <h3 className="text-lg font-medium mb-2">Select options:</h3>
        <div className="space-y-2">
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
        <p className="text-sm text-muted-foreground mt-2">
          Selected: {selected.join(', ')}
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
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Select fruits:</h3>

        <Checkbox
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={handleParentChange}
          label="All fruits"
          size="md"
        />

        <div className="ml-6 space-y-1 border-l pl-6">
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
      <form className="w-80 space-y-4" onSubmit={(e) => e.preventDefault()}>
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
      },
      {
        id: 'analytics',
        name: 'Analytics',
        description: 'Detailed usage statistics',
      },
      {
        id: 'api',
        name: 'API Access',
        description: 'Full API access for developers',
      },
    ];

    return (
      <div className="space-y-4 w-80">
        <h3 className="text-lg font-medium">Select additional features:</h3>

        <div className="space-y-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`border rounded-md p-4 cursor-pointer transition-colors ${
                selected.includes(feature.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-input hover:border-primary/50'
              }`}
              onClick={() => toggleFeature(feature.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selected.includes(feature.id)}
                  className="mt-1"
                  onChange={() => {}} // Handled by container click
                />
                <div>
                  <h4 className="font-medium">{feature.name}</h4>
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
            className="px-3 h-10 rounded-md bg-primary text-primary-foreground"
          >
            Add
          </button>
        </div>

        <div className="space-y-2 border rounded-md p-3">
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
