"use client";

import React, { useReducer } from "react";
import { Coins, Percent } from "lucide-react";
import { MonthSelect } from "./MonthSelect";
import { DatePicker } from "./DatePicker";
import { Input } from "./Input";
import { getDayDiff } from "@/utils/get-day-diff";
import { useResultContext } from "@/features/interest/contexts/ResultContext";
import { interestCalculator } from "@/utils/interest-calculator";
import {
  fixedInit,
  fixedReducer,
} from "@/features/interest/hooks/fixedReducer";

const getDay = (dateTimestamp: number, monthDuration: number) => {
  const startDate = new Date(dateTimestamp);
  const endDate = new Date(dateTimestamp);

  endDate.setMonth(endDate.getMonth() + Number(monthDuration));

  return getDayDiff(startDate.getTime(), endDate.getTime());
};

export function FixedPlan() {
  const { setPlanResult } = useResultContext();
  const [state, dispatch] = useReducer(fixedReducer, fixedInit);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { amount, rate, start, month } = state;

    if (!start || !month) {
      alert("กรุณากรอกข้อมูลวันที่และระยะเวลาฝากให้ครบถ้วน");
      return;
    }

    const days = getDay(start, month);
    const res = interestCalculator(amount, rate, days);
    const sum = Number(amount) + res;

    setPlanResult("fixed", {
      amount: amount || 0,
      interest: rate || 0,
      interestAmount: res,
      total: sum,
      day: days,
    });
  };

  return (
    <form
      id="fixed-form"
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
        placeholder="เช่น 2.0"
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

        <MonthSelect
          label="ระยะเวลาฝาก"
          selectedValue={(e: any) =>
            dispatch({
              type: "update",
              payload: { month: Number(e.target.value) },
            })
          }
        />
      </div>
    </form>
  );
}
