import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PageStatus,
  type LandingPage,
  type ComponentData,
  type SystemCategory,
  type Language,
} from "../../types";
import { MOCK_PAGES } from "@/constants";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea as TextArea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RichTextEditor } from "../ui/rich-text-editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Pencil, X } from "lucide-react";
import { CarouselEditor } from "./CarouselEditor";
import { CustomBlockEditor } from "./CustomBlockEditor";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import { generatePageContent } from "../../services/geminiService";

// Sortable Item Component
interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="group relative">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-10 text-muted-foreground hover:text-foreground transition-colors p-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="5" r="1" />
            <circle cx="9" cy="12" r="1" />
            <circle cx="9" cy="19" r="1" />
            <circle cx="15" cy="5" r="1" />
            <circle cx="15" cy="12" r="1" />
            <circle cx="15" cy="19" r="1" />
          </svg>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export const PageEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Create empty page for new pages, or find existing page
  const getInitialPage = (): LandingPage => {
    if (id && id !== "new") {
      const existingPage = MOCK_PAGES.find((p) => p.id === id);
      if (existingPage) return existingPage;
    }
    // Return new empty page
    return {
      id: Math.random().toString(36).substr(2, 9),
      slug: "",
      tags: [],
      status: PageStatus.DRAFT,
      defaultLanguage: "th",
      content: {
        th: {
          title: "",
          components: [],
        },
      },
      revisions: [],
      updatedAt: new Date().toISOString(),
    };
  };
  const [page, setPage] = useState<LandingPage>(getInitialPage);
  const [currentLang, setCurrentLang] = useState<Language>("th");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");
  const [showBlockPicker, setShowBlockPicker] = useState(false);
  const [editingComponentId, setEditingComponentId] = useState<string | null>(
    null
  );

  const currentContent = page.content[currentLang] ?? page.content.th;

  const editingComponent = currentContent.components.find(
    (c) => c.id === editingComponentId
  );

  // Dynamic Categories from Settings
  const [systemCategories, setSystemCategories] = useState<SystemCategory[]>(
    []
  );

  useEffect(() => {
    const savedCats = localStorage.getItem("system_categories");
    if (savedCats) {
      try {
        setSystemCategories(JSON.parse(savedCats));
      } catch (e) {
        console.error("Error loading system categories", e);
      }
    }
  }, []);

  // Helper to add English content
  const handleAddEnglish = () => {
    setPage({
      ...page,
      content: {
        ...page.content,
        en: {
          title: "",
          components: [],
        },
      },
    });
    setCurrentLang("en");
  };

  // Helper to update a component
  const updateComponent = (id: string, content: any) => {
    // Safety check: ensure we are editing existing content
    if (!page.content[currentLang]) return;

    const updatedComponents = currentContent.components.map((c) =>
      c.id === id ? { ...c, content } : c
    );
    setPage({
      ...page,
      content: {
        ...page.content,
        [currentLang]: {
          ...currentContent,
          components: updatedComponents,
        },
      },
    });
  };

  // Helper to add component
  const addComponent = (type: ComponentData["type"]) => {
    let content: Record<string, any>;

    switch (type) {
      case "hero":
        content = { title: "New Hero", subtitle: "Subtitle" };
        break;
      case "richtext":
        content = { html: "<p>Start typing...</p>" };
        break;
      case "carousel":
        content = { slides: [], autoplay: false };
        break;
      case "custom":
        content = { html: "<div>Custom HTML here</div>", css: "" };
        break;
      default:
        content = { text: "New text block" };
    }

    const newComponent: ComponentData = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content,
    };
    setPage({
      ...page,
      content: {
        ...page.content,
        [currentLang]: {
          ...currentContent,
          components: [...currentContent.components, newComponent],
        },
      },
    });
    setEditingComponentId(newComponent.id);
    setShowBlockPicker(false);
  };

  const removeComponent = (id: string) => {
    setPage({
      ...page,
      content: {
        ...page.content,
        [currentLang]: {
          ...currentContent,
          components: currentContent.components.filter((c) => c.id !== id),
        },
      },
    });
  };

  // Drag and Drop Handler
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = currentContent.components.findIndex(
        (c) => c.id === active.id
      );
      const newIndex = currentContent.components.findIndex(
        (c) => c.id === over.id
      );

      setPage({
        ...page,
        content: {
          ...page.content,
          [currentLang]: {
            ...currentContent,
            components: arrayMove(
              currentContent.components,
              oldIndex,
              newIndex
            ),
          },
        },
      });
    }
  };

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // AI Generation Handler
  // const handleAIGenerate = async (componentId: string) => {
  //   setIsGenerating(true);
  //   // const content = await generatePageContent(page.title);
  //   updateComponent(componentId, { text: content });
  //   setIsGenerating(false);
  // };

  // Tag Handling
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTagInput.trim()) {
      e.preventDefault();
      if (!page.tags?.includes(newTagInput.trim())) {
        setPage({ ...page, tags: [...(page.tags || []), newTagInput.trim()] });
      }
      setNewTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPage({
      ...page,
      tags: (page.tags || []).filter((tag) => tag !== tagToRemove),
    });
  };

  // Category Value Handling
  const handleCategoryChange = (catId: string, optionId: string) => {
    setPage({
      ...page,
      categoryValues: {
        ...(page.categoryValues || {}),
        [catId]: optionId,
      },
    });
  };

  // Saving Wrappers
  const handleSaveDraft = () => {
    // In a real app, this would save to backend
    console.log("Saving draft:", page);
    // For now, just navigate back to list
    navigate("/pages");
  };

  const handlePublish = () => {
    // In a real app, this would save to backend with published status
    console.log("Publishing page:", { ...page, status: PageStatus.PUBLISHED });
    navigate("/pages");
  };

  const handleCancel = () => {
    navigate("/pages");
  };

  // Date Logic for Calendar
  const publishDateObj = page?.publishDate
    ? new Date(page.publishDate)
    : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    // Preserve existing time or default to current time
    const current = page.publishDate ? new Date(page.publishDate) : new Date();
    date.setHours(current.getHours());
    date.setMinutes(current.getMinutes());
    setPage({ ...page, publishDate: date.toISOString() });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeVal = e.target.value; // "HH:MM"
    if (!timeVal) return;

    const [hours, minutes] = timeVal.split(":").map(Number);
    const date = page.publishDate ? new Date(page.publishDate) : new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    setPage({ ...page, publishDate: date.toISOString() });
  };

  const unpublishDateObj = page?.unpublishDate
    ? new Date(page.unpublishDate)
    : undefined;

  const handleUnpublishDateSelect = (date: Date | undefined) => {
    if (!date) {
      setPage({ ...page, unpublishDate: undefined });
      return;
    }
    const current = page.unpublishDate
      ? new Date(page.unpublishDate)
      : new Date();
    date.setHours(current.getHours());
    date.setMinutes(current.getMinutes());
    setPage({ ...page, unpublishDate: date.toISOString() });
  };

  const handleUnpublishTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const timeVal = e.target.value;
    if (!timeVal) return;

    const [hours, minutes] = timeVal.split(":").map(Number);
    const date = page.unpublishDate ? new Date(page.unpublishDate) : new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    setPage({ ...page, unpublishDate: date.toISOString() });
  };

  // Format time for input
  const timeString = publishDateObj
    ? `${String(publishDateObj.getHours()).padStart(2, "0")}:${String(
        publishDateObj.getMinutes()
      ).padStart(2, "0")}`
    : "";

  const unpublishTimeString = unpublishDateObj
    ? `${String(unpublishDateObj.getHours()).padStart(2, "0")}:${String(
        unpublishDateObj.getMinutes()
      ).padStart(2, "0")}`
    : "";

  return (
    <>
      {/* 1. Top Navigation Bar */}
      <div
        className={`bg-card py-4 sticky top-0 z-10 flex items-center justify-between h-16 -mx-4 px-4 transition-all duration-200 ${
          isScrolled ? "border-b border-border " : ""
        }`}
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
              {currentContent.title || "Untitled Page"}
            </div>
            <p className="text-xs text-muted-foreground">
              Last saved {new Date(page.updatedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-4">
          <Tabs
            value={currentLang}
            onValueChange={(val) => setCurrentLang(val as Language)}
            className="w-auto"
          >
            <TabsList>
              <TabsTrigger value="th">🇹🇭 Thai</TabsTrigger>
              {page.content.en && (
                <TabsTrigger value="en">🇺🇸 English</TabsTrigger>
              )}
            </TabsList>
          </Tabs>

          {!page.content.en && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddEnglish}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <span className="text-xs">🇺🇸</span>
              Add English
            </Button>
          )}

          <Button variant="default" size="sm" onClick={handleSaveDraft}>
            Save Draft
          </Button>
        </div>
      </div>
      <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
        {/* 2. Main Workspace (2-Column Layout) */}
        <div className="flex-1 w-full pb-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Content Canvas (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            <Card className="border-border shadow-none ring-1 ring-border/50">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Title ({currentLang.toUpperCase()})</Label>
                  <Input
                    value={currentContent.title}
                    onChange={(e) =>
                      setPage({
                        ...page,
                        content: {
                          ...page.content,
                          [currentLang]: {
                            ...currentContent,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="e.g. Summer Campaign 2025"
                  />
                </div>

                <div className="space-y-2">
                  <Label>URL Slug</Label>
                  <div className="flex items-center gap-2 border border-border rounded-md px-3 py-2 bg-muted/30">
                    <span className="text-muted-foreground text-sm">
                      yoursite.com/
                    </span>
                    <input
                      value={page.slug}
                      onChange={(e) =>
                        setPage({ ...page, slug: e.target.value })
                      }
                      className="bg-transparent border-none focus:ring-0 text-foreground p-0 w-full placeholder-muted-foreground"
                      placeholder="page-url-slug"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Components List */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={currentContent.components.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {currentContent.components.map((comp) => (
                    <SortableItem key={comp.id} id={comp.id}>
                      <Card className="hover:border-primary/50 transition-colors shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pl-10">
                          <div className="flex flex-col gap-1 flex-1 py-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">
                                {comp.type === "hero" && "Hero Section"}
                                {comp.type === "text" && "Text Content"}
                                {comp.type === "image" && "Image"}
                                {comp.type === "form" && "Lead Form"}
                                {comp.type === "richtext" && "Rich Text Editor"}
                                {comp.type === "carousel" && "Carousel"}
                                {comp.type === "custom" && "Custom Code"}
                              </span>
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                {comp.type}
                              </span>
                            </div>

                            <div className="text-sm text-muted-foreground">
                              {comp.type === "hero" && (
                                <div className="flex flex-col gap-0.5 mt-1">
                                  {comp.content.title && (
                                    <div className="flex gap-2 items-center">
                                      <span className="text-xs font-semibold w-12 text-foreground/70">
                                        Headline:
                                      </span>
                                      <span className="truncate flex-1 font-medium text-foreground">
                                        {comp.content.title}
                                      </span>
                                    </div>
                                  )}
                                  {comp.content.subtitle && (
                                    <div className="flex gap-2 items-center">
                                      <span className="text-xs font-semibold w-12 text-foreground/70">
                                        Subtitle:
                                      </span>
                                      <span className="truncate flex-1">
                                        {comp.content.subtitle}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}

                              {comp.type === "text" && (
                                <p className="line-clamp-2 mt-1">
                                  {comp.content.text || (
                                    <span className="italic opacity-50">
                                      No text content
                                    </span>
                                  )}
                                </p>
                              )}

                              {comp.type === "image" && (
                                <div className="mt-1 flex flex-col gap-2">
                                  <span className="text-xs">
                                    Single Image Component
                                  </span>
                                  {comp.content.url && (
                                    <img
                                      src={comp.content.url}
                                      alt="Preview"
                                      className="w-full h-32 object-cover rounded-md border border-border"
                                    />
                                  )}
                                </div>
                              )}

                              {comp.type === "form" && (
                                <div className="mt-1 text-xs">
                                  Lead Generation Form
                                </div>
                              )}

                              {comp.type === "richtext" && (
                                <div className="mt-1 text-xs">
                                  HTML Content Editor
                                </div>
                              )}

                              {comp.type === "carousel" && (
                                <div className="mt-1 flex flex-col gap-2">
                                  <span className="text-xs">
                                    {comp.content.slides?.length || 0} Slides
                                    configured
                                  </span>
                                  {comp.content.slides?.[0]?.image && (
                                    <div className="relative w-full h-32 rounded-md border border-border overflow-hidden">
                                      <img
                                        src={comp.content.slides[0].image}
                                        alt="Slide 1 Preview"
                                        className="w-full h-full object-cover"
                                      />
                                      <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1 rounded">
                                        +{(comp.content.slides.length || 1) - 1}{" "}
                                        more
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {comp.type === "custom" && (
                                <div className="mt-1 text-xs font-mono bg-muted/50 p-1 w-fit rounded">
                                  &lt;div&gt;...&lt;/div&gt;
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => setEditingComponentId(comp.id)}
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => removeComponent(comp.id)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
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
                            </Button>
                          </div>
                        </CardHeader>
                      </Card>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Edit Component Dialog */}
            <Dialog
              open={!!editingComponentId}
              onOpenChange={(open) => !open && setEditingComponentId(null)}
            >
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit {editingComponent?.type} Block</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                  {editingComponent && (
                    <div className="space-y-4">
                      {editingComponent.type === "hero" && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Headline</Label>
                            <Input
                              value={editingComponent.content.title}
                              onChange={(e) =>
                                updateComponent(editingComponent.id, {
                                  ...editingComponent.content,
                                  title: e.target.value,
                                })
                              }
                              placeholder="Hero headline"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Subtitle</Label>
                            <Input
                              value={editingComponent.content.subtitle}
                              onChange={(e) =>
                                updateComponent(editingComponent.id, {
                                  ...editingComponent.content,
                                  subtitle: e.target.value,
                                })
                              }
                              className="text-foreground"
                              placeholder="Subheadline goes here"
                            />
                          </div>
                        </div>
                      )}

                      {editingComponent.type === "text" && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Content
                          </Label>
                          <TextArea
                            value={editingComponent.content.text}
                            onChange={(e) =>
                              updateComponent(editingComponent.id, {
                                ...editingComponent.content,
                                text: e.target.value,
                              })
                            }
                            className="min-h-[120px]"
                          />
                        </div>
                      )}

                      {editingComponent.type === "image" && (
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg h-48 bg-secondary/20 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
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
                          <span className="mt-2 font-medium">
                            Click to upload image
                          </span>
                        </div>
                      )}

                      {editingComponent.type === "form" && (
                        <div className="bg-blue-50/10 border border-blue-200/50 rounded p-4 flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-blue-900 dark:text-blue-400">
                              Lead Form Block
                            </h4>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                              Collects user information
                            </p>
                          </div>
                          <Button size="sm" variant="secondary">
                            Configure
                          </Button>
                        </div>
                      )}

                      {editingComponent.type === "richtext" && (
                        <RichTextEditor
                          content={editingComponent.content.html || ""}
                          onChange={(html) =>
                            updateComponent(editingComponent.id, { html })
                          }
                        />
                      )}

                      {editingComponent.type === "carousel" && (
                        <CarouselEditor
                          slides={editingComponent.content.slides || []}
                          autoplay={editingComponent.content.autoplay || false}
                          onChange={(content) =>
                            updateComponent(editingComponent.id, content)
                          }
                        />
                      )}

                      {editingComponent.type === "custom" && (
                        <CustomBlockEditor
                          html={editingComponent.content.html || ""}
                          css={editingComponent.content.css}
                          onChange={(content) =>
                            updateComponent(editingComponent.id, content)
                          }
                        />
                      )}
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button onClick={() => setEditingComponentId(null)}>
                    Done
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Add Component Area */}
            <div className="relative mt-8">
              {!showBlockPicker ? (
                <button
                  onClick={() => setShowBlockPicker(true)}
                  className="w-full py-8 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-card transition-all gap-2 group"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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
                  <span className="font-semibold text-lg">
                    Add Content Block
                  </span>
                </button>
              ) : (
                <Card className="animate-in fade-in slide-in-from-bottom-2 border-dashed shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-lg font-bold">
                      Choose a Block
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowBlockPicker(false)}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        {
                          type: "hero",
                          label: "Hero Section",
                          icon: (
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
                              <rect width="18" height="18" x="3" y="3" rx="2" />
                              <path d="M3 9h18" />
                            </svg>
                          ),
                        },
                        {
                          type: "text",
                          label: "Text Content",
                          icon: (
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
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                          ),
                        },
                        {
                          type: "image",
                          label: "Image",
                          icon: (
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
                          ),
                        },
                        {
                          type: "form",
                          label: "Form",
                          icon: (
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
                              <rect width="18" height="18" x="3" y="3" rx="2" />
                              <path d="M7 7h10" />
                              <path d="M7 12h10" />
                              <path d="M7 17h10" />
                            </svg>
                          ),
                        },
                        {
                          type: "richtext",
                          label: "Rich Text",
                          icon: (
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
                              <path d="M4 7V4h16v3" />
                              <path d="M9 20h6" />
                              <path d="M12 4v16" />
                            </svg>
                          ),
                        },
                        {
                          type: "carousel",
                          label: "Carousel",
                          icon: (
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
                              <rect width="18" height="18" x="3" y="3" rx="2" />
                              <path d="m9 8 3 3-3 3" />
                              <path d="m15 8-3 3 3 3" />
                            </svg>
                          ),
                        },
                        {
                          type: "custom",
                          label: "Custom HTML",
                          icon: (
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
                              <polyline points="16 18 22 12 16 6" />
                              <polyline points="8 6 2 12 8 18" />
                            </svg>
                          ),
                        },
                      ].map((block) => (
                        <button
                          key={block.type}
                          onClick={() => addComponent(block.type as any)}
                          className="flex flex-col items-center justify-center gap-4 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                          <div className="text-muted-foreground group-hover:text-primary transition-colors">
                            {block.icon}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {block.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* 1. Publishing Card */}
            <Card className="border-border shadow-none ring-1 ring-border/50">
              <CardHeader className="border-b border-border px-5">
                <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground font-bold">
                  Publishing
                </CardTitle>
              </CardHeader>
              <CardContent className=" space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Status
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      page.status === PageStatus.PUBLISHED
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : page.status === PageStatus.SCHEDULED
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {page.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      variant="default"
                      onClick={handlePublish}
                      className="w-full font-semibold py-2 cursor-pointer"
                    >
                      Publish Page
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsPreviewOpen(true)}
                      className="w-full cursor-pointer"
                    >
                      Preview
                    </Button>
                    {/* <Button
                    variant="secondary"
                    onClick={handleSaveDraft}
                    className="w-full cursor-pointer"
                  >
                    Save Draft
                  </Button> */}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Label className="text-xs uppercase text-muted-foreground mb-3 block font-bold tracking-wide">
                    Scheduling
                  </Label>
                  <div className="bg-muted/30 p-3 rounded-md border border-border">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="schedule-mode"
                        checked={page.status === PageStatus.SCHEDULED}
                        onCheckedChange={(checked) =>
                          setPage({
                            ...page,
                            status: checked
                              ? PageStatus.SCHEDULED
                              : PageStatus.DRAFT,
                          })
                        }
                      />
                      <Label htmlFor="schedule-mode" className="cursor-pointer">
                        Schedule
                      </Label>
                    </div>

                    {page.status === PageStatus.SCHEDULED && (
                      <div className="mt-3 animate-in slide-in-from-top-1 space-y-4">
                        {/* Publish Date */}
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Publish Date
                          </Label>
                          <div className="flex flex-col gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={`w-full justify-start text-left font-normal ${
                                    !page.publishDate && "text-muted-foreground"
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 opacity-50"
                                  >
                                    <rect
                                      width="18"
                                      height="18"
                                      x="3"
                                      y="4"
                                      rx="2"
                                      ry="2"
                                    />
                                    <line x1="16" x2="16" y1="2" y2="6" />
                                    <line x1="8" x2="8" y1="2" y2="6" />
                                    <line x1="3" x2="21" y1="10" y2="10" />
                                  </svg>
                                  {publishDateObj ? (
                                    publishDateObj.toLocaleDateString()
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="end"
                              >
                                <Calendar
                                  mode="single"
                                  selected={publishDateObj}
                                  onSelect={handleDateSelect}
                                  initialFocus
                                  className="rounded-md border bg-card text-card-foreground"
                                />
                              </PopoverContent>
                            </Popover>

                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground ml-1"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <Input
                                type="time"
                                value={timeString}
                                onChange={handleTimeChange}
                                className="text-xs h-9 bg-background"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Unpublish Date */}
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Unpublish Date
                          </Label>
                          <div className="flex flex-col gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={`w-full justify-start text-left font-normal ${
                                    !page.unpublishDate &&
                                    "text-muted-foreground"
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 opacity-50"
                                  >
                                    <rect
                                      width="18"
                                      height="18"
                                      x="3"
                                      y="4"
                                      rx="2"
                                      ry="2"
                                    />
                                    <line x1="16" x2="16" y1="2" y2="6" />
                                    <line x1="8" x2="8" y1="2" y2="6" />
                                    <line x1="3" x2="21" y1="10" y2="10" />
                                  </svg>
                                  {unpublishDateObj ? (
                                    unpublishDateObj.toLocaleDateString()
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="end"
                              >
                                <Calendar
                                  mode="single"
                                  selected={unpublishDateObj}
                                  onSelect={handleUnpublishDateSelect}
                                  initialFocus
                                  className="rounded-md border bg-card text-card-foreground"
                                />
                              </PopoverContent>
                            </Popover>

                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-muted-foreground ml-1"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <Input
                                type="time"
                                value={unpublishTimeString}
                                onChange={handleUnpublishTimeChange}
                                className="text-xs h-9 bg-background"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Categorization Card */}
            <Card className="border-border shadow-none ring-1 ring-border/50">
              <CardHeader className="border-b border-border px-5">
                <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground font-bold">
                  Organization
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 space-y-5">
                {/* Dynamic System Categories */}
                {systemCategories.length > 0 && (
                  <div className="space-y-4 pb-4 border-b border-border mb-4">
                    {systemCategories.map((cat) => (
                      <div key={cat.id} className="grid gap-2">
                        <Label className="text-foreground font-medium">
                          {cat.name}
                        </Label>
                        <Select
                          value={page.categoryValues?.[cat.id] || ""}
                          onValueChange={(val) =>
                            handleCategoryChange(cat.id, val)
                          }
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder={`Select ${cat.name}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {cat.options.map((opt) => (
                              <SelectItem key={opt.id} value={opt.id}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid gap-2">
                  <Label className="text-foreground font-medium">
                    Keywords / Hashtags
                  </Label>
                  <Input
                    placeholder="Type and hit Enter..."
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Press Enter to create a new tag.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {(page.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium border border-blue-100 dark:border-blue-800 group"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-200 focus:outline-none"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 6L6 18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 6L18 18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. SEO Card */}
            <Card className="border-border shadow-none ring-1 ring-border/50">
              <CardHeader className="border-b border-border px-5">
                <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground font-bold">
                  SEO Settings ({currentLang.toUpperCase()})
                </CardTitle>
              </CardHeader>
              <CardContent className=" space-y-4">
                <div className="grid gap-2">
                  <Label className="text-foreground font-medium">
                    Meta Title
                  </Label>
                  <Input
                    value={
                      currentContent.metaTitle || currentContent.title || ""
                    }
                    onChange={(e) =>
                      setPage({
                        ...page,
                        content: {
                          ...page.content,
                          [currentLang]: {
                            ...currentContent,
                            metaTitle: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Recommended: 50-60 characters"
                    className="text-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-foreground font-medium">
                    Meta Description
                  </Label>
                  <TextArea
                    value={currentContent.metaDescription || ""}
                    onChange={(e) =>
                      setPage({
                        ...page,
                        content: {
                          ...page.content,
                          [currentLang]: {
                            ...currentContent,
                            metaDescription: e.target.value,
                          },
                        },
                      })
                    }
                    rows={4}
                    placeholder="Recommended: 150-160 characters"
                    className="text-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-foreground font-medium">
                    Meta Image
                  </Label>
                  <div className="space-y-3">
                    {currentContent.metaImage ? (
                      <div className="relative group rounded-md overflow-hidden border border-border">
                        <img
                          src={currentContent.metaImage}
                          alt="Meta Preview"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              setPage({
                                ...page,
                                content: {
                                  ...page.content,
                                  [currentLang]: {
                                    ...currentContent,
                                    metaImage: undefined,
                                  },
                                },
                              })
                            }
                          >
                            Remove Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-lg cursor-pointer bg-background hover:bg-muted/50 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-2 text-muted-foreground"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
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
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-1">
                              SVG, PNG, JPG (MAX. 2MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setPage({
                                    ...page,
                                    content: {
                                      ...page.content,
                                      [currentLang]: {
                                        ...currentContent,
                                        metaImage: reader.result as string,
                                      },
                                    },
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Modal Overlay */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-black rounded-2xl shadow-none w-full max-w-md h-[85vh] flex flex-col overflow-hidden border-[10px] border-gray-900 relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-900 z-10 flex justify-center items-start pt-1">
                <div className="w-24 h-5 bg-black rounded-b-xl"></div>
              </div>
              {/* Simulated Mobile Header */}
              <div className="mt-6 border-b p-3 flex justify-between items-center bg-white sticky top-0 z-10 text-black">
                <div className="font-bold text-lg">{currentContent.title}</div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>

              <div className="flex-1 overflow-y-auto px-0 pb-8 bg-white text-black">
                {currentContent.components.map((c) => (
                  <div key={c.id} className="mb-8 last:mb-0">
                    {c.type === "hero" && (
                      <div className="text-center py-16 bg-gray-50 px-6">
                        <h1 className=" font-display font-bold text-gray-900 mb-3">
                          {c.content.title}
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {c.content.subtitle}
                        </p>
                        <button className="mt-6 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium">
                          Call to Action
                        </button>
                      </div>
                    )}
                    {c.type === "text" && (
                      <div className="px-6">
                        <p className="text-base leading-7 text-gray-700">
                          {c.content.text}
                        </p>
                      </div>
                    )}
                    {c.type === "image" && (
                      <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-gray-400">
                        Image Placeholder
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-12 bg-gray-900 text-white py-8 px-6 text-center">
                  <p className="text-sm opacity-60">
                    © 2024 {currentContent.title}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border-t p-3 flex justify-center dark:bg-gray-900">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPreviewOpen(false)}
                  className="text-black dark:text-white"
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
