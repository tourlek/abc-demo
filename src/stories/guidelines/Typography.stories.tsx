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
        description="The primary font stack uses Google Sans Flex for English and Google Sans Thai for Thai text."
      >
        <ComponentPreview
          title="Primary Font"
          description="Used for all text including headings and body."
          code={`font-family: "Google Sans Flex", "Google Sans Thai", system-ui, sans-serif;`}
        >
          <div className="text-center space-y-2">
            <p className="text-3xl font-semibold">Google Sans</p>
            <p className="text-lg text-muted-foreground">Flex + Thai</p>
          </div>
        </ComponentPreview>
      </Section>

      <Divider />

      {/* Language Examples */}
      <Section
        title="Language Support"
        description="Examples of text rendering in English and Thai."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ComponentPreview title="English">
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold">The quick brown fox</p>
              <p className="text-base">jumps over the lazy dog</p>
              <p className="text-sm text-muted-foreground font-mono">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
            </div>
          </ComponentPreview>

          <ComponentPreview title="ภาษาไทย">
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold">สวัสดีครับ</p>
              <p className="text-base">ยินดีต้อนรับสู่ระบบออกแบบ</p>
              <p className="text-sm text-muted-foreground font-mono">
                กขฃคฅฆงจฉชซฌญฎฏฐ
              </p>
            </div>
          </ComponentPreview>
        </div>
      </Section>

      <Divider />

      {/* Headings */}
      <Section title="Headings" description="Heading hierarchy from H1 to H6.">
        <ComponentPreview
          code={`<h1 className="text-5xl font-bold">Heading 1</h1>
<h2 className="text-4xl font-bold">Heading 2</h2>
<h3 className="text-3xl font-semibold">Heading 3</h3>
<h4 className="text-2xl font-semibold">Heading 4</h4>
<h5 className="text-xl font-medium">Heading 5</h5>
<h6 className="text-lg font-medium">Heading 6</h6>`}
        >
          <div className="space-y-4 w-full px-4">
            <div className="flex items-baseline gap-4 border-b pb-2">
              <span className="text-xs text-muted-foreground w-8">H1</span>
              <p className="text-5xl font-bold">Heading One</p>
            </div>
            <div className="flex items-baseline gap-4 border-b pb-2">
              <span className="text-xs text-muted-foreground w-8">H2</span>
              <p className="text-4xl font-bold">Heading Two</p>
            </div>
            <div className="flex items-baseline gap-4 border-b pb-2">
              <span className="text-xs text-muted-foreground w-8">H3</span>
              <p className="text-3xl font-semibold">Heading Three</p>
            </div>
            <div className="flex items-baseline gap-4 border-b pb-2">
              <span className="text-xs text-muted-foreground w-8">H4</span>
              <p className="text-2xl font-semibold">Heading Four</p>
            </div>
            <div className="flex items-baseline gap-4 border-b pb-2">
              <span className="text-xs text-muted-foreground w-8">H5</span>
              <p className="text-xl font-medium">Heading Five</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-8">H6</span>
              <p className="text-lg font-medium">Heading Six</p>
            </div>
          </div>
        </ComponentPreview>
      </Section>

      <Divider />

      {/* Font Weights */}
      <Section
        title="Font Weights"
        description="Available font weights from light to bold."
      >
        <ComponentPreview
          code={`<p className="font-light">Light (300)</p>
<p className="font-normal">Regular (400)</p>
<p className="font-medium">Medium (500)</p>
<p className="font-semibold">Semibold (600)</p>
<p className="font-bold">Bold (700)</p>`}
        >
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Weight</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Example (Thai / English)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Light</TableCell>
                  <TableCell className="text-muted-foreground">300</TableCell>
                  <TableCell className="font-light text-2xl">
                    สวัสดี Hello
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Regular</TableCell>
                  <TableCell className="text-muted-foreground">400</TableCell>
                  <TableCell className="font-normal text-2xl">
                    สวัสดี Hello
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Medium</TableCell>
                  <TableCell className="text-muted-foreground">500</TableCell>
                  <TableCell className="font-medium text-2xl">
                    สวัสดี Hello
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Semibold</TableCell>
                  <TableCell className="text-muted-foreground">600</TableCell>
                  <TableCell className="font-semibold text-2xl">
                    สวัสดี Hello
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Bold</TableCell>
                  <TableCell className="text-muted-foreground">700</TableCell>
                  <TableCell className="font-bold text-2xl">
                    สวัสดี Hello
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ComponentPreview>
      </Section>

      <Divider />

      {/* Text Sizes */}
      <Section title="Text Sizes" description="Text size scale from xs to 2xl.">
        <ComponentPreview>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Class</TableHead>
                  <TableHead className="w-[180px]">Size</TableHead>
                  <TableHead>Example</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      text-xs
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    12px (0.75rem)
                  </TableCell>
                  <TableCell className="text-xs">
                    The quick brown fox jumps over the lazy dog
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      text-sm
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    14px (0.875rem)
                  </TableCell>
                  <TableCell className="text-sm">
                    The quick brown fox jumps over the lazy dog
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      text-base
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    16px (1rem)
                  </TableCell>
                  <TableCell className="text-base">
                    The quick brown fox jumps over the lazy dog
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      text-lg
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    18px (1.125rem)
                  </TableCell>
                  <TableCell className="text-lg">
                    The quick brown fox jumps over the lazy dog
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      text-xl
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    20px (1.25rem)
                  </TableCell>
                  <TableCell className="text-xl">
                    The quick brown fox jumps over the lazy dog
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      text-2xl
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    24px (1.5rem)
                  </TableCell>
                  <TableCell className="text-2xl">
                    The quick brown fox jumps over the lazy dog
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ComponentPreview>
      </Section>
    </div>
  ),
};
