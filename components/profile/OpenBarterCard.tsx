"use client";

import Button from "@/components/forms/Buttons";

type OpenBarterCardProps = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string | null;
  onOpen: () => void;
};

export default function OpenBarterCard({
  id,
  title,
  subtitle,
  imageSrc,
  onOpen,
}: OpenBarterCardProps) {
  return (
    <article
      key={id}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_25px_rgba(16,24,40,0.08)] transition hover:-translate-y-px hover:shadow-[0_14px_34px_rgba(16,24,40,0.12)]"
    >
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onOpen}
          className="group relative h-16 w-20 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200 transition focus:outline-none focus:ring-2 focus:ring-[#17136D]/20"
          aria-label={`View ${title}`}
        >
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`images/${imageSrc}`}
              alt={title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-slate-200 via-slate-100 to-white" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={onOpen}
            className="block w-full cursor-pointer text-left"
          >
            <div className="truncate text-sm font-extrabold tracking-tight text-slate-900">
              {title}
            </div>
            <div className="mt-0.5 text-xs font-semibold text-slate-500">{subtitle}</div>
          </button>

          <div className="mt-3">
            <Button
              text="VIEW OFFER"
              variant="primary"
              className="mt-0 rounded-xl py-3 text-sm shadow-[0_10px_25px_rgba(23,19,109,0.18)] hover:bg-[#100b56]"
              clickEvent={onOpen}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

