"use client";

import React from "react";
import Button from "./Button";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 py-16 bg-white border border-dashed border-neutral-mid/20 rounded-modal max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-neutral-light flex items-center justify-center text-neutral-mid mb-4">
        {icon || <Inbox className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-neutral-dark mb-1">{title}</h3>
      <p className="text-sm text-neutral-mid mb-6 max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
