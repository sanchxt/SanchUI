import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './index';

describe('Accordion', () => {
  // Basic rendering tests
  describe('rendering', () => {
    test('renders accordion with default props', () => {
      render(
        <Accordion data-testid="accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('accordion')).toBeInTheDocument();
      expect(screen.getByText('Trigger 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeVisible();
    });

    test('renders multiple accordion items', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText('Trigger 1')).toBeInTheDocument();
      expect(screen.getByText('Trigger 2')).toBeInTheDocument();
    });
  });

  // Functionality tests
  describe('functionality', () => {
    test('expands when trigger is clicked (single type)', async () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.queryByText('Content 1')).not.toBeVisible();

      fireEvent.click(screen.getByText('Trigger 1'));

      // Wait for animation
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
      });
    });

    test('collapses when trigger is clicked again (single type with collapsible=true)', async () => {
      render(
        <Accordion collapsible={true}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Click to expand
      fireEvent.click(screen.getByText('Trigger 1'));
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
      });

      // Click to collapse
      fireEvent.click(screen.getByText('Trigger 1'));
      await waitFor(() => {
        expect(screen.queryByText('Content 1')).not.toBeVisible();
      });
    });

    test('does not collapse when trigger is clicked again (single type with collapsible=false)', async () => {
      render(
        <Accordion collapsible={false}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Click to expand
      fireEvent.click(screen.getByText('Trigger 1'));
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
      });

      // Click again shouldn't collapse
      fireEvent.click(screen.getByText('Trigger 1'));
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
      });
    });

    test('handles multiple type accordion correctly', async () => {
      render(
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Expand first item
      fireEvent.click(screen.getByText('Trigger 1'));
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
      });

      // Expand second item while first is still expanded
      fireEvent.click(screen.getByText('Trigger 2'));
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
        expect(screen.getByText('Content 2')).toBeVisible();
      });

      // Collapse first item while second remains expanded
      fireEvent.click(screen.getByText('Trigger 1'));
      await waitFor(() => {
        expect(screen.queryByText('Content 1')).not.toBeVisible();
        expect(screen.getByText('Content 2')).toBeVisible();
      });
    });
  });

  // Controlled mode tests
  describe('controlled mode', () => {
    test('respects value prop in controlled mode', async () => {
      const handleValueChange = jest.fn();

      const { rerender } = render(
        <Accordion value="item-1" onValueChange={handleValueChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Item 1 should be expanded initially
      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.queryByText('Content 2')).not.toBeVisible();

      // Click item 2
      fireEvent.click(screen.getByText('Trigger 2'));

      // Verify callback was called with correct value
      expect(handleValueChange).toHaveBeenCalledWith('item-2');

      // The UI shouldn't change yet since we're in controlled mode
      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.queryByText('Content 2')).not.toBeVisible();

      // Now simulate the parent updating the value prop
      rerender(
        <Accordion value="item-2" onValueChange={handleValueChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Now item 2 should be expanded instead
      await waitFor(() => {
        expect(screen.queryByText('Content 1')).not.toBeVisible();
        expect(screen.getByText('Content 2')).toBeVisible();
      });
    });

    test('respects multiple values in controlled multiple mode', async () => {
      const handleValueChange = jest.fn();

      const { rerender } = render(
        <Accordion
          type="multiple"
          value={['item-1']}
          onValueChange={handleValueChange}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Item 1 should be expanded initially
      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.queryByText('Content 2')).not.toBeVisible();

      // Click item 2
      fireEvent.click(screen.getByText('Trigger 2'));

      // Verify callback was called with both items
      expect(handleValueChange).toHaveBeenCalledWith(['item-1', 'item-2']);

      // Simulate parent updating the value prop to include both items
      rerender(
        <Accordion
          type="multiple"
          value={['item-1', 'item-2']}
          onValueChange={handleValueChange}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Both items should be expanded
      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeVisible();
        expect(screen.getByText('Content 2')).toBeVisible();
      });
    });
  });

  // Uncontrolled mode tests with defaultValue
  describe('uncontrolled mode with defaultValue', () => {
    test('uses defaultValue correctly', async () => {
      render(
        <Accordion defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Trigger 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Item 1 should be expanded initially
      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.queryByText('Content 2')).not.toBeVisible();

      // Click item 2
      fireEvent.click(screen.getByText('Trigger 2'));

      // Item 2 should become expanded, item 1 collapsed
      await waitFor(() => {
        expect(screen.queryByText('Content 1')).not.toBeVisible();
        expect(screen.getByText('Content 2')).toBeVisible();
      });
    });
  });

  // Prop tests
  describe('props', () => {
    test('respects disabled prop on AccordionItem', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger data-testid="trigger-1">
              Trigger 1
            </AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByTestId('trigger-1');
      expect(trigger).toBeDisabled();

      // Clicking should have no effect
      fireEvent.click(trigger);
      expect(screen.queryByText('Content 1')).not.toBeVisible();
    });

    test('respects disabled prop on Accordion (applies to all items)', () => {
      render(
        <Accordion disabled>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="trigger-1">
              Trigger 1
            </AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger data-testid="trigger-2">
              Trigger 2
            </AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('trigger-1')).toBeDisabled();
      expect(screen.getByTestId('trigger-2')).toBeDisabled();
    });

    test('respects chevronPosition prop', () => {
      render(
        <Accordion chevronPosition="start">
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="trigger">Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByTestId('trigger');
      const firstChild = trigger.firstChild;

      // Check if the first child contains the SVG (chevron)
      expect(firstChild).toBeTruthy();
      expect(firstChild?.nodeName).toBe('SPAN');
      expect(firstChild?.firstChild?.nodeName).toBe('svg');
    });

    test('applies correct CSS classes based on size prop', () => {
      const { rerender } = render(
        <Accordion size="sm">
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="trigger">Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Test for sm size classes
      expect(screen.getByTestId('trigger')).toHaveClass(
        'py-2',
        'px-3',
        'text-sm'
      );

      // Test for md size classes
      rerender(
        <Accordion size="md">
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="trigger">Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('trigger')).toHaveClass('py-3', 'px-4');

      // Test for lg size classes
      rerender(
        <Accordion size="lg">
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="trigger">Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('trigger')).toHaveClass(
        'py-4',
        'px-6',
        'text-lg'
      );
    });

    test('applies variant styles correctly', () => {
      const { rerender } = render(
        <Accordion variant="default">
          <AccordionItem value="item-1" data-testid="item">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Test default variant
      expect(screen.getByTestId('item')).toHaveClass(
        'border-b',
        'border-border'
      );

      // Test bordered variant
      rerender(
        <Accordion variant="bordered" data-testid="accordion">
          <AccordionItem value="item-1" data-testid="item">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('accordion')).toHaveClass(
        'border',
        'rounded-md',
        'border-border'
      );
      expect(screen.getByTestId('item')).toHaveClass(
        'border-b',
        'border-border',
        'last:border-0'
      );
    });

    test('uses custom icons when provided', () => {
      const customIcon = <span data-testid="custom-icon">❖</span>;

      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger icon={customIcon}>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    test('renders collapsedContent when an item is collapsed', () => {
      render(
        <Accordion>
          <AccordionItem
            value="item-1"
            collapsedContent={
              <span data-testid="collapsed-content">Collapsed summary</span>
            }
          >
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Full content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      // Collapsed content should be visible when item is collapsed
      expect(screen.getByTestId('collapsed-content')).toBeInTheDocument();

      // Click to expand
      fireEvent.click(screen.getByText('Trigger 1'));

      // After expanding, collapsed content should no longer be visible
      expect(screen.queryByTestId('collapsed-content')).not.toBeInTheDocument();
      expect(screen.getByText('Full content')).toBeVisible();
    });
  });

  // Expand direction tests
  describe('expand direction', () => {
    test('applies correct classes for "right" direction', () => {
      render(
        <Accordion expandDirection="right" data-testid="accordion">
          <AccordionItem value="item-1" data-testid="item">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('accordion')).toHaveClass('flex', 'flex-row');
      expect(screen.getByTestId('item')).toHaveClass(
        'border-l',
        'border-border',
        'first:border-l-0'
      );
    });

    test('applies correct classes for "left" direction', () => {
      render(
        <Accordion expandDirection="left" data-testid="accordion">
          <AccordionItem value="item-1" data-testid="item">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('accordion')).toHaveClass(
        'flex',
        'flex-row-reverse'
      );
      expect(screen.getByTestId('item')).toHaveClass(
        'border-r',
        'border-border',
        'last:border-r-0'
      );
    });

    test('applies correct classes for "up" direction', () => {
      render(
        <Accordion expandDirection="up" data-testid="accordion">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByTestId('accordion')).toHaveClass(
        'flex',
        'flex-col-reverse'
      );
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    test('sets aria attributes correctly', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="trigger">Trigger 1</AccordionTrigger>
            <AccordionContent data-testid="content">Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByTestId('trigger');
      const content = screen.getByTestId('content');

      // Initial state
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-controls');

      // Content should have role="region"
      expect(content).toHaveAttribute('role', 'region');

      // Click to expand
      fireEvent.click(trigger);

      // Verify aria-expanded changes
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
