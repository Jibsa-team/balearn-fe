import Header from "@/components/header/header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col w-full h-screen bg-sidebarBg">
      <Header />
      <div className="items-center overflow-y-auto">{children}</div>
    </main>
  );
}
