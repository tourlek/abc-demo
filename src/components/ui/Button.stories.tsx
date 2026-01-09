import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { Mail, Loader2, Plus, ChevronRight, Search } from "lucide-react";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Button
export const Default: Story = {
  args: {
    children: "Button",
  },
};

// All Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// All Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// With Icon
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Mail data-icon="inline-start" />
        Login with Email
      </Button>
      <Button variant="outline">
        Continue
        <ChevronRight data-icon="inline-end" />
      </Button>
    </div>
  ),
};

// Icon Only
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon-xs">
        <Plus />
      </Button>
      <Button size="icon-sm">
        <Plus />
      </Button>
      <Button size="icon">
        <Plus />
      </Button>
      <Button size="icon-lg">
        <Plus />
      </Button>
    </div>
  ),
};

// Loading State
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>
        <Loader2 className="animate-spin" />
        Please wait
      </Button>
      <Button variant="outline" disabled>
        <Loader2 className="animate-spin" />
        Processing
      </Button>
    </div>
  ),
};

// Disabled
export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

// Search Example
export const SearchExample: Story = {
  render: () => (
    <Button
      variant="outline"
      className="w-64 justify-start text-muted-foreground"
    >
      <Search className="size-4" />
      <span>Search...</span>
      <kbd className="ml-auto inline-flex items-center gap-1 rounded border bg-muted px-1.5 text-xs text-muted-foreground">
        ⌘K
      </kbd>
    </Button>
  ),
};
