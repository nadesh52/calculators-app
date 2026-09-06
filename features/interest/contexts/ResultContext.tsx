"use client";

import React, { createContext, useContext, useState } from "react";

export type ResultData = {
  amount: number;
  interest: number;
  interestAmount: number;
  total: number;
  day: number;
};

type ResultContextType = {
  results: {
    saving?: ResultData;
    fixed?: ResultData;
  };
  setPlanResult: (type: "saving" | "fixed", data: ResultData) => void;
};

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export function ResultProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<{
    saving?: ResultData;
    fixed?: ResultData;
  }>({});

  const setPlanResult = (type: "saving" | "fixed", data: ResultData) => {
    setResults((prev) => ({ ...prev, [type]: data }));
  };

  return (
    <ResultContext.Provider value={{ results, setPlanResult }}>
      {children}
    </ResultContext.Provider>
  );
}

export function useResultContext() {
  const context = useContext(ResultContext);
  if (!context)
    throw new Error("useResultContext must be used within ResultProvider");
  return context;
}
