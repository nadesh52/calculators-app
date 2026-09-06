import { FilterOption } from "../types";
import { CheckCircle2, Clock, LayoutGrid } from "lucide-react";

export const DEFAULT_FILTERS: FilterOption[] = [
  { key: "all", label: "ทั้งหมด", icon: LayoutGrid },
  { key: "unpaid", label: "ยังไม่จ่าย", icon: Clock },
  { key: "paid", label: "จ่ายแล้ว", icon: CheckCircle2 },
];
