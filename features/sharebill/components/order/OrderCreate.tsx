"use client";
import { useState } from "react";
import { OrderForm } from "./OrderForm";
import { useOrder } from "@/features/sharebill/contexts";
import { Modal } from "@/shared";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export function OrderCreate() {
  const [open, setOpen] = useState<boolean>(false);
  const { setOrder } = useOrder();

  const handleSubmit = (order: any) => {
    const total = order.price * order.quantity;
    const price = order.people.length > 0 ? total / order.people.length : 0;

    const newOrder = {
      ...order,
      id: uuidv4(),
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
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:shadow-md active:scale-95"
      >
        <Plus size={16} />
        Add New Order
      </button>
    </>
  );
}
