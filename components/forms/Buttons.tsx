type ButtonProps = {
  text: string;
  clickEvent?: () => void;
};

export default function Button({ text, clickEvent = () => {} }: ButtonProps) {
  return (
    <button
      type="submit"
      onClick={() => {
        clickEvent();
      }}
      className="mt-3 w-full rounded-2xl bg-[#17136D] px-6 py-5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(23,19,109,0.35)] transition delay-150 duration-300 ease-in-out active:scale-[0.99] cursor-pointer hover:bg-[rgba(23,19,109,0.95)]"
    >
      {text}
    </button>
  );
}
