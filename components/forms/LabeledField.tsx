"use client";

import React from "react";

type LabeledFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export default function LabeledField({
  label,
  children,
  className = "",
}: LabeledFieldProps) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold text-black">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

