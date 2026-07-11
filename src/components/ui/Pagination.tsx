"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  // Build page numbers array with dots if necessary
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      {/* Prev button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center w-9 h-9 rounded-button border border-neutral-mid/10 text-neutral-dark hover:bg-neutral-light disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Pages */}
      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span
              key={`dots_${idx}`}
              className="w-9 h-9 flex items-center justify-center text-neutral-mid text-sm select-none"
            >
              ...
            </span>
          );
        }

        const isCurrent = p === currentPage;

        return (
          <button
            key={`page_${p}`}
            onClick={() => onPageChange(p as number)}
            className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-button border transition-all ${
              isCurrent
                ? "bg-primary border-primary text-white shadow-sm"
                : "border-neutral-mid/10 text-neutral-dark hover:bg-neutral-light"
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center w-9 h-9 rounded-button border border-neutral-mid/10 text-neutral-dark hover:bg-neutral-light disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
