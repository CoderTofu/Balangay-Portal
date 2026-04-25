"use client";

type ChatBubbleProps = {
  side: "me" | "them" | "system";
  text: string;
};

export default function ChatBubble({ side, text }: ChatBubbleProps) {
  if (side === "system") {
    return (
      <div className="flex justify-center py-1">
        <div className="rounded-full bg-[#F1D36B]/80 px-3 py-1 text-[11px] font-extrabold tracking-wide text-[#3268A8] ring-1 ring-[#F1D36B]">
          {text}
        </div>
      </div>
    );
  }

  const isMe = side === "me";
  return (
    <div className={["flex", isMe ? "justify-end" : "justify-start"].join(" ")}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-[0_10px_25px_rgba(16,24,40,0.06)]",
          isMe
            ? "bg-[#2B5BB3] text-white"
            : "bg-slate-200 text-slate-700",
        ].join(" ")}
      >
        {text}
      </div>
    </div>
  );
}

