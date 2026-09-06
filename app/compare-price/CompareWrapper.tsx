"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ResultCard } from "@/features/comparison/components/ResultCard";
import { ResetButton } from "@/features/comparison/components/ResetButton";
import { ProductList, Form } from "@/features/comparison/components";
import { Plus, X } from "lucide-react";

const getStoredItems = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("items");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export function CompareWrapper() {
  const [showMenu, setShowMenu] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // โหลดจาก localStorage หลัง mount ฝั่ง client
  useEffect(() => {
    setItems(getStoredItems());
    setHydrated(true);
  }, []);

  const handleReset = useCallback((value: any) => {
    setItems(value);
    window.dispatchEvent(new Event("itemsReset"));
  }, []);

  const handleRemove = (id: string) => {
    setItems((prev: any) => prev.filter((data: any) => data.id !== id));
  };

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("items", JSON.stringify(items));
  }, [items, hydrated]);

  return (
    <div className="min-h-screen bg-zinc-50 pt-6 pb-32">
      <div className="min-h-screen bg-zinc-50 pt-6 pb-32">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          {/* Header Section + Reset Button */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-zinc-900">
                เปรียบเทียบความคุ้มค่า
              </h1>
              <p className="text-xs text-zinc-500">
                คำนวณหาราคาเฉลี่ยต่อหน่วยเพื่อหาตัวเลือกที่คุ้มที่สุด
              </p>
            </div>

            {/* ย้ายมาไว้นี่ */}
            <ResetButton reset={handleReset} />
          </div>

          {/* Result Card แสดงผลเต็มความกว้าง */}
          <div>
            <ResultCard items={items} />
          </div>

          {/* Product List */}
          <div className="mt-6">
            <ProductList items={items} removeId={handleRemove} />
          </div>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 z-30 bg-zinc-900/30 backdrop-blur-xs transition-opacity duration-200"
        />
      )}

      {/* Floating Add Button & Form Drawer */}
      {/* Backdrop & Popover Layer */}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 z-40 bg-zinc-900/30 transition-opacity duration-200"
        >
          {/* Container จัดตำแหน่งฟอร์ม + ปุ่ม FAB ให้ลอยอยู่มุมขวาล่าง */}
          <div className="absolute right-4 bottom-5 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
            {/* Popover Form (ใช้ stopPropagation เพื่อไม่ให้กดในฟอร์มแล้วเมนูปิด) */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-[calc(100vw-2rem)] max-w-md origin-bottom-right transition-all duration-200"
            >
              <div>
                <Form
                  formData={(value: any) => {
                    setItems((prev: any) => [...prev, value]);
                    setShowMenu(false);
                  }}
                />
              </div>
            </div>

            {/* ปุ่มกดปิด (X) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
              }}
              aria-label="ปิดฟอร์ม"
              aria-expanded={showMenu}
              className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-700 active:scale-95"
            >
              <X size={22} />
            </button>
          </div>
        </div>
      )}

      {/* ปุ่มกดเปิด (+) แสดงเฉพาะตอนที่ยังไม่ได้เปิดเมนู */}
      {!showMenu && (
        <button
          type="button"
          onClick={() => setShowMenu(true)}
          aria-label="เพิ่มรายการ"
          aria-expanded={showMenu}
          className="fixed right-4 bottom-5 z-40 flex size-14 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-700 active:scale-95 sm:right-6 sm:bottom-6"
        >
          <Plus size={26} />
        </button>
      )}
    </div>
  );
}
