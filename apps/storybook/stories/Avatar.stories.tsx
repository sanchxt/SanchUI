import { Bell, Plus, ShieldCheck, BadgeCheck } from 'lucide-react';

import { Avatar, AvatarProps } from '@sanch-ui/core';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<AvatarProps> = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the avatar',
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square', 'rounded'],
      description: 'Shape of the avatar',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the avatar has a border',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'muted', 'gray'],
      description: 'Color scheme for fallback background',
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
      description: 'Status indicator',
    },
    fallbackText: {
      control: 'text',
      description: 'Text to show when image is not available',
    },
    src: {
      control: 'text',
      description: 'Source URL of the avatar image',
    },
    showPlaceholder: {
      control: 'boolean',
      description: 'Whether to show a placeholder during image loading',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// example image URLs for demos
const sampleImgUrls = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
  'https://randomuser.me/api/portraits/women/4.jpg',
];

// base
export const Default: Story = {
  args: {
    src: sampleImgUrls[0],
    alt: 'User avatar',
    size: 'md',
    shape: 'circle',
  },
};

// fallback example
export const WithFallback: Story = {
  args: {
    fallbackText: 'Sanchit Bhalla',
    size: 'md',
    shape: 'circle',
    colorScheme: 'primary',
  },
};

// size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">XS</span>
        <Avatar size="xs" src={sampleImgUrls[0]} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">SM</span>
        <Avatar size="sm" src={sampleImgUrls[0]} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">MD</span>
        <Avatar size="md" src={sampleImgUrls[0]} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">LG</span>
        <Avatar size="lg" src={sampleImgUrls[0]} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">XL</span>
        <Avatar size="xl" src={sampleImgUrls[0]} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">2XL</span>
        <Avatar size="2xl" src={sampleImgUrls[0]} />
      </div>
    </div>
  ),
};

// shape variants
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Circle</span>
        <Avatar shape="circle" src={sampleImgUrls[1]} size="lg" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Square</span>
        <Avatar shape="square" src={sampleImgUrls[1]} size="lg" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Rounded</span>
        <Avatar shape="rounded" src={sampleImgUrls[1]} size="lg" />
      </div>
    </div>
  ),
};

// fallback variants
export const FallbackVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar fallbackText="John Doe" colorScheme="primary" size="lg" />
      <Avatar fallbackText="Alice Smith" colorScheme="secondary" size="lg" />
      <Avatar fallbackText="Bob Johnson" colorScheme="accent" size="lg" />
      <Avatar fallbackText="Emma Wilson" colorScheme="muted" size="lg" />
      <Avatar fallbackText="James Brown" colorScheme="gray" size="lg" />
    </div>
  ),
};

// status indicators
export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Online</span>
        <Avatar src={sampleImgUrls[2]} status="online" size="lg" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Offline</span>
        <Avatar src={sampleImgUrls[2]} status="offline" size="lg" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Away</span>
        <Avatar src={sampleImgUrls[2]} status="away" size="lg" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Busy</span>
        <Avatar src={sampleImgUrls[2]} status="busy" size="lg" />
      </div>
    </div>
  ),
};

// with badges
export const WithBadges: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Avatar
        src={sampleImgUrls[3]}
        size="lg"
        badge={
          <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
            3
          </div>
        }
      />
      <Avatar
        src={sampleImgUrls[3]}
        size="lg"
        badge={
          <div className="h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center">
            <Bell size={12} />
          </div>
        }
      />
      <Avatar
        src={sampleImgUrls[3]}
        size="lg"
        badge={
          <div className="h-6 w-6 rounded-full bg-success text-success-foreground flex items-center justify-center">
            <BadgeCheck size={12} />
          </div>
        }
      />
      <Avatar
        fallbackText="John Doe"
        size="lg"
        badge={
          <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Plus size={12} />
          </div>
        }
      />
    </div>
  ),
};

// badge positions
export const BadgePositions: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Top Right</span>
        <Avatar
          src={sampleImgUrls[0]}
          size="xl"
          badge={
            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
              3
            </div>
          }
          badgePosition="top-right"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Top Left</span>
        <Avatar
          src={sampleImgUrls[0]}
          size="xl"
          badge={
            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
              3
            </div>
          }
          badgePosition="top-left"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Bottom Right</span>
        <Avatar
          src={sampleImgUrls[0]}
          size="xl"
          badge={
            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
              3
            </div>
          }
          badgePosition="bottom-right"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium">Bottom Left</span>
        <Avatar
          src={sampleImgUrls[0]}
          size="xl"
          badge={
            <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
              3
            </div>
          }
          badgePosition="bottom-left"
        />
      </div>
    </div>
  ),
};

// bordered
export const Bordered: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src={sampleImgUrls[1]} size="lg" bordered />
      <Avatar
        fallbackText="Sarah Jones"
        size="lg"
        bordered
        colorScheme="secondary"
      />
      <Avatar src={sampleImgUrls[2]} size="lg" bordered status="online" />
      <Avatar
        fallbackText="Mike Wilson"
        size="lg"
        bordered
        badge={
          <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
            5
          </div>
        }
      />
    </div>
  ),
};

