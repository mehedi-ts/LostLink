"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "lost" | "found" | "active" | "recovered" | "neutral";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-badge text-xs font-bold border transition-colors duration-150 tracking-wide uppercase";

  const variants = {
    lost: "bg-secondary-light text-secondary border-secondary/20",
    found: "bg-primary-light text-primary border-primary/20",
    active: "bg-blue-50 text-blue-700 border-blue-200",
    recovered: "bg-accent-light text-accent border-accent/20",
    neutral: "bg-neutral-light text-neutral-dark border-neutral-mid/10",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
