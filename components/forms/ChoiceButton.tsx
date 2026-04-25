"use client";

import React from "react";

type ChoiceButtonProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  icon?: React.ReactNode;
  className?: string;
};

export default function ChoiceButton({
  label,
  selected,
  onSelect,
  icon,
  className = "",
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        "flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border px-4 py-4 text-sm font-semibold transition duration-200 active:scale-[0.99]",
        selected
          ? "border-[#F1D36B] bg-[#F1D36B] text-[#17136D] shadow-[0_10px_25px_rgba(241,211,107,0.25)]"
          : "border-slate-200 bg-white text-[#17136D] hover:bg-slate-50",
        "focus:outline-none focus:ring-2 focus:ring-[#17136D]/20",
        className,
      ].join(" ")}
    >
      {icon ? <span className="text-[#17136D]">{icon}</span> : null}
      <span>{label}</span>
    </button>
  );
}

