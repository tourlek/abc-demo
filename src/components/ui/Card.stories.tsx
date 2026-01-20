import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Card
export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Card content with some example text. This is where the main content of
          the card would go.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Compact Card
export const Compact: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardHeader className="p-4">
        <CardTitle className="text-base">Compact Card</CardTitle>
        <CardDescription>With reduced padding</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p>Smaller card variant with tighter spacing.</p>
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

// With Header Action
export const WithHeaderAction: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div className="space-y-1.5">
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification settings</CardDescription>
        </div>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </CardHeader>
      <CardContent>
        <p>You have 3 unread notifications.</p>
      </CardContent>
    </Card>
  ),
};

// Stats Card
export const StatsCard: Story = {
  render: () => (
    <Card className="w-[200px]">
      <CardHeader>
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle className="text-2xl font-bold">$45,231.89</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge>+20.1%</Badge>
          <span className="text-muted-foreground text-xs">from last month</span>
        </div>
      </CardContent>
    </Card>
  ),
};

// Multiple Cards Grid
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Active users this month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">2,350</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Total revenue this month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$12,234</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>New orders today</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">234</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Growth</CardTitle>
          <CardDescription>Monthly growth rate</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">+12%</p>
        </CardContent>
      </Card>
    </div>
  ),
};
