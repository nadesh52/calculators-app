"use client";

import { useEffect, useState } from "react";
import { usePeople } from "@/features/sharebill/contexts";
import {
  Tag,
  Banknote,
  Hash,
  Users,
  ChevronsRight,
  ChevronsLeft,
  ChevronDown,
  ChevronUp,
  Trash2,
  Check,
  Plus,
} from "lucide-react";
import { colorFromName } from "@/utils";
import { UserAvatar } from "@/components";

const inputsInit = { name: "", price: 0, quantity: 1, people: [] };

// รายการชื่อที่ใช้บ่อยสำหรับกดเลือกไวๆ
const QUICK_TAGS = [
  "ค่าอาหาร",
  "เครื่องดื่ม",
  "ค่าเดินทาง",
  "ค่าน้ำมัน",
  "ค่าที่พัก",
  "ค่าของหวาน",
  "ค่าเข้าชม",
];

export default function OrderForm({ onClose, onSubmit, order, onDelete }: any) {
  const { people } = usePeople();
  const [inputs, setInputs] = useState<any>(inputsInit);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload =
      mode === "edit" && order ? { ...inputs, id: order.id } : inputs;

    onSubmit(payload);

    if (onClose) handleClose();
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "price" || name === "quantity") {
      const numValue = value === "" ? "" : parseFloat(value);
      setInputs((prev: any) => ({
        ...prev,
        [name]: numValue,
      }));
    } else {
      setInputs((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ฟังก์ชันสำหรับเลือกชื่อรายการจาก Tag ไวๆ
  const handleSelectQuickTag = (tagName: string) => {
    setInputs((prev: any) => ({
      ...prev,
      name: tagName,
    }));
  };

  const handleCountClick = (event: any, type: any) => {
    event.preventDefault();

    if (type === "increase") {
      setInputs({ ...inputs, quantity: (inputs.quantity || 0) + 1 });
    } else if (type === "decrease" && inputs.quantity > 1) {
      setInputs({ ...inputs, quantity: inputs.quantity - 1 });
    }
  };

  const handleDelete = () => {
    if (onDelete && order?.id) {
      onDelete(order.id);
      if (onClose) onClose();
    }
  };

  const handleClose = () => {
    onClose();
    setInputs(inputsInit);
    setMode("create");
  };

  const handleTogglePerson = (person: any) => {
    const exists = inputs.people.some((p: any) => p.id === person.id);

    setInputs((prev: any) => ({
      ...prev,
      people: exists
        ? prev.people.filter((p: any) => p.id !== person.id)
        : [...prev.people, person],
    }));
  };

  const handleSelectAll = () => {
    setInputs((prev: any) => ({
      ...prev,
      people: [...people],
    }));
  };

  const handleDeselectAll = () => {
    setInputs((prev: any) => ({
      ...prev,
      people: [],
    }));
  };

  const unselectedPeople = people.filter(
    (p: any) => !inputs.people.some((sel: any) => sel.id === p.id),
  );

  const isDisable = inputs.quantity <= 1;
  const subtotal = (inputs.price || 0) * (inputs.quantity || 0);

  useEffect(() => {
    if (order) {
      setInputs({
        name: order.name || "",
        quantity: order.quantity || 1,
        price: order.price || 0,
        people: Array.isArray(order.people) ? order.people : [],
      });
      setMode("edit");
    } else {
      setInputs(inputsInit || { name: "", quantity: 1, price: 0, people: [] });
      setMode("create");
    }
  }, [order]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-1">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Tag size={16} />
          </div>
          <h2 className="text-base font-bold text-zinc-800">
            {mode === "edit"
              ? "แก้ไขรายการค่าใช้จ่าย"
              : "เพิ่มรายการค่าใช้จ่าย"}
          </h2>
        </div>
        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            aria-label="ลบรายการ"
            className="flex cursor-pointer items-center justify-center rounded-xl p-2 text-rose-400 transition hover:bg-rose-50 hover:text-rose-500"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* กลุ่มรายละเอียดรายการ */}
      <div className="space-y-3 rounded-2xl bg-zinc-50/70 p-4 ring-1 ring-zinc-200/60">
        <label className="block">
          <p className="mb-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            ชื่อรายการ
          </p>
          <div className="relative flex items-center">
            <div className="pointer-events-none absolute left-3.5 text-zinc-400">
              <Tag size={16} />
            </div>
            <input
              name="name"
              type="text"
              autoComplete="off"
              required
              onChange={handleChange}
              value={inputs.name || ""}
              placeholder="เช่น ค่าอาหาร, ค่าน้ำมัน, ค่าที่พัก"
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pr-4 pl-10 text-sm font-medium text-zinc-800 transition outline-none placeholder:font-normal placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Quick Action Presets - ปรับสไตล์ให้เป็นปุ่มกดแอคชันด่วน */}
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-400">
                ⚡ เลือกรายการด่วน
              </span>
            </div>

            {/* สไลด์แนวนอนสไตล์ Quick Bar */}
            <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { label: "อาหาร", value: "ค่าอาหาร" },
                { label: "เครื่องดื่ม", value: "ค่าเครื่องดื่ม" },
                { label: "เดินทาง", value: "ค่าเดินทาง" },
                { label: "เติมน้ำมัน", value: "น้ำมัน" },
                { label: "ค่าที่พัก", value: "ที่พัก" },
                { label: "ของว่าง", value: "ขนม" },
              ].map((item) => {
                const isSelected = inputs.name === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleSelectQuickTag(item.value)}
                    className={`flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition active:scale-95 ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-zinc-100 text-zinc-600 hover:bg-indigo-50 hover:text-indigo-600 active:bg-zinc-200"
                    }`}
                  >
                    <Plus
                      size={12}
                      className={isSelected ? "text-white" : "text-zinc-400"}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <p className="mb-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              ราคาต่อหน่วย
            </p>
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute left-3.5 text-zinc-400">
                <Banknote size={16} />
              </div>
              <input
                name="price"
                type="number"
                autoComplete="off"
                required
                onChange={handleChange}
                value={inputs.price || ""}
                placeholder="0.00"
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pr-4 pl-10 text-sm font-medium text-zinc-800 transition outline-none placeholder:font-normal placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </label>

          <label className="block">
            <p className="mb-1.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              จำนวน
            </p>
            <div className="relative flex items-stretch overflow-hidden rounded-xl border border-zinc-200 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <div className="pointer-events-none flex items-center pl-3.5 text-zinc-400">
                <Hash size={16} />
              </div>
              <input
                name="quantity"
                type="number"
                autoComplete="off"
                required
                onChange={handleChange}
                value={inputs.quantity || ""}
                className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2.5 text-center text-sm font-semibold text-zinc-800 outline-none"
              />
              <div className="flex flex-col border-l border-zinc-200">
                <button
                  type="button"
                  onClick={(e) => handleCountClick(e, "increase")}
                  aria-label="เพิ่มจำนวน"
                  className="flex flex-1 cursor-pointer items-center justify-center px-3 text-zinc-500 transition hover:bg-zinc-100"
                >
                  <ChevronUp size={13} />
                </button>
                <button
                  type="button"
                  disabled={isDisable}
                  onClick={(e) => handleCountClick(e, "decrease")}
                  aria-label="ลดจำนวน"
                  className="flex flex-1 cursor-pointer items-center justify-center border-t border-zinc-200 px-3 text-zinc-500 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronDown size={13} />
                </button>
              </div>
            </div>
          </label>
        </div>

        {subtotal > 0 && (
          <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 ring-1 ring-zinc-200/50">
            <span className="text-xs font-medium text-zinc-400">
              ราคารวมรายการนี้
            </span>
            <span className="text-sm font-bold text-indigo-600">
              ฿{subtotal.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* กลุ่มคนหาร */}
      <div className="rounded-2xl bg-zinc-50/70 p-4 ring-1 ring-zinc-200/60">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-zinc-500" />
            <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              คนแชร์รายการนี้
            </p>
          </div>
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600">
            เลือกแล้ว {inputs.people.length} คน
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* ฝั่งยังไม่ได้เลือก */}
          <div className="flex min-w-0 flex-1 flex-col rounded-xl bg-white p-2.5 shadow-2xs ring-1 ring-zinc-200/80">
            <h3 className="mb-2 px-1 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
              ยังไม่ได้เลือก
            </h3>
            <div className="flex h-44 flex-col gap-1.5 overflow-y-auto pr-1">
              {unselectedPeople.length ? (
                unselectedPeople.map((p: any) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleTogglePerson(p)}
                    className="group flex cursor-pointer items-center justify-between rounded-lg bg-zinc-50 px-2.5 py-1.5 text-left text-xs text-zinc-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <UserAvatar name={p.name} />
                      <span className="truncate font-medium">{p.name}</span>
                    </div>
                    <Plus
                      size={14}
                      className="text-zinc-300 opacity-0 transition group-hover:text-indigo-500 group-hover:opacity-100"
                    />
                  </button>
                ))
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-xs text-zinc-300">เลือกครบทุกคนแล้ว</p>
                </div>
              )}
            </div>
          </div>

          {/* ปุ่มย้ายทั้งหมด (ตรงกลาง) */}
          <div className="flex shrink-0 flex-col gap-2">
            <button
              type="button"
              onClick={handleSelectAll}
              disabled={unselectedPeople.length === 0}
              aria-label="เลือกทั้งหมด"
              title="เลือกทั้งหมด"
              className="flex size-8 cursor-pointer items-center justify-center rounded-xl bg-white text-zinc-600 shadow-2xs ring-1 ring-zinc-200 transition hover:bg-indigo-50 hover:text-indigo-600 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronsRight size={16} />
            </button>
            <button
              type="button"
              onClick={handleDeselectAll}
              disabled={inputs.people.length === 0}
              aria-label="ยกเลิกทั้งหมด"
              title="ยกเลิกทั้งหมด"
              className="flex size-8 cursor-pointer items-center justify-center rounded-xl bg-white text-zinc-600 shadow-2xs ring-1 ring-zinc-200 transition hover:bg-rose-50 hover:text-rose-600 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronsLeft size={16} />
            </button>
          </div>

          {/* ฝั่งเลือกแล้ว */}
          <div className="flex min-w-0 flex-1 flex-col rounded-xl bg-indigo-50/40 p-2.5 shadow-2xs ring-1 ring-indigo-100">
            <h3 className="mb-2 px-1 text-[11px] font-semibold tracking-wider text-indigo-600 uppercase">
              เลือกแล้ว
            </h3>
            <div className="flex h-44 flex-col gap-1.5 overflow-y-auto pr-1">
              {inputs.people.length ? (
                inputs.people.map((p: any) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleTogglePerson(p)}
                    className="flex cursor-pointer items-center justify-between rounded-lg bg-indigo-100/70 px-2.5 py-1.5 text-left text-xs text-indigo-900 transition hover:bg-rose-100/80 hover:text-rose-700"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-2xs ${colorFromName(
                          p.name,
                        )}`}
                      >
                        {p.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="truncate font-medium">{p.name}</span>
                    </div>
                    <Check
                      size={14}
                      className="ml-1 shrink-0 text-indigo-600"
                    />
                  </button>
                ))
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-xs text-zinc-400">
                    แตะชื่อทางซ้ายเพื่อเลือก
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-2">
        <button
          type="button"
          onClick={handleClose}
          className="cursor-pointer rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-500 transition hover:bg-zinc-100"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
        >
          {mode === "edit" ? "บันทึกการแก้ไข" : "เพิ่มรายการ"}
        </button>
      </div>
    </form>
  );
}
