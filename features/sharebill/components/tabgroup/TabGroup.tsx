"use client";
import { TabButton } from "./TabButton";

type TabKey = "people" | "order" | "summary";

type TabGroupProps = {
  tabs: TabKey[];
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
};

export function TabGroup({ tabs, activeTab, setActiveTab }: TabGroupProps) {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/70 p-2 backdrop-blur-md transition-all select-none border-b border-zinc-100">
      <div className="mx-auto flex w-fit gap-1 rounded-full bg-zinc-100/80 p-1 shadow-inner border border-zinc-200/50">
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
