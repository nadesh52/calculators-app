"use client";
import { Receipt, EllipsisVertical } from "lucide-react";
import { formatNumber } from "@/utils";
import { UserAvatar } from "@/components";

const MAX_AVATARS = 4;

export default function OrderCard({ o, onOpen }: any) {
  const visiblePeople = o.people?.slice(0, MAX_AVATARS) ?? [];
  const extraCount = Math.max((o.people?.length ?? 0) - MAX_AVATARS, 0);

  return (
    <div>
      <div className="flex items-center gap-3">
        {/* Icon แสดงประเภทรายการ (คลีน ไม่มี Gradient) */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Receipt size={16} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-zinc-800">
            {o.name}
            <span className="ml-1.5 rounded-md bg-zinc-100 px-1.5 py-0.5 text-xs font-semibold text-zinc-500">
              x{o.quantity}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={onOpen}
          aria-label="แก้ไขรายการ"
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
        >
          <EllipsisVertical size={16} />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-zinc-200/80 pt-3">
        {/* รายชื่อผู้ร่วมหาร */}
        {o.people?.length ? (
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {visiblePeople.map((person: any, i: number) => (
                <UserAvatar key={person.id ?? i} name={person.name} />
              ))}
              {extraCount > 0 && (
                <span className="flex size-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-600 ring-2 ring-white">
                  +{extraCount}
                </span>
              )}
            </div>
            <span className="ml-2 text-xs font-medium text-zinc-500">
              {o.people.length} คน
            </span>
          </div>
        ) : (
          <span className="text-xs text-zinc-400">ยังไม่ได้เลือกคนแชร์</span>
        )}

        {/* ยอดเงินรวม & เฉลี่ยต่อคน */}
        <div className="flex flex-col items-end">
          <p className="rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600">
            {formatNumber(Number(o.total || 0))}
          </p>
          {o.people?.length ? (
            <p className="mt-0.5 text-[11px] text-zinc-400">
              {formatNumber(o.price_per_people)}/คน
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