// avatar group
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Simple Avatar Group</h3>
        <div className="flex">
          {sampleImgUrls.map((url, i) => (
            <div
              key={i}
              className="inline-block"
              style={{ marginLeft: i > 0 ? '-0.75rem' : '0' }}
            >
              <Avatar src={url} size="md" bordered />
            </div>
          ))}
          <div className="inline-block" style={{ marginLeft: '-0.75rem' }}>
            <Avatar
              fallbackText="More Users"
              size="md"
              bordered
              colorScheme="muted"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">With Mixed Content</h3>
        <div className="flex">
          <div className="inline-block">
            <Avatar src={sampleImgUrls[0]} size="lg" bordered />
          </div>
          <div className="inline-block" style={{ marginLeft: '-0.75rem' }}>
            <Avatar src={sampleImgUrls[1]} size="lg" bordered />
          </div>
          <div className="inline-block" style={{ marginLeft: '-0.75rem' }}>
            <Avatar fallbackText="John Doe" size="lg" bordered />
          </div>
          <div className="inline-block" style={{ marginLeft: '-0.75rem' }}>
            <Avatar
              size="lg"
              bordered
              colorScheme="muted"
              className="flex items-center justify-center"
            >
              <span className="text-xs">+3</span>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  ),
};

// dark theme
export const DarkTheme: Story = {
  render: () => (
    <div className="dark bg-background p-6 rounded-md space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Dark Theme</h3>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Images</h4>
        <div className="flex gap-4">
          <Avatar src={sampleImgUrls[0]} size="lg" />
          <Avatar src={sampleImgUrls[1]} size="lg" status="online" />
          <Avatar
            src={sampleImgUrls[2]}
            size="lg"
            badge={
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                3
              </div>
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Fallbacks</h4>
        <div className="flex gap-4">
          <Avatar fallbackText="John Doe" size="lg" colorScheme="primary" />
          <Avatar
            fallbackText="Alice Smith"
            size="lg"
            colorScheme="secondary"
          />
          <Avatar fallbackText="Bob Johnson" size="lg" colorScheme="accent" />
        </div>
      </div>
    </div>
  ),
};

// usage examples
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-3">User Profile</h3>
        <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg max-w-sm">
          <Avatar src={sampleImgUrls[0]} size="xl" status="online" />
          <div>
            <h4 className="font-medium">John Anderson</h4>
            <p className="text-sm text-muted-foreground">Product Designer</p>
            <div className="flex items-center gap-3 mt-2">
              <button className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full">
                Follow
              </button>
              <button className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Comment Section</h3>
        <div className="space-y-4 max-w-md">
          <div className="flex gap-3">
            <Avatar src={sampleImgUrls[1]} size="md" />
            <div className="flex-1">
              <div className="bg-secondary/20 p-3 rounded-lg">
                <h4 className="text-sm font-medium">Sarah Johnson</h4>
                <p className="text-sm mt-1">
                  This looks great! I especially like the attention to detail in
                  the interface.
                </p>
              </div>
              <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                <span className="cursor-pointer hover:text-foreground">
                  Like
                </span>
                <span className="cursor-pointer hover:text-foreground">
                  Reply
                </span>
                <span>2h ago</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 ml-10">
            <Avatar
              fallbackText="James Thompson"
              size="sm"
              colorScheme="accent"
            />
            <div className="flex-1">
              <div className="bg-secondary/20 p-3 rounded-lg">
                <h4 className="text-sm font-medium">James Thompson</h4>
                <p className="text-sm mt-1">
                  I agree, the responsiveness is impressive too.
                </p>
              </div>
              <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                <span className="cursor-pointer hover:text-foreground">
                  Like
                </span>
                <span className="cursor-pointer hover:text-foreground">
                  Reply
                </span>
                <span>1h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Team Members</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-lg">
          {['Alice Wilson', 'Bob Smith', 'Charlie Brown', 'Diana Prince'].map(
            (name, i) => (
              <div key={i} className="flex flex-col items-center">
                <Avatar
                  src={i < 2 ? sampleImgUrls[i] : undefined}
                  fallbackText={name}
                  size="lg"
                  colorScheme={
                    i >= 2 ? (i === 2 ? 'primary' : 'secondary') : undefined
                  }
                  status={i === 0 ? 'online' : undefined}
                  badge={
                    i === 1 ? (
                      <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <ShieldCheck size={10} />
                      </div>
                    ) : undefined
                  }
                />
                <span className="text-sm mt-2">{name}</span>
                <span className="text-xs text-muted-foreground">
                  {i === 0
                    ? 'Designer'
                    : i === 1
                      ? 'Admin'
                      : i === 2
                        ? 'Developer'
                        : 'Manager'}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Chat List</h3>
        <div className="space-y-3 max-w-md border rounded-lg p-3">
          {[
            {
              name: 'Alice Cooper',
              message: 'Can you review the latest design?',
              time: '2m ago',
              unread: 3,
            },
            {
              name: 'Bob Johnson',
              message: 'Meeting scheduled for tomorrow',
              time: '1h ago',
              unread: 0,
            },
            {
              name: 'Carol Smith',
              message: 'Thanks for your help!',
              time: '3h ago',
              unread: 1,
            },
          ].map((chat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 hover:bg-muted/40 rounded-md cursor-pointer"
            >
              <div className="relative">
                <Avatar
                  src={i < 2 ? sampleImgUrls[i] : undefined}
                  fallbackText={chat.name}
                  size="md"
                  status={i === 0 ? 'online' : undefined}
                />
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                    {chat.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-medium truncate">{chat.name}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {chat.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// interactive example
export const Interactive: Story = {
  args: {
    size: 'lg',
    shape: 'circle',
    colorScheme: 'primary',
    bordered: false,
    fallbackText: 'John Doe',
    src: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
};
