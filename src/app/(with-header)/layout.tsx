import Header from "@/components/header/header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col w-full bg-sidebarBg">
      <Header />
      <div
        className="flex justify-center px-10 py-0 overflow-y-auto"
        style={{
          height: "calc(100vh - 103px)",
        }}
      >
        {children}
      </div>
    </main>
  );
}
