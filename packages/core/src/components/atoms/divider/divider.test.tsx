import { render, screen } from '@testing-library/react';
import { Divider } from './index';

describe('Divider', () => {
  it('renders a horizontal divider by default', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(divider).toHaveClass('w-full');
  });

  it('renders a vertical divider when orientation is vertical', () => {
    render(<Divider orientation="vertical" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    expect(divider).toHaveClass('h-full');
  });

  it('applies different thickness classes correctly', () => {
    const { rerender } = render(<Divider thickness="thin" />);
    let divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-t');

    rerender(<Divider thickness="regular" />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-t-2');

    rerender(<Divider thickness="thick" />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-t-4');

    // vertical orientation with different thicknesses
    rerender(<Divider orientation="vertical" thickness="thin" />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-l');

    rerender(<Divider orientation="vertical" thickness="regular" />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-l-2');

    rerender(<Divider orientation="vertical" thickness="thick" />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-l-4');
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Divider variant="solid" />);
    let divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-solid');

    rerender(<Divider variant="dashed" />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-dashed');

    rerender(<Divider variant="dotted" />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-dotted');
  });

  it('applies margin when withMargin is true', () => {
    const { rerender } = render(<Divider withMargin />);
    let divider = screen.getByRole('separator');
    expect(divider).toHaveClass('my-4');

    rerender(<Divider orientation="vertical" withMargin />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('mx-4');
  });

  it('renders decorative style correctly', () => {
    const { rerender } = render(<Divider decorative />);
    let divider = screen.getByRole('separator');
    expect(divider).toHaveClass('bg-gradient-to-r');
    expect(divider).toHaveClass('from-transparent');
    expect(divider).toHaveClass('via-border');
    expect(divider).toHaveClass('to-transparent');
    expect(divider).toHaveClass('h-px');
    expect(divider).toHaveClass('border-none');

    rerender(<Divider orientation="vertical" decorative />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('bg-gradient-to-b');
    expect(divider).toHaveClass('from-transparent');
    expect(divider).toHaveClass('via-border');
    expect(divider).toHaveClass('to-transparent');
    expect(divider).toHaveClass('w-px');
    expect(divider).toHaveClass('border-none');
  });

  it('renders with a label when provided', () => {
    render(<Divider label="Section" />);
    const label = screen.getByText('Section');
    expect(label).toBeInTheDocument();

    // should have a flex container with items-center
    const container = screen.getByRole('separator');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
  });

  it('applies different label alignments correctly', () => {
    const { rerender } = render(
      <Divider label="Label" labelAlignment="start" />
    );
    let container = screen.getByRole('separator');
    expect(container).toHaveClass('justify-start');

    rerender(<Divider label="Label" labelAlignment="center" />);
    container = screen.getByRole('separator');
    expect(container).toHaveClass('justify-center');

    rerender(<Divider label="Label" labelAlignment="end" />);
    container = screen.getByRole('separator');
    expect(container).toHaveClass('justify-end');
  });

  it('applies custom className to the divider', () => {
    render(<Divider className="custom-class" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('custom-class');
  });

  it('applies custom labelClassName when label is provided', () => {
    render(<Divider label="Label" labelClassName="custom-label-class" />);
    const labelContainer = screen.getByText('Label');
    expect(labelContainer).toHaveClass('custom-label-class');
  });

  it('does not render label in vertical orientation even if provided', () => {
    render(<Divider orientation="vertical" label="Label" />);
    const divider = screen.getByRole('separator');
    expect(divider).not.toHaveClass('flex');
    expect(screen.queryByText('Label')).not.toBeInTheDocument();
  });
});
