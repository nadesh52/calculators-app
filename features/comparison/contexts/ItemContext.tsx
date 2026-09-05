"use client";
import React, { createContext, useContext, useState } from "react";

const ItemContext = createContext<any>(null);

export const ItemProvider = ({ children }: any) => {
  const [items, setItems] = useState<any>([]);

  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);

  if (!context) console.log("no context");
  return context;
};
