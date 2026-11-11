import { AppOption } from "@/types";
import { Scale, Percent, Receipt } from "lucide-react";

export const appList: AppOption[] = [
  {
    id: "comparison",
    title: "Compare Price",
    route: "/compare-price",
    icon: Scale,
    iconColor: "text-indigo-600",
    description: "เปรียบเทียบราคาและความคุ้มค่า",
  },
  {
    id: "interest",
    title: "Interest Calc",
    route: "/interest-calc",
    icon: Percent,
    iconColor: "text-emerald-500",
    description: "คำนวณดอกเบี้ยเงินฝากสุทธิ",
  },
  {
    id: "sharebill",
    title: "Share Bill",
    route: "/share-bill",
    icon: Receipt,
    iconColor: "text-amber-500",
    description: "หารค่าใช้จ่ายกลุ่ม ทริป สินค้า บริการ",
  },
];
