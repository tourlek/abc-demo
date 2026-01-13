import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Campaign, LineAccount } from "../../types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
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
import { MOCK_CAMPAIGNS } from "../../constants";
import { MoreHorizontal, Pencil, Trash, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const CampaignList: React.FC = () => {
  const navigate = useNavigate();
  const [campaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem("campaigns");
    const initial = saved ? JSON.parse(saved) : [];
    // Merge mocks if not present (simple de-dupe or just concat if mocks are static base)
    // Actually, let's just use saved if exists, else mocks, OR better:
    // If we want mocks to always be there + new ones:
    const mockIds = new Set(MOCK_CAMPAIGNS.map((c) => c.id));
    const newItems = initial.filter((c: Campaign) => !mockIds.has(c.id));
    return [...MOCK_CAMPAIGNS, ...newItems];
  });
  const [accounts, setAccounts] = useState<LineAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  useEffect(() => {
    const savedAccounts = localStorage.getItem("line_accounts");
    const savedSelection = localStorage.getItem("selected_account_id");

    if (savedAccounts) {
      try {
        const parsed = JSON.parse(savedAccounts);
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

  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.accountId === selectedAccountId &&
      (c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false)
  );

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between space-y-2">
        <div className="mt-4">
          <h2 className="text-2xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground">
            Manage broadcast campaigns and reward activities.
          </p>
        </div>
      </div>

      <DataTableToolbar
        filterValue={searchTerm}
        onFilterChange={setSearchTerm}
        placeholder="Filter campaigns..."
        actions={
          <div className="flex items-center gap-2">
            {accounts.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-[200px]">
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
                {selectedAccount?.oaUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(selectedAccount.oaUrl, "_blank")}
                    title="Open Mockup OA"
                    className="shrink-0 text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
            <Link to="/campaigns/new">
              <Button>
                <span className="mr-2">+</span> Create Campaign
              </Button>
            </Link>
          </div>
        }
      />

      <Card className="overflow-hidden border-border pt-0 pb-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] pl-6">Campaign Name</TableHead>
              <TableHead className="pl-6">Type</TableHead>
              <TableHead className="pl-6">Quota</TableHead>
              <TableHead className="pl-6">Status</TableHead>
              <TableHead className="pl-6">Last Updated</TableHead>
              <TableHead className="text-right pl-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCampaigns.length > 0 ? (
              currentCampaigns.map((camp) => (
                <TableRow key={camp.id} className="group">
                  <TableCell className="px-6 py-4">
                    <div className="font-semibold text-foreground">
                      {camp.title}
                    </div>
                    <div className="text-muted-foreground text-xs mt-0.5">
                      {camp.subtitle}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">
                    {camp.rewardType}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">
                    {camp.totalQuota}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {camp.status === "Published" ? (
                      <Badge variant="success" className="gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">
                    {new Date(camp.updatedAt).toLocaleDateString()}
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
                          onClick={() => navigate(`/campaigns/${camp.id}`)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => console.log("Delete", camp.id)}
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
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="text-muted-foreground text-sm">
                      No campaigns found
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 text-primary"
                      onClick={() => navigate("/campaigns/new")}
                    >
                      Create your first campaign
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
        onPageSizeChange={() => { }}
        totalItems={filteredCampaigns.length}
      />
    </div>
  );
};
