"use client";

import { useEffect, useMemo, useRef } from "react";

type LookingForSelectorProps = {
  options: string[];
  selected: string[];
  search: string;
  open: boolean;
  onOpenChange: (next: boolean) => void;
  onSearchChange: (next: string) => void;
  onToggle: (option: string) => void;
  onRemove: (option: string) => void;
};

export default function LookingForSelector({
  options,
  selected,
  search,
  open,
  onOpenChange,
  onSearchChange,
  onToggle,
  onRemove,
}: LookingForSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onOpenChange(false);
        onSearchChange("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOpenChange, onSearchChange]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => searchInputRef.current?.focus(), 50);
    return () => window.clearTimeout(id);
  }, [open]);

  const filteredOptions = useMemo(
    () => options.filter((opt) => opt.toLowerCase().includes(search.toLowerCase())),
    [options, search],
  );

  return (
    <div className="relative" ref={containerRef}>
      <div
        className={[
          "w-full min-h-[48px] cursor-pointer rounded-xl border bg-white px-3 py-2 pr-10",
          "flex flex-wrap items-center gap-2 transition-all",
          open ? "border-[#17136D] ring-2 ring-[#17136D]/20" : "border-[#bfd5f0]",
        ].join(" ")}
        onClick={() => onOpenChange(!open)}
      >
        {selected.length === 0 ? (
          <span className="text-sm text-slate-400">Select options...</span>
        ) : (
          selected.map((opt) => (
            <span
              key={opt}
              className="flex items-center gap-1 rounded-full bg-[#E9EEFF] px-3 py-1 text-xs font-semibold text-[#17136D]"
            >
              {opt}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(opt);
                }}
                className="ml-0.5 leading-none text-[#17136D] hover:text-[#100b56]"
                aria-label={`Remove ${opt}`}
              >
                ×
              </button>
            </span>
          ))
        )}
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {open ? (
        <div className="absolute bottom-full z-20 mb-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 px-3 pb-2 pt-3">
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
              />
              {search ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSearchChange("");
                  }}
                  className="leading-none text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              ) : null}
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-4 text-center text-sm text-slate-400">
                No results found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const checked = selected.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    className={[
                      "flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-sm transition-colors",
                      checked
                        ? "bg-[#EEF0FF] font-semibold text-[#17136D]"
                        : "text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggle(opt);
                    }}
                  >
                    <span>{opt}</span>
                    {checked ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : null}
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

