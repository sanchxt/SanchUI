import { render, screen } from '@testing-library/react';
import { Progress } from './index';

describe('Progress', () => {
  it('renders with default props', () => {
    const { container } = render(<Progress />);

    // check: progress element exists
    const progressElement = container.querySelector('progress');
    expect(progressElement).toBeInTheDocument();

    // check: default values
    expect(progressElement).toHaveAttribute('value', '0');
    expect(progressElement).toHaveAttribute('max', '100');

    // check: default visual styling
    const track = container.querySelector('div[class*="bg-secondary"]');
    expect(track).toBeInTheDocument();

    // check: indicator with 0% width
    const indicator = track?.querySelector('div');
    const indicatorStyle = indicator
      ? window.getComputedStyle(indicator)
      : null;
    expect(indicatorStyle?.width).toBe('0%');
  });

  it('renders with custom value', () => {
    const { container } = render(<Progress value={50} />);

    // check: progress element value
    const progressElement = container.querySelector('progress');
    expect(progressElement).toHaveAttribute('value', '50');

    // check: indicator width using inline style
    const indicator = container.querySelector('.relative > div > div');
    expect(indicator).toHaveStyle('width: 50%');
  });

  it('respects min and max values', () => {
    const { container } = render(<Progress value={5} min={0} max={10} />);

    // check: progress element attributes
    const progressElement = container.querySelector('progress');
    expect(progressElement).toHaveAttribute('value', '5');
    expect(progressElement).toHaveAttribute('max', '10');
    expect(progressElement).toHaveAttribute('aria-valuemin', '0');

    // check: indicator width (should be 50% since 5 is halfway between 0 and 10)
    const indicator = container.querySelector('.relative > div > div');
    expect(indicator).toHaveStyle('width: 50%');
  });

  it('handles out-of-bounds values', () => {
    const { container: container1 } = render(
      <Progress value={150} max={100} />
    );
    const { container: container2 } = render(
      <Progress value={-10} min={0} max={100} />
    );

    // check: value is clamped to max (100)
    const progress1 = container1.querySelector('progress');
    expect(progress1).toHaveAttribute('value', '100');

    // check: value is clamped to min (0)
    const progress2 = container2.querySelector('progress');
    expect(progress2).toHaveAttribute('value', '0');
  });

  it('renders indeterminate state', () => {
    const { container } = render(<Progress indeterminate />);

    // check: aria-busy attribute
    const progressElement = container.querySelector('progress');
    expect(progressElement).toHaveAttribute('aria-busy', 'true');

    // check: value attribute is not set for indeterminate state
    expect(progressElement).not.toHaveAttribute('value');

    // check: animation class
    const indicator = container.querySelector('.relative > div > div');
    expect(indicator).toHaveClass('animate-pulse');
  });

  it('applies different sizes correctly', () => {
    const { container: smContainer } = render(<Progress size="sm" />);
    const { container: mdContainer } = render(<Progress size="md" />);
    const { container: lgContainer } = render(<Progress size="lg" />);

    // check: height classes
    const smTrack = smContainer.querySelector('div[class*="bg-secondary"]');
    const mdTrack = mdContainer.querySelector('div[class*="bg-secondary"]');
    const lgTrack = lgContainer.querySelector('div[class*="bg-secondary"]');

    expect(smTrack).toHaveClass('h-1.5');
    expect(mdTrack).toHaveClass('h-2.5');
    expect(lgTrack).toHaveClass('h-4');
  });

  it('applies different color variants', () => {
    const colors = [
      'default',
      'primary',
      'success',
      'destructive',
      'secondary',
    ] as const;

    colors.forEach((color) => {
      const { container } = render(<Progress color={color} value={50} />);

      const colorClass = color === 'default' ? 'bg-foreground' : `bg-${color}`;
      const indicator = container.querySelector(`.${colorClass}`);

      // check: indicator with the right color class exists
      expect(indicator).not.toBeNull();
      expect(indicator).toHaveClass(colorClass);
    });
  });

  it('shows value when requested', () => {
    const { container: containerOutside } = render(
      <Progress value={50} showValue />
    );
    const { container: containerInside } = render(
      <Progress value={50} showValue valuePosition="inside" size="lg" />
    );

    // check: outside value text
    const outsideValue = containerOutside.querySelector(
      'div.text-muted-foreground'
    );
    expect(outsideValue).toHaveTextContent('50%');

    // check: inside value text (only visible in lg size)
    const insideValue = containerInside.querySelector(
      'div.text-primary-foreground'
    );
    expect(insideValue).toHaveTextContent('50%');
  });

  it('formats value correctly based on valueFormat', () => {
    const { container: containerPercentage } = render(
      <Progress value={50} showValue valueFormat="percentage" />
    );
    const { container: containerRatio } = render(
      <Progress value={50} showValue valueFormat="ratio" />
    );
    const { container: containerCustom } = render(
      <Progress
        value={50}
        showValue
        valueFormat={(value, max) => `${value} of ${max} points`}
      />
    );

    // check: percentage format
    const percentageValue = containerPercentage.querySelector(
      'div.text-muted-foreground'
    );
    expect(percentageValue).toHaveTextContent('50%');

    // check: ratio format
    const ratioValue = containerRatio.querySelector(
      'div.text-muted-foreground'
    );
    expect(ratioValue).toHaveTextContent('50/100');

    // check: custom format
    const customValue = containerCustom.querySelector(
      'div.text-muted-foreground'
    );
    expect(customValue).toHaveTextContent('50 of 100 points');
  });

  it('renders with label', () => {
    const { container } = render(
      <Progress label="Upload Progress" value={50} />
    );

    // check: label text
    const label = container.querySelector('div.font-medium');
    expect(label).toHaveTextContent('Upload Progress');
  });

  it('sets appropriate ARIA attributes', () => {
    const { container } = render(
      <Progress label="Download Progress" value={25} min={0} max={100} />
    );

    // check: region role and aria-label
    const region = container.firstChild;
    expect(region).toHaveAttribute('role', 'region');
    expect(region).toHaveAttribute('aria-label', 'Download Progress');

    // check: progress ARIA attributes
    const progressElement = container.querySelector('progress');
    expect(progressElement).toHaveAttribute('aria-valuemin', '0');
    expect(progressElement).toHaveAttribute('aria-valuemax', '100');
    expect(progressElement).toHaveAttribute('aria-valuenow', '25');
    expect(progressElement).toHaveAttribute('aria-valuetext', '25%');
  });

  it('applies custom className to all elements', () => {
    const { container } = render(
      <Progress
        className="custom-container"
        trackClassName="custom-track"
        indicatorClassName="custom-indicator"
        valueClassName="custom-value"
        labelClassName="custom-label"
        label="Custom Classes"
        value={50}
        showValue
      />
    );

    // check: custom classes are applied
    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('custom-container');

    const label = container.querySelector('div.font-medium');
    expect(label).toHaveClass('custom-label');

    const value = container.querySelector('div.text-muted-foreground');
    expect(value).toHaveClass('custom-value');

    const track = container.querySelector('.relative > div');
    expect(track).toHaveClass('custom-track');

    const indicator = container.querySelector('.relative > div > div');
    expect(indicator).toHaveClass('custom-indicator');
  });

  it('handles animation toggle', () => {
    const { container } = render(<Progress value={50} animate={false} />);

    // check: no transition classes when animate is false
    const indicator = container.querySelector('.relative > div > div');
    expect(indicator).not.toHaveClass('transition-[width]');
  });

  it('passes additional props to container', () => {
    const { container } = render(
      <Progress
        value={50}
        data-testid="progress-container"
        id="test-progress"
      />
    );

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveAttribute('data-testid', 'progress-container');
    expect(containerDiv).toHaveAttribute('id', 'test-progress');
  });

  it('passes additional progressProps to the progress element', () => {
    const { container } = render(
      <Progress
        value={50}
        progressProps={{
          'data-testid': 'progress-element',
          'aria-label': 'Custom progress label',
        }}
      />
    );

    const progressElement = container.querySelector('progress');
    expect(progressElement).toHaveAttribute('data-testid', 'progress-element');
    expect(progressElement).toHaveAttribute(
      'aria-label',
      'Custom progress label'
    );
  });

  it('accepts ref to container element', () => {
    const ref = { current: null };
    render(<Progress ref={ref} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
