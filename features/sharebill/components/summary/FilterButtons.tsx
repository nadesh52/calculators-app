"use client";
import { X, User } from "lucide-react";
import { FilterOption } from "../../types";
import { DEFAULT_FILTERS } from "../../constants";

export interface SelectedPerson {
  id: string;
  name: string;
}

export interface FilterButtonsProps<T extends string = string> {
  filterMode: T;
  onFilterChange: (mode: T) => void;
  filters?: FilterOption<T>[];
  selectedPerson?: SelectedPerson | null;
  onClearSelectedPerson?: () => void;
}

export default function FilterButtons<T extends string = string>({
  filterMode,
  onFilterChange,
  filters = DEFAULT_FILTERS as FilterOption<T>[],
  selectedPerson,
  onClearSelectedPerson,
}: FilterButtonsProps<T>) {
  return (
    <div className="mb-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
      {/* รายการปุ่ม Filter หลัก */}
      <div className="inline-flex rounded-2xl bg-zinc-100/80 p-1 backdrop-blur-xs">
        {filters.map(({ key, label, icon: Icon }) => {
          const isActive = filterMode === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onFilterChange(key)}
              className={`relative flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-white text-indigo-600 shadow-xs ring-1 ring-zinc-200/60"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {Icon && (
                <Icon
                  size={13}
                  className={`shrink-0 transition-colors ${
                    isActive ? "text-indigo-600" : "text-zinc-400"
                  }`}
                />
              )}
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* ปุ่ม Badge แสดงคนที่เลือกเฉพาะเจาะจง */}
      {selectedPerson && (
        <div className="inline-flex items-center gap-1.5 rounded-2xl border border-indigo-100 bg-indigo-50/70 py-1 pr-1.5 pl-2.5 text-xs font-semibold text-indigo-700 shadow-2xs">
          <User size={12} className="shrink-0 text-indigo-500" />
          <span>เฉพาะ {selectedPerson.name}</span>
          <button
            type="button"
            onClick={onClearSelectedPerson}
            aria-label="ล้างการเลือกคน"
            className="flex size-5 cursor-pointer items-center justify-center rounded-full text-indigo-400 transition hover:bg-indigo-100 hover:text-indigo-600 active:scale-90"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
