"use client";
import { useState } from "react";
import { PeopleProvider, OrderProvider } from "@/features/sharebill/contexts";
import {
  PeopleTab,
  OrderTab,
  TabGroup,
  SummaryTab,
} from "@/features/sharebill/components";
import { TabKey } from "@/features/sharebill/types";

const TABS = {
  people: <PeopleTab />,
  order: <OrderTab />,
  summary: <SummaryTab />,
};

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
