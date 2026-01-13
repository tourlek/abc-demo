import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Card } from "./card";
import { Badge } from "./badge";

const meta = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export const Default: Story = {
  render: (args) => (
    <Card className="overflow-hidden border-border pt-0 pb-0 shadow-none">
      <Table {...args}>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] pl-6">Invoice</TableHead>
            <TableHead className="pl-6">Status</TableHead>
            <TableHead className="pl-6">Method</TableHead>
            <TableHead className="text-right pr-6">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice} className="group">
              <TableCell className="font-medium px-6 py-4">
                {invoice.invoice}
              </TableCell>
              <TableCell className="px-6 py-4">
                <Badge
                  variant={
                    invoice.paymentStatus === "Paid"
                      ? "success"
                      : invoice.paymentStatus === "Pending"
                      ? "warning"
                      : "secondary"
                  }
                  className="gap-1.5"
                >
                  {invoice.paymentStatus === "Paid" && (
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  )}
                  {invoice.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4">
                {invoice.paymentMethod}
              </TableCell>
              <TableCell className="text-right px-6 py-4">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="pl-6">
              Total
            </TableCell>
            <TableCell className="text-right pr-6">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  ),
};
