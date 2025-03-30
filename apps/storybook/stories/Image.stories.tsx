import { Meta, StoryObj } from '@storybook/react';
import { Image, ImageProps } from '@sanch-ui/core';
import { Info, AlertCircle } from 'lucide-react';

const meta: Meta<ImageProps> = {
  title: 'Components/Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
    },
    aspectRatio: {
      control: 'select',
      options: ['auto', '1/1', '4/3', '16/9', '21/9', '3/4', '9/16'],
      description: 'Controls the aspect ratio of the image container',
    },
    objectFit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
      description: 'Controls how the image is resized to fit its container',
    },
    objectPosition: {
      control: 'select',
      options: [
        'center',
        'top',
        'right',
        'bottom',
        'left',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
      description: 'Controls how the image is positioned within its container',
    },
    rounded: {
      control: 'select',
      options: [true, false, 'sm', 'md', 'lg', 'full'],
      description: 'Applies rounded corners to the image',
    },
    fallbackSrc: {
      control: 'text',
      description:
        'URL for fallback image to display if main image fails to load',
    },
    placeholder: {
      control: 'text',
      description: 'URL or color for placeholder while image is loading',
    },
    caption: {
      control: 'text',
      description: 'Caption text to display below the image',
    },
    priority: {
      control: 'boolean',
      description:
        'Priority loading - disables lazy loading for important images',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    alt: 'Mountain landscape with starry night sky',
    aspectRatio: '16/9',
    objectFit: 'cover',
    rounded: true,
    priority: false,
  },
};

export const WithCaption: Story = {
  args: {
    ...Default.args,
    caption: 'Mountain landscape with stars shining in the night sky',
  },
};

export const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: '#e2e8f0',
  },
};

export const WithAspectRatios: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <h3 className="text-lg font-medium mb-2">Aspect Ratio: 1/1 (Square)</h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="1/1"
          objectFit="cover"
          rounded
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">
          Aspect Ratio: 16/9 (Widescreen)
        </h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="16/9"
          objectFit="cover"
          rounded
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">
          Aspect Ratio: 4/3 (Standard)
        </h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="4/3"
          objectFit="cover"
          rounded
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">
          Aspect Ratio: 9/16 (Portrait)
        </h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="9/16"
          objectFit="cover"
          rounded
        />
      </div>
    </div>
  ),
};

export const ObjectFitExamples: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <h3 className="text-lg font-medium mb-2">Object Fit: Cover</h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="16/9"
          objectFit="cover"
          rounded
        />
        <p className="text-sm text-muted-foreground mt-2">
          Covers the entire container while maintaining aspect ratio, may crop
          the image
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Object Fit: Contain</h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="16/9"
          objectFit="contain"
          rounded
        />
        <p className="text-sm text-muted-foreground mt-2">
          Fits the entire image within the container, may show empty space
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Object Fit: Fill</h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="16/9"
          objectFit="fill"
          rounded
        />
        <p className="text-sm text-muted-foreground mt-2">
          Stretches the image to fill the container, may distort the image
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Object Fit: None</h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="16/9"
          objectFit="none"
          rounded
        />
        <p className="text-sm text-muted-foreground mt-2">
          No resizing, image appears at its original size
        </p>
      </div>
    </div>
  ),
};

export const RoundedVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <h3 className="text-lg font-medium mb-2">
          Rounded: false (no rounding)
        </h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="4/3"
          objectFit="cover"
          rounded={false}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">
          Rounded: true (medium rounding)
        </h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="4/3"
          objectFit="cover"
          rounded={true}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">
          Rounded: 'sm' (small rounding)
        </h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="4/3"
          objectFit="cover"
          rounded="sm"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">
          Rounded: 'lg' (large rounding)
        </h3>
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
          alt="Mountain landscape with starry night sky"
          aspectRatio="4/3"
          objectFit="cover"
          rounded="lg"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">
          Rounded: 'full' (circular image)
        </h3>
        <div className="max-w-[240px] mx-auto">
          <Image
            src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1"
            alt="Portrait photo"
            aspectRatio="1/1"
            objectFit="cover"
            objectPosition="center"
            rounded="full"
          />
        </div>
      </div>
    </div>
  ),
};

export const FallbackDemo: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <h3 className="text-lg font-medium mb-2 flex items-center">
          <AlertCircle className="h-5 w-5 text-destructive mr-2" />
          Broken Image with Fallback
        </h3>
        <Image
          src="https://broken-image-url.jpg"
          alt="This image will fail to load"
          fallbackSrc="https://images.unsplash.com/photo-1560719887-fe3105fa1e55"
          aspectRatio="16/9"
          objectFit="cover"
          rounded
          caption="This image uses a fallback when the primary source fails"
        />
      </div>
    </div>
  ),
};

export const WithDarkTheme: Story = {
  render: () => (
    <div className="dark space-y-8 max-w-lg bg-background p-8 rounded-xl">
      <div className="flex items-center">
        <Info className="h-5 w-5 mr-2" />
        <h2 className="text-xl font-semibold">Dark Theme Images</h2>
      </div>

      <Image
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
        alt="Mountain landscape with starry night sky"
        aspectRatio="16/9"
        objectFit="cover"
        rounded="lg"
        caption="Mountain landscape with stars shining in the night sky"
      />

      <div className="grid grid-cols-2 gap-4">
        <Image
          src="https://images.unsplash.com/photo-1495467033336-2effd8753d51"
          alt="Beach with palm trees"
          aspectRatio="1/1"
          objectFit="cover"
          rounded
        />
        <Image
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df"
          alt="City skyline at night"
          aspectRatio="1/1"
          objectFit="cover"
          rounded
        />
      </div>
    </div>
  ),
};

export const ResponsiveGallery: Story = {
  render: () => (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
            alt: 'Forest landscape',
            caption: 'Enchanted forest',
          },
          {
            src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
            alt: 'Sunlight through trees',
            caption: 'Morning light',
          },
          {
            src: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f',
            alt: 'Mountain lake',
            caption: 'Crystal clear waters',
          },
          {
            src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1',
            alt: 'Desert landscape',
            caption: 'Golden sands',
          },
          {
            src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            alt: 'Beach sunset',
            caption: 'Tropical paradise',
          },
          {
            src: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9',
            alt: 'City buildings',
            caption: 'Urban jungle',
          },
        ].map((image, index) => (
          <div key={index} className="h-full">
            <Image
              src={image.src}
              alt={image.alt}
              aspectRatio="3/4"
              objectFit="cover"
              rounded="md"
              caption={image.caption}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};
