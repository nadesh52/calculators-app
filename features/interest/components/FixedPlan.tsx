"use client";
import React, { useReducer } from "react";
import { SubmitButton } from "./SubmitButton";
import { MonthSelect } from "./MonthSelect";
import { DatePicker } from "./DatePicker";
import { Input } from "./Input";
import { getDayDiff } from "@/utils/get_day_diff";
import { useResultContext } from "@/features/interest/contexts/ResultContext";
import { interestCalculator } from "@/utils/interest_calculator";
import {
  fixedInit,
  fixedReducer,
} from "@/features/interest/hooks/fixedReducer";

//ฝากประจำ
const getDay = (date: any, _month: any) => {
  const month = Number(_month);
  const currentMonth = new Date(date).getMonth();

  const startDay = date.getTime();
  const endDay = new Date(date).setMonth(currentMonth + month);

  const dayDiff = getDayDiff(startDay, endDay);

  return dayDiff;
};

export function FixedPlan() {
  const { setResult } = useResultContext();
  const [state, dispatch] = useReducer(fixedReducer, fixedInit);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { amount, rate, start, month } = state;

    const days = getDay(new Date(start), month);
    const res = interestCalculator(amount, rate, days);
    const sum = amount + res;

    const result = {
      amount: amount,
      interest: res,
      total: sum,
      day: days,
    };

    setResult(result);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <Input
        label="Amount"
        type="number"
        min={0}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: "update",
            payload: { amount: Number(e.target.value) },
          })
        }
      />

      <Input
        label="Interest Rate (%)"
        type="number"
        min={0}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: "update",
            payload: { rate: Number(e.target.value) },
          })
        }
      />

      <DatePicker
        label="Start Date"
        selectedValue={(e: any) =>
          dispatch({
            type: "update",
            payload: { start: new Date(e.target.value).getTime() },
          })
        }
      />

      <MonthSelect
        label="Select Month"
        selectedValue={(e: any) =>
          dispatch({ type: "update", payload: { month: e.target.value } })
        }
      />

      <SubmitButton />
    </form>
  );
}
