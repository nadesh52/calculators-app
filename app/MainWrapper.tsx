"use client";
import { CompareWrapper } from "@/app/compare-price/CompareWrapper";
import { InterestWrapper } from "@/app/interest-calc/InterestWrapper";
import { ShareBillWrapper } from "@/app/share-bill/ShareBillWrapper";
import { useState } from "react";


export default function MainWrapper() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "interest":
        return <InterestWrapper />;
      case "sharebill":
        return <ShareBillWrapper />;
      case "comparison":
        return <CompareWrapper />;
      default:
        return (
          <p className="text-neutral-400">
            Please select a tab to see content.
          </p>
        );
    }
  };

  return (
    <section className="w-full">
      <nav className="border-secondary-200 sticky top-0 z-40 flex flex-row gap-4 border-b bg-white p-4">
        <div className="min-w-[202px]">
          <p className="text-primary text-2xl font-medium">Calculators App</p>
        </div>
        <div>
          <label className="relative">
            <input
              type="text"
              disabled
              placeholder="Search App..."
              className="border-secondary-200 h-8 w-[500px] rounded border bg-white px-4 outline-none focus-visible:shadow-lg disabled:cursor-not-allowed"
            />
            {/* <MagnifyingGlassIcon className="text-secondary-200 pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 stroke-2" /> */}
          </label>
        </div>
      </nav>

      <section className="flex flex-row">
        <nav className="sticky top-0 bottom-0 left-0 flex h-[calc(100dvh-73px)] w-[220px] min-w-[220px] flex-col gap-2 overflow-y-auto bg-white p-2">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`flex w-full cursor-pointer flex-row items-center gap-4 rounded p-2 text-sm font-medium transition-all duration-300 ${
              activeTab === "comparison"
                ? "bg-secondary-100 text-white shadow"
                : "text-accent-200 bg-white"
            }`}
          >
            {/* <CalculatorIcon className="size-6" /> */}
            <p>Comparison Price</p>
          </button>

          <button
            onClick={() => setActiveTab("interest")}
            className={`flex w-full cursor-pointer flex-row items-center gap-4 rounded p-2 text-sm font-medium transition-all duration-300 ${
              activeTab === "interest"
                ? "bg-secondary-100 text-white shadow"
                : "text-accent-200 bg-white"
            }`}
          >
            {/* <BanknotesIcon className="size-6" /> */}
            <p>Interest Calculator</p>
          </button>

          <button
            onClick={() => setActiveTab("sharebill")}
            className={`flex w-full cursor-pointer flex-row items-center gap-4 rounded p-2 text-sm font-medium transition-all duration-300 ${
              activeTab === "sharebill"
                ? "bg-secondary-100 text-white shadow"
                : "text-accent-200 bg-white"
            }`}
          >
            {/* <ReceiptPercentIcon className="size-6" /> */}
            <p>Share bill</p>
          </button>
        </nav>

        <section className="h-[calc(100dvh-73px)] w-full overflow-y-auto">
          {renderContent()}
        </section>
      </section>
    </section>
  );
}
