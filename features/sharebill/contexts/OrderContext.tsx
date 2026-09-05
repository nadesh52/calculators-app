"use client";
import  {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export const OrderContext = createContext<any | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. โหลดข้อมูลลง State หลัง Mount ฝั่ง Client เรียบร้อยแล้วเท่านั้น
  useEffect(() => {
    try {
      const saved = localStorage.getItem("order");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // 2. เซฟลง localStorage เมื่อข้อมูลเปลี่ยน (เฉพาะหลังโหลดข้อมูลรอบแรกเสร็จ)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("order", JSON.stringify(order));
    }
  }, [order, isInitialized]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrder must be used within an OrderProvider");
  return context;
};
