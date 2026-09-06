"use client";
import { useState } from "react";
import { usePeople, useOrder } from "@/features/sharebill/contexts";
import { v4 as uuidv4 } from "uuid";
import PeopleList from "./PeopleList";
import PeopleCreate from "./PeopleCreate";

export function PeopleTab() {
  const { people, setPeople } = usePeople();
  const { order, setOrder } = useOrder();
  const [query, setQuery] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (isDisable || !trimmedQuery) return;

    const newP = {
      id: uuidv4(),
      name: trimmedQuery,
    };

    setPeople((prev: any[]) => {
      const updated = [...(prev || []), newP];
      localStorage.setItem("people", JSON.stringify(updated));
      return updated;
    });

    setQuery("");
  };

  const handleDelete = (id: string) => {
    // 1. ลบคนออกจากรายการคน (People)
    const updatedPeople = (people || []).filter((p: any) => p.id !== id);
    setPeople(updatedPeople);
    localStorage.setItem("people", JSON.stringify(updatedPeople));

    // 2. ลบคนที่ถูกลบออกจากทุกรายการค่าใช้จ่าย (Order) และคำนวณราคาหารใหม่
    const updatedOrders = (order || []).map((o: any) => {
      const filteredPeopleInOrder = (o.people || []).filter(
        (p: any) => p.id !== id,
      );
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
        if (Array.isArray(paidPeopleArr)) {
          const updatedPaidPeople = paidPeopleArr.filter(
            (paidId: string) => paidId !== id,
          );
          localStorage.setItem("paidPeople", JSON.stringify(updatedPaidPeople));
        }
      } catch (e) {
        console.error("Error updating paidPeople localStorage", e);
      }
    }
  };

  const handleClearAll = () => {
    if (!people || people.length === 0) return;

    // เพิ่มการแจ้งเตือนยืนยันเพื่อป้องกันการกดพลาด
    if (
      !window.confirm(
        "คุณแน่ใจหรือไม่ว่าต้องการลบรายชื่อทั้งหมด? การกระทำนี้จะลบผู้ร่วมแชร์ออกจากทุกรายการค่าใช้จ่ายด้วย",
      )
    ) {
      return;
    }

    // 1. ล้าง People ทั้งใน State และ LocalStorage
    setPeople([]);
    localStorage.setItem("people", JSON.stringify([]));

    // 2. ล้างคนที่ผูกใน Order ออกทั้งหมด
    const resetOrders = (order || []).map((o: any) => ({
      ...o,
      people: [],
      price_per_people: 0,
    }));
    setOrder(resetOrders);
    localStorage.setItem("order", JSON.stringify(resetOrders));

    // 3. ล้างรายชื่อคนที่จ่ายเงินแล้ว
    localStorage.setItem("paidPeople", JSON.stringify([]));
  };

  const isDisable =
    !query?.trim() ||
    (people || []).some(
      (p: any) =>
        p?.name?.toLowerCase()?.trim() === query?.toLowerCase()?.trim(),
    );

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 p-4 sm:max-w-2xl">
      {/* ส่วนเพิ่มรายชื่อผู้หารใหม่ */}
      <PeopleCreate
        query={query}
        setQuery={setQuery}
        isDisable={isDisable}
        handleAdd={handleAdd}
      />

      {/* ส่วนแสดงรายชื่อทั้งหมด */}
      <PeopleList
        people={people || []}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
      />
    </section>
  );
}
