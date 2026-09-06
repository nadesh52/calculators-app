"use client";
import { useRef } from "react";

export const Modal = ({ open, onClose, children }: any) => {
  const modalRef = useRef(null);

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-50 flex h-full items-center justify-center transition-colors ${
        open ? "visible bg-black/70" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-2xl max-w-4xl rounded bg-white p-4 shadow transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
