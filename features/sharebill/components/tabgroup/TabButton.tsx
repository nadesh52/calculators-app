"use client";
import { TabKey } from "../../types";
import { TAB_MENU } from "../../constants";

type TabButtonProps = {
  value: TabKey;
  activeTab: TabKey;
  onClick: (value: TabKey) => void;
};

export function TabButton({ value, activeTab, onClick }: TabButtonProps) {
  const { label, icon: Icon } = TAB_MENU[value];
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`group flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 select-none ${
        isActive
          ? "bg-indigo-600 text-white shadow-xs"
          : "text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900"
      }`}
    >
      <Icon
        size={15}
        className={`transition-colors ${
          isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-700"
        }`}
      />
      <span>{label}</span>
    </button>
  );
}
