import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Helper to convert any valid CSS color string to hex using Canvas getImageData
 * This guarantees resolution of variables, oklch, hsl, etc. to standard RGB Hex.
 */
function colorToHex(color: string): string {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return "";

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

/**
 * Hook to get the computed hex color of an element from a CSS variable or class
 */
function useComputedColor(colorValue: string | undefined) {
  const [hex, setHex] = React.useState<string>("");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const updateColor = () => {
      // 1. Get the computed background color (could be rgb, rgba, oklch...)
      const computed = window.getComputedStyle(ref.current!);
      const bg = computed.backgroundColor;

      // 2. Force convert to Hex using Canvas pixel data
      const converted = colorToHex(bg);

      // 3. Update state if valid
      if (converted && converted.startsWith("#")) {
        // Check for false positive black #000000 if the input wasn't black?
        // If bg is transparent (rgba(0,0,0,0)), we get #000000.
        // If the actual color IS black, we get #000000.
        // We assume theme colors are opaque.
        setHex(converted);
      } else {
        setHex(bg);
      }
    };

    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => observer.disconnect();
  }, [colorValue]);

  return { ref, hex };
}

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
  hex: providedHex, // Rename to avoid confusion
}: ColorSwatchProps) {
  // If providedHex looks like a var(...), we try to compute it.
  // Otherwise we assume colorClass handles the bg.
  // We pass `providedHex` (e.g. var(--primary)) to inline style to trigger computation
  const { ref, hex: computedHex } = useComputedColor(providedHex);
  const displayHex = (computedHex || providedHex || "").toUpperCase();

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border bg-card shadow-sm">
      <div
        ref={ref}
        className={cn("h-16 w-16 rounded-xl border shadow-sm", colorClass)}
        style={
          providedHex && providedHex.startsWith("var")
            ? { backgroundColor: providedHex }
            : undefined
        }
      />
      <div className="space-y-1">
        <p className="font-semibold text-sm leading-none">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{variable}</p>
        {/* Prioritize computed Hex if available and looks like a hex, otherwise fallback to provided or computed raw */}
        <p className="text-xs text-muted-foreground font-medium">
          {displayHex}
        </p>
      </div>
    </div>
  );
}

interface ColorPaletteItemProps {
  color: {
    name: string;
    class: string;
    hex?: string;
  };
}

function ColorPaletteItem({ color }: ColorPaletteItemProps) {
  const { ref, hex: computedHex } = useComputedColor(color.hex);

  return (
    <div
      ref={ref}
      className={cn(
        "flex-1 flex flex-col justify-end p-2 text-[10px] relative group cursor-default transition-all hover:z-10",
        color.class
      )}
      style={{ backgroundColor: color.hex }}
      title={`${color.name}: ${computedHex || color.hex || ""}`}
    >
      <div className="absolute inset-x-0 bottom-0 bg-black/10 dark:bg-black/40 backdrop-blur-[1px] p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="font-medium text-white dark:text-white truncate">
          {color.name}
        </div>
        <div className="text-white/80 dark:text-white/80 truncate opacity-80">
          {computedHex || color.hex}
        </div>
      </div>
    </div>
  );
}

interface ColorPaletteProps {
  title: string;
  colors: {
    name: string;
    class: string;
    hex?: string;
  }[];
}

/**
 * A color palette component for displaying a strip of colors (Tailwind style).
 */
export function ColorPalette({ title, colors }: ColorPaletteProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </div>
      <div className="flex w-full rounded-lg border shadow-sm h-16 overflow-hidden bg-background">
        {colors.map((color, index) => (
          <ColorPaletteItem key={index} color={color} />
        ))}
      </div>
      <div className="flex justify-between w-full px-1 mt-1">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex-1 text-center text-[10px] text-muted-foreground"
          >
            {color.name}
          </div>
        ))}
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
