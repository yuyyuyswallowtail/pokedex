"use client";

import { Search, X, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypeBadge } from "@/components/pokemon";
import { cn } from "@/lib/utils";
import type { SortOptions } from "@/types";

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const SORT_OPTIONS: { value: SortOptions["sortBy"]; label: string }[] = [
  { value: "id", label: "ID" },
  { value: "name", label: "Name" },
  { value: "hp", label: "HP" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "speed", label: "Speed" },
];

interface SearchFiltersProps {
  search: string;
  selectedTypes: string[];
  sortBy: SortOptions["sortBy"];
  sortOrder: SortOptions["sortOrder"];
  onSearchChange: (search: string) => void;
  onTypesChange: (types: string[]) => void;
  onSortByChange: (sortBy: SortOptions["sortBy"]) => void;
  onSortOrderToggle: () => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export function SearchFilters({
  search,
  selectedTypes,
  sortBy,
  sortOrder,
  onSearchChange,
  onTypesChange,
  onSortByChange,
  onSortOrderToggle,
  onReset,
  totalCount,
  filteredCount,
}: SearchFiltersProps) {
  const hasFilters = search !== "" || selectedTypes.length > 0;

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypesChange([...selectedTypes, type]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search Pokémon by name or ID..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={onSortOrderToggle}
            aria-label={`Sort ${sortOrder === "asc" ? "ascending" : "descending"}`}
          >
            {sortOrder === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Type Filters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Filter by Type</span>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              Clear all
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {POKEMON_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={cn(
                "transition-opacity",
                selectedTypes.includes(type)
                  ? "opacity-100"
                  : "opacity-40 hover:opacity-70",
              )}
            >
              <TypeBadge type={type} size="sm" />
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCount} of {totalCount} Pokémon
      </div>
    </div>
  );
}

