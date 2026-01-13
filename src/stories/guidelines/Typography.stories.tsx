import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentPreview, Section, Divider } from "./components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const meta = {
  title: "Guidelines/Typography",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Main Typography Documentation
export const Docs: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Typography</h1>
        <p className="text-xl text-muted-foreground">
          Font families, sizes, and weights used throughout the design system.
        </p>
      </div>

      <Divider />

      {/* Font Stack */}
      <Section
        title="Font Stack"
        description="The primary font stack uses Comfortaa for headings and Google Sans for body text."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ComponentPreview
            title="Headings"
            description="Used for all headings (H1-H7) and Labels."
            code={`font-family: "Comfortaa", system-ui, sans-serif;`}
          >
            <div className="text-center space-y-2">
              <p className="text-3xl font-heading font-bold">Comfortaa</p>
              <p className="text-lg text-muted-foreground">Bold</p>
            </div>
          </ComponentPreview>
          <ComponentPreview
            title="Body"
            description="Used for body text, captions, and small text."
            code={`font-family: "Google Sans Thai", system-ui, sans-serif;`}
          >
            <div className="text-center space-y-2">
              <p className="text-3xl font-sans">Google Sans</p>
              <p className="text-lg text-muted-foreground">Regular</p>
            </div>
          </ComponentPreview>
        </div>
      </Section>

      <Divider />

      {/* Headings Scale */}
      <Section
        title="Headings & Labels"
        description="Typography scale for headings and labels using Comfortaa. but in thai heading or labels language use Google Sans Thai"
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Role</TableHead>
                <TableHead className="w-[180px]">Specs (Size / Line)</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  role: "H1 Heading",
                  size: "36px",
                  line: "40px",
                  class: "text-4xl",
                },
                {
                  role: "H2 Heading",
                  size: "30px",
                  line: "36px",
                  class: "text-3xl",
                },
                {
                  role: "H3 Heading",
                  size: "24px",
                  line: "32px",
                  class: "text-2xl",
                },
                {
                  role: "H4 Heading",
                  size: "20px",
                  line: "28px",
                  class: "text-xl",
                },
                {
                  role: "H5 Heading",
                  size: "18px",
                  line: "28px",
                  class: "text-lg",
                },
                {
                  role: "H6 Heading",
                  size: "16px",
                  line: "24px",
                  class: "text-base",
                },
                {
                  role: "Label Large",
                  size: "18px",
                  line: "28px",
                  class: "text-lg",
                },
                {
                  role: "Label Medium",
                  size: "16px",
                  line: "24px",
                  class: "text-base",
                },
                {
                  role: "Label Small",
                  size: "14px",
                  line: "20px",
                  class: "text-sm",
                },
              ].map((item) => (
                <TableRow key={item.role}>
                  <TableCell className="font-medium text-muted-foreground">
                    {item.role}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex flex-col">
                      <span>Size: {item.size}</span>
                      <span className="text-xs opacity-70">
                        Line: {item.line}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-heading font-bold ${item.class}`}>
                      สวัสยามเช้า Hello World
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Divider />

      {/* Body Scale */}
      <Section
        title="Body & Paragraphs"
        description="Typography scale for reading text using Google Sans."
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Role</TableHead>
                <TableHead className="w-[180px]">Specs (Size / Line)</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  role: "Body",
                  size: "16px",
                  line: "24px",
                  class: "text-base",
                },
                {
                  role: "Caption",
                  size: "14px",
                  line: "20px",
                  class: "text-sm",
                },
                {
                  role: "Small",
                  size: "12px",
                  line: "16px",
                  class: "text-xs",
                },
              ].map((item) => (
                <TableRow key={item.role}>
                  <TableCell className="font-medium text-muted-foreground">
                    {item.role}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex flex-col">
                      <span>Size: {item.size}</span>
                      <span className="text-xs opacity-70">
                        Line: {item.line}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-sans font-normal ${item.class}`}>
                      สวัสยามเช้า The quick brown fox jumps over the lazy dog
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>
    </div>
  ),
};
