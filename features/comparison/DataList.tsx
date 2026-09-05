"use client";
import { useEffect, useState } from "react";

export function DataList({ items, removeId }: any) {
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  const handleRemove = (e: any) => {
    removeId(e);
  };

  useEffect(() => {
    if (items) {
      const max = items.reduce(function (prev: any, current: any) {
        return prev.average > current.average ? prev : current;
      });

      const min = items.reduce(function (prev: any, current: any) {
        return prev.average < current.average ? prev : current;
      });
      setMax(max.average);
      setMin(min.average);
    }
  }, [items, max, min]);

  return (
    <ul className="space-y-4">
      {items.map((item: any, idx: number) => (
        <li key={idx}>
          <div
            className={`${
              (item.average === max &&
                "border-l-success bg-success/10 border-l-4") ||
              (item.average === min &&
                "border-l-error bg-error/10 border-l-4") ||
              "bg-white"
            } rounded-r p-4 shadow transition-all hover:-translate-y-0.5 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-center">
                <p className="text-lg font-medium text-slate-300">
                  {item.number}
                </p>
                <p className="text-xs text-slate-400 select-none">#</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">{item.quantity}</p>
                <p className="text-xs text-slate-400 select-none">Quantity</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">{item.count}</p>
                <p className="text-xs text-slate-400 select-none">Count</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">{item.price}</p>
                <p className="text-xs text-slate-400 select-none">Price</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">{item.average}</p>
                <p className="text-xs text-slate-400 select-none">
                  Avg / Price
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleRemove(item)}
                  className="cursor-pointer"
                >
                  {/* <TrashIcon className="text-error hover:bg-error/10 size-5" /> */}
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
