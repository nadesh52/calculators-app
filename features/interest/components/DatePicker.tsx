"use client";
import React from "react";

export function DatePicker({ selectedValue, label, className, ...props }: any) {
  return (
    <label>
      <p className="text-secondary-100 select-none">{label}</p>
      <input
        type="date"
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectedValue(e)}
        className={`border-secondary-200 focus-visible:ring-secondary-100 text-accent-200 w-full rounded border px-3 py-1 outline-none focus-visible:ring ${className}`}
        {...props}
      />
    </label>
  );
}
