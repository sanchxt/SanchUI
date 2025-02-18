# Sanch UI

A React component library built with TypeScript, Tailwind CSS, and Storybook.

## Features

- Type-safe components with TypeScript
- Tailwind CSS for styling
- Comprehensive test coverage
- Storybook documentation
- Modern React patterns (React 19)

## Stack

- React 19
- TypeScript
- Tailwind CSS
- Jest for testing
- Storybook
- PNPM for package management
- Changesets for versioning

## Setup

```bash
# Install dependencies
pnpm install

# Build packages
pnpm build

# Run tests
pnpm test

# Start Storybook
cd apps/storybook
pnpm dev
```

## Project Structure

```
sanch-ui/
├── apps/
│   ├── docs/           # Documentation site
│   └── storybook/      # Component playground
├── packages/
│   ├── cli/           # CLI tools
│   └── core/          # Core components
```

## Usage

```tsx
import { Button } from '@sanch-ui/core';

function App() {
  return (
    <Button variant="default" size="md">
      Click me
    </Button>
  );
}
```

## Development

```bash
# Watch mode for core package
pnpm --filter @sanch-ui/core dev

# Run tests in watch mode
pnpm --filter @sanch-ui/core test:watch

# Create a new changeset
pnpm changeset
```

## License

MIT
