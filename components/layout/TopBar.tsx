import Image from "next/image";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur border-b border-gray-300 mb-4">
      <div className="mx-auto flex w-full items-center justify-between px-4 pb-3 pt-4">
        <div className="flex items-center gap-3">
          <Image
            alt="Balangay"
            src="/design-assets/logo-login.png"
            width={35}
            height={35}
          />
          <span className="text-md font-semibold italic tracking-tight text-[#17136D]">
            Balangay
          </span>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-[0_10px_25px_rgba(16,24,40,0.08)]"
        >
          <span className="text-[#17136D]">🔔</span>
        </button>
      </div>
    </header>
  );
}
