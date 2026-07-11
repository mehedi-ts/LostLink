"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular" | "card";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "rectangular",
}) => {
  const baseStyle = "animate-pulse bg-neutral-light/70";

  const variants = {
    text: "h-4 w-full rounded-badge",
    circular: "rounded-full",
    rectangular: "rounded-input",
    card: "rounded-card h-64 w-full flex flex-col",
  };

  if (variant === "card") {
    return (
      <div className="bg-white rounded-card border border-neutral-light p-4 flex flex-col gap-3 animate-pulse">
        {/* Image box */}
        <div className="w-full h-40 bg-neutral-light/50 rounded-card"></div>
        {/* Category badge */}
        <div className="w-16 h-4 bg-neutral-light/50 rounded-badge"></div>
        {/* Title */}
        <div className="w-3/4 h-5 bg-neutral-light/50 rounded-badge"></div>
        {/* Description line */}
        <div className="w-full h-3 bg-neutral-light/50 rounded-badge"></div>
        {/* Location / Date footer */}
        <div className="flex justify-between items-center mt-2 border-t border-neutral-light/30 pt-3">
          <div className="w-24 h-3 bg-neutral-light/50 rounded-badge"></div>
          <div className="w-16 h-3 bg-neutral-light/50 rounded-badge"></div>
        </div>
      </div>
    );
  }

  return <div className={`${baseStyle} ${variants[variant]} ${className}`} />;
};

export default Skeleton;
