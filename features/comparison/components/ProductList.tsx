"use client";
import { formatNumber } from "@/utils";
import { Crown, Package, ShoppingBag, ThumbsDown, Trash2 } from "lucide-react";

type Props = {
  items?: any[];
  removeId: (id: string) => void;
};

export function ProductList({ items, removeId }: Props) {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-200 bg-white/50 px-4 py-12 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
          <Crown size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-600">
            ยังไม่มีรายการให้เปรียบเทียบ
          </p>
          <p className="mt-0.5 text-xs text-zinc-400">
            กดปุ่ม <span className="font-semibold text-indigo-600">+</span>{" "}
            ด้านล่างเพื่อเพิ่มตัวเลือกสินค้า
          </p>
        </div>
      </div>
    );
  }

  const maxAverage = Math.max(...items.map((i: any) => Number(i.average) || 0));
  const minAverage = Math.min(...items.map((i: any) => Number(i.average) || 0));
  const canCompare = items.length > 1 && maxAverage !== minAverage;

  return (
    <ul className="space-y-2.5">
      {items.map((item: any) => {
        const itemAvg = Number(item.average) || 0;
        const isBest = canCompare && itemAvg === maxAverage;
        const isWorst = canCompare && itemAvg === minAverage;
        const isPack = item.count && Number(item.count) > 1;

        // คำนวณปริมาณต่อชิ้น
        const unitQuantity = isPack
          ? item.quantity / item.count
          : item.quantity;

        return (
          <li key={item.id}>
            <div
              className={`relative flex items-center justify-between gap-3 rounded-2xl border bg-white p-3.5 transition-all ${
                isBest
                  ? "border-emerald-200 hover:border-emerald-400"
                  : isWorst
                    ? "border-rose-200 hover:border-rose-400"
                    : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {/* Left Side: Number Badge + Details */}
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {/* ID Badge */}
                <div className="relative shrink-0">
                  <span
                    className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold transition-colors ${
                      isBest
                        ? "bg-emerald-600 text-white shadow-xs"
                        : isWorst
                          ? "bg-rose-100 text-rose-600"
                          : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    #{item.number}
                  </span>

                  {/* Icon สถานะมุม Badge */}
                  {isBest && (
                    <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
                      <Crown size={10} />
                    </span>
                  )}
                  {isWorst && (
                    <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-rose-500 text-white shadow-xs">
                      <ThumbsDown size={9} />
                    </span>
                  )}
                </div>

                {/* Product Detail Info */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  {/* Category Label + Icon */}
                  <div className="flex w-fit items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
                    {isPack ? (
                      <>
                        <Package size={13} className="shrink-0" />
                        <span>แพ็ค {item.count} ชิ้น</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag
                          size={13}
                          className="shrink-0 text-zinc-400"
                        />
                        <span>ชิ้นเดียว</span>
                      </>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-600">
                    <span>
                      ปริมาณ{" "}
                      <strong className="font-semibold text-zinc-800">
                        {formatNumber(unitQuantity)}
                      </strong>
                      <span className="text-[11px] text-zinc-500">/ชิ้น</span>
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span>
                      ราคา{" "}
                      <strong className="font-semibold text-zinc-800">
                        {formatNumber(item.price)}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Average Result & Delete Action */}
              <div className="flex shrink-0 items-center gap-2.5">
                <div className="flex flex-col items-end justify-center rounded-xl px-3 py-1.5 text-right transition-colors">
                  <div className="flex items-baseline gap-0.5">
                    <span
                      className={`text-base leading-none font-black tracking-tight ${
                        isBest
                          ? "text-emerald-700"
                          : isWorst
                            ? "text-rose-600"
                            : "text-zinc-800"
                      }`}
                    >
                      {formatNumber(item.average)}
                    </span>
                  </div>
                  <span className="mt-0.5 text-[9px] font-medium text-zinc-400">
                    หน่วย / บาท
                  </span>
                </div>

                <button
                  onClick={() => removeId(item.id)}
                  aria-label="ลบรายการ"
                  className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-zinc-300 transition hover:bg-rose-50 hover:text-rose-500 active:scale-95"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
