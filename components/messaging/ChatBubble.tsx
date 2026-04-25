"use client";

type ChatBubbleProps = {
  side: "me" | "them";
  text: string;
};

export default function ChatBubble({ side, text }: ChatBubbleProps) {
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

