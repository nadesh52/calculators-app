"use client";
import { useEffect, useMemo, useState } from "react";
import { ReceiptText } from "lucide-react";
import { Modal } from "@/components";
import { useOrder } from "@/features/sharebill/contexts";
import OrderForm from "./OrderForm";
import OrderCard from "./OrderCard";

export default function OrderList() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { order, setOrder } = useOrder();

  const handleEdit = (updated: any) => {
    const total =
      (Number(updated.price) || 0) * (Number(updated.quantity) || 0);

    const peopleList = Array.isArray(updated.people) ? updated.people : [];
    const price = peopleList.length > 0 ? total / peopleList.length : 0;

    const newOrder = {
      ...updated,
      people: peopleList,
      total: total,
      price_per_people: price,
    };

    setOrder((prev: any) => {
      const updatedOrders = prev.map((o: any) =>
        o.id !== newOrder.id ? o : newOrder,
      );
      localStorage.setItem("order", JSON.stringify(updatedOrders));
      return updatedOrders;
    });

    handleClose();
  };

  const handleDelete = (id: string) => {
    setOrder((prevOrders: any) => {
      const updatedOrders = prevOrders.filter((order: any) => order.id !== id);
      localStorage.setItem("order", JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const grandTotal = useMemo(
    () => order?.reduce((sum: number, o: any) => sum + (o.total || 0), 0) ?? 0,
    [order],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <OrderForm
          onSubmit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
          order={selectedOrder}
        />
      </Modal>

      <section className="w-full space-y-3">
        {/* Header ส่วนสรุปรายการ */}
        <div className="flex items-baseline justify-between px-1">
          <p className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
            รายการค่าใช้จ่ายทั้งหมด
          </p>
          {mounted && order?.length ? (
            <p className="text-xs text-zinc-500">
              {order.length} รายการ · ยอดรวม{" "}
              <span className="font-bold text-indigo-600">
                {grandTotal.toLocaleString()}
              </span>
            </p>
          ) : null}
        </div>

        {/* รายการ Card / Empty State */}
        <ul className="space-y-2.5">
          {order?.length ? (
            order.map((o: any) => (
              <li
                key={o.id}
                className="rounded-2xl border border-zinc-200/80 bg-white px-4 py-3.5 shadow-xs transition hover:border-indigo-200 hover:shadow-md"
              >
                <OrderCard
                  o={o}
                  onOpen={() => {
                    setSelectedOrder(o);
                    setOpen(true);
                  }}
                />
              </li>
            ))
          ) : (
            <li className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 py-12 text-center">
              <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400">
                <ReceiptText size={20} />
              </div>
              <p className="text-xs font-bold text-zinc-600">
                ยังไม่มีรายการค่าใช้จ่าย
              </p>
              <p className="text-[11px] text-zinc-400">
                เพิ่มรายการค่าใช้จ่ายเพื่อเริ่มคำนวณสรุปยอดหาร
              </p>
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
