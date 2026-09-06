import { RotateCcw } from "lucide-react";

export function ResetButton({ reset }: { reset: ([]) => void }) {
  return (
    <button
      onClick={() => reset([])}
      aria-label="ล้างทั้งหมด"
      title="ล้างทั้งหมด"
      className="flex size-13 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-400 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
    >
      <RotateCcw size={18} />
    </button>
  );
}
