"use client";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { ResultProvider } from "@/features/interest/contexts/ResultContext";
import { ResultBox, SubmitButton } from "@/features/interest/components";
import { FixedPlanTab } from "./components/fixed-plan";
import { SavingPlanTab } from "./components/saving-plan";
import { PlanTabs } from "./components/PlanTabs";

export function InterestFeature() {
  const [activeTab, setActiveTab] = useState<"saving" | "fixed">("saving");
  const activeFormId = activeTab === "saving" ? "saving-form" : "fixed-form";

  return (
    <ResultProvider>
      <div className="mx-auto flex w-full max-w-md flex-col gap-5 p-4 sm:p-6">
        {/* Main Form Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xl sm:p-5">
          {/* Header Description */}
          <div className="mb-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Calculator size={16} />
              </div>
              <h2 className="text-sm font-bold text-zinc-800">คำนวณดอกเบี้ย</h2>
            </div>
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-500">
              {activeTab === "saving" ? "ออมทรัพย์" : "ฝากประจำ"}
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <PlanTabs activeTab={activeTab} onChange={setActiveTab} />

          {/* Tab Content */}
          <div>
            {activeTab === "saving" && <SavingPlanTab />}
            {activeTab === "fixed" && <FixedPlanTab />}
          </div>

          {/* Single Shared Submit Button */}
          <div className="mt-4 border-t border-zinc-100 pt-2">
            <SubmitButton formId={activeFormId} />
          </div>
        </div>

        {/* Result Box Card */}
        {/* <div className="w-full">
        </div> */}
        <ResultBox activeTab={activeTab} />
      </div>
    </ResultProvider>
  );
}
