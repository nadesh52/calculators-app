"use client";

import React from "react";
import {
  ChevronDown,
  ChevronUp,
  Receipt,
  Utensils,
  Car,
  Home,
  ShoppingBag,
  LucideIcon,
} from "lucide-react";

export interface ReceiptOrderItem {
  id: string;
  name: string;
  category?: string; // 👈 รองรับ category
  price_per_unit?: number;
  price?: number;
  quantity: number;
  total: number;
}

export interface ReceiptListProps {
  orders: ReceiptOrderItem[];
  showAllOrders: boolean;
  onToggleShowAll: () => void;
  previewLimit?: number;
}

// 📌 Helper mapping ไอคอนหมวดหมู่ (พร้อมรองรับ Category ในอนาคต)
const categoryIcons: Record<string, LucideIcon> = {
  food: Utensils,
  travel: Car,
  stay: Home,
  shopping: ShoppingBag,
  default: Receipt,
};

export default function ReceiptList({
  orders = [],
  showAllOrders,
  onToggleShowAll,
  previewLimit = 3,
}: ReceiptListProps) {
  const hasMoreOrders = orders.length > previewLimit;

  // Helper สำหรับดึง Category Icon
  const getCategoryIcon = (category?: string) => {
    const IconComponent =
      (category && categoryIcons[category.toLowerCase()]) ||
      categoryIcons.default;
    return <IconComponent size={13} className="text-indigo-500" />;
  };

  // Helper สำหรับเรนเดอร์ออเดอร์แต่ละแถว
  const renderOrderItem = (o: ReceiptOrderItem) => {
    const unitPrice = o.price_per_unit ?? o.price ?? 0;

    return (
      <div
        key={o.id}
        className="group flex items-center justify-between gap-2.5 rounded-xl px-2 py-1.5 transition hover:bg-zinc-100"
      >
        {/* ฝั่งซ้าย: Icon หมวดหมู่ + ชื่อรายการ */}
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-indigo-50/80 transition group-hover:bg-indigo-100/80">
            {getCategoryIcon(o.category)}
          </div>
          <span className="truncate text-xs font-medium text-zinc-700">
            {o.name}
          </span>
        </div>

        {/* ฝั่งขวา: ราคาต่อหน่วย x จำนวน = ราคารวม */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <span className="font-mono">{unitPrice.toLocaleString()}</span>
            <span className="px-1 font-mono text-xs text-zinc-400">
              x{o.quantity}
            </span>
          </div>
          <span className="min-w-16 text-right font-mono text-sm font-bold text-zinc-800 tabular-nums">
            ฿{Number(o.total || 0).toLocaleString()}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-3 rounded-2xl border border-dashed border-zinc-200/90 bg-zinc-50/30 p-2.5">
      {/* Header ของสลิปรายการ */}
      <div className="mb-2 flex items-center justify-between px-2 pt-0.5">
        <span className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
          รายการค่าใช้จ่าย
        </span>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-bold text-zinc-500">
          {orders.length} รายการ
        </span>
      </div>

      {/* รายการออเดอร์ชุดแรก (แสดงเสมอ) */}
      <div className="space-y-0.5">
        {orders.slice(0, previewLimit).map(renderOrderItem)}
      </div>

      {/* รายการที่เหลือ (เปิด/ปิด อนิเมชัน) */}
      {hasMoreOrders && (
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            showAllOrders
              ? "mt-0.5 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-h-48 space-y-0.5 overflow-y-auto pr-0.5">
              {orders.slice(previewLimit).map(renderOrderItem)}
            </div>
          </div>
        </div>
      )}

      {/* ปุ่มกด ซ่อน/แสดง */}
      {hasMoreOrders && (
        <button
          type="button"
          onClick={onToggleShowAll}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-zinc-100/70 py-1.5 text-[11px] font-semibold text-zinc-500 transition hover:bg-indigo-50 hover:text-indigo-600 active:scale-98"
        >
          {showAllOrders ? (
            <>
              <span>ซ่อนรายการ</span>
              <ChevronUp size={13} />
            </>
          ) : (
            <>
              <span>
                ดูทั้งหมด ({orders.length - previewLimit} รายการที่เหลือ)
              </span>
              <ChevronDown size={13} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
