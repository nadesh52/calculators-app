"use client";

import { People } from "../../types";
import { UserAvatar } from "../UserAvatar";

export interface UnpaidListProps {
  unpaidPeople: People[];
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
        {unpaidPeople.map((person: People) => (
          <button
            key={person.id}
            type="button"
            title={`ดูเฉพาะ ${person.name}`}
            onClick={() => onSelectPerson(person.id.toString())}
          >
            <UserAvatar name={person.name} />
          </button>
        ))}
      </div>
    </div>
  );
}
