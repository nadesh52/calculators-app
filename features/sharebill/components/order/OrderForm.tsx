"use client";
import { useEffect, useState } from "react";
import { usePeople } from "@/features/sharebill/contexts";
import { UserAvatar } from "@/components";
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
import { initOrder, QUICKBAR_MENU } from "../../constants";
import { Input } from "@/components/ui";

export default function OrderForm({ onClose, onSubmit, order, onDelete }: any) {
  const { people } = usePeople();
  const [orders, setOrders] = useState<any>(initOrder);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload =
      mode === "edit" && order ? { ...orders, id: order.id } : orders;

    onSubmit(payload);

    if (onClose) handleClose();
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "price" || name === "quantity") {
      const numValue = value === "" ? "" : parseFloat(value);
      setOrders((prev: any) => ({
        ...prev,
        [name]: numValue,
      }));
    } else {
      setOrders((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ฟังก์ชันสำหรับเลือกชื่อรายการจาก Tag ไวๆ
  const handleSelectQuickTag = (tagName: string) => {
    setOrders((prev: any) => ({
      ...prev,
      name: tagName,
    }));
  };

  const handleCountClick = (event: any, type: any) => {
    event.preventDefault();

    if (type === "increase") {
      setOrders({ ...orders, quantity: (orders.quantity || 0) + 1 });
    } else if (type === "decrease" && orders.quantity > 1) {
      setOrders({ ...orders, quantity: orders.quantity - 1 });
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
    setOrders(initOrder);
    setMode("create");
  };

  const handleTogglePerson = (person: any) => {
    const exists = orders.people.some((p: any) => p.id === person.id);

    setOrders((prev: any) => ({
      ...prev,
      people: exists
        ? prev.people.filter((p: any) => p.id !== person.id)
        : [...prev.people, person],
    }));
  };

  const handleSelectAll = () => {
    setOrders((prev: any) => ({
      ...prev,
      people: [...people],
    }));
  };

  const handleDeselectAll = () => {
    setOrders((prev: any) => ({
      ...prev,
      people: [],
    }));
  };

  const unselectedPeople = people.filter(
    (p: any) => !orders.people.some((sel: any) => sel.id === p.id),
  );

  const isDisable = orders.quantity <= 1;
  const subtotal = (orders.price || 0) * (orders.quantity || 0);

  useEffect(() => {
    if (order) {
      setOrders({
        name: order.name || "",
        quantity: order.quantity || 1,
        price: order.price || 0,
        people: Array.isArray(order.people) ? order.people : [],
      });
      setMode("edit");
    } else {
      setOrders(initOrder || { name: "", quantity: 1, price: 0, people: [] });
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
          <Input
            label="ชื่อรายการ"
            name="name"
            type="text"
            autoComplete="off"
            required
            value={orders.name || ""}
            onChange={handleChange}
            placeholder="ค่าอาหาร, ค่าน้ำมัน, ค่าที่พัก"
            leftIcon={<Tag size={16} />}
            className="text-left"
          />

          {/* Quick Action Presets - ปรับสไตล์ให้เป็นปุ่มกดแอคชันด่วน */}
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">
                ⚡ เลือกรายการด่วน
              </span>
            </div>

            {/* สไลด์แนวนอนสไตล์ Quick Bar */}
            <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1">
              {QUICKBAR_MENU.map((item) => {
                const isSelected = orders.name === item.value;
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
          <Input
            label="ราคาต่อหน่วย"
            name="price"
            type="number"
            autoComplete="off"
            required
            onChange={handleChange}
            value={orders.price || ""}
            placeholder="0.00"
            leftIcon={<Banknote size={16} />}
            className="text-center"
          />

          <Input
            label="จำนวน"
            name="quantity"
            type="number"
            autoComplete="off"
            required
            onChange={handleChange}
            value={orders.quantity || ""}
            placeholder="1"
            leftIcon={<Hash size={16} />}
            className="text-center"
            rightContent={
              <div className="flex flex-col border-l border-zinc-200">
                <button
                  type="button"
                  onClick={(e) => handleCountClick(e, "increase")}
                  aria-label="เพิ่มจำนวน"
                  className="flex flex-1 cursor-pointer items-center justify-center px-3 text-zinc-500 transition hover:bg-zinc-100"
                >
                  <ChevronUp size={16} />
                </button>

                <button
                  type="button"
                  disabled={isDisable}
                  onClick={(e) => handleCountClick(e, "decrease")}
                  aria-label="ลดจำนวน"
                  className="flex flex-1 cursor-pointer items-center justify-center border-t border-zinc-200 px-3 text-zinc-500 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            }
          />
        </div>

        {subtotal > 0 && (
          <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 ring-1 ring-zinc-200/50">
            <span className="text-xs font-medium text-zinc-400">
              ราคารวมรายการนี้
            </span>
            <span className="text-sm font-bold text-indigo-600">
              {subtotal.toLocaleString()}
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
            เลือกแล้ว {orders.people.length} คน
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
                  <p className="text-xs text-zinc-300">ไม่มีรายชื่อให้เลือก</p>
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
              disabled={orders.people.length === 0}
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
              {orders.people.length ? (
                orders.people.map((person: any) => (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => handleTogglePerson(person)}
                    className="flex cursor-pointer items-center justify-between rounded-lg bg-indigo-100/70 px-2.5 py-1.5 text-left text-xs text-indigo-900 transition hover:bg-rose-100/80 hover:text-rose-700"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <UserAvatar name={person.name} />
                      <span className="truncate font-medium">
                        {person.name}
                      </span>
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
