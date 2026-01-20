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
          ${small
            ? ""
            : "p-4 border border-border rounded-lg bg-card hover:border-primary/50"
          } 
          ${isSelected && !small
            ? "ring-2 ring-primary border-primary"
            : "border-border"
          }`}
      >
        <div
          className={`grid gap-px bg-muted border border-muted overflow-hidden rounded-sm ${template.size === "Compact" ? "aspect-[2.5/1]" : "aspect-[1.5/1]"
            }`}
          style={{
            gridTemplateAreas: template.grid,
            gridTemplateColumns: `repeat(${template.grid.split('" "')[0].split(" ").length
              }, 1fr)`,
            gridTemplateRows: `repeat(${template.size === "Compact" ? 1 : 2
              }, 1fr)`,
          }}
        >
          {template.areas.map((area) => (
            <div
              key={area}
              style={{ gridArea: area }}
              className={`bg-muted/50 flex items-center justify-center text-xs font-sans font-medium text-muted-foreground group-hover:bg-card transition-colors ${isSelected ? "bg-primary/10 text-primary" : ""
                }`}
            >
              {area}
            </div>
          ))}
        </div>
        {!small && (
          <div className="flex justify-between items-center mt-3">
            <div className="text-xs font-semibold text-foreground">
              {template.name}
            </div>
            {isSelected && (
              <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
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

  const handleSave = () => {
    // Construct rich menu object
    const newMenu = {
      id: id && id !== "new" ? id : Math.random().toString(36).substr(2, 9),
      accountId: localStorage.getItem("selected_account_id") || "acc_demo",
      name: config.name || "Untitled Menu",
      status: "Published",
      updatedAt: new Date().toISOString(),
      size: selectedTemplate?.size || "Large",
      chatBarText: config.chatBarText,
      templateId: config.templateId,
      actions: config.actions,
      image: "https://picsum.photos/800/540", // Placeholder or actual image URL if implemented
    };

    const saved = localStorage.getItem("rich_menus");
    const menus = saved ? JSON.parse(saved) : [];
    const index = menus.findIndex((m: any) => m.id === newMenu.id);

    if (index >= 0) {
      menus[index] = newMenu;
    } else {
      menus.push(newMenu);
    }

    localStorage.setItem("rich_menus", JSON.stringify(menus));
    navigate("/campaigns/rich-menus");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              step === 1 ? navigate("/campaigns/rich-menus") : setStep(1)
            }
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
            <div className="font-semibold text-sm leading-none">
              Rich Menu Creator
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs ${step === 1
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                  }`}
              >
                1. Template
              </span>
              <span className="text-muted-foreground text-xs">/</span>
              <span
                className={`text-xs ${step === 2
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
              <Button onClick={handleSave}>Save & Publish</Button>
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
                  <h2 className="font-display mb-2">Choose Layout</h2>
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
                    <p className="text-xs text-muted-foreground">
                      Text shown at the bottom of the chat screen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h5 className="mb-4 flex items-center gap-2">
                    Large Templates
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      2500 x 1686
                    </span>
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {TEMPLATES.filter((t) => t.size === "Large").map((t) =>
                      renderTemplatePreview(t)
                    )}
                  </div>
                </div>

                <div>
                  <h5 className="mb-4 flex items-center gap-2">
                    Compact Templates
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      2500 x 843
                    </span>
                  </h5>
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
                  <div className="px-4 border-b border-border flex justify-between items-center bg-background rounded-t-lg">
                    <h5 className="text-sm">Preview</h5>
                    <div className="text-xs text-muted-foreground font-sans">
                      {selectedTemplate.size}
                    </div>
                  </div>

                  {/* Phone Simulator - iOS Style */}
                  <div className="p-6 flex justify-center bg-muted/20">
                    <div className="w-[300px] h-[600px] bg-[#1F2937] rounded-[40px] overflow-hidden relative border-8 border-[#1F2937] ring-1 ring-black/50">
                      {/* Notch / Dynamic Island */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-black rounded-b-2xl z-20"></div>

                      {/* Screen Content */}
                      <div className="bg-[#8E9DCC] w-full h-full flex flex-col relative pt-10">
                        {/* Status Bar Area (Implicit) */}

                        {/* Chat Messages */}
                        <div className="px-4 space-y-4 pt-4">
                          {/* Bot Message */}
                          <div className="flex gap-2.5 items-end">
                            <div className="w-8 h-8 rounded-full bg-white/20 shrink-0"></div>
                            <div className="bg-card p-3.5 rounded-2xl rounded-tl-none text-[13px] leading-relaxed max-w-[85%] text-card-foreground">
                              The rich menu will appear at the bottom of the
                              user's screen.
                            </div>
                          </div>
                        </div>

                        {/* Rich Menu Container */}
                        <div className="mt-auto relative z-10 w-full">
                          {/* Menu Bar */}
                          <div className="bg-card border-b border-border py-2 flex justify-center items-center gap-1 relative z-20">
                            <span className="text-[12px] font-medium text-muted-foreground">
                              {config.chatBarText}
                            </span>
                            <span className="text-xs text-muted-foreground">▼</span>
                          </div>

                          {/* Grid Area */}
                          <div
                            className={`w-full bg-card relative ${selectedTemplate.size === "Compact"
                                ? "aspect-[2.5/1]"
                                : "aspect-[1.5/1]"
                              }`}
                          >
                            {/* Grid Lines Overlay - Removed redundant block */}

                            {/* Grid Cells */}
                            <div
                              className="w-full h-full grid"
                              style={{
                                gridTemplateAreas: selectedTemplate.grid,
                                gridTemplateColumns: `repeat(${selectedTemplate.grid
                                    .split('" "')[0]
                                    .split(" ").length
                                  }, 1fr)`,
                                gridTemplateRows: `repeat(${selectedTemplate.size === "Compact" ? 1 : 2
                                  }, 1fr)`,
                              }}
                            >
                              {selectedTemplate.areas.map((area) => {
                                const hasAction = config.actions[area]?.data;
                                return (
                                  <div
                                    key={area}
                                    style={{ gridArea: area }}
                                    className="relative flex items-center justify-center border-[0.5px] border-border"
                                  >
                                    <span
                                      className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-muted to-muted/80 select-none ${hasAction ? "opacity-0" : "opacity-100"
                                        }`}
                                    >
                                      {area}
                                    </span>

                                    {/* Active State / Content */}
                                    {!hasAction && (
                                      <span className="absolute text-2xl font-bold text-muted-foreground/20">
                                        {area}
                                      </span>
                                    )}

                                    {/* Action Indicator */}
                                    {hasAction && (
                                      <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-center p-1">
                                        <span className="text-2xl font-bold text-primary/20 mb-1">
                                          {area}
                                        </span>
                                        <div className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider">
                                          {config.actions[area].type}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Bottom Safe Area */}
                          <div className="h-6 bg-card w-full"></div>
                        </div>
                      </div>

                      {/* Home Indicator */}
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[100px] h-1 bg-foreground/20 rounded-full z-30"></div>
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
                    <p className="text-xs text-muted-foreground mt-2">
                      Required dimensions:{" "}
                      <span className="font-sans text-foreground">
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
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  Configure Actions
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Define what happens when a user taps each area.
                </p>
              </div>

              <div className="border border-border rounded-lg bg-card shadow-none overflow-hidden">
                {selectedTemplate.areas.map((area, index) => (
                  <div
                    key={area}
                    className={`p-4 flex flex-col md:flex-row gap-4 hover:bg-muted/30 transition-colors ${index !== selectedTemplate.areas.length - 1
                        ? "border-b border-border"
                        : ""
                      }`}
                  >
                    {/* Area Label */}
                    <div className="md:w-16 flex-shrink-0 flex md:flex-col items-center justify-center md:justify-start gap-2">
                      <div className="w-8 h-8 rounded flex items-center justify-center bg-secondary text-secondary-foreground font-bold font-sans text-sm border border-border">
                        {area}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider mb-1.5 block">
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
                        <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider mb-1.5 block">
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
