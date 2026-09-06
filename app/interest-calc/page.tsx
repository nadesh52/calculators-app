import { InterestWrapper } from "./InterestWrapper";
import { AppFooter, AppHeader } from "@/components/layout";

export default function page() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50/50">
      <AppHeader activeAppId="comparison" />
      <main className="flex-1 py-6">
        <InterestWrapper />
      </main>

      <AppFooter />
    </div>
  );
}
