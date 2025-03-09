import { Select, SelectOption, SelectProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertCircle,
  Check,
  ChevronDown,
  CreditCard,
  FileText,
  Globe,
  Mail,
  Map,
  User,
} from 'lucide-react';
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

// variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div className="space-y-6">
        <p className="text-sm font-medium">Outline (Default)</p>
        <Select
          options={countriesData}
          variant="outline"
          leftAddon={<Globe className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Filled</p>
        <Select
          options={countriesData}
          variant="filled"
          leftAddon={<Globe className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Flushed</p>
        <Select
          options={countriesData}
          variant="flushed"
          leftAddon={<Globe className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Unstyled</p>
        <Select options={countriesData} variant="unstyled" />
      </div>
    </div>
  ),
};

// sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium">Small</p>
        <Select
          options={countriesData}
          selectSize="sm"
          leftAddon={<Globe className="h-3 w-3" />}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Medium (Default)</p>
        <Select
          options={countriesData}
          selectSize="md"
          leftAddon={<Globe className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Large</p>
        <Select
          options={countriesData}
          selectSize="lg"
          leftAddon={<Globe className="h-5 w-5" />}
        />
      </div>
    </div>
  ),
};

// states
export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium">Default</p>
        <Select options={countriesData} />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Invalid</p>
        <Select
          options={countriesData}
          isInvalid
          leftAddon={<AlertCircle className="h-4 w-4" />}
        />
        <p className="text-xs text-destructive">Please select a country</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Disabled</p>
        <Select
          options={countriesData}
          disabled
          leftAddon={<Globe className="h-4 w-4" />}
        />
      </div>
    </div>
  ),
};

// with addons
export const WithAddons: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div className="space-y-2">
        <p className="text-sm font-medium">With Left Addon</p>
        <Select
          options={countriesData}
          leftAddon={<Globe className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">With Right Addon</p>
        <Select
          options={countriesData}
          rightAddon={<Check className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">With Both Addons</p>
        <Select
          options={countriesData}
          leftAddon={<Globe className="h-4 w-4" />}
          rightAddon={<Check className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">With Custom Chevron</p>
        <Select
          options={countriesData}
          chevronIcon={<ChevronDown className="h-4 w-4" />}
        />
      </div>
    </div>
  ),
};

// children instead of options prop
export const WithChildren: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <p className="text-sm font-medium">With Child Options</p>
      <Select>
        <option value="" disabled>
          Select a color
        </option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
      </Select>
    </div>
  ),
};

// grouped options
export const WithGroupedOptions: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <p className="text-sm font-medium">With Option Groups</p>
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
  ),
};

// dark theme example
export const DarkTheme: Story = {
  render: () => (
    <div
      className="dark bg-background rounded-md"
      style={{ display: 'grid', gap: '1.5rem', padding: '1rem' }}
    >
      <h3 className="text-lg font-semibold text-foreground">Dark Theme</h3>

      <div className="space-y-4">
        <Select
          options={countriesData}
          variant="outline"
          leftAddon={<Globe className="h-4 w-4" />}
        />

        <Select
          options={countriesData}
          variant="filled"
          leftAddon={<Globe className="h-4 w-4" />}
        />

        <Select
          options={countriesData}
          variant="flushed"
          leftAddon={<Globe className="h-4 w-4" />}
        />

        <Select
          options={countriesData}
          isInvalid
          leftAddon={<AlertCircle className="h-4 w-4" />}
        />
      </div>
    </div>
  ),
};

// controlled
export const Controlled: Story = {
  render: () => {
    const [color, setColor] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setColor(e.target.value);
    };

    const colorMap: Record<string, string> = {
      red: '#ef4444',
      green: '#22c55e',
      blue: '#3b82f6',
      yellow: '#eab308',
      purple: '#a855f7',
      orange: '#f97316',
      pink: '#ec4899',
    };

    return (
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <Select
          value={color}
          onChange={handleChange}
          options={colorsData}
          leftAddon={
            <div
              className="h-4 w-4 rounded-full transition-colors"
              style={{ backgroundColor: colorMap[color] || 'transparent' }}
            />
          }
        />

        <div
          className="p-4 flex items-center justify-center rounded-md border border-input h-24 transition-colors"
          style={{ backgroundColor: colorMap[color] || 'transparent' }}
        >
          <p
            className={`font-medium ${color && ['yellow', 'green'].includes(color) ? 'text-gray-800' : 'text-white'}`}
          >
            {color ? `Selected: ${color}` : 'No color selected'}
          </p>
        </div>
      </div>
    );
  },
};

