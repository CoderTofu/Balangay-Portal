"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownFieldProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;

  // Backward-compatible alias to match InputField pattern
  setContent?: (value: string) => void;
  options: DropdownOption[];
};

export default function DropdownField({
  value,
  onChange,
  setContent = () => {},
  options,
  disabled = false,
  placeholder = "Select an option...",
  name,
  required,
  className = "",
}: DropdownFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value) ?? null,
    [options, value],
  );

  const filteredOptions = useMemo(
    () =>
      options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [options, search],
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => searchInputRef.current?.focus(), 50);
    return () => window.clearTimeout(id);
  }, [open]);

  function selectOption(nextValue: string) {
    onChange?.(nextValue);
    setContent(nextValue);
    setOpen(false);
    setSearch("");
  }

  return (
    <div className={`relative ${className}`.trim()} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "w-full min-h-[48px] rounded-xl border bg-white px-4 py-3 pr-10 text-left text-sm font-medium",
          "transition-all",
          open
            ? "border-[#17136D] ring-2 ring-[#17136D]/20"
            : "border-[#bfd5f0]",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        ].join(" ")}
      >
        <span className={selectedOption ? "text-black" : "text-slate-400"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
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
        </span>
      </button>

      {/* Hidden input preserves form compatibility */}
      {name ? (
        <input type="hidden" name={name} value={value} required={required} />
      ) : null}

      {open && !disabled ? (
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
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="leading-none text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
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
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={[
                      "flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-sm transition-colors",
                      isSelected
                        ? "bg-[#EEF0FF] font-semibold text-[#17136D]"
                        : "text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                    onClick={() => selectOption(opt.value)}
                  >
                    <span>{opt.label}</span>
                    {isSelected ? (
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
