"use client";
import { useOrder, usePeople } from "@/features/sharebill/contexts";
import { useEffect, useState } from "react";
import { colorFromName } from "@/utils";
import SummaryCard from "./SummaryCard";
import ReceiptList from "./ReceiptList";
import StatCard from "./StatCard";
import HeadCard from "./HeadCard";
import UnpaidList from "./UnpaidList";
import FilterButtons from "./FilterButtons";

const PREVIEW_LIMIT = 2; // จำนวนรายการที่แสดงตอนพับ

export function SummaryTab() {
  const { people } = usePeople();
  const { order } = useOrder();
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
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

  console.log("PEOPLE", people);
  console.log("ORDER", order);

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

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 p-4 sm:max-w-2xl">
      {order.length > 0 && (
        <div className="mb-5 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          {/* สถิติจำนวนคน */}
          <HeadCard
            eatersCount={eatersCount}
            nonEatersCount={nonEatersCount}
            paidCount={paidCount}
          />
          <UnpaidList
            unpaidPeople={unpaidPeople}
            onSelectPerson={handleSelectPerson}
          />

          {/* รายการแบบใบเสร็จ แบบกางออกอย่างสมูท */}
          <ReceiptList
            orders={order}
            showAllOrders={showAllOrders}
            onToggleShowAll={() => setShowAllOrders((prev) => !prev)}
            previewLimit={PREVIEW_LIMIT}
          />

          {/* ยอดรวม / ได้รับแล้ว / ค้างชำระ */}
          <StatCard
            collectedAmount={collectedAmount}
            totalAmount={totalAmount}
            outstandingAmount={outstandingAmount}
          />

          {/* คนที่ยังจ่ายไม่ครบ */}
        </div>
      )}

      {/* Filter Tabs */}
      <FilterButtons
        filterMode={filterMode}
        onFilterChange={(mode) => setFilterMode(mode)}
        selectedPerson={selectedPerson}
        onClearSelectedPerson={() => setSelectedPersonId(null)}
      />

      {/* Person Cards */}
      <SummaryCard
        displayedPeople={displayedPeople}
        paidPeople={paidPeople}
        handleTogglePaid={handleTogglePaid}
        colorFromName={colorFromName}
      />
    </section>
  );
}
