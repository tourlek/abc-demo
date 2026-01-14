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

      {/* Primary Brand Color */}
      <Section
        title="Primary"
        description="The main brand color palette."
      >
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Primary 50"
            variable="--primary-50"
            colorClass="bg-primary-50"
            hex="var(--primary-50)"
          />
          <ColorCard
            name="Primary 100"
            variable="--primary-100"
            colorClass="bg-primary-100"
            hex="var(--primary-100)"
          />
          <ColorCard
            name="Primary 200"
            variable="--primary-200"
            colorClass="bg-primary-200"
            hex="var(--primary-200)"
          />
          <ColorCard
            name="Primary 300"
            variable="--primary-300"
            colorClass="bg-primary-300"
            hex="var(--primary-300)"
          />
          <ColorCard
            name="Primary 400"
            variable="--primary-400"
            colorClass="bg-primary-400"
            hex="var(--primary-400)"
          />
          <ColorCard
            name="Primary 500"
            variable="--primary-500"
            colorClass="bg-primary-500"
            hex="var(--primary-500)"
          />
          <ColorCard
            name="Primary 600"
            variable="--primary-600"
            colorClass="bg-primary-600"
            hex="var(--primary-600)"
            description="Brand Color"
          />
          <ColorCard
            name="Primary 700"
            variable="--primary-700"
            colorClass="bg-primary-700"
            hex="var(--primary-700)"
          />
          <ColorCard
            name="Primary 800"
            variable="--primary-800"
            colorClass="bg-primary-800"
            hex="var(--primary-800)"
          />
          <ColorCard
            name="Primary 900"
            variable="--primary-900"
            colorClass="bg-primary-900"
            hex="var(--primary-900)"
          />
          <ColorCard
            name="Primary 950"
            variable="--primary-950"
            colorClass="bg-primary-950"
            hex="var(--primary-950)"
          />
        </div>
      </Section>

      <Divider />

      {/* Blue Palette */}
      <Section
        title="Blue"
        description="Blue color palette."
      >
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
          />
          <ColorCard
            name="blue500"
            variable="--blue-500"
            colorClass="bg-blue-500"
            hex="var(--blue-500)"
          />
          <ColorCard name="blue600" colorClass="bg-blue-600" />
          <ColorCard name="blue700" colorClass="bg-blue-700" />
          <ColorCard name="blue800" colorClass="bg-blue-800" />
          <ColorCard name="blue900" colorClass="bg-blue-900" />
        </div>
      </Section>

      <Divider />

      {/* Success Palette */}
      <Section title="Success" description="Success state colors.">
        <div className="flex flex-wrap gap-4">
          <ColorCard name="Green50" colorClass="bg-green-50" />
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
          <ColorCard name="Green400" colorClass="bg-green-400" />
          <ColorCard name="Green500" colorClass="bg-green-500" />
          <ColorCard name="Green600" colorClass="bg-green-600" />
          <ColorCard name="Green700" colorClass="bg-green-700" />
          <ColorCard name="Green900" colorClass="bg-green-900" />
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
      <Section
        title="Warning (Yellow)"
        description="Yellow colors used in the system."
      >
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
      <Divider />
      <Section title="Slate" description="Slate color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="slate 50"
            variable="--slate-50"
            colorClass="bg-slate-50"
            hex="var(--slate-50)"
          />
          <ColorCard
            name="slate 100"
            variable="--slate-100"
            colorClass="bg-slate-100"
            hex="var(--slate-100)"
          />
          <ColorCard
            name="slate 200"
            variable="--slate-200"
            colorClass="bg-slate-200"
            hex="var(--slate-200)"
          />
          <ColorCard
            name="slate 300"
            variable="--slate-300"
            colorClass="bg-slate-300"
            hex="var(--slate-300)"
          />
          <ColorCard
            name="slate 400"
            variable="--slate-400"
            colorClass="bg-slate-400"
            hex="var(--slate-400)"
          />
          <ColorCard
            name="slate 500"
            variable="--slate-500"
            colorClass="bg-slate-500"
            hex="var(--slate-500)"
          />
          <ColorCard
            name="slate 600"
            variable="--slate-600"
            colorClass="bg-slate-600"
            hex="var(--slate-600)"
          />
          <ColorCard
            name="slate 700"
            variable="--slate-700"
            colorClass="bg-slate-700"
            hex="var(--slate-700)"
          />
          <ColorCard
            name="slate 800"
            variable="--slate-800"
            colorClass="bg-slate-800"
            hex="var(--slate-800)"
          />
          <ColorCard
            name="slate 900"
            variable="--slate-900"
            colorClass="bg-slate-900"
            hex="var(--slate-900)"
          />
          <ColorCard
            name="slate 950"
            variable="--slate-950"
            colorClass="bg-slate-950"
            hex="var(--slate-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Gray" description="Gray color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="gray 50"
            variable="--gray-50"
            colorClass="bg-gray-50"
            hex="var(--gray-50)"
          />
          <ColorCard
            name="gray 100"
            variable="--gray-100"
            colorClass="bg-gray-100"
            hex="var(--gray-100)"
          />
          <ColorCard
            name="gray 200"
            variable="--gray-200"
            colorClass="bg-gray-200"
            hex="var(--gray-200)"
          />
          <ColorCard
            name="gray 300"
            variable="--gray-300"
            colorClass="bg-gray-300"
            hex="var(--gray-300)"
          />
          <ColorCard
            name="gray 400"
            variable="--gray-400"
            colorClass="bg-gray-400"
            hex="var(--gray-400)"
          />
          <ColorCard
            name="gray 500"
            variable="--gray-500"
            colorClass="bg-gray-500"
            hex="var(--gray-500)"
          />
          <ColorCard
            name="gray 600"
            variable="--gray-600"
            colorClass="bg-gray-600"
            hex="var(--gray-600)"
          />
          <ColorCard
            name="gray 700"
            variable="--gray-700"
            colorClass="bg-gray-700"
            hex="var(--gray-700)"
          />
          <ColorCard
            name="gray 800"
            variable="--gray-800"
            colorClass="bg-gray-800"
            hex="var(--gray-800)"
          />
          <ColorCard
            name="gray 900"
            variable="--gray-900"
            colorClass="bg-gray-900"
            hex="var(--gray-900)"
          />
          <ColorCard
            name="gray 950"
            variable="--gray-950"
            colorClass="bg-gray-950"
            hex="var(--gray-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Zinc" description="Zinc color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="zinc 50"
            variable="--zinc-50"
            colorClass="bg-zinc-50"
            hex="var(--zinc-50)"
          />
          <ColorCard
            name="zinc 100"
            variable="--zinc-100"
            colorClass="bg-zinc-100"
            hex="var(--zinc-100)"
          />
          <ColorCard
            name="zinc 200"
            variable="--zinc-200"
            colorClass="bg-zinc-200"
            hex="var(--zinc-200)"
          />
          <ColorCard
            name="zinc 300"
            variable="--zinc-300"
            colorClass="bg-zinc-300"
            hex="var(--zinc-300)"
          />
          <ColorCard
            name="zinc 400"
            variable="--zinc-400"
            colorClass="bg-zinc-400"
            hex="var(--zinc-400)"
          />
          <ColorCard
            name="zinc 500"
            variable="--zinc-500"
            colorClass="bg-zinc-500"
            hex="var(--zinc-500)"
          />
          <ColorCard
            name="zinc 600"
            variable="--zinc-600"
            colorClass="bg-zinc-600"
            hex="var(--zinc-600)"
          />
          <ColorCard
            name="zinc 700"
            variable="--zinc-700"
            colorClass="bg-zinc-700"
            hex="var(--zinc-700)"
          />
          <ColorCard
            name="zinc 800"
            variable="--zinc-800"
            colorClass="bg-zinc-800"
            hex="var(--zinc-800)"
          />
          <ColorCard
            name="zinc 900"
            variable="--zinc-900"
            colorClass="bg-zinc-900"
            hex="var(--zinc-900)"
          />
          <ColorCard
            name="zinc 950"
            variable="--zinc-950"
            colorClass="bg-zinc-950"
            hex="var(--zinc-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Neutral" description="Neutral color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="neutral 50"
            variable="--neutral-50"
            colorClass="bg-neutral-50"
            hex="var(--neutral-50)"
          />
          <ColorCard
            name="neutral 100"
            variable="--neutral-100"
            colorClass="bg-neutral-100"
            hex="var(--neutral-100)"
          />
          <ColorCard
            name="neutral 200"
            variable="--neutral-200"
            colorClass="bg-neutral-200"
            hex="var(--neutral-200)"
          />
          <ColorCard
            name="neutral 300"
            variable="--neutral-300"
            colorClass="bg-neutral-300"
            hex="var(--neutral-300)"
          />
          <ColorCard
            name="neutral 400"
            variable="--neutral-400"
            colorClass="bg-neutral-400"
            hex="var(--neutral-400)"
          />
          <ColorCard
            name="neutral 500"
            variable="--neutral-500"
            colorClass="bg-neutral-500"
            hex="var(--neutral-500)"
          />
          <ColorCard
            name="neutral 600"
            variable="--neutral-600"
            colorClass="bg-neutral-600"
            hex="var(--neutral-600)"
          />
          <ColorCard
            name="neutral 700"
            variable="--neutral-700"
            colorClass="bg-neutral-700"
            hex="var(--neutral-700)"
          />
          <ColorCard
            name="neutral 800"
            variable="--neutral-800"
            colorClass="bg-neutral-800"
            hex="var(--neutral-800)"
          />
          <ColorCard
            name="neutral 900"
            variable="--neutral-900"
            colorClass="bg-neutral-900"
            hex="var(--neutral-900)"
          />
          <ColorCard
            name="neutral 950"
            variable="--neutral-950"
            colorClass="bg-neutral-950"
            hex="var(--neutral-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Stone" description="Stone color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="stone 50"
            variable="--stone-50"
            colorClass="bg-stone-50"
            hex="var(--stone-50)"
          />
          <ColorCard
            name="stone 100"
            variable="--stone-100"
            colorClass="bg-stone-100"
            hex="var(--stone-100)"
          />
          <ColorCard
            name="stone 200"
            variable="--stone-200"
            colorClass="bg-stone-200"
            hex="var(--stone-200)"
          />
          <ColorCard
            name="stone 300"
            variable="--stone-300"
            colorClass="bg-stone-300"
            hex="var(--stone-300)"
          />
          <ColorCard
            name="stone 400"
            variable="--stone-400"
            colorClass="bg-stone-400"
            hex="var(--stone-400)"
          />
          <ColorCard
            name="stone 500"
            variable="--stone-500"
            colorClass="bg-stone-500"
            hex="var(--stone-500)"
          />
          <ColorCard
            name="stone 600"
            variable="--stone-600"
            colorClass="bg-stone-600"
            hex="var(--stone-600)"
          />
          <ColorCard
            name="stone 700"
            variable="--stone-700"
            colorClass="bg-stone-700"
            hex="var(--stone-700)"
          />
          <ColorCard
            name="stone 800"
            variable="--stone-800"
            colorClass="bg-stone-800"
            hex="var(--stone-800)"
          />
          <ColorCard
            name="stone 900"
            variable="--stone-900"
            colorClass="bg-stone-900"
            hex="var(--stone-900)"
          />
          <ColorCard
            name="stone 950"
            variable="--stone-950"
            colorClass="bg-stone-950"
            hex="var(--stone-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Red" description="Red color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="red 50"
            variable="--red-50"
            colorClass="bg-red-50"
            hex="var(--red-50)"
          />
          <ColorCard
            name="red 100"
            variable="--red-100"
            colorClass="bg-red-100"
            hex="var(--red-100)"
          />
          <ColorCard
            name="red 200"
            variable="--red-200"
            colorClass="bg-red-200"
            hex="var(--red-200)"
          />
          <ColorCard
            name="red 300"
            variable="--red-300"
            colorClass="bg-red-300"
            hex="var(--red-300)"
          />
          <ColorCard
            name="red 400"
            variable="--red-400"
            colorClass="bg-red-400"
            hex="var(--red-400)"
          />
          <ColorCard
            name="red 500"
            variable="--red-500"
            colorClass="bg-red-500"
            hex="var(--red-500)"
          />
          <ColorCard
            name="red 600"
            variable="--red-600"
            colorClass="bg-red-600"
            hex="var(--red-600)"
          />
          <ColorCard
            name="red 700"
            variable="--red-700"
            colorClass="bg-red-700"
            hex="var(--red-700)"
          />
          <ColorCard
            name="red 800"
            variable="--red-800"
            colorClass="bg-red-800"
            hex="var(--red-800)"
          />
          <ColorCard
            name="red 900"
            variable="--red-900"
            colorClass="bg-red-900"
            hex="var(--red-900)"
          />
          <ColorCard
            name="red 950"
            variable="--red-950"
            colorClass="bg-red-950"
            hex="var(--red-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Orange" description="Orange color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="orange 50"
            variable="--orange-50"
            colorClass="bg-orange-50"
            hex="var(--orange-50)"
          />
          <ColorCard
            name="orange 100"
            variable="--orange-100"
            colorClass="bg-orange-100"
            hex="var(--orange-100)"
          />
          <ColorCard
            name="orange 200"
            variable="--orange-200"
            colorClass="bg-orange-200"
            hex="var(--orange-200)"
          />
          <ColorCard
            name="orange 300"
            variable="--orange-300"
            colorClass="bg-orange-300"
            hex="var(--orange-300)"
          />
          <ColorCard
            name="orange 400"
            variable="--orange-400"
            colorClass="bg-orange-400"
            hex="var(--orange-400)"
          />
          <ColorCard
            name="orange 500"
            variable="--orange-500"
            colorClass="bg-orange-500"
            hex="var(--orange-500)"
          />
          <ColorCard
            name="orange 600"
            variable="--orange-600"
            colorClass="bg-orange-600"
            hex="var(--orange-600)"
          />
          <ColorCard
            name="orange 700"
            variable="--orange-700"
            colorClass="bg-orange-700"
            hex="var(--orange-700)"
          />
          <ColorCard
            name="orange 800"
            variable="--orange-800"
            colorClass="bg-orange-800"
            hex="var(--orange-800)"
          />
          <ColorCard
            name="orange 900"
            variable="--orange-900"
            colorClass="bg-orange-900"
            hex="var(--orange-900)"
          />
          <ColorCard
            name="orange 950"
            variable="--orange-950"
            colorClass="bg-orange-950"
            hex="var(--orange-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Amber" description="Amber color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="amber 50"
            variable="--amber-50"
            colorClass="bg-amber-50"
            hex="var(--amber-50)"
          />
          <ColorCard
            name="amber 100"
            variable="--amber-100"
            colorClass="bg-amber-100"
            hex="var(--amber-100)"
          />
          <ColorCard
            name="amber 200"
            variable="--amber-200"
            colorClass="bg-amber-200"
            hex="var(--amber-200)"
          />
          <ColorCard
            name="amber 300"
            variable="--amber-300"
            colorClass="bg-amber-300"
            hex="var(--amber-300)"
          />
          <ColorCard
            name="amber 400"
            variable="--amber-400"
            colorClass="bg-amber-400"
            hex="var(--amber-400)"
          />
          <ColorCard
            name="amber 500"
            variable="--amber-500"
            colorClass="bg-amber-500"
            hex="var(--amber-500)"
          />
          <ColorCard
            name="amber 600"
            variable="--amber-600"
            colorClass="bg-amber-600"
            hex="var(--amber-600)"
          />
          <ColorCard
            name="amber 700"
            variable="--amber-700"
            colorClass="bg-amber-700"
            hex="var(--amber-700)"
          />
          <ColorCard
            name="amber 800"
            variable="--amber-800"
            colorClass="bg-amber-800"
            hex="var(--amber-800)"
          />
          <ColorCard
            name="amber 900"
            variable="--amber-900"
            colorClass="bg-amber-900"
            hex="var(--amber-900)"
          />
          <ColorCard
            name="amber 950"
            variable="--amber-950"
            colorClass="bg-amber-950"
            hex="var(--amber-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Yellow" description="Yellow color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="yellow 50"
            variable="--yellow-50"
            colorClass="bg-yellow-50"
            hex="var(--yellow-50)"
          />
          <ColorCard
            name="yellow 100"
            variable="--yellow-100"
            colorClass="bg-yellow-100"
            hex="var(--yellow-100)"
          />
          <ColorCard
            name="yellow 200"
            variable="--yellow-200"
            colorClass="bg-yellow-200"
            hex="var(--yellow-200)"
          />
          <ColorCard
            name="yellow 300"
            variable="--yellow-300"
            colorClass="bg-yellow-300"
            hex="var(--yellow-300)"
          />
          <ColorCard
            name="yellow 400"
            variable="--yellow-400"
            colorClass="bg-yellow-400"
            hex="var(--yellow-400)"
          />
          <ColorCard
            name="yellow 500"
            variable="--yellow-500"
            colorClass="bg-yellow-500"
            hex="var(--yellow-500)"
          />
          <ColorCard
            name="yellow 600"
            variable="--yellow-600"
            colorClass="bg-yellow-600"
            hex="var(--yellow-600)"
          />
          <ColorCard
            name="yellow 700"
            variable="--yellow-700"
            colorClass="bg-yellow-700"
            hex="var(--yellow-700)"
          />
          <ColorCard
            name="yellow 800"
            variable="--yellow-800"
            colorClass="bg-yellow-800"
            hex="var(--yellow-800)"
          />
          <ColorCard
            name="yellow 900"
            variable="--yellow-900"
            colorClass="bg-yellow-900"
            hex="var(--yellow-900)"
          />
          <ColorCard
            name="yellow 950"
            variable="--yellow-950"
            colorClass="bg-yellow-950"
            hex="var(--yellow-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Lime" description="Lime color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="lime 50"
            variable="--lime-50"
            colorClass="bg-lime-50"
            hex="var(--lime-50)"
          />
          <ColorCard
            name="lime 100"
            variable="--lime-100"
            colorClass="bg-lime-100"
            hex="var(--lime-100)"
          />
          <ColorCard
            name="lime 200"
            variable="--lime-200"
            colorClass="bg-lime-200"
            hex="var(--lime-200)"
          />
          <ColorCard
            name="lime 300"
            variable="--lime-300"
            colorClass="bg-lime-300"
            hex="var(--lime-300)"
          />
          <ColorCard
            name="lime 400"
            variable="--lime-400"
            colorClass="bg-lime-400"
            hex="var(--lime-400)"
          />
          <ColorCard
            name="lime 500"
            variable="--lime-500"
            colorClass="bg-lime-500"
            hex="var(--lime-500)"
          />
          <ColorCard
            name="lime 600"
            variable="--lime-600"
            colorClass="bg-lime-600"
            hex="var(--lime-600)"
          />
          <ColorCard
            name="lime 700"
            variable="--lime-700"
            colorClass="bg-lime-700"
            hex="var(--lime-700)"
          />
          <ColorCard
            name="lime 800"
            variable="--lime-800"
            colorClass="bg-lime-800"
            hex="var(--lime-800)"
          />
          <ColorCard
            name="lime 900"
            variable="--lime-900"
            colorClass="bg-lime-900"
            hex="var(--lime-900)"
          />
          <ColorCard
            name="lime 950"
            variable="--lime-950"
            colorClass="bg-lime-950"
            hex="var(--lime-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Green" description="Green color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="green 50"
            variable="--green-50"
            colorClass="bg-green-50"
            hex="var(--green-50)"
          />
          <ColorCard
            name="green 100"
            variable="--green-100"
            colorClass="bg-green-100"
            hex="var(--green-100)"
          />
          <ColorCard
            name="green 200"
            variable="--green-200"
            colorClass="bg-green-200"
            hex="var(--green-200)"
          />
          <ColorCard
            name="green 300"
            variable="--green-300"
            colorClass="bg-green-300"
            hex="var(--green-300)"
          />
          <ColorCard
            name="green 400"
            variable="--green-400"
            colorClass="bg-green-400"
            hex="var(--green-400)"
          />
          <ColorCard
            name="green 500"
            variable="--green-500"
            colorClass="bg-green-500"
            hex="var(--green-500)"
          />
          <ColorCard
            name="green 600"
            variable="--green-600"
            colorClass="bg-green-600"
            hex="var(--green-600)"
          />
          <ColorCard
            name="green 700"
            variable="--green-700"
            colorClass="bg-green-700"
            hex="var(--green-700)"
          />
          <ColorCard
            name="green 800"
            variable="--green-800"
            colorClass="bg-green-800"
            hex="var(--green-800)"
          />
          <ColorCard
            name="green 900"
            variable="--green-900"
            colorClass="bg-green-900"
            hex="var(--green-900)"
          />
          <ColorCard
            name="green 950"
            variable="--green-950"
            colorClass="bg-green-950"
            hex="var(--green-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Emerald" description="Emerald color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="emerald 50"
            variable="--emerald-50"
            colorClass="bg-emerald-50"
            hex="var(--emerald-50)"
          />
          <ColorCard
            name="emerald 100"
            variable="--emerald-100"
            colorClass="bg-emerald-100"
            hex="var(--emerald-100)"
          />
          <ColorCard
            name="emerald 200"
            variable="--emerald-200"
            colorClass="bg-emerald-200"
            hex="var(--emerald-200)"
          />
          <ColorCard
            name="emerald 300"
            variable="--emerald-300"
            colorClass="bg-emerald-300"
            hex="var(--emerald-300)"
          />
          <ColorCard
            name="emerald 400"
            variable="--emerald-400"
            colorClass="bg-emerald-400"
            hex="var(--emerald-400)"
          />
          <ColorCard
            name="emerald 500"
            variable="--emerald-500"
            colorClass="bg-emerald-500"
            hex="var(--emerald-500)"
          />
          <ColorCard
            name="emerald 600"
            variable="--emerald-600"
            colorClass="bg-emerald-600"
            hex="var(--emerald-600)"
          />
          <ColorCard
            name="emerald 700"
            variable="--emerald-700"
            colorClass="bg-emerald-700"
            hex="var(--emerald-700)"
          />
          <ColorCard
            name="emerald 800"
            variable="--emerald-800"
            colorClass="bg-emerald-800"
            hex="var(--emerald-800)"
          />
          <ColorCard
            name="emerald 900"
            variable="--emerald-900"
            colorClass="bg-emerald-900"
            hex="var(--emerald-900)"
          />
          <ColorCard
            name="emerald 950"
            variable="--emerald-950"
            colorClass="bg-emerald-950"
            hex="var(--emerald-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Teal" description="Teal color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="teal 50"
            variable="--teal-50"
            colorClass="bg-teal-50"
            hex="var(--teal-50)"
          />
          <ColorCard
            name="teal 100"
            variable="--teal-100"
            colorClass="bg-teal-100"
            hex="var(--teal-100)"
          />
          <ColorCard
            name="teal 200"
            variable="--teal-200"
            colorClass="bg-teal-200"
            hex="var(--teal-200)"
          />
          <ColorCard
            name="teal 300"
            variable="--teal-300"
            colorClass="bg-teal-300"
            hex="var(--teal-300)"
          />
          <ColorCard
            name="teal 400"
            variable="--teal-400"
            colorClass="bg-teal-400"
            hex="var(--teal-400)"
          />
          <ColorCard
            name="teal 500"
            variable="--teal-500"
            colorClass="bg-teal-500"
            hex="var(--teal-500)"
          />
          <ColorCard
            name="teal 600"
            variable="--teal-600"
            colorClass="bg-teal-600"
            hex="var(--teal-600)"
          />
          <ColorCard
            name="teal 700"
            variable="--teal-700"
            colorClass="bg-teal-700"
            hex="var(--teal-700)"
          />
          <ColorCard
            name="teal 800"
            variable="--teal-800"
            colorClass="bg-teal-800"
            hex="var(--teal-800)"
          />
          <ColorCard
            name="teal 900"
            variable="--teal-900"
            colorClass="bg-teal-900"
            hex="var(--teal-900)"
          />
          <ColorCard
            name="teal 950"
            variable="--teal-950"
            colorClass="bg-teal-950"
            hex="var(--teal-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Cyan" description="Cyan color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="cyan 50"
            variable="--cyan-50"
            colorClass="bg-cyan-50"
            hex="var(--cyan-50)"
          />
          <ColorCard
            name="cyan 100"
            variable="--cyan-100"
            colorClass="bg-cyan-100"
            hex="var(--cyan-100)"
          />
          <ColorCard
            name="cyan 200"
            variable="--cyan-200"
            colorClass="bg-cyan-200"
            hex="var(--cyan-200)"
          />
          <ColorCard
            name="cyan 300"
            variable="--cyan-300"
            colorClass="bg-cyan-300"
            hex="var(--cyan-300)"
          />
          <ColorCard
            name="cyan 400"
            variable="--cyan-400"
            colorClass="bg-cyan-400"
            hex="var(--cyan-400)"
          />
          <ColorCard
            name="cyan 500"
            variable="--cyan-500"
            colorClass="bg-cyan-500"
            hex="var(--cyan-500)"
          />
          <ColorCard
            name="cyan 600"
            variable="--cyan-600"
            colorClass="bg-cyan-600"
            hex="var(--cyan-600)"
          />
          <ColorCard
            name="cyan 700"
            variable="--cyan-700"
            colorClass="bg-cyan-700"
            hex="var(--cyan-700)"
          />
          <ColorCard
            name="cyan 800"
            variable="--cyan-800"
            colorClass="bg-cyan-800"
            hex="var(--cyan-800)"
          />
          <ColorCard
            name="cyan 900"
            variable="--cyan-900"
            colorClass="bg-cyan-900"
            hex="var(--cyan-900)"
          />
          <ColorCard
            name="cyan 950"
            variable="--cyan-950"
            colorClass="bg-cyan-950"
            hex="var(--cyan-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Sky" description="Sky color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="sky 50"
            variable="--sky-50"
            colorClass="bg-sky-50"
            hex="var(--sky-50)"
          />
          <ColorCard
            name="sky 100"
            variable="--sky-100"
            colorClass="bg-sky-100"
            hex="var(--sky-100)"
          />
          <ColorCard
            name="sky 200"
            variable="--sky-200"
            colorClass="bg-sky-200"
            hex="var(--sky-200)"
          />
          <ColorCard
            name="sky 300"
            variable="--sky-300"
            colorClass="bg-sky-300"
            hex="var(--sky-300)"
          />
          <ColorCard
            name="sky 400"
            variable="--sky-400"
            colorClass="bg-sky-400"
            hex="var(--sky-400)"
          />
          <ColorCard
            name="sky 500"
            variable="--sky-500"
            colorClass="bg-sky-500"
            hex="var(--sky-500)"
          />
          <ColorCard
            name="sky 600"
            variable="--sky-600"
            colorClass="bg-sky-600"
            hex="var(--sky-600)"
          />
          <ColorCard
            name="sky 700"
            variable="--sky-700"
            colorClass="bg-sky-700"
            hex="var(--sky-700)"
          />
          <ColorCard
            name="sky 800"
            variable="--sky-800"
            colorClass="bg-sky-800"
            hex="var(--sky-800)"
          />
          <ColorCard
            name="sky 900"
            variable="--sky-900"
            colorClass="bg-sky-900"
            hex="var(--sky-900)"
          />
          <ColorCard
            name="sky 950"
            variable="--sky-950"
            colorClass="bg-sky-950"
            hex="var(--sky-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Blue" description="Blue color palette.">
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
            name="blue 300"
            variable="--blue-300"
            colorClass="bg-blue-300"
            hex="var(--blue-300)"
          />
          <ColorCard
            name="blue 400"
            variable="--blue-400"
            colorClass="bg-blue-400"
            hex="var(--blue-400)"
          />
          <ColorCard
            name="blue 500"
            variable="--blue-500"
            colorClass="bg-blue-500"
            hex="var(--blue-500)"
          />
          <ColorCard
            name="blue 600"
            variable="--blue-600"
            colorClass="bg-blue-600"
            hex="var(--blue-600)"
          />
          <ColorCard
            name="blue 700"
            variable="--blue-700"
            colorClass="bg-blue-700"
            hex="var(--blue-700)"
          />
          <ColorCard
            name="blue 800"
            variable="--blue-800"
            colorClass="bg-blue-800"
            hex="var(--blue-800)"
          />
          <ColorCard
            name="blue 900"
            variable="--blue-900"
            colorClass="bg-blue-900"
            hex="var(--blue-900)"
          />
          <ColorCard
            name="blue 950"
            variable="--blue-950"
            colorClass="bg-blue-950"
            hex="var(--blue-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Indigo" description="Indigo color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="indigo 50"
            variable="--indigo-50"
            colorClass="bg-indigo-50"
            hex="var(--indigo-50)"
          />
          <ColorCard
            name="indigo 100"
            variable="--indigo-100"
            colorClass="bg-indigo-100"
            hex="var(--indigo-100)"
          />
          <ColorCard
            name="indigo 200"
            variable="--indigo-200"
            colorClass="bg-indigo-200"
            hex="var(--indigo-200)"
          />
          <ColorCard
            name="indigo 300"
            variable="--indigo-300"
            colorClass="bg-indigo-300"
            hex="var(--indigo-300)"
          />
          <ColorCard
            name="indigo 400"
            variable="--indigo-400"
            colorClass="bg-indigo-400"
            hex="var(--indigo-400)"
          />
          <ColorCard
            name="indigo 500"
            variable="--indigo-500"
            colorClass="bg-indigo-500"
            hex="var(--indigo-500)"
          />
          <ColorCard
            name="indigo 600"
            variable="--indigo-600"
            colorClass="bg-indigo-600"
            hex="var(--indigo-600)"
          />
          <ColorCard
            name="indigo 700"
            variable="--indigo-700"
            colorClass="bg-indigo-700"
            hex="var(--indigo-700)"
          />
          <ColorCard
            name="indigo 800"
            variable="--indigo-800"
            colorClass="bg-indigo-800"
            hex="var(--indigo-800)"
          />
          <ColorCard
            name="indigo 900"
            variable="--indigo-900"
            colorClass="bg-indigo-900"
            hex="var(--indigo-900)"
          />
          <ColorCard
            name="indigo 950"
            variable="--indigo-950"
            colorClass="bg-indigo-950"
            hex="var(--indigo-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Violet" description="Violet color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="violet 50"
            variable="--violet-50"
            colorClass="bg-violet-50"
            hex="var(--violet-50)"
          />
          <ColorCard
            name="violet 100"
            variable="--violet-100"
            colorClass="bg-violet-100"
            hex="var(--violet-100)"
          />
          <ColorCard
            name="violet 200"
            variable="--violet-200"
            colorClass="bg-violet-200"
            hex="var(--violet-200)"
          />
          <ColorCard
            name="violet 300"
            variable="--violet-300"
            colorClass="bg-violet-300"
            hex="var(--violet-300)"
          />
          <ColorCard
            name="violet 400"
            variable="--violet-400"
            colorClass="bg-violet-400"
            hex="var(--violet-400)"
          />
          <ColorCard
            name="violet 500"
            variable="--violet-500"
            colorClass="bg-violet-500"
            hex="var(--violet-500)"
          />
          <ColorCard
            name="violet 600"
            variable="--violet-600"
            colorClass="bg-violet-600"
            hex="var(--violet-600)"
          />
          <ColorCard
            name="violet 700"
            variable="--violet-700"
            colorClass="bg-violet-700"
            hex="var(--violet-700)"
          />
          <ColorCard
            name="violet 800"
            variable="--violet-800"
            colorClass="bg-violet-800"
            hex="var(--violet-800)"
          />
          <ColorCard
            name="violet 900"
            variable="--violet-900"
            colorClass="bg-violet-900"
            hex="var(--violet-900)"
          />
          <ColorCard
            name="violet 950"
            variable="--violet-950"
            colorClass="bg-violet-950"
            hex="var(--violet-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Purple" description="Purple color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="purple 50"
            variable="--purple-50"
            colorClass="bg-purple-50"
            hex="var(--purple-50)"
          />
          <ColorCard
            name="purple 100"
            variable="--purple-100"
            colorClass="bg-purple-100"
            hex="var(--purple-100)"
          />
          <ColorCard
            name="purple 200"
            variable="--purple-200"
            colorClass="bg-purple-200"
            hex="var(--purple-200)"
          />
          <ColorCard
            name="purple 300"
            variable="--purple-300"
            colorClass="bg-purple-300"
            hex="var(--purple-300)"
          />
          <ColorCard
            name="purple 400"
            variable="--purple-400"
            colorClass="bg-purple-400"
            hex="var(--purple-400)"
          />
          <ColorCard
            name="purple 500"
            variable="--purple-500"
            colorClass="bg-purple-500"
            hex="var(--purple-500)"
          />
          <ColorCard
            name="purple 600"
            variable="--purple-600"
            colorClass="bg-purple-600"
            hex="var(--purple-600)"
          />
          <ColorCard
            name="purple 700"
            variable="--purple-700"
            colorClass="bg-purple-700"
            hex="var(--purple-700)"
          />
          <ColorCard
            name="purple 800"
            variable="--purple-800"
            colorClass="bg-purple-800"
            hex="var(--purple-800)"
          />
          <ColorCard
            name="purple 900"
            variable="--purple-900"
            colorClass="bg-purple-900"
            hex="var(--purple-900)"
          />
          <ColorCard
            name="purple 950"
            variable="--purple-950"
            colorClass="bg-purple-950"
            hex="var(--purple-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Fuchsia" description="Fuchsia color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="fuchsia 50"
            variable="--fuchsia-50"
            colorClass="bg-fuchsia-50"
            hex="var(--fuchsia-50)"
          />
          <ColorCard
            name="fuchsia 100"
            variable="--fuchsia-100"
            colorClass="bg-fuchsia-100"
            hex="var(--fuchsia-100)"
          />
          <ColorCard
            name="fuchsia 200"
            variable="--fuchsia-200"
            colorClass="bg-fuchsia-200"
            hex="var(--fuchsia-200)"
          />
          <ColorCard
            name="fuchsia 300"
            variable="--fuchsia-300"
            colorClass="bg-fuchsia-300"
            hex="var(--fuchsia-300)"
          />
          <ColorCard
            name="fuchsia 400"
            variable="--fuchsia-400"
            colorClass="bg-fuchsia-400"
            hex="var(--fuchsia-400)"
          />
          <ColorCard
            name="fuchsia 500"
            variable="--fuchsia-500"
            colorClass="bg-fuchsia-500"
            hex="var(--fuchsia-500)"
          />
          <ColorCard
            name="fuchsia 600"
            variable="--fuchsia-600"
            colorClass="bg-fuchsia-600"
            hex="var(--fuchsia-600)"
          />
          <ColorCard
            name="fuchsia 700"
            variable="--fuchsia-700"
            colorClass="bg-fuchsia-700"
            hex="var(--fuchsia-700)"
          />
          <ColorCard
            name="fuchsia 800"
            variable="--fuchsia-800"
            colorClass="bg-fuchsia-800"
            hex="var(--fuchsia-800)"
          />
          <ColorCard
            name="fuchsia 900"
            variable="--fuchsia-900"
            colorClass="bg-fuchsia-900"
            hex="var(--fuchsia-900)"
          />
          <ColorCard
            name="fuchsia 950"
            variable="--fuchsia-950"
            colorClass="bg-fuchsia-950"
            hex="var(--fuchsia-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Pink" description="Pink color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="pink 50"
            variable="--pink-50"
            colorClass="bg-pink-50"
            hex="var(--pink-50)"
          />
          <ColorCard
            name="pink 100"
            variable="--pink-100"
            colorClass="bg-pink-100"
            hex="var(--pink-100)"
          />
          <ColorCard
            name="pink 200"
            variable="--pink-200"
            colorClass="bg-pink-200"
            hex="var(--pink-200)"
          />
          <ColorCard
            name="pink 300"
            variable="--pink-300"
            colorClass="bg-pink-300"
            hex="var(--pink-300)"
          />
          <ColorCard
            name="pink 400"
            variable="--pink-400"
            colorClass="bg-pink-400"
            hex="var(--pink-400)"
          />
          <ColorCard
            name="pink 500"
            variable="--pink-500"
            colorClass="bg-pink-500"
            hex="var(--pink-500)"
          />
          <ColorCard
            name="pink 600"
            variable="--pink-600"
            colorClass="bg-pink-600"
            hex="var(--pink-600)"
          />
          <ColorCard
            name="pink 700"
            variable="--pink-700"
            colorClass="bg-pink-700"
            hex="var(--pink-700)"
          />
          <ColorCard
            name="pink 800"
            variable="--pink-800"
            colorClass="bg-pink-800"
            hex="var(--pink-800)"
          />
          <ColorCard
            name="pink 900"
            variable="--pink-900"
            colorClass="bg-pink-900"
            hex="var(--pink-900)"
          />
          <ColorCard
            name="pink 950"
            variable="--pink-950"
            colorClass="bg-pink-950"
            hex="var(--pink-950)"
          />
        </div>
      </Section>
      <Divider />

      <Section title="Rose" description="Rose color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="rose 50"
            variable="--rose-50"
            colorClass="bg-rose-50"
            hex="var(--rose-50)"
          />
          <ColorCard
            name="rose 100"
            variable="--rose-100"
            colorClass="bg-rose-100"
            hex="var(--rose-100)"
          />
          <ColorCard
            name="rose 200"
            variable="--rose-200"
            colorClass="bg-rose-200"
            hex="var(--rose-200)"
          />
          <ColorCard
            name="rose 300"
            variable="--rose-300"
            colorClass="bg-rose-300"
            hex="var(--rose-300)"
          />
          <ColorCard
            name="rose 400"
            variable="--rose-400"
            colorClass="bg-rose-400"
            hex="var(--rose-400)"
          />
          <ColorCard
            name="rose 500"
            variable="--rose-500"
            colorClass="bg-rose-500"
            hex="var(--rose-500)"
          />
          <ColorCard
            name="rose 600"
            variable="--rose-600"
            colorClass="bg-rose-600"
            hex="var(--rose-600)"
          />
          <ColorCard
            name="rose 700"
            variable="--rose-700"
            colorClass="bg-rose-700"
            hex="var(--rose-700)"
          />
          <ColorCard
            name="rose 800"
            variable="--rose-800"
            colorClass="bg-rose-800"
            hex="var(--rose-800)"
          />
          <ColorCard
            name="rose 900"
            variable="--rose-900"
            colorClass="bg-rose-900"
            hex="var(--rose-900)"
          />
          <ColorCard
            name="rose 950"
            variable="--rose-950"
            colorClass="bg-rose-950"
            hex="var(--rose-950)"
          />
        </div>
      </Section>
    </div>
  ),
};
