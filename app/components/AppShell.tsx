"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isImmersivePage = pathname === "/" || pathname === "/login";

  if (isImmersivePage) return <main className="min-h-screen">{children}</main>;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
