"use client";
import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

export function DatePicker({
  selectedValue,
  label,
  className = "",
  ...props
}: any) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      {label && (
        <span className="select-none text-xs font-semibold text-zinc-700">
          {label}
        </span>
      )}
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-3 flex items-center justify-center text-zinc-400">
          <CalendarIcon size={15} />
        </div>
        <input
          type="date"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            selectedValue(e)
          }
          className={`w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-2 pl-9 pr-3 text-xs font-medium text-zinc-800 transition-all outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 ${className}`}
          {...props}
        />
      </div>
    </label>
  );
}