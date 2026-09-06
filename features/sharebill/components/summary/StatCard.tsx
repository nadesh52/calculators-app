import { formatNumber } from "@/utils";
import { Wallet, CheckCircle2, AlertCircle } from "lucide-react";

type Props = {
  totalAmount: number;
  collectedAmount: number;
  outstandingAmount: number;
};

export default function StatCard({
  collectedAmount,
  outstandingAmount,
  totalAmount,
}: Props) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
      {/* 1. ยอดรวมทั้งหมด */}
      <div className="relative rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-2.5 transition hover:bg-white hover:shadow-2xs">
        <Wallet size={16} className="absolute top-2.5 left-2.5 text-zinc-400" />
        <div className="pl-5 text-right">
          <p className="font-bold text-zinc-800 sm:text-lg">
            {formatNumber(totalAmount)}
          </p>
          <p className="text-xs font-medium text-zinc-400">ยอดรวม</p>
        </div>
      </div>

      {/* 2. จ่ายมาแล้ว */}
      <div className="relative rounded-xl border border-emerald-100 bg-emerald-50/30 p-2.5 transition hover:bg-emerald-50/60 hover:shadow-2xs">
        <CheckCircle2
          size={16}
          className="absolute top-2.5 left-2.5 text-emerald-500"
        />
        <div className="pl-5 text-right">
          <p className="font-bold text-emerald-600 sm:text-lg">
            {formatNumber(collectedAmount)}
          </p>
          <p className="text-xs font-medium text-emerald-600/80">จ่ายมาแล้ว</p>
        </div>
      </div>

      {/* 3. ค้างชำระ */}
      <div className="relative rounded-xl border border-rose-100 bg-rose-50/30 p-2.5 transition hover:bg-rose-50/60 hover:shadow-2xs">
        <AlertCircle
          size={16}
          className="absolute top-2.5 left-2.5 text-rose-400"
        />
        <div className="pl-5 text-right">
          <p className="font-bold text-rose-500 sm:text-lg">
            {formatNumber(outstandingAmount)}
          </p>
          <p className="text-xs font-medium text-rose-500/80">ค้างชำระ</p>
        </div>
      </div>
    </div>
  );
}
