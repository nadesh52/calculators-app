"use client";

import { useState } from "react";
import Link from "next/link";
import { AppHeader, appList } from "@/components/AppHeader";
import { CompareWrapper } from "@/app/compare-price/CompareWrapper";
import { InterestWrapper } from "@/app/interest-calc/InterestWrapper";
import { ShareBillWrapper } from "@/app/share-bill/ShareBillWrapper";
import { Sparkles, ArrowRight, ExternalLink, Plus } from "lucide-react";

export default function MainWrapper() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "interest":
        return <InterestWrapper />;
      case "sharebill":
        return <ShareBillWrapper />;
      case "comparison":
        return <CompareWrapper />;
      default:
        return (
          <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
            {/* Hero Banner */}
            <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 via-white to-zinc-50 p-6 text-center shadow-xs sm:p-10">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xs">
                <Sparkles size={24} />
              </div>
              <h1 className="mt-4 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
                Calculators Dashboard
              </h1>
              <p className="mt-2 text-xs text-zinc-500 sm:text-sm">
                ศูนย์รวมเครื่องมือคำนวณและจัดการการเงิน
                ย่อยเรื่องยากให้กลายเป็นเรื่องง่าย
              </p>
            </div>

            {/* App Grid */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                  เครื่องมือที่มีให้ใช้งาน
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {appList.map((app) => {
                  const Icon = app.icon;
                  return (
                    <div
                      key={app.id}
                      className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          {/* Icon สีเด่น */}
                          <Icon size={28} className={app.iconColor} />

                          {/* ปุ่มเปิดแยกแบบไอคอนกระชับ ไม่รบกวนสายตา */}
                          <Link
                            href={app.route}
                            title="เปิดเฉพาะหน้าแอปนี้"
                            className="flex size-7 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-indigo-600"
                          >
                            <ExternalLink size={15} />
                          </Link>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-zinc-800 transition group-hover:text-indigo-600">
                            {app.title}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                            {app.description}
                          </p>
                        </div>
                      </div>

                      {/* ปุ่มเปิดใช้งานหลักเพียงอันเดียว */}
                      <button
                        type="button"
                        onClick={() => setActiveTab(app.id)}
                        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 text-xs font-bold text-zinc-700 transition hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                      >
                        <span>เปิดใช้งาน</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  );
                })}

                {/* Card จำลองสำหรับการเพิ่มแอปใหม่ */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 p-6 text-center">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400">
                    <Plus size={20} />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-zinc-600">
                    เครื่องมือใหม่ๆ
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    กำลังพัฒนาเพื่อเพิ่มในอนาคต
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 font-sans text-zinc-800 antialiased">
      <AppHeader
        activeAppId={activeTab || undefined}
        onSelectApp={(id) => setActiveTab(id)}
      />
      <main className="mx-auto">{renderContent()}</main>
    </div>
  );
}
