import { AppFooter, AppHeader } from "@/components";
import React from "react";

export default function SuitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <AppHeader />
      <section className="flex-1">{children}</section>
      <AppFooter />
    </main>
  );
}
