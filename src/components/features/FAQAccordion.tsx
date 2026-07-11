"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`border rounded-card bg-white transition-all duration-300 overflow-hidden ${
              isOpen
                ? "border-primary/30 shadow-md ring-1 ring-primary/5"
                : "border-neutral-light hover:border-neutral-mid/30 shadow-sm"
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-neutral-dark focus:outline-none"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-neutral-mid transition-transform duration-300 ${
                  isOpen ? "transform rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {/* Answer panel with height animation */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-64 border-t border-neutral-light" : "max-h-0"
              }`}
            >
              <div className="p-5 text-sm text-neutral-mid leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
