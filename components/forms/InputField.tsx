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
      className={`w-full rounded-xl border border-[#d9e2ec] bg-white px-6 py-5 text-[#3268A8] placeholder:text-[#3268A8] outline-none focus:ring-2 focus:ring-[#3268A8]/25 ${className}`.trim()}
      {...props}
    />
  );
}
