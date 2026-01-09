import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section, Divider } from "./components";

const meta = {
  title: "Guidelines/Overview",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-heading font-bold tracking-tight">
          ABC 2026 CMS Design System
        </h1>
        <p className="text-xl text-muted-foreground font-sans">
          A comprehensive design system for building accessible, consistent, and
          beautiful interfaces.
        </p>
      </div>

      <Divider />

      {/* Introduction */}
      <Section
        title="Introduction"
        description="This design system serves as the single source of truth for UI components, typography, colors, and patterns used across the ABC 2026 CMS platform."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg">Consistent</h3>
            <p className="text-sm text-muted-foreground">
              Unified visual language ensuring a cohesive user experience across
              all modules.
            </p>
          </div>
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-2">
            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-secondary-foreground"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 14.14 14.14" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg">Accessible</h3>
            <p className="text-sm text-muted-foreground">
              Built with accessibility in mind, following WAI-ARIA patterns and
              contrast guidelines.
            </p>
          </div>
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-2">
            <div className="h-10 w-10 rounded-full bg-natural-5-5/20 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-natural-5-9"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg">Thai-Friendly</h3>
            <p className="text-sm text-muted-foreground">
              Optimized typography using <strong>Comfortaa</strong> and{" "}
              <strong>Google Sans Thai</strong> for excellent legibility.
            </p>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Core Foundations */}
      <Section
        title="Core Foundations"
        description="The essential elements that make up the visual identity."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold">Typography</h3>
            <p className="text-muted-foreground">
              A clean, modern type system featuring:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>
                <span className="font-heading font-bold text-foreground">
                  Comfortaa
                </span>{" "}
                for distinctive, friendly Headings.
              </li>
              <li>
                <span className="font-sans font-medium text-foreground">
                  Google Sans
                </span>{" "}
                for highly readable Body text.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold">Colors</h3>
            <p className="text-muted-foreground">
              A semantic color system based on OKLCH for specific vibrancy and
              contrast:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
              <li>
                <span className="font-semibold text-primary">
                  Global Palettes
                </span>
                : 12-step scales for Neutral, Primary, etc.
              </li>
              <li>
                <span className="font-semibold text-natural-1-7">
                  Natural Palettes
                </span>
                : 7 distinct earthy tonal scales.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Divider />

      <Section title="Getting Started">
        <div className="rounded-lg border bg-muted p-8 text-center">
          <p className="mb-4 text-muted-foreground">
            Select a category from the sidebar to explore the guidelines and
            components.
          </p>
          <div className="flex justify-center gap-4">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Explore Colors
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              View Typography
            </button>
          </div>
        </div>
      </Section>
    </div>
  ),
};
