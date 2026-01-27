import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";
import { Check, X, AlertTriangle, Info } from "lucide-react";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "destructive",
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Badge
export const Default: Story = {
  args: {
    children: "Badge",
  },
};

// All Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>
        <Check data-icon="inline-start" />
        Success
      </Badge>
      <Badge variant="destructive">
        <X data-icon="inline-start" />
        Error
      </Badge>
      <Badge variant="secondary">
        <AlertTriangle data-icon="inline-start" />
        Warning
      </Badge>
      <Badge variant="outline">
        <Info data-icon="inline-start" />
        Info
      </Badge>
    </div>
  ),
};

// Status Badges
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="outline">Draft</Badge>
      <Badge variant="destructive">Expired</Badge>
    </div>
  ),
};

// Notification Count
export const NotificationCount: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative">
        <span className="text-sm font-medium">Inbox</span>
        <Badge className="absolute -right-6 -top-2 h-4 min-w-4 px-1 text-xs">
          5
        </Badge>
      </div>
      <div className="relative">
        <span className="text-sm font-medium">Notifications</span>
        <Badge
          variant="destructive"
          className="absolute -right-8 -top-2 h-4 min-w-4 px-1 text-xs"
        >
          99+
        </Badge>
      </div>
    </div>
  ),
};

// Tags Example
export const Tags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">React</Badge>
      <Badge variant="outline">TypeScript</Badge>
      <Badge variant="outline">Tailwind CSS</Badge>
      <Badge variant="outline">Storybook</Badge>
      <Badge variant="outline">Vite</Badge>
    </div>
  ),
};
