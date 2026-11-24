"use client";
import { PiggyBank, Landmark } from "lucide-react";

type PlanTab = "saving" | "fixed";

type PlanTabsProps = {
  activeTab: PlanTab;
  onChange: (tab: PlanTab) => void;
};

export function PlanTabs({ activeTab, onChange }: PlanTabsProps) {
  const tabs = [
    { id: "saving", label: "Saving Plan", icon: PiggyBank },
    { id: "fixed", label: "Fixed Plan", icon: Landmark },
  ] as const;

  return (
    <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-zinc-100 p-1">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
            activeTab === id
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Icon size={15} />
          {label}
        </button>
      ))}
    </div>
  );
}
