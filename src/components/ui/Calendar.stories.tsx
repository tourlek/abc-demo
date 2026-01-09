import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./calendar";
import { useState } from "react";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "range", "multiple"],
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date as any}
        onSelect={setDate as any}
        className="rounded-md border"
        {...args}
      />
    );
  },
};

export const Multiple: Story = {
  render: (args) => {
    const [dates, setDates] = useState<Date[] | undefined>([new Date()]);
    return (
      <Calendar
        mode="multiple"
        selected={dates as any}
        onSelect={setDates as any}
        className="rounded-md border"
        {...args}
      />
    );
  },
};
