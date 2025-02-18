# Component Development Guidelines

## Component Structure

- Every component should be in its own directory under src/components/{atoms|molecules|organisms}
- Directory structure:
  component-name/
  ├── index.tsx # Main component
  ├── styles.ts # Styles (if needed)
  ├── types.ts # TypeScript interfaces/types
  ├── utils.ts # Helper functions
  ├── component.test.tsx # Tests
  └── component.stories.tsx # Storybook stories

## Naming Conventions

- Components: PascalCase (e.g., Button, TextField)
- Props interfaces: ComponentNameProps (e.g., ButtonProps)
- Event handlers: handleEventName (e.g., handleClick, handleChange)
- Internal functions: camelCase
- CSS classes: kebab-case

## Props Guidelines

- Common prop patterns:
- variant: Component variations ('default' | 'secondary' | 'outline' etc.)
- size: Component sizes ('sm' | 'md' | 'lg')
- className: For external styling
- disabled: For disabled state
- children: For component content
- Always type props using TypeScript interfaces
- Document props using JSDoc comments

## Accessibility Requirements

- Use semantic HTML elements
- Include ARIA attributes when needed
- Ensure keyboard navigation
- Maintain proper focus management
- Support screen readers
- Follow WCAG 2.1 guidelines

## Component Checklist

- [ ] TypeScript types defined
- [ ] Props documented
- [ ] Accessibility features implemented
- [ ] Tests written
- [ ] Storybook stories created
- [ ] Responsive design considered
- [ ] Theme customization supported
