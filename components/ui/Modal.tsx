"use client";

import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  onClose: () => void;
};

export default function Modal({
  open,
  title,
  description,
  children,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-slate-900/40 backdrop-blur-[2px]"
      />

      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-[0_25px_70px_rgba(16,24,40,0.35)]">
          {title ? (
            <div className="text-base font-extrabold tracking-tight text-[#17136D]">
              {title}
            </div>
          ) : null}
          {description ? (
            <div className="mt-1 text-sm text-slate-600">{description}</div>
          ) : null}

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

