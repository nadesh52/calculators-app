import React from "react";
import { Users, CheckCircle2, AlertCircle } from "lucide-react";

type Props = {
  eatersCount: number;
  paidCount: number;
  nonEatersCount: number;
};

export default function HeadCard({
  eatersCount,
  paidCount,
  nonEatersCount,
}: Props) {
  const isAllPaid = eatersCount > 0 && paidCount === eatersCount;
  const progressPercent =
    eatersCount > 0 ? Math.min((paidCount / eatersCount) * 100, 100) : 0;

  return (
    <div className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* จำนวนคนกิน */}
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Users size={16} />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-400">ผู้ร่วมแชร์</p>
            <p className="text-sm font-bold text-zinc-800">
              {eatersCount}{" "}
              <span className="text-xs font-normal text-zinc-500">คน</span>
            </p>
          </div>
        </div>

        {/* สถานะการชำระเงิน */}
        <div className="flex items-center gap-1.5 text-xs">
          {/* Badge จ่ายแล้ว */}
          <span
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-bold transition ${
              isAllPaid
                ? "border border-emerald-200/60 bg-emerald-50 text-emerald-600"
                : "border border-amber-200/60 bg-amber-50 text-amber-700"
            }`}
          >
            {isAllPaid ? (
              <CheckCircle2 size={13} className="shrink-0" />
            ) : (
              <AlertCircle size={13} className="shrink-0" />
            )}
            จ่ายแล้ว {paidCount}/{eatersCount}
          </span>

          {/* Badge ไม่ได้กิน */}
          {nonEatersCount > 0 && (
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-medium text-zinc-500">
              ไม่ได้แชร์ {nonEatersCount} คน
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar แสดงความคืบหน้าการจ่ายเงิน */}
      {eatersCount > 0 && (
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isAllPaid ? "bg-emerald-500" : "bg-indigo-500"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
