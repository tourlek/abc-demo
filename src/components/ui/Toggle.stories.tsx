import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./toggle";
import { Bold, Italic } from "lucide-react";

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Toggle aria-label="Toggle italic" {...args}>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => (
    <Toggle aria-label="Toggle italic" {...args}>
      <Italic className="h-4 w-4" />
    </Toggle>
  ),
};

export const WithText: Story = {
  render: (args) => (
    <Toggle aria-label="Toggle italic" {...args}>
      <Italic className="mr-2 h-4 w-4" />
      Italic
    </Toggle>
  ),
};
