"use client";
import { useState } from "react";
import { PeopleProvider } from "@/features/sharebill/contexts/PeopleContext";
import { OrderProvider } from "@/features/sharebill/contexts/OrderContext";
import {
  PeopleTab,
  OrderTab,
  TabGroup,
  SummaryTab,
} from "@/features/sharebill";

const TABS = {
  people: <PeopleTab />,
  order: <OrderTab />,
  summary: <SummaryTab />,
};

type TabKey = keyof typeof TABS;

export function ShareBillWrapper() {
  const [activeTab, setActiveTab] = useState<TabKey>("order");

  return (
    <PeopleProvider>
      <OrderProvider>
        <main>
          <TabGroup
            tabs={Object.keys(TABS) as TabKey[]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <section>{TABS[activeTab]}</section>
        </main>
      </OrderProvider>
    </PeopleProvider>
  );
}
