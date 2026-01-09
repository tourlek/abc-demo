import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <Accordion type="single" collapsible className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Multiple
export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  render: () => (
    <Accordion type="multiple" className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple?</AccordionTrigger>
        <AccordionContent>
          Yes! This accordion allows multiple items to be open at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          Set type="multiple" on the Accordion component.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Any limitations?</AccordionTrigger>
        <AccordionContent>
          No limitations! All items can be expanded simultaneously.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Thai Content
export const ThaiContent: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <Accordion type="single" collapsible className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>คำถามที่พบบ่อย (FAQ)</AccordionTrigger>
        <AccordionContent>
          นี่คือคำตอบสำหรับคำถามที่พบบ่อย คุณสามารถใส่ข้อมูลได้ตามต้องการ
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>วิธีการใช้งาน</AccordionTrigger>
        <AccordionContent>
          คลิกที่หัวข้อเพื่อเปิดหรือปิดเนื้อหาด้านใน
          ส่วนประกอบนี้รองรับการเข้าถึง (Accessibility)
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>ติดต่อสอบถาม</AccordionTrigger>
        <AccordionContent>
          หากมีคำถามเพิ่มเติม สามารถติดต่อได้ที่อีเมล support@example.com
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Default Open
export const DefaultOpen: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-[450px]"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>This is open by default</AccordionTrigger>
        <AccordionContent>
          This content is visible when the page loads because we set
          defaultValue="item-1".
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Click to expand</AccordionTrigger>
        <AccordionContent>
          This one starts closed but can be opened by clicking.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
