import React, { useState } from "react";
import type { CarouselSlide } from "../../types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";

interface CarouselEditorProps {
  slides: CarouselSlide[];
  autoplay?: boolean;
  onChange: (content: { slides: CarouselSlide[]; autoplay: boolean }) => void;
}

export const CarouselEditor: React.FC<CarouselEditorProps> = ({
  slides,
  autoplay = false,
  onChange,
}) => {
  const [localSlides, setLocalSlides] = useState<CarouselSlide[]>(slides);
  const [localAutoplay, setLocalAutoplay] = useState(autoplay);

  const updateSlides = (newSlides: CarouselSlide[]) => {
    setLocalSlides(newSlides);
    onChange({ slides: newSlides, autoplay: localAutoplay });
  };

  const updateAutoplay = (value: boolean) => {
    setLocalAutoplay(value);
    onChange({ slides: localSlides, autoplay: value });
  };

  const addSlide = () => {
    const newSlide: CarouselSlide = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: "",
      caption: "",
    };
    updateSlides([...localSlides, newSlide]);
  };

  const removeSlide = (id: string) => {
    updateSlides(localSlides.filter((s) => s.id !== id));
  };

  const updateSlide = (id: string, updates: Partial<CarouselSlide>) => {
    updateSlides(
      localSlides.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const moveSlide = (index: number, direction: "up" | "down") => {
    const newSlides = [...localSlides];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newSlides.length) {
      [newSlides[index], newSlides[newIndex]] = [
        newSlides[newIndex],
        newSlides[index],
      ];
      updateSlides(newSlides);
    }
  };

  return (
    <div className="space-y-4">
      {/* Autoplay Toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="autoplay"
          checked={localAutoplay}
          onChange={(e) => updateAutoplay(e.target.checked)}
          className="rounded border-border"
        />
        <Label htmlFor="autoplay" className="text-sm">
          Enable autoplay
        </Label>
      </div>

      {/* Slides List */}
      <div className="space-y-3">
        {localSlides.map((slide, index) => (
          <Card key={slide.id} className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Slide {index + 1}
                </span>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSlide(index, "up")}
                    disabled={index === 0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSlide(index, "down")}
                    disabled={index === localSlides.length - 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSlide(slide.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-1 1-1h6c1 0 1 1 1 1v2" />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-xs">Image URL</Label>
                <Input
                  value={slide.imageUrl}
                  onChange={(e) =>
                    updateSlide(slide.id, { imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-xs">Caption (optional)</Label>
                <Input
                  value={slide.caption || ""}
                  onChange={(e) =>
                    updateSlide(slide.id, { caption: e.target.value })
                  }
                  placeholder="Image caption"
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-xs">Link (optional)</Label>
                <Input
                  value={slide.link || ""}
                  onChange={(e) =>
                    updateSlide(slide.id, { link: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </div>

              {/* Image Preview */}
              {slide.imageUrl && (
                <div className="mt-2">
                  <img
                    src={slide.imageUrl}
                    alt={slide.caption || `Slide ${index + 1}`}
                    className="w-full h-32 object-cover rounded border border-border"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add Slide Button */}
      <Button
        type="button"
        variant="outline"
        onClick={addSlide}
        className="w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mr-2"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        Add Slide
      </Button>
    </div>
  );
};
