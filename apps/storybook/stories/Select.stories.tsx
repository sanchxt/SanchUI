import { Select, SelectOption, SelectProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import { Check, FileText, Globe } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<SelectProps> = {
  title: 'Components/Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed', 'unstyled'],
      description: 'Changes the visual style of the select',
    },
    selectSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Changes the size of the select',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Displays the select in an error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select',
    },
    leftAddon: {
      control: 'boolean',
      description: 'Toggle left addon (icon for demo)',
    },
    rightAddon: {
      control: 'boolean',
      description: 'Toggle right addon (icon for demo)',
    },
    options: {
      control: 'object',
      description: 'Options for the select',
    },
    chevronIcon: {
      control: false,
      description: 'Custom icon for the dropdown',
    },
  },
};

const countriesData: SelectOption[] = [
  { value: '', label: 'Select a country', disabled: true },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'br', label: 'Brazil' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
  { value: 'pe', label: 'Peru' },
  { value: 'cl', label: 'Chile' },
];

const colorsData: SelectOption[] = [
  { value: '', label: 'Select a color', disabled: true },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
];

export default meta;
type Story = StoryObj<typeof meta>;

// base
export const Default: Story = {
  args: {
    options: countriesData,
  },
};

// Variants
export const Outline: Story = {
  args: {
    options: countriesData,
    variant: 'outline',
  },
};

export const Filled: Story = {
  args: {
    options: countriesData,
    variant: 'filled',
  },
};

export const Flushed: Story = {
  args: {
    options: countriesData,
    variant: 'flushed',
  },
};

export const Unstyled: Story = {
  args: {
    options: countriesData,
    variant: 'unstyled',
  },
};

// sizes
export const Small: Story = {
  args: {
    options: countriesData,
    selectSize: 'sm',
  },
};

export const Medium: Story = {
  args: {
    options: countriesData,
    selectSize: 'md',
  },
};

export const Large: Story = {
  args: {
    options: countriesData,
    selectSize: 'lg',
  },
};

// states
export const Invalid: Story = {
  args: {
    options: countriesData,
    isInvalid: true,
  },
};

export const Disabled: Story = {
  args: {
    options: countriesData,
    disabled: true,
  },
};

// with Addons
export const WithLeftAddon: Story = {
  args: {
    options: countriesData,
    leftAddon: <Globe className="h-4 w-4 text-muted-foreground" />,
  },
};

export const WithRightAddon: Story = {
  args: {
    options: countriesData,
    rightAddon: <Check className="h-4 w-4 text-muted-foreground" />,
  },
};

export const WithBothAddons: Story = {
  args: {
    options: countriesData,
    leftAddon: <Globe className="h-4 w-4 text-muted-foreground" />,
    rightAddon: <Check className="h-4 w-4 text-muted-foreground" />,
  },
};

// custom Chevron
export const WithCustomChevron: Story = {
  args: {
    options: countriesData,
    chevronIcon: <Check className="h-4 w-4 text-muted-foreground" />,
  },
};

// children instead of options prop
export const WithChildren: Story = {
  render: (args) => (
    <Select {...args}>
      <option value="" disabled>
        Select a color
      </option>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="yellow">Yellow</option>
    </Select>
  ),
};

// dark theme
export const WithDarkTheme: Story = {
  render: (args) => (
    <div className="dark p-6 rounded-md bg-background">
      <Select
        {...args}
        options={countriesData}
        leftAddon={<Globe className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  ),
};

// controlled
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="w-72 space-y-4">
        <Select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          options={colorsData}
          leftAddon={
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: value || 'transparent' }}
            />
          }
        />
        <div className="text-sm">
          Selected color: <span className="font-medium">{value || 'None'}</span>
        </div>
      </div>
    );
  },
};

// form example
export const FormExample: Story = {
  render: () => {
    return (
      <form className="w-80 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country
          </label>
          <Select
            id="country"
            options={countriesData}
            leftAddon={<Globe className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="color" className="text-sm font-medium">
            Favorite Color
          </label>
          <Select id="color" options={colorsData} />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>
      </form>
    );
  },
};

// validation
export const ValidationExample: Story = {
  render: () => {
    const [country, setCountry] = useState('');
    const [touched, setTouched] = useState(false);
    const isValid = country !== '';
    const showError = touched && !isValid;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCountry(e.target.value);
      setTouched(true);
    };

    return (
      <div className="w-full max-w-sm space-y-2">
        <label htmlFor="country-select" className="text-sm font-medium">
          Country
        </label>
        <Select
          id="country-select"
          value={country}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          isInvalid={showError}
          options={countriesData}
          leftAddon={<Globe className="h-4 w-4 text-muted-foreground" />}
          rightAddon={
            country && isValid ? (
              <Check className="h-4 w-4 text-success" />
            ) : null
          }
        />
        {showError && (
          <p className="text-xs text-destructive">Please select a country</p>
        )}
      </div>
    );
  },
};

// advanced examples
export const GroupedOptionsExample: Story = {
  render: () => {
    return (
      <div className="w-80">
        <Select>
          <optgroup label="North America">
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="mx">Mexico</option>
          </optgroup>
          <optgroup label="South America">
            <option value="br">Brazil</option>
            <option value="ar">Argentina</option>
            <option value="co">Colombia</option>
          </optgroup>
          <optgroup label="Europe">
            <option value="uk">United Kingdom</option>
            <option value="fr">France</option>
            <option value="de">Germany</option>
          </optgroup>
        </Select>
      </div>
    );
  },
};

export const SelectWithCustomStyles: Story = {
  render: () => {
    return (
      <div className="w-80 p-4 bg-secondary rounded-lg">
        <Select
          options={[
            { value: '', label: 'Select document type...', disabled: true },
            { value: 'id', label: 'ID Card' },
            { value: 'passport', label: 'Passport' },
            { value: 'driving_license', label: 'Driving License' },
            { value: 'birth_certificate', label: 'Birth Certificate' },
          ]}
          leftAddon={<FileText className="h-4 w-4" />}
          className="border-2 rounded-lg shadow-sm"
          wrapperClassName="rounded-lg overflow-hidden shadow-lg"
        />
      </div>
    );
  },
};

export const SelectState: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      documentType: '',
      country: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
      <div className="w-80 space-y-6 p-4 border border-input rounded-md">
        <h3 className="text-lg font-medium">Document Verification</h3>

        <div className="space-y-2">
          <label htmlFor="doc-type" className="text-sm font-medium">
            Document Type
          </label>
          <Select
            id="doc-type"
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select document type...', disabled: true },
              { value: 'passport', label: 'Passport' },
              { value: 'id_card', label: 'ID Card' },
              { value: 'driving_license', label: 'Driving License' },
            ]}
            leftAddon={<FileText className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">
            Issuing Country
          </label>
          <Select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            isInvalid={!!formData.documentType && !formData.country}
            options={countriesData}
            leftAddon={<Globe className="h-4 w-4 text-muted-foreground" />}
          />
          {formData.documentType && !formData.country && (
            <p className="text-xs text-destructive">
              Please select the country that issued your{' '}
              {formData.documentType === 'passport'
                ? 'passport'
                : formData.documentType === 'id_card'
                  ? 'ID card'
                  : 'driving license'}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="button"
            disabled={!formData.documentType || !formData.country}
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    );
  },
};
