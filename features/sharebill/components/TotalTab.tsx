"use client";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "../../../shared/Modal";
import { useOrder } from "@/features/sharebill/contexts";
import { OrderForm } from "./order/OrderForm";
import { OrderCard } from "./order/OrderCard";
import { Receipt } from "lucide-react";

export function TotalTab() {
  const [mounted, setMounted] = useState(false);
  const { order, setOrder } = useOrder();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleEdit = (updated: any) => {
    const total =
      (Number(updated.price) || 0) * (Number(updated.quantity) || 0);

    // ✅ เปลี่ยนจาก order.people เป็น updated.people
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

    handleClose(); // ปิด modal และเคลียร์ selectedOrder
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

  // 💡 ถ้ายอดรวม/จำนวนรายการกำลังคำนวณอยู่ ให้ Render ว่างเปล่าฝั่ง SSR ไปก่อน
  if (!mounted) {
    return null; // หรือจะ return สเกเลตันบางๆ แทนได้ครับ
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

      <section className="w-full">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="text-sm font-semibold text-zinc-800">ออเดอร์ทั้งหมด</p>
          {mounted && order?.length ? (
            <p className="text-xs text-zinc-500">
              {order.length} รายการ · รวม{" "}
              <span className="font-semibold text-violet-600">
                ฿{grandTotal}
              </span>
            </p>
          ) : null}
        </div>

        <ul className="space-y-3">
          {order?.length ? (
            order.map((o: any) => (
              <li
                key={o.id}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
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
            <li className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-200 py-10 text-center">
              <Receipt size={22} className="text-zinc-300" />
              <p className="text-sm text-zinc-400">ยังไม่มีออเดอร์</p>
              <p className="text-xs text-zinc-300">
                กดปุ่มเพิ่มออเดอร์ด้านบนเพื่อเริ่มต้น
              </p>
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
