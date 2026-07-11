"use client";

import React, { forwardRef } from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, className = "", rows = 4, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-neutral-dark">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full px-3 py-2 text-sm text-neutral-dark bg-white border rounded-input transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary disabled:bg-neutral-light disabled:text-neutral-mid resize-y ${
            error
              ? "border-error focus:border-error focus:ring-error-light"
              : "border-neutral-mid/20 focus:border-primary"
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs font-medium text-error">{error}</span>}
        {!error && helperText && (
          <span className="text-xs text-neutral-mid">{helperText}</span>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
