"use client";

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-card border border-neutral-light shadow-sm overflow-hidden flex flex-col ${
        hoverEffect
          ? "hover:shadow-md hover:-translate-y-0.5 transition-all-custom"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
