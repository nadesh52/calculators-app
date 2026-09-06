"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  Percent,
  Receipt,
  ChevronDown,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";

export type AppOption = {
  id: string;
  title: string;
  route: string;
  icon: React.ElementType;
  iconColor: string;
  description?: string;
};

// รายการแอปพร้อมไอคอนสี
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

interface AppHeaderProps {
  activeAppId?: string;
  onSelectApp?: (appId: string | null) => void;
}

export function AppHeader({ activeAppId, onSelectApp }: AppHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isMainRoute = pathname === "/";
  // แสดงปุ่ม Back เมื่อ ไม่ใช่หน้า / หรือ กำลังใช้งานแอปย่อยในหน้า Main
  const showBackButton = !isMainRoute || Boolean(activeAppId);

  // ค้นหาแอปปัจจุบันจาก Path หรือ Active ID
  const currentApp =
    appList.find((a) => a.id === activeAppId || a.route === pathname) ||
    appList[0];

  const CurrentIcon = currentApp.icon;

  // ปิด Dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ฟังก์ชันสำหรับกดปุ่ม Back กลับไปยัง Dashboard
  const handleBackToMain = () => {
    if (onSelectApp) {
      onSelectApp(null); // เคลียร์ activeAppId ในหน้า Main เพื่อกลับหน้า Dashboard
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-200/80 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      {/* ด้านซ้าย: ปุ่มย้อนกลับ + Dropdown เลือกแอป */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* ปุ่มย้อนกลับกลับหน้า Dashboard */}
        {showBackButton && (
          <>
            {isMainRoute ? (
              <button
                type="button"
                onClick={handleBackToMain}
                className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50/80 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
                title="กลับหน้าหลัก Dashboard"
              >
                <ArrowLeft size={16} />
              </button>
            ) : (
              <Link
                href="/"
                className="flex size-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50/80 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
                title="กลับหน้าหลัก Dashboard"
              >
                <ArrowLeft size={16} />
              </Link>
            )}
          </>
        )}

        {/* Dropdown Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 px-3 py-1.5 transition hover:bg-white hover:shadow-xs focus:ring-2 focus:ring-indigo-500/20"
          >
            <CurrentIcon size={20} className={currentApp.iconColor} />
            <div className="text-left">
              <span className="block text-xs font-bold text-zinc-800 sm:text-sm">
                {isMainRoute && !activeAppId
                  ? "Calculators Suite"
                  : currentApp.title}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-zinc-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="animate-in fade-in slide-in-from-top-2 absolute top-full left-0 mt-2 w-60 rounded-2xl border border-zinc-200/80 bg-white p-1.5 shadow-xl">
              <div className="border-b border-zinc-100 px-3 py-2">
                <p className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                  สลับเครื่องมือคำนวณ
                </p>
              </div>

              <div className="space-y-1 pt-1">
                {appList.map((app) => {
                  const Icon = app.icon;
                  const isSelected =
                    activeAppId === app.id || pathname === app.route;

                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        if (onSelectApp) {
                          onSelectApp(app.id);
                        } else {
                          window.location.href = app.route;
                        }
                      }}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                        isSelected
                          ? "bg-indigo-50/60 font-semibold"
                          : "hover:bg-zinc-50"
                      }`}
                    >
                      <Icon size={18} className={app.iconColor} />
                      <div>
                        <p className="text-xs font-bold text-zinc-800">
                          {app.title}
                        </p>
                        <p className="text-[10px] text-zinc-400">
                          {app.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ด้านขวา: ปุ่ม Mock สำหรับใช้งานผ่าน LINE Bot */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => alert("ระบบ LINE Bot กำลังเปิดให้บริการเร็วๆ นี้!")}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 hover:shadow-xs active:scale-95"
        >
          <MessageSquare size={14} className="text-emerald-600" />
          <span className="hidden sm:inline">ใช้งานผ่าน LINE Bot</span>
          <span className="sm:hidden">LINE Bot</span>
        </button>
      </div>
    </header>
  );
}
