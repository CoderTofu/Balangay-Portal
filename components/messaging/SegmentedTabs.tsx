"use client";

type SegmentedTabsProps<T extends string> = {
  tabs: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

export default function SegmentedTabs<T extends string>({
  tabs,
  value,
  onChange,
}: SegmentedTabsProps<T>) {
  return (
    <div className="rounded-2xl bg-white p-1 shadow-[0_10px_25px_rgba(16,24,40,0.08)]">
      <div className="grid grid-cols-2 gap-2">
        {tabs.map((t) => {
          const active = t === value;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onChange(t)}
              className={[
                "cursor-pointer rounded-xl px-4 py-3 text-xs font-extrabold tracking-wide transition active:scale-[0.99]",
                active
                  ? "bg-[#F1D36B] text-[#17136D]"
                  : "bg-white text-slate-500 hover:bg-slate-50",
              ].join(" ")}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

