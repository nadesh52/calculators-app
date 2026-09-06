"use client";
import React, { useReducer } from "react";
import { Coins, Percent } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { Input } from "@/components/ui/Input";
import { useResultContext } from "@/features/interest/contexts";
import { interestCalculator, getDayCount } from "@/utils";
import { savingInit, savingReducer } from "@/features/interest/hooks";

export function SavingPlan() {
  const { setPlanResult } = useResultContext();
  const [state, dispatch] = useReducer(savingReducer, savingInit);

  const startDateString = state.start
    ? new Date(state.start).toISOString().split("T")[0]
    : "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { amount, rate, start, end } = state;

    if (!start || !end) {
      alert("กรุณาระบุวันที่เริ่มฝากและวันที่สิ้นสุดให้ครบถ้วน");
      return;
    }

    if (start > end) {
      alert("วันที่สิ้นสุดต้องไม่เกิดขึ้นก่อนวันที่เริ่มฝาก");
      return;
    }

    const dayDiff = getDayCount(start, end);
    const interest = interestCalculator(amount, rate, dayDiff);
    const sum = Number(amount) + interest;

    setPlanResult("saving", {
      amount: amount || 0,
      interest: rate || 0,
      interestAmount: interest,
      total: sum,
      day: dayDiff,
    });
  };

  return (
    <form
      id="saving-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-3.5"
    >
      <Input
        label="จำนวนเงินฝาก (บาท)"
        type="number"
        min={0}
        step="any"
        required
        placeholder="เช่น 100,000"
        leftIcon={<Coins size={15} />}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: "update",
            payload: { amount: Number(e.target.value) || 0 },
          })
        }
      />

      <Input
        label="อัตราดอกเบี้ยต่อปี (%)"
        type="number"
        min={0}
        step="any"
        required
        placeholder="เช่น 1.5"
        leftIcon={<Percent size={15} />}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: "update",
            payload: { rate: Number(e.target.value) || 0 },
          })
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <DatePicker
          label="วันที่เริ่มฝาก"
          selectedValue={(e: any) =>
            dispatch({
              type: "update",
              payload: { start: new Date(e.target.value).getTime() },
            })
          }
        />
        <DatePicker
          label="วันที่สิ้นสุด"
          min={startDateString}
          selectedValue={(e: any) =>
            dispatch({
              type: "update",
              payload: { end: new Date(e.target.value).getTime() },
            })
          }
        />
      </div>
    </form>
  );
}
