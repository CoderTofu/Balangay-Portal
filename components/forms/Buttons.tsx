import React from "react";

type ButtonProps = {
  text: string;
  clickEvent?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  text,
  clickEvent = () => {},
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "mt-3 w-full rounded-2xl px-6 py-5 text-base font-semibold shadow-2xs transition delay-150 duration-300 ease-in-out active:scale-[0.99]";

  const variants = {
    primary: "bg-[#070235] text-white hover:bg-[#070235dd]",
    secondary: "bg-[#D3E4FE] text-[#070235] hover:bg-[#d3e4fecf]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={() => {
        if (disabled) return;
        clickEvent();
      }}
      className={[
        baseStyles,
        variants[variant],
        disabled ? "cursor-not-allowed opacity-40 active:scale-100" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      {text}
    </button>
  );
}