import { LucideIcon } from "lucide-react";

export interface FilterOption<T extends string = string> {
  key: T;
  label: string;
  icon?: LucideIcon; // 👈 รองรับ icon กำหนดเองได้
}
