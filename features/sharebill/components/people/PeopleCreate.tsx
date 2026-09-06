"use client";
import { KeyboardEvent, MouseEvent } from "react";
import { User, Plus } from "lucide-react";
import { Input } from "@/components/ui";

interface PeopleCreateProps {
  query: string;
  setQuery: (val: string) => void;
  isDisable: boolean;
  handleAdd: (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
  ) => void;
}

export default function PeopleCreate({
  query,
  setQuery,
  isDisable,
  handleAdd,
}: PeopleCreateProps) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs sm:p-5">
      <div className="flex gap-2">
        <div className="w-full">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="ป้อนชื่อ (เช่น สมชาย, โบว์)..."
            leftIcon={<User size={16} />}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisable) {
                handleAdd(e);
              }
            }}
          />
        </div>
        <button
          type="button"
          disabled={isDisable}
          onClick={handleAdd}
          aria-label="เพิ่มชื่อผู้ใช้งาน"
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">เพิ่มชื่อ</span>
        </button>
      </div>
    </div>
  );
}
