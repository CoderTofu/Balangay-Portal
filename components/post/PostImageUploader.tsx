"use client";

import { useRef } from "react";

type PostImageUploaderProps = {
  image: string | null;
  isDragging: boolean;
  onDragStateChange: (dragging: boolean) => void;
  onUpload: (files: FileList | null) => void;
  onRemoveImage: () => void;
};

export default function PostImageUploader({
  image,
  isDragging,
  onDragStateChange,
  onUpload,
  onRemoveImage,
}: PostImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewImage = image;

  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-2xl border-2 border-dashed transition-colors",
        "cursor-pointer",
        isDragging
          ? "border-[#17136D]/40 bg-[#eef0ff]"
          : "border-slate-300 bg-slate-100",
      ].join(" ")}
      style={{ minHeight: "180px" }}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        onDragStateChange(true);
      }}
      onDragLeave={() => onDragStateChange(false)}
      onDrop={(e) => {
        e.preventDefault();
        onDragStateChange(false);
        onUpload(e.dataTransfer.files);
      }}
    >
      {previewImage ? (
        <div className="relative h-full min-h-[180px] w-full p-3">
          <div className="relative h-full min-h-[156px] w-full overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage}
              alt="Listing preview"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-sm text-white"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveImage();
              }}
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex h-full flex-col items-center justify-center py-10">
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-2 flex h-14 w-14 items-center justify-center">
              <svg
                width="48"
                height="44"
                viewBox="0 0 48 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="12"
                  width="40"
                  height="28"
                  rx="4"
                  stroke="#6b7280"
                  strokeWidth="2.5"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="26"
                  r="8"
                  stroke="#6b7280"
                  strokeWidth="2.5"
                  fill="none"
                />
                <circle cx="24" cy="26" r="3" fill="#6b7280" />
                <path
                  d="M16 12l3-6h10l3 6"
                  stroke="#6b7280"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="38" cy="17" r="2" fill="#6b7280" />
                <circle cx="38" cy="8" r="6" fill="white" />
                <path
                  d="M38 5v6M35 8h6"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-center text-xs font-semibold uppercase leading-5 tracking-widest text-slate-500">
              Drag & Drop or
              <br />
              Tap to Upload Image
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        // multiple
        className="hidden"
        onChange={(e) => onUpload(e.target.files)}
      />
    </div>
  );
}

