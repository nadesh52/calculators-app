"use client";
import React, { useCallback, useEffect, useState } from "react";
import {ResultCard} from "../../features/comparison/ResultCard";
import {ResetButton} from "../../features/comparison/ResetButton";
import {DataList} from "../../features/comparison/DataList";
import {InputForm} from "../../features/comparison/InputForm";

export function CompareWrapper() {
  const [showMenu, setShowMenu] = useState(false);
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("items");
    return stored ? JSON.parse(stored) : [];
  });

  const handleReset = useCallback((value: any) => {
    setItems(value);

    localStorage.setItem("items", JSON.stringify([]));
    window.dispatchEvent(new Event("itemsReset"));
  }, []);

  const handleRemove = (e: any) => {
    setItems((prev: any) => prev.filter((data: any) => data.id !== e.id));
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <section className="bg-primary sticky top-0 h-[68px] w-full">
        <div className="relative">
          <div className="absolute top-7 left-1/2 -translate-x-1/2">
            <div className="flex w-fit flex-row justify-center gap-4">
              <ResultCard items={items} />
              <ResetButton reset={handleReset} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[32px]">
        <div className="p-4">
          {items.length ? (
            <DataList items={items} removeId={handleRemove} />
          ) : null}
        </div>
      </section>

      <div className="absolute right-6 bottom-4 z-10">
        <div
          id="menu"
          className={`absolute right-4 bottom-20 w-[300px] shadow-lg transition-all duration-100 ease-in-out ${
            showMenu
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-10 opacity-0"
          }`}
        >
          <InputForm
            formData={(value: any) => setItems((prev: any) => [...prev, value])}
          />
        </div>
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="size-12 cursor-pointer rounded-full bg-amber-200 text-2xl font-bold shadow-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}
