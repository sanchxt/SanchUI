Below is a comprehensive `README.md` for your `Drawer` component, structured similarly to the `Skeleton` component's README for consistency and clarity.

---

# Drawer Component

A flexible and accessible sliding drawer component for displaying content from any edge of the screen, complete with customizable animations, positioning, and behavior.

## Features

- Configurable slide-in position (left, right, top, bottom)
- Multiple size options (sm, md, lg, xl, full)
- Optional backdrop with click-to-close functionality
- Smooth slide animations with customizable duration
- Accessible keyboard navigation (Escape key, focus trapping)
- Portal rendering support for better stacking context
- Scroll locking when open
- Optional header, footer, and close button
- Dark mode compatible

## Usage

```tsx
import { Drawer } from '@your-ui-library/drawer';

// Basic usage
<Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <p>Drawer content goes here</p>
</Drawer>

// With header and footer
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="left"
  size="lg"
  header="Drawer Title"
  footer={<button onClick={() => setIsOpen(false)}>Close</button>}
>
  <p>Drawer content</p>
</Drawer>
```

## Component

### Drawer

The main drawer component for sliding content overlays.

| **Prop**            | **Type**                               | **Default** | **Description**                                   |
| ------------------- | -------------------------------------- | ----------- | ------------------------------------------------- |
| isOpen              | boolean                                | -           | Controls if the drawer is open                    |
| onClose             | () => void                             | -           | Callback when the drawer is closed                |
| position            | 'left' \| 'right' \| 'top' \| 'bottom' | 'right'     | Position from which the drawer slides in          |
| size                | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md'        | Size of the drawer                                |
| className           | string                                 | ''          | Custom class for the drawer container             |
| contentClassName    | string                                 | ''          | Custom class for the drawer content               |
| backdropClassName   | string                                 | ''          | Custom class for the backdrop/overlay             |
| closeOnClickOutside | boolean                                | true        | Closes drawer when clicking outside               |
| closeOnEsc          | boolean                                | true        | Closes drawer when pressing Escape key            |
| usePortal           | boolean                                | true        | Renders drawer in a portal (appended to body)     |
| showBackdrop        | boolean                                | true        | Shows the backdrop/overlay                        |
| id                  | string                                 | undefined   | ID for the drawer element                         |
| animationDuration   | number                                 | 250         | Duration of the slide animation (in milliseconds) |
| lockScroll          | boolean                                | true        | Locks body scroll when drawer is open             |
| children            | React.ReactNode                        | -           | Content of the drawer                             |
| ref                 | React.RefObject<HTMLDivElement>        | undefined   | Ref to the drawer element                         |
| hasCloseButton      | boolean                                | true        | Shows a close button in the header                |
| header              | React.ReactNode                        | undefined   | Content for the header section                    |
| footer              | React.ReactNode                        | undefined   | Content for the footer section                    |

All other standard HTML attributes for divs can also be passed as props via the `rest` parameter.

### Size Options

The `size` prop maps to the following dimensions based on position:

| **Size** | **Left/Right**                      | **Top/Bottom**    |
| -------- | ----------------------------------- | ----------------- |
| sm       | `w-64` (256px)                      | `h-64` (256px)    |
| md       | `w-80` (320px)                      | `h-80` (320px)    |
| lg       | `w-96` (384px)                      | `h-96` (384px)    |
| xl       | `w-1/3` (33.33%)                    | `h-1/2` (50%)     |
| full     | `w-full sm:w-1/2 md:w-2/5 lg:w-1/3` | `h-full sm:h-1/2` |

## Accessibility

This component adheres to accessibility best practices:

- Uses `role="dialog"` and `aria-modal="true"` for screen reader compatibility
- Traps focus within the drawer when open, with proper tab navigation
- Supports Escape key to close (configurable)
- Restores focus to the previously active element after closing
- Uses `aria-hidden` to manage visibility states appropriately
- Close button includes `aria-label` for clarity

## Examples

### Basic Drawer

```tsx
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsOpen(true)}>Open Drawer</button>
    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <p>This is a basic drawer sliding from the right.</p>
    </Drawer>
  </>
);
```

### Drawer with Header and Footer

```tsx
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsOpen(true)}>Open Drawer</button>
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="bottom"
      size="md"
      header="Settings"
      footer={
        <div className="flex gap-2">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={() => setIsOpen(false)}>Save</button>
        </div>
      }
    >
      <p>Adjust your settings here.</p>
    </Drawer>
  </>
);
```

### Full-Width Drawer without Backdrop

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="top"
  size="full"
  showBackdrop={false}
  animationDuration={400}
>
  <p>This drawer takes up the full width without a backdrop.</p>
</Drawer>
```

### Custom Styled Drawer

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="left"
  size="lg"
  className="bg-gray-900 text-white"
  contentClassName="p-6"
  backdropClassName="bg-opacity-80"
  header={<h2 className="text-xl">Custom Drawer</h2>}
>
  <p>Styled drawer with custom classes.</p>
</Drawer>
```

### Form inside Drawer

```tsx
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsOpen(true)}>Open Form</button>
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      header="Add Item"
      footer={
        <button type="submit" form="drawer-form">
          Submit
        </button>
      }
    >
      <form
        id="drawer-form"
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(false);
        }}
      >
        <label>
          Name:
          <input type="text" className="border p-2 w-full" />
        </label>
      </form>
    </Drawer>
  </>
);
```

## Behavior Notes

- The drawer mounts/unmounts from the DOM based on `isOpen`, with a slight delay to allow animations
- Focus is trapped within the drawer and restored to the previous element on close
- Body scroll is locked by default when open (configurable via `lockScroll`)
- Animation duration applies to both the drawer slide and backdrop fade
- The `full` size adapts responsively across breakpoints for better usability
