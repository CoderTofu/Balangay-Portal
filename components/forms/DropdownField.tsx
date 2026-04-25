"use client";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownFieldProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange"
> & {
  value: string;
  onChange?: (value: string) => void;

  // Backward-compatible alias to match InputField pattern
  setContent?: (value: string) => void;
  options: DropdownOption[];
};

export default function DropdownField({
  value,
  onChange,
  setContent = () => {},
  options,
  className = "",
  ...props
}: DropdownFieldProps) {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange?.(e.target.value);
        setContent(e.target.value);
      }}
      className={`w-full cursor-pointer appearance-none rounded-xl border border-[#bfd5f0] bg-white px-5 py-3 text-sm font-medium text-[#000] outline-none transition focus:ring-2 focus:ring-[#3268A8]/25 ${className}`.trim()}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
