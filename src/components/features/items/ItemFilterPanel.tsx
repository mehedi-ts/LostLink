"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import { Filter, X, RefreshCw } from "lucide-react";

interface ItemFilterPanelProps {
  filters: {
    itemType?: "lost" | "found" | "all";
    category?: string;
    status?: "active" | "recovered" | "all";
    location?: string;
  };
  onFilterChange: (filters: ItemFilterPanelProps["filters"]) => void;
  onClearFilters: () => void;
}

const CATEGORIES = [
  "Electronics",
  "ID Card",
  "Bag",
  "Keys",
  "Documents",
  "Accessories",
  "Clothing",
  "Pet",
  "Other",
];

export const ItemFilterPanel: React.FC<ItemFilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleTypeChange = (type: "lost" | "found" | "all") => {
    onFilterChange({ itemType: type });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ category: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ status: e.target.value as "active" | "recovered" | "all" });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ location: e.target.value });
  };

  const filterContent = (
    <div className="flex flex-col gap-6">
      {/* Item Type (Toggle buttons) */}
      <div>
        <label className="text-sm font-bold text-neutral-dark block mb-2.5">
          Report Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["all", "lost", "found"] as const).map((type) => {
            const isActive = filters.itemType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleTypeChange(type)}
                className={`py-2 text-xs font-bold capitalize rounded-badge border transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary border-primary text-white shadow-sm"
                    : "border-neutral-mid/20 hover:bg-neutral-light text-neutral-dark"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category (Dropdown) */}
      <div>
        <Select
          label="Category"
          value={filters.category || ""}
          onChange={handleCategoryChange}
          placeholder="All Categories"
          options={CATEGORIES.map((c) => ({ value: c, label: c }))}
        />
      </div>

      {/* Status (Dropdown) */}
      <div>
        <Select
          label="Item Status"
          value={filters.status || "all"}
          onChange={handleStatusChange}
          options={[
            { value: "all", label: "All Statuses" },
            { value: "active", label: "Active / Open" },
            { value: "recovered", label: "Recovered / Resolved" },
          ]}
        />
      </div>

      {/* Location (Text input) */}
      <div>
        <Input
          label="Location"
          placeholder="City, area, or street..."
          value={filters.location || ""}
          onChange={handleLocationChange}
        />
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        size="sm"
        onClick={onClearFilters}
        leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
        className="w-full text-xs"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileOpen(true)}
          leftIcon={<Filter className="w-4 h-4" />}
          className="w-full"
        >
          Filters
        </Button>
      </div>

      {/* Desktop Filter Panel */}
      <div className="hidden lg:block w-64 bg-white border border-neutral-light rounded-card p-6 h-fit sticky top-24 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-light mb-5">
          <h3 className="font-extrabold text-neutral-dark text-md flex items-center gap-2">
            <Filter className="w-4.5 h-4.5 text-primary" />
            Filters
          </h3>
        </div>
        {filterContent}
      </div>

      {/* Mobile Drawer (Sidebar) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-neutral-dark/45 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          ></div>

          {/* Drawer Body */}
          <div className="relative w-80 max-w-full bg-white h-full shadow-xl flex flex-col p-6 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-light mb-6">
              <h3 className="font-extrabold text-neutral-dark text-md flex items-center gap-2">
                <Filter className="w-4.5 h-4.5 text-primary" />
                Filters
              </h3>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 rounded-full hover:bg-neutral-light"
                aria-label="Close filters"
              >
                <X className="w-5 h-5 text-neutral-mid" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-1">{filterContent}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemFilterPanel;
export { CATEGORIES };
