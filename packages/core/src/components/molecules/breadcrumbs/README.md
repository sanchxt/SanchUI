# Breadcrumbs Component

An accessible navigation component that helps users understand their current location within a website's hierarchy.

## Features

- Fully accessible with proper ARIA attributes
- Responsive design with automatic collapsible behavior
- Customizable separators
- Support for home icon
- Truncation for long paths
- Visual indication of current page

## Usage

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@sanch-ui/core';

function MyComponent() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" isRoot>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

## Components

### Breadcrumb

The root container component.

| **Prop**     | **Type**  | **Default**        | **Description**                                  |
| ------------ | --------- | ------------------ | ------------------------------------------------ |
| separator    | ReactNode | `<ChevronRight />` | The separator between breadcrumb items           |
| collapsible  | boolean   | false              | Enables automatic collapsing of middle items     |
| maxItems     | number    | 0                  | Maximum number of items to show when collapsible |
| showHomeIcon | boolean   | false              | Shows home icon for the root item                |
| className    | string    | undefined          | Additional CSS classes                           |

### BreadcrumbList

The ordered list component that contains breadcrumb items.

| **Prop**  | **Type** | **Default** | **Description**        |
| --------- | -------- | ----------- | ---------------------- |
| className | string   | undefined   | Additional CSS classes |

### BreadcrumbItem

Individual breadcrumb item components.

| **Prop**  | **Type** | **Default** | **Description**                       |
| --------- | -------- | ----------- | ------------------------------------- |
| isCurrent | boolean  | false       | Whether this item is the current page |
| className | string   | undefined   | Additional CSS classes                |

### BreadcrumbLink

Link component for navigable breadcrumb items.

| **Prop**  | **Type** | **Default** | **Description**                         |
| --------- | -------- | ----------- | --------------------------------------- |
| asChild   | boolean  | false       | Whether to render as a child component  |
| isRoot    | boolean  | false       | Whether this link is the root/home link |
| href      | string   | required    | URL for the link                        |
| className | string   | undefined   | Additional CSS classes                  |

### BreadcrumbPage

Component for the current page (usually the last item).

| **Prop**  | **Type** | **Default** | **Description**        |
| --------- | -------- | ----------- | ---------------------- |
| className | string   | undefined   | Additional CSS classes |

### BreadcrumbSeparator

Visual separator between breadcrumb items.

| **Prop**  | **Type** | **Default** | **Description**        |
| --------- | -------- | ----------- | ---------------------- |
| className | string   | undefined   | Additional CSS classes |

### BreadcrumbEllipsis

Component that represents collapsed breadcrumb items.

| **Prop**  | **Type** | **Default** | **Description**                   |
| --------- | -------- | ----------- | --------------------------------- |
| count     | number   | undefined   | Number of collapsed items to show |
| className | string   | undefined   | Additional CSS classes            |

## Accessibility

This breadcrumbs component follows WCAG guidelines:

- Uses semantic HTML (`<nav>`, `<ol>`, `<li>`, `<a>`)
- Includes proper ARIA attributes (`aria-label`, `aria-current`)
- Ensures separators are hidden from screen readers with `aria-hidden="true"`
- Provides clear focus styles
- Includes descriptive text for the ellipsis/collapsed items

## Examples

### Basic Breadcrumbs

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### With Custom Separator

```tsx
<Breadcrumb separator="/">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### With Home Icon

```tsx
<Breadcrumb showHomeIcon>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/" isRoot>
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Collapsible Breadcrumbs

```tsx
<Breadcrumb collapsible maxItems={3}>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/" isRoot>
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/section">Section</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/section/category">Category</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/section/category/subcategory">
        Subcategory
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### With Custom Styling

```tsx
<Breadcrumb className="bg-muted p-2 rounded-md">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/" className="font-bold">
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```
