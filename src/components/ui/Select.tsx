"use client";

import React, { forwardRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[] | string[];
  placeholder?: string;
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-neutral-dark">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-3 py-2 pr-10 text-sm text-neutral-dark bg-white border rounded-input appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary disabled:bg-neutral-light disabled:text-neutral-mid ${
              error
                ? "border-error focus:border-error focus:ring-error-light"
                : "border-neutral-mid/20 focus:border-primary"
            } ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const lbl = typeof opt === "string" ? opt : opt.label;
              return (
                <option key={val} value={val}>
                  {lbl}
                </option>
              );
            })}
          </select>
          {/* Custom Chevron icon */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-mid">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && <span className="text-xs font-medium text-error">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-neutral-mid">{helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
