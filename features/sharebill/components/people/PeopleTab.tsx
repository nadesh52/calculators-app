"use client";
import { useRef, useState } from "react";
import { usePeople, useOrder } from "@/features/sharebill/contexts";
import { Trash, UserPlus, Users } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { colorFromName } from "@/utils";

export function PeopleTab() {
  const { people, setPeople } = usePeople();
  const { order, setOrder } = useOrder();
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (isDisable) return;

    const newP = {
      id: uuidv4(),
      name: query,
    };

    setPeople((prev: any) => {
      const updated = [...prev, newP];
      localStorage.setItem("people", JSON.stringify(updated));
      return updated;
    });

    setQuery("");
    inputRef.current?.focus();
  };

  const handleDelete = (id: string) => {
    // 1. ลบคนออกจากรายการคน (People)
    const updatedPeople = people.filter((p: any) => p.id !== id);
    setPeople(updatedPeople);
    localStorage.setItem("people", JSON.stringify(updatedPeople));

    // 2. ลบคนที่ถูกลบออกจากทุกรายการอาหาร (Order) และคำนวณราคาหารใหม่
    const updatedOrders = order.map((o: any) => {
      const filteredPeopleInOrder = o.people.filter((p: any) => p.id !== id);
      const newPricePerPeople =
        filteredPeopleInOrder.length > 0
          ? o.total / filteredPeopleInOrder.length
          : 0;

      return {
        ...o,
        people: filteredPeopleInOrder,
        price_per_people: newPricePerPeople,
      };
    });

    setOrder(updatedOrders);
    localStorage.setItem("order", JSON.stringify(updatedOrders));

    // 3. ลบ ID คนนี้ออกจากลิสต์ "คนที่จ่ายเงินแล้ว"
    const savedPaidPeople = localStorage.getItem("paidPeople");
    if (savedPaidPeople) {
      try {
        const paidPeopleArr = JSON.parse(savedPaidPeople);
        const updatedPaidPeople = paidPeopleArr.filter(
          (paidId: string) => paidId !== id,
        );
        localStorage.setItem("paidPeople", JSON.stringify(updatedPaidPeople));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // ✅ ฟังก์ชัน Clear All ที่ถูกต้อง
  const handleClearAll = () => {
    // 1. ล้าง People ทั้งใน State และ LocalStorage
    setPeople([]);
    localStorage.setItem("people", JSON.stringify([]));

    // 2. ล้างคนที่ผูกใน Order ออกทั้งหมด
    const resetOrders = order.map((o: any) => ({
      ...o,
      people: [],
      price_per_people: 0,
    }));
    setOrder(resetOrders);
    localStorage.setItem("order", JSON.stringify(resetOrders));

    // 3. ล้างรายชื่อคนที่จ่ายเงินแล้ว
    localStorage.setItem("paidPeople", JSON.stringify([]));

    inputRef.current?.focus();
  };

  const isDisable =
    !query?.trim() ||
    people.filter((p: any) => {
      return (
        p?.name.toLocaleLowerCase()?.trim() ===
        query?.toLocaleLowerCase()?.trim()
      );
    })?.length !== 0;

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 p-4 sm:max-w-2xl">
      {/* Add new person */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="mb-3 text-sm font-semibold text-zinc-800">
          Add new person
        </p>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="Enter a name"
            className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 transition outline-none placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisable) {
                handleAdd(e);
              }
            }}
          />
          <button
            disabled={isDisable}
            onClick={handleAdd}
            aria-label="Add person"
            className="flex shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-500 px-4 text-white shadow-sm transition hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:from-zinc-300 disabled:to-zinc-300 disabled:shadow-none"
          >
            <UserPlus size={20} />
          </button>
        </div>
      </div>

      {/* People list */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 pt-4 sm:px-5">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-zinc-800">People added</p>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500">
              {people?.length ?? 0}
            </span>
          </div>
          {people?.length > 0 && (
            <button
              onClick={handleClearAll}
              className="cursor-pointer text-xs font-medium text-rose-500 transition hover:text-rose-600"
            >
              Clear all
            </button>
          )}
        </div>

        <ul className="mt-2 divide-y divide-zinc-100 px-2 pb-2 sm:px-3">
          {people?.length ? (
            people.map((p: any) => (
              <li
                key={p.id}
                className="group flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 transition hover:bg-zinc-50"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${colorFromName(
                      p.name,
                    )}`}
                  >
                    {p.name.charAt(0).toUpperCase()}
                  </span>
                  <p className="truncate text-sm text-zinc-800">{p.name}</p>
                </div>
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleDelete(p.id)}
                  aria-label={`Remove ${p.name}`}
                  className="shrink-0 rounded-lg p-1.5 text-zinc-400 opacity-100 transition hover:bg-rose-50 hover:text-rose-500 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Trash size={16} />
                </button>
              </li>
            ))
          ) : (
            <li className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-200 py-8 text-center">
              <Users size={22} className="text-zinc-300" />
              <p className="text-sm text-zinc-400">No one's on the list yet</p>
              <p className="text-xs text-zinc-300">
                Add a name above to get started
              </p>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
