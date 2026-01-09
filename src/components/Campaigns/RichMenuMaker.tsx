import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_RICH_MENUS } from "../../constants";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import type {
  RichMenuTemplate,
  RichMenuConfig,
  RichMenuAction,
} from "../../types";

// Mock Templates based on LINE guidelines
const TEMPLATES: RichMenuTemplate[] = [
  // Large Size
  {
    id: "large_1",
    name: "Type 1",
    size: "Large",
    areas: ["A", "B", "C", "D", "E", "F"],
    grid: `"A B C" "D E F"`,
  },
  {
    id: "large_2",
    name: "Type 2",
    size: "Large",
    areas: ["A", "B", "C", "D"],
    grid: `"A B" "C D"`,
  },
  {
    id: "large_3",
    name: "Type 3",
    size: "Large",
    areas: ["A", "B", "C", "D"],
    grid: `"A A A" "B C D"`,
  },
  {
    id: "large_4",
    name: "Type 4",
    size: "Large",
    areas: ["A", "B", "C"],
    grid: `"A B" "A C"`,
  },
  {
    id: "large_5",
    name: "Type 5",
    size: "Large",
    areas: ["A", "B"],
    grid: `"A A" "B B"`,
  },
  {
    id: "large_6",
    name: "Type 6",
    size: "Large",
    areas: ["A", "B"],
    grid: `"A B" "A B"`,
  },
  {
    id: "large_7",
    name: "Type 7",
    size: "Large",
    areas: ["A"],
    grid: `"A A" "A A"`,
  },

  // Compact Size
  {
    id: "compact_1",
    name: "Type 1 (Compact)",
    size: "Compact",
    areas: ["A", "B", "C"],
    grid: `"A B C"`,
  },
  {
    id: "compact_2",
    name: "Type 2 (Compact)",
    size: "Compact",
    areas: ["A", "B"],
    grid: `"A B"`,
  },
];

