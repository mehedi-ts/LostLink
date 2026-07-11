"use client";

import { useState, useEffect, useCallback } from "react";
import { Item } from "@/types/item";
import { itemService } from "@/services/itemService";

export interface ItemFilters {
  query?: string;
  itemType?: "lost" | "found" | "all";
  category?: string;
  status?: "active" | "recovered" | "all";
  location?: string;
  page?: number;
  limit?: number;
}

export function useItems(initialFilters: ItemFilters = {}, autoFetch = true) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFiltersState] = useState<ItemFilters>({
    page: 1,
    limit: 12,
    itemType: "all",
    status: "all",
    ...initialFilters,
  });
  const [sortBy, setSortByState] = useState<"newest" | "oldest" | "updated">("newest");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await itemService.getItems({
        ...filters,
        sortBy,
      });
      setItems(response.items);
      setTotal(response.total);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy]);

  useEffect(() => {
    if (autoFetch) {
      const timer = setTimeout(() => {
        fetchItems();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [fetchItems, autoFetch]);

  const setFilters = useCallback((newFilters: Partial<ItemFilters>) => {
    setFiltersState((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page !== undefined ? newFilters.page : 1, // reset page to 1 on filter change unless explicitly set
    }));
  }, []);

  const setSortBy = useCallback((sort: "newest" | "oldest" | "updated") => {
    setSortByState(sort);
    setFiltersState((prev) => ({ ...prev, page: 1 }));
  }, []);

  const refresh = useCallback(() => {
    return fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    total,
    filters,
    sortBy,
    setFilters,
    setSortBy,
    refresh,
  };
}

export default useItems;
