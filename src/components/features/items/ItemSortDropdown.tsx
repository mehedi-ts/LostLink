"use client";

import React from "react";
import Select from "@/components/ui/Select";

interface ItemSortDropdownProps {
  sortBy: "newest" | "oldest" | "updated";
  onSortChange: (sort: "newest" | "oldest" | "updated") => void;
}

export const ItemSortDropdown: React.FC<ItemSortDropdownProps> = ({
  sortBy,
  onSortChange,
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as "newest" | "oldest" | "updated");
  };

  return (
    <div className="w-full sm:w-48 flex-shrink-0">
      <Select
        value={sortBy}
        onChange={handleSortChange}
        options={[
          { value: "newest", label: "Newest Listings" },
          { value: "oldest", label: "Oldest Listings" },
          { value: "updated", label: "Recently Updated" },
        ]}
      />
    </div>
  );
};

export default ItemSortDropdown;
