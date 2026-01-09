import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentPreview, ColorSwatch, Section, Divider } from "./components";

const meta = {
  title: "Guidelines/Colors",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Main Colors Documentation
export const Docs: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Colors</h1>
        <p className="text-xl text-muted-foreground">
          Color palette and semantic color tokens for the design system.
        </p>
      </div>

      <Divider />

      {/* Primary Color */}
      <Section
        title="Primary"
        description="The main brand color used for primary actions and emphasis."
      >
        <div className="rounded-lg border p-6 bg-card">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-lg bg-primary shadow-sm" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Primary Blue</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-mono">HEX:</span> #007cce
                </p>
                <p>
                  <span className="font-mono">OKLCH:</span> oklch(0.55 0.15 235)
                </p>
                <p>
                  <span className="font-mono">CSS:</span> var(--primary)
                </p>
              </div>
            </div>
          </div>
        </div>

        <ComponentPreview title="Usage Example">
          <div className="flex gap-4">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">
              Primary Button
            </button>
            <span className="text-primary font-medium">Primary Text</span>
          </div>
        </ComponentPreview>
      </Section>

      <Divider />

      {/* Theme Colors */}
      <Section
        title="Theme Colors"
        description="Core colors that adapt between light and dark modes."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <ColorSwatch
            name="Background"
            variable="--background"
            colorClass="bg-background"
          />
          <ColorSwatch
            name="Foreground"
            variable="--foreground"
            colorClass="bg-foreground"
          />
          <ColorSwatch
            name="Primary"
            variable="--primary"
            colorClass="bg-primary"
            hex="#007cce"
          />
          <ColorSwatch
            name="Primary Foreground"
            variable="--primary-foreground"
            colorClass="bg-primary-foreground"
          />
          <ColorSwatch
            name="Secondary"
            variable="--secondary"
            colorClass="bg-secondary"
          />
          <ColorSwatch
            name="Secondary Foreground"
            variable="--secondary-foreground"
            colorClass="bg-secondary-foreground"
          />
          <ColorSwatch name="Muted" variable="--muted" colorClass="bg-muted" />
          <ColorSwatch
            name="Muted Foreground"
            variable="--muted-foreground"
            colorClass="bg-muted-foreground"
          />
        </div>
      </Section>

      <Divider />

      {/* Semantic Colors */}
      <Section
        title="Semantic Colors"
        description="Colors with specific meanings for user feedback."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <ColorSwatch
            name="Accent"
            variable="--accent"
            colorClass="bg-accent"
          />
          <ColorSwatch
            name="Accent Foreground"
            variable="--accent-foreground"
            colorClass="bg-accent-foreground"
          />
          <ColorSwatch
            name="Destructive"
            variable="--destructive"
            colorClass="bg-destructive"
          />
        </div>

        <ComponentPreview title="Destructive Usage">
          <div className="flex gap-4">
            <button className="bg-destructive/10 text-destructive px-4 py-2 rounded-md font-medium">
              Delete
            </button>
            <span className="text-destructive">Error message</span>
          </div>
        </ComponentPreview>
      </Section>

      <Divider />

      {/* Surface Colors */}
      <Section
        title="Surface Colors"
        description="Colors for cards, popovers, and elevated surfaces."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <ColorSwatch name="Card" variable="--card" colorClass="bg-card" />
          <ColorSwatch
            name="Card Foreground"
            variable="--card-foreground"
            colorClass="bg-card-foreground"
          />
          <ColorSwatch
            name="Popover"
            variable="--popover"
            colorClass="bg-popover"
          />
          <ColorSwatch
            name="Popover Foreground"
            variable="--popover-foreground"
            colorClass="bg-popover-foreground"
          />
        </div>
      </Section>

      <Divider />

      {/* UI Colors */}
      <Section
        title="UI Colors"
        description="Colors for borders, inputs, and focus states."
      >
        <div className="grid gap-3 md:grid-cols-3">
          <ColorSwatch
            name="Border"
            variable="--border"
            colorClass="bg-border"
          />
          <ColorSwatch name="Input" variable="--input" colorClass="bg-input" />
          <ColorSwatch name="Ring" variable="--ring" colorClass="bg-ring" />
        </div>
      </Section>

      <Divider />

      {/* Chart Colors */}
      <Section
        title="Chart Colors"
        description="A palette designed for data visualization."
      >
        <ComponentPreview>
          <div className="w-full space-y-4 px-4">
            <div className="flex gap-2 h-16">
              <div className="flex-1 rounded-lg bg-chart-1" />
              <div className="flex-1 rounded-lg bg-chart-2" />
              <div className="flex-1 rounded-lg bg-chart-3" />
              <div className="flex-1 rounded-lg bg-chart-4" />
              <div className="flex-1 rounded-lg bg-chart-5" />
            </div>
            <div className="flex gap-2 text-xs text-muted-foreground text-center">
              <span className="flex-1">chart-1</span>
              <span className="flex-1">chart-2</span>
              <span className="flex-1">chart-3</span>
              <span className="flex-1">chart-4</span>
              <span className="flex-1">chart-5</span>
            </div>
          </div>
        </ComponentPreview>
      </Section>
    </div>
  ),
};
