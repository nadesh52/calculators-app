"use client";
import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext<any>(null);

export const useResultContext = () => {
  return useContext(ResultContext);
};

export const ResultProvider = ({ children }: any) => {
  const [result, setResult] = useState<any>({});

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};
