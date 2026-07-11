"use client";

import React from "react";
import Card from "@/components/ui/Card";

interface DashboardStatCardProps {
  title: string;
  value: number;
  subtext?: string;
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "neutral";
}

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  title,
  value,
  subtext,
  icon,
  variant = "neutral",
}) => {
  const iconBgColors = {
    primary: "bg-primary-light text-primary border border-primary/10",
    secondary: "bg-secondary-light text-secondary border border-secondary/10",
    accent: "bg-accent-light text-accent border border-accent/10",
    neutral: "bg-neutral-light text-neutral-dark border border-neutral-mid/10",
  }[variant];

  return (
    <Card hoverEffect={true} className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-neutral-mid uppercase tracking-wider">
            {title}
          </span>
          <span className="text-3xl font-extrabold text-neutral-dark tracking-tight">
            {value.toLocaleString()}
          </span>
          {subtext && (
            <span className="text-xs text-neutral-mid mt-1 font-medium">
              {subtext}
            </span>
          )}
        </div>
        <div className={`w-12 h-12 rounded-card flex items-center justify-center ${iconBgColors}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default DashboardStatCard;