export const RichMenuMaker: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Determine initial state based on ID
  const getInitialConfig = (): RichMenuConfig => {
    if (id && id !== "new") {
      const existing = MOCK_RICH_MENUS.find((m) => m.id === id);
      if (existing) {
        // Map existing RichMenu to Config (assuming structures align or mapping is needed)
        // For now, mapping known fields. You might need to adjust based on exact types.
        return {
          name: existing.name,
          chatBarText: existing.chatBarText,
          templateId: "large_1", // Default or derived from existing data if stored
          actions: {}, // Populate if actions are stored in MOCK_RICH_MENUS
          // Note: MOCK data might not have all config fields, this is a best-effort prefill
        };
      }
    }
    return {
      name: "",
      chatBarText: "Open Menu",
      templateId: "",
      actions: {},
    };
  };

  const [step, setStep] = useState<1 | 2>(id && id !== "new" ? 2 : 1); // Start at step 2 if editing
  const [config, setConfig] = useState<RichMenuConfig>(getInitialConfig);

  const selectedTemplate = TEMPLATES.find((t) => t.id === config.templateId);

  const handleTemplateSelect = (id: string) => {
    setConfig((prev) => ({ ...prev, templateId: id, actions: {} }));
  };

  const handleActionChange = (
    area: string,
    field: keyof RichMenuAction,
    value: string
  ) => {
    setConfig((prev) => ({
      ...prev,
      actions: {
        ...prev.actions,
        [area]: {
          ...prev.actions[area],
          [field]: value,
          type: prev.actions[area]?.type || "message", // Default type
        },
      },
    }));
  };

  const renderTemplatePreview = (
    template: RichMenuTemplate,
    small: boolean = false
  ) => {
    const isSelected = config.templateId === template.id;
    return (
      <div
        key={template.id}
        onClick={() => handleTemplateSelect(template.id)}
        className={`relative group cursor-pointer transition-all duration-200 
          ${
            small
              ? ""
              : "p-4 border rounded-lg bg-white hover:border-primary/50 hover:shadow-sm"
          } 
          ${
            isSelected && !small
              ? "ring-2 ring-primary border-primary"
              : "border-gray-200"
          }`}
      >
        <div
          className={`grid gap-px bg-gray-100 border border-gray-100 overflow-hidden rounded-sm ${
            template.size === "Compact" ? "aspect-[2.5/1]" : "aspect-[1.5/1]"
          }`}
          style={{
            gridTemplateAreas: template.grid,
            gridTemplateColumns: `repeat(${
              template.grid.split('" "')[0].split(" ").length
            }, 1fr)`,
            gridTemplateRows: `repeat(${
              template.size === "Compact" ? 1 : 2
            }, 1fr)`,
          }}
        >
          {template.areas.map((area) => (
            <div
              key={area}
              style={{ gridArea: area }}
              className={`bg-gray-50 flex items-center justify-center text-[10px] font-mono font-medium text-gray-400 group-hover:bg-white transition-colors ${
                isSelected ? "bg-blue-50/50 text-primary" : ""
              }`}
            >
              {area}
            </div>
          ))}
        </div>
        {!small && (
          <div className="flex justify-between items-center mt-3">
            <div className="text-xs font-semibold text-gray-700">
              {template.name}
            </div>
            {isSelected && (
              <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-white">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (step === 1 ? navigate("/campaigns") : setStep(1))}
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="ml-1">Back</span>
          </Button>
          <div className="h-4 w-px bg-border mx-2"></div>
          <div>
            <h1 className="font-semibold text-sm leading-none">
              Rich Menu Creator
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs ${
                  step === 1
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                1. Template
              </span>
              <span className="text-muted-foreground text-[10px]">/</span>
              <span
                className={`text-xs ${
                  step === 2
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                2. Configuration
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {step === 1 && (
            <Button disabled={!config.templateId} onClick={() => setStep(2)}>
              Next Step
            </Button>
          )}
          {step === 2 && (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => navigate("/campaigns")}>
                Save & Publish
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-4">
        {/* STEP 1: Template Selection */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Choose Layout
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Select a grid structure for your Rich Menu. Large menus
                    provide maximum visibility, while compact ones save screen
                    real estate.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                      Internal Name
                    </Label>
                    <Input
                      placeholder="e.g. Summer Campaign Menu"
                      value={config.name}
                      onChange={(e) =>
                        setConfig({ ...config, name: e.target.value })
                      }
                      className="font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                      Chat Bar Text
                    </Label>
                    <Input
                      placeholder="e.g. Open Menu"
                      value={config.chatBarText}
                      onChange={(e) =>
                        setConfig({ ...config, chatBarText: e.target.value })
                      }
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Text shown at the bottom of the chat screen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    Large Templates
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      2500 x 1686
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {TEMPLATES.filter((t) => t.size === "Large").map((t) =>
                      renderTemplatePreview(t)
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    Compact Templates
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      2500 x 843
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {TEMPLATES.filter((t) => t.size === "Compact").map((t) =>
                      renderTemplatePreview(t)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Action Assignment */}
        {step === 2 && selectedTemplate && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Left: Sticky Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <Card className="border-border shadow-none bg-secondary/20">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-border flex justify-between items-center bg-background rounded-t-lg">
                    <h3 className="font-semibold text-sm">Preview</h3>
                    <div className="text-xs text-muted-foreground font-mono">
                      {selectedTemplate.size}
                    </div>
                  </div>

                  {/* Phone Simulator */}
                  <div className="p-6 flex justify-center bg-gray-50">
                    <div className="w-[300px] bg-white rounded-[2rem] border-8 border-gray-800 shadow-xl overflow-hidden relative">
                      {/* Top Bar */}
                      <div className="h-6 bg-gray-800 w-full absolute top-0 z-10 flex justify-center">
                        <div className="w-16 h-4 bg-gray-800 rounded-b-lg"></div>
                      </div>

                      {/* Screen Content */}
                      <div className="bg-[#8E9DCC] h-[480px] pt-8 flex flex-col relative">
                        {/* Chat Bubble */}
                        <div className="px-3 pt-4 flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-white/20 shrink-0"></div>
                          <div className="bg-white p-2.5 rounded-2xl rounded-tl-none text-[10px] max-w-[70%] shadow-sm leading-relaxed">
                            The rich menu will appear at the bottom of the
                            user's screen.
                          </div>
                        </div>

                        {/* Rich Menu Area */}
                        <div className="mt-auto bg-gray-100 border-t border-gray-300">
                          <div className="bg-white/80 backdrop-blur border-b border-gray-200 py-1.5 flex justify-center">
                            <span className="text-[10px] font-medium text-gray-500">
                              {config.chatBarText} ▼
                            </span>
                          </div>

                          <div
                            className={`grid gap-px bg-gray-300 w-full ${
                              selectedTemplate.size === "Compact"
                                ? "aspect-[2.5/1]"
                                : "aspect-[1.5/1]"
                            }`}
                            style={{
                              gridTemplateAreas: selectedTemplate.grid,
                              gridTemplateColumns: `repeat(${
                                selectedTemplate.grid.split('" "')[0].split(" ")
                                  .length
                              }, 1fr)`,
                              gridTemplateRows: `repeat(${
                                selectedTemplate.size === "Compact" ? 1 : 2
                              }, 1fr)`,
                            }}
                          >
                            {selectedTemplate.areas.map((area) => {
                              const hasAction = config.actions[area]?.data;
                              return (
                                <div
                                  key={area}
                                  style={{ gridArea: area }}
                                  className="bg-white relative group"
                                >
                                  {/* Label */}
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span
                                      className={`text-2xl font-bold ${
                                        hasAction
                                          ? "text-primary/20"
                                          : "text-gray-200"
                                      }`}
                                    >
                                      {area}
                                    </span>
                                  </div>

                                  {/* Type Indicator */}
                                  {hasAction && (
                                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-[8px] font-bold rounded uppercase">
                                      {config.actions[area].type}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Home Indicator */}
                      <div className="h-4 bg-white w-full absolute bottom-0"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-background border-t border-border">
                    <Label className="text-xs font-semibold mb-2 block">
                      Background Image
                    </Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-9 text-xs"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        <svg
                          className="mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        Upload Image
                      </Button>
                      <input id="file-upload" type="file" className="hidden" />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      Required dimensions:{" "}
                      <span className="font-mono text-foreground">
                        {selectedTemplate.size === "Large"
                          ? "2500x1686"
                          : "2500x843"}
                      </span>{" "}
                      px
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Actions Configuration */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Configure Actions
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Define what happens when a user taps each area.
                </p>
              </div>

              <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
                {selectedTemplate.areas.map((area, index) => (
                  <div
                    key={area}
                    className={`p-4 flex flex-col md:flex-row gap-4 hover:bg-muted/30 transition-colors ${
                      index !== selectedTemplate.areas.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    {/* Area Label */}
                    <div className="md:w-16 flex-shrink-0 flex md:flex-col items-center justify-center md:justify-start gap-2">
                      <div className="w-8 h-8 rounded flex items-center justify-center bg-secondary text-secondary-foreground font-bold font-mono text-sm border border-border">
                        {area}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider mb-1.5 block">
                          Type
                        </Label>
                        <Select
                          value={config.actions[area]?.type || "message"}
                          onValueChange={(val) =>
                            handleActionChange(area, "type", val)
                          }
                        >
                          <SelectTrigger className="h-9 text-xs">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="message">Chat Text</SelectItem>
                            <SelectItem value="uri">Open Link (URI)</SelectItem>
                            <SelectItem value="postback">Postback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider mb-1.5 block">
                          {config.actions[area]?.type === "uri"
                            ? "Destination URL"
                            : config.actions[area]?.type === "postback"
                            ? "Postback Data"
                            : "Message to Send"}
                        </Label>
                        <Input
                          className="h-9 text-xs font-medium"
                          placeholder={
                            config.actions[area]?.type === "uri"
                              ? "https://example.com"
                              : "User says..."
                          }
                          value={config.actions[area]?.data || ""}
                          onChange={(e) =>
                            handleActionChange(area, "data", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
