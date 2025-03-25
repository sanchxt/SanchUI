import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

export type AspectRatio =
  | '1/1'
  | '4/3'
  | '16/9'
  | '21/9'
  | '3/4'
  | '9/16'
  | string;

export type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export type ObjectPosition =
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | string;

export interface ImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'onLoad' | 'onError'
  > {
  /**
   * Image source URL
   */
  src: string;

  /**
   * Alternative text for the image (required for accessibility)
   */
  alt: string;

  /**
   * Controls the aspect ratio of the image container
   */
  aspectRatio?: AspectRatio;

  /**
   * Controls how the image is resized to fit its container
   */
  objectFit?: ObjectFit;

  /**
   * Controls how the image is positioned within its container
   */
  objectPosition?: ObjectPosition;

  /**
   * Applies rounded corners to the image
   */
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'full';

  /**
   * URL for the fallback image to display if the main image fails to load
   */
  fallbackSrc?: string;

  /**
   * URL or color for the placeholder to show while the image is loading
   */
  placeholder?: string;

  /**
   * Caption text to display below the image
   */
  caption?: React.ReactNode;

  /**
   * Additional CSS class for the container
   */
  containerClassName?: string;

  /**
   * Additional CSS class for the image
   */
  imageClassName?: string;

  /**
   * Additional CSS class for the caption
   */
  captionClassName?: string;

  /**
   * Called when the image has finished loading
   */
  onLoaded?: () => void;

  /**
   * Called when the image fails to load
   */
  onError?: () => void;

  /**
   * Priority loading - set true to disable lazy loading for important images
   */
  priority?: boolean;
}

/**
 * A responsive image component with support for lazy loading, aspect ratio,
 * placeholders, and other features for an optimal image experience.
 */
const Image = ({
  src,
  alt,
  aspectRatio = 'auto',
  objectFit = 'cover',
  objectPosition = 'center',
  rounded = false,
  fallbackSrc,
  placeholder,
  caption,
  className,
  containerClassName,
  imageClassName,
  captionClassName,
  onLoaded,
  onError,
  priority = false,
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
    setError(false);
    setIsLoading(true);
  }, [src]);

  // Handle image loaded event
  const handleImageLoaded = () => {
    setIsLoading(false);
    onLoaded?.();
  };

  // Handle image error event
  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
    if (fallbackSrc && fallbackSrc !== imgSrc) {
      setImgSrc(fallbackSrc);
    }
    onError?.();
  };

  // Calculate aspect ratio paddingBottom percentage
  const calculatePaddingBottom = () => {
    if (aspectRatio === 'auto') return 'auto';

    if (aspectRatio.includes('/')) {
      const [width, height] = aspectRatio.split('/').map(Number);
      if (!isNaN(width) && !isNaN(height) && height > 0) {
        return `${(height / width) * 100}%`;
      }
    }

    return '100%'; // Default square aspect ratio
  };

  // Convert rounded prop to appropriate tailwind classes
  const getRoundedClass = () => {
    if (rounded === true) return 'rounded-md';
    if (rounded === 'sm') return 'rounded-sm';
    if (rounded === 'md') return 'rounded-md';
    if (rounded === 'lg') return 'rounded-lg';
    if (rounded === 'full') return 'rounded-full';
    return '';
  };

  // Get object fit class
  const getObjectFitClass = () => {
    return `object-${objectFit}`;
  };

  // Get object position class
  const getObjectPositionClass = () => {
    if (
      [
        'center',
        'top',
        'right',
        'bottom',
        'left',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ].includes(objectPosition as string)
    ) {
      return `object-${objectPosition.replace('-', '-')}`;
    }
    return '';
  };

  return (
    <div className={cn('image-container relative w-full', containerClassName)}>
      <div
        className={cn('relative overflow-hidden', getRoundedClass())}
        style={{
          paddingBottom:
            calculatePaddingBottom() !== 'auto'
              ? calculatePaddingBottom()
              : undefined,
          height: calculatePaddingBottom() === 'auto' ? 'auto' : undefined,
        }}
      >
        {isLoading && placeholder && (
          <div
            className={cn('absolute inset-0', getRoundedClass())}
            style={{
              backgroundColor: placeholder.startsWith('#')
                ? placeholder
                : undefined,
              backgroundImage: !placeholder.startsWith('#')
                ? `url(${placeholder})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden="true"
          />
        )}

        <img
          ref={imgRef}
          src={imgSrc}
          alt={alt}
          loading={priority ? undefined : 'lazy'}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            getObjectFitClass(),
            getObjectPositionClass(),
            getRoundedClass(),
            isLoading ? 'opacity-0' : 'opacity-100',
            aspectRatio !== 'auto' ? 'absolute inset-0' : '',
            imageClassName
          )}
          onLoad={handleImageLoaded}
          onError={handleImageError}
          {...props}
        />
      </div>

      {caption && (
        <div
          className={cn('text-sm text-muted-foreground mt-2', captionClassName)}
        >
          {caption}
        </div>
      )}
    </div>
  );
};

export { Image };
