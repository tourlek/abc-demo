import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RichMenu, LineAccount } from "../../types";
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
import { MOCK_RICH_MENUS } from "../../constants";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const RichMenuList: React.FC = () => {
  const navigate = useNavigate();
  const [menus] = useState<RichMenu[]>(() => {
    const saved = localStorage.getItem("rich_menus");
    const initial = saved ? JSON.parse(saved) : [];
    const mockIds = new Set(MOCK_RICH_MENUS.map((m) => m.id));
    const newItems = initial.filter((m: RichMenu) => !mockIds.has(m.id));
    return [...MOCK_RICH_MENUS, ...newItems];
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

  const filteredMenus = menus.filter(
    (m) =>
      m.accountId === selectedAccountId &&
      (m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.chatBarText.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const totalPages = Math.ceil(filteredMenus.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMenus = filteredMenus.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between space-y-2">
        <div className="mt-4">
          <h2 className="tracking-tight">Rich Menus</h2>
          <p className="text-muted-foreground">
            Manage interactive menus displayed in the LINE chat.
          </p>
        </div>
      </div>

      <DataTableToolbar
        filterValue={searchTerm}
        onFilterChange={setSearchTerm}
        placeholder="Filter menus..."
        filters={
          accounts.length > 0 && (
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
          )
        }
        actions={
          <div className="flex items-center gap-2">
            <Link to="/campaigns/rich-menus/new">
              <Button className="gap-2">

                Create New Menu
              </Button>
            </Link>
          </div>
        }
      />

      <Card className="overflow-hidden border-border pt-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] pl-6">Menu Name</TableHead>
              <TableHead className="pl-6">Size</TableHead>
              <TableHead className="pl-6">Status</TableHead>
              <TableHead className="pl-6">Last Updated</TableHead>
              <TableHead className="text-right pl-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMenus.length > 0 ? (
              currentMenus.map((menu) => (
                <TableRow key={menu.id} className="group">
                  <TableCell className="px-6 py-4">
                    <div className="font-semibold text-foreground">
                      {menu.name}
                    </div>
                    <div className="text-muted-foreground text-xs mt-0.5">
                      {menu.chatBarText}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">
                    {menu.size}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {menu.status === "Published" ? (
                      <Badge variant="success" className="gap-2">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">
                    {new Date().toLocaleDateString()}
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
                            navigate(`/campaigns/rich-menus/${menu.id}`)
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => console.log("Delete", menu.id)}
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
                      No rich menus found
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 text-primary"
                      onClick={() => navigate("/campaigns/rich-menus/new")}
                    >
                      Create your first menu
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
        totalItems={filteredMenus.length}
      />
    </div>
  );
};
