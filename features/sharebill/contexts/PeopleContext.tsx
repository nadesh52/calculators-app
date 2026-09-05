"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export const PeopleContext = createContext<any | undefined>(undefined);

export const PeopleProvider = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // ดึงข้อมูลจาก localStorage หลัง Component Mount ฝั่ง Client เท่านั้น (แก้ Hydration)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("people");
      if (saved) {
        setPeople(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // บันทึกลง localStorage เมื่อข้อมูลเปลี่ยน
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("people", JSON.stringify(people));
    }
  }, [people, isInitialized]);

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};

// ✅ ส่งออก usePeople ให้ตามหาเจอ
export const usePeople = () => {
  const context = useContext(PeopleContext);
  if (!context) {
    throw new Error("usePeople must be used within a PeopleProvider");
  }
  return context;
};
