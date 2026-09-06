"use client";

import { RefObject, KeyboardEvent, MouseEvent } from "react";
import { User, Plus, Users, Trash2, UserCheck } from "lucide-react";
import { UserAvatar } from "@/components";

interface PeopleCreateProps {
  inputRef?: RefObject<HTMLInputElement | null>;
  query: string;
  setQuery: (val: string) => void;
  isDisable: boolean;
  handleAdd: (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
  ) => void;
}

export function PeopleCreate({
  inputRef,
  query,
  setQuery,
  isDisable,
  handleAdd,
}: PeopleCreateProps) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs sm:p-5">
      <p className="mb-2.5 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
        เพิ่มผู้เข้าร่วม
      </p>
      <div className="flex gap-2">
        <div className="relative flex min-w-0 flex-1 items-center">
          <div className="pointer-events-none absolute left-3.5 text-zinc-400">
            <User size={18} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="ป้อนชื่อ (เช่น สมชาย, โบว์)..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 py-2.5 pr-4 pl-10 text-sm font-medium text-zinc-800 transition outline-none placeholder:font-normal placeholder:text-zinc-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
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
