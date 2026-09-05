"use client";
import { useOrder, usePeople } from "@/features/sharebill/contexts";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Receipt,
  Users,
  X,
} from "lucide-react";
import { colorFromName } from "@/utils";

const FILTERS = [
  { key: "all", label: "ทั้งหมด" },
  { key: "paid", label: "จ่ายแล้ว" },
  { key: "unpaid", label: "ยังไม่จ่าย" },
] as const;

const PREVIEW_LIMIT = 2; // จำนวนรายการที่แสดงตอนพับ

export function SummaryTab() {
  const { people } = usePeople();
  const { order } = useOrder();
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [paidPeople, setPaidPeople] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("paidPeople");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [filterMode, setFilterMode] = useState<"all" | "paid" | "unpaid">(
    "all",
  );
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  const filteredPeople = people
    .map((person: any) => {
      const filteredOrders = order.filter((o: any) =>
        o.people.find((op: any) => op.id === person.id),
      );

      const total = filteredOrders.reduce((prev: any, content: any) => {
        return prev + parseFloat(content.price_per_people);
      }, 0);

      return {
        id: person.id,
        name: person.name,
        orders: filteredOrders,
        total,
      };
    })
    .filter((person: any) => person.total > 0);

  const totalPeopleCount = people.length;
  const eatersCount = filteredPeople.length;
  const nonEatersCount = totalPeopleCount - eatersCount;
  const paidCount = filteredPeople.filter((p: any) =>
    paidPeople.includes(p.id),
  ).length;

  useEffect(() => {
    localStorage.setItem("paidPeople", JSON.stringify(paidPeople));
  }, [paidPeople]);

  useEffect(() => {
    setPaidPeople((prevPaid) =>
      prevPaid.filter((id) => people.some((p: any) => p.id === id)),
    );
    setSelectedPersonId((prev) =>
      prev && !people.some((p: any) => p.id === prev) ? null : prev,
    );
  }, [people]);

  const handleTogglePaid = (id: string) => {
    setPaidPeople((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id],
    );
  };

  const handleSelectPerson = (id: string) => {
    setSelectedPersonId((prev) => (prev === id ? null : id));
  };

  const displayedPeople = filteredPeople
    .filter((person: any) => {
      if (filterMode === "paid") return paidPeople.includes(person.id);
      if (filterMode === "unpaid") return !paidPeople.includes(person.id);
      return true;
    })
    .filter((person: any) =>
      selectedPersonId ? person.id === selectedPersonId : true,
    );

  const totalAmount = order.reduce(
    (sum: number, o: any) => sum + (o.total || 0),
    0,
  );
  const collectedAmount = filteredPeople
    .filter((p: any) => paidPeople.includes(p.id))
    .reduce((sum: number, p: any) => sum + p.total, 0);
  const outstandingAmount = totalAmount - collectedAmount;

  const unpaidPeople = filteredPeople.filter(
    (p: any) => !paidPeople.includes(p.id),
  );

  const selectedPerson = selectedPersonId
    ? filteredPeople.find((p: any) => p.id === selectedPersonId)
    : null;

  const hasMoreOrders = order.length > PREVIEW_LIMIT;

  console.log("PEOPLE", people);
  console.log("ORDER", order);

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 p-4 sm:max-w-2xl">
      {order.length > 0 && (
        <div className="mb-5 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          {/* สถิติจำนวนคน */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium text-zinc-600">
            <div className="flex items-center gap-1.5">
              <Users size={15} className="text-zinc-400" />
              <span className="text-zinc-400">กินด้วยกัน {eatersCount} คน</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-600">
                จ่ายแล้ว {paidCount}/{eatersCount}
              </span>
              {nonEatersCount > 0 && (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-500">
                  ไม่ได้กิน {nonEatersCount} คน
                </span>
              )}
            </div>
          </div>

          {/* รายการแบบใบเสร็จ แบบกางออกอย่างสมูท */}
          <div className="mt-2.5 border-y border-dashed border-zinc-200 py-2">
            <div className="space-y-1.5 px-1">
              {/* 3 รายการแรก (แสดงเสมอ) */}
              {order.slice(0, PREVIEW_LIMIT).map((o: any) => (
                <div
                  key={o.id}
                  className="flex items-baseline justify-between gap-3 text-xs text-zinc-500"
                >
                  {/* ฝั่งซ้าย: ชื่อเมนูอย่างเดียว */}
                  <span className="truncate">{o.name}</span>

                  {/* ฝั่งขวา: (ชิ้นละ ฿...) + xจำนวน + ราคารวม */}
                  <div className="flex shrink-0 items-baseline gap-3">
                    <span className="font-mono text-zinc-400">
                      {o.price_per_unit || o.price || 0}
                    </span>
                    <span className="text-zinc-400">x{o.quantity}</span>
                    <span className="min-w-14 text-right font-mono tabular-nums">
                      {o.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* รายการที่เหลือ ซ่อน/กางออกด้วย CSS Grid Smooth Transition */}
            {hasMoreOrders && (
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  showAllOrders
                    ? "mt-1.5 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="max-h-37 scrollbar-thin space-y-1.5 overflow-y-auto px-1">
                    {order.slice(PREVIEW_LIMIT).map((o: any) => (
                      <div
                        key={o.id}
                        className="flex items-baseline justify-between gap-3 text-xs text-zinc-500"
                      >
                        {/* ฝั่งซ้าย: ชื่อเมนูอย่างเดียว */}
                        <span className="truncate">{o.name}</span>

                        {/* ฝั่งขวา: (ชิ้นละ ฿...) + xจำนวน + ราคารวม */}
                        <div className="flex shrink-0 items-baseline gap-3">
                          <span className="font-mono text-zinc-400">
                            {o.price_per_unit || o.price || 0}
                          </span>
                          <span className="text-zinc-400">x{o.quantity}</span>
                          <span className="min-w-14 text-right font-mono tabular-nums">
                            {o.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ปุ่มกด ซ่อน/แสดง */}
            {hasMoreOrders && (
              <button
                type="button"
                onClick={() => setShowAllOrders(!showAllOrders)}
                className="mt-2.5 flex w-full items-center justify-center gap-1 text-xs font-medium text-zinc-400 transition hover:text-zinc-500"
              >
                {showAllOrders ? (
                  <>
                    <span>ซ่อนรายการ</span>
                    <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    <span>ดูทั้งหมด ({order.length} รายการ)</span>
                    <ChevronDown size={14} />
                  </>
                )}
              </button>
            )}
          </div>

          {/* ยอดรวม / ได้รับแล้ว / ค้างชำระ */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xl font-semibold text-zinc-800">
                {totalAmount}
              </p>
              <p className="text-xs text-zinc-400">ยอดรวม</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-emerald-600">
                {collectedAmount}
              </p>
              <p className="text-xs text-zinc-400">จ่ายมาแล้ว</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-rose-500">
                {outstandingAmount}
              </p>
              <p className="text-xs text-zinc-400">ค้างชำระ</p>
            </div>
          </div>

          {/* คนที่ยังจ่ายไม่ครบ */}
          {unpaidPeople.length > 0 && (
            <div className="mt-3 flex flex-col gap-2 overflow-x-auto border-t border-zinc-100 py-0.5 pt-3">
              <span className="shrink-0 text-xs text-zinc-400">
                คนที่ค้างจ่าย
              </span>
              <div className="flex flex-wrap gap-2">
                {unpaidPeople.map((p: any) => (
                  <button
                    key={p.id}
                    type="button"
                    title={`ดูเฉพาะ ${p.name}`}
                    onClick={() => handleSelectPerson(p.id)}
                    className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold text-white ring-2 transition hover:scale-105 ${colorFromName(
                      p.name,
                    )} ${
                      selectedPersonId === p.id
                        ? "ring-violet-400"
                        : "ring-white"
                    }`}
                  >
                    {p.name.charAt(0).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilterMode(key)}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              filterMode === key
                ? "bg-linear-to-br from-violet-600 to-fuchsia-500 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}

        {selectedPerson && (
          <button
            onClick={() => setSelectedPersonId(null)}
            className="flex items-center gap-1 rounded-full bg-violet-50 py-1.5 pr-2 pl-3 text-sm font-medium text-violet-600 transition hover:bg-violet-100"
          >
            เฉพาะ {selectedPerson.name}
            <X size={14} />
          </button>
        )}
      </div>

      {/* Person Cards */}
      {displayedPeople.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {displayedPeople.map((person: any) => {
            const isPaid = paidPeople.includes(person.id);

            return (
              <div
                key={person.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${colorFromName(
                      person.name,
                    )}`}
                  >
                    {person.name.charAt(0).toUpperCase()}
                  </span>
                  <h2 className="grow truncate text-base font-semibold text-zinc-800">
                    {person.name}
                  </h2>
                  <button
                    onClick={() => handleTogglePaid(person.id)}
                    className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition ${
                      isPaid
                        ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        : "bg-rose-50 text-rose-500 hover:bg-rose-100"
                    }`}
                  >
                    {isPaid && <CheckCircle2 size={13} />}
                    {isPaid ? "จ่ายแล้ว" : "ทำเครื่องหมายจ่าย"}
                  </button>
                </div>

                <div className="mt-3 space-y-1.5 border-t border-dashed border-zinc-100 pt-3">
                  {person.orders.length ? (
                    person.orders.map((o: any) => (
                      <div
                        key={o.id}
                        className="flex items-center justify-between gap-2 text-sm"
                      >
                        <span className="truncate text-zinc-600">
                          {o.name}
                          <span className="ml-1 text-xs text-zinc-400">
                            x{o.quantity}
                          </span>
                        </span>
                        <span className="shrink-0 text-zinc-700">
                          ฿{o.price_per_people}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-300">ยังไม่มีออเดอร์</p>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3">
                  <p className="text-sm font-medium text-zinc-600">ยอดรวม</p>
                  <p className="text-base font-semibold text-violet-600">
                    ฿{person.total}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-200 py-10 text-center">
          <Receipt size={22} className="text-zinc-300" />
          <p className="text-sm text-zinc-400">ไม่พบรายการในหมวดนี้</p>
        </div>
      )}
    </section>
  );
}
