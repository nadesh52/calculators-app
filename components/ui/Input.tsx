export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

export function Input({
  className = "",
  label,
  leftIcon,
  rightContent,
  ...props
}: InputProps) {
  return (
    <label className="block">
      {label && (
        <p className="mb-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
          {label}
        </p>
      )}

      <div className="relative flex items-stretch overflow-hidden rounded-xl border border-zinc-200 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
        {leftIcon && (
          <div className="pointer-events-none flex items-center pl-3.5 text-zinc-400">
            {leftIcon}
          </div>
        )}

        <input
          {...props}
          className={`min-w-0 flex-1 border-0 bg-transparent px-2 py-2.5 text-sm font-semibold text-zinc-800 outline-none ${className}`}
        />

        {rightContent}
      </div>
    </label>
  );
}
