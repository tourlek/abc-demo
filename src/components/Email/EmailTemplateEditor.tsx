import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { EmailTemplate } from "../../types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { MOCK_EMAIL_TEMPLATES } from "../../constants";

export const EmailTemplateEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id && id !== "new";

  const [template, setTemplate] = useState<EmailTemplate>(() => {
    if (isEditMode) {
      const existing = MOCK_EMAIL_TEMPLATES.find((t) => t.id === id);
      if (existing) return existing;
    }
    return {
      id: "",
      name: "",
      subject: "",
      category: "Transactional",
      htmlContent: "",
      variables: [],
      status: "Draft",
      updatedAt: new Date().toISOString(),
    };
  });

  // Scroll detection for sticky header shadow
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSave = () => {
    console.log("Saving template:", template);
    navigate("/email-templates");
  };

  const categories = ["Transactional", "Marketing", "Notification", "System"];

  return (
    <div className="flex gap-4 flex-col min-h-screen bg-background">
      <div
        className={`bg-card py-4 sticky top-0 z-10 flex items-center justify-between h-16 -mx-4 px-4 transition-all duration-200 ${
          isScrolled ? "border-b border-border" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/email-templates")}
            className="text-muted-foreground hover:text-foreground"
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
            <h1 className="font-semibold text-base leading-none">
              {isEditMode ? "Edit Template" : "Create Template"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isEditMode ? `Editing: ${template.name}` : "New email template"}
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
        <div className="lg:col-span-9 space-y-6">
          <Card>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Template Name</Label>
                <Input
                  value={template.name}
                  onChange={(e) =>
                    setTemplate({ ...template, name: e.target.value })
                  }
                  placeholder="Welcome Email"
                />
              </div>

              <div className="space-y-2">
                <Label>Email Subject</Label>
                <Input
                  value={template.subject}
                  onChange={(e) =>
                    setTemplate({ ...template, subject: e.target.value })
                  }
                  placeholder="Welcome to {{company_name}}!"
                />
              </div>

              <div className="space-y-2">
                <Label>HTML Content</Label>
                <Textarea
                  value={template.htmlContent}
                  onChange={(e) =>
                    setTemplate({ ...template, htmlContent: e.target.value })
                  }
                  placeholder="<h1>Welcome {{name}}!</h1><p>Thank you for joining...</p>"
                  rows={15}
                  className="font-sans text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Use syntax for dynamic content
                </p>
              </div>

              <div className="space-y-2">
                <Label>Variables</Label>
                <Input
                  value={template.variables.join(", ")}
                  onChange={(e) =>
                    setTemplate({
                      ...template,
                      variables: e.target.value
                        .split(",")
                        .map((v) => v.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="{{'{{'}}name{'}}'}, {{'{{'}}email{'}}'}, {{'{{'}}company_name{'}}'}"
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated list of variables used in your template
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card className="border-border shadow-sm ring-1 ring-border/50 sticky top-24">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground font-bold">
                Publishing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Status
                </span>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    template.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {template.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button className="w-full font-semibold py-2">
                  Publish Template
                </Button>
                <Button variant="outline" className="w-full">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm ring-1 ring-border/50">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground font-bold">
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={template.category}
                  onValueChange={(v) =>
                    setTemplate({ ...template, category: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
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
