import { useState } from 'react';
import { Palette, Sun, Moon } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker, ColorPickerProps, ColorValue } from '@sanch-ui/core';

const meta: Meta<ColorPickerProps> = {
  title: 'Components/Forms/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current color value',
    },
    defaultMode: {
      control: 'select',
      options: ['hex', 'rgb', 'hsl'],
      description: 'Default color mode to display',
    },
    withAlpha: {
      control: 'boolean',
      description: 'Include alpha channel control',
    },
    showPresets: {
      control: 'boolean',
      description: 'Show or hide color presets',
    },
    showEyeDropper: {
      control: 'boolean',
      description: 'Show eyedropper tool (if browser supports it)',
    },
    showFormatToggle: {
      control: 'boolean',
      description: 'Show color format switcher',
    },
    showRecentColors: {
      control: 'boolean',
      description: 'Display recently used colors',
    },
    maxRecentColors: {
      control: 'number',
      description: 'Maximum number of recent colors to store',
    },
    returnFormat: {
      control: 'select',
      options: ['auto', 'hex', 'rgb', 'hsl'],
      description: 'Format to return color value in',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    showCopyButton: {
      control: 'boolean',
      description: 'Show copy button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Component size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base example
export const Default: Story = {
  args: {
    value: '#3B82F6',
    defaultMode: 'hex',
    withAlpha: true,
    showPresets: true,
    showEyeDropper: true,
    showFormatToggle: true,
    showRecentColors: true,
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Small</p>
        <ColorPicker size="sm" value="#FF5733" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Medium (Default)</p>
        <ColorPicker size="md" value="#33A1FF" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Large</p>
        <ColorPicker size="lg" value="#A233FF" />
      </div>
    </div>
  ),
};

// Different color modes
export const ColorModes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">HEX Mode</p>
        <ColorPicker
          defaultMode="hex"
          value="#4CAF50"
          showFormatToggle={false}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">RGB Mode</p>
        <ColorPicker
          defaultMode="rgb"
          value="rgb(205, 92, 92)"
          showFormatToggle={false}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">HSL Mode</p>
        <ColorPicker
          defaultMode="hsl"
          value="hsl(291, 64%, 42%)"
          showFormatToggle={false}
        />
      </div>
    </div>
  ),
};

// With and without alpha
export const AlphaChannel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">With Alpha Channel</p>
        <ColorPicker value="rgba(75, 192, 192, 0.6)" withAlpha={true} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Without Alpha Channel</p>
        <ColorPicker value="#4BC0C0" withAlpha={false} />
      </div>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Normal</p>
        <ColorPicker value="#FF9800" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Disabled</p>
        <ColorPicker value="#FF9800" disabled />
      </div>
    </div>
  ),
};

// Feature toggles
export const FeatureToggles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Without Format Toggle</p>
        <ColorPicker value="#009688" showFormatToggle={false} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Without Presets</p>
        <ColorPicker value="#009688" showPresets={false} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Without Eye Dropper</p>
        <ColorPicker value="#009688" showEyeDropper={false} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Without Copy Button</p>
        <ColorPicker value="#009688" showCopyButton={false} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">Without Recent Colors</p>
        <ColorPicker value="#009688" showRecentColors={false} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium mb-2">
          Minimal (Only Color Selection)
        </p>
        <ColorPicker
          value="#009688"
          showFormatToggle={false}
          showPresets={false}
          showEyeDropper={false}
          showRecentColors={false}
        />
      </div>
    </div>
  ),
};

// Custom preset colors
export const CustomPresets: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm font-medium mb-2">Custom Color Presets</p>
      <ColorPicker
        value="#9C27B0"
        presets={[
          '#FF5252', // Red
          '#FF9800', // Orange
          '#FFEB3B', // Yellow
          '#66BB6A', // Green
          '#26C6DA', // Teal
          '#42A5F5', // Blue
          '#7E57C2', // Purple
          '#EC407A', // Pink
          '#78909C', // Blue Grey
          '#212121', // Black
          '#FAFAFA', // White
        ]}
      />
    </div>
  ),
};

// Advanced examples with state management
export const ColorPickerWithOutput: Story = {
  render: () => {
    const [color, setColor] = useState('#3B82F6');
    const [colorObj, setColorObj] = useState<ColorValue | null>(null);

    const handleColorChange = (value: string, obj: ColorValue) => {
      setColor(value);
      setColorObj(obj);
    };

    return (
      <div className="space-y-4 w-full max-w-md">
        <div className="flex items-center gap-4">
          <Palette className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Color Selection</h3>
        </div>

        <div className="flex gap-3 items-center">
          <div
            className="h-10 w-10 rounded-md border border-border"
            style={{ backgroundColor: color }}
          />
          <p className="text-sm font-mono">{color}</p>
        </div>

        <ColorPicker value={color} onChange={handleColorChange} />

        {colorObj && (
          <div className="mt-4 p-4 rounded-md bg-muted text-sm font-mono">
            <p className="mb-1">HEX: {colorObj.hex}</p>
            <p className="mb-1">
              RGB: rgba({colorObj.rgb.r}, {colorObj.rgb.g}, {colorObj.rgb.b},{' '}
              {colorObj.rgb.a.toFixed(2)})
            </p>
            <p>
              HSL: hsla({colorObj.hsl.h}, {colorObj.hsl.s}%, {colorObj.hsl.l}%,{' '}
              {colorObj.hsl.a.toFixed(2)})
            </p>
          </div>
        )}
      </div>
    );
  },
};

// Dark theme example
export const DarkTheme: Story = {
  render: () => (
    <div
      className="dark bg-background p-6 rounded-md"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <h3 className="text-lg font-semibold text-foreground">Dark Theme</h3>

      <div className="space-y-4">
        <p className="text-sm font-medium">Default Color Picker</p>
        <ColorPicker value="#6366F1" />

        <p className="text-sm font-medium mt-4">Without Alpha</p>
        <ColorPicker value="#8B5CF6" withAlpha={false} />
      </div>
    </div>
  ),
};

// Theme toggle example
export const ThemeToggle: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(false);
    const [color, setColor] = useState('#3B82F6');

    const toggleTheme = () => {
      setIsDark(!isDark);
    };

    return (
      <div
        className={`${isDark ? 'dark' : ''} bg-background p-6 rounded-md border border-border transition-colors duration-300`}
        style={{ maxWidth: '400px' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Theme Color Selector
          </h3>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-500" />
            )}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-full border border-border"
              style={{ backgroundColor: color }}
            />
            <p className="text-sm font-medium text-foreground">
              Selected theme color
            </p>
          </div>

          <ColorPicker
            value={color}
            onChange={(value) => setColor(value)}
            size="sm"
          />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div
              className="p-4 rounded-md border border-border transition-colors"
              style={{
                backgroundColor: `color-mix(in oklab, ${color} 15%, var(--color-background))`,
              }}
            >
              <p className="text-sm font-medium text-foreground mb-2">
                Button Preview
              </p>
              <button
                className="px-4 py-2 rounded-md text-white transition-colors"
                style={{ backgroundColor: color }}
              >
                Primary Button
              </button>
            </div>

            <div
              className="p-4 rounded-md border border-border"
              style={{
                backgroundColor: `color-mix(in oklab, ${color} 5%, var(--color-background))`,
              }}
            >
              <p className="text-sm font-medium text-foreground mb-2">
                Text Preview
              </p>
              <p className="text-sm" style={{ color }}>
                This text uses your selected color.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
