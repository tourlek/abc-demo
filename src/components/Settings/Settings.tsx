import React, { useState, useEffect } from "react";
import type { LineAccount, SystemCategory, CategoryOption } from "../../types";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea as TextArea } from "../ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Link2,
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Package,
  Users,
  BookOpen,
  Info,
  X,
} from "lucide-react";

export const Settings: React.FC = () => {
  // --- LINE OA State ---
  const [accounts, setAccounts] = useState<LineAccount[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "checking" | "error"
  >("idle");

  const [formData, setFormData] = useState({
    name: "",
    channelId: "",
    channelSecret: "",
    channelAccessToken: "",
    liffId: "",
    oaUrl: "",
  });

  // --- Categories State ---
  const [categories, setCategories] = useState<SystemCategory[]>([]);
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [newCatData, setNewCatData] = useState({ name: "", description: "" });
  const [newOptionInputs, setNewOptionInputs] = useState<
    Record<string, string>
  >({});

  // --- Effects ---
  useEffect(() => {
    // Load Accounts
    const savedAccounts = localStorage.getItem("line_accounts");
    if (savedAccounts) {
      try {
        setAccounts(JSON.parse(savedAccounts));
      } catch (e) {
        console.error("Failed to parse accounts", e);
      }
    } else {
      // Default Mock Account
      const defaultAccount: LineAccount = {
        id: "acc_demo",
        name: "Demo Account",
        oaUrl: "https://line.me/R/ti/p/@demo",
        credentials: {
          channelId: "1654321000",
          channelSecret: "xxxxxxxxxxxxxxxxx",
          channelAccessToken: "short_lived_token",
          liffId: "1654321000-AbCdEfGh",
          isValid: true,
        },
      };
      setAccounts([defaultAccount]);
      localStorage.setItem("line_accounts", JSON.stringify([defaultAccount]));
    }

    // Load Categories
    const savedCategories = localStorage.getItem("system_categories");
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (e) {
        console.error("Failed to parse categories", e);
      }
    } else {
      // Default Mock Data if empty
      const defaults: SystemCategory[] = [
        {
          id: "cat_1",
          name: "Product Line",
          description: "หมวดหมู่สินค้าหลัก",
          options: [
            { id: "opt_1", label: "เครื่องใช้ไฟฟ้า (Electronics)" },
            { id: "opt_2", label: "แฟชั่น (Fashion)" },
            { id: "opt_3", label: "ของใช้ในบ้าน (Home & Living)" },
          ],
        },
        {
          id: "cat_2",
          name: "Target Audience",
          description: "กลุ่มเป้าหมายลูกค้า",
          options: [
            { id: "opt_4", label: "ลูกค้าใหม่ (New Users)" },
            { id: "opt_5", label: "ลูกค้าเก่า (Returning)" },
            { id: "opt_6", label: "ลูกค้า VIP" },
          ],
        },
      ];
      setCategories(defaults);
      localStorage.setItem("system_categories", JSON.stringify(defaults));
    }
  }, []);

  const saveAccounts = (newAccounts: LineAccount[]) => {
    setAccounts(newAccounts);
    localStorage.setItem("line_accounts", JSON.stringify(newAccounts));
  };

  const saveCategories = (newCategories: SystemCategory[]) => {
    setCategories(newCategories);
    localStorage.setItem("system_categories", JSON.stringify(newCategories));
  };

  // --- Handlers (LINE OA) ---
  const handleDelete = (id: string) => {
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบบัญชีนี้?")) {
      saveAccounts(accounts.filter((a) => a.id !== id));
    }
  };

  const handleVerifyAndSave = () => {
    setVerificationStatus("checking");
    setTimeout(() => {
      if (formData.channelId && formData.channelSecret) {
        const newAccount: LineAccount = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.name || `OA-${formData.channelId.slice(0, 4)}`,
          oaUrl: formData.oaUrl,
          credentials: {
            channelId: formData.channelId,
            channelSecret: formData.channelSecret,
            channelAccessToken: formData.channelAccessToken,
            liffId: formData.liffId,
            isValid: true,
          },
        };
        saveAccounts([...accounts, newAccount]);
        setIsAdding(false);
        setFormData({
          name: "",
          channelId: "",
          channelSecret: "",
          channelAccessToken: "",
          liffId: "",
          oaUrl: "",
        });
        setVerificationStatus("idle");
      } else {
        setVerificationStatus("error");
      }
    }, 1500);
  };

  // --- Handlers (Categories) ---
  const handleAddCategory = () => {
    if (!newCatData.name) return;
    const newCat: SystemCategory = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCatData.name,
      description: newCatData.description,
      options: [],
    };
    saveCategories([...categories, newCat]);
    setNewCatData({ name: "", description: "" });
    setIsAddingCat(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (
      window.confirm(
        "ลบหมวดหมู่นี้? การกระทำนี้อาจส่งผลต่อหน้าที่ใช้งานตัวเลือกเหล่านี้อยู่"
      )
    ) {
      saveCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleAddOption = (catId: string) => {
    const val = newOptionInputs[catId];
    if (!val || !val.trim()) return;

    const newOption: CategoryOption = {
      id: Math.random().toString(36).substr(2, 9),
      label: val.trim(),
    };

    const updatedCategories = categories.map((c) => {
      if (c.id === catId) {
        return { ...c, options: [...c.options, newOption] };
      }
      return c;
    });

    saveCategories(updatedCategories);
    setNewOptionInputs({ ...newOptionInputs, [catId]: "" });
  };

  const handleDeleteOption = (catId: string, optId: string) => {
    const updatedCategories = categories.map((c) => {
      if (c.id === catId) {
        return { ...c, options: c.options.filter((o) => o.id !== optId) };
      }
      return c;
    });
    saveCategories(updatedCategories);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2 mt-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            การตั้งค่า (Settings)
          </h2>
          <p className="text-muted-foreground">
            จัดการพื้นที่ทำงาน การเชื่อมต่อระบบ และข้อมูลหมวดหมู่ต่างๆ
          </p>
        </div>
      </div>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="integrations" className="gap-2">
            <Link2 className=" w-4" />
            การเชื่อมต่อ (Integrations)
          </TabsTrigger>
          <TabsTrigger value="categories" className="gap-2">
            <Layers className=" w-4" />
            หมวดหมู่ข้อมูล (Categories)
          </TabsTrigger>
        </TabsList>

        {/* ==================== TAB: INTEGRATIONS (LINE OA) ==================== */}
        <TabsContent value="integrations" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-left-2 duration-300">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between border-b">
                  <div className="space-y-1">
                    <CardTitle className="text-base">
                      บัญชี LINE OA (LINE Official Accounts)
                    </CardTitle>
                    <CardDescription>
                      จัดการบัญชี LINE OA ที่เชื่อมต่อกับระบบ
                    </CardDescription>
                  </div>
                  {!isAdding && (
                    <Button
                      onClick={() => setIsAdding(true)}
                      size="sm"
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      เชื่อมต่อบัญชี
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="">
                  {/* Account List */}
                  {accounts.length > 0 && !isAdding && (
                    <div className="space-y-3">
                      {accounts.map((account) => (
                        <div
                          key={account.id}
                          className="group border rounded-lg p-4 flex items-center justify-between hover:border-primary transition-all bg-card"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center font-bold text-sm border border-green-100 dark:border-green-900">
                              OA
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">
                                {account.name}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans mt-1">
                                <span className="bg-muted px-1.5 py-0.5 rounded">
                                  ID: {account.credentials.channelId}
                                </span>
                                {account.oaUrl && (
                                  <a
                                    href={account.oaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                  >
                                    Open Link
                                  </a>
                                )}
                                <span className="text-green-600 flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3 fill-current" />
                                  เชื่อมต่อแล้ว
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                            onClick={() => handleDelete(account.id)}
                            title="ยกเลิกการเชื่อมต่อ"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {accounts.length === 0 && !isAdding && (
                    <div className="text-center py-12 px-4 rounded-lg border-2 border-dashed">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 text-muted-foreground">
                        <Link2 className="h-6 w-6" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">
                        ยังไม่ได้เชื่อมต่อบัญชี
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                        เชื่อมต่อบัญชี LINE Official Account
                        ของคุณเพื่อเริ่มจัดการแคมเปญ
                      </p>
                      <Button onClick={() => setIsAdding(true)}>
                        เชื่อมต่อบัญชี
                      </Button>
                    </div>
                  )}

                  {/* Add Account Form */}
                  {isAdding && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-semibold text-foreground">
                          เพิ่มการเชื่อมต่อใหม่
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsAdding(false)}
                        >
                          ยกเลิก
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label className="text-xs uppercase tracking-wide">
                            ชื่อบัญชี (Account Name)
                          </Label>
                          <Input
                            placeholder="เช่น Marketing Channel A"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label className="text-xs uppercase tracking-wide">
                            Mockup OA Link
                          </Label>
                          <Input
                            placeholder="https://line.me/R/ti/p/@yourid"
                            value={formData.oaUrl}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                oaUrl: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          <div className="grid gap-2">
                            <Label className="text-xs uppercase tracking-wide">
                              Channel ID
                            </Label>
                            <Input
                              className="font-sans"
                              placeholder="1234567890"
                              value={formData.channelId}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  channelId: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label className="text-xs uppercase tracking-wide">
                              Channel Secret
                            </Label>
                            <Input
                              type="password"
                              className="font-sans"
                              placeholder="••••••••••••"
                              value={formData.channelSecret}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  channelSecret: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label className="text-xs uppercase tracking-wide">
                            Channel Access Token
                          </Label>
                          <TextArea
                            className="h-24 font-sans resize-none"
                            placeholder="กรอก Access Token แบบ Long-lived จาก LINE Developers Console..."
                            value={formData.channelAccessToken}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                channelAccessToken: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label className="text-xs uppercase tracking-wide">
                            LIFF ID{" "}
                            <span className="text-muted-foreground font-normal normal-case">
                              (ไม่ระบุได้)
                            </span>
                          </Label>
                          <Input
                            className="font-sans"
                            placeholder="1234567890-AbCdEfGh"
                            value={formData.liffId}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                liffId: e.target.value,
                              })
                            }
                          />
                        </div>

                        {verificationStatus === "error" && (
                          <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm border border-destructive/20 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            การตรวจสอบล้มเหลว โปรดตรวจสอบข้อมูลอีกครั้ง
                          </div>
                        )}

                        <div className="pt-2 flex justify-end">
                          <Button
                            onClick={handleVerifyAndSave}
                            disabled={verificationStatus === "checking"}
                            className="min-w-[120px]"
                          >
                            {verificationStatus === "checking"
                              ? "กำลังตรวจสอบ..."
                              : "ตรวจสอบและบันทึก"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Area */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                    พื้นที่ทำงาน (Workspace)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      แพ็กเกจ (Plan)
                    </span>
                    <span className="font-semibold text-primary">
                      Pro (Active)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      ผู้ใช้งาน (Users)
                    </span>
                    <span className="font-medium text-foreground">5 / 10</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <Button variant="outline" size="sm" className="w-full">
                      จัดการแพ็กเกจ
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                    บริการช่วยเหลือ (Support)
                  </CardTitle>
                </CardHeader>
                <CardContent className="">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">คู่มือการใช้งาน</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          เรียนรู้วิธีการตั้งค่า LINE OA และการใช้งานระบบ
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      ดูคู่มือการใช้งาน
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ==================== TAB: DATA CATEGORIES ==================== */}
        <TabsContent value="categories" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-2 duration-300">
            <div className="lg:col-span-2 space-y-6">
              {/* Create New Category Action */}
              {!isAddingCat && (
                <Button
                  onClick={() => setIsAddingCat(true)}
                  variant="outline"
                  className="w-full border-dashed py-8 border-2 text-muted-foreground hover:text-primary hover:border-primary hover:bg-card flex flex-col gap-2 h-auto"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                    <Plus className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">เพิ่มกลุ่มหมวดหมู่ใหม่</span>
                </Button>
              )}

              {/* Add Category Form */}
              {isAddingCat && (
                <Card className="">
                  <CardHeader className="border-b ">
                    <CardTitle className="text-base text-primary">
                      สร้างกลุ่มหมวดหมู่ (New Category Group)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label>ชื่อหมวดหมู่</Label>
                      <Input
                        placeholder="เช่น ประเภทสินค้า (Product Type)"
                        value={newCatData.name}
                        onChange={(e) =>
                          setNewCatData({ ...newCatData, name: e.target.value })
                        }
                        className="bg-background"
                        autoFocus
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>คำอธิบาย</Label>
                      <Input
                        placeholder="คำอธิบายสั้นๆ สำหรับการใช้งานภายใน..."
                        value={newCatData.description}
                        onChange={(e) =>
                          setNewCatData({
                            ...newCatData,
                            description: e.target.value,
                          })
                        }
                        className="bg-background"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        variant="ghost"
                        onClick={() => setIsAddingCat(false)}
                      >
                        ยกเลิก
                      </Button>
                      <Button
                        onClick={handleAddCategory}
                        disabled={!newCatData.name}
                      >
                        สร้างหมวดหมู่
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* List of Categories */}
              {categories.map((cat) => (
                <Card
                  key={cat.id}
                  className="group overflow-hidden transition-all"
                >
                  {/* Header */}
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground text-lg tracking-tight">
                          {cat.name}
                        </h3>
                      </div>
                      <CardDescription>{cat.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      title="ลบหมวดหมู่"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>

                  {/* Options Content */}
                  <CardContent className=" bg-card">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-3 block">
                      ตัวเลือก (Options)
                    </Label>

                    <div className="space-y-4">
                      {/* Options List */}
                      <div className="flex flex-wrap gap-2">
                        {cat.options.map((opt) => (
                          <div
                            key={opt.id}
                            className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-md text-sm font-medium border bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors group/opt"
                          >
                            {opt.label}
                            <button
                              onClick={() => handleDeleteOption(cat.id, opt.id)}
                              className="ml-1 p-0.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-50 group-hover/opt:opacity-100 transition-all"
                              title="ลบตัวเลือก"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        {cat.options.length === 0 && (
                          <span className="text-sm text-muted-foreground italic py-1">
                            ยังไม่มีตัวเลือก เพิ่มตัวเลือกใหม่ด้านล่าง
                          </span>
                        )}
                      </div>

                      {/* Add Option Input */}
                      <div className="flex gap-2 max-w-md pt-2">
                        <Input
                          placeholder="เพิ่มตัวเลือกใหม่..."
                          value={newOptionInputs[cat.id] || ""}
                          onChange={(e) =>
                            setNewOptionInputs({
                              ...newOptionInputs,
                              [cat.id]: e.target.value,
                            })
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddOption(cat.id)
                          }
                          className="h-9 text-sm bg-background"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleAddOption(cat.id)}
                          variant="secondary"
                          className="h-9 px-4 hover:bg-accent hover:text-accent-foreground"
                        >
                          เพิ่ม
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar for Categories Tab */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                    คำแนะนำการใช้งาน
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">
                      <strong>หมวดหมู่ (Categories)</strong>{" "}
                      ช่วยให้คุณจัดระเบียบข้อมูลภายในระบบได้ดียิ่งขึ้น
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-1">
                      <li>
                        ใช้ใน <strong>Landing Pages</strong>{" "}
                        เพื่อจัดหมวดหมู่เนื้อหา
                      </li>
                      <li>
                        ใช้ใน <strong>แบบฟอร์ม (Forms)</strong> สำหรับตัวเลือก
                        Dropdown
                      </li>
                      <li>
                        ใช้ใน <strong>CRM</strong> เพื่อติด Tag ลูกค้า
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 rounded-lg border border-blue-100 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/10 mb-6">
                <div className="flex gap-3">
                  <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                      เกร็ดความรู้
                    </h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
                      คุณสามารถจัดการตัวเลือกต่างๆ ได้ที่นี่
                      และข้อมูลจะถูกอัปเดตไปยังตัวเลือกในหน้าแก้ไขโดยทันที
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
