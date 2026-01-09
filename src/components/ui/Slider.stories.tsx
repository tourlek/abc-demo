import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider";

const meta = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
    step: {
      control: "number",
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-[60%]",
  },
  render: (args) => <Slider {...args} />,
};
