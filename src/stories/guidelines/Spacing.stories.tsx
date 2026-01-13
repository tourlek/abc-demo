import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ComponentPreview,
  Section,
  Divider,
  SpacingBox,
  SpacingHighlight,
} from "./components";
import { Card } from "../../components/ui/card";

const meta = {
  title: "Guidelines/Spacing",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Main Spacing Documentation
export const Docs: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Spacing</h1>
        <p className="text-xl text-muted-foreground">
          Spacing scale, padding, margin, and gap utilities.
        </p>
      </div>

      <Divider />

      {/* Spacing Scale */}
      <Section
        title="Spacing Scale"
        description="The base unit is 4px (0.25rem). All spacing values are multiples of this base."
      >
        <ComponentPreview>
          <div className="w-full space-y-2 px-4">
            <SpacingBox size="1" value="4px" className="w-1" />
            <SpacingBox size="2" value="8px" className="w-2" />
            <SpacingBox size="3" value="12px" className="w-3" />
            <SpacingBox size="4" value="16px" className="w-4" />
            <SpacingBox size="5" value="20px" className="w-5" />
            <SpacingBox size="6" value="24px" className="w-6" />
            <SpacingBox size="8" value="32px" className="w-8" />
            <SpacingBox size="10" value="40px" className="w-10" />
            <SpacingBox size="12" value="48px" className="w-12" />
            <SpacingBox size="16" value="64px" className="w-16" />
          </div>
        </ComponentPreview>
      </Section>

      <Divider />

      {/* Padding */}
      <Section
        title="Padding"
        description="Add inner spacing to elements using the padding utilities."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {["4", "6", "8", "10"].map((size) => (
            <ComponentPreview
              key={size}
              title={`p-${size} (${parseInt(size) * 4}px)`}
              code={`<Card className="p-${size}">
  <div className="bg-muted border p-4 rounded text-center text-muted-foreground text-sm">
    Content
  </div>
</Card>`}
            >
              <Card className="w-full overflow-hidden">
                <div className={`p-${size} relative`}>
                  <SpacingHighlight className="absolute inset-0 z-0 opacity-20" />
                  <div className="relative z-10 bg-background rounded border border-dashed text-sm p-2 text-center text-muted-foreground shadow-none">
                    Content
                  </div>
                </div>
              </Card>
            </ComponentPreview>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Margin */}
      <Section
        title="Margin"
        description="Add outer spacing to elements using the margin utilities."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {["4", "6", "8", "10"].map((size) => (
            <ComponentPreview
              key={size}
              title={`m-${size} (${parseInt(size) * 4}px)`}
              code={`<div className="m-${size}">
  <Card className="p-4 text-center text-muted-foreground text-sm">
    Content
  </Card>
</div>`}
            >
              <div className="w-full border rounded-lg bg-muted/30 overflow-hidden">
                <div className="relative inline-block">
                  {/* The visual margin area (striped) */}
                  <SpacingHighlight
                    className={`absolute -inset-${size} w-[calc(100%_+_${
                      parseInt(size) * 8
                    }px)] h-[calc(100%_+_${parseInt(size) * 8}px)] z-0`}
                  />

                  {/* The element itself */}
                  <Card className={`m-${size} relative z-10 w-fit`}>
                    <div className="text-sm p-4 text-center text-muted-foreground">
                      Margin Element
                    </div>
                  </Card>
                </div>
              </div>
            </ComponentPreview>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Gap */}
      <Section title="Gap" description="Spacing between flex or grid items.">
        <ComponentPreview
          title="gap-2 (8px)"
          code={`<div className="flex gap-2">
  <Card>...</Card>
  <Card>...</Card>
</div>`}
        >
          <div className="flex gap-2 w-full p-4 bg-muted/50 rounded-lg overflow-x-auto">
            <Card className="w-16 h-16 flex items-center justify-center shrink-0">
              1
            </Card>
            <Card className="w-16 h-16 flex items-center justify-center shrink-0">
              2
            </Card>
            <Card className="w-16 h-16 flex items-center justify-center shrink-0">
              3
            </Card>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="gap-4 (16px)"
          code={`<div className="flex gap-4">
  <Card>...</Card>
  <Card>...</Card>
</div>`}
        >
          <div className="flex gap-4 w-full p-4 bg-muted/50 rounded-lg overflow-x-auto">
            <Card className="w-16 h-16 flex items-center justify-center shrink-0">
              1
            </Card>
            <Card className="w-16 h-16 flex items-center justify-center shrink-0">
              2
            </Card>
            <Card className="w-16 h-16 flex items-center justify-center shrink-0">
              3
            </Card>
          </div>
        </ComponentPreview>

        <ComponentPreview
          title="gap-8 (32px)"
          code={`<div className="flex gap-8">
  <Card>...</Card>
  <Card>...</Card>
</div>`}
        >
          <div className="flex gap-8 w-full p-4 bg-muted/50 rounded-lg overflow-x-auto">
            <Card className="w-16 h-16 flex items-center justify-center shrink-0">
              1
            </Card>
            <Card className="w-16 h-16 flex items-center justify-center shrink-0">
              2
            </Card>
            <Card className="w-16 h-16 flex items-center justify-center shrink-0">
              3
            </Card>
          </div>
        </ComponentPreview>
      </Section>

      <Divider />

      {/* Border Radius */}
      <Section
        title="Border Radius"
        description="Rounded corners for elements. Base radius is 14px (0.875rem)."
      >
        <ComponentPreview>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="flex flex-col items-center gap-2">
              <Card className="w-20 h-20 rounded-sm flex items-center justify-center bg-primary text-primary-foreground">
                sm
              </Card>
              <code className="text-xs text-muted-foreground">rounded-sm</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Card className="w-20 h-20 rounded-md flex items-center justify-center bg-primary text-primary-foreground">
                md
              </Card>
              <code className="text-xs text-muted-foreground">rounded-md</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Card className="w-20 h-20 rounded-lg flex items-center justify-center bg-primary text-primary-foreground">
                lg
              </Card>
              <code className="text-xs text-muted-foreground">rounded-lg</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Card className="w-20 h-20 rounded-xl flex items-center justify-center bg-primary text-primary-foreground">
                xl
              </Card>
              <code className="text-xs text-muted-foreground">rounded-xl</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Card className="w-20 h-20 rounded-2xl flex items-center justify-center bg-primary text-primary-foreground opacity-90">
                2xl
              </Card>
              <code className="text-xs text-muted-foreground">rounded-2xl</code>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Card className="w-20 h-20 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                full
              </Card>
              <code className="text-xs text-muted-foreground">
                rounded-full
              </code>
            </div>
          </div>
        </ComponentPreview>
      </Section>
    </div>
  ),
};
