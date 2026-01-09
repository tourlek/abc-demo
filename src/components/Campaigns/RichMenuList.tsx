import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RichMenu, LineAccount } from "../types";
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
  const [menus, setMenus] = useState<RichMenu[]>(MOCK_RICH_MENUS);
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
          const initialId =
            savedSelection &&
            parsed.find((a: LineAccount) => a.id === savedSelection)
              ? savedSelection
              : parsed[0].id;
          setSelectedAccountId(initialId);
        }
      } catch (e) {
        console.error(e);
      }
    }
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
        m.chatBarText.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredMenus.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMenus = filteredMenus.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between space-y-2">
        <div className="mt-4">
          <h2 className="text-2xl font-bold tracking-tight">Rich Menus</h2>
          <p className="text-muted-foreground">
            Manage interactive menus displayed in the LINE chat.
          </p>
        </div>
      </div>

      <DataTableToolbar
        filterValue={searchTerm}
        onFilterChange={setSearchTerm}
        placeholder="Filter menus..."
        actions={
          <div className="flex items-center gap-2">
            {accounts.length > 0 && (
              <div className="w-[200px]">
                <Select
                  value={selectedAccountId}
                  onValueChange={handleAccountChange}
                >
                  <SelectTrigger>
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
            )}
            <Link to="/campaigns/rich-menus/new">
              <Button>
                <span className="mr-2">+</span> Create New Menu
              </Button>
            </Link>
          </div>
        }
      />

      <Card className="overflow-hidden border-border pt-0 pb-0 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] pl-6">Menu Name</TableHead>
              <TableHead className="pl-6">Size</TableHead>
              <TableHead className="pl-6">Status</TableHead>
              <TableHead className="pl-6">Last Updated</TableHead>
              <TableHead className="text-right pl-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMenus.map((menu) => (
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
                  {menu.size.width} × {menu.size.height}
                </TableCell>
                <TableCell className="px-6 py-4">
                  {menu.selected ? (
                    <Badge variant="success" className="gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Active
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
            ))}
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
