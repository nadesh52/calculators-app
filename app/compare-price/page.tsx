import { AppHeader, AppFooter } from "@/components/layout";
import { CompareWrapper } from "./CompareWrapper";

export default function ComparePricePage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50/50">
      <AppHeader activeAppId="comparison" />
      <main className="flex-1 py-6">
        <CompareWrapper />
      </main>

      <AppFooter />
    </div>
  );
}
