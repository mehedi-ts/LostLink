"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, className = "", type = "text", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-neutral-dark">
            {label}
          </label>
        )}
        <div className="relative rounded-input">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-mid">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={`w-full px-3 py-2 text-sm text-neutral-dark bg-white border rounded-input transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary disabled:bg-neutral-light disabled:text-neutral-mid ${
              leftIcon ? "pl-10" : ""
            } ${
              error
                ? "border-error focus:border-error focus:ring-error-light"
                : "border-neutral-mid/20 focus:border-primary"
            } ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs font-medium text-error">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-neutral-mid">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
