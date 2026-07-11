"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Disable page scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-dark/45 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Card Content */}
      <div
        ref={modalRef}
        className={`relative w-full bg-white rounded-modal shadow-xl border border-neutral-light overflow-hidden z-10 animate-modal-in ${sizeClasses}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-light bg-neutral-light/20">
          <h3 id="modal-title" className="text-lg font-bold text-neutral-dark">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-mid hover:text-neutral-dark p-1 rounded-full hover:bg-neutral-light transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 py-5 text-sm text-neutral-mid max-h-[70vh] overflow-y-auto leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4 bg-neutral-light/30 border-t border-neutral-light">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
