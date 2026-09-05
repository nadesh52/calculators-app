import { UtensilsCrossed, EllipsisVertical } from "lucide-react";
import { colorFromName } from "@/utils";

const MAX_AVATARS = 4;

export function OrderCard({ o, onOpen }: any) {
  const visiblePeople = o.people?.slice(0, MAX_AVATARS) ?? [];
  const extraCount = Math.max((o.people?.length ?? 0) - MAX_AVATARS, 0);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-100 to-fuchsia-100 text-violet-500">
          <UtensilsCrossed size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-medium text-zinc-800">
            {o.name}
            <span className="ml-1.5 rounded-md bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-500">
              x{o.quantity}
            </span>
          </p>
        </div>

        <button
          onClick={onOpen}
          aria-label="แก้ไขออเดอร์"
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
        >
          <EllipsisVertical size={18} />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-zinc-100 pt-3">
        {o.people?.length ? (
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {visiblePeople.map((person: any, i: number) => (
                <span
                  key={person.id ?? i}
                  title={person?.name}
                  style={{ zIndex: visiblePeople.length - i }}
                  className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold text-white ring-2 ring-white ${colorFromName(
                    person?.name ?? "",
                  )}`}
                >
                  {person?.name?.charAt(0).toUpperCase()}
                </span>
              ))}
              {extraCount > 0 && (
                <span className="flex size-7 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-semibold text-zinc-500 ring-2 ring-white">
                  +{extraCount}
                </span>
              )}
            </div>
            <span className="ml-2.5 text-xs text-zinc-400">
              {o.people.length} คน
            </span>
          </div>
        ) : (
          <span className="text-xs text-zinc-300">ยังไม่มีคนกิน</span>
        )}

        <div className="flex flex-col items-end">
          <p className="rounded-lg bg-violet-50 px-2 py-1 text-sm font-semibold text-violet-700">
            ฿{o.total}
          </p>
          {o.people?.length ? (
            <p className="mt-1 text-xs text-zinc-400">
              ฿{o.price_per_people}/คน
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
