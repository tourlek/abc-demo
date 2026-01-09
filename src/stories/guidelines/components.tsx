import * as React from "react";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  code?: string;
}

/**
 * A shadcn-style component preview wrapper.
 * Shows the component in a bordered preview area with optional code snippet.
 */
export function ComponentPreview({
  children,
  className,
  title,
  description,
  code,
}: ComponentPreviewProps) {
  const [showCode, setShowCode] = React.useState(false);

  return (
    <div className="space-y-3">
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="relative">
        <div
          className={cn(
            "flex min-h-[150px] w-full items-center justify-center rounded-lg border bg-background p-10",
            className
          )}
        >
          {children}
        </div>
        {code && (
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {showCode ? "Hide code" : "Show code"}
            </button>
          </div>
        )}
      </div>
      {code && showCode && (
        <div className="relative rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-muted-foreground">{code}</pre>
        </div>
      )}
    </div>
  );
}

interface ColorSwatchProps {
  name: string;
  variable: string;
  colorClass: string;
  hex?: string;
}

/**
 * A color swatch component for displaying theme colors.
 */
export function ColorSwatch({
  name,
  variable,
  colorClass,
  hex,
}: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border bg-card">
      <div
        className={cn("h-12 w-12 rounded-md border shadow-sm", colorClass)}
      />
      <div className="space-y-0.5">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{variable}</p>
        {hex && <p className="text-xs text-muted-foreground">{hex}</p>}
      </div>
    </div>
  );
}

interface SpacingBoxProps {
  size: string;
  value: string;
  className?: string;
}

/**
 * Visual representation of a spacing value.
 */
export function SpacingBox({ size, value, className }: SpacingBoxProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 text-sm text-muted-foreground font-mono">{size}</div>
      <div className="w-16 text-sm text-muted-foreground">{value}</div>
      <div className={cn("h-4 bg-primary rounded", className)} />
    </div>
  );
}

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * A section wrapper with title and optional description.
 */
export function Section({ title, description, children }: SectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  );
}

/**
 * A divider for separating sections.
 */
export function Divider() {
  return <hr className="my-8 border-border" />;
}

/**
 * Visual helper for spacing (striped pattern).
 */
export function SpacingHighlight({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--primary) 10%, transparent 10%, transparent 50%, var(--primary) 50%, var(--primary) 60%, transparent 60%, transparent 100%)",
        backgroundSize: "10px 10px",
        opacity: 0.1,
      }}
    >
      {children}
    </div>
  );
}
