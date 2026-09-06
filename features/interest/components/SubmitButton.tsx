"use client";
import { Calculator } from "lucide-react";

export function SubmitButton({ formId }: { formId?: string }) {
  return (
    <button
      type="submit"
      form={formId}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700 active:scale-[0.98]"
    >
      <Calculator size={16} />
      คำนวณดอกเบี้ย
    </button>
  );
}
