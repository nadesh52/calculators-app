"use client";
import { Package, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui";
import { initItem } from "../constants";
import { getNextItemNumber } from "../utils";

interface FormProps {
  formData: (item: any) => void;
  existingItems: any[];
}

export function Form({ formData, existingItems }: FormProps) {
  const [mode, setMode] = useState<"single" | "pack">("single");
  const [items, setItems] = useState<any>(initItem);

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

  const handleSubmit = (e: React.SubmitEvent) => {
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
    const nextNumber = getNextItemNumber(existingItems);

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
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Header & Item Badge */}
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600">
          รายการ #{getNextItemNumber(existingItems)}
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
            placeholder="6"
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
          placeholder="250"
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
          placeholder="120"
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
