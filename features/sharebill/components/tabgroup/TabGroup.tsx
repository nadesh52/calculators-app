"use client";
import { TabKey } from "../../types";
import { TabButton } from "./TabButton";

type TabGroupProps = {
  tabs: TabKey[];
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
};

export function TabGroup({ tabs, activeTab, setActiveTab }: TabGroupProps) {
  return (
    <nav className="sticky top-16 z-30 w-full border-b border-zinc-200/80 bg-white/80 p-2 backdrop-blur-md select-none">
      <div className="mx-auto flex w-fit gap-1.5 rounded-2xl border border-zinc-200/80 bg-zinc-100/70 p-1.5 shadow-inner">
        {tabs.map((tab) => (
          <TabButton
            key={tab}
            value={tab}
            activeTab={activeTab}
            onClick={setActiveTab}
          />
        ))}
      </div>
    </nav>
  );
}
