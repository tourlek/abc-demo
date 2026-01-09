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
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={filterValue}
          onChange={(event) => onFilterChange(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
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
      <div className="flex items-center space-x-2">{actions}</div>
    </div>
  );
}
