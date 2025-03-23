import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { Avatar } from './index';

describe('Avatar', () => {
  it('renders correctly', () => {
    render(<Avatar />);
    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();
  });

  it('renders with the correct size classes', () => {
    const { rerender } = render(<Avatar size="xs" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('h-6', 'w-6');

    rerender(<Avatar size="sm" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('h-8', 'w-8');

    rerender(<Avatar size="md" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('h-10', 'w-10');

    rerender(<Avatar size="lg" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('h-12', 'w-12');

    rerender(<Avatar size="xl" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('h-16', 'w-16');

    rerender(<Avatar size="2xl" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('h-24', 'w-24');
  });

  it('renders with the correct shape classes', () => {
    const { rerender } = render(<Avatar shape="circle" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('rounded-full');

    rerender(<Avatar shape="square" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('rounded-none');

    rerender(<Avatar shape="rounded" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('rounded-md');
  });

  it('displays fallback text when no image or when image fails to load', () => {
    render(<Avatar fallbackText="John Doe" data-testid="avatar" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with border when bordered prop is true', () => {
    render(<Avatar bordered data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('ring-2');
  });

  it('applies the correct color scheme', () => {
    const { rerender } = render(
      <Avatar colorScheme="primary" data-testid="avatar" />
    );
    expect(screen.getByTestId('avatar')).toHaveClass(
      'bg-primary/10',
      'text-primary'
    );

    rerender(<Avatar colorScheme="secondary" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(
      'bg-secondary',
      'text-secondary-foreground'
    );

    rerender(<Avatar colorScheme="accent" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(
      'bg-accent',
      'text-accent-foreground'
    );

    rerender(<Avatar colorScheme="muted" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(
      'bg-muted',
      'text-muted-foreground'
    );
  });

  it('renders status indicator when status prop is provided', () => {
    const { rerender } = render(<Avatar status="online" />);
    expect(screen.getByLabelText('Status: online')).toHaveClass('bg-success');

    rerender(<Avatar status="offline" />);
    expect(screen.getByLabelText('Status: offline')).toHaveClass(
      'bg-muted-foreground'
    );

    rerender(<Avatar status="away" />);
    expect(screen.getByLabelText('Status: away')).toHaveClass('bg-orange-400');

    rerender(<Avatar status="busy" />);
    expect(screen.getByLabelText('Status: busy')).toHaveClass('bg-destructive');
  });

  it('renders custom badge when badge prop is provided', () => {
    render(<Avatar badge={<div data-testid="custom-badge">3</div>} />);
    expect(screen.getByTestId('custom-badge')).toBeInTheDocument();
  });

  it('positions badge correctly', () => {
    const { rerender } = render(
      <Avatar
        badge={<div>3</div>}
        badgePosition="top-right"
        data-testid="avatar-container"
      />
    );

    let badgeContainer = screen
      .getByTestId('avatar-container')
      .querySelector('[class*="-top-2 -right-2"]');
    expect(badgeContainer).toBeInTheDocument();

    rerender(
      <Avatar
        badge={<div>3</div>}
        badgePosition="bottom-left"
        data-testid="avatar-container"
      />
    );

    badgeContainer = screen
      .getByTestId('avatar-container')
      .querySelector('[class*="-bottom-2 -left-2"]');
    expect(badgeContainer).toBeInTheDocument();
  });

  it('handles image loading correctly', async () => {
    render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="Test Avatar"
        data-testid="avatar"
      />
    );

    const img = screen.getByAltText('Test Avatar');
    expect(img).toBeInTheDocument();

    // simulate successful image load
    fireEvent.load(img);

    await waitFor(() => {
      expect(img).not.toHaveClass('invisible');
    });
  });

  it('shows fallback when image fails to load', async () => {
    render(
      <Avatar
        src="https://example.com/nonexistent.jpg"
        fallbackText="John Doe"
        alt="Test Avatar"
      />
    );

    const img = screen.getByAltText('Test Avatar');

    // simulate failed image load
    fireEvent.error(img);

    await waitFor(() => {
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    render(<Avatar className="custom-class" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass('custom-class');
  });
});
