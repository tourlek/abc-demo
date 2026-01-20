import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Partner } from "../../types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
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
import { MOCK_PARTNERS } from "../../constants";
import { MoreHorizontal, Pencil, Trash, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const PartnerList: React.FC = () => {
  const navigate = useNavigate();
  const [partners] = useState<Partner[]>(MOCK_PARTNERS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPartners = partners.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPartners = filteredPartners.slice(startIndex, endIndex);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between space-y-2">
        <div className="mt-4">
          <h2 className="tracking-tight">Partners</h2>
          <p className="text-muted-foreground">
            Manage your partner organizations.
          </p>
        </div>
      </div>

      <DataTableToolbar
        filterValue={searchTerm}
        onFilterChange={setSearchTerm}
        placeholder="Search partners..."
        actions={
          <Link to="/partners/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>
          </Link>
        }
      />

      <Card className="overflow-hidden border-border pt-0 pb-0 shadow-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] pl-6">Partner</TableHead>
              <TableHead className="pl-6">Contact</TableHead>
              <TableHead className="pl-6">Status</TableHead>
              <TableHead className="pl-6">Updated</TableHead>
              <TableHead className="text-right pl-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPartners.map((partner) => (
              <TableRow
                key={partner.id}
                className="group cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                        <span className="text-lg font-heading font-bold text-muted-foreground">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-foreground">
                        {partner.name}
                      </div>
                      {partner.featured && (
                        <Badge variant="default" className="mt-1">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="text-sm text-muted-foreground">
                    {partner.contactEmail}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {partner.website}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  {partner.status === "Active" ? (
                    <Badge variant="success" className="gap-1.5">

                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 text-muted-foreground text-sm">
                  {new Date(partner.updatedAt).toLocaleDateString()}
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
                        onClick={() => navigate(`/partners/${partner.id}`)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => console.log("Delete", partner.id)}
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
        onPageSizeChange={() => { }}
        totalItems={filteredPartners.length}
      />
    </div>
  );
};
