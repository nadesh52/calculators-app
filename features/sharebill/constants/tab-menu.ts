import { PieChart, ReceiptText, Users } from "lucide-react";
import { TabKey } from "../types";

export const TAB_MENU: Record<TabKey, { label: string; icon: React.ElementType }> = {
  people: {
    label: "รายชื่อผู้เข้าร่วม",
    icon: Users,
  },
  order: {
    label: "รายการค่าใช้จ่าย",
    icon: ReceiptText,
  },
  summary: {
    label: "สรุปยอด",
    icon: PieChart,
  },
};
