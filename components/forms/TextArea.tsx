type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange"
> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  // Backward-compatible aliases
  content?: string;
  setContent?: (value: string) => void;
};

export default function TextArea({
  value,
  onChange,
  content,
  setContent = () => {},
  className = "",
  rows = 3,
  ...props
}: TextAreaProps) {
  const resolvedValue = value ?? content ?? "";

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange?.(e);
    setContent(e.target.value);
  }

  return (
    <textarea
      value={resolvedValue}
      onChange={handleChange}
      rows={rows}
      className={`w-full resize-none rounded-xl border border-[#bfd5f0] bg-white px-4 py-3 text-[#000] placeholder:text-[#3268A8] outline-none focus:ring-2 focus:ring-[#3268A8]/25 ${className}`.trim()}
      {...props}
    />
  );
}
