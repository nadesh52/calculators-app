"use client";

import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";

const formatNumber = (n: number) => {
  const num = Number(n);
  if (isNaN(num)) return "0";
  return num.toLocaleString("th-TH", { maximumFractionDigits: 2 });
};

const inputRes = { number: "-", quantity: 0, price: 0, count: 0, average: 0 };

const findBest = (items: any[]) => {
  if (!items || items.length === 0) return null;
  return items.reduce((best: any, current: any) =>
    (current?.average || 0) > (best?.average || 0) ? current : best,
  );
};

export function ResultCard({ items }: { items?: any[] }) {
  const [result, setResult] = useState<any>(inputRes);
  const hasItems = items && items.length > 0;

  useEffect(() => {
    setResult(hasItems ? findBest(items) : inputRes);
  }, [items, hasItems]);

  return (
    <div className="rounded-2xl bg-indigo-600 p-4 text-white shadow-sm ring-1 ring-indigo-500">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Side: Icon & Main Value */}
        <div className="flex items-center gap-3.5">
          {/* Trophy Icon Container */}
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white">
            <Trophy size={20} />
          </div>

          {/* Value Display */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold tracking-wider text-indigo-200 uppercase">
                คุ้มที่สุด
              </span>
              {hasItems && result?.number !== "-" && (
                <span className="inline-flex items-center rounded-md bg-indigo-500 px-2 py-0.5 text-[11px] font-bold text-white">
                  #{result.number}
                </span>
              )}
            </div>

            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-white">
                {hasItems ? formatNumber(result.average) : "-"}
              </span>
              <span className="text-xs font-medium text-indigo-200">
                หน่วย / บาท
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quantity & Price Breakdown */}
        {hasItems && (
          <div className="flex items-center justify-between gap-4 rounded-xl bg-indigo-700/60 p-2.5 px-3.5 sm:justify-end">
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-medium text-indigo-200">ปริมาณ</p>
              <p className="text-xs font-semibold text-white">
                {formatNumber(result.quantity)}
              </p>
            </div>

            <div className="h-6 w-px bg-indigo-500/50" />

            <div className="text-right">
              <p className="text-[10px] font-medium text-indigo-200">ราคา</p>
              <p className="text-xs font-semibold text-emerald-300">
                ฿{formatNumber(result.price)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}