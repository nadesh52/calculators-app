"use client";
import { RotateCcw } from "lucide-react";

export function ResetButton({ onReset }: { onReset: (items: any[]) => void }) {
  const handleClick = () => {
    const confirmed = window.confirm("reset");

    if (confirmed) {
      onReset([]);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="ล้างทั้งหมด"
      title="ล้างทั้งหมด"
      className="flex items-center gap-1.5 rounded-xl p-2 text-xs font-medium text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 active:scale-95"
    >
      <RotateCcw size={18} />
    </button>
  );
}
