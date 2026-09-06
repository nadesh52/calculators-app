"use client";
import { Package, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initItem } from "../constants";
import { Input } from "@/components/ui";

export function Form({ formData }: { formData: (item: any) => void }) {
  const [mode, setMode] = useState<"single" | "pack">("single");
  const [items, setItems] = useState<any>(initItem);
  const [itemCount, setItemCount] = useState(0);

  const handleModeChange = (newMode: "single" | "pack") => {
    setMode(newMode);
    setItems({
      ...initItem,
      count: newMode === "single" ? "1" : "",
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setItems((values: any) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // count = จำนวนชิ้น (ถ้าชิ้นเดี่ยวคำนวณเป็น 1 ชิ้น)
    const count = mode === "single" ? 1 : Number(items.count);
    const quantityPerUnit = Number(items.quantity);
    const price = Number(items.price);

    if (!count || !quantityPerUnit || !price) return;

    // ปริมาณรวมทั้งหมด = จำนวนชิ้น × ปริมาณต่อชิ้น
    const totalQuantity = quantityPerUnit * count;

    // ปริมาณที่ได้ต่อ 1 บาท (ยิ่งเยอะยิ่งคุ้ม)
    const average = Number((totalQuantity / price).toFixed(2));
    const nextNumber = itemCount + 1;

    const newItem = {
      id: uuidv4(),
      number: nextNumber,
      quantity: totalQuantity, // ปริมาณรวมสุทธิ
      price, // ราคารวม/ราคาแพ็ค
      count, // จำนวนชิ้น
      average, // ค่าเฉลี่ยความคุ้มค่า
    };

    formData(newItem);
    setItems(mode === "single" ? { ...initItem, count: "1" } : initItem);
    setItemCount(nextNumber);
  };

  useEffect(() => {
    function handleReset() {
      setItemCount(0);
    }
    window.addEventListener("itemsReset", handleReset);
    return () => window.removeEventListener("itemsReset", handleReset);
  }, []);

  // ดึงค่า itemCount หลัง Mount ฝั่ง Client เท่านั้น
  useEffect(() => {
    try {
      const stored = localStorage.getItem("items");
      const items = stored ? JSON.parse(stored) : [];
      if (Array.isArray(items) && items.length > 0) {
        const maxNumber = items.reduce(
          (max: number, item: any) => (item.number > max ? item.number : max),
          0,
        );
        setItemCount(maxNumber);
      }
    } catch (e) {
      console.error("Failed to load itemCount from localStorage:", e);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xl sm:p-5"
    >
      {/* Header & Item Badge */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-zinc-800">
          เพิ่มรายการเปรียบเทียบ
        </p>
        <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600">
          รายการ #{itemCount + 1}
        </span>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-zinc-100 p-1">
        <button
          type="button"
          onClick={() => handleModeChange("single")}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
            mode === "single"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <ShoppingBag size={14} />
          ชิ้นเดี่ยว
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("pack")}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all ${
            mode === "pack"
              ? "bg-white text-indigo-600 shadow-xs"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Package size={14} />
          ซื้อแบบแพ็ค
        </button>
      </div>

      {/* items Grid */}
      <div
        className={`grid gap-2.5 ${
          mode === "pack" ? "grid-cols-3" : "grid-cols-2"
        }`}
      >
        {/* แสดงเฉพาะโหมดแบบแพ็ค */}
        {mode === "pack" && (
          <Input
            label="จำนวนชิ้นในแพ็ค"
            type="number"
            name="count"
            value={items.count}
            onChange={handleChange}
            required
            placeholder="เช่น 6"
            min="1"
          />
        )}

        <Input
          label={mode === "pack" ? "ปริมาณต่อชิ้น" : "ปริมาณ (กรัม/มล.)"}
          type="number"
          name="quantity"
          value={items.quantity}
          onChange={handleChange}
          required
          placeholder="เช่น 250"
          min="0.01"
          step="any"
        />

        <Input
          label={mode === "pack" ? "ราคาแพ็ค (บาท)" : "ราคา (บาท)"}
          type="number"
          name="price"
          value={items.price}
          onChange={handleChange}
          required
          placeholder="เช่น 120"
          min="0.01"
          step="any"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
      >
        <Plus size={18} />
        เพิ่มรายการ
      </button>
    </form>
  );
}
