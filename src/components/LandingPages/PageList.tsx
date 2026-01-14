import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageStatus, type LandingPage, type Language } from "../../types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MoreHorizontal, Pencil, Copy, History, Trash } from "lucide-react";

interface PageListProps {
  pages: LandingPage[];
}

export const PageList: React.FC<PageListProps> = ({ pages = [] }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewLanguage, setViewLanguage] = useState<Language>("th");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPages = pages.filter(
    (page) =>
      (viewLanguage === "th" || !!page.content[viewLanguage]) &&
      (statusFilter === "all" || page.status === statusFilter) &&
      ((page.content[viewLanguage] || page.content.th).title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPages = filteredPages.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between space-y-2">
        <div className="mt-4">
          <h1 className="text-4xl font-bold tracking-tight">Landing Pages</h1>
          <p className="text-muted-foreground">
            Manage and track your published content.
          </p>
        </div>
      </div>
      <DataTableToolbar
        filterValue={searchTerm}
        onFilterChange={setSearchTerm}
        placeholder="Filter pages..."
        filters={
          <>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="h-8! w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value={PageStatus.PUBLISHED}>Published</SelectItem>
                <SelectItem value={PageStatus.DRAFT}>Draft</SelectItem>
                <SelectItem value={PageStatus.SCHEDULED}>Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={viewLanguage}
              onValueChange={(value) => setViewLanguage(value as Language)}
            >
              <SelectTrigger className="h-8! w-[150px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="th">🇹🇭 Thai</SelectItem>
                <SelectItem value="en">🇺🇸 English</SelectItem>
              </SelectContent>
            </Select>
          </>
        }
        actions={
          <Button onClick={() => navigate("/pages/new")}>
            <span className="mr-2">+</span> Create New
          </Button>
        }
      />

      <Card className="overflow-hidden border-border pt-0 pb-0 shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] pl-6">
                Page Title / Slug
              </TableHead>
              <TableHead className="pl-6">Status</TableHead>
              <TableHead className="pl-6">Last Updated</TableHead>
              <TableHead className="text-right pl-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPages.length > 0 ? (
              currentPages.map((page) => (
                <TableRow key={page.id} className="group">
                  <TableCell className="px-6 py-4">
                    <div className="font-semibold text-foreground">
                      {(page.content[viewLanguage] || page.content.th).title ||
                        (viewLanguage === "en"
                          ? "(No English Title)"
                          : "(Untitled)")}
                    </div>
                    <div className="text-muted-foreground font-sans text-xs mt-1">
                      /{page.slug}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {page.status === PageStatus.PUBLISHED && (
                      <Badge variant="success" className="gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {page.status}
                      </Badge>
                    )}
                    {page.status === PageStatus.SCHEDULED && (
                      <Badge variant="warning">{page.status}</Badge>
                    )}
                    {page.status !== PageStatus.PUBLISHED &&
                      page.status !== PageStatus.SCHEDULED && (
                        <Badge variant="secondary">{page.status}</Badge>
                      )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">
                    {new Date(page.updatedAt).toLocaleDateString()}
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
                          onClick={() => navigate(`/pages/${page.id}`)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => console.log("Duplicate", page.id)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => console.log("Revision", page.id)}
                        >
                          <History className="mr-2 h-4 w-4" />
                          Revision
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => console.log("Delete", page.id)}
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
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="text-muted-foreground text-sm">
                      No landing pages found
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 text-primary"
                      onClick={() => navigate("/pages/new")}
                    >
                      Create your first page
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
        onPageSizeChange={() => {}} // Placeholder for now, as itemsPerPage is constant in this component
        totalItems={filteredPages.length}
      />
    </div>
  );
};
