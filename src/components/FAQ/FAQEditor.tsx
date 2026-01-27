import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { FAQ } from "../../types";
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
import { MOCK_FAQS } from "../../constants";

export const FAQEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id && id !== "new";

  const [faq, setFAQ] = useState<FAQ>(() => {
    if (isEditMode) {
      const existing = MOCK_FAQS.find((f) => f.id === id);
      if (existing) return existing;
    }
    return {
      id: "",
      question: "",
      answer: "",
      category: "General",
      order: 1,
      status: "Draft",
      updatedAt: new Date().toISOString(),
    };
  });

  const handleSave = () => {
    console.log("Saving FAQ:", faq);
    navigate("/faq");
  };

  const handleCancel = () => {
    navigate("/faq");
  };

  // Scroll detection for sticky header border
  const [isScrolled, setIsScrolled] = useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = ["General", "Account", "Billing", "Technical", "Other"];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div
        className={`bg-tranparent py-4 sticky top-0 z-10 flex items-center justify-between h-16 -mx-4 px-4 transition-all duration-200 ${isScrolled ? "border-b border-border bg-card" : ""}`}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
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
            <div className="font-semibold text-base leading-none">
              {isEditMode ? "Edit FAQ" : "Create FAQ"}
            </div>
            <p className="text-xs text-muted-foreground">
              {isEditMode
                ? `Editing: ${faq.question?.substring(0, 50)}...`
                : "New FAQ item"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="default" onClick={handleSave}>
            Save Draft
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full pb-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Content */}
        <div className="lg:col-span-9 space-y-6">
          <Card>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Question</Label>
                <Input
                  value={faq.question}
                  onChange={(e) => setFAQ({ ...faq, question: e.target.value })}
                  placeholder="What is your question?"
                />
              </div>

              <div className="space-y-2">
                <Label>Answer</Label>
                <Textarea
                  value={faq.answer}
                  onChange={(e) => setFAQ({ ...faq, answer: e.target.value })}
                  placeholder="Provide a detailed answer..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Settings */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-border shadow-none ">
            <CardHeader className="">
              <CardTitle className="text-sm uppercase tracking-wide font-bold">
                Publishing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Status
                </span>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${faq.status === "Published"
                    ? "bg-success/15 text-success dark:bg-success/25 dark:text-success"
                    : "bg-secondary text-secondary-foreground"
                    }`}
                >
                  {faq.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="default"
                  onClick={handleSave}
                  className="w-full font-semibold py-2 cursor-pointer"
                >
                  {faq.status === "Published" ? "Update FAQ" : "Publish FAQ"}
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-none">
            <CardHeader className="">
              <CardTitle className="text-sm uppercase tracking-wide font-bold">
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={faq.category}
                  onValueChange={(v) => setFAQ({ ...faq, category: v })}
                >
                  <SelectTrigger className="h-8! w-full">
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

              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={faq.order}
                  onChange={(e) =>
                    setFAQ({ ...faq, order: parseInt(e.target.value) || 1 })
                  }
                  min={1}
                />
                <p className="text-xs text-muted-foreground">
                  Lower numbers appear first
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
