import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ className = "", label, ...props }: InputProps) {
  return (
    <label>
      <p className="text-secondary-100 select-none">{label}</p>
      <input
        className={`border-secondary-200 focus-visible:ring-secondary-100 text-accent-200 w-full rounded border px-3 py-1 outline-none focus-visible:border-transparent focus-visible:ring-2 ${className}`}
        {...props}
      />
    </label>
  );
}
