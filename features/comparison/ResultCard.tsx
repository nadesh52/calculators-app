"use client";

import { useEffect, useState } from "react";

const inputRes = {
  id: 0,
  name: "-",
  number: 0,
  quantity: 0,
  price: 0,
  count: 0,
  average: 0,
};

const sumResult = (data: any) => {
  const max = data.reduce(function (prev: any, current: any) {
    return prev && prev.average > current.average ? prev : current;
  });
  return max;
};

export function ResultCard({ items }: any) {
  const [result, setResult] = useState(inputRes);

  useEffect(() => {
    if (items.length !== 0) {
      setResult(sumResult(items));
    } else {
      setResult(inputRes);
    }
  }, [items]);

  return (
    <div className="relative rounded-sm bg-white px-4 py-2 shadow-sm">
      <div className="growx flex items-center justify-between gap-8">
        <div className="text-center">
          <p className="text-5xl font-medium text-slate-300">{result.number}</p>
        </div>
        <div className="text-center">
          <p className="font-medium sm:text-2xl">{result.quantity}</p>
          <p className="text-xs text-slate-400">Quantity</p>
        </div>
        <div className="text-center">
          <p className="font-medium sm:text-2xl">{result.price}</p>
          <p className="text-xs text-slate-400">Price</p>
        </div>
        <div className="text-center">
          <p className="font-medium sm:text-2xl">{result.count}</p>
          <p className="text-xs text-slate-400">Count</p>
        </div>
        <div className="text-center">
          <p className="font-semibold sm:text-2xl">{result.average}</p>
          <p className="text-xs text-slate-400">Average</p>
        </div>
      </div>
    </div>
  );
}
