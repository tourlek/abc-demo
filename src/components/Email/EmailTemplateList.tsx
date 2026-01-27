import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { EmailTemplate } from "../../types";
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
import { MOCK_EMAIL_TEMPLATES } from "../../constants";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const EmailTemplateList: React.FC = () => {
  const navigate = useNavigate();
  const [templates] = useState<EmailTemplate[]>(MOCK_EMAIL_TEMPLATES);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = Array.from(new Set(templates.map((t) => t.category)));

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between space-y-2">
        <div className="mt-4">
          <h2 className="tracking-tight">Email Templates</h2>
          <p className="text-muted-foreground">Manage your email templates.</p>
        </div>
      </div>

      <DataTableToolbar
        filterValue={searchTerm}
        onFilterChange={setSearchTerm}
        placeholder="Search templates..."
        filters={
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-8! w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
        actions={
          <Link to="/email-templates/new">
            <Button className="gap-2">

              Create Template
            </Button>
          </Link>
        }
      />

      <Card className="overflow-hidden border-border pt-0 pb-0 shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] pl-6">Template Name</TableHead>
              <TableHead className="pl-6">Subject</TableHead>
              <TableHead className="pl-6">Category</TableHead>
              <TableHead className="pl-6">Status</TableHead>
              <TableHead className="pl-6">Updated</TableHead>
              <TableHead className="text-right pl-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTemplates.map((template) => (
              <TableRow
                key={template.id}
                className="group cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/email-templates/${template.id}`)}
              >
                <TableCell className="px-6 py-4">
                  <div className="font-semibold text-foreground">
                    {template.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {template.variables.length} variable(s)
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 max-w-md">
                  <div className="truncate text-sm">{template.subject}</div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="outline">{template.category}</Badge>
                </TableCell>
                <TableCell className="px-6 py-4">
                  {template.status === "Active" ? (
                    <Badge variant="success" className="gap-2">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 text-muted-foreground text-sm">
                  {new Date(template.updatedAt).toLocaleDateString()}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/email-templates/${template.id}`);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Delete", template.id);
                        }}
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
        totalItems={filteredTemplates.length}
      />
    </div>
  );
};
