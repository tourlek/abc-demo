import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Banner } from "../../types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { MOCK_CAMPAIGNS } from "../../constants";

export const BannerEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [banner, setBanner] = useState<Banner>(() => ({
    id: id || Math.random().toString(36).substr(2, 9),
    accountId: localStorage.getItem("selected_account_id") || "acc_demo",
    name: "",
    imageUrl: "",
    linkedCampaignId: "",
    status: "Draft",
    updatedAt: new Date().toISOString(),
  }));

  const handleSave = () => {
    const saved = localStorage.getItem("banners");
    const banners = saved ? JSON.parse(saved) : [];
    const index = banners.findIndex((b: Banner) => b.id === banner.id);
    if (index >= 0) {
      banners[index] = banner;
    } else {
      banners.push(banner);
    }
    localStorage.setItem("banners", JSON.stringify(banners));
    navigate("/campaigns/banners");
  };

  return (
    <div className="flex gap-4 flex-col min-h-screen bg-background font-sans text-foreground ">
      {/* Header */}
      <div
        className={`bg-card py-4 sticky top-0 z-10 flex items-center justify-between h-16 -mx-4 px-4 transition-all duration-200 ${
          isScrolled ? "border-b border-border" : ""
        }`}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/campaigns/banners")}
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
            <h1 className="font-semibold text-base leading-none text-foreground">
              {id ? "Edit Banner" : "New Banner"}
            </h1>
            <p className="text-xs text-muted-foreground">
              Last saved {new Date(banner.updatedAt).toLocaleTimeString()}
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
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-border ring-1 ring-border/50">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-lg">Banner Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label>Banner Name</Label>
                <Input
                  placeholder="e.g. Summer Promo Top Banner"
                  value={banner.name}
                  onChange={(e) =>
                    setBanner({ ...banner, name: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Banner Image</Label>
                <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-10 flex flex-col items-center justify-center bg-secondary/20 hover:bg-secondary/40 transition-all cursor-pointer text-center group h-64">
                  <div className="w-12 h-12 bg-card border border-border text-muted-foreground group-hover:text-primary rounded-lg flex items-center justify-center mb-4 transition-colors">
                    <svg
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
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Click to upload image
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Recommended size: 1040x1040 (Square) or 1040x520 (Rect)
                  </p>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Link to Campaign (Optional)</Label>
                <Select
                  value={banner.linkedCampaignId || "none"}
                  onValueChange={(val) =>
                    setBanner({
                      ...banner,
                      linkedCampaignId: val === "none" ? "" : val,
                    })
                  }
                >
                  <SelectTrigger className="h-8!">
                    <SelectValue placeholder="Select a Campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Link</SelectItem>
                    {MOCK_CAMPAIGNS.map((camp) => (
                      <SelectItem key={camp.id} value={camp.id}>
                        {camp.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">
                  When a user clicks this banner in the LIFF app, they will be
                  redirected to the selected campaign.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border ring-1 ring-border/50 sticky top-24">
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
                    banner.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {banner.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="default"
                  onClick={handleSave}
                  className="w-full font-semibold py-2 cursor-pointer"
                >
                  {banner.status === "Active"
                    ? "Update Banner"
                    : "Publish Banner"}
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
