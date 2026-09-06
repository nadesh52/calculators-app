"use client";

import React from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

export interface MonthSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  selectedValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function MonthSelect({
  label,
  selectedValue,
  className = "",
  value,
  defaultValue,
  ...props
}: MonthSelectProps) {
  const monthOptions = [3, 6, 12, 24, 36];

  // ตรวจสอบว่ายังไม่ได้เลือกค่าหรือไม่ เพื่อปรับสีข้อความ Placeholder ให้จางเหมือน Input อื่นๆ
  const isPlaceholder =
    !value && (defaultValue === "" || defaultValue === undefined);

  return (
    <label className="flex flex-col gap-1.5 text-left">
      {label && (
        <span className="text-xs font-semibold text-zinc-700 select-none">
          {label}
        </span>
      )}
      <div className="relative flex items-center">
        {/* Left Icon */}
        <div className="pointer-events-none absolute left-3 flex items-center justify-center text-zinc-400">
          <CalendarDays size={15} />
        </div>

        {/* Select Element */}
        <select
          required
          value={value}
          defaultValue={defaultValue ?? ""}
          onChange={selectedValue}
          className={`w-full cursor-pointer appearance-none rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-2 pr-8 pl-9 text-xs font-medium transition-all outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 ${
            isPlaceholder ? "text-zinc-400" : "text-zinc-800"
          } ${className}`}
          {...props}
        >
          <option value="" disabled className="bg-white text-zinc-400">
            เลือกระยะเวลาฝาก
          </option>
          {monthOptions.map((m) => (
            <option
              key={m}
              value={m}
              className="bg-white py-1.5 font-medium text-zinc-800"
            >
              {m} เดือน
            </option>
          ))}
        </select>

        {/* Right Arrow Icon */}
        <div className="pointer-events-none absolute right-3 flex items-center justify-center text-zinc-400">
          <ChevronDown size={15} />
        </div>
      </div>
    </label>
  );
}