// form example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      country: '',
      docType: '',
      email: '',
    });

    const [touched, setTouched] = useState({
      country: false,
      docType: false,
      email: false,
    });

    const handleChange = (
      e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    };

    const handleBlur = (
      e: React.FocusEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
      const { name } = e.target;
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    };

    const isValid = formData.country && formData.docType && formData.email;

    const docTypes: SelectOption[] = [
      { value: '', label: 'Select document type', disabled: true },
      { value: 'passport', label: 'Passport' },
      { value: 'id_card', label: 'ID Card' },
      { value: 'drivers_license', label: "Driver's License" },
      { value: 'residence_permit', label: 'Residence Permit' },
    ];

    return (
      <form
        className="border border-input rounded-md p-2"
        style={{ display: 'grid', gap: '1.5rem' }}
        onSubmit={(e) => e.preventDefault()}
      >
        <h3 className="text-lg font-semibold">Personal Information</h3>

        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country of Residence
          </label>
          <Select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.country && !formData.country}
            options={countriesData}
            leftAddon={<Globe className="h-4 w-4" />}
          />
          {touched.country && !formData.country && (
            <p className="text-xs text-destructive">
              Please select your country
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="docType" className="text-sm font-medium">
            ID Document Type
          </label>
          <Select
            id="docType"
            name="docType"
            value={formData.docType}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.docType && !formData.docType}
            options={docTypes}
            leftAddon={<FileText className="h-4 w-4" />}
          />
          {touched.docType && !formData.docType && (
            <p className="text-xs text-destructive">
              Please select a document type
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div className="flex">
            <div className="flex items-center justify-center h-10 px-3 rounded-l-md border border-r-0 border-input bg-muted/60 text-muted-foreground">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-10 px-4 flex-1 border border-input rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background"
              placeholder="your.email@example.com"
            />
          </div>
          {touched.email && !formData.email && (
            <p className="text-xs text-destructive">Please enter your email</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
    );
  },
};

// more examples
export const AdvancedExample: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      accountType: '',
      cardType: '',
      nationality: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const nextStep = () => {
      setStep((prev) => prev + 1);
    };

    const prevStep = () => {
      setStep((prev) => prev - 1);
    };

    const accountTypes: SelectOption[] = [
      { value: '', label: 'Select account type', disabled: true },
      { value: 'personal', label: 'Personal Account' },
      { value: 'business', label: 'Business Account' },
      { value: 'joint', label: 'Joint Account' },
    ];

    const cardTypes: SelectOption[] = [
      { value: '', label: 'Select card type', disabled: true },
      { value: 'visa', label: 'Visa Card' },
      { value: 'mastercard', label: 'Mastercard' },
      { value: 'amex', label: 'American Express' },
    ];

    return (
      <div className="w-96 p-6 border border-input rounded-lg shadow-sm">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Account Setup</h3>
            <span className="text-xs text-muted-foreground">
              Step {step} of 3
            </span>
          </div>

          <div className="w-full flex mb-6">
            <div
              className={`h-1 flex-1 rounded-l-full ${step >= 1 ? 'bg-primary' : 'bg-secondary'}`}
            ></div>
            <div
              className={`h-1 flex-1 ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`}
            ></div>
            <div
              className={`h-1 flex-1 rounded-r-full ${step >= 3 ? 'bg-primary' : 'bg-secondary'}`}
            ></div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="accountType" className="text-sm font-medium">
                Account Type
              </label>
              <Select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                options={accountTypes}
                leftAddon={<User className="h-4 w-4" />}
                isInvalid={!formData.accountType}
              />
              {!formData.accountType && (
                <p className="text-xs text-destructive">
                  Please select an account type
                </p>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={nextStep}
                disabled={!formData.accountType}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cardType" className="text-sm font-medium">
                Preferred Card Type
              </label>
              <Select
                id="cardType"
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                options={cardTypes}
                leftAddon={<CreditCard className="h-4 w-4" />}
                isInvalid={!formData.cardType}
              />
              {!formData.cardType && (
                <p className="text-xs text-destructive">
                  Please select a card type
                </p>
              )}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-md border border-input hover:bg-secondary/50"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={!formData.cardType}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="nationality" className="text-sm font-medium">
                Nationality
              </label>
              <Select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                options={countriesData}
                leftAddon={<Map className="h-4 w-4" />}
                isInvalid={!formData.nationality}
              />
              {!formData.nationality && (
                <p className="text-xs text-destructive">
                  Please select your nationality
                </p>
              )}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-md border border-input hover:bg-secondary/50"
              >
                Back
              </button>
              <button
                disabled={!formData.nationality}
                className="px-4 py-2 rounded-md bg-success text-success-foreground hover:bg-success/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-input">
          <h4 className="text-sm font-medium mb-2">Current Selection:</h4>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Account Type:</span>
              <span className="font-medium">
                {formData.accountType || 'Not selected'}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Card Type:</span>
              <span className="font-medium">
                {formData.cardType || 'Not selected'}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Nationality:</span>
              <span className="font-medium">
                {formData.nationality || 'Not selected'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  },
};
