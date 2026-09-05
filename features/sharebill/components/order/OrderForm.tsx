"use client";
import { useEffect, useState } from "react";
import { usePeople } from "@/features/sharebill/contexts";
import { ArrowLeftRight, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { colorFromName } from "@/utils";

const inputsInit = { name: "", price: 0, quantity: 1, people: [] };

export function OrderForm({ onClose, onSubmit, order, onDelete }: any) {
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
      // ป้องกันค่า NaN กรณีผู้ใช้ลบตัวเลขจนว่างเปล่า
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

  const handleCountClick = (event: any, type: any) => {
    event.preventDefault();

    if (type === "increase") {
      setInputs({ ...inputs, quantity: inputs.quantity + 1 });
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
        people: Array.isArray(order.people) ? order.people : [], // ✅ รับประกันว่าเป็น Array เสมอ
      });
      setMode("edit");
    } else {
      setInputs(inputsInit || { name: "", quantity: 1, price: 0, people: [] });
      setMode("create");
    }
  }, [order]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-800">
          {mode === "edit" ? "แก้ไขออเดอร์" : "เพิ่มออเดอร์ใหม่"}
        </h2>
        {mode === "edit" && (
          <button
            type="button"
            onClick={handleDelete}
            aria-label="ลบออเดอร์"
            className="flex items-center justify-center rounded-lg p-2 text-rose-400 transition hover:bg-rose-50 hover:text-rose-500"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* กลุ่มรายละเอียดเมนู */}
      <div className="space-y-3 rounded-2xl bg-zinc-50 p-4">
        <label className="block">
          <p className="mb-1.5 text-sm font-medium text-zinc-600">เมนู</p>
          <input
            name="name"
            type="text"
            autoComplete="off"
            required
            onChange={handleChange}
            value={inputs.name || ""}
            placeholder="เช่น ข้าวผัดกะเพรา"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <p className="mb-1.5 text-sm font-medium text-zinc-600">ราคา</p>
            <input
              name="price"
              type="number"
              autoComplete="off"
              required
              onChange={handleChange}
              value={inputs.price || ""}
              placeholder="0"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 transition outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </label>

          <label className="block">
            <p className="mb-1.5 text-sm font-medium text-zinc-600">จำนวน</p>
            <div className="flex items-stretch overflow-hidden rounded-xl border border-zinc-200 bg-white focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
              <input
                name="quantity"
                type="number"
                autoComplete="off"
                required
                onChange={handleChange}
                value={inputs.quantity || ""}
                className="min-w-0 flex-1 border-0 bg-transparent px-4 py-2.5 text-center text-sm text-zinc-900 outline-none"
              />
              <div className="flex flex-col border-l border-zinc-200">
                <button
                  type="button"
                  onClick={(e) => handleCountClick(e, "increase")}
                  aria-label="เพิ่มจำนวน"
                  className="flex flex-1 items-center justify-center px-4 text-zinc-500 transition hover:bg-zinc-100"
                >
                  <ChevronUp size={13} />
                </button>
                <button
                  type="button"
                  disabled={isDisable}
                  onClick={(e) => handleCountClick(e, "decrease")}
                  aria-label="ลดจำนวน"
                  className="flex flex-1 items-center justify-center border-t border-zinc-200 px-2 text-zinc-500 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronDown size={13} />
                </button>
              </div>
            </div>
          </label>
        </div>

        {subtotal > 0 && (
          <p className="text-right text-xs text-zinc-400">
            รวม <span className="font-medium text-zinc-600">฿{subtotal}</span>
          </p>
        )}
      </div>

      {/* กลุ่มคนกิน */}
      <div className="rounded-2xl bg-zinc-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-600">ใครกินบ้าง</p>
          <span className="text-xs text-zinc-400">
            เลือกแล้ว {inputs.people.length} คน
          </span>
        </div>

        <div className="flex items-stretch gap-2">
          <div className="flex min-w-0 flex-1 flex-col rounded-xl bg-white p-3 ring-1 ring-zinc-200">
            <h3 className="mb-2 text-xs font-medium text-zinc-400">
              ยังไม่ได้เลือก
            </h3>
            <div className="flex h-40 flex-col gap-1.5 overflow-y-auto pr-1">
              {unselectedPeople.length ? (
                unselectedPeople.map((p: any) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleTogglePerson(p)}
                    className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2.5 py-2 text-left text-sm text-zinc-600 transition hover:bg-zinc-100"
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${colorFromName(
                        p.name,
                      )}`}
                    >
                      {p.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="wrap-break-words">{p.name}</span>
                  </button>
                ))
              ) : (
                <p className="mt-2 text-xs text-zinc-300">เลือกครบทุกคนแล้ว</p>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center text-zinc-300">
            <ArrowLeftRight size={16} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col rounded-xl bg-emerald-50/60 p-3 ring-1 ring-emerald-200">
            <h3 className="mb-2 text-xs font-medium text-emerald-600">
              เลือกแล้ว
            </h3>
            <div className="flex h-40 flex-col gap-1.5 overflow-y-auto pr-1">
              {inputs.people.length ? (
                inputs.people.map((p: any) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleTogglePerson(p)}
                    className="flex items-center gap-2 rounded-lg bg-emerald-100 px-2.5 py-2 text-left text-sm text-emerald-700 transition hover:bg-emerald-200"
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${colorFromName(
                        p.name,
                      )}`}
                    >
                      {p.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="wrap-break-words">{p.name}</span>
                  </button>
                ))
              ) : (
                <p className="mt-2 text-xs text-zinc-300">
                  แตะชื่อทางซ้ายเพื่อเลือก
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={handleClose}
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-rose-500 transition hover:bg-rose-50"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:shadow-md active:scale-95"
        >
          {mode === "edit" ? "บันทึกการแก้ไข" : "เพิ่มออเดอร์"}
        </button>
      </div>
    </form>
  );
}
