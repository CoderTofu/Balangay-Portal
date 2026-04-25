type InputFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Backward-compatible aliases
  content?: string;
  setContent?: (value: string) => void;
};

export default function InputField({
  value,
  onChange,
  content,
  setContent = () => {},
  type = "text",
  className = "",
  ...props
}: InputFieldProps) {
  const resolvedValue = value ?? content ?? "";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    setContent(e.target.value);
  }

  return (
    <input
      type={type}
      value={resolvedValue}
      onChange={handleChange}
      className={`w-full rounded-xl border border-[#bfd5f0] bg-white px-5 py-3 text-[#000] placeholder:text-[#3268A8] outline-none focus:ring-2 focus:ring-[#3268A8]/25 ${className}`.trim()}
      {...props}
    />
  );
}
