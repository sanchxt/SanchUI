import { useState } from 'react';
import { Button, Typography, Input, Checkbox, Divider } from '@sanch-ui/core';
import { Check } from 'lucide-react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <Typography variant="h1" className="mb-6">
          Sanch UI Demo
        </Typography>

        <section className="mb-8">
          <Typography variant="h2" className="mb-4">
            Buttons
          </Typography>
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="danger">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button disabled>Disabled Button</Button>
            <Button size="sm">Small Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </section>

        <Divider className="my-8" />

        <section className="mb-8">
          <Typography variant="h2" className="mb-4">
            Form Controls
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography variant="h1" className="mb-2">
                Input
              </Typography>
              <Input
                placeholder="Enter some text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div>
              <Typography variant="h2" className="mb-2">
                Checkbox
              </Typography>
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                label="Check me"
              />
            </div>
          </div>
        </section>

        <Divider className="my-8" />

        <Divider className="my-8" />

        <div className="mt-12 p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2">
            <Check className="text-green-500" size={20} />
            <Typography>
              Component library integration is working successfully!
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
