'use client'
import { X } from "lucide-react";
import React, { useEffect } from "react";

interface AddItemModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function AddItemModal({ onClose, children }: AddItemModalProps) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Esacpe") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-100 grid place-items-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-zinc-900/40 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-item-title"
        className="animate-in fade-in zoom-in-95 relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl duration-200"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2
              id="add-item-title"
              className="text-base font-bold text-zinc-900"
            >
              เพิ่มรายการสินค้า
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              กรอกข้อมูลสินค้าเพื่อเปรียบเทียบความคุ้มค่า
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="ปิด Modal"
            className="flex size-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
