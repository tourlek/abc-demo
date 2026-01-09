import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorSwatch, ColorPalette, Section, Divider } from "./components";

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

      {/* Base Colors */}
      <Section
        title="Base Colors"
        description="The core background and foreground colors."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <ColorSwatch
            name="Background"
            variable="--background"
            colorClass="bg-background"
            hex="var(--background)"
          />
          <ColorSwatch
            name="Foreground"
            variable="--foreground"
            colorClass="bg-foreground"
            hex="var(--foreground)"
          />
        </div>
      </Section>

      <Divider />

      {/* Component Colors */}
      <Section
        title="Component Colors"
        description="Semantic colors for various interactive components."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <ColorSwatch
            name="Card"
            variable="--card"
            colorClass="bg-card"
            hex="var(--card)"
          />
          <ColorSwatch
            name="Card Foreground"
            variable="--card-foreground"
            colorClass="bg-card-foreground"
            hex="var(--card-foreground)"
          />
          <ColorSwatch
            name="Popover"
            variable="--popover"
            colorClass="bg-popover"
            hex="var(--popover)"
          />
          <ColorSwatch
            name="Popover Foreground"
            variable="--popover-foreground"
            colorClass="bg-popover-foreground"
            hex="var(--popover-foreground)"
          />
          <ColorSwatch
            name="Primary"
            variable="--primary"
            colorClass="bg-primary"
            hex="var(--primary)"
          />
          <ColorSwatch
            name="Primary Foreground"
            variable="--primary-foreground"
            colorClass="bg-primary-foreground"
            hex="var(--primary-foreground)"
          />
          <ColorSwatch
            name="Secondary"
            variable="--secondary"
            colorClass="bg-secondary"
            hex="var(--secondary)"
          />
          <ColorSwatch
            name="Secondary Foreground"
            variable="--secondary-foreground"
            colorClass="bg-secondary-foreground"
            hex="var(--secondary-foreground)"
          />
          <ColorSwatch
            name="Muted"
            variable="--muted"
            colorClass="bg-muted"
            hex="var(--muted)"
          />
          <ColorSwatch
            name="Muted Foreground"
            variable="--muted-foreground"
            colorClass="bg-muted-foreground"
            hex="var(--muted-foreground)"
          />
          <ColorSwatch
            name="Accent"
            variable="--accent"
            colorClass="bg-accent"
            hex="var(--accent)"
          />
          <ColorSwatch
            name="Accent Foreground"
            variable="--accent-foreground"
            colorClass="bg-accent-foreground"
            hex="var(--accent-foreground)"
          />
          <ColorSwatch
            name="Destructive"
            variable="--destructive"
            colorClass="bg-destructive"
            hex="var(--destructive)"
          />
          <ColorSwatch
            name="Destructive Foreground"
            variable="--destructive-foreground"
            colorClass="bg-destructive-foreground"
            hex="var(--destructive-foreground)"
          />
        </div>
      </Section>

      <Divider />

      {/* Border & Input Colors */}
      <Section
        title="Border & Input Colors"
        description="Colors used for borders, inputs, and focus rings."
      >
        <div className="grid gap-3 md:grid-cols-3">
          <ColorSwatch
            name="Border"
            variable="--border"
            colorClass="bg-border"
            hex="var(--border)"
          />
          <ColorSwatch
            name="Input"
            variable="--input"
            colorClass="bg-input"
            hex="var(--input)"
          />
          <ColorSwatch
            name="Ring"
            variable="--ring"
            colorClass="bg-ring"
            hex="var(--ring)"
          />
        </div>
      </Section>

      <Divider />

      {/* Sidebar Colors */}
      <Section
        title="Sidebar Colors"
        description="Dedicated colors for the application sidebar."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <ColorSwatch
            name="Sidebar Background"
            variable="--sidebar"
            colorClass="bg-sidebar"
            hex="var(--sidebar)"
          />
          <ColorSwatch
            name="Sidebar Foreground"
            variable="--sidebar-foreground"
            colorClass="bg-sidebar-foreground"
            hex="var(--sidebar-foreground)"
          />
          <ColorSwatch
            name="Sidebar Primary"
            variable="--sidebar-primary"
            colorClass="bg-sidebar-primary"
            hex="var(--sidebar-primary)"
          />
          <ColorSwatch
            name="Sidebar Primary Foreground"
            variable="--sidebar-primary-foreground"
            colorClass="bg-sidebar-primary-foreground"
            hex="var(--sidebar-primary-foreground)"
          />
          <ColorSwatch
            name="Sidebar Accent"
            variable="--sidebar-accent"
            colorClass="bg-sidebar-accent"
            hex="var(--sidebar-accent)"
          />
          <ColorSwatch
            name="Sidebar Accent Foreground"
            variable="--sidebar-accent-foreground"
            colorClass="bg-sidebar-accent-foreground"
            hex="var(--sidebar-accent-foreground)"
          />
          <ColorSwatch
            name="Sidebar Border"
            variable="--sidebar-border"
            colorClass="bg-sidebar-border"
            hex="var(--sidebar-border)"
          />
          <ColorSwatch
            name="Sidebar Ring"
            variable="--sidebar-ring"
            colorClass="bg-sidebar-ring"
            hex="var(--sidebar-ring)"
          />
        </div>
      </Section>

      <Divider />

      <Section
        title="Global Palettes"
        description="Full color scales for core design system hues."
      >
        <ColorPalette
          title="Neutral (Gray)"
          colors={Array.from({ length: 12 }, (_, i) => ({
            name: `${i + 1}`,
            class: `bg-neutral-${i + 1}`,
            hex: `var(--neutral-${i + 1})`,
          }))}
        />
        {/* <div className="h-4" /> */}
        <ColorPalette
          title="Primary (Blue)"
          colors={Array.from({ length: 12 }, (_, i) => ({
            name: `${i + 1}`,
            class: `bg-primary-${i + 1}`,
            hex: `var(--primary-${i + 1})`,
          }))}
        />
        {/* <div className="h-4" /> */}
        <ColorPalette
          title="Secondary (Cool Gray)"
          colors={Array.from({ length: 12 }, (_, i) => ({
            name: `${i + 1}`,
            class: `bg-secondary-${i + 1}`,
            hex: `var(--secondary-${i + 1})`,
          }))}
        />
        {/* <div className="h-4" /> */}
        <ColorPalette
          title="Destructive (Red)"
          colors={Array.from({ length: 12 }, (_, i) => ({
            name: `${i + 1}`,
            class: `bg-destructive-${i + 1}`,
            hex: `var(--destructive-${i + 1})`,
          }))}
        />
      </Section>

      <Divider />

      {/* Chart Colors
      <Section
        title="Chart Colors"
        description="The data visualization color palette."
      >
        <ColorPalette
          title="Chart"
          colors={[
            { name: "1", class: "bg-chart-1", hex: "var(--chart-1)" },
            { name: "2", class: "bg-chart-2", hex: "var(--chart-2)" },
            { name: "3", class: "bg-chart-3", hex: "var(--chart-3)" },
            { name: "4", class: "bg-chart-4", hex: "var(--chart-4)" },
            { name: "5", class: "bg-chart-5", hex: "var(--chart-5)" },
            { name: "6", class: "bg-chart-6", hex: "var(--chart-6)" },
            { name: "7", class: "bg-chart-7", hex: "var(--chart-7)" },
            { name: "8", class: "bg-chart-8", hex: "var(--chart-8)" },
            { name: "9", class: "bg-chart-9", hex: "var(--chart-9)" },
            { name: "10", class: "bg-chart-10", hex: "var(--chart-10)" },
            { name: "11", class: "bg-chart-11", hex: "var(--chart-11)" },
            { name: "12", class: "bg-chart-12", hex: "var(--chart-12)" },
          ]}
        />
      </Section>

      <Divider /> */}

      {/* Custom Brand Colors */}
      <Section
        title="Custom Brand Colors"
        description="Custom brand colors that remain consistent across themes."
      >
        <div className="grid gap-3 md:grid-cols-3">
          <ColorSwatch
            name="Brand Blue"
            variable="--brand-blue"
            colorClass="bg-brand-blue"
            hex="var(--brand-blue)"
          />
          <ColorSwatch
            name="Brand Sky"
            variable="--brand-sky"
            colorClass="bg-brand-sky"
            hex="var(--brand-sky)"
          />
          <ColorSwatch
            name="Brand Beige"
            variable="--brand-beige"
            colorClass="bg-brand-beige"
            hex="var(--brand-beige)"
          />
        </div>
      </Section>

      <Divider />

      {/* Natural Palette */}
      <Section
        title="Natural Palette"
        description="Earthy tones and natural colors for organic design elements."
      >
        <div className="space-y-4">
          <ColorPalette
            title="Natural 1 - Dark Brown"
            colors={Array.from({ length: 12 }, (_, i) => ({
              name: `${i + 1}`,
              class: `bg-natural-1-${i + 1}`,
              hex: `var(--natural-1-${i + 1})`,
            }))}
          />
          <ColorPalette
            title="Natural 2 - Medium Brown"
            colors={Array.from({ length: 12 }, (_, i) => ({
              name: `${i + 1}`,
              class: `bg-natural-2-${i + 1}`,
              hex: `var(--natural-2-${i + 1})`,
            }))}
          />
          <ColorPalette
            title="Natural 3 - Warm Beige"
            colors={Array.from({ length: 12 }, (_, i) => ({
              name: `${i + 1}`,
              class: `bg-natural-3-${i + 1}`,
              hex: `var(--natural-3-${i + 1})`,
            }))}
          />
          <ColorPalette
            title="Natural 4 - Warm Gray"
            colors={Array.from({ length: 12 }, (_, i) => ({
              name: `${i + 1}`,
              class: `bg-natural-4-${i + 1}`,
              hex: `var(--natural-4-${i + 1})`,
            }))}
          />
          <ColorPalette
            title="Natural 5 - Sage Green"
            colors={Array.from({ length: 12 }, (_, i) => ({
              name: `${i + 1}`,
              class: `bg-natural-5-${i + 1}`,
              hex: `var(--natural-5-${i + 1})`,
            }))}
          />
          <ColorPalette
            title="Natural 6 - Light Sand"
            colors={Array.from({ length: 12 }, (_, i) => ({
              name: `${i + 1}`,
              class: `bg-natural-6-${i + 1}`,
              hex: `var(--natural-6-${i + 1})`,
            }))}
          />
          <ColorPalette
            title="Natural 7 - Off White"
            colors={Array.from({ length: 12 }, (_, i) => ({
              name: `${i + 1}`,
              class: `bg-natural-7-${i + 1}`,
              hex: `var(--natural-7-${i + 1})`,
            }))}
          />
        </div>
      </Section>
    </div>
  ),
};
