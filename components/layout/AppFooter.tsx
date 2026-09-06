"use client";
import Link from "next/link";
import { Calculator, Scale, Percent, Receipt } from "lucide-react";

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Compare Price", href: "/compare-price", icon: Scale },
    { name: "Interest Calculator", href: "/interest-calc", icon: Percent },
    { name: "Share Bill", href: "/share-bill", icon: Receipt },
  ];

  return (
    <footer className="w-full border-t border-zinc-200/80 bg-white py-6 text-zinc-500">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        {/* Brand Copyright */}
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Calculator size={14} />
          </div>
          <span className="text-xs font-semibold text-zinc-800">
            Calculators App
          </span>
          <span className="text-xs text-zinc-400">
            © {currentYear} All rights reserved.
          </span>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 text-zinc-500 transition hover:text-indigo-600"
              >
                <Icon size={13} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
