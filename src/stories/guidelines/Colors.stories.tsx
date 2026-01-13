import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPalette, Section, Divider, ColorCard } from "./components";

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

      {/* <Divider /> */}

      {/* Base Colors */}
      {/* <Section
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
      </Section> */}

      {/* <Divider /> */}

      {/* Component Colors */}
      {/* <Section
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

      <Divider /> */}

      {/* Border & Input Colors */}
      {/* <Section
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
      </Section> */}

      {/* <Divider /> */}

      {/* Sidebar Colors */}
      {/* <Section
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
      </Section> */}

      {/* <Divider /> */}


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

      {/* Primary Palette */}
      <Section title="Primary" description="Core blue palette for the application.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="blue 50"
            variable="--blue-50"
            colorClass="bg-blue-50"
            hex="var(--blue-50)"
          />
          <ColorCard
            name="blue 100"
            variable="--blue-100"
            colorClass="bg-blue-100"
            hex="var(--blue-100)"
          />
          <ColorCard
            name="blue 200"
            variable="--blue-200"
            colorClass="bg-blue-200"
            hex="var(--blue-200)"
          />
          <ColorCard
            name="blue300"
            variable="--blue-300"
            colorClass="bg-blue-300"
            hex="var(--blue-300)"
            description="Secondary blue"
          />
          <ColorCard
            name="blue400"
            variable="--blue-400"
            colorClass="bg-blue-400"
            hex="var(--blue-400)"
            description="Primary blue"
          />
          <ColorCard
            name="blue500"
            variable="--blue-500"
            colorClass="bg-blue-500"
            hex="var(--blue-500)"
          />
          <ColorCard
            name="Hover"
            variable="--blue-hover"
            colorClass="bg-blue-hover"
            hex="var(--blue-hover)"
          />
        </div>
      </Section>

      <Divider />

      {/* Background Palette */}
      <Section title="Background" description="Background color scale.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Bg 50"
            variable="--bg-50"
            colorClass="bg-bg-50"
            hex="var(--bg-50)"
          />
          <ColorCard
            name="Bg 100"
            variable="--bg-100"
            colorClass="bg-bg-100"
            hex="var(--bg-100)"
          />
          <ColorCard
            name="Bg 200"
            variable="--bg-200"
            colorClass="bg-bg-200"
            hex="var(--bg-200)"
          />
          <ColorCard
            name="Bg 300"
            variable="--bg-300"
            colorClass="bg-bg-300"
            hex="var(--bg-300)"
          />
        </div>
      </Section>

      <Divider />

      {/* Secondary Palette */}
      <Section title="Secondary" description="Secondary cream/beige palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Cream100"
            variable="--cream-100"
            colorClass="bg-cream-100"
            hex="var(--cream-100)"
          />
          <ColorCard
            name="Cream200"
            variable="--cream-200"
            colorClass="bg-cream-200"
            hex="var(--cream-200)"
          />
          <ColorCard
            name="Cream300"
            variable="--cream-300"
            colorClass="bg-cream-300"
            hex="var(--cream-300)"
          />
          <ColorCard
            name="Cream400"
            variable="--cream-400"
            colorClass="bg-cream-400"
            hex="var(--cream-400)"
          />
        </div>
      </Section>

      <Divider />

      {/* Neutral Palette */}
      <Section title="Neutral" description="Grey scale and black.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Grey100"
            variable="--grey-100"
            colorClass="bg-grey-100"
            hex="var(--grey-100)"
          />
          <ColorCard
            name="Grey 200"
            variable="--grey-200"
            colorClass="bg-grey-200"
            hex="var(--grey-200)"
          />
          <ColorCard
            name="Grey300"
            variable="--grey-300"
            colorClass="bg-grey-300"
            hex="var(--grey-300)"
          />
          <ColorCard
            name="Grey400"
            variable="--grey-400"
            colorClass="bg-grey-400"
            hex="var(--grey-400)"
          />
          <ColorCard
            name="Grey 500"
            variable="--grey-500"
            colorClass="bg-grey-500"
            hex="var(--grey-500)"
          />
          <ColorCard
            name="Grey 800"
            variable="--grey-800"
            colorClass="bg-grey-800"
            hex="var(--grey-800)"
            description="Description"
          />
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <ColorCard
            name="Black"
            variable="--black"
            colorClass="bg-black"
            hex="var(--black)"
          />
        </div>
      </Section>

      <Divider />

      {/* Error Palette */}
      <Section title="Error" description="Error state colors.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="red100"
            variable="--red-100"
            colorClass="bg-red-100"
            hex="var(--red-100)"
          />
          <ColorCard
            name="red200"
            variable="--red-200"
            colorClass="bg-red-200"
            hex="var(--red-200)"
          />
          <ColorCard
            name="red300"
            variable="--red-300"
            colorClass="bg-red-300"
            hex="var(--red-300)"
            description="Error"
          />
        </div>
      </Section>

      <Divider />

      {/* Success Palette */}
      <Section title="Success" description="Success state colors.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Green100"
            variable="--green-100"
            colorClass="bg-green-100"
            hex="var(--green-100)"
          />
          <ColorCard
            name="Green200"
            variable="--green-200"
            colorClass="bg-green-200"
            hex="var(--green-200)"
          />
          <ColorCard
            name="Green300"
            variable="--green-300"
            colorClass="bg-green-300"
            hex="var(--green-300)"
            description="Success"
          />
        </div>
      </Section>

      <Divider />

      {/* Warning Palette */}
      <Section title="Warning" description="Warning state colors.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Yellow100"
            variable="--yellow-100"
            colorClass="bg-yellow-100"
            hex="var(--yellow-100)"
          />
          <ColorCard
            name="Yellow200"
            variable="--yellow-200"
            colorClass="bg-yellow-200"
            hex="var(--yellow-200)"
          />
          <ColorCard
            name="Yellow300"
            variable="--yellow-300"
            colorClass="bg-yellow-300"
            hex="var(--yellow-300)"
            description="Warning"
          />
        </div>
      </Section>

      <Divider />

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
