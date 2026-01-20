import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "./calendar";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "range", "multiple"],
    },
    captionLayout: {
      control: "select",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
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

export const Dropdown: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date as any}
        onSelect={setDate as any}
        captionLayout="dropdown"
        fromYear={1960}
        toYear={2030}
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

export const Range: Story = {
  render: (args) => {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    });
    return (
      <Calendar
        mode="range"
        selected={range as any}
        onSelect={setRange as any}
        className="rounded-md border"
        {...args}
      />
    );
  },
};
