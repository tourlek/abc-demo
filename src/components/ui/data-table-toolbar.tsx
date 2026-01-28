import { Input } from "./input";
import { Button } from "./button";
import { X } from "lucide-react";

interface DataTableToolbarProps {
  filterValue: string;
  onFilterChange: (value: string) => void;
  placeholder?: string;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
}

export function DataTableToolbar({
  filterValue,
  onFilterChange,
  placeholder = "Filter tasks...",
  filters,
  actions,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-1 sm:items-center sm:flex-wrap">
        <Input
          placeholder={placeholder}
          value={filterValue}
          onChange={(event) => onFilterChange(event.target.value)}
          className="h-8 w-full sm:flex-1 sm:max-w-[300px]"
        />
        <div className="flex flex-wrap gap-2">
          {filters}
          {filterValue && (
            <Button
              variant="ghost"
              onClick={() => onFilterChange("")}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center">{actions}</div>
    </div>
  );
}
