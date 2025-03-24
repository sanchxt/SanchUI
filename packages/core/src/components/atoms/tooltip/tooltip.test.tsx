import userEvent from '@testing-library/user-event';
import { render, screen, act, waitFor } from '@testing-library/react';

import { Tooltip } from './index';

// Mock timers for delay testing
jest.useFakeTimers();

describe('Tooltip', () => {
  it('renders trigger element correctly', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Hover me');
    // Tooltip should not be visible by default
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    // Hover over the button
    await user.hover(screen.getByRole('button'));

    // Tooltip should be visible
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');

    // Move mouse away
    await user.unhover(screen.getByRole('button'));

    // Tooltip should be hidden
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on click when trigger is "click"', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip content" trigger="click">
        <button>Click me</button>
      </Tooltip>
    );

    // Click the button
    await user.click(screen.getByRole('button'));

    // Tooltip should be visible
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');

    // Click the button again to hide
    await user.click(screen.getByRole('button'));

    // Tooltip should be hidden
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus when trigger is "focus"', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip content" trigger="focus">
        <button>Focus me</button>
      </Tooltip>
    );

    // Focus the button
    await user.tab();
    expect(document.activeElement).toHaveTextContent('Focus me');

    // Tooltip should be visible
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');

    // Blur the button
    await user.tab();

    // Tooltip should be hidden
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('respects showDelay prop', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip content" showDelay={200}>
        <button>Hover me</button>
      </Tooltip>
    );

    // Hover over the button
    await user.hover(screen.getByRole('button'));

    // Tooltip should not be visible immediately
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Tooltip should still not be visible
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Fast-forward time to after the delay
    act(() => {
      jest.advanceTimersByTime(150);
    });

    // Tooltip should now be visible
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');
  });

  it('respects hideDelay prop', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip content" hideDelay={200}>
        <button>Hover me</button>
      </Tooltip>
    );

    // Hover and show tooltip
    await user.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // Unhover
    await user.unhover(screen.getByRole('button'));

    // Tooltip should still be visible
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Tooltip should still be visible
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // Fast-forward time to after the delay
    act(() => {
      jest.advanceTimersByTime(150);
    });

    // Tooltip should now be hidden
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('handles disabled state correctly', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip content" disabled>
        <button>Hover me</button>
      </Tooltip>
    );

    // Hover over the button
    await user.hover(screen.getByRole('button'));

    // Tooltip should not be visible because it's disabled
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('calls onShow and onHide callbacks', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onShow = jest.fn();
    const onHide = jest.fn();

    render(
      <Tooltip content="Tooltip content" onShow={onShow} onHide={onHide}>
        <button>Hover me</button>
      </Tooltip>
    );

    // Hover over the button
    await user.hover(screen.getByRole('button'));

    // onShow should be called
    expect(onShow).toHaveBeenCalledTimes(1);

    // Unhover
    await user.unhover(screen.getByRole('button'));

    // onHide should be called
    expect(onHide).toHaveBeenCalledTimes(1);
  });

  it('handles manual trigger correctly', () => {
    const { rerender } = render(
      <Tooltip content="Tooltip content" trigger="manual" isOpen={false}>
        <button>Trigger</button>
      </Tooltip>
    );

    // Tooltip should not be visible
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Update props to show tooltip
    rerender(
      <Tooltip content="Tooltip content" trigger="manual" isOpen={true}>
        <button>Trigger</button>
      </Tooltip>
    );

    // Tooltip should be visible
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');
  });

  it('closes on outside click when closeOnOutsideClick is true', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <div>
        <Tooltip content="Tooltip content" trigger="click">
          <button>Click me</button>
        </Tooltip>
        <div data-testid="outside">Outside element</div>
      </div>
    );

    // Show tooltip
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // Click outside
    await user.click(screen.getByTestId('outside'));

    // Tooltip should be hidden
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('closes on Escape key press when closeOnEscape is true', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip content" trigger="click">
        <button>Click me</button>
      </Tooltip>
    );

    // Show tooltip
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // Press Escape
    await user.keyboard('{Escape}');

    // tooltip should be hidden
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('stays open when interactive is true and mouse moves to tooltip', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip content" interactive>
        <button data-testid="tooltip-trigger">Hover me</button>
      </Tooltip>
    );

    // show tooltip
    await user.hover(screen.getByTestId('tooltip-trigger'));

    // check tooltip appears
    expect(await screen.findByTestId('tooltip')).toBeInTheDocument();

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toHaveProperty('onmouseenter');
    expect(tooltip).toHaveProperty('onmouseleave');

    expect(tooltip).toHaveTextContent('Tooltip content');
  });

  it('applies custom classes correctly', () => {
    render(
      <Tooltip
        content="Tooltip content"
        className="custom-container"
        contentClassName="custom-content"
        arrowClassName="custom-arrow"
        trigger="manual"
        isOpen={true}
        arrow
      >
        <button>Trigger</button>
      </Tooltip>
    );

    // Check for custom classes
    const container = screen.getByRole('button').closest('.relative');
    expect(container).toHaveClass('custom-container');

    const tooltipContent = screen
      .getByText('Tooltip content')
      .closest('div[role="tooltip"]');
    expect(tooltipContent).toHaveClass('custom-content');

    const arrow = tooltipContent?.querySelector('div');
    expect(arrow).toHaveClass('custom-arrow');
  });

  it('uses correct ARIA attributes for accessibility', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Tooltip content" id="custom-tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    // Initially, button should not reference tooltip
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('aria-describedby');

    // Show tooltip
    await user.hover(button);

    // Get the parent div that wraps the button
    const buttonWrapper = button.parentElement;

    // Now button wrapper should have aria-describedby attribute
    expect(buttonWrapper).toHaveAttribute('aria-describedby', 'custom-tooltip');

    // Tooltip should have correct ID
    const tooltip = screen
      .getByText('Tooltip content')
      .closest('div[role="tooltip"]');
    expect(tooltip).toHaveAttribute('id', 'custom-tooltip');
  });
});
