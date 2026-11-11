"use client";
import { useCallback, useEffect, useState } from "react";
import {
  ResultCard,
  ResetButton,
  ProductList,
  Form,
  AddItemModal,
} from "@/features/comparison/components";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("items", JSON.stringify(items));
  }, [items, hydrated]);

  return (
    <div className="my-8">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        {/* Header Section + Reset Button */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-zinc-900">เปรียบเทียบราคา</h1>
            <p className="text-xs text-zinc-500">
              หาราคาเฉลี่ยต่อหน่วยที่ดีที่สุด
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ResetButton onReset={handleReset} />

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
            >
              เพิ่มรายการ
            </button>
          </div>
        </div>

        {/* Result Card แสดงผลเต็มความกว้าง */}
        <div>
          <ResultCard items={items} />
        </div>

        {/* Product List */}
        <div className="mt-6 space-y-2">
          <p className="text-xs text-zinc-500">รายการ</p>
          <ProductList items={items} removeId={handleRemove} />
        </div>
      </div>

      {isModalOpen && (
        <AddItemModal onClose={closeModal}>
          <Form
            existingItems={items}
            formData={(value: any) => {
              setItems((prev: any) => [...prev, value]);
              setIsModalOpen(false);
            }}
          />
        </AddItemModal>
      )}
    </div>
  );
}
