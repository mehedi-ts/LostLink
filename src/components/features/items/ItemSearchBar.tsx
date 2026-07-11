"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import { Search, X } from "lucide-react";

interface ItemSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ItemSearchBar: React.FC<ItemSearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search by item name or description...",
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalValue(value);
    }, 0);
    return () => clearTimeout(timer);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    onChange(val);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder={placeholder}
        value={localValue}
        onChange={handleInputChange}
        leftIcon={<Search className="w-4 h-4 text-neutral-mid" />}
        className="pr-10"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-mid hover:text-neutral-dark focus:outline-none"
          type="button"
          aria-label="Clear search"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      )}
    </div>
  );
};

export default ItemSearchBar;
