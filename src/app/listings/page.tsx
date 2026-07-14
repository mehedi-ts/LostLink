"use client";

import React, { use, useState, useEffect } from "react";
import { useItems } from "@/hooks/useItems";
import { useDebounce } from "@/hooks/useDebounce";
import ItemCard from "@/components/features/items/ItemCard";
import ItemFilterPanel from "@/components/features/items/ItemFilterPanel";
import ItemSortDropdown from "@/components/features/items/ItemSortDropdown";
import ItemSearchBar from "@/components/features/items/ItemSearchBar";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { Inbox } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ListingsPage({ searchParams }: PageProps) {
  // Unwrap Next 15+ searchParams Promise using React.use()
  const resolvedSearchParams = use(searchParams);

  // Read initial query params
  const categoryParam = typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;
  const typeParam =
    resolvedSearchParams.type === "lost" || resolvedSearchParams.type === "found"
      ? resolvedSearchParams.type
      : undefined;

  const {
    items,
    loading,
    total,
    filters,
    sortBy,
    setFilters,
    setSortBy,
  } = useItems({
    category: categoryParam,
    itemType: typeParam,
    limit: 9, // 9 items per page fits grid nicely
  });

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  // Sync debounced search with query filters
  useEffect(() => {
    setFilters({ query: debouncedSearch });
  }, [debouncedSearch, setFilters]);

  // If initial search param changes (navigated from home category)
  // useEffect(() => {
  //   if (categoryParam !== filters.category || typeParam !== filters.itemType) {
  //     setFilters({
  //       category: categoryParam,
  //       itemType: typeParam || "all",
  //     });
  //   }
  // }, [categoryParam, typeParam, filters.category, filters.itemType, setFilters]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      query: "",
      category: "",
      itemType: "all",
      status: "all",
      location: "",
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    setFilters({ page });
    // Scroll smoothly to top of results grid on page changes
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grow">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-dark tracking-tight">
          Browse Listings
        </h1>
        <p className="text-sm text-neutral-mid mt-1 font-medium">
          Search, filter, and review reported lost and found items.
        </p>
      </div>

      {/* Grid Layout: Sidebar Filters + Main Area */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Filter Panel */}
        <ItemFilterPanel
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Right Side: Search, Sort, and Cards Grid */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {/* Search bar & Sort dropdown */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full bg-white p-4 rounded-card border border-neutral-light shadow-sm">
            <ItemSearchBar value={searchTerm} onChange={setSearchTerm} />
            <ItemSortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center text-xs font-bold text-neutral-mid uppercase tracking-wider px-1">
            <span>
              {loading ? "Searching..." : `${total} listings found`}
            </span>
            {filters.category && (
              <span className="text-primary bg-primary-light px-2.5 py-0.5 rounded-badge border border-primary/10">
                Category: {filters.category}
              </span>
            )}
          </div>

          {/* Listings Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} variant="card" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              title="No Listings Found"
              description="We couldn't find any items matching your active search queries or filters. Try adjusting your search keywords."
              actionLabel="Reset Search Filters"
              onAction={handleClearFilters}
              icon={<Inbox className="w-8 h-8 text-neutral-mid" />}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>

              {/* Pagination controls */}
              <Pagination
                currentPage={filters.page || 1}
                totalItems={total}
                itemsPerPage={filters.limit || 9}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
