"use client";

type StarRatingProps = {
  value: number; // 0..5 (decimals allowed)
  max?: number;
  className?: string;
  starClassName?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function StarRating({
  value,
  max = 5,
  className = "",
  starClassName = "text-base",
}: StarRatingProps) {
  const v = clamp(value, 0, max);

  return (
    <div className={["inline-flex items-center gap-1", className].join(" ")}>
      {Array.from({ length: max }).map((_, i) => {
        const fill = clamp(v - i, 0, 1);
        const width = `${Math.round(fill * 100)}%`;

        return (
          <span
            key={i}
            className={[
              "relative inline-block leading-none",
              starClassName,
            ].join(" ")}
            aria-hidden="true"
          >
            <span className="opacity-30 text-2xl">★</span>
            <span
              className="absolute inset-0 overflow-hidden text-2xl"
              style={{ width }}
            >
              <span>★</span>
            </span>
          </span>
        );
      })}
      <span className="ml-2 text-xs font-bold text-[#17136D]/80">
        {v.toFixed(1)}/5
      </span>
    </div>
  );
}
