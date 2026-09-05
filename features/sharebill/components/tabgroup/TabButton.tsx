import { capitalize } from "@/utils/capitalize";

type TabKey = "people" | "order" | "summary";
type TabButtonProps = {
  value: TabKey;
  activeTab: TabKey;
  onClick: (value: TabKey) => void;
};

export function TabButton({ value, activeTab, onClick }: TabButtonProps) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`relative flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
        activeTab == value
          ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-sm"
          : "text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-800"
      }`}
    >
      <span>{capitalize(value)}</span>
    </button>
  );
}
