"use client";

type StepperProps = {
  steps: [string, ...string[]];
  currentStep: number; // 0-based
};

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex justify-center w-full gap-4">
      {steps.map((label, idx) => {
        const isActive = idx === currentStep;

        return (
          <div key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div
                className={[
                  "grid h-9 w-9 place-items-center rounded-full text-sm font-bold transition-colors duration-200",
                  isActive
                    ? "bg-[#F1D36B] text-[#17136D] border border-[#6D5E00]"
                    : "bg-slate-200 text-slate-500",
                ].join(" ")}
              >
                {idx + 1}
              </div>
              <span
                className={[
                  "text-xs font-medium transition-colors duration-200",
                  isActive ? "text-[#17136D]/80" : "text-slate-400",
                ].join(" ")}
              >
                {label}
              </span>
            </div>

            {idx < steps.length - 1 ? (
              <div className="h-px w-12 flex-1 bg-slate-200" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

