"use client";
import { useState, useEffect } from "react";
import { useResultContext } from "../contexts";
import {
  TrendingUp,
  Coins,
  Percent,
  Calendar,
  Wallet,
  PiggyBank,
  Landmark,
} from "lucide-react";
import { formatNumber } from "@/utils";

type Props = {
  activeTab?: "saving" | "fixed";
};

export function ResultBox({ activeTab }: Props) {
  const { results } = useResultContext();
  const [viewTab, setViewTab] = useState<"saving" | "fixed">("saving");

  const hasSaving = !!results.saving;
  const hasFixed = !!results.fixed;

  // สลับการแสดงผลลัพธ์ตาม Tab ที่ผู้ใช้กำลังเปิดอยู่
  useEffect(() => {
    if (activeTab) {
      if (activeTab === "saving" && hasSaving) setViewTab("saving");
      if (activeTab === "fixed" && hasFixed) setViewTab("fixed");
    } else {
      if (hasSaving) setViewTab("saving");
      else if (hasFixed) setViewTab("fixed");
    }
  }, [activeTab, hasSaving, hasFixed]);

  // ซ่อนการ์ดหากยังไม่มีข้อมูลคำนวณเลยแม้แต่แผนเดียว
  if (!hasSaving && !hasFixed) {
    return null;
  }

  const currentResult = viewTab === "saving" ? results.saving : results.fixed;

  if (!currentResult) return null;

  const amount = Number(currentResult.amount) || 0;
  const total = Number(currentResult.total) || 0;
  const interestEarned =
    currentResult.interestAmount ?? Math.max(0, total - amount);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 w-full space-y-3.5 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xl transition-all sm:p-5">
      {/* Header + Result Switcher (กรณีมีผลลัพธ์ทั้งคู่) */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <TrendingUp size={16} />
          </div>
          <h2 className="text-sm font-bold text-zinc-800">สรุปผลตอบแทน</h2>
        </div>

        {/* ปุ่มสลับผลลัพธ์ถ้าคำนวณทั้ง 2 แผนแล้ว */}
        {hasSaving && hasFixed ? (
          <div className="flex rounded-lg bg-zinc-100 p-0.5 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setViewTab("saving")}
              className={`flex items-center gap-1 rounded-md px-2 py-0.5 transition ${
                viewTab === "saving"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-zinc-500"
              }`}
            >
              <PiggyBank size={12} />
              ออมทรัพย์
            </button>
            <button
              type="button"
              onClick={() => setViewTab("fixed")}
              className={`flex items-center gap-1 rounded-md px-2 py-0.5 transition ${
                viewTab === "fixed"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-zinc-500"
              }`}
            >
              <Landmark size={12} />
              ฝากประจำ
            </button>
          </div>
        ) : (
          <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-500">
            {viewTab === "saving" ? "ออมทรัพย์" : "ฝากประจำ"}
          </span>
        )}
      </div>

      {/* Hero Highlight: ดอกเบี้ยที่ได้รับ */}
      <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3 text-center">
        <p className="text-[11px] font-semibold text-emerald-700">
          ดอกเบี้ยที่ได้รับทั้งหมด
        </p>
        <p className="mt-0.5 text-2xl font-black tracking-tight text-emerald-600">
          +{formatNumber(interestEarned)}
        </p>
      </div>

      {/* Summary Items (Compact) */}
      <div className="space-y-2 pt-0.5 text-xs">
        <div className="flex items-center justify-between text-zinc-600">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Coins size={14} className="text-zinc-400" />
            <span>เงินต้นฝากเริ่มต้น</span>
          </div>
          <span className="font-semibold text-zinc-800">
            {formatNumber(amount)}
          </span>
        </div>

        <div className="flex items-center justify-between text-zinc-600">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Percent size={14} className="text-zinc-400" />
            <span>อัตราดอกเบี้ย</span>
          </div>
          <span className="font-semibold text-zinc-800">
            {currentResult.interest}% ต่อปี
          </span>
        </div>

        <div className="flex items-center justify-between text-zinc-600">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Calendar size={14} className="text-zinc-400" />
            <span>ระยะเวลาฝาก</span>
          </div>
          <span className="font-semibold text-zinc-800">
            {currentResult.day} วัน
          </span>
        </div>

        <div className="my-1.5 border-t border-dashed border-zinc-200" />

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 font-semibold text-zinc-700">
            <Wallet size={15} className="text-indigo-600" />
            <span>ยอดเงินรวมทั้งหมด</span>
          </div>
          <span className="text-sm font-black text-indigo-600 sm:text-base">
            {formatNumber(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
