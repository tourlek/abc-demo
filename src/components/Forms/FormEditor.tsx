import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { FormTemplate, FormSection, FormField } from "../../types";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { MOCK_FORMS } from "../../constants";

export const FormEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Initialize state (mock edit or create new)
  const [form, setForm] = useState<FormTemplate>(() => {
    const existing = MOCK_FORMS.find((f) => f.id === id);
    if (existing) return existing;

    return {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      description: "",
      emailCategory: "Marketing",
      status: "Draft",
      updatedAt: new Date().toISOString(),
      sections: [],
    };
  });

  const handleSave = () => {
    console.log("Saving form:", form);
    navigate("/forms");
  };

  // --- Section Handlers ---

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addSection = () => {
    const newSection: FormSection = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Section",
      description: "",
      fields: [],
    };
    setForm({ ...form, sections: [...form.sections, newSection] });
  };

  const updateSection = (id: string, field: keyof FormSection, value: any) => {
    setForm({
      ...form,
      sections: form.sections.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  const removeSection = (id: string) => {
    if (window.confirm("Delete this section and all its fields?")) {
      setForm({ ...form, sections: form.sections.filter((s) => s.id !== id) });
    }
  };

  // --- Field Handlers ---

  const addField = (sectionId: string) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      label: "New Field",
      key: `field_${Math.random().toString(36).substr(2, 5)}`,
      placeholder: "",
      type: "text",
      widthDesktop: "100%",
      widthMobile: "100%",
    };

    setForm({
      ...form,
      sections: form.sections.map((s) => {
        if (s.id === sectionId) {
          return { ...s, fields: [...s.fields, newField] };
        }
        return s;
      }),
    });
  };

  const updateField = (
    sectionId: string,
    fieldId: string,
    key: keyof FormField,
    value: any
  ) => {
    setForm({
      ...form,
      sections: form.sections.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            fields: s.fields.map((f) =>
              f.id === fieldId ? { ...f, [key]: value } : f
            ),
          };
        }
        return s;
      }),
    });
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setForm({
      ...form,
      sections: form.sections.map((s) => {
        if (s.id === sectionId) {
          return { ...s, fields: s.fields.filter((f) => f.id !== fieldId) };
        }
        return s;
      }),
    });
  };

  return (
    <div className="flex gap-4 flex-col min-h-screen bg-background font-sans text-foreground ">
      {/* 1. Header (Consistent with PageEditor) */}
      <div
        className={`bg-card py-4 sticky top-0 z-10 flex items-center justify-between h-16 -mx-4 px-4 transition-all duration-200 ${
          isScrolled ? "border-b border-border" : ""
        }`}
      >
        <div className="flex items-center gap-4">
          <Link to="/forms">
            <Button
              variant="ghost"
              size="sm"
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
          </Link>
          <div className="space-y-0.5">
            <div className="font-semibold text-base leading-none text-foreground">
              {form.name || "Create Form Template"}
            </div>
            <p className="text-xs text-muted-foreground">
              Last saved {new Date(form.updatedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="default" size="sm" onClick={handleSave}>
            Save Draft
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full pb-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Main Content (9 cols) */}
        <div className="lg:col-span-9 space-y-8">
          {/* Form Basics */}
          <Card className="border-border shadow-none ring-1 ring-border/50">
            <CardHeader className="border-b border-border ">
              <CardTitle className="text-lg">Form Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label>Form Name</Label>
                <Input
                  placeholder="e.g. Contact Us Form"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="text-lg font-heading font-medium"
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Input
                  placeholder="Internal description for this form"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Sections List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-foreground">
                Sections & Fields
              </h2>
            </div>

            {form.sections.map((section, sIdx) => (
              <Card
                key={section.id}
                className="border-border shadow-none ring-1 ring-border/50 overflow-hidden"
              >
                {/* Section Header */}
                <div className="bg-muted/50 border-b border-border p-6 flex items-start gap-6 group/section">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center font-bold text-sm text-muted-foreground shadow-none">
                    {sIdx + 1}
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="grid gap-1.5">
                      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                        Section Title
                      </Label>
                      <Input
                        className="bg-card font-medium"
                        placeholder="Section Title (Visible to user)"
                        value={section.title}
                        onChange={(e) =>
                          updateSection(section.id, "title", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                        Description
                      </Label>
                      <Input
                        className="bg-card"
                        placeholder="Section Description"
                        value={section.description}
                        onChange={(e) =>
                          updateSection(
                            section.id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(section.id)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </Button>
                </div>

                {/* Field List */}
                <div className="p-6 bg-card space-y-6">
                  {section.fields.map((field) => (
                    <div
                      key={field.id}
                      className="border border-border rounded-lg p-5 relative bg-card hover:border-primary/50 hover:shadow-none transition-all group/field"
                    >
                      {/* Field Header */}
                      <div className="flex justify-between items-start mb-4 border-b border-border pb-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {field.type}
                          </span>
                          <span className="font-semibold text-sm text-foreground">
                            {field.label || "Untitled Field"}
                          </span>
                          <span className="text-xs font-sans text-muted-foreground">
                            {field.key}
                          </span>
                        </div>
                        <button
                          onClick={() => removeField(section.id, field.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Field Properties Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Column 1: General (4 cols) */}
                        <div className="md:col-span-4 space-y-3">
                          <Label className="text-xs uppercase text-muted-foreground font-bold">
                            General
                          </Label>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs mb-1 block">
                                Label
                              </Label>
                              <Input
                                value={field.label}
                                onChange={(e) =>
                                  updateField(
                                    section.id,
                                    field.id,
                                    "label",
                                    e.target.value
                                  )
                                }
                                className="h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs mb-1 block">
                                Key (Variable Name)
                              </Label>
                              <Input
                                value={field.key}
                                onChange={(e) =>
                                  updateField(
                                    section.id,
                                    field.id,
                                    "key",
                                    e.target.value
                                  )
                                }
                                className="h-8 text-sm font-sans"
                              />
                            </div>
                            <div>
                              <Label className="text-xs mb-1 block">Type</Label>
                              <Select
                                value={field.type}
                                onValueChange={(val) =>
                                  updateField(section.id, field.id, "type", val)
                                }
                              >
                                <SelectTrigger className="h-8 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">
                                    Text Input
                                  </SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="number">Number</SelectItem>
                                  <SelectItem value="textarea">
                                    Long Text
                                  </SelectItem>
                                  <SelectItem value="select">
                                    Dropdown
                                  </SelectItem>
                                  <SelectItem value="checkbox">
                                    Checkbox
                                  </SelectItem>
                                  <SelectItem value="radio">
                                    Radio Button
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Layout & Props (4 cols) */}
                        <div className="md:col-span-4 space-y-3 border-l border-border pl-4">
                          <Label className="text-xs uppercase text-muted-foreground font-bold">
                            Layout & Props
                          </Label>
                          <div className="space-y-3">
                            <div>
                              <Label className="text-xs mb-1 block">
                                Placeholder
                              </Label>
                              <Input
                                value={field.placeholder}
                                onChange={(e) =>
                                  updateField(
                                    section.id,
                                    field.id,
                                    "placeholder",
                                    e.target.value
                                  )
                                }
                                className="h-8 text-sm"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-xs text-muted-foreground mb-1 block">
                                  Width (Desktop)
                                </Label>
                                <Input
                                  value={field.widthDesktop}
                                  onChange={(e) =>
                                    updateField(
                                      section.id,
                                      field.id,
                                      "widthDesktop",
                                      e.target.value
                                    )
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground mb-1 block">
                                  Width (Mobile)
                                </Label>
                                <Input
                                  value={field.widthMobile}
                                  onChange={(e) =>
                                    updateField(
                                      section.id,
                                      field.id,
                                      "widthMobile",
                                      e.target.value
                                    )
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs mb-1 block">
                                Help Message
                              </Label>
                              <Input
                                value={field.helpMessage || ""}
                                onChange={(e) =>
                                  updateField(
                                    section.id,
                                    field.id,
                                    "helpMessage",
                                    e.target.value
                                  )
                                }
                                className="h-8 text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Column 3: Validation (4 cols) */}
                        <div className="md:col-span-4 space-y-3 border-l border-border pl-4">
                          <Label className="text-xs uppercase text-muted-foreground font-bold">
                            Validation
                          </Label>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-xs text-muted-foreground mb-1 block">
                                  Min Length
                                </Label>
                                <Input
                                  type="number"
                                  value={field.minLength || ""}
                                  onChange={(e) =>
                                    updateField(
                                      section.id,
                                      field.id,
                                      "minLength",
                                      e.target.value
                                    )
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground mb-1 block">
                                  Max Length
                                </Label>
                                <Input
                                  type="number"
                                  value={field.maxLength || ""}
                                  onChange={(e) =>
                                    updateField(
                                      section.id,
                                      field.id,
                                      "maxLength",
                                      e.target.value
                                    )
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs mb-1 block">
                                Error Message
                              </Label>
                              <Input
                                value={field.errorMessage || ""}
                                onChange={(e) =>
                                  updateField(
                                    section.id,
                                    field.id,
                                    "errorMessage",
                                    e.target.value
                                  )
                                }
                                className="h-8 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-xs mb-1 block">
                                Regex Pattern
                              </Label>
                              <Input
                                value={field.pattern || ""}
                                onChange={(e) =>
                                  updateField(
                                    section.id,
                                    field.id,
                                    "pattern",
                                    e.target.value
                                  )
                                }
                                className="h-8 text-sm font-sans text-xs"
                                placeholder="e.g. ^[A-Z]+$"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {section.fields.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed border-border rounded-lg bg-accent/30">
                      No fields in this section yet.
                    </div>
                  )}

                  <Button
                    onClick={() => addField(section.id)}
                    variant="outline"
                    className="w-full border-dashed text-primary border-primary/30 hover:bg-primary/5"
                  >
                    + Add Field to "{section.title || "Section"}"
                  </Button>
                </div>
              </Card>
            ))}

            <button
              onClick={addSection}
              className="w-full py-6 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-card transition-all gap-2 group"
            >
              <div className="w-8 h-8 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
              <span className="font-semibold">Add New Section</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Publishing Card */}
          <Card className="border-border shadow-none ring-1 ring-border/50 sticky top-24">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground font-bold">
                Publishing
              </CardTitle>
            </CardHeader>
            <CardContent className=" space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Status
                </span>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    form.status === "Published"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {form.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="default"
                  onClick={handleSave}
                  className="w-full font-semibold py-2 cursor-pointer"
                >
                  {form.status === "Published" ? "Update Form" : "Publish Form"}
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="border-border shadow-none ring-1 ring-border/50">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground font-bold">
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className=" space-y-4">
              <div className="grid gap-2">
                <Label>Email Category</Label>
                <Select
                  value={form.emailCategory || "Marketing"}
                  onValueChange={(v) => setForm({ ...form, emailCategory: v })}
                >
                  <SelectTrigger className="bg-card">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Determines routing for email notifications.
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Language</Label>
                <Select value="en" onValueChange={() => {}}>
                  <SelectTrigger className="bg-card">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="th">Thai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
