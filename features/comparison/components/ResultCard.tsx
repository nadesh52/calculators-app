"use client";
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { formatNumber } from "@/utils";
import { initResult } from "../constants";
import { findBest } from "../utils";

export function ResultCard({ items }: { items?: any[] }) {
  const [result, setResult] = useState<any>(initResult);
  const hasItems = items && items.length > 0;

  useEffect(() => {
    setResult(hasItems ? findBest(items) : initResult);
  }, [items, hasItems]);

  return (
    <div className="rounded-2xl bg-indigo-100 p-4 text-white shadow-sm ring-1 ring-indigo-200">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Side: Icon & Main Value */}
        <div className="flex items-center gap-3.5">
          {/* Trophy Icon Container */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-200 text-lg font-semibold text-indigo-600 italic tabular-nums">
            {typeof result.number === "number"
              ? String(result.number).padStart(2, "0")
              : "-"}
          </div>

          {/* Value Display */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-md bg-amber-300 p-1 text-[11px] font-bold text-white">
                <Trophy size={12} />
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-indigo-500 uppercase">
                คุ้มที่สุด
              </span>
            </div>

            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-indigo-600 tabular-nums">
                {hasItems ? formatNumber(result.average) : "-"}
              </span>
              <span className="text-xs font-medium text-indigo-500">
                หน่วย / บาท
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quantity & Price Breakdown */}
        {hasItems && (
          <div className="flex items-center justify-between gap-4 rounded-xl bg-indigo-200 p-2.5 px-3.5 sm:justify-end">
            <div className="text-left sm:text-right">
              <p className="text-[11px] font-medium text-white">ปริมาณ</p>
              <p className="text-smx font-semibold text-indigo-600">
                {formatNumber(result.quantity)}
              </p>
            </div>

            <div className="h-6 w-px bg-indigo-200" />

            <div className="text-right">
              <p className="text-[11px] font-medium text-white">ราคา</p>
              <p className="text-smx font-semibold text-indigo-600">
                {formatNumber(result.price)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
