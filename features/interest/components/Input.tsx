"use client";

import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
}

export function Input({
  className = "",
  label,
  leftIcon,
  ...props
}: InputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      {label && (
        <span className="text-xs font-semibold text-zinc-700 select-none">
          {label}
        </span>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center justify-center text-zinc-400">
            {leftIcon}
          </div>
        )}
        <input
          className={`w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-2.5 text-xs font-medium text-zinc-800 transition-all outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 ${
            leftIcon ? "pr-3 pl-9" : "px-3"
          } ${className}`}
          {...props}
        />
      </div>
    </label>
  );
}
