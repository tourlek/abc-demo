import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";
import { Checkbox } from "./checkbox";

const meta = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Accept terms and conditions",
    htmlFor: "terms",
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label {...args} />
    </div>
  ),
};
