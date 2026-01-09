import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Partner } from "../../types";
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
import { MOCK_PARTNERS } from "../../constants";

export const PartnerEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id && id !== "new";

  const [partner, setPartner] = useState<Partner>(() => {
    if (isEditMode) {
      const existing = MOCK_PARTNERS.find((p) => p.id === id);
      if (existing) return existing;
    }
    return {
      id: "",
      name: "",
      description: "",
      logo: "",
      website: "",
      contactEmail: "",
      status: "Draft",
      featured: false,
      updatedAt: new Date().toISOString(),
    };
  });

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSave = () => {
    console.log("Saving partner:", partner);
    navigate("/partners");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPartner({ ...partner, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background gap-4">
      <div
        className={`bg-card py-4 sticky top-0 z-10 flex items-center justify-between h-16 -mx-4 px-4 transition-all duration-200 ${
          isScrolled ? "border-b border-border" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/partners")}
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
              {isEditMode ? "Edit Partner" : "Add Partner"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isEditMode
                ? `Editing: ${partner.name}`
                : "New partner organization"}
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
                <Label>Partner Name</Label>
                <Input
                  value={partner.name}
                  onChange={(e) =>
                    setPartner({ ...partner, name: e.target.value })
                  }
                  placeholder="Organization name"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={partner.description}
                  onChange={(e) =>
                    setPartner({ ...partner, description: e.target.value })
                  }
                  placeholder="Brief description..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input
                    value={partner.website}
                    onChange={(e) =>
                      setPartner({ ...partner, website: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input
                    type="email"
                    value={partner.contactEmail}
                    onChange={(e) =>
                      setPartner({ ...partner, contactEmail: e.target.value })
                    }
                    placeholder="contact@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Logo</Label>
                {partner.logo ? (
                  <div className="space-y-3">
                    <img
                      src={partner.logo}
                      alt="Logo preview"
                      className="w-32 h-32 object-cover rounded border border-border"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPartner({ ...partner, logo: "" })}
                    >
                      Remove Logo
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-lg cursor-pointer bg-background hover:bg-muted/50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-2 text-muted-foreground"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{" "}
                          logo
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </label>
                  </div>
                )}
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
                    partner.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {partner.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="default"
                  onClick={handleSave}
                  className="w-full font-semibold py-2 cursor-pointer"
                >
                  {partner.status === "Active"
                    ? "Update Partner"
                    : "Publish Partner"}
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
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
            <CardContent className="space-y-5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={partner.featured}
                  onChange={(e) =>
                    setPartner({ ...partner, featured: e.target.checked })
                  }
                  className="rounded border-input cursor-pointer"
                />
                <Label className="cursor-pointer">Featured Partner</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
