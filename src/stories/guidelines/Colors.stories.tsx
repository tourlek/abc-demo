import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section, Divider, ColorCard, ColorPalette } from "./components";

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

      {/* Primary Brand Color */}
      <Section title="Primary" description="The main brand color palette.">
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

      {/* Secondary Palette */}
      <Section title="Secondary" description="Secondary color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Secondary 50"
            variable="--secondary-50"
            colorClass="bg-secondary-50"
            hex="var(--secondary-50)"
          />
          <ColorCard
            name="Secondary 100"
            variable="--secondary-100"
            colorClass="bg-secondary-100"
            hex="var(--secondary-100)"
          />
          <ColorCard
            name="Secondary 200"
            variable="--secondary-200"
            colorClass="bg-secondary-200"
            hex="var(--secondary-200)"
          />
          <ColorCard
            name="Secondary 300"
            variable="--secondary-300"
            colorClass="bg-secondary-300"
            hex="var(--secondary-300)"
          />
          <ColorCard
            name="Secondary 400"
            variable="--secondary-400"
            colorClass="bg-secondary-400"
            hex="var(--secondary-400)"
          />
          <ColorCard
            name="Secondary 500"
            variable="--secondary-500"
            colorClass="bg-secondary-500"
            hex="var(--secondary-500)"
          />
          <ColorCard
            name="Secondary 600"
            variable="--secondary-600"
            colorClass="bg-secondary-600"
            hex="var(--secondary-600)"
          />
          <ColorCard
            name="Secondary 700"
            variable="--secondary-700"
            colorClass="bg-secondary-700"
            hex="var(--secondary-700)"
          />
          <ColorCard
            name="Secondary 800"
            variable="--secondary-800"
            colorClass="bg-secondary-800"
            hex="var(--secondary-800)"
          />
          <ColorCard
            name="Secondary 900"
            variable="--secondary-900"
            colorClass="bg-secondary-900"
            hex="var(--secondary-900)"
          />
          <ColorCard
            name="Secondary 950"
            variable="--secondary-950"
            colorClass="bg-secondary-950"
            hex="var(--secondary-950)"
          />
        </div>
      </Section>

      <Divider />

      {/* Success Palette */}
      <Section
        title="Success"
        description="Success state colors. Also used for Social Traffic in Dashboard charts."
      >
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Success 50"
            variable="--success-50"
            colorClass="bg-success-50"
            hex="var(--success-50)"
          />
          <ColorCard
            name="Success 100"
            variable="--success-100"
            colorClass="bg-success-100"
            hex="var(--success-100)"
          />
          <ColorCard
            name="Success 200"
            variable="--success-200"
            colorClass="bg-success-200"
            hex="var(--success-200)"
          />
          <ColorCard
            name="Success 300"
            variable="--success-300"
            colorClass="bg-success-300"
            hex="var(--success-300)"
            description="Success"
          />
          <ColorCard
            name="Success 400"
            variable="--success-400"
            colorClass="bg-success-400"
            hex="var(--success-400)"
          />
          <ColorCard
            name="Success 500"
            variable="--success-500"
            colorClass="bg-success-500"
            hex="var(--success-500)"
            description="Chart: Social Traffic"
          />
          <ColorCard
            name="Success 600"
            variable="--success-600"
            colorClass="bg-success-600"
            hex="var(--success-600)"
          />
          <ColorCard
            name="Success 700"
            variable="--success-700"
            colorClass="bg-success-700"
            hex="var(--success-700)"
            description="Default Text Success"
          />
          <ColorCard
            name="Success 800"
            variable="--success-800"
            colorClass="bg-success-800"
            hex="var(--success-800)"
          />
          <ColorCard
            name="Success 900"
            variable="--success-900"
            colorClass="bg-success-900"
            hex="var(--success-900)"
          />
          <ColorCard
            name="Success 950"
            variable="--success-950"
            colorClass="bg-success-950"
            hex="var(--success-950)"
          />
        </div>
      </Section>

      <Divider />

      {/* Warning (Yellow) Palette */}
      <Section
        title="Warning (Yellow)"
        description="Yellow colors used in the system."
      >
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Warning 50"
            variable="--warning-50"
            colorClass="bg-warning-50"
            hex="var(--warning-50)"
          />
          <ColorCard
            name="Warning 100"
            variable="--warning-100"
            colorClass="bg-warning-100"
            hex="var(--warning-100)"
          />
          <ColorCard
            name="Warning 200"
            variable="--warning-200"
            colorClass="bg-warning-200"
            hex="var(--warning-200)"
          />
          <ColorCard
            name="Warning 300"
            variable="--warning-300"
            colorClass="bg-warning-300"
            hex="var(--warning-300)"
            description="Warning"
          />
          <ColorCard
            name="Warning 400"
            variable="--warning-400"
            colorClass="bg-warning-400"
            hex="var(--warning-400)"
          />
          <ColorCard
            name="Warning 500"
            variable="--warning-500"
            colorClass="bg-warning-500"
            hex="var(--warning-500)"
          />
          <ColorCard
            name="Warning 600"
            variable="--warning-600"
            colorClass="bg-warning-600"
            hex="var(--warning-600)"
          />
          <ColorCard
            name="Warning 700"
            variable="--warning-700"
            colorClass="bg-warning-700"
            hex="var(--warning-700)"
            description="Default Text Warning"
          />
          <ColorCard
            name="Warning 800"
            variable="--warning-800"
            colorClass="bg-warning-800"
            hex="var(--warning-800)"
          />
          <ColorCard
            name="Warning 900"
            variable="--warning-900"
            colorClass="bg-warning-900"
            hex="var(--warning-900)"
          />
          <ColorCard
            name="Warning 950"
            variable="--warning-950"
            colorClass="bg-warning-950"
            hex="var(--warning-950)"
          />
        </div>
      </Section>

      <Divider />

      {/* Destructive Palette */}
      <Section
        title="Destructive"
        description="Destructive colors used in the system."
      >
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Destructive 50"
            variable="--destructive-50"
            colorClass="bg-destructive-50"
            hex="var(--destructive-50)"
          />
          <ColorCard
            name="Destructive 100"
            variable="--destructive-100"
            colorClass="bg-destructive-100"
            hex="var(--destructive-100)"
          />
          <ColorCard
            name="Destructive 200"
            variable="--destructive-200"
            colorClass="bg-destructive-200"
            hex="var(--destructive-200)"
          />
          <ColorCard
            name="Destructive 300"
            variable="--destructive-300"
            colorClass="bg-destructive-300"
            hex="var(--destructive-300)"
          />
          <ColorCard
            name="Destructive 400"
            variable="--destructive-400"
            colorClass="bg-destructive-400"
            hex="var(--destructive-400)"
          />
          <ColorCard
            name="Destructive 500"
            variable="--destructive-500"
            colorClass="bg-destructive-500"
            hex="var(--destructive-500)"
          />
          <ColorCard
            name="Destructive 600"
            variable="--destructive-600"
            colorClass="bg-destructive-600"
            hex="var(--destructive-600)"
          />
          <ColorCard
            name="Destructive 700"
            variable="--destructive-700"
            colorClass="bg-destructive-700"
            hex="var(--destructive-700)"
          />
          <ColorCard
            name="Destructive 800"
            variable="--destructive-800"
            colorClass="bg-destructive-800"
            hex="var(--destructive-800)"
          />
          <ColorCard
            name="Destructive 900"
            variable="--destructive-900"
            colorClass="bg-destructive-900"
            hex="var(--destructive-900)"
          />
          <ColorCard
            name="Destructive 950"
            variable="--destructive-950"
            colorClass="bg-destructive-950"
            hex="var(--destructive-950)"
          />
        </div>
      </Section>

      <Divider />

      {/* Neutral Palette */}
      <Section title="Neutral" description="Neutral color palette.">
        <div className="flex flex-wrap gap-4">
          <ColorCard
            name="Neutral 50"
            variable="--neutral-50"
            colorClass="bg-neutral-50"
            hex="var(--neutral-50)"
          />
          <ColorCard
            name="Neutral 100"
            variable="--neutral-100"
            colorClass="bg-neutral-100"
            hex="var(--neutral-100)"
          />
          <ColorCard
            name="Neutral 200"
            variable="--neutral-200"
            colorClass="bg-neutral-200"
            hex="var(--neutral-200)"
            description="Default Border"
          />
          <ColorCard
            name="Neutral 300"
            variable="--neutral-300"
            colorClass="bg-neutral-300"
            hex="var(--neutral-300)"
          />
          <ColorCard
            name="Neutral 400"
            variable="--neutral-400"
            colorClass="bg-neutral-400"
            hex="var(--neutral-400)"
          />
          <ColorCard
            name="Neutral 500"
            variable="--neutral-500"
            colorClass="bg-neutral-500"
            hex="var(--neutral-500)"
            description="Muted Text"
          />
          <ColorCard
            name="Neutral 600"
            variable="--neutral-600"
            colorClass="bg-neutral-600"
            hex="var(--neutral-600)"
          />
          <ColorCard
            name="Neutral 700"
            variable="--neutral-700"
            colorClass="bg-neutral-700"
            hex="var(--neutral-700)"
          />
          <ColorCard
            name="Neutral 800"
            variable="--neutral-800"
            colorClass="bg-neutral-800"
            hex="var(--neutral-800)"
          />
          <ColorCard
            name="Neutral 900"
            variable="--neutral-900"
            colorClass="bg-neutral-900"
            hex="var(--neutral-900)"
            description="Default Text"
          />
          <ColorCard
            name="Neutral 950"
            variable="--neutral-950"
            colorClass="bg-neutral-950"
            hex="var(--neutral-950)"
          />
        </div>
      </Section>
    </div>
  ),
};
