import { ShareBillWrapper } from "./ShareBillWrapper";
import { AppFooter, AppHeader } from "@/components/layout";

export default function ShareBillPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50/50">
      <AppHeader activeAppId="comparison" />
      <main className="flex-1 py-6">
        <ShareBillWrapper />
      </main>

      <AppFooter />
    </div>
  );
}
