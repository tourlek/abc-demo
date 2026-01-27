import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FAQ } from "../../types";
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
import { MOCK_FAQS } from "../../constants";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const FAQList: React.FC = () => {
  const navigate = useNavigate();
  const [faqs] = useState<FAQ[]>(MOCK_FAQS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("order");

  // Get unique categories
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  // Filter & Sort
  const filteredFAQs = faqs
    .filter((f) => {
      const matchesSearch =
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || f.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "order") return a.order - b.order;
      if (sortOrder === "newest")
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      if (sortOrder === "oldest")
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      return 0;
    });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredFAQs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFAQs = filteredFAQs.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between space-y-2">
        <div className="mt-4">
          <h2 className="tracking-tight">FAQ Manager</h2>
          <p className="text-muted-foreground">
            Manage frequently asked questions.
          </p>
        </div>
      </div>

      <DataTableToolbar
        filterValue={searchTerm}
        onFilterChange={setSearchTerm}
        placeholder="Search FAQs..."
        filters={
          <>
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
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="h-8! w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order">By Order</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </>
        }
        actions={
          <Link to="/faq/new">
            <Button className="gap-2">

              Create New
            </Button>
          </Link>
        }
      />

      <Card className="overflow-hidden border-border pt-0 pb-0 shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] pl-6">Order</TableHead>
              <TableHead className="pl-6">Question</TableHead>
              <TableHead className="pl-6">Category</TableHead>
              <TableHead className="pl-6">Status</TableHead>
              <TableHead className="pl-6">Updated</TableHead>
              <TableHead className="text-right pl-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFAQs.length > 0 ? (
              currentFAQs.map((faq) => (
                <TableRow
                  key={faq.id}
                  className="group cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/faq/${faq.id}`)}
                >
                  <TableCell className="px-6 py-4 font-sans text-sm">
                    {faq.order}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="font-semibold text-foreground max-w-md truncate">
                      {faq.question}
                    </div>
                    <div className="text-muted-foreground text-sm mt-1 max-w-md truncate">
                      {faq.answer}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="outline">{faq.category}</Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {faq.status === "Published" ? (
                      <Badge variant="success" className="gap-2">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground text-sm">
                    {new Date(faq.updatedAt).toLocaleDateString()}
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
                            navigate(`/faq/${faq.id}`);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Delete", faq.id);
                          }}
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
                      No FAQs found
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 text-primary"
                      onClick={() => navigate("/faq/new")}
                    >
                      Create your first FAQ
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
        totalItems={filteredFAQs.length}
      />
    </div>
  );
};
