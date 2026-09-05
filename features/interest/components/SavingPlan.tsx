"use client";
import React, { useReducer } from "react";
import { SubmitButton } from "./SubmitButton";
import { DatePicker } from "./DatePicker";
import { Input } from "./Input";
import { useResultContext } from "@/features/interest/contexts/ResultContext";
import { getDayDiff } from "@/utils/get_day_diff";
import { interestCalculator } from "@/utils/interest_calculator";
import {
  savingInit,
  savingReducer,
} from "@/features/interest/hooks/savingReducer";

export function SavingPlan() {
  const { setResult } = useResultContext();
  const [state, dispatch] = useReducer(savingReducer, savingInit);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { amount, rate, start, end } = state;

    const dayDiff = getDayDiff(start, end);
    const interest = interestCalculator(amount, rate, dayDiff);
    const sum = Number(amount) + interest;

    const result = {
      amount: amount,
      interest: interest,
      total: sum,
      day: dayDiff,
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
      <DatePicker
        label="End Date"
        selectedValue={(e: any) =>
          dispatch({
            type: "update",
            payload: { end: new Date(e.target.value).getTime() },
          })
        }
      />

      <SubmitButton />
    </form>
  );
}
