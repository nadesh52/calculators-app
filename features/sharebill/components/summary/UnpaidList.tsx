"use client";
import { UserAvatar } from "@/components";

export interface UnpaidPerson {
  id: string;
  name: string;
}

export interface UnpaidListProps {
  unpaidPeople: UnpaidPerson[];
  onSelectPerson: (personId: string) => void;
}

export default function UnpaidList({
  unpaidPeople = [],
  onSelectPerson,
}: UnpaidListProps) {
  if (unpaidPeople.length === 0) return null;

  return (
    <div className="mt-3 flex flex-col gap-2 overflow-x-auto">
      <span className="shrink-0 text-xs text-zinc-400">คนที่ค้างจ่าย</span>
      <div className="flex flex-wrap gap-2">
        {unpaidPeople.map((p) => (
          <button
            key={p.id}
            type="button"
            title={`ดูเฉพาะ ${p.name}`}
            onClick={() => onSelectPerson(p.id)}
          >
            <UserAvatar name={p.name} />
          </button>
        ))}
      </div>
    </div>
  );
}
