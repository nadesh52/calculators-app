import { UserAvatar } from "@/components";
import { Trash2, UserCheck, Users } from "lucide-react";

type PeopleListProps = {
  people: any[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
};

export default function PeopleList({ people, onDelete, onClearAll }: PeopleListProps) {
  const count = people?.length ?? 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
      {/* List Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <UserCheck size={16} />
          </div>
          <h3 className="text-sm font-bold text-zinc-800">รายชื่อทั้งหมด</h3>
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600">
            {count}
          </span>
        </div>

        {count > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="cursor-pointer text-xs font-semibold text-rose-500 transition hover:text-rose-600 hover:underline"
          >
            ลบทั้งหมด
          </button>
        )}
      </div>

      {/* List Items */}
      <div className="p-2 sm:p-3">
        {count > 0 ? (
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">
            {people.map((p: any) => (
              <li
                key={p.id}
                className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50/40 p-2.5 transition duration-150 hover:border-indigo-100 hover:bg-indigo-50/30 hover:shadow-2xs"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="shrink-0 transition duration-150 group-hover:scale-105">
                    <UserAvatar name={p.name} />
                  </div>
                  <span className="truncate text-xs font-bold text-zinc-700 group-hover:text-indigo-950">
                    {p.name}
                  </span>
                </div>

                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onDelete(p.id)}
                  aria-label={`ลบ ${p.name}`}
                  className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-400 transition hover:bg-rose-50 hover:text-rose-500"
                >
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200/80 bg-zinc-50/30 py-10 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-400">
              <Users size={24} />
            </div>
            <p className="text-sm font-semibold text-zinc-700">
              ยังไม่มีรายชื่อ
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              พิมพ์ชื่อผู้ร่วมแชร์ในช่องด้านบนเพื่อเริ่มต้นใช้งาน
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
