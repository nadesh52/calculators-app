"use client";
import { useState } from "react";
import { useOrder } from "@/features/sharebill/contexts";
import { Modal } from "@/components";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import OrderForm from "./OrderForm";

export default function OrderCreate() {
  const [open, setOpen] = useState<boolean>(false);
  const { setOrder } = useOrder();

  const handleSubmit = (order: any) => {
    const total = (Number(order.price) || 0) * (Number(order.quantity) || 0);
    const peopleList = Array.isArray(order.people) ? order.people : [];
    const price = peopleList.length > 0 ? total / peopleList.length : 0;

    const newOrder = {
      ...order,
      id: uuidv4(),
      people: peopleList,
      total: total,
      price_per_people: price,
    };

    setOrder((prev: any) => {
      const updated = [...prev, newOrder];
      localStorage.setItem("order", JSON.stringify(updated));
      return updated;
    });
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <OrderForm onSubmit={handleSubmit} onClose={() => setOpen(false)} />
      </Modal>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 hover:shadow-md active:scale-95"
      >
        <Plus size={16} />
        <span>เพิ่มรายการค่าใช้จ่าย</span>
      </button>
    </>
  );
}
