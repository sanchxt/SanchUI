import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Image } from './index';

describe('Image', () => {
  beforeEach(() => {
    // Mock the IntersectionObserver
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('renders with required props', () => {
    render(<Image src="/test-image.jpg" alt="Test image" />);
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('renders with priority loading', () => {
    render(<Image src="/test-image.jpg" alt="Test image" priority />);
    const image = screen.getByAltText('Test image');
    expect(image).not.toHaveAttribute('loading', 'lazy');
  });

  it('applies the correct aspect ratio', () => {
    const { container } = render(
      <Image src="/test-image.jpg" alt="Test image" aspectRatio="16/9" />
    );

    // The padding bottom should be calculated as (9/16)*100 = 56.25%
    const wrapper = container.querySelector('.image-container > div');
    expect(wrapper).toHaveStyle('padding-bottom: 56.25%');
  });

  it('applies rounded corners correctly', () => {
    const { rerender } = render(
      <Image src="/test-image.jpg" alt="Test image" rounded />
    );
    let image = screen.getByAltText('Test image');
    expect(image).toHaveClass('rounded-md');

    rerender(<Image src="/test-image.jpg" alt="Test image" rounded="full" />);
    image = screen.getByAltText('Test image');
    expect(image).toHaveClass('rounded-full');
  });

  it('displays caption when provided', () => {
    render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        caption="This is a test caption"
      />
    );
    const caption = screen.getByText('This is a test caption');
    expect(caption).toBeInTheDocument();
  });

  it('handles loading state correctly', async () => {
    const { container } = render(
      <Image src="/test-image.jpg" alt="Test image" placeholder="#e0e0e0" />
    );

    // Check if placeholder is displayed
    const placeholder = container.querySelector('.image-container > div > div');
    expect(placeholder).toHaveStyle('background-color: #e0e0e0');

    // Mock the image loading
    const image = screen.getByAltText('Test image');
    expect(image).toHaveClass('opacity-0');

    // Simulate image load
    fireEvent.load(image);

    // Image should be visible after loading
    expect(image).toHaveClass('opacity-100');
  });

  it('handles error state and fallback correctly', async () => {
    const onErrorMock = jest.fn();
    const { rerender } = render(
      <Image
        src="/broken-image.jpg"
        alt="Broken image"
        fallbackSrc="/fallback-image.jpg"
        onError={onErrorMock}
      />
    );

    const image = screen.getByAltText('Broken image');

    // Simulate image error
    fireEvent.error(image);

    // onError should be called
    expect(onErrorMock).toHaveBeenCalled();

    // Wait for the component to update to fallback src
    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/fallback-image.jpg');
    });
  });

  it('applies object-fit and object-position classes', () => {
    const { rerender } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        objectFit="contain"
        objectPosition="top-left"
      />
    );

    let image = screen.getByAltText('Test image');
    expect(image).toHaveClass('object-contain');
    expect(image).toHaveClass('object-top-left');

    rerender(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        objectFit="cover"
        objectPosition="center"
      />
    );

    image = screen.getByAltText('Test image');
    expect(image).toHaveClass('object-cover');
    expect(image).toHaveClass('object-center');
  });

  it('applies custom class names', () => {
    const { container } = render(
      <Image
        src="/test-image.jpg"
        alt="Test image"
        containerClassName="test-container"
        imageClassName="test-image"
        caption="Test caption"
        captionClassName="test-caption"
      />
    );

    // Check container class
    const imageContainer = container.querySelector('.image-container');
    expect(imageContainer).toHaveClass('test-container');

    // Check image class
    const image = screen.getByAltText('Test image');
    expect(image).toHaveClass('test-image');

    // Find caption container directly, not through parent relationship
    const captionContainer = container.querySelector(
      '.text-sm.text-muted-foreground.mt-2'
    );
    expect(captionContainer).toHaveClass('test-caption');
  });

  it('updates when src changes', async () => {
    const { rerender } = render(
      <Image src="/initial-image.jpg" alt="Test image" />
    );

    let image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('src', '/initial-image.jpg');

    rerender(<Image src="/updated-image.jpg" alt="Test image" />);

    image = screen.getByAltText('Test image');
    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/updated-image.jpg');
    });
  });
});
