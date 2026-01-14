import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Banner, LineAccount } from "../../types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { DataTablePagination } from "../ui/data-table-pagination";
import { DataTableToolbar } from "../ui/data-table-toolbar";
import { MOCK_BANNERS } from "../../constants";
import { Badge } from "../ui/badge";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const BannerList: React.FC = () => {
  const navigate = useNavigate();
  const [banners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem("banners");
    const initial = saved ? JSON.parse(saved) : [];
    const mockIds = new Set(MOCK_BANNERS.map((b) => b.id));
    const newItems = initial.filter((b: Banner) => !mockIds.has(b.id));
    return [...MOCK_BANNERS, ...newItems];
  });
  const [accounts, setAccounts] = useState<LineAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  useEffect(() => {
    const savedAccounts = localStorage.getItem("line_accounts");
    const savedSelection = localStorage.getItem("selected_account_id");

    if (savedAccounts) {
      try {
        const parsed = JSON.parse(savedAccounts);
        setAccounts(parsed);
        if (parsed.length > 0) {
          setAccounts(parsed);
          const initialId =
            savedSelection &&
            parsed.find((a: LineAccount) => a.id === savedSelection)
              ? savedSelection
              : parsed[0].id;
          setSelectedAccountId(initialId);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Default Mock Account for Demo
    const mockAccount: LineAccount = {
      id: "acc_demo",
      name: "Demo Account",
      credentials: {
        channelId: "",
        channelSecret: "",
        channelAccessToken: "",
        liffId: "",
        isValid: true,
      },
    };
    setAccounts([mockAccount]);
    setSelectedAccountId("acc_demo");
  }, []);

  const handleAccountChange = (id: string) => {
    setSelectedAccountId(id);
    localStorage.setItem("selected_account_id", id);
  };

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBanners = banners.filter(
    (b) =>
      b.accountId === selectedAccountId &&
      b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBanners = filteredBanners.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-4 mt-4">
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/campaigns")}
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button> */}
          <div>
            <h2 className="tracking-tight">Banners</h2>
            <p className="text-muted-foreground">
              Manage LIFF banners linked to your campaigns.
            </p>
          </div>
        </div>
      </div>

      <DataTableToolbar
        filterValue={searchTerm}
        onFilterChange={setSearchTerm}
        placeholder="Filter banners..."
        actions={
          <div className="flex items-center gap-2">
            {accounts.length > 0 && (
              <div className="flex items-center gap-2">
                <div className=" w-[200px]">
                  <Select
                    value={selectedAccountId}
                    onValueChange={handleAccountChange}
                  >
                    <SelectTrigger className="h-8!">
                      <SelectValue placeholder="Select Account">
                        {selectedAccount?.name}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* {selectedAccount?.oaUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(selectedAccount.oaUrl, "_blank")}
                    title="Open Mockup OA"
                    className="shrink-0 text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )} */}
              </div>
            )}
            <Link to="/campaigns/banners/new">
              <Button>
                <span className="mr-2">+</span> Create Banner
              </Button>
            </Link>
          </div>
        }
      />

      <Card className="overflow-hidden border-border pt-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] pl-6">Banner Title</TableHead>
              <TableHead className="pl-6">Campaign</TableHead>
              <TableHead className="pl-6">Status</TableHead>
              <TableHead className="pl-6">Last Updated</TableHead>
              <TableHead className="text-right pl-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBanners.length > 0 ? (
              currentBanners.map((banner) => (
                <TableRow key={banner.id} className="group">
                  <TableCell className="px-6 py-4">
                    <div className="font-semibold text-foreground">
                      {banner.name}
                    </div>
                    <div className="text-muted-foreground font-sans text-xs mt-1">
                      {/* No description in Banner type */}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">
                    {banner.linkedCampaignId || "—"}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {banner.status === "Active" ? (
                      <Badge variant="success" className="gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">
                    {new Date(banner.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/campaigns/banners/${banner.id}`)
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => console.log("Delete", banner.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="text-muted-foreground text-sm">
                      No banners found
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 text-primary"
                      onClick={() => navigate("/campaigns/banners/new")}
                    >
                      Create your first banner
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={itemsPerPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={() => {}}
        totalItems={filteredBanners.length}
      />
    </div>
  );
};
