import { UserAvatar } from "@/components";
import { toDecimal } from "@/utils";
import { CheckCircle2, Circle, Receipt, UtensilsCrossed } from "lucide-react";
import React from "react";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price_per_people: number;
}

export interface PersonSummary {
  id: string;
  name: string;
  total: number;
  orders: OrderItem[];
}

export interface SummaryCardProps {
  displayedPeople: PersonSummary[];
  paidPeople: string[]; // เก็บ id ของคนที่จ่ายแล้ว
  handleTogglePaid: (personId: string) => void;
  colorFromName?: (name: string) => string;
}

export default function SummaryCard({
  displayedPeople = [],
  paidPeople = [],
  handleTogglePaid,
}: SummaryCardProps) {
  if (displayedPeople.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200/90 bg-zinc-50/50 py-12 text-center">
        <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
          <Receipt size={20} />
        </div>
        <p className="text-sm font-semibold text-zinc-600">ไม่พบรายการ</p>
        <p className="text-xs text-zinc-400">
          ไม่มีข้อมูลผู้ร่วมแชร์ในหมวดหมู่หรือเงื่อนไขที่เลือก
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      {displayedPeople.map((person) => {
        const isPaid = paidPeople.includes(person.id);

        return (
          <div
            key={person.id}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-200 ${
              isPaid
                ? "border-emerald-200/70 bg-emerald-50/10 shadow-2xs"
                : "border-zinc-200/80 bg-white shadow-xs hover:border-indigo-200"
            }`}
          >
            {/* ส่วนหัวการ์ด (Avatar + ชื่อ + ปุ่มสถานะ) */}
            <div className="p-3.5 pb-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <UserAvatar name={person.name} />
                  <h3 className="truncate text-sm font-bold text-zinc-800">
                    {person.name}
                  </h3>
                </div>

                {/* ปุ่มสลับสถานะการชำระเงิน */}
                <button
                  type="button"
                  onClick={() => handleTogglePaid(person.id)}
                  className={`flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition active:scale-95 ${
                    isPaid
                      ? "bg-emerald-100/80 text-emerald-700 hover:bg-emerald-200/80"
                      : "bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100/80"
                  }`}
                >
                  {isPaid ? (
                    <>
                      <CheckCircle2 size={13} className="shrink-0 text-emerald-600" />
                      <span>จ่ายแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Circle size={13} className="shrink-0 text-rose-400" />
                      <span>ทำเครื่องหมายจ่าย</span>
                    </>
                  )}
                </button>
              </div>

              {/* รายการอาหาร/ค่าใช้จ่าย */}
              <div className="mt-3 space-y-1.5 border-t border-dashed border-zinc-100 pt-2.5">
                {person.orders && person.orders.length > 0 ? (
                  person.orders.map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="size-1 rounded-full bg-zinc-300 shrink-0" />
                        <span className="truncate text-zinc-600 font-medium">
                          {o.name}
                        </span>
                        <span className="rounded-md bg-zinc-100 px-1 py-0.2 text-[10px] font-bold text-zinc-400">
                          x{o.quantity}
                        </span>
                      </div>
                      <span className="shrink-0 font-mono font-medium text-zinc-700 tabular-nums">
                        ฿{toDecimal(o.price_per_people)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 py-1">
                    <UtensilsCrossed size={12} className="text-zinc-300" />
                    <span>ไม่ได้สั่งรายการใดๆ</span>
                  </div>
                )}
              </div>
            </div>

            {/* ส่วนท้ายการ์ด (ยอดรวมส่วนบุคคล) */}
            <div
              className={`flex items-center justify-between border-t px-3.5 py-2.5 ${
                isPaid
                  ? "border-emerald-100/80 bg-emerald-50/40"
                  : "border-zinc-100 bg-zinc-50/50"
              }`}
            >
              <span className="text-xs font-semibold text-zinc-500">
                ยอดที่ต้องจ่าย
              </span>
              <span
                className={`font-mono text-sm font-extrabold tabular-nums ${
                  isPaid ? "text-emerald-600" : "text-indigo-600"
                }`}
              >
                ฿{toDecimal(person.total)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}