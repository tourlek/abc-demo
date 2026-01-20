import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_CAMPAIGNS } from "../../constants";
import type {
  Campaign,
  RewardType,
  ExpireType,
  CodeType,
  CampaignPeriod,
} from "../../types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea as TextArea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

// Helper for Date Picker
// Helper for Date Picker Button only (no label)
const DatePickerButton = ({
  value,
  onChange,
  className,
}: {
  value?: string;
  onChange: (date: string) => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const dateObj = value ? new Date(value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          {dateObj ? format(dateObj, "PPP") : <span>Pick a date</span>}
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateObj}
          onSelect={(d) => {
            if (d) {
              onChange(d.toISOString());
              setOpen(false);
            }
          }}
          initialFocus
          captionLayout="dropdown"
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
};

// Helper for Date Picker with Label (uses DatePickerButton)
const DatePickerField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (date: string) => void;
}) => {
  return (
    <div className="grid gap-2">
      <Label className="text-foreground font-medium">{label}</Label>
      <DatePickerButton value={value} onChange={onChange} />
    </div>
  );
};

export const CampaignEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Initial State
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [campaign, setCampaign] = useState<Campaign>(() => {
    if (id && id !== "new") {
      const existing = MOCK_CAMPAIGNS.find((c) => c.id === id);
      if (existing) return existing;
    }
    return {
      id: Math.random().toString(36).substr(2, 9),
      accountId: localStorage.getItem("selected_account_id") || "acc_demo",
      title: "",
      subtitle: "",
      status: "Draft",
      updatedAt: new Date().toISOString(),
      paragraphs: [{ id: "1", content: "" }],
      rewardType: "OFFLINE",
      expireType: "NO_EXPIRE",
      codeType: "NO_CODE",
      buttonText: "",
      buttonLink: "",
      totalQuota: 0,
      periods: [
        { id: "1", date: "", quotaPerPeriod: 0, quotaPerUser: 0 },
        { id: "2", date: "", quotaPerPeriod: 0, quotaPerUser: 0 },
      ],
    };
  });

  // Handlers
  const handleParagraphChange = (id: string, value: string) => {
    setCampaign({
      ...campaign,
      paragraphs: campaign.paragraphs.map((p) =>
        p.id === id ? { ...p, content: value } : p
      ),
    });
  };

  const addParagraph = () => {
    setCampaign({
      ...campaign,
      paragraphs: [
        ...campaign.paragraphs,
        { id: Math.random().toString(36), content: "" },
      ],
    });
  };

  const removeParagraph = (id: string) => {
    if (campaign.paragraphs.length > 1) {
      setCampaign({
        ...campaign,
        paragraphs: campaign.paragraphs.filter((p) => p.id !== id),
      });
    }
  };

  const handlePeriodChange = (
    id: string,
    field: keyof CampaignPeriod,
    value: string | number
  ) => {
    setCampaign({
      ...campaign,
      periods: campaign.periods.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  const addPeriod = () => {
    setCampaign({
      ...campaign,
      periods: [
        ...campaign.periods,
        {
          id: Math.random().toString(36),
          date: "",
          quotaPerPeriod: 0,
          quotaPerUser: 0,
        },
      ],
    });
  };

  const removePeriod = (id: string) => {
    setCampaign({
      ...campaign,
      periods: campaign.periods.filter((p) => p.id !== id),
    });
  };

  const handleSave = () => {
    const saved = localStorage.getItem("campaigns");
    const campaigns = saved ? JSON.parse(saved) : [];
    const index = campaigns.findIndex((c: Campaign) => c.id === campaign.id);
    if (index >= 0) {
      campaigns[index] = campaign;
    } else {
      campaigns.push(campaign);
    }
    localStorage.setItem("campaigns", JSON.stringify(campaigns));
    navigate("/campaigns");
  };

  return (
    <div className="flex gap-4 flex-col min-h-screen bg-background font-sans text-foreground ">
      {/* 1. Top Navigation Bar (Consistent with PageEditor) */}
      <div
        className={`bg-card py-4 sticky top-0 z-10 flex items-center justify-between h-16 -mx-4 px-4 transition-all duration-200 ${isScrolled ? "border-b border-border" : ""
          }`}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate("/campaigns/list")}
            className="text-muted-foreground hover:text-foreground px-2 -ml-2"
          >
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
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <div className="space-y-0.5">
            <div className="font-semibold text-base leading-none">
              {campaign.title || "New Campaign"}
            </div>
            <p className="text-xs text-muted-foreground">
              Last saved {new Date(campaign.updatedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" onClick={handleSave}>
            Save Draft
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full pb-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Content (9 cols) */}
        <div className="lg:col-span-9 space-y-8">
          {/* Detail Section */}
          <Card className="border-border shadow-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Campaign Detail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  placeholder="Enter campaign title"
                  value={campaign.title}
                  onChange={(e) =>
                    setCampaign({ ...campaign, title: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Sub Title</Label>
                <Input
                  placeholder="Enter subtitle"
                  value={campaign.subtitle}
                  onChange={(e) =>
                    setCampaign({ ...campaign, subtitle: e.target.value })
                  }
                />
              </div>

              {campaign.paragraphs.map((para, index) => (
                <div key={para.id} className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label>Paragraph {index + 1}</Label>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                        <div className="w-3 h-3 rounded-full border border-current"></div>{" "}
                        View HTML
                      </div>
                      {campaign.paragraphs.length > 1 && (
                        <button
                          onClick={() => removeParagraph(para.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-1 1-1h6c1 0 1 1 1 1v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="border border-border rounded-md focus-within:ring-2 focus-within:ring-primary/20 transition-all bg-card">
                    {/* Mock Toolbar */}
                    <div className="flex items-center gap-3 p-2 border-b border-border bg-muted/30 text-muted-foreground">
                      <button className="font-heading font-bold hover:text-foreground w-6 h-6 flex items-center justify-center rounded hover:bg-muted">
                        T
                      </button>
                      <button className="font-bold hover:text-foreground w-6 h-6 flex items-center justify-center rounded hover:bg-muted">
                        B
                      </button>
                      <button className="italic hover:text-foreground w-6 h-6 flex items-center justify-center rounded hover:bg-muted">
                        I
                      </button>
                      <button className="underline hover:text-foreground w-6 h-6 flex items-center justify-center rounded hover:bg-muted">
                        U
                      </button>
                      <div className="h-4 w-px bg-border mx-1"></div>
                      <button className="hover:text-foreground w-6 h-6 flex items-center justify-center rounded hover:bg-muted">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="21" y1="10" x2="3" y2="10" />
                          <line x1="21" y1="6" x2="3" y2="6" />
                          <line x1="21" y1="14" x2="3" y2="14" />
                          <line x1="21" y1="18" x2="3" y2="18" />
                        </svg>
                      </button>
                    </div>
                    <TextArea
                      className="border-0 focus-visible:ring-0 min-h-[80px] rounded-none rounded-b-md resize-y bg-transparent"
                      placeholder="Type your message"
                      value={para.content}
                      onChange={(e) =>
                        handleParagraphChange(para.id, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="ghost"
                onClick={addParagraph}
                className="text-primary hover:text-primary-dark pl-0 hover:bg-transparent"
              >
                + Add Paragraph
              </Button>
            </CardContent>
          </Card>

          {/* Banner Section */}
          <Card className="border-border shadow-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Banner</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-2">
                <Label>Upload Image</Label>
                <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-10 flex flex-col items-center justify-center bg-muted/20 hover:bg-primary/5 transition-all cursor-pointer text-center group">
                  <div className="w-10 h-10 bg-card shadow-sm border border-border text-muted-foreground group-hover:text-primary rounded-lg flex items-center justify-center mb-3 transition-colors">
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
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Drag & Drop your files or{" "}
                    <span className="underline">Browse</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: JPG, PNG, PDF (Max 25MB)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reward Section */}
          <Card className="border-border shadow-none">
            <CardHeader className="border-b border-border ">
              <CardTitle className="text-lg">Reward Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4">
                <Label>Type</Label>
                <RadioGroup
                  value={campaign.rewardType}
                  className="flex flex-row gap-2"
                  onValueChange={(val) =>
                    setCampaign({ ...campaign, rewardType: val as RewardType })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="OFFLINE" id="r-offline" />
                    <Label htmlFor="r-offline">OFFLINE</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ONLINE" id="r-online" />
                    <Label htmlFor="r-online">ONLINE</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PHYSICAL" id="r-physical" />
                    <Label htmlFor="r-physical">PHYSICAL</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-4">
                <Label>Expire time</Label>
                <RadioGroup
                  className="flex flex-row gap-2"
                  value={campaign.expireType}
                  onValueChange={(val) =>
                    setCampaign({ ...campaign, expireType: val as ExpireType })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="NO_EXPIRE" id="r-no-expire" />
                    <Label htmlFor="r-no-expire">No time expire</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="EXPIRE_TIME" id="r-expire-time" />
                    <Label htmlFor="r-expire-time">Expire Time</Label>
                  </div>
                </RadioGroup>
                {campaign.expireType === "EXPIRE_TIME" && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                    <Label className="mb-2 block">Expire Time (ms)</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 3600000"
                      value={campaign.expireTime || ""}
                      onChange={(e) =>
                        setCampaign({
                          ...campaign,
                          expireTime: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-4">
                <Label>Code type</Label>
                {campaign.rewardType === "ONLINE" ? (
                  <RadioGroup
                    className="flex flex-row gap-2"
                    value={campaign.codeType}
                    onValueChange={(val) =>
                      setCampaign({ ...campaign, codeType: val as CodeType })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PUBLIC_CODE" id="r-public" />
                      <Label htmlFor="r-public">Public code</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="UNIQUE_CODE" id="r-unique" />
                      <Label htmlFor="r-unique">Unique code</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="UNIQUE_LINK" id="r-link" />
                      <Label htmlFor="r-link">Unique Link</Label>
                    </div>
                  </RadioGroup>
                ) : (
                  <RadioGroup
                    value={campaign.codeType}
                    onValueChange={(val) =>
                      setCampaign({ ...campaign, codeType: val as CodeType })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="NO_CODE" id="r-no-code" />
                      <Label htmlFor="r-no-code">No code</Label>
                    </div>
                  </RadioGroup>
                )}
              </div>

              {/* Conditional Inputs Based on Code Type */}
              {campaign.codeType === "PUBLIC_CODE" && (
                <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
                  <Label>Public Code</Label>
                  <Input
                    placeholder="Enter public code (e.g. WELCOME2024)"
                    value={campaign.publicCode || ""}
                    onChange={(e) =>
                      setCampaign({ ...campaign, publicCode: e.target.value })
                    }
                  />
                </div>
              )}

              {(campaign.codeType === "UNIQUE_CODE" ||
                campaign.codeType === "UNIQUE_LINK") && (
                  <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
                    <Label>
                      Upload{" "}
                      {campaign.codeType === "UNIQUE_CODE" ? "Codes" : "Links"}{" "}
                      File (CSV/TXT)
                    </Label>
                    <Input
                      type="file"
                      accept=".csv,.txt"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setCampaign({ ...campaign, codeFile: file.name });
                        }
                      }}
                    />
                    {campaign.codeFile && (
                      <p className="text-sm text-muted-foreground">
                        Selected:{" "}
                        <span className="font-medium text-foreground">
                          {campaign.codeFile}
                        </span>
                      </p>
                    )}
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Button Section */}
          <Card className="border-border shadow-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Call to Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-2">
                <Label>Button Text</Label>
                <Input
                  placeholder="e.g. Join Now"
                  value={campaign.buttonText}
                  onChange={(e) =>
                    setCampaign({ ...campaign, buttonText: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Button Link</Label>
                <div className="flex gap-3">
                  <Input
                    className="flex-1"
                    placeholder="https://..."
                    value={campaign.buttonLink}
                    onChange={(e) =>
                      setCampaign({ ...campaign, buttonLink: e.target.value })
                    }
                  />
                  <Button className="shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border">
                    Upload File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Section */}
          <Card className="border-border shadow-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Schedule</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <DatePickerField
                  label="Reward Date"
                  value={campaign.rewardDate}
                  onChange={(d) => setCampaign({ ...campaign, rewardDate: d })}
                />
                <DatePickerField
                  label="Campaign Date"
                  value={campaign.campaignDate}
                  onChange={(d) =>
                    setCampaign({ ...campaign, campaignDate: d })
                  }
                />
                <DatePickerField
                  label="Banner Date"
                  value={campaign.bannerDate}
                  onChange={(d) => setCampaign({ ...campaign, bannerDate: d })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quota Section */}
          <Card className="border-border shadow-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Quota Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-2 max-w-xs">
                <Label>Total Quota per campaign</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={campaign.totalQuota || ""}
                  onChange={(e) =>
                    setCampaign({
                      ...campaign,
                      totalQuota: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="space-y-4 bg-muted/20 p-4 rounded-lg border border-border">
                {campaign.periods.length === 0 && (
                  <div className="flex flex-col items-center justify-center  text-muted-foreground opacity-60">
                    <p className="text-sm">No periods added yet</p>
                  </div>
                )}
                {campaign.periods.map((period, index) => (
                  <div
                    key={period.id}
                    className="grid md:grid-cols-12 gap-4 items-end animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    <div className="flex items-center justify-center md:col-span-1 pb-2">
                      <div className="w-6 h-6 rounded-full bg-card border border-border text-muted-foreground shadow-sm flex items-center justify-center font-bold text-xs">
                        {index + 1}
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <Label className="text-xs text-muted-foreground mb-1.5 block">
                        Period Date
                      </Label>
                      <DatePickerButton
                        value={period.date}
                        onChange={(d) =>
                          handlePeriodChange(period.id, "date", d)
                        }
                        className="bg-card h-10"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Label className="text-xs text-muted-foreground mb-1.5 block">
                        Quota per Period
                      </Label>
                      <Input
                        type="number"
                        placeholder="00"
                        className="bg-card"
                        value={period.quotaPerPeriod || ""}
                        onChange={(e) =>
                          handlePeriodChange(
                            period.id,
                            "quotaPerPeriod",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Label className="text-xs text-muted-foreground mb-1.5 block">
                        Quota per user
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="00"
                          className="bg-card"
                          value={period.quotaPerUser || ""}
                          onChange={(e) =>
                            handlePeriodChange(
                              period.id,
                              "quotaPerUser",
                              parseInt(e.target.value) || 0
                            )
                          }
                        />
                        <button
                          onClick={() => removePeriod(period.id)}
                          className="w-10 h-10 shrink-0 rounded border border-border bg-card hover:bg-destructive/10 hover:border-destructive hover:text-destructive text-muted-foreground flex items-center justify-center transition-all"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  onClick={addPeriod}
                  variant="outline"
                  className="gap-2 rounded-full px-6 border-dashed"
                >
                  + Add more period
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Publishing Card (Consistent with PageEditor) */}
          <Card className="border-border shadow-none sticky top-24">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground font-bold">
                Publishing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Status
                </span>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${campaign.status === "Published"
                    ? "bg-success/15 text-success dark:bg-success/25 dark:text-success"
                    : campaign.status === "Scheduled"
                      ? "bg-warning/15 text-warning-foreground dark:bg-warning/25 dark:text-warning-foreground"
                      : "bg-secondary text-secondary-foreground"
                    }`}
                >
                  {campaign.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="default"
                  onClick={handleSave}
                  className="w-full font-semibold py-2 cursor-pointer"
                >
                  {campaign.status === "Published"
                    ? "Update Campaign"
                    : "Publish Campaign"}
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                  Preview
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Publishing will make the campaign active immediately.
              </p>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="border-border shadow-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground font-bold">
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ensure you have set up the quota periods correctly. Use "Unique
                Code" for sensitive rewards.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
