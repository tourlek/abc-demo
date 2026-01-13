import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section, Divider, ColorCard } from "./components";

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
            name="blue600"
            colorClass="bg-blue-600"
          />
          <ColorCard
            name="blue700"
            colorClass="bg-blue-700"
          />
          <ColorCard
            name="blue800"
            colorClass="bg-blue-800"
          />
          <ColorCard
            name="blue900"
            colorClass="bg-blue-900"
          />

        </div>
      </Section>

      <Divider />

      {/* Success Palette */}
      <Section title="Success" description="Success state colors.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Green50"
            colorClass="bg-green-50"
          />
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
          <ColorCard
            name="Green400"
            colorClass="bg-green-400"
          />
          <ColorCard
            name="Green500"
            colorClass="bg-green-500"
          />
          <ColorCard
            name="Green600"
            colorClass="bg-green-600"
          />
          <ColorCard
            name="Green700"
            colorClass="bg-green-700"
          />
          <ColorCard
            name="Green900"
            colorClass="bg-green-900"
          />
        </div>
      </Section>

      <Divider />

      {/* Amber Palette */}
      <Section title="Amber" description="Amber colors used in the system.">
        <div className="flex flex-wrap gap-4">
          <ColorCard name="Amber50" colorClass="bg-amber-50" />
          <ColorCard name="Amber100" colorClass="bg-amber-100" />
          <ColorCard name="Amber200" colorClass="bg-amber-200" />
          <ColorCard name="Amber300" colorClass="bg-amber-300" />
          <ColorCard name="Amber400" colorClass="bg-amber-400" />
          <ColorCard name="Amber500" colorClass="bg-amber-500" />
          <ColorCard name="Amber600" colorClass="bg-amber-600" />
          <ColorCard name="Amber700" colorClass="bg-amber-700" />
          <ColorCard name="Amber800" colorClass="bg-amber-800" />
          <ColorCard name="Amber900" colorClass="bg-amber-900" />
        </div>
      </Section>

      <Divider />

      {/* Gray Palette */}
      <Section title="Gray" description="Gray colors used in the system.">
        <div className="flex flex-wrap gap-4">
          <ColorCard name="Gray50" colorClass="bg-gray-50" />
          <ColorCard name="Gray100" colorClass="bg-gray-100" />
          <ColorCard name="Gray200" colorClass="bg-gray-200" />
          <ColorCard name="Gray400" colorClass="bg-gray-400" />
          <ColorCard name="Gray500" colorClass="bg-gray-500" />
          <ColorCard name="Gray600" colorClass="bg-gray-600" />
          <ColorCard name="Gray700" colorClass="bg-gray-700" />
          <ColorCard name="Gray800" colorClass="bg-gray-800" />
          <ColorCard name="Gray900" colorClass="bg-gray-900" />
        </div>
      </Section>

      <Divider />

      {/* Warning (Yellow) Palette */}
      <Section title="Warning (Yellow)" description="Yellow colors used in the system.">
        <div className="flex flex-wrap gap-4">
          <ColorCard name="Yellow500" colorClass="bg-yellow-500" />
        </div>
      </Section>

      <Divider />

      {/* Muted Palette */}
      <Section title="Muted" description="Muted colors used in the system.">
        <div className="flex flex-wrap gap-4">
          <ColorCard name="Muted200" colorClass="bg-muted-200" />
        </div>
      </Section>
    </div>
  ),
};
